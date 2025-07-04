// src/services/favoritesService.ts
export const getFavorites = (): number[] => {
  const favorites = localStorage.getItem('favoritos');
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (id: number): void => {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    localStorage.setItem('favoritos', JSON.stringify([...favorites, id]));
  }
};

export const removeFavorite = (id: number): void => {
  let favorites = getFavorites();
  favorites = favorites.filter(favId => favId !== id);
  localStorage.setItem('favoritos', JSON.stringify(favorites));
};


import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Recipe } from '../types/Recipe';
import recetasData from '../data/recetas.json';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoritesService'; 

interface RecipeContextType {
  recetas: Recipe[];
  favoritos: number[];
  addToFavoritos: (id: number) => void;
  removeFromFavoritos: (id: number) => void;
  isFavorito: (id: number) => boolean;
  addReceta: (receta: Omit<Recipe, 'id'>) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recetas, setRecetas] = useState<Recipe[]>(recetasData.recetas as Recipe[]);
  const [favoritos, setFavoritos] = useState<number[]>([]);

  // useEffect para cargar favoritos del localStorage al montar
  useEffect(() => {
    setFavoritos(getFavorites());
  }, []);

  // useEffect para guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const handleAddToFavoritos = (id: number) => {
    addFavorite(id);
    setFavoritos(getFavorites()); 
  };

  const handleRemoveFromFavoritos = (id: number) => {
    removeFavorite(id);
    setFavoritos(getFavorites()); 
  };

  const isFavorito = (id: number) => {
    return favoritos.includes(id);
  };

  const addReceta = (nuevaReceta: Omit<Recipe, 'id'>) => {
    const newId = Math.max(...recetas.map(r => r.id)) + 1;
    const receta: Recipe = {
      ...nuevaReceta,
      id: newId
    };
    setRecetas(prev => [...prev, receta]);
  };

  const value = {
    recetas,
    favoritos,
    addToFavoritos: handleAddToFavoritos, 
    removeFromFavoritos: handleRemoveFromFavoritos, 
    isFavorito,
    addReceta,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};
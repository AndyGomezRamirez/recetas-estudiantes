import { useRecipes } from '../hooks/useRecipes';

const StatsPage = () => {
  const { recetas } = useRecipes();

  const total = recetas.length;

  // Contar recetas por categoría
  const recetasPorCategoria: Record<string, number> = {};
  recetas.forEach((r) => {
    if (!recetasPorCategoria[r.categoria]) {
      recetasPorCategoria[r.categoria] = 1;
    } else {
      recetasPorCategoria[r.categoria]++;
    }
  });

  // Receta más popular (mayor valoración)
  const recetaPopular = recetas.reduce((top, actual) =>
    actual.valoracion > top.valoracion ? actual : top,
    recetas[0]
  );

  return (
    <div className="container mt-4">
      <h1>📊 Estadísticas de Recetas</h1>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total de Recetas:</div>
            <div className="card-body">
              <h5 className="card-title">{total}</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Categorías:</div>
            <div className="card-body">
              {Object.entries(recetasPorCategoria).map(([cat, count]) => (
                <p key={cat}>{cat}: {count}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Receta Más Popular:</div>
            <div className="card-body">
              <h5 className="card-title">{recetaPopular.nombre}</h5>
              <p className="card-text">Valoración: {recetaPopular.valoracion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;

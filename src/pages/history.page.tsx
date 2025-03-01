import "./history.page.css";

interface ColorRecipe {
  id: string;
  date: string;
  targetColor: string;
  ingredients: {
    color: string;
    percentage: number;
  }[];
}

// Mock data - replace with actual data from your storage later
const mockRecipes: ColorRecipe[] = [
  {
    id: "1",
    date: "2024-03-10",
    targetColor: "#94A3B8",
    ingredients: [
      { color: "#475569", percentage: 60 },
      { color: "#1E293B", percentage: 40 },
    ],
  },
  {
    id: "2",
    date: "2024-03-09",
    targetColor: "#64748B",
    ingredients: [
      { color: "#334155", percentage: 70 },
      { color: "#0F172A", percentage: 30 },
    ],
  },
];

export function HistoryPage() {
  return (
    <div className="history-page">
      <div className="recipes-list">
        {mockRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-header">
              <div className="target-color">
                <div
                  className="color-preview"
                  style={{ backgroundColor: recipe.targetColor }}
                />
                <span className="color-code">{recipe.targetColor}</span>
              </div>
              <span className="recipe-date">
                {new Date(recipe.date).toLocaleDateString()}
              </span>
            </div>

            <div className="recipe-ingredients">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient">
                  <div
                    className="ingredient-color"
                    style={{ backgroundColor: ingredient.color }}
                  />
                  <span className="ingredient-code">{ingredient.color}</span>
                  <span className="ingredient-percentage">
                    {ingredient.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

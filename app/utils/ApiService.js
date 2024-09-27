// function to get A randomRecipe
export const getRandomRecipe = async () => {
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await res?.json();
    if (data?.meals) return { meals: data?.meals, error: null };
  } catch (error) {
    return { meals: null, error: error?.message };
  }
};
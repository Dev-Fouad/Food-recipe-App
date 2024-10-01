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

// function to get meal by name
export const getMeal = async () => {
  try {
    const res = await fetch(
      "www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
    );
    const data = await res?.json();
    if (data?.meals) return { meals: data?.meals, error: null };
  } catch (error) {
    return { meals: null, error: error?.message };
  }
};
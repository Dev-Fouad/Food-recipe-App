import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRandomRecipe } from "../utils/ApiService";
import { RandomMeal } from "../utils/types";
import { XCircle } from "lucide-react";
import { Searchrecipe } from "../components/searchRecipe";

export const meta: MetaFunction = () => {
  return [
    { title: "Food-Recipe-App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type loaderdata = {
  // this implies that the "random Meal type is whatever type getRandom resolves to"
  randomRecipe: Awaited<ReturnType<typeof getRandomRecipe>>;
};

export const loader = async () => {
  return json({
    randomRecipe: await getRandomRecipe(),
  });
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const recipeValue = String(formData.get("text"));

  const errors: { recipevalue?: string } = {};

  if (!recipeValue) {
    errors.recipevalue = "Please enter a valid recipe name";
  }

  if (Object.keys(errors).length) {
    return {
      errors: Object.keys(errors).length ? errors : null
    };
  }

  return null
}

export default function Index() {
  const { randomRecipe } = useLoaderData() as loaderdata;

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Random Recipe
        </h1>

        <section>
          {randomRecipe?.error ? (
            <div className="flex items-center justify-center min-h-[400px] w-full">
              <div className="text-center bg-white p-6 rounded-lg shadow-md">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Oops! Something went wrong
                </h2>
                <p className="text-gray-800 mb-4">{randomRecipe.error}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              {randomRecipe?.meals.map((meal: RandomMeal) => (
                <div
                  id={meal.idMeal}
                  key={meal.idMeal}
                  className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full"
                >
                  <div className="relative h-64">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 truncate">
                      {meal.strMeal}
                    </h2>
                    <div className="flex space-x-2 cursor-pointer">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {meal.strCategory}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {meal.strArea}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Searchrecipe />
    </>
  );
}

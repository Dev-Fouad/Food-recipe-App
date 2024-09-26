import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRandomMeal } from "../utils/ApiService";
import { RandomMeal } from "../utils/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Food-Recipe-App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type loaderdata = {
  // this implies that the "random Meal type is whatever type getRandom resolves to"
  randomMeal: Awaited<ReturnType<typeof getRandomMeal>>;
};

export const loader = async () => {
  return json({
    randomMeal: await getRandomMeal(),
  });
};

export default function Index() {
  const { randomMeal } = useLoaderData() as loaderdata;

  return (
    <div>
      {randomMeal?.meals.map((meal: RandomMeal) => {
        return (
          <div key={Math.random() * 10}>
            <img src={meal.strMealThumb} alt="" />
          </div> 
        );
      })}
    </div>
  );
}

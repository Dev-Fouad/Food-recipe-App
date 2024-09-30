import { Form, useActionData } from "@remix-run/react";
import { Search } from "lucide-react";
import { action } from "~/routes/_index";


export const Searchrecipe = () => {
  const value = useActionData<typeof action>()
  console.log(value)

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Search For A Recipe
          </h1>
        </div>
        <Form className="max-w-2xl mx-auto" method="post">
          <div className="relative">
            <input
              type="text"
              name="text"
              placeholder="Enter recipe name"
              className={`w-full px-4 py-2
               text-gray-800 bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
            />
            <button
              name="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-blue-500"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

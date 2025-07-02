// CURD and sort 
"use client";

import { useState } from "react";

type foodType = {
  [key: string]: {
    color: string;
    cal: number;
  };
};
export default function FunctionName() {
  const [foods, setFoods] = useState<foodType>({
    apple: {
      color: "red",
      cal: 400,
    },
    mango: {
      color: "yellow",
      cal: 300,
    },
  });
  const keys = Object.keys(foods) as Array<keyof typeof foods>;
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const KeyVal = formData.get("key") as string;
    try {
      setFoods((prev) => ({
        ...prev,
        [KeyVal]: {
          color: formData.get("color") as string,
          cal: parseInt(formData.get("cal") as string) | 0,
        },
      }));
    } catch (e) {
      console.log("Error Occured");
    }
  };
  const removeVal = (itemKey: string) => {
    setFoods((prev) => {
      const updated = { ...prev };
      delete updated[itemKey];
      return updated;
    });
  };
  const sortAscendingCal = () => {
    setFoods((prev) => {
      const sortedEntries = Object.entries(prev).sort(
        ([, a], [, b]) => a.cal - b.cal
      );
      return Object.fromEntries(sortedEntries);
    });
  };
  const sortAscendingColor = () => {
    setFoods((prev) => {
      const sortedEntries = Object.entries(prev).sort(([,a], [,b]) =>
        a.color.localeCompare(b.color)
      );
      return Object.fromEntries(sortedEntries);
    });
  };
  const sortAscendingKeys = () => {
    setFoods((prev) => {
      const sortedEntries = Object.entries(prev).sort(([a], [b]) =>
        a.localeCompare(b)
      );
      return Object.fromEntries(sortedEntries);
    });
  };

  return (
    <div className="grid h-screen place-items-center ">
      <table className="shadow-md rounded border border-gray-200 m-3">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 border cursor-pointer" onClick={sortAscendingKeys}>⬇️ Key</th>
            <th className="px-4 py-2 border cursor-pointer" onClick={sortAscendingColor} >⬇️Color</th>
            <th className="px-4 py-2 border cursor-pointer" onClick={sortAscendingCal}>⬇️Calories</th>
            <th className="px-4 py-2 border">Remove</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((item) => (
            <tr key={item} className="text-center">
              <td className="border px-4 py-2">{item}</td>
              <td className="border px-4 py-2">{foods[item].color}</td>
              <td className="border px-4 py-2">{foods[item].cal}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => removeVal(item.toString())}
                  className="bg-red-300 hover:bg-red-500 px-2 py-1 rounded text-sm"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-2 p-3 bg-red-500"
          action=""
        >
          <input
            required
            name="key"
            className="outline "
            placeholder="Key"
            type="text"
          />
          <input
            required
            name="color"
            className="outline "
            placeholder="Color"
            type="text"
          />
          <input
            required
            name="cal"
            className="outline "
            placeholder="Cal"
            type="text"
          />

          <input
            type="submit"
            className="bg-red-300 p-2 shadow-sm hover:bg-red-400 shadow-white"
            value={"Submit"}
          />
        </form>
      </>
    </div>
  );
}

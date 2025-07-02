import { useContext } from "react";
import { PropContext } from "./page";

export default function Component2() {
  const context = useContext(PropContext);

  if (!context) {
    throw new Error("Component2 must be used within a PropContext.Provider");
  }

  const { value, setValue } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="border p-12 text-white">
      Component 3
      <input
        type="text"
        className="outline m-1 bg-slate-900"
        value={value}
        onChange={handleChange}
      />
      <div className="mt-2">Context value: {value}</div>
    </div>
  );
}

import { PropContext } from "./page";
import Component2 from "./comp2";
import { useContext } from "react";
export default function Component1() {
  const value=useContext(PropContext)
  return <div className="border p-12">
    Component 2
    {/* <input type="text" className="outline m-1 bg-slate-900" name="" id="" /> */}
        {value?.value}
        <Component2/>
    </div>;
}

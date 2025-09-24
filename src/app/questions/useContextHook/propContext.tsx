"use client"
import {createContext} from "react"

interface PropContextType {
  value: string;
  setValue: (val: string) => void;
}

export const PropContext = createContext<PropContextType | undefined>(
  undefined
);

"use client"
import { useState,useEffect } from "react"
import p5Types from "p5"; //Import this for typechecking and intellisense
import Sketch from "react-p5";
export default function Card(){
    
  type playingCard={
    suit: string | any,
    rank: string,
    faceup: boolean,
  }

    const setup = (p5:p5Types, canvasParentRef:Element) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);

      };
    
      const draw = (p5:p5Types) => {
        p5.background(0);
        p5.textSize(10);
        p5.fill(255);
        p5.stroke(0);
        p5.strokeWeight(4);
        // p5.ellipse(p5.mouseX,p5.mouseX, 70, 70);
        
      };

    return (
        <>
          <Sketch setup={setup} draw={draw}>
         </Sketch>            
        </>
    )
}
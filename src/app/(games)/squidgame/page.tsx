"use client"
import React, { useRef, useEffect, useState } from "react";

// Card class for general card setup
class Card {
  name: string;
  posX: number;
  posY: number;
  width: number;
  height: number;

  constructor(name: string, posX: number, posY: number) {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.width = 80; // Width of each card
    this.height = 120; // Height of each card
  }

  // Method to draw the card on canvas
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.posX * 90, this.posY * 130, this.width, this.height); // 90 and 130 are spacing factors
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(this.name, this.posX * 90 + 10, this.posY * 130 + 30); // Draw card name
  }
}

// PlayerCard class (extends from Card)
class PlayerCard extends Card {
  constructor(posX: number, posY: number) {
    super("Player", posX, posY);
  }

  // Add player-specific movement logic here
  move(direction: string) {
    if (direction === "up") this.posY--;
    if (direction === "down") this.posY++;
    if (direction === "left") this.posX--;
    if (direction === "right") this.posX++;
  }
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerCard, setPlayerCard] = useState<PlayerCard | null>(null);

  useEffect(() => {
    const player = new PlayerCard(0, 0); // Initial position of the player card at (0, 0)
    setPlayerCard(player);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      // Function to draw the card
      const draw = () => {
        if (ctx) {
          // Clear the canvas before each redraw
          ctx.clearRect(0, 0, 1000, 1000);

          // Draw the player card
          player.draw(ctx);
        }
      };

      // Handle key presses to move the player
      const handleKeyPress = (event: KeyboardEvent) => {
        if (!player) return;

        switch (event.key) {
          case "ArrowUp":
            player.move("up");
            break;
          case "ArrowDown":
            player.move("down");
            break;
          case "ArrowLeft":
            player.move("left");
            break;
          case "ArrowRight":
            player.move("right");
            break;
          default:
            break;
        }

        draw(); // Redraw the updated canvas after the move
      };

      // Attach event listener for keydown events
      window.addEventListener("keydown", handleKeyPress);

      // Initial drawing
      draw();

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [playerCard]);

  return (
    <div>
      <h1>Card Game</h1>
      <canvas ref={canvasRef} width={500} height={400} style={{ border: "1px solid black" }}></canvas>
    </div>
  );
}

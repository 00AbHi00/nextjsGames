"use client";

import { useEffect, useState } from "react";

type SensorData = {
  x: number | null;
  y: number | null;
  z: number | null;
};

const defaultWords = ["Elephant", "Superman", "Guitar", "Pizza", "Moonwalk"];

export default function HeadsUpGame({ customWords = "" }: { customWords?: string }) {
  const [data, setData] = useState<SensorData>({ x: null, y: null, z: null });
  const [status, setStatus] = useState("idle");
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(10);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    // Prepare the list
    const wordList = customWords
      ? customWords.split(",").map((w) => w.trim())
      : defaultWords;

    setWords(shuffle(wordList).slice(0, 3)); // Pick 3 random
  }, [customWords]);

  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          handleNextWord(); // skip word if no answer
          return 10;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const handleMotion = (e: DeviceMotionEvent) => {
      const y = e.acceleration?.y ?? 0;
      const z = e.acceleration?.z ?? 0;

      setData({ x: e.acceleration?.x ?? 0, y, z });

      if (y > 4 && z > 4) {
        // Move Up = Correct
        registerAnswer("correct");
      } else if (y < -4 && z < -4) {
        // Move Down = Wrong
        registerAnswer("wrong");
      }
    };

    window.addEventListener("devicemotion", handleMotion);

    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [gameStarted, currentWordIndex]);

  const registerAnswer = (type: "correct" | "wrong") => {
    if (result !== null) return; // Already answered this word

    setResult(type);
    if (type === "correct") setScore((s) => s + 1);

    setTimeout(() => {
      setResult(null);
      handleNextWord();
    }, 1000);
  };

  const handleNextWord = () => {
    if (currentWordIndex < 2) {
      setCurrentWordIndex((i) => i + 1);
      setTimer(10);
    } else {
      setGameStarted(false);
      setStatus("finished");
    }
  };

  const requestPermissionsAndStart = async () => {
    setStatus("requesting-permission");
    try {
      const dmReq = (DeviceMotionEvent as any)?.requestPermission;
      if (typeof dmReq === "function") {
        const r = await dmReq();
        if (r !== "granted") throw new Error("DeviceMotion permission denied");
      }
      setStatus("permission-granted");
    } catch (err) {
      console.error("Permission request failed", err);
      setStatus("permission-denied");
      return;
    }

    setStatus("listening");
    setGameStarted(true);
    setCurrentWordIndex(0);
    setScore(0);
    setTimer(10);
  };

  const currentWord = words[currentWordIndex];

  return (
    <div style={{ padding: 30, fontFamily: "system-ui, sans-serif", textAlign: "center" }}>
      {!gameStarted && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={requestPermissionsAndStart}
        >
          Start Game
        </button>
      )}

      {gameStarted && (
        <div>
          <h2 style={{ fontSize: 32, margin: "20px 0" }}>Act Out:</h2>
          <div
            style={{
              border: "2px solid black",
              padding: "20px",
              fontSize: 24,
              borderRadius: "10px",
              minHeight: "80px",
              marginBottom: "20px",
            }}
          >
            {currentWord}
          </div>

          <div>Timer: {timer}s</div>

          {result && (
            <div style={{ fontSize: 28, marginTop: 10 }}>
              {result === "correct" ? "✅ Correct!" : "❌ Wrong!"}
            </div>
          )}

          <div style={{ marginTop: 30 }}>Score: {score}</div>
        </div>
      )}

      {status === "finished" && (
        <div>
          <h2>🎉 Game Over!</h2>
          <p>Your score: {score}/3</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

function shuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

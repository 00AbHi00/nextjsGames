// Sensor data doesn't work with http so need to use
// localtunnel and need to keep public ip as password in the device accessing it
// localtunnel --port 3000 --subdomain abhishek
"use client";

import { useState } from "react";

type SensorData = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  x: number | null;
  y: number | null;
  z: number | null;
  rotationRateX: number | null;
  rotationRateY: number | null;
  rotationRateZ: number | null;
};

export default function SensorDemo() {
  const [data, setData] = useState<SensorData>({
    alpha: null,
    beta: null,
    gamma: null,
    x: null,
    y: null,
    z: null,
    rotationRateX: null,
    rotationRateY: null,
    rotationRateZ: null,
  });
  const [status, setStatus] = useState<string>("idle");

  const handleStart = async () => {
    setStatus("requesting-permission");
    try {
      const dmReq = (DeviceMotionEvent as any)?.requestPermission;
      const doReq = (DeviceOrientationEvent as any)?.requestPermission;

      if (typeof dmReq === "function" || typeof doReq === "function") {
        if (typeof dmReq === "function") {
          const r = await dmReq();
          if (r !== "granted")
            throw new Error("DeviceMotion permission denied");
        }
        if (typeof doReq === "function") {
          const r = await doReq();
          if (r !== "granted")
            throw new Error("DeviceOrientation permission denied");
        }
      }
      setStatus("permission-granted");
    } catch (err) {
      console.error("Permission request failed", err);
      setStatus("permission-denied");
      return;
    }

    setStatus("listening");

    const handleMotion = (e: DeviceMotionEvent) => {
      setData((prevData) => ({
        ...prevData,
        x: e.acceleration?.x ?? null,
        y: e.acceleration?.y ?? null,
        z: e.acceleration?.z ?? null,
        rotationRateX: e.rotationRate?.alpha ?? null,
        rotationRateY: e.rotationRate?.beta ?? null,
        rotationRateZ: e.rotationRate?.gamma ?? null,
      }));
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      setData((prevData) => ({
        ...prevData,
        alpha: e.alpha ?? null,
        beta: e.beta ?? null,
        gamma: e.gamma ?? null,
      }));
    };

    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  };

  return (
    <div style={{ padding: 100, fontFamily: "system-ui, sans-serif" }}>
      <button
        className="bg-lime-700 m-3 p-3 rounded-2xl "
        onClick={handleStart}
        style={{ padding: "8px 12px", cursor: "pointer" }}
      >
        Start Demo
      </button>
      <div>Status: {status}</div>
      <div>
        <h4>Orientation</h4>
        <p>X (Beta): {data.beta !== null ? data.beta.toFixed(2) : "N/A"}°</p>
        <p>Y (Gamma): {data.gamma !== null ? data.gamma.toFixed(2) : "N/A"}°</p>
        <p>Z (Alpha): {data.alpha !== null ? data.alpha.toFixed(2) : "N/A"}°</p>
      </div>

      <div>
        <h4>Accelerometer</h4>
        <p>X: {data.x !== null ? data.x.toFixed(2) : "N/A"} m/s²</p>
        <p>Y: {data.y !== null ? data.y.toFixed(2) : "N/A"} m/s²</p>
        <p>Z: {data.z !== null ? data.z.toFixed(2) : "N/A"} m/s²</p>
      </div>

      <div>
        <h4>Gyroscope</h4>
        <p>
          X:{" "}
          {data.rotationRateX !== null ? data.rotationRateX.toFixed(2) : "N/A"}
          °/s
        </p>
        <p>
          Y:{" "}
          {data.rotationRateY !== null ? data.rotationRateY.toFixed(2) : "N/A"}
          °/s
        </p>
        <p>
          Z:{" "}
          {data.rotationRateZ !== null ? data.rotationRateZ.toFixed(2) : "N/A"}
          °/s
        </p>
      </div>
    </div>
  );
}

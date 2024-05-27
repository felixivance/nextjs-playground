"use client";

import React from "react";

const gridSize = 20;

type point = {
  x: number;
  y: number;
};

const SnakeGame = () => {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      {
        // Grid
        Array.from({ length: gridSize }).map((_, y) => (
          <div key={y} className="flex">
            {Array.from({ length: gridSize }).map((_, x) => (
              <div key={x} className="w-6 h-6 border border-gray-200"></div>
            ))}
          </div>
        ))
      }
    </div>
  );
};

export default SnakeGame;

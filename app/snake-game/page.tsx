"use client";

import React, { KeyboardEvent, useEffect, useState } from "react";

const gridSize = 20;

type Point = {
  x: number;
  y: number;
};

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export const meta = {
  title: "Snake Game",
  description: "Snake Game in React, TypeScript, and Tailwind CSS",
};

const SnakeGame = () => {
  const [snake, setSnake] = useState<Point[]>([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(-1);

  const generateFood = () => {
    let x = Math.floor(Math.random() * gridSize);
    let y = Math.floor(Math.random() * gridSize);

    setFood({ x, y });
    setScore(score + 1);
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const snakeHead = { ...newSnake[0] };

    if (direction == "UP") {
      snakeHead.y -= 1;
    }
    if (direction == "DOWN") {
      snakeHead.y += 1;
    }
    if (direction == "LEFT") {
      snakeHead.x -= 1;
    }

    if (direction == "RIGHT") {
      snakeHead.x += 1;
    }

    if (
      snakeHead.x > gridSize ||
      snakeHead.x < 0 ||
      snakeHead.y > gridSize ||
      snakeHead.y < 0
    ) {
      setIsGameOver(true);
      return;
    }

    //if the snake head eats its head or the body
    if (
      newSnake.some(
        (point, index) =>
          index !== 0 && point.x === snakeHead.x && point.y === snakeHead.y
      )
    ) {
      setIsGameOver(true);
      return;
    }

    newSnake.unshift(snakeHead);

    // if the snake eats the food
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [snake, direction]);

  useEffect(() => {
    generateFood();
  }, []);

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isGameOver) return;
    if (event.key === "ArrowUp" && direction != "DOWN") setDirection("UP");
    if (event.key === "ArrowDown" && direction != "UP") setDirection("DOWN");
    if (event.key === "ArrowLeft" && direction !== "RIGHT")
      setDirection("LEFT");
    if (event.key === "ArrowRight" && direction !== "LEFT")
      setDirection("RIGHT");
  };

  return (
    <div
      tabIndex={0} // to make the div focusable
      autoFocus // to make the div focusable
      onKeyDown={handleKeyPress}
      id="snake-div"
      className="flex min-h-screen flex-col justify-center items-center p-24"
    >
      <h1 className="text-4xl font-bold pb-2">Snake Game</h1>
      <div className="grid grid-cols-20 grid-rows-20 border border-black">
        {/* // game over */}
        {isGameOver && (
          <div className="absolute bg-black bg-opacity-50 inset-0 flex flex-col items-center justify-center">
            {score < 10 && (
              <h1 className="text-4xl text-white font-bold"> 😭 Game Over!</h1>
            )}
            {score > 10 && (
              <h2 className="text-2xl text-white font-bold pt-2">
                😎 You are a legend! <br /> Thank you for trying out my game
              </h2>
            )}
            {/*  reset button */}
            <button
              onClick={() => {
                setSnake([
                  { x: 0, y: 0 },
                  { x: 0, y: 1 },
                  { x: 0, y: 2 },
                ]);
                setFood({ x: 15, y: 15 });
                setDirection("RIGHT");
                setIsGameOver(false);
                setScore(0);
                // set focus to the div #snake-div
                document.getElementById("snake-div")?.focus();
              }}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
            >
              Restart 🦑
            </button>
          </div>
        )}
        {
          // Grid
          Array.from({ length: gridSize }).map((_, y) => (
            <div key={y} className="flex">
              {Array.from({ length: gridSize }).map((_, x) => (
                <div key={x} className="w-6 h-6 border border-gray-300">
                  {
                    // Snake
                    snake.some((point) => point.x === x && point.y === y) && (
                      <div className="bg-black w-full h-full" />
                    )
                  }
                  {
                    // Food
                    food.x === x && food.y === y && (
                      <div className="bg-red-500 w-full h-full" />
                    )
                  }
                </div>
              ))}
            </div>
          ))
        }
      </div>
      <div className="pt-4">
        <h2 className="text-2xl font-bold">Score: {score == -1 ? 0 : score}</h2>
      </div>
    </div>
  );
};

export default SnakeGame;

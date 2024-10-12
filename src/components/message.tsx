"use client";

import { getSocket } from "@/config/socket";
import { useEffect, useMemo, useState } from "react";

export default function Message() {
  const [counter, setCounter] = useState(0);
  const socket = useMemo(() => {
    const socket = getSocket();
    socket.connect();
    return socket;
  }, []);

  useEffect(() => {
    console.log({ socket });
    socket.emit("message", "Kamal kumar sent a message");

    socket.on("add", (payload) => {
      console.log({ payload });
      setCounter((prev) => prev + 1);
    });

    socket.on("subtract", (payload) => {
      console.log({ payload });
      setCounter((prev) => prev - 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleClick = (type: string) => {
    console.log({ type });
    if (type === "add") {
      socket.emit("add", 1);
    } else if (type === "subtract") {
      socket.emit("subtract", 1);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="text-5xl font-bold">{counter}</h1>
      <div className="flex space-x-4 items-center mt-10">
        <button
          className="py-2 px-6  rounded-md bg-green-400 text-white"
          onClick={() => handleClick("add")}
        >
          Add
        </button>
        <button
          className="py-2 px-6 rounded-md bg-red-400 text-white"
          onClick={() => handleClick("subtract")}
        >
          Subtract
        </button>
      </div>
    </div>
  );
}

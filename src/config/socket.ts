import { io, Socket } from "socket.io-client";

let socket: Socket;

export function getSocket(): Socket {
  console.log({ publicNextUrl: process.env.NEXT_PUBLIC_APP_URL });
  if (socket) {
    return socket;
  }

  socket = io(process.env.NEXT_PUBLIC_APP_URL as string, {
    autoConnect: false,
  });
  return socket;
}

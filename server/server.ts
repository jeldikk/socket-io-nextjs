import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT) || 3000;

const app = next({ dev, hostname, port });
const nextHandler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(nextHandler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("message", (payload) => {
      console.log("The first message is ", payload);
    });

    socket.on("add", (payload) => {
      io.emit("add", payload);
    });

    socket.on("subtract", (payload) => {
      io.emit("subtract", payload);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log("Server is listening on port ", port);
    });
});

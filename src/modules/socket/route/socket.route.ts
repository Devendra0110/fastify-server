import fastifyPlugin from "fastify-plugin";
import {Server} from 'socket.io';

export default fastifyPlugin(
    (fastify, options, next) =>{
        const io = new Server(fastify.server, options);
        fastify.decorate('io', io);
        io.on('connection', socket => {
            console.log("user connected");

            socket.on("chat", data=>{
            console.log(data);
            });

            socket.on("disconnect", (reason) => {
                console.log(reason); 
                console.log("user disconnected");
            });
        });

        next();
    }, {
  name: 'fastify-socket.io',
});

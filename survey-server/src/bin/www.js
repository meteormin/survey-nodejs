#!/usr/bin/env node

/**
 * Module dependencies.
 */
import Application from "../app";
import express from "express";
import debugLib from "debug";
import http from "http";

const debug = debugLib("survey-server:server");

/**
 * Get port from environment and store in Express.
 */

const wrapper = new Application(express());

const appConfig = wrapper.make('config.app');

const port = normalizePort(appConfig.port || "3000");
// app.set("port", port);

wrapper.app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(wrapper.app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
    console.log(`${appConfig.name} Start...`);
    console.log(`Application info`, appConfig);
});

server.on("listening", onListening);

server.on("error", onError);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}

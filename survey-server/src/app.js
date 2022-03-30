import express from "express";
import Container from './utils/container';
import * as register from './utils/register';

class Application extends Container {
    constructor(app, dependency = {}) {
        super(dependency);

        if (!app instanceof express) {
            throw new Error("app is not express");
        }

        this._app = app;
        this.bootstrap();
    }

    get app() {
        return this._app;
    }

    bootstrap() {
        register.containerRegister(this);
        register.middlewareRegister(this);
        register.routerRegister(this);
    }

}

export default Application;

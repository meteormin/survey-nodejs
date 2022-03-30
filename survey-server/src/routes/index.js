import express from "express";

const router = express.Router();

/**
 *
 * @param {Container} container
 * @return {Router}
 */
export default (container) => {
    /* GET home page. */
    router.get("/", function (req, res, next) {
        res.render("index", { title: "Express" });
    });
    return router;
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signinControllers_1 = require("../controllers/signinControllers");
const signupControllers_1 = require("../controllers/signupControllers");
const profileControllers_1 = require("../controllers/profileControllers");
const stockControllers_1 = require("../controllers/stockControllers");
const indexController_1 = require("../controllers/indexController");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        //Index
        this.router.get("/", indexController_1.indexGet);
        //SignUp
        this.router.get("/signup", signupControllers_1.signupGet);
        this.router.post("/signup", signupControllers_1.signupPost);
        //SignIn
        this.router.get("/signin", signinControllers_1.signinGet);
        this.router.post("/signin", signinControllers_1.signinPost);
        //profile
        this.router.get("/profile", profileControllers_1.profileGet);
        //stock
        this.router.get("/stock", stockControllers_1.getStock);
        this.router.get("/stock/form", (req, res) => {
            res.render("productForm.ejs");
        });
        this.router.get("/stock/addProduct", stockControllers_1.addProductG);
        this.router.post("/addProduct", stockControllers_1.addProduct);
        this.router.get("/modifyProduct/:id", stockControllers_1.modifyProductG);
        this.router.post("/modifyProduct/:id", stockControllers_1.modifyProductP);
        this.router.post("/logout", (req, res) => {
            res.clearCookie("user_token").redirect("/");
        });
    }
}
const routes = new Routes();
exports.default = routes.router;

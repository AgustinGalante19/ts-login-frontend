"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinPost = exports.signinGet = void 0;
const axios_1 = __importDefault(require("axios"));
const signinGet = (req, res) => {
    const token = req.cookies.user_token;
    if (!token) {
        const alerta = "";
        res.render("signinForm.ejs", { alerta });
    }
    else {
        res.redirect("profile");
    }
};
exports.signinGet = signinGet;
const signinPost = (req, res) => {
    const { username, password } = req.body;
    axios_1.default.post(process.env.SIGN_IN || "", { username, password })
        .then((response) => {
        const tokenReceived = response.headers["auth-token"];
        if (tokenReceived) {
            axios_1.default.get(process.env.GET_DATA || "", {
                "headers": {
                    "auth-token": tokenReceived
                }
            })
                .then((response) => {
                if (response) {
                    console.log("Token received.");
                    res.cookie("user_token", tokenReceived);
                    res.status(200).redirect("/profile");
                }
                else {
                    res.status(400).redirect("/signup");
                    console.log("Invalid token.");
                }
            });
        }
        else {
            res.status(401).redirect("/signup");
            console.log("Token was not received.");
        }
    }).catch((err) => {
        const alerta = { message: req.flash("error", "invalid user or psw.") };
        res.render("signinForm.ejs", { alerta });
    });
};
exports.signinPost = signinPost;

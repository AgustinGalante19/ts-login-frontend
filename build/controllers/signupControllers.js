"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupPost = exports.signupGet = void 0;
const axios_1 = __importDefault(require("axios"));
const validationSchemas_1 = require("../schemas/validationSchemas");
const signupGet = (req, res) => {
    const token = req.cookies.user_token;
    if (!token) {
        const alerta = "";
        res.render("signupForm.ejs", { alerta });
    }
    else {
        res.redirect("/profile");
    }
};
exports.signupGet = signupGet;
const signupPost = async (req, res) => {
    const { username, email, password, password2 } = req.body;
    //* validacion
    await validationSchemas_1.userSchema.validateAsync({ username, email, password, repeat_password: password2 }).then(() => {
        //*empieza la peticion a la api
        axios_1.default.post(process.env.SIGN_UP || "", { username, email, password })
            .then((response) => {
            const tokenReceived = response.headers["auth-token"].toString();
            if (tokenReceived) {
                axios_1.default.get(process.env.GET_DATA || "", {
                    headers: {
                        "auth-token": tokenReceived
                    }
                })
                    .then((response) => {
                    if (response) {
                        res.cookie("user_token", tokenReceived);
                        res.status(200).redirect("/signin");
                    }
                    else {
                        res.status(400).redirect("/");
                    }
                }).catch(err => {
                    res.status(400).send("email already in use.").end();
                });
            }
        }).catch(err => {
            res.status(500).send(err).end();
        });
        //*termina la peticion a la api
    })
        .catch(err => {
        const alerta = {
            message: err.details[0].message
        };
        res.status(400).render("signupform.ejs", { alerta });
    });
};
exports.signupPost = signupPost;

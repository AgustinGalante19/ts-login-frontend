"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileGet = void 0;
const axios_1 = __importDefault(require("axios"));
const profileGet = (req, res) => {
    const token = req.cookies.user_token;
    try {
        if (token) {
            req.headers["auth-token"] = token;
            axios_1.default.get(process.env.GET_DATA || "", {
                headers: {
                    "auth-token": token,
                }
            })
                .then((response) => {
                const usuario = {
                    id: response.data._id,
                    username: response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1),
                    email: response.data.email
                };
                return res.render("onlyUsers/profile.ejs", { usuario });
            });
        }
        else {
            return res.status(500).send("error <a href='/'>back</a>").end();
        }
    }
    catch (err) {
        return res.status(500).send(err).end();
    }
};
exports.profileGet = profileGet;

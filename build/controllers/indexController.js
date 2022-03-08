"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexGet = void 0;
const axios_1 = __importDefault(require("axios"));
const indexGet = (req, res, next) => {
    const token = req.cookies.user_token;
    if (token) {
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
            return res.render("onlyUsers/index.ejs", { usuario });
        })
            .catch(err => {
            return res.send("server error, try again later.");
        });
    }
    else {
        return res.render("index.ejs");
    }
};
exports.indexGet = indexGet;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const fetch = require('node-fetch');
const validateToken = async (req, res, next) => {
    const token = req.header("auth-token");
    await fetch(process.env.TOKEN_VALIDATION, {
        headers: {
            "auth-token": token
        }
    })
        .then(() => {
        console.log("Token validated successfully.");
        next();
    }).catch((err) => {
        res.send("invalid token.");
        res.end();
        return err;
    });
    if (!token) {
        res.send("token not found.").end();
    }
};
exports.validateToken = validateToken;

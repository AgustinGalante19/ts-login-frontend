const fetch = require('node-fetch');
import { Request, Response, NextFunction } from 'express';
export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token: string | any = req.header("auth-token");
    await fetch(process.env.TOKEN_VALIDATION, {
        headers: {
            "auth-token": token
        }
    })
        .then(() => {
            console.log("Token validated successfully.");
            next();
        }).catch((err: Error) => {
            res.send("invalid token.");
            res.end();
            return err
        });
    if (!token) {
        res.send("token not found.").end();
    }
}

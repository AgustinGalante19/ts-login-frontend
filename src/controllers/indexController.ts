import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from "axios";
import { IUser } from '../interfaces/interfaces';

export const indexGet = (req: Request, res: Response, next: NextFunction) => {

    const token: string = req.cookies.user_token;
    console.log(token);
    
    if (!token) {
        res.render("index.ejs");
        next();
    }
    req.headers["auth-token"] = token;
        axios.get(process.env.TOKEN_VALIDATION || "", {
            headers: {
                "auth-token": token,
            }
        })
            .then((response: AxiosResponse) => {
                const usuario: IUser = {
                    id: response.data._id,
                    username: response.data.username,
                    email: response.data.email
                }
                res.render("index.ejs", { usuario });
            });
}
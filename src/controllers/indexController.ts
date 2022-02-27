import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from "axios";
import { IUser } from '../interfaces/interfaces';

export const indexGet = (req: Request, res: Response, next: NextFunction) => {

    const token: string = req.cookies.user_token;
    if (token) {
        axios.get(process.env.GET_DATA || "", {
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
                res.render("onlyUsers/index.ejs", { usuario });
            });
    } else {
        res.render("index.ejs")
    }
}
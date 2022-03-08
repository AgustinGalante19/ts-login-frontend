import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from "axios";
import { IUser } from '../interfaces/User';

export const indexGet = (req: Request, res: Response, next: NextFunction): Promise<Response> | void => {

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
                    username: response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1),
                    email: response.data.email
                }
                return res.render("onlyUsers/index.ejs", { usuario });
            })
            .catch(err => {
                return res.send("server error, try again later.");
            });
    } else {
        return res.render("index.ejs");
    }
}
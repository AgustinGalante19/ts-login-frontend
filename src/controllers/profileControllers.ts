import { Request, Response } from "express";
import axios, { AxiosResponse } from 'axios';
import { IUser } from '../interfaces/User';

export const profileGet = (req: Request, res: Response): Promise<Response> | any => {

    const token: string = req.cookies.user_token;
    try {
        if (token) {
            req.headers["auth-token"] = token;
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
                    return res.render("onlyUsers/profile.ejs", { usuario });
                });
        } else {
            return res.status(500).send("error <a href='/'>back</a>").end();
        }
    } catch (err) {
        return res.status(500).send(err).end();
    }
}
import { Request, Response } from "express";
import axios, { AxiosResponse } from 'axios';
import { IUser } from '../interfaces/interfaces';

export const profileGet = (req: Request, res: Response) => {

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
                        username: response.data.username,
                        email: response.data.email
                    }
                    res.render("onlyUsers/profile.ejs", { usuario });
                });
        } else {
            //* WORKS.
            res.status(500).send("error <a href='/'>back</a>").end();
        }
    }catch(err){
        res.status(500).send(err).end();
    }
}
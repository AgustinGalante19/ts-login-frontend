import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import { IUserPrivate } from '../interfaces/interfaces';

export const signupGet = (req: Request, res: Response) => {
    const token: string = req.cookies.user_token;
    if (!token) {
        res.render("signupForm.ejs");
    } else {
        res.redirect("/profile");
    }
}

export const signupPost = (req: Request, res: Response) => {
    const { username, email, password }: IUserPrivate = req.body;
    axios.post(process.env.SIGN_UP ||"", { username, email, password })
        .then((response: AxiosResponse) => {
            const tokenReceived: string = response.headers["auth-token"].toString();
            if (tokenReceived) {
                axios.get(process.env.GET_DATA || "", {
                    headers: {
                        "auth-token": tokenReceived
                    }
                })
                    .then((response: AxiosResponse) => {
                        if (response) {
                            res.cookie("user_token", tokenReceived);
                            res.status(200).redirect("/signin");
                        } else {
                            res.status(400).redirect("/");
                        }
                    })
            }
        });
}

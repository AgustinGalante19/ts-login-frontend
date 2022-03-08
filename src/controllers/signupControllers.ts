import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import { IUserPrivate } from '../interfaces/User';
import { userSchema } from "../schemas/validationSchemas";
export const signupGet = (req: Request, res: Response) => {
    const token: string = req.cookies.user_token;
    if (!token) {
        const alerta = "";
        res.render("signupForm.ejs", { alerta });
    } else {
        res.redirect("/profile");
    }
}

export const signupPost = async (req: Request, res: Response) => {
    const { username, email, password, password2 }: IUserPrivate = req.body;

    //* validacion
    await userSchema.validateAsync({ username, email, password, repeat_password: password2 }).then(() => {
        //*empieza la peticion a la api
        axios.post(process.env.SIGN_UP || "", { username, email, password })
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
                        }).catch(err => {
                            res.status(400).send("email already in use.").end();
                        });
                }
            }).catch(err => {
                res.status(500).send(err).end();
            });
        //*termina la peticion a la api
    })
        .catch(err => {
            const alerta = {
                message: err.details[0].message
            }
            res.status(400).render("signupform.ejs", { alerta });
        });
}

import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios';

export const signinGet = (req: Request, res: Response) => {
    const token: string = req.cookies.user_token;
    if (!token) {
        const alerta = "";
        res.render("signinForm.ejs", { alerta });
    } else {
        res.redirect("profile");
    }
}

export const signinPost = (req: Request, res: Response) => {
    const { username, password } = req.body;
    axios.post(process.env.SIGN_IN || "", { username, password })
        .then((response: AxiosResponse) => {
            const tokenReceived: string = response.headers["auth-token"];
            if (tokenReceived) {
                axios.get(process.env.GET_DATA || "",
                    {
                        "headers": {
                            "auth-token": tokenReceived
                        }
                    })
                    .then((response: AxiosResponse) => {
                        if (response) {
                            console.log("Token received.");
                            res.cookie("user_token", tokenReceived);
                            res.status(200).redirect("/profile");
                        } else {
                            res.status(400).redirect("/signup");
                            console.log("Invalid token.");
                        }
                    })
            } else {
                res.status(401).redirect("/signup");
                console.log("Token was not received.");
            }
        }).catch((err) => {
            const alerta = { message: req.flash("error", "invalid user or psw.") }
            res.render("signinForm.ejs", { alerta });
        });
}
import { Request, Response } from "express";
import axios from "axios";
import { IProduct } from "../interfaces/Product";
import { productSchema } from "../schemas/validationSchemas";
import { IUser } from "../interfaces/User";

export const getStock = (req: Request, res: Response) => {

    const token: string = req.cookies.user_token;
    try {
        if (token) {
            axios.get(process.env.STOCK || "", {
                "headers": { "auth-token": token }
            })
                .then((result) => {
                    axios.get(process.env.GET_DATA || "", {
                        headers: {
                            "auth-token": token,
                        }
                    })
                        .then((response) => {
                            const usuario = {
                                id: response.data._id,
                                username: response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1),
                                email: response.data.email
                            }
                            const products = result.data.products;
                            res.render("onlyUsers/stock.ejs", { products, usuario });
                        });
                });
        } else {
            res.send("invalid token, signin again or signup").end();
        }
    } catch (err) {
        res.status(500).send(err).end();
    }
}

export const addProductG = async (req: Request, res: Response) => {
    const token: string = req.cookies.user_token;
    if (token) {
        try {
            axios.get(process.env.GET_DATA || "", {
                headers: {
                    "auth-token": token
                }
            }).then((response) => {
                const usuario: IUser = {
                    id: response.data._id,
                    username: response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1),
                    email: response.data.email
                }
                res.render("addProductForm.ejs", { usuario });
            });
        } catch (err) {
            res.status(400).send("something is wrong").end();
        }
    }
}

export const addProduct = async (req: Request, res: Response) => {
    const token: string = req.cookies.user_token;
    const { name, brand, model, quantity } = req.body;
    if (token) {
        axios.post(process.env.STOCK || "", { name, brand, model, quantity }, {
            headers: {
                "auth-token": token,
            }
        })
            .then(() => {
                res.redirect("/stock");
            });
    }
}

export const modifyProductG = (req: Request, res: Response) => {
    const { id } = req.params;
    const alerta = "";
    try {
        axios.get(process.env.STOCK + `/${id}`)
            .then((response) => {
                const product: IProduct = {
                    id,
                    name: response.data.name,
                    brand: response.data.brand,
                    model: response.data.model,
                    quantity: response.data.quantity,
                }

                //* obtener usuario por seller id.
                const token = req.cookies.user_token;
                axios.get(process.env.GET_DATA || "", {
                    headers: {
                        "auth-token": token
                    }
                }).then((response) => {
                    const usuario: IUser = {
                        id: response.data._id,
                        username: response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1),
                        email: response.data.email
                    }
                    res.render("onlyUsers/modifyProduct.ejs", { usuario, alerta, product });
                })
                    .catch((err) => {
                        res.status(404).send(err).end();
                    })
            }).catch(err => {
                res.status(400).send("error").end();
            })
    } catch (err) {
        res.status(500).send("error").end();
    }
}

export const modifyProductP = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, brand, model, quantity } = req.body;
        await productSchema.validateAsync({ name, brand, model, quantity })
            .then(() => {
                axios.put(process.env.STOCK + `/${id}`, { name, brand, model, quantity })
                    .then(() => {
                        res.redirect("/stock");
                    });
            })
            .catch(err => {
                const alerta = {
                    message: err.details[0].message
                }
                res.status(400).render("signupform.ejs", { alerta });
            })
    } catch (err) {
        res.status(500).end();
    }
}
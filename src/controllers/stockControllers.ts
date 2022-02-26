import { Request, Response } from "express";
import axios from "axios";
import { IProduct } from "../interfaces/interfaces";


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
                                username: response.data.username,
                                email: response.data.email
                            }
                            const products = result.data.products;
                            res.render("stock.ejs", { products, usuario });
                        });
                });
        } else {
            res.send("invalid token, signin again or signup").end();
        }
    } catch (err) {
        res.status(500).send(err).end();
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
    axios.get(process.env.STOCK + `/${id}`)
        .then((response) => {
            const product: IProduct = {
                id: id,
                name: response.data.name,
                brand: response.data.brand,
                model: response.data.model,
                quantity: response.data.quantity,
            }
            res.render("productForm.ejs", { product });
        });
}

export const modifyProductP = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, brand, model, quantity } = req.body;
    axios.put(process.env.STOCK + `/${id}`, { name, brand, model, quantity })
        .then(() => {
            res.redirect("/stock");
        });
}
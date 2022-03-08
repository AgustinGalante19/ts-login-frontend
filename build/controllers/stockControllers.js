"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyProductP = exports.modifyProductG = exports.addProduct = exports.addProductG = exports.getStock = void 0;
const axios_1 = __importDefault(require("axios"));
const validationSchemas_1 = require("../schemas/validationSchemas");
const getStock = (req, res) => {
    const token = req.cookies.user_token;
    try {
        if (token) {
            axios_1.default.get(process.env.STOCK || "", {
                "headers": { "auth-token": token }
            })
                .then((result) => {
                axios_1.default.get(process.env.GET_DATA || "", {
                    headers: {
                        "auth-token": token,
                    }
                })
                    .then((response) => {
                    const usuario = {
                        id: response.data._id,
                        username: response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1),
                        email: response.data.email
                    };
                    const products = result.data.products;
                    res.render("onlyUsers/stock.ejs", { products, usuario });
                });
            });
        }
        else {
            res.send("invalid token, signin again or signup").end();
        }
    }
    catch (err) {
        res.status(500).send(err).end();
    }
};
exports.getStock = getStock;
const addProductG = async (req, res) => {
    const token = req.cookies.user_token;
    if (token) {
        try {
            axios_1.default.get(process.env.GET_DATA || "", {
                headers: {
                    "auth-token": token
                }
            }).then((response) => {
                const usuario = {
                    id: response.data._id,
                    username: response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1),
                    email: response.data.email
                };
                res.render("addProductForm.ejs", { usuario });
            });
        }
        catch (err) {
            res.status(400).send("something is wrong").end();
        }
    }
};
exports.addProductG = addProductG;
const addProduct = async (req, res) => {
    const token = req.cookies.user_token;
    const { name, brand, model, quantity } = req.body;
    if (token) {
        axios_1.default.post(process.env.STOCK || "", { name, brand, model, quantity }, {
            headers: {
                "auth-token": token,
            }
        })
            .then(() => {
            res.redirect("/stock");
        });
    }
};
exports.addProduct = addProduct;
const modifyProductG = (req, res) => {
    const { id } = req.params;
    const alerta = "";
    try {
        axios_1.default.get(process.env.STOCK + `/${id}`)
            .then((response) => {
            const product = {
                id,
                name: response.data.name,
                brand: response.data.brand,
                model: response.data.model,
                quantity: response.data.quantity,
            };
            //* obtener usuario por seller id.
            const token = req.cookies.user_token;
            axios_1.default.get(process.env.GET_DATA || "", {
                headers: {
                    "auth-token": token
                }
            }).then((response) => {
                const usuario = {
                    id: response.data._id,
                    username: response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1),
                    email: response.data.email
                };
                res.render("onlyUsers/modifyProduct.ejs", { usuario, alerta, product });
            })
                .catch((err) => {
                res.status(404).send(err).end();
            });
        }).catch(err => {
            res.status(400).send("error").end();
        });
    }
    catch (err) {
        res.status(500).send("error").end();
    }
};
exports.modifyProductG = modifyProductG;
const modifyProductP = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, brand, model, quantity } = req.body;
        await validationSchemas_1.productSchema.validateAsync({ name, brand, model, quantity })
            .then(() => {
            axios_1.default.put(process.env.STOCK + `/${id}`, { name, brand, model, quantity })
                .then(() => {
                res.redirect("/stock");
            });
        })
            .catch(err => {
            const alerta = {
                message: err.details[0].message
            };
            res.status(400).render("signupform.ejs", { alerta });
        });
    }
    catch (err) {
        res.status(500).end();
    }
};
exports.modifyProductP = modifyProductP;

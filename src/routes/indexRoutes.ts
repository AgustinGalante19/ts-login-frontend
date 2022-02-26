import { Router } from 'express';
import { signinGet, signinPost } from '../controllers/signinControllers';
import { signupGet, signupPost } from '../controllers/signupControllers';
import { profileGet } from '../controllers/profileControllers';
import { getStock, addProduct, modifyProductG, modifyProductP } from "../controllers/stockControllers";

class Routes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        //Index
        this.router.get("/", (req, res) => {
            res.render("index.ejs");
        })

        //SignUp
        this.router.get("/signup", signupGet);
        this.router.post("/signup", signupPost);

        //SignIn
        this.router.get("/signin", signinGet);
        this.router.post("/signin", signinPost);

        //profile
        this.router.get("/profile", profileGet);

        //stock
        this.router.get("/stock", getStock);
        this.router.get("/stock/form", (req, res) => {
            res.render("productForm.ejs");
        });

        this.router.get("/stock/addProduct", (req, res) => {
            res.render("addProductForm.ejs");
        });
        this.router.post("/addProduct", addProduct);
        this.router.get("/modifyProduct/:id", modifyProductG);
        this.router.post("/modifyProduct/:id", modifyProductP);

        this.router.post("/logout", (req, res) => {
            res.clearCookie("user_token").redirect("/");
        });
    }
}
const routes = new Routes();
export default routes.router;
import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes/indexRoutes';
require('dotenv').config()
class Server {
    app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        //settings
        this.app.set("port", process.env.PORT || 3000);

        //middleweares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.set("views", path.join(__dirname, "/views"));
        this.app.use(express.static(path.join(__dirname + '/public')))
        this.app.set('view engine', 'ejs');
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(cookieParser());
    }

    routes() {
        this.app.use(routes);
    }

    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port:", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
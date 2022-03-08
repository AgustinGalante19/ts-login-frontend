"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_session_1 = __importDefault(require("express-session"));
require('dotenv').config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        //settings
        this.app.set("port", process.env.PORT || 3000);
        //middleweares
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.set("views", path_1.default.join(__dirname, "/views"));
        this.app.use(express_1.default.static(path_1.default.join(__dirname + '/public')));
        this.app.set('view engine', 'ejs');
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, express_session_1.default)({
            secret: 'mysecretkey',
            resave: false,
            saveUninitialized: false
        }));
        this.app.use((0, connect_flash_1.default)());
    }
    routes() {
        this.app.use(indexRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port:", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();

export interface IUser {
    id: string;
    username: string;
    email: string;
}

export interface IUserPrivate {
    email: string;
    username: string;
    password: string;
}

export interface IProduct {
    id: string,
    name: string,
    brand: string,
    model: string,
    quantity: number,
}
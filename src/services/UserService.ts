import { User } from "../types/User";


const BASE_URL = 'http://localhost:8080';

export const UserService = {


    getUsers: async (): Promise<User[]> => {

        const response = await fetch(`${BASE_URL}/elbuensabor/v1/users`);
        const data = await response.json();
        return data;
    },

    getUser: async (id:number): Promise<User> => {

        const response = await fetch (`${BASE_URL}/elbuensabor/v1/users/${id}`);
        const data = await response.json();
        return data;

    },

    createUser:async (user:user):Promise<User> => {

        const response = await fetch(`${BASE_URL}/elbuensabor/v1/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        return data;

    },

    updateUser: async (id: number, user: User): Promise<User> => {

        const response = await fetch(`${BASE_URL}/elbuensabor/v1/users/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        return data;
    },

    deleteUser: async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/elbuensabor/v1/users/${id}`, {
            method: "DELETE"
        });
    },

}
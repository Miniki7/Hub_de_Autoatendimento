import { API_URL } from "./api";

export async function getUser(id) {

    const response = await fetch(
        `${API_URL}/usuarios/${id}`
    );

    return response.json();
}
import { API_URL } from "./api";

export async function getProduct(id) {

    const response = await fetch(
        `${API_URL}/produtos/${id}`
    );

    return response.json();
}
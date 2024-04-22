import axios from "axios";

export function fetchItem() {
    return axios.get('http://localhost:8080/cart');
};

export function addItemToDB(item) {
    return axios.post('http://localhost:8080/cart', item);
};

export function removeItemFromDB(itemId) {
    return axios.delete(`http://localhost:8080/cart/${itemId}`);
};

export function updateItem(itemId, item) {
    return axios.patch(`http://localhost:8080/cart/${itemId}`, item);
};
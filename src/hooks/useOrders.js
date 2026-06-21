import { useEffect, useState } from "react";
import { getOrdersByUser } from "../services/orderService";

export function useOrders(userId) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        async function load() {

            const data = await getOrdersByUser(userId);
          
            setOrders(data);
        }

        load();

    }, []);

    return orders;
}
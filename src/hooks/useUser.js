import { useEffect, useState } from "react";
import { getUser } from "../services/userService";

export function useUser(userId) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        async function load() {

            const data = await getUser(userId);
            console.log(data)

            setUser(data);
        }

        load();

    }, []);

    return user;
}
import { useEffect, useState } from "react";
import { getUser } from "../services/userService";

export function useUser(userId) {

    const [user, setUser] = useState(null);

    useEffect(() => {
      if (!userId) return;
      setUser(null);

        async function load() {

            const data = await getUser(userId);
            console.log(data)

            setUser(data);
        }

        load();

    }, [userId]); 

    return user;
}
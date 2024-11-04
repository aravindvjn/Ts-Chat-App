
import { authURL } from "../Links/Links"

export const getUserData = async () => {
    const token = localStorage.getItem("token")
    try {
        if (!token) {
            return null;
        } else {
            const response = await fetch(authURL + "/user-data", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            if (response.ok) {
                return { ...data, auth: true };
            }
        }
    } catch (err) {
        console.error("Error in getting user data.")
    }
}
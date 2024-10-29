import { useNavigate } from "react-router-dom";
import { authURL } from "../../global/Links/Links";
import { FormProps } from "./type";
const handleSubmit = async (input: FormProps, page: string) => {
    const navigate = useNavigate()
    try {
        if (page === "Register") {
            console.log("hai")
            const response = await fetch(authURL + 'register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                console.log(data.token)
                localStorage.setItem("token", data.token)
                navigate("/")
            } else {
                console.log(data.message)
            }
        } else {
            return false;
        }
    } catch (err) {
        console.error("Error in Auth.")
    }
}

export default handleSubmit

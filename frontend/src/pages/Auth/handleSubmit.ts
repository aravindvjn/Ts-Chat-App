import { authURL } from "../../global/Links/Links";
import { FormProps } from "./type";
const handleSubmit = async (input: FormProps, page: string) => {
    try {
        const url = page === "Register" ? 'register' : 'login'
        const response = await fetch(authURL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        const data = await response.json()
        console.log(data)
        if (response.ok) {
            localStorage.setItem("token", data.token)
            return { status: true, data: data }
        } else {
            console.log(data.message)
            return { status: false, message: data.message }
        }

    } catch (err) {
        console.error("Error in Auth.")
        return { status: false, message: "Server not responding." }
    }
}

export default handleSubmit

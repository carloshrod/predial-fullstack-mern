import { getPayload } from "./getPayload";

export function auth() {
    let resp = false;
    try {
        if (localStorage.getItem("token")) {
            const payload = getPayload();
            if (payload.usuario)
                resp = true;
        }
    } catch (error) {
        console.log(error)
    }
    return resp;
}
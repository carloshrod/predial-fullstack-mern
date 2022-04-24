import { helpHttp } from '../../helpers/helpHttp';
import { toast } from 'react-toastify';

let api = helpHttp();

export const login = (user) => {
    let options = {
        body: JSON.stringify(user),
        headers: { "content-type": "application/json" },
    };

    api.post("/users/login", options).then((res) => {
        if (!res.estado) {
            toast.error("No hay conexión con la base de datos!!!", { autoClose: 10000, theme: "colored" })
        }
        if (res.estado === "ok") {
            localStorage.setItem("token", res.token);
            window.location.href = res.url;
        } else {
            toast.error(res.msg)
        }
    })
}

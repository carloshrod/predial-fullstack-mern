const { USER } = require("../config");

const HOST = process.env.HOST

exports.newUserOptions = (email, name, password) => {
    return {
        from: `NO-REPLY <${USER}>`, // Remitente - Servidor de correo
        to: email, // Destinatario - Email del usuario 
        subject: "CUENTA CREADA ✔",
        html: `<p>Sr(a). <b>${name}</b>,</p>

        <p>Su cuenta ha sido creada. A continuación le enviamos las credenciales para el ingreso:</p>
        
        <ul>
            <li>
                Usuario: <b>${email}</b>
            </li>
            <li>
                Contraseña: <b>${password}</b>
            </li>
        </ul>
        
        <h3>Por favor, no olvide cambiar su contraseña!!!</h3>
        `
    };
}

exports.newPredioOptions = (email, name, codigo, documento) => {
    return {
        from: `NO-REPLY <${USER}>`, // Remitente - Servidor de correo
        to: email, // Destinatario - Email del usuario
        subject: "PREDIO CREADO ✔",
        html: `<p>Sr(a). <b>${name}</b>,</p>

        <p>Se ha creado un predio con código <b>${codigo}</b> asociado a su número de documento <b>${documento}</b>.</p>

        <p>Ya puede ingresar a la <b>Plataforma de Gestión Catastral</b> para asociar dicho predio a su cuenta y así poder
        realizar el pago del <b>Impuesto Predial</b>.</p>               
        `
    };
}

exports.resetPasswordOptions = (email, name, resetToken) => {
    return {
        from: `NO-REPLY <${USER}>`, // Remitente - Servidor de correo
        to: email, // Destinatario - Email del usuario
        subject: "RESTABLECER CONTRASEÑA ✔",
        html: `<p>Sr(a). <b>${name}</b>,</p>

        <p>Usted solicitó restablecer su contraseña.
        Por favor, ingrese en este <a href="${HOST}/reset-password/${resetToken}">LINK</a> y siga las instrucciones.</p>

        <h3>El link tendrá validez durante 1 hora a partir de este momento!!!</h3>
        `
    };
}

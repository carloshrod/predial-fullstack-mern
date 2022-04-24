export const getLoggedUser = (usersDb, payload) => {
    try {
        const loggedUser = usersDb.filter((user) => user.nro_doc === payload.nro_doc).map((user) => {
            return user
        })
        if (loggedUser.length > 0) {
            return loggedUser[0]
        } else {
            return false
        }    
    } catch (error) {
        return false
    }
}

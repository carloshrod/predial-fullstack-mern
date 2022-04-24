import React, { useState, useEffect } from 'react';
import Header from '../components/shared/Header';
import Container from '../components/shared/Container';
import LandingPage from "../components/systemOut/LandingPage";
import FormLogin from '../components/forms/FormLogin'
import FormRegister from '../components/forms/FormRegister';
import FormForgotPassword from '../components/forms/FormForgotPassword';
import FormNewPassword from '../components/forms/FormNewPassword';
import Footer from "../components/shared/Footer";
import { login } from '../services/auth/login';
import { crudUsers } from '../services/crud/crudUsers';
import { auth } from '../services/auth/auth';
import { Navigate } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';

function SystemOutPage({ page }) {
    const [usersDb, setUsersDb] = useState([])
    const [userToRegister, setUserToRegister] = useState(null);

    // Obtener usuarios:
    useEffect(() => {
        helpHttp().get("/users/listar")
            .then((res) => {
                if (!res.error) {
                    if (res.users) {
                        setUsersDb(res.users);
                    }
                } else {
                    setUsersDb(null);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        registerUser, // Registro de usuarios externos
        resetPassword, // Recuperar contraseña
        newPassword // Restablecer contraseña
    } = crudUsers(usersDb, setUsersDb)

    return (
        <>
            {!auth() ?
                <>
                    <Header />

                    {page === "landingPage" &&
                        <Container titulo="Plataforma de Gestión Catastral" className="container d-flex align-items-center min-vh-100">
                            <LandingPage />  {/* Children */}
                        </Container>}

                    {page === "login" &&
                        <Container className="container d-flex align-items-center min-vh-100">
                            <FormLogin
                                login={login}
                            />  {/* Children */}
                        </Container>}

                    {page === "register" &&
                        <Container className="container d-flex align-items-center min-vh-100">
                            <FormRegister
                                usersDb={usersDb}
                                registerUser={registerUser}
                                userToRegister={userToRegister}
                                setUserToRegister={setUserToRegister}
                            />  {/* Children */}
                        </Container>}

                    {page === "resetPassword" &&
                        <Container className="container d-flex align-items-center min-vh-100">
                            <FormForgotPassword
                                resetPassword={resetPassword}
                            />  {/* Children */}
                        </Container>}

                    {page === "newPassword" &&
                        <Container className="container d-flex align-items-center min-vh-100">
                            <FormNewPassword
                                newPassword={newPassword}
                            />  {/* Children */}
                        </Container>}

                    <Footer />
                </>
                :
                <>
                    <Navigate to={-1} />
                </>
            }
        </>
    );
}

export default SystemOutPage;

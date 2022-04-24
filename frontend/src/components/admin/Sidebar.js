import jwtDecode from 'jwt-decode';
import React from 'react';
import SidebarItem from './SidebarItem';

const sbItemsAdmin = [
    {
        id: 1,
        linkTo: "/admin/dashboard",
        icono: "bi bi-grid",
        titulo: "Dashboard"
    },
    {
        id: 2,
        linkTo: "/admin/my-profile",
        icono: "bi bi-person-circle",
        titulo: "Mi Perfil"
    },
    {
        id: 3,
        linkTo: "/admin/create-user",
        icono: "bi bi-person-plus-fill",
        titulo: "Crear Usuario"
    },
    {
        id: 4,
        linkTo: "/admin/manage-users",
        icono: "bi bi-people-fill",
        titulo: "Gestionar Usuarios"
    },
    {
        id: 5,
        linkTo: "/admin/create-predio",
        icono: "bi bi-plus-circle-fill",
        titulo: "Crear Predio"
    },
    {
        id: 6,
        linkTo: "/admin/manage-predios",
        icono: "bi bi-building",
        titulo: "Gestionar Predios"
    },
]

const sbItemsUserInt = [
    {
        id: 1,
        linkTo: "/user-int/dashboard",
        icono: "bi bi-grid",
        titulo: "Dashboard"
    },
    {
        id: 2,
        linkTo: "/user-int/my-profile",
        icono: "bi bi-person-circle",
        titulo: "Mi Perfil"
    },
    {
        id: 3,
        linkTo: "/user-int/manage-users",
        icono: "bi bi-people-fill",
        titulo: "Gestionar Usuarios"
    },
    {
        id: 4,
        linkTo: "/user-int/create-predio",
        icono: "bi bi-plus-circle-fill",
        titulo: "Crear Predio"
    },
    {
        id: 5,
        linkTo: "/user-int/manage-predios",
        icono: "bi bi-building",
        titulo: "Gestionar Predios"
    },
]

function Sidebar() {
    const token = localStorage.getItem("token");
    const payload = jwtDecode(token);

    return (
        <>
            {/* <!-- ======= Sidebar ======= --> */}
            <aside id="sidebar" className="sidebar">

                <img src="../img/logo.png" alt="" className="logo-sidebar" />
                <ul className="sidebar-nav" id="sidebar-nav">
                    {payload.rol === 1 ?
                        sbItemsAdmin.map((item) => (
                            <SidebarItem
                                id={item.id}
                                key={item.id}
                                linkTo={item.linkTo}
                                icono={item.icono}
                                titulo={item.titulo}
                            />
                        ))
                        :
                        sbItemsUserInt.map((item) => (
                            <SidebarItem
                                id={item.id}
                                key={item.id}
                                linkTo={item.linkTo}
                                icono={item.icono}
                                titulo={item.titulo}
                            />
                        ))
                    }
                </ul>

            </aside>
            {/* <!-- End Sidebar--> */}
        </>
    )
}

export default Sidebar;

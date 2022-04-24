import React from 'react';
import { NavLink } from "react-router-dom";

function SidebarItem({ id, linkTo, icono, titulo }) {
    return (
        <li className="nav-item">
            <NavLink id={id} to={linkTo} className={({ isActive }) => `sidebar-nav nav-link collapsed p-3 ${isActive ? "active" : ""}`}>
                <i className={icono}></i>
                <span>{titulo}</span>
            </NavLink>
        </li>
    )
};

export default SidebarItem;

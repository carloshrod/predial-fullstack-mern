import React, { useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import TableUsersHeader from './TableUsersHeader';
import TableUsersRow from './TableUsersRow';

export const initialForm = {
    select: 10
}

function TableUsers({ loader, users, setUserToEdit, deleteUser }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") ?? "";
    const [pageNumber, setPageNumber] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(initialForm);
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const firstItemShowedPerPage = pageNumber * usersPerPage.select;
    const lastItemShowedPerPage = firstItemShowedPerPage + usersPerPage.select;

    const handleInputChange = (event) => {
        setUsersPerPage({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    const selectRef = useRef();

    const handleFilter = (e) => {
        setSearchParams({ filter: e.target.value })
    }

    // Filtrar usuarios:
    const filterUsers = users.filter((user) => {
        return (user.nombres + " " + user.apellidos).toLowerCase().includes(filter.toLowerCase()) ||
            user.nro_doc.toString().includes(filter.toLowerCase()) || user.email.includes(filter.toLowerCase()) ||
            (user.rol + " ").includes(filter.toLowerCase())
    })

    // Mostrar usuarios filtrados:
    const displayUsers = filterUsers.slice(firstItemShowedPerPage, lastItemShowedPerPage).map((user, index) => {
        return (
            <TableUsersRow
                key={user._id}
                nro_registro={index + 1 + firstItemShowedPerPage}
                user={user}
                setUserToEdit={setUserToEdit}
                deleteData={deleteUser}
            />
        )
    });

    // Ordenar usuarios:
    if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        users = users.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]))
    };

    const pageCount = () => {
        if (!filter) return Math.ceil(users.length / usersPerPage.select);
        return Math.ceil(filterUsers.length / usersPerPage.select);
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const range = () => {
        if (!filter) return users.length;
        return filterUsers.length
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-12">

                    <h5 className="card-title">Usuarios Registrados</h5>

                    <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                        {/* <!-- Table with stripped rows --> */}

                        <div className="dataTable-top mb-2">
                            <div className="col-4 col-sm-6 col-md-4 dataTable-dropdown">
                                <select name="select" ref={selectRef} className="dataTable-selector text-center" value={usersPerPage.select} onChange={handleInputChange}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value={users.length}>Todos</option>
                                </select>
                                <label style={{ fontSize: "12px", marginLeft: "5px" }}> Usuarios por página</label>
                            </div>

                            <div className="col-4 col-sm-6 col-md-4 dataTable-search">
                                <ReactTooltip id="toolTipFilter" place="left" type="dark" effect="solid">
                                    Para filtrar por <em>rol</em> ingrese el valor seguido de un espacio
                                </ReactTooltip>
                                <input data-tip data-for="toolTipFilter" className="col-12 col-sm-7 col-md-7 col-lg-8 dataTable-input" placeholder="Filtrar..." type="text" value={filter} onChange={handleFilter} />
                                <label style={{ fontSize: "12px", marginLeft: "5px" }}>{range()} {range() === 1 ? "Usuario" : "Usuarios"}</label>
                            </div>
                        </div>


                        <div className="dataTable-container">
                            <ReactTooltip id="toolTipSort" place="top" type="dark" effect="solid">
                                Ordenar<i className="bi bi-arrow-down-up" />
                            </ReactTooltip>
                            <ReactTooltip id="toolTipInfo" place="top" type="dark" effect="solid">
                                Rol 2: Usuario Interno
                                <br />
                                Rol 3: Usuario Externo
                            </ReactTooltip>
                            <table className="table datatable table-hover text-center">
                                <TableUsersHeader onSorting={(field, order) => setSorting({ field, order })} />
                                <tbody>
                                    {users.length > 0 ?
                                        <>
                                            {displayUsers}
                                        </>
                                        : (
                                            <tr>
                                                <td colSpan={6}>
                                                    <h2 className="text-center m-5">
                                                        {loader}{!loader && "¡No hay información!"}
                                                    </h2>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            {/* <!-- End Table with stripped rows --> */}
                        </div>

                        <div className="dataTable-bottom">
                            <div className="dataTable-info d-none d-sm-block mt-4">
                                <span style={{ fontSize: "12px" }}>Mostrando {firstItemShowedPerPage + 1} a {pageNumber + 1 === pageCount() ?
                                    range()
                                    :
                                    lastItemShowedPerPage} de {range()}
                                </span>
                            </div>
                            <nav className="dataTable-pagination mt-3">
                                <ReactPaginate
                                    breakLabel="..."
                                    previousLabel={<i className="bi bi-caret-left-fill" />}
                                    nextLabel={<i className="bi bi-caret-right-fill" />}
                                    marginPagesDisplayed={0}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount()}
                                    onPageChange={changePage}
                                    previousLinkClassName="paginate"
                                    nextLinkClassName="paginate"
                                    activeClassName="active"
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableUsers;

import React, { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import TablePrediosHeader from "./TablePrediosHeader";
import TablePrediosRow from "./TablePrediosRow";

export const initialForm = {
    select: 10
}

function TablePredios({ loader, predios, setPredioToEdit, deletePredio, linkTo, error }) {

    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") ?? "";
    const [pageNumber, setPageNumber] = useState(0);
    const [prediosPerPage, setPrediosPerPage] = useState(initialForm);
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const firstItemShowedPerPage = pageNumber * prediosPerPage.select;
    const lastItemShowedPerPage = firstItemShowedPerPage + prediosPerPage.select;

    const handleInputChange = (event) => {
        setPrediosPerPage({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    const selectRef = useRef();

    const handleFilter = (e) => {
        setSearchParams({ filter: e.target.value })
    }

    // Mostrar Predios:
    // const displayPredios = predios.slice(firstItemShowedPerPage, lastItemShowedPerPage).map((predio, index) => {
    //     return (
    //         <TablePrediosRow
    //             key={predio._id}
    //             nro_registro={index + 1 + firstItemShowedPerPage}
    //             predio={predio}
    //             setDataToEdit={setPredioToEdit}
    //             deleteData={deletePredio}
    //             linkTo={linkTo}
    //         />
    //     )
    // })

    // Filtrar predios:
    const filterPredios = predios.filter((predio) => {
        return predio.codigo.toLowerCase().includes(filter.toLowerCase()) || predio.nom_prop.toLowerCase().includes(filter.toLowerCase()) ||
            predio.doc_prop.toString().includes(filter.toLowerCase()) || predio.direccion_predio.toLowerCase().includes(filter.toLowerCase())
    });

    // Mostrar predios filtrados:
    const displayPredios = filterPredios.slice(firstItemShowedPerPage, lastItemShowedPerPage).map((predio, index) => {
        return (
            <TablePrediosRow
                key={predio._id}
                nro_registro={index + 1 + firstItemShowedPerPage}
                predio={predio}
                setDataToEdit={setPredioToEdit}
                deleteData={deletePredio}
                linkTo={linkTo}
            />
        )
    });

    // Ordenar predios:
    if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        predios = predios.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]))
    };

    const pageCount = () => {
        if (!filter) return Math.ceil(predios.length / prediosPerPage.select);
        return Math.ceil(filterPredios.length / prediosPerPage.select);
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const range = () => {
        if (!filter) return predios.length;
        return filterPredios.length
    }

    return (
        <>
            {error}
            <div className="row">
                <div className="col-lg-12">

                    <h5 className="card-title">Predios Registrados</h5>

                    <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                        {/* <!-- Table with stripped rows --> */}
                        <div className="dataTable-top mb-2">
                            <div className="col-4 col-sm-6 col-md-4 dataTable-dropdown">
                                <select name="select" ref={selectRef} className="dataTable-selector text-center" value={prediosPerPage.select} onChange={handleInputChange}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value={predios.length}>Todos</option>
                                </select>
                                <label style={{ fontSize: "12px", marginLeft: "5px" }}>Predios por página</label>
                            </div>
                            <div className="col-4 col-sm-6 col-md-4 dataTable-search">
                                <input className="col-12 col-sm-7 col-md-7 col-lg-8 dataTable-input" placeholder="Filtrar..." type="text" value={filter} onChange={handleFilter} />
                                <label style={{ fontSize: "12px", marginLeft: "5px" }}>{range()} {range() === 1 ? "Predio" : "Predios"}</label>
                            </div>
                        </div>

                        <div className="dataTable-container mt-2">
                            <ReactTooltip id="toolTipSort" place="top" type="dark" effect="solid">
                                Ordenar<i className="bi bi-arrow-down-up" />
                            </ReactTooltip>
                            <table className="table datatable table-hover text-center">
                                <TablePrediosHeader onSorting={(field, order) => setSorting({ field, order })} />
                                <tbody>
                                    {predios.length > 0 ?
                                        <>
                                            {displayPredios}
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
                                <ul className="dataTable-pagination-list">
                                    <ReactPaginate
                                        breakLabel="..."
                                        previousLabel={<i className="bi bi-caret-left-fill" />}
                                        nextLabel={<i className="bi bi-caret-right-fill" />}
                                        marginPagesDisplayed={0}
                                        pageRangeDisplayed={5}
                                        pageCount={pageCount()}
                                        onPageChange={changePage}
                                        activeClassName="active"
                                    />
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TablePredios;

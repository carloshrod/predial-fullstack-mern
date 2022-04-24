import React, { useState } from 'react';

function TableUsersHeader({ onSorting }) {

    const headers = [
        { name: "#", field: "index", sortable: false },
        { name: "Nombre", field: "nombres", sortable: true, className: "pointer" },
        { name: "Nro. Documento", field: "nro_doc", sortable: false },
        { name: "Email", field: "email", sortable: true,className: "d-none d-sm-table-cell pointer" },
        { name: "Rol", field: "rol", sortable: false, className: "d-none d-sm-table-cell pointer" },
    ];

    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = field => {
        const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <thead>
            <tr>
                {headers.map(({ name, field, sortable, className }) => (
                    <th
                        data-tip data-for={(name === "Nombre" || name === "Email" ? "toolTipSort" : name === "Rol"  ? "toolTipInfo" : "")}
                        className={className}
                        key={name}
                        onClick={() => sortable ? onSortingChange(field) : null}
                    >
                        {name}
                        {sortingField && sortingField === field && (
                            sortingOrder === "asc"
                                ? <i className="bi bi-caret-down-fill" />
                                : <i className="bi bi-caret-up-fill" />
                        )
                        }
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableUsersHeader;

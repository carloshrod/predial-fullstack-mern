import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const TablePrediosRow = ({ predio, nro_registro, setDataToEdit, deleteData, linkTo }) => {
    let { codigo, nom_prop, doc_prop, direccion_predio } = predio || {};

    return (
        <tr>
            <th className="align-middle">{nro_registro}</th>
            <td className="align-middle">{codigo}</td>
            <td className="align-middle">{nom_prop}</td>
            <td className="align-middle d-none d-sm-table-cell">{doc_prop}</td>
            <td className="align-middle d-none d-sm-table-cell">{direccion_predio}</td>
            <td >
                <Link to={linkTo}>
                    <ReactTooltip id="toolTipEdit" place="top" type="dark" effect="solid">
                        Editar predio
                    </ReactTooltip>
                    <button
                        data-tip data-for="toolTipEdit"
                        type="button"
                        className="btn my-btn-edit m-1"
                        onClick={() => setDataToEdit(predio)}>
                        <i className="bi bi-pencil-fill" />
                    </button>
                </Link>
                <Link to="#">
                    <ReactTooltip id="toolTipDelete" place="top" type="dark" effect="solid">
                        Eliminar predio
                    </ReactTooltip>
                    <button
                        data-tip data-for="toolTipDelete"
                        type="button"
                        className="btn my-btn-delete"
                        onClick={() => deleteData(codigo)}>
                        <i className="bi bi-trash" />
                    </button>
                </Link>
            </td>
        </tr>
    );
};

export default TablePrediosRow;

import React from 'react';

function PredioInfo({ predio }) {
    return (
        <div className="row">
            <div className="col-6 col-lg-3 col-md-3 label mt-3">Código del Predio:</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">{predio.codigo}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">CC Propietario:</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">{predio.doc_prop}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">Nombre del Propietario:</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">{predio.nom_prop}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">Área Construída:</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">{predio.area_c}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">Área Total:</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">{predio.area_t}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">Valor del predio:</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">${predio.valor_predio}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">Valor a pagar:</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">${predio.valor_predial}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">Dirección del Predio:</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">{predio.direccion_predio}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">Barrio:</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">{predio.barrio}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">Fecha de Pago max:</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">{predio.fecha_pago}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">Fecha de Pago max (Dcto 40%):</div>
            <div className="col-lg-3 col-md-3 mt-3">{predio.fecha_pago2}</div>

            <div className="col-6 col-lg-3 col-md-3 label mt-3">Fecha de Pago max (Dcto 20%):</div>
            <div className="col-6 col-lg-3 col-md-3 mt-3">{predio.fecha_pago3}</div>
        </div>
    )
}

export default PredioInfo;

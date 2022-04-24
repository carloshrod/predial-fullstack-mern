import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { inputConvenio } from '../../tools/inputProps';
import Button from '../shared/Button';
import InputForm3 from '../inputForms/InputForm3';

export const initialForm = {
    cuotaInicial: "",
    vrCuotaInicial: "",
    nroCuotas: "",
    vrCuotas: "",
}

function FormConvenio({ predio }) {
    const [form, setForm] = useState(initialForm)

    if (form.cuotaInicial === "2") {
        form.vrCuotaInicial = "0"
    }

    if (form.nroCuotas !== "Seleccionar") {
        form.vrCuotas = Math.ceil((predio.valor_predial - form.vrCuotaInicial.replace(/[$.]/g, '')) / form.nroCuotas)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const successMsg = () => {
        if (form.cuotaInicial === "1") {
            if (!form.cuotaInicial || !form.vrCuotaInicial || !form.nroCuotas || !form.vrCuotas) {
                toast.error("Todos los campos son requeridos!!!")
                return false
            }    
        } else {
            if (!form.nroCuotas || !form.vrCuotas) {
                toast.error("Todos los campos son requeridos!!!")
                return false
            }    
        }
        Swal.fire({
            html: `<b>Su solicitud fue recibida satisfactoriamente y será respondida dentro de un plazo de 3 a 5 días hábiles!!!</b>`,
            icon: 'success',
            showCloseButton: true,
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
        })
        setForm(initialForm)
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row text-center mb-5">
                        <h5 className="card-title">Solicitar Convenio de Pago</h5>
                        <div className="col-6 col-lg-3 col-md-3 label mt-3">Código del Predio:</div>
                        <div className="col-6 col-lg-3 col-md-3 mt-3"><b>{predio.codigo}</b></div>
                        <div className="col-6 col-lg-3 col-md-3 label mt-3">Nombre del Propietario:</div>
                        <div className="col-6 col-lg-3 col-md-3 mt-3"><b>{predio.nom_prop}</b></div>
                        <div className="col-6 col-lg-3 col-md-3 label mt-3">Valor del predio:</div>
                        <div className="col-6 col-lg-3 col-md-3 mt-3"><b>${predio.valor_predio}</b></div>
                        <div className="col-6 col-lg-3 col-md-3 label mt-3">Valor a pagar:</div>
                        <div className="col-6 col-lg-3 col-md-3 mt-3"><b>${predio.valor_predial}</b></div>
                    </div>

                    <form className="container g-3 needs-validation" noValidate>

                        {inputConvenio.map((input) => (
                            <InputForm3
                                key={input.id}
                                type={input.type}
                                {...input}
                                value={form[input.name]}
                                onChange={handleChange}
                            />
                        ))}

                        <div className="col-5 col-lg-3 m-auto">
                            <Button onClick={successMsg}
                                btnClass="btn my-btn-success rounded-pill w-100">
                                Solicitar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default FormConvenio;

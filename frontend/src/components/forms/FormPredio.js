import React from "react";
import { useFormPredio } from "../../hooks/useFormPredio";
import { inputFechas, inputPredios } from "../../tools/inputProps";
import InputForm from "../inputForms/InputForm";
import InputForm2 from "../inputForms/InputForm2";

export const initialForm = {
    estado: null,
    codigo: "",
    nom_prop: "",
    doc_prop: "",
    email_prop: "",
    area_c: "",
    area_t: "",
    valor_predio: "",
    valor_predial: "",
    direccion_predio: "",
    barrio: "",
    fecha_pago: "",
    fecha_pago2: "",
    fecha_pago3: "",
};

function FormPredio({ prediosDb, createPredio, updatePredio, predioToEdit, setPredioToEdit, titulo, btn_text }) {

    const {
        form,
        reset,
        handleChange,
        handleSubmit
    } = useFormPredio(initialForm, prediosDb, createPredio, updatePredio, predioToEdit, setPredioToEdit);

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <h5 className="card-title">{titulo}</h5>
                    <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>

                        {inputPredios.map((input) => (
                            <InputForm
                                key={input.id}
                                type={input.type}
                                {...input}
                                value={form[input.name]}
                                onChange={handleChange}
                                reset={reset}
                            />
                        ))}

                        <div>
                            <hr className="divider" />
                            <h5 className="card-title">Fecha de Pago / Descuentos</h5>
                        </div>

                        {inputFechas.map((input) => (
                            <InputForm2
                                key={input.id}
                                type={input.type}
                                {...input}
                                value={form[input.name]}
                                onChange={handleChange}
                                reset={reset}
                            />
                        ))}

                        <div className="col-5 col-sm-3 col-md-2 col-lg-2 m-auto mt-2">
                            <button className="btn my-btn-success rounded-pill w-100" type="submit">{btn_text}</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default FormPredio;
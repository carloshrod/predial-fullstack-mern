import React, { useState } from 'react';
import { toast } from 'react-toastify';

const initialForm = {
    datos: "",
};


function SearchForm({ title, text, handleSearch }) {

    const [form, setForm] = useState(initialForm);
    //const [isDisabled, setIsDisabled] = useState(true);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.datos) {
            toast.error("Por favor, ingrese los datos solicitados!!!", { position: "bottom-center" });
            //setIsDisabled(true);
            return;
        }

        handleSearch(form);
        setForm(initialForm);
        //setIsDisabled(false);
    };

    return (
        <div className="card col-12 col-md-10 col-lg-8 col-xl-6 m-auto mt-2 mb-3">
            <div className="card-body mt-2 mb-2">
                <h5 className="card-title">{title}</h5>
                <form onSubmit={handleSubmit} className="d-flex align-items-center">
                    <label className="col-4" htmlFor="idDatos">{text}</label>
                    <input className="col-6 form-control w-50 ms-3 me-3" type="text" name="datos" id="idDatos" onChange={handleChange} value={form.datos} />
                    <button className="btn my-btn-success" type="submit">
                        <i className="bi bi-search" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SearchForm;

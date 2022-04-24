import { useEffect, useState } from 'react';
import { validateFormPredio } from '../tools/validateForm';

export const useFormPredio = (initialForm, prediosDb, createPredio, updatePredio, predioToEdit, setPredioToEdit) => {
    const [form, setForm] = useState(initialForm);
    const [reset, setReset] = useState(false)

    useEffect(() => {
        if (predioToEdit) {
            setForm(predioToEdit);
        } else {
            setForm(initialForm);
        }
    }, [predioToEdit, initialForm]);

    form.valor_predial = Math.round((form.valor_predio.replace(/[$.]/g, '')) * 0.01) || "";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleReset = (e) => {
        setForm(initialForm);
        setPredioToEdit(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateFormPredio(form, prediosDb, predioToEdit)) {
            if (form.estado === null) {
                createPredio(form);
                handleReset();
                setReset(!reset)
            } else {
                updatePredio(form);
            }
        }
    };

    return {
        form,
        reset,
        handleChange,
        handleSubmit
    }
}
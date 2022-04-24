import { useEffect, useState } from 'react';
import { validateFormRegister } from '../tools/validateForm';

export const useFormRegister = (initialForm, usersDb, registerUser, userToRegister, setUserToRegister, terms) => {
    const [form, setForm] = useState(initialForm);
    const [reset, setReset] = useState(false)

    useEffect(() => {
        setForm(initialForm);
    }, [userToRegister, initialForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleReset = (e) => {
        setForm(initialForm);
        setUserToRegister(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateFormRegister(form, usersDb, terms)) {
            registerUser(form);
            handleReset();
            setReset(!reset)
        }
    };

    return {
        form,
        reset,
        handleChange,
        handleSubmit
    }
}
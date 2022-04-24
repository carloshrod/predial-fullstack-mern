import { useEffect, useState } from "react";
import MaskedInput from 'react-text-mask'

const InputForm = ({ id, name, type, className, logo, errorMessage, label, onChange, reset, mask, ...inputProps }) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const handleBlur = (e) => {
        setFocused(true);
    };

    const handleShow = (e) => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        setFocused(false);
    }, [reset])

    return (
        <>
            <div className={className}>
                <label htmlFor={id} className="form-label">{label}</label>
                {type === "select"
                    ?
                    <>
                        <select
                            {...inputProps}
                            id={id}
                            name={name}
                            className="form-select"
                            onChange={onChange}
                            onBlur={handleBlur}
                            focused={focused.toString()}
                        >
                            <option defaultValue>Seleccionar</option>
                            <option value="1">CC</option>
                            <option value="2">CE</option>
                            <option value="3">Pasaporte</option>
                        </select>
                    </>
                    :
                    <>
                        <div className={logo && "input-group has-validation"}>
                            {logo && <span className="input-group-text" id="inputGroupPrepend">
                                <i className={logo}></i>
                            </span>
                            }
                            {!mask
                                ?
                                <input
                                    {...inputProps}
                                    id={id}
                                    type={(type === "password" && showPassword) ? "text" : type}
                                    name={name}
                                    className="form-control"
                                    onChange={onChange}
                                    onBlur={handleBlur}
                                    focused={focused.toString()}
                                />
                                :
                                <MaskedInput
                                    mask={mask}
                                    guide={false}
                                    {...inputProps}
                                    id={id}
                                    name={name}
                                    className="form-control"
                                    onChange={onChange}
                                    onBlur={handleBlur}
                                    focused={focused.toString()}
                                />}
                            {type === "password" &&
                                <button className="btn-show-pass input-group-text" type="button" onClick={handleShow}>
                                    <i className={showPassword ? "bi bi-eye-slash-fill":"bi bi-eye-fill"}></i>
                                </button>
                            }
                            <span className="errorMsg col-12">{errorMessage}</span>
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default InputForm;

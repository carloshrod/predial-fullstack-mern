import { useEffect, useState } from "react";

const InputForm2 = ({ id, name, type, className, logo, errorMessage, label, onChange, reset, ...inputProps }) => {
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
            <div className="justify-content-center d-flex align-items-center mb-3">
                <label htmlFor={id} className="col-4 col-sm-5 form-label ms-md-4 ms-lg-5">{label}</label>
                <div className={`input-group has-validation me-md-4 me-lg-5 ${className}`}>
                    {logo && <span className="input-group-text" id="inputGroupPrepend">
                        <i className={logo}></i>
                    </span>
                    }
                    <input
                        {...inputProps}
                        id={id}
                        name={name}
                        type={showPassword ? "text" : type}
                        className={`form-control ${type === "date" && "text-center"}`}
                        onChange={onChange}
                        onBlur={handleBlur}
                        focused={focused.toString()}
                    />
                    {type === "password" &&
                        <button className="btn-show-pass input-group-text" type="button" onClick={handleShow}>
                            <i className={showPassword ? "bi bi-eye-slash-fill":"bi bi-eye-fill"}></i>
                        </button>
                    }
                    <span className="errorMsg col-12">{errorMessage}</span>
                </div>
            </div>

        </>
    );
};

export default InputForm2;

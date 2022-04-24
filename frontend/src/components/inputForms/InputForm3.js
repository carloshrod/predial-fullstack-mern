import { useEffect, useState } from "react";
import MaskedInput from 'react-text-mask'

const InputForm3 = ({ id, name, type, className, logo, errorMessage, label, mask, onChange, reset, ...inputProps }) => {
    const [focused, setFocused] = useState(false);

    const handleBlur = (e) => {
        setFocused(true);
    };

    useEffect(() => {
        setFocused(false);
    }, [reset])

    return (
        <div className="row m-4">
            <div className="col-sm-6">
                <label htmlFor={id} >{label}</label>
            </div>
            {type === "select"
                ?
                <div className="has-validation col-sm-6 col-lg-4">
                    <select
                        {...inputProps}
                        id={id}
                        name={name}
                        className="form-select text-center"
                        onChange={onChange}
                        onBlur={handleBlur}
                        focused={focused.toString()}
                    >
                        {name === "cuotaInicial"
                            ?
                            <>
                                <option defaultValue>Seleccionar</option>
                                <option value="1">Sí</option>
                                <option value="2">No</option>
                            </>
                            :
                            <>
                                <option defaultValue>Seleccionar</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </>
                        }
                    </select>
                </div>
                :
                <div className=" col-sm-6 col-lg-4">
                    <div className="input-group has-validation">
                        {logo &&
                            <span className="input-group-text" id="inputGroupPrepend">
                                <i className={logo}></i>
                            </span>
                        }
                        {!mask
                            ?
                            <input
                                {...inputProps}
                                id={id}
                                name={name}
                                type={type}
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
                            />
                        }
                    </div>
                    <span className="errorMsg">{errorMessage}</span>
                </div>
            }
        </div>
    );
};

export default InputForm3;

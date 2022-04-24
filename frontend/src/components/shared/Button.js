import React from 'react';

function Button({ onClick, children, btnClass }) {

    return (
        <>
            <button type="button" className={btnClass} onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default Button;

import React from 'react';

function Container({ titulo, className, children }) {
    return (
        <>
            <div className={className} >
                <div className="container mt-3">
                    <h1 className="text-center font-weight-bold">{titulo}</h1>
                    {titulo === "Mi Perfil" ?
                        <div className="card">
                            <div className="card-body">
                                {children}
                            </div>
                        </div>
                        :
                        <>
                            {children}
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Container;

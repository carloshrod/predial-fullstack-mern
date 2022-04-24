import React from 'react';
import Button from '../shared/Button';
import PredioInfo from './PredioInfo';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function PredioDetails({ predio }) {
    if (!predio) return null;

    const token = localStorage.getItem("token");
    const payload = jwtDecode(token);

    const successMsg = () => {
        if (predio.doc_prop === payload.nro_doc) {
            Swal.fire({
                html: `<b>El predio con código <span class="text-danger">${predio.codigo}</span> fue asociado a su cuenta exitosamente!!!</b>`,
                icon: 'success',
                showCloseButton: true,
                showConfirmButton: false,
                timer: 10000,
                timerProgressBar: true,
            })
        } else {
            toast.error("Su número de documento no coincide con el del propietario del predio!!!",  {position: "bottom-center"})
        }
    }

    return (
        <div className="card mt-1 mb-5">
            <div className="card-body">
                <div className="tab-content pt-2">
                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                        <h5 className="card-title ms-2 mb-0">Detalles del Predio</h5>
                        <div className="container">
                            <PredioInfo predio={predio} />
                            <div className="d-flex justify-content-center">
                                <Button onClick={successMsg}
                                    btnClass="btn my-btn-success rounded-pill mt-3">
                                    Asociar predio
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PredioDetails;

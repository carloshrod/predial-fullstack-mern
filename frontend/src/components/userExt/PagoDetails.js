import React from 'react';
import PredioInfo from './PredioInfo';
import Button from '../shared/Button';
import FormConvenio from '../forms/FormConvenio';
import Modal from './Modal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';

function PagoDetails({ predio }) {
    if (!predio) return null;

    const token = localStorage.getItem("token");
    const payload = jwtDecode(token);

    const successMsg = () => {
        if (predio.doc_prop === payload.nro_doc) {
            Swal.fire({
                html: `<b>El pago correspondiente al predio con código <span class="text-danger">${predio.codigo}</span>, 
                por un valor de <span class="text-danger">$${predio.valor_predial}</span> fue procesado exitosamente!!!</b>`,
                icon: 'success',
                showCloseButton: true,
                showConfirmButton: false,
                timer: 10000,
                timerProgressBar: true,
            })
        } else {
            toast.error("Su número de documento no coincide con el del propietario del predio!!!")
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
                            <div className="row m-0">
                                <div className="col-6 d-flex align-items-center mt-3">
                                    <Button onClick={successMsg}
                                        btnClass="btn my-btn-success rounded-pill m-auto">
                                        Pagar ${predio.valor_predial}
                                    </Button>
                                </div>
                                <div className="col-6 d-flex align-items-center mt-3">
                                    <button className="btn btn-success rounded-pill m-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Solicitar convenio
                                    </button>
                                    <Modal>
                                        <FormConvenio predio={predio} />
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PagoDetails;

import React from 'react';
import PrediosChart from './PrediosChart';
import UsersChart from './UsersChart';
import jwtDecode from 'jwt-decode';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
import es from 'javascript-time-ago/locale/es.json';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(es)

function Dashboard({ loader, usersDb, prediosDb, historial, cantidadUsuarios, cantidadPredios }) {
    const token = localStorage.getItem("token");
    const payload = jwtDecode(token);

    const activityAdmin = historial.filter((e) => e.author !== "Administrador" && e).slice(-12).reverse()
    const activityUserInt = historial.filter((e) => e.author !== "Administrador" && e).slice(-6).reverse()

    return (
        <>
            {/* <!-- Left side columns --> */}
            <div className="dashboard col-lg-12">
                <div className="row">

                    {payload.rol === 1 &&
                        <>
                            {/* <!-- Usuarios Internos --> */}
                            < div className="col-xxl-4 col-md-4">
                                <div className="card info-card sales-card">

                                    <div className="card-body">
                                        <h5 className="card-title">Usuarios Internos</h5>

                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-people"></i>
                                            </div>
                                            <div className="ps-3">
                                                <h6>{cantidadUsuarios(2)}</h6>
                                                <span className="text-success small pt-1 fw-bold">Registrados</span>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>{/* <!-- End Usuarios Internos --> */}
                        </>
                    }

                    {/* <!-- Usuarios Externos --> */}
                    <div className={payload.rol !== 1 ? "col-xxl-6 col-md-6" : "col-xxl-4 col-md-4"}>
                        <div className="card info-card revenue-card">

                            <div className="card-body">
                                <h5 className="card-title">Usuarios Externos</h5>

                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-people"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6>{cantidadUsuarios(3)}</h6>
                                        <span className="text-success small pt-1 fw-bold">Registrados</span>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>{/* <!-- End Usuarios Externos --> */}

                    {/* <!-- Predios--> */}
                    <div className={payload.rol !== 1 ? "col-xxl-6 col-md-6" : "col-xxl-4 col-md-4"}>

                        <div className="card info-card customers-card">

                            <div className="card-body">
                                <h5 className="card-title">Predios</h5>

                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-building"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6>{cantidadPredios}</h6>
                                        <span className="text-success small pt-1 fw-bold">Registrados</span>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>{/* <!-- End Predios --> */}
                </div>
            </div>

            {/* <!-- Gráfica --> */}
            <div className="col-12 col-md-8">
                {payload.rol === 1 &&
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Actividad | Usuarios Internos</h5>
                            <UsersChart loader={loader} usersDb={usersDb} />
                            <div id="reportsChart"></div>
                        </div>
                    </div>
                }

                <div className="card">
                    <div className="ms-4">
                        <h5 className="card-title">Estadísticas | Predios</h5>
                    </div>
                    <div className="row">
                        <div className="card-body">
                            <PrediosChart loader={loader} prediosDb={prediosDb} />
                            <div id="reportsChart"></div>
                        </div>
                    </div>
                </div>
            </div>{/* <!-- End Gráfica --> */}

            {/* <!-- Right side columns --> */}
            <div className="dashboard col-12 col-md-4">
                {/* <!-- Recent Activity --> */}
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Actividad Reciente</h5>
                        <div className="activity">
                            {historial.length > 0 ?
                            <>
                            {payload.rol === 1 ?
                                activityAdmin.map((item) => (
                                    <div key={item._id} className="activity-item d-flex">
                                        <div className="activite-label"><ReactTimeAgo date={new Date(item.fecha).getTime()} locale="es-ES" timeStyle="twitter" /></div>
                                        <i className={`bi bi-circle-fill activity-badge align-self-start
                                    ${(item.action === "creó" && "text-success") ||
                                            (item.action === "editó" && "text-warning") ||
                                            (item.action === "eliminó" && "text-danger")}`}></i>
                                        <div className="activity-content">
                                            <b>{item.author}</b> {item.action} el predio con código <b>{item.code}</b>
                                        </div>
                                    </div>
                                ))
                                :
                                activityUserInt.map((item) => (
                                    <div key={item._id} className="activity-item d-flex">
                                        <div className="activite-label"><ReactTimeAgo date={new Date(item.fecha).getTime()} locale="es-ES" timeStyle="twitter" /></div>
                                        <i className={`bi bi-circle-fill activity-badge align-self-start
                                        ${(item.action === "creó" && "text-success") ||
                                            (item.action === "editó" && "text-warning") ||
                                            (item.action === "eliminó" && "text-danger")}`}></i>
                                        <div className="activity-content">
                                            <b>{item.author}</b> {item.action} el predio con código <b>{item.code}</b>
                                        </div>
                                    </div>
                                ))
                            }
                            </>
                            :
                            <h2 className="text-center m-5 pt-5 pb-5">{loader}{!loader && "¡No hay información!"}</h2>
                            }
                        </div>

                    </div>
                </div>{/* <!-- End Recent Activity --> */}
            </div>
            {/* <!-- End Right side columns --> */}
        </>
    )
};

export default Dashboard;

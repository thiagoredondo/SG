import React, { useState, useEffect } from 'react';
import '../styles/userpanel.css'; // Asegúrate de crear un archivo CSS para darle estilo

const UserPanel = () => {
    const [orders, setOrders] = useState([]); // Inicialmente vacío
    const [loading, setLoading] = useState(true); // Estado para saber si está cargando
    const [error, setError] = useState(null); // Estado para manejar errores
    const [newOrder, setNewOrder] = useState({ // Estado para el nuevo pedido
        fechaIngreso: '',
        senia: '',
        fechaFin: '',
        importeTotal: '',
        facturado: false,
        tomadoPor: 1, // ID del usuario
        aRealizarPor: 1, // ID del usuario
        ingresoPor: 'mostrador',
        metodoPago: 'efectivo',
        idCliente: 1, // ID del cliente (puedes cambiar según sea necesario)
        estado: 'no comenzado',
    });

    // Función para obtener pedidos de la API
    const fetchOrders = async () => {
        try {
            setLoading(true); // Iniciar carga
            const response = await fetch('http://localhost:5000/pedidos');
            if (!response.ok) {
                throw new Error('Error al obtener los pedidos');
            }
            const data = await response.json();
            setOrders(data); // Actualizar el estado con los pedidos obtenidos
            setLoading(false); // Finalizar carga
        } catch (err) {
            setError(err.message); // Manejar error
            setLoading(false); // Finalizar carga
        }
    };

    // useEffect para cargar los pedidos cuando el componente se monta
    useEffect(() => {
        fetchOrders();
    }, []); // El segundo parámetro [] asegura que solo se ejecute una vez

    const handleNewOrderChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewOrder({
            ...newOrder,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleNewOrderSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/nuevo-pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newOrder,
                    tiempoRealizacion: calculateDuration(newOrder.fechaIngreso, newOrder.fechaFin) // Calcular tiempo de realización
                }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el pedido');
            }
            // Limpiar el formulario
            setNewOrder({
                fechaIngreso: '',
                senia: '',
                fechaFin: '',
                importeTotal: '',
                facturado: false,
                tomadoPor: 1,
                aRealizarPor: 1,
                ingresoPor: 'mostrador',
                metodoPago: 'efectivo',
                idCliente: 1,
                estado: 'no comenzado',
            });
            // Refrescar la lista de pedidos
            fetchOrders();
            alert('Pedido agregado con éxito!');
        } catch (error) {
            alert(error.message);
        }
    };

    // Función para calcular la duración entre fechas
    const calculateDuration = (fechaIngreso, fechaFin) => {
        const start = new Date(fechaIngreso);
        const end = new Date(fechaFin);
        const duration = new Date(end - start);
        return `${duration.getUTCHours()} horas y ${duration.getUTCMinutes()} minutos`; // Formato del tiempo de realización
    };

    return (
        <div className="user-panel-container">
            <div className="new-order">
                <h2>Nuevo Pedido</h2>
                <form onSubmit={handleNewOrderSubmit}>
                    <label>Fecha Ingreso</label>
                    <input
                        type="date"
                        name="fechaIngreso"
                        value={newOrder.fechaIngreso}
                        onChange={handleNewOrderChange}
                        required
                    />
                    <label>Seña</label>
                    <input
                        type="text"
                        name="senia"
                        value={newOrder.senia}
                        onChange={handleNewOrderChange}
                    />
                    <label>Fecha Finalización</label>
                    <input
                        type="date"
                        name="fechaFin"
                        value={newOrder.fechaFin}
                        onChange={handleNewOrderChange}
                        required
                    />
                    <label>Importe Total</label>
                    <input
                        type="text"
                        name="importeTotal"
                        value={newOrder.importeTotal}
                        onChange={handleNewOrderChange}
                        required
                    />
                    <label>Tomado por (ID de Usuario)</label>
                    <input
                        type="number"
                        name="tomadoPor"
                        value={newOrder.tomadoPor}
                        onChange={handleNewOrderChange}
                        required
                    />
                    <label>A realizar por (ID de Usuario)</label>
                    <input
                        type="number"
                        name="aRealizarPor"
                        value={newOrder.aRealizarPor}
                        onChange={handleNewOrderChange}
                        required
                    />
                    <label>Ingreso por</label>
                    <select
                        name="ingresoPor"
                        value={newOrder.ingresoPor}
                        onChange={handleNewOrderChange}
                    >
                        <option value="whatsapp">WhatsApp</option>
                        <option value="telefono">Teléfono</option>
                        <option value="email">Email</option>
                        <option value="mostrador">Mostrador</option>
                    </select>
                    <label>Método de Pago</label>
                    <select
                        name="metodoPago"
                        value={newOrder.metodoPago}
                        onChange={handleNewOrderChange}
                    >
                        <option value="efectivo">Efectivo</option>
                        <option value="tarjeta">Tarjeta</option>
                        <option value="transferencia">Transferencia</option>
                    </select>
                    <label>ID Cliente</label>
                    <input
                        type="number"
                        name="idCliente"
                        value={newOrder.idCliente}
                        onChange={handleNewOrderChange}
                        required
                    />
                    <label>Estado</label>
                    <select
                        name="estado"
                        value={newOrder.estado}
                        onChange={handleNewOrderChange}
                    >
                        <option value="no comenzado">No Comenzado</option>
                        <option value="en proceso">En Proceso</option>
                        <option value="realizado">Realizado</option>
                        <option value="entregado">Entregado</option>
                    </select>
                    <div>
                        <input
                            type="checkbox"
                            name="facturado"
                            checked={newOrder.facturado}
                            onChange={handleNewOrderChange}
                        />
                        <label htmlFor="facturado">Facturado</label>
                    </div>
                    <button type="submit">Agregar Pedido</button>
                </form>
            </div>

            <div className="current-orders">
                <h2>Pedidos Actuales</h2>
                
                {/* Botón para actualizar pedidos manualmente */}
                <button onClick={fetchOrders}>Actualizar Pedidos</button>

                {/* Mostrar mensaje de carga o error */}
                {loading && <p>Cargando pedidos...</p>}
                {error && <p>Error: {error}</p>}

                {/* Mostrar pedidos si están disponibles */}
                {!loading && !error && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID Pedido</th>
                                <th>Fecha Ingreso</th>
                                <th>Seña</th>
                                <th>Fecha Finalización</th>
                                <th>Importe Total</th>
                                <th>Facturado</th>
                                <th>Tiempo Realización</th>
                                <th>Tomado por</th>
                                <th>A realizar por</th>
                                <th>Ingreso por</th>
                                <th>Método de Pago</th>
                                <th>ID Cliente</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.ID_PEDIDO}>
                                    <td>{order.ID_PEDIDO}</td>
                                    <td>{order.FECHA_INGRESO}</td>
                                    <td>{order.SEÑA}</td>
                                    <td>{order.FECHA_FIN}</td>
                                    <td>{order.IMPORTE_TOTAL}</td>
                                    <td>{order.FACTURADO ? 'Sí' : 'No'}</td>
                                    <td>{calculateDuration(order.FECHA_INGRESO, order.FECHA_FIN)}</td> {/* Cálculo en la tabla */}
                                    <td>{order.TOMADO_POR}</td>
                                    <td>{order.A_REALIZAR_POR}</td>
                                    <td>{order.INGRESO_POR}</td>
                                    <td>{order.METODO_PAGO}</td>
                                    <td>{order.ID_CLIENTE}</td>
                                    <td>{order.ESTADO}</td>
                                    <td>
                                        <button>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserPanel;

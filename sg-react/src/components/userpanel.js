import React, { useState, useEffect } from 'react';
import '../styles/userpanel.css'; // Asegúrate de crear un archivo CSS para darle estilo

const UserPanel = () => {
    const [orders, setOrders] = useState([]); // Inicialmente vacío
    const [loading, setLoading] = useState(true); // Estado para saber si está cargando
    const [error, setError] = useState(null); // Estado para manejar errores

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

    return (
        <div className="user-panel-container">
            <div className="new-order">
                <h2>Nuevo Pedido</h2>
                <form>
                    <label>Fecha Ingreso</label>
                    <input type="date" />
                    <label>Fecha Finalización</label>
                    <input type="date" />
                    <label>Tomado por</label>
                    <select>
                        <option value="Lautaro">Lautaro</option>
                        <option value="Roberto">Roberto</option>
                    </select>
                    <label>A realizar por</label>
                    <select>
                        <option value="Lautaro">Lautaro</option>
                        <option value="Roberto">Roberto</option>
                    </select>
                    <label>Importe total</label>
                    <input type="text" />
                    <label>Seña</label>
                    <input type="text" />
                    <label>Método de pago</label>
                    <select>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                    </select>
                    <label>Ingreso por</label>
                    <select>
                        <option value="Mostrador">Mostrador</option>
                        <option value="Online">Online</option>
                    </select>
                    <div>
                        <input type="checkbox" id="facturado" />
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
                                <th>A realizar por</th>
                                <th>Fecha Finalización</th>
                                <th>Cliente</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.ID_PEDIDO}>
                                    <td>{order.ID_PEDIDO}</td>
                                    <td>
                                        <select value={order.A_REALIZAR_POR} onChange={() => { }}>
                                            <option value="Lautaro">Lautaro</option>
                                            <option value="Roberto">Roberto</option>
                                        </select>
                                    </td>
                                    <td>{order.FECHA_FIN}</td>
                                    <td>{order.ID_CLIENTE}</td>
                                    <td>{order.DESCRIPCION}</td>
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

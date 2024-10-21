import React, { useState, useEffect } from 'react';
import '../styles/userpanel.css'; // Asegúrate de crear un archivo CSS para darle estilo

const UserPanel = () => {
    const [orders, setOrders] = useState([]); // Pedidos
    const [users, setUsers] = useState([]); // Usuarios para los desplegables
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error
    const [newOrder, setNewOrder] = useState({
        fechaIngreso: '',
        senia: '',
        fechaFin: '',
        importeTotal: '',
        facturado: false,
        tomadoPor: '', // ID del usuario
        aRealizarPor: '', // ID del usuario
        ingresoPor: 'mostrador',
        metodoPago: 'efectivo',
        idCliente: 1, // ID del cliente
        estado: 'no comenzado',
        descripcion: '',
        cantidad: '',
        categoria: 'Grabados laser', 
    });

    // Función para obtener los pedidos desde la API
    const fetchOrders = async () => {
        try {
            setLoading(true); 
            const response = await fetch('http://localhost:5000/pedidos');
            if (!response.ok) {
                throw new Error('Error al obtener los pedidos');
            }
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener los usuarios desde la API
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/usuarios');
            if (!response.ok) {
                throw new Error('Error al obtener los usuarios');
            }
            const data = await response.json();
            setUsers(data); // Cargar usuarios en el estado
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchUsers(); // Cargar usuarios cuando el componente se monta
    }, []); 

        // Función para formatear las fechas a 'dd/mm/aaaa'
        const formatDate = (dateString) => {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('es-ES', options);
        };

    const handleNewOrderChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewOrder(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleNewOrderSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/nuevo-pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el pedido');
            }

            setNewOrder({
                fechaIngreso: '',
                senia: '',
                fechaFin: '',
                importeTotal: '',
                facturado: false,
                tomadoPor: '',
                aRealizarPor: '',
                ingresoPor: 'mostrador',
                metodoPago: 'efectivo',
                idCliente: 1,
                estado: 'no comenzado',
                descripcion: '',
                cantidad: '',
                categoria: 'Grabados laser',
            });
            fetchOrders();
            alert('Pedido agregado con éxito!');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
            try {
                const response = await fetch(`http://localhost:5000/eliminar-pedido/${orderId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el pedido');
                }
                fetchOrders();
                alert('Pedido eliminado con éxito!');
            } catch (error) {
                alert(error.message);
            }
        }
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
                    <select
                        name="tomadoPor"
                        value={newOrder.tomadoPor}
                        onChange={handleNewOrderChange}
                        required
                    >
                        <option value="">Seleccionar Usuario</option>
                        {users.map(user => (
                            <option key={user.idUsuario} value={user.idUsuario}>
                                {user.nombre}
                            </option>
                        ))}
                    </select>
                    <label>A realizar por (ID de Usuario)</label>
                    <select
                        name="aRealizarPor"
                        value={newOrder.aRealizarPor}
                        onChange={handleNewOrderChange}
                        required
                    >
                        <option value="">Seleccionar Usuario</option>
                        {users.map(user => (
                            <option key={user.idUsuario} value={user.idUsuario}>
                                {user.nombre}
                            </option>
                        ))}
                    </select>
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
                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        value={newOrder.descripcion}
                        onChange={handleNewOrderChange}
                        required
                    />
                    <label>Cantidad</label>
                    <input
                        type="number"
                        name="cantidad"
                        value={newOrder.cantidad}
                        onChange={handleNewOrderChange}
                        required
                    />
                    <label>Categoría</label>
                    <select
                        name="categoria"
                        value={newOrder.categoria}
                        onChange={handleNewOrderChange}
                    >
                        <option value="Grabados laser">Grabados laser</option>
                        <option value="Banderas">Banderas</option>
                        <option value="Impresión en prendas">Impresión en prendas</option>
                        <option value="Impresión en objetos">Impresión en objetos</option>
                        <option value="Cartelería">Cartelería</option>
                        <option value="Ploteos">Ploteos</option>
                        <option value="Merchandising">Merchandising</option>
                        <option value="Otros">Otros</option>
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
                {loading ? (
                    <p>Cargando pedidos...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID Pedido</th>
                                <th>Fecha Ingreso</th>
                                <th>Seña</th>
                                <th>Fecha Fin</th>
                                <th>Importe Total</th>
                                <th>Tomado Por</th>
                                <th>A Realizar Por</th>
                                <th>Ingreso Por</th>
                                <th>Método Pago</th>
                                <th>ID Cliente</th>
                                <th>Estado</th>
                                <th>Descripción</th>
                                <th>Cantidad</th>
                                <th>Categoría</th>
                                <th>Facturado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.idPedido}>
                                    <td>{order.idPedido}</td>
                                    <td>{formatDate(order.fechaIngreso)}</td> {/* Formatear fecha de ingreso */}
                                    <td>{order.senia}</td>
                                    <td>{formatDate(order.fechaFin)}</td> {/* Formatear fecha de fin */}
                                    <td>{order.importeTotal}</td>
                                    <td>{order.tomadoPor}</td>
                                    <td>{order.aRealizarPor}</td>
                                    <td>{order.ingresoPor}</td>
                                    <td>{order.metodoPago}</td>
                                    <td>{order.idCliente}</td>
                                    <td>{order.estado}</td>
                                    <td>{order.descripcion}</td>
                                    <td>{order.cantidad}</td>
                                    <td>{order.categoria}</td>
                                    <td>{order.facturado ? 'Sí' : 'No'}</td>
                                    <td>
                                        <button onClick={() => handleDeleteOrder(order.idPedido)}>Eliminar</button>
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

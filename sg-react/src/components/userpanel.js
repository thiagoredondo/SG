import React, { useState, useEffect } from 'react';
import '../css/userpanel.css';

const UserPanel = () => {
    const [orders, setOrders] = useState([]); // Pedidos
    const [users, setUsers] = useState([]); // Usuarios para los desplegables
    const [loading, setLoading] = useState(true); // Estado de carga
    const [clients, setClients] = useState([]); // Estado para los clientes

    const [newClient, setNewClient] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
    });

    const [error, setError] = useState(null); // Estado de error
    const [isEditing, setIsEditing] = useState(false); // Para saber si estamos editando
    const [editOrderId, setEditOrderId] = useState(null); // Almacena el ID del pedido que se está editando
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
        categoria: 'Otros',
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
        fetchUsers();
        fetchClients();
    }, []);

    // Función para obtener los clientes desde la API
    const fetchClients = async () => {
        try {
            const response = await fetch('http://localhost:5000/clientes');
            if (!response.ok) {
                throw new Error('Error al obtener los clientes');
            }
            const data = await response.json();
            setClients(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para formatear las fechas a 'dd/mm/aaaa'
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const handleEditOrder = (order) => {
        setIsEditing(true); // Cambia el estado para que sepamos que estamos en modo edición
        setEditOrderId(order.idPedido); // Almacena el ID del pedido a editar
        setNewOrder({
            // Aquí llenamos newOrder con los valores del pedido
            fechaIngreso: order.fechaIngreso.split('T')[0],
            senia: order.senia,
            fechaFin: order.fechaFin.split('T')[0],
            importeTotal: order.importeTotal,
            facturado: order.facturado,
            tomadoPor: order.tomadoPor.toString(),
            aRealizarPor: order.aRealizarPor.toString(),
            ingresoPor: order.ingresoPor,
            metodoPago: order.metodoPago,
            idCliente: order.idCliente,
            estado: order.estado,
            descripcion: order.descripcion,
            cantidad: order.cantidad,
            categoria: order.categoria,
        }); // Rellena el formulario con los datos del pedido
    };

    // Función para manejar el nuevo cliente
    const handleNewClientChange = (e) => {
        const { name, value } = e.target;
        setNewClient(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDeleteClient = async (clientId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
            try {
                const response = await fetch(`http://localhost:5000/clientes/${clientId}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    throw new Error('Error al eliminar el cliente');
                }
    
                alert('Cliente eliminado con éxito!');
                fetchClients(); // Recargar la lista de clientes después de eliminar
            } catch (error) {
                alert(error.message);
            }
        }
    };    

    const handleNewOrderChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Convierte a número si el campo es tomadoPor o aRealizarPor
        const updatedValue = (name === 'tomadoPor' || name === 'aRealizarPor') ? Number(value) : (type === 'checkbox' ? checked : value);

        setNewOrder(prevState => ({
            ...prevState,
            [name]: updatedValue,
        }));
    };

    const handleEditClient = (clientId) => {
        const clientToEdit = clients.find(client => client.idCliente === clientId);
        
        if (clientToEdit) {
            setNewClient({
                id: clientToEdit.idCliente,
                nombre: clientToEdit.nombre,
                email: clientToEdit.email,
                telefono: clientToEdit.telefono,
            });
            setIsEditing(true); // Cambiar a modo edición
        }
    };    

    const handleNewClientSubmit = async (e) => {
        e.preventDefault();
    
        if (isEditing) {
            // Modo de edición
            try {
                const response = await fetch(`http://localhost:5000/clientes/${newClient.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newClient),
                });
    
                if (!response.ok) {
                    throw new Error('Error al actualizar el cliente');
                }
    
                alert('Cliente actualizado con éxito!');
                setIsEditing(false); // Regresar a modo no edición
                setNewClient({ nombre: '', email: '', telefono: '', direccion: '' }); // Reiniciar el formulario
            } catch (error) {
                alert(error.message);
            }
        } else {
            // Modo de creación
            try {
                const response = await fetch('http://localhost:5000/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newClient),
                });
    
                if (!response.ok) {
                    throw new Error('Error al agregar el cliente');
                }
    
                alert('Cliente agregado con éxito!');
                setNewClient({ nombre: '', email: '', telefono: '', direccion: '' }); // Reiniciar el formulario
            } catch (error) {
                alert(error.message);
            }
        }
    
        fetchClients(); // Recargar la lista de clientes
    };    

    const handleNewOrderSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            // Modo de edición: actualizar un pedido existente
            try {
                const response = await fetch(`http://localhost:5000/actualizar-pedido/${editOrderId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newOrder),
                });

                if (!response.ok) {
                    throw new Error('Error al actualizar el pedido');
                }

                alert('Pedido actualizado con éxito!');
                // Aquí restablecemos el estado de edición y el ID
                setIsEditing(false); // Vuelve a modo no edición
                setEditOrderId(null); // Restablece el ID de edición
            } catch (error) {
                alert(error.message);
            }
        } else {
            // Modo de creación: agregar nuevo pedido
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

                alert('Pedido agregado con éxito!');
            } catch (error) {
                alert(error.message);
            }
        }

        // Reiniciar el formulario solo después de una operación exitosa
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
            categoria: 'Otros',
        });

        // Recargar pedidos después de agregar/editar
        fetchOrders();
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
                <h2>{isEditing ? 'Editar Pedido' : 'Nuevo Pedido'}</h2>
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
                    <label>Tomado por</label>
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
                    <label>A realizar por</label>
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
                    <select
                        name="idCliente"
                        value={newOrder.idCliente}
                        onChange={handleNewOrderChange}
                        required
                    >
                        <option value="">Seleccionar Cliente</option>
                        {clients.map(client => (
                            <option key={client.idCliente} value={client.idCliente}>
                                {client.nombre}
                            </option>
                        ))}
                    </select>
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
                    <button type="submit">
                        {isEditing ? (

                            <img src="Imagenes/controlar.png" alt="Editar Pedido" />
                        ) : (
                            <img src="Imagenes/mas.png" alt="Agregar Pedido" />
                        )}
                    </button>

                </form>
            </div>
            <div className="right-panel">
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
                                    <th>Cliente</th>
                                    <th>Estado</th>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Categoría</th>
                                    <th>Facturado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.idPedido}>
                                        <td>{order.idPedido}</td>
                                        <td>{formatDate(order.fechaIngreso)}</td>
                                        <td>{order.senia}</td>
                                        <td>{formatDate(order.fechaFin)}</td>
                                        <td>{order.importeTotal}</td>
                                        <td>{order.tomadoPor}</td>
                                        <td>{order.aRealizarPor}</td>
                                        <td>{order.ingresoPor}</td>
                                        <td>{order.metodoPago}</td>
                                        <td>{order.nombreCliente}</td>
                                        <td>{order.estado}</td>
                                        <td>{order.descripcion}</td>
                                        <td>{order.cantidad}</td>
                                        <td>{order.categoria}</td>
                                        <td>{order.facturado ? 'Sí' : 'No'}</td>
                                        <td>
                                            <button onClick={() => handleEditOrder(order)}><img src="/Imagenes/lapiz.png" alt="Editar" /></button>
                                            <button onClick={() => handleDeleteOrder(order.idPedido)}><img src="/Imagenes/basura.png" alt="Eliminar" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="client-panel">
                    <div className="new-client">
                        <h2>Nuevo Cliente</h2>
                        <form onSubmit={handleNewClientSubmit}>
                            <label>Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={newClient.nombre}
                                onChange={handleNewClientChange}
                                required
                            />
                            <label>E-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={newClient.email}
                                onChange={handleNewClientChange}
                                required
                            />
                            <label>Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                value={newClient.telefono}
                                onChange={handleNewClientChange}
                            />
                            <button type="submit"><img src="/Imagenes/agregar-usuario.png" alt="Agregar cliente" /></button>
                        </form>
                    </div>

                    <div className="client-list">
                        <h2>Clientes Actuales</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Cliente</th>
                                    <th>Nombre</th>
                                    <th>E-mail</th>
                                    <th>Teléfono</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map(client => (
                                    <tr key={client.idCliente}>
                                        <td>{client.idCliente}</td>
                                        <td>{client.nombre}</td>
                                        <td>{client.email}</td>
                                        <td>{client.telefono}</td>
                                        <td>
                                            <button onClick={() => handleEditClient(client.idCliente)}><img src="/Imagenes/lapiz-de-usuario.png" alt="Editar usuario" /></button>
                                            <br />
                                            <button onClick={() => handleDeleteClient(client.idCliente)}><img src="/Imagenes/basura.png" alt="Eliminar usuario" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;

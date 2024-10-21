CREATE DATABASE SerigrafiaGomez;

USE SerigrafiaGomez;

CREATE TABLE Cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(255)
);

CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE Pedido (
    idPedido INT AUTO_INCREMENT PRIMARY KEY,
    fechaIngreso DATE NOT NULL,
    senia DECIMAL(10, 2),
    fechaFin DATE,
    importeTotal DECIMAL(10, 2),
    facturado BOOLEAN,
    tomadoPor INT,
    aRealizarPor INT,
    ingresoPor ENUM('WhatsApp', 'Teléfono', 'Email', 'Mostrador'),
    metodoPago ENUM('Efectivo', 'Tarjeta', 'Transferencia'),
    idCliente INT,
    estado ENUM('No comenzado', 'En proceso', 'Realizado', 'Entregado'),
    descripcion TEXT NOT NULL,
    cantidad INT NOT NULL,
    categoria ENUM('Grabado laser', 'Banderas', 'Impresión en prendas', 'Impresión en objetos', 'Cartelería', 'Ploteos', 'Merchandising', 'Otros'),
    FOREIGN KEY (tomadoPor) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (aRealizarPor) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente)
);

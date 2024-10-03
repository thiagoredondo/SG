-- Tabla CLIENTE
CREATE TABLE CLIENTE (
    ID_CLIENTE INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(255) NOT NULL,
    TELEFONO VARCHAR(20),
    EMAIL VARCHAR(255)
);

-- Tabla USUARIO
CREATE TABLE USUARIO (
    ID_USUARIO INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(255) NOT NULL,
    EMAIL VARCHAR(255)
);

-- Tabla PEDIDO
CREATE TABLE PEDIDO (
    ID_PEDIDO INT AUTO_INCREMENT PRIMARY KEY,
    FECHA_INGRESO DATE NOT NULL,
    SEÑA DECIMAL(10, 2),
    FECHA_FIN DATE,
    IMPORTE_TOTAL DECIMAL(10, 2),
    FACTURADO BOOLEAN,
    TIEMPO_REALIZACION TIME,
    TOMADO_POR INT,
    A_REALIZAR_POR INT,
    INGRESO_POR ENUM('whatsapp', 'telefono', 'email', 'mostrador'),
    METODO_PAGO ENUM('efectivo', 'tarjeta', 'transferencia'),
    ID_CLIENTE INT,
    ESTADO ENUM('no comenzado', 'en proceso', 'realizado', 'entregado'),
    FOREIGN KEY (TOMADO_POR) REFERENCES USUARIO(ID_USUARIO),
    FOREIGN KEY (A_REALIZAR_POR) REFERENCES USUARIO(ID_USUARIO),
    FOREIGN KEY (ID_CLIENTE) REFERENCES CLIENTE(ID_CLIENTE)
);

-- Tabla DETALLE
CREATE TABLE DETALLE (
    ID_DETALLE INT AUTO_INCREMENT PRIMARY KEY,
    ID_PEDIDO INT,
    DESCRIPCION TEXT NOT NULL,
    CANTIDAD INT NOT NULL,
    CATEGORIA VARCHAR(255),
    FOREIGN KEY (ID_PEDIDO) REFERENCES PEDIDO(ID_PEDIDO)
);

-- Tabla REALIZA (Relación entre PEDIDO y CLIENTE)
CREATE TABLE REALIZA (
    ID_PEDIDO INT,
    ID_CLIENTE INT,
    PRIMARY KEY (ID_PEDIDO, ID_CLIENTE),
    FOREIGN KEY (ID_PEDIDO) REFERENCES PEDIDO(ID_PEDIDO),
    FOREIGN KEY (ID_CLIENTE) REFERENCES CLIENTE(ID_CLIENTE)
);


ALTER TABLE USUARIO --Se agrega la columba ROL para establacer Administradores y comunes.
ADD COLUMN PASSWORD VARCHAR(255) NOT NULL,
ADD COLUMN ROL ENUM('usuario', 'administrador') DEFAULT 'usuario';
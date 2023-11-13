
-- Crear la tabla de Bodegas
CREATE TABLE Bodegas (
    bodegaId INT PRIMARY KEY,
    nombre NVARCHAR(100),
    ubicacion NVARCHAR(255),
    capacidad INT
);

-- Crear la tabla de Productos
CREATE TABLE Productos (
    productoId INT PRIMARY KEY,
    nombre NVARCHAR(100),
    descripcion NVARCHAR(255),
    precio DECIMAL(10, 2)
);

-- Crear la tabla de Inventario
CREATE TABLE Inventario (
    inventarioId INT PRIMARY KEY,
    productoId INT,
    bodegaId INT,
    cantidad INT,
    FOREIGN KEY (productoId) REFERENCES Productos(productoId),
    FOREIGN KEY (bodegaId) REFERENCES Bodegas(bodegaId)
);

-- Crear la tabla de Movimientos de Inventario
CREATE TABLE MovimientosInventario (
    movimientoId INT PRIMARY KEY,
    inventarioId INT,
    tipoMovimiento NVARCHAR(50),
    cantidad INT,
    fechaMovimiento DATETIME,
    FOREIGN KEY (inventarioId) REFERENCES Inventario(inventarioId)
);

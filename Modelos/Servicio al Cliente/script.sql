
-- Crear la tabla de Empleados
CREATE TABLE Empleados (
    empleadoId SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    rol VARCHAR(50)
);

-- Insertar algunos datos de ejemplo en la tabla de Empleados
INSERT INTO Empleados (nombre, rol) VALUES
('Maria Lopez', 'Agente de Servicio'),
('Carlos Jimenez', 'Agente de Servicio'),
('Ana Torres', 'Supervisora');

-- Crear la tabla de Consultas
CREATE TABLE Consultas (
    consultaId SERIAL PRIMARY KEY,
    clienteId INT,
    empleadoId INT,
    fechaHora TIMESTAMP,
    tipoConsulta VARCHAR(50),
    detalle TEXT,
    estado VARCHAR(50)
);

-- Crear la tabla de Seguimiento de Consultas
CREATE TABLE SeguimientoConsultas (
    seguimientoId SERIAL PRIMARY KEY,
    consultaId INT,
    fechaHora TIMESTAMP,
    nota TEXT,
    FOREIGN KEY (consultaId) REFERENCES Consultas(consultaId)
);

-- Insertar algunos datos de ejemplo en la tabla de Consultas
-- Asumiendo que ya existen clientes en el sistema
INSERT INTO Consultas (clienteId, empleadoId, fechaHora, tipoConsulta, detalle, estado) VALUES
(1, 1, '2023-11-10 10:00:00', 'Queja', 'Producto defectuoso', 'Abierta'),
(2, 2, '2023-11-10 11:00:00', 'Pregunta', 'Consulta sobre envío', 'Resuelta');

-- Insertar datos de ejemplo en la tabla de Seguimiento de Consultas
INSERT INTO SeguimientoConsultas (consultaId, fechaHora, nota) VALUES
(1, '2023-11-10 12:00:00', 'Producto en revisión'),
(2, '2023-11-10 13:00:00', 'Información de envío proporcionada');

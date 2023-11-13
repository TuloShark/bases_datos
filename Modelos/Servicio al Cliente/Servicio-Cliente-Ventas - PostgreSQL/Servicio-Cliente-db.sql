CREATE TABLE IF NOT EXISTS Clients (
	clientid integer PRIMARY KEY UNIQUE NOT NULL,
	name varchar(50) NOT NULL,
	lastName varchar(50) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(80) NOT NULL
) TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS Employees (
	employeeid integer PRIMARY KEY UNIQUE NOT NULL,
	name varchar(50) NOT NULL,
	lastName varchar(50) NOT NULL,
	email varchar(100) NOT NULL
) TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS TypeCall (
	typeid integer PRIMARY KEY UNIQUE NOT NULL,
	name varchar(50) NOT NULL,
	description varchar(100) NOT NULL
) TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS Calls (
	callid integer PRIMARY KEY UNIQUE NOT NULL,
	employee integer,
	client integer NOT NULL,
	type integer NOT NULL,
	description varchar(100) NOT NULL,
	date date NOT NULL,
	CONSTRAINT "fk Calls.employee to Employees.employeeid" FOREIGN KEY (employee) REFERENCES Employees (employeeid),
	CONSTRAINT "fk Calls.client to Clients.clientid" FOREIGN KEY (client) REFERENCES Clients (clientid),
	CONSTRAINT "fk Calls.type to TypeCall.typeid" FOREIGN KEY (type) REFERENCES TypeCall (typeid)
) TABLESPACE pg_default;
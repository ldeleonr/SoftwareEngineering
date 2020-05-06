CREATE DATABASE banco_bd;

CREATE TABLE IF NOT EXISTS `customers` (
  id int(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  active BOOLEAN DEFAULT false
) 

CREATE TABLE IF NOT EXISTS `catalogopadre` (
codigopadre INT (3)NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (40)NOT NULL,
estado VARCHAR (3)NOT NULL
)


CREATE TABLE IF NOT EXISTS `catalogobydatopadre`(
codigodato int (3)NOT NULL PRIMARY KEY AUTO_INCREMENT,
codigopadre int (3)NOT NULL,
codigohijo INT (3) NULL,
nombre VARCHAR (40)NOT NULL,
estado VARCHAR (3)NOT null,
FOREIGN KEY (codigopadre) REFERENCES catalogopadre(codigopadre) 
)

CREATE TABLE IF NOT EXISTS `puntosatencion`(
	id INT(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL, 
	estado INT(3) NOT NULL,
	codigodepto INT(3)NOT NULL,
	codigoregion INT(3) NOT NULL,
	FOREIGN KEY (estado) REFERENCES catalogobydatopadre(codigodato),
	FOREIGN KEY (codigodepto) REFERENCES catalogobydatopadre(codigodato),
	FOREIGN KEY (codigoregion) REFERENCES catalogobydatopadre(codigodato)
)


CREATE TABLE IF NOT EXISTS `banco_users`(
	id INT(3)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
	dpi varchar (15),
	primernombre VARCHAR(30) NOT NULL,
	segundonombre VARCHAR(30) NOT NULL,
	tercernombre VARCHAR(30),
	primerapellido VARCHAR(30) NOT NULL,
	segundoapellido VARCHAR(30) NOT NULL,
	email VARCHAR(50) NOT NULL,
	usuario varchar(50) NOT NULL,
	estado INT(3) NOT NULL,
	codigopuntoasignado INT(3)NOT NULL,
	password varchar(15) NOT NULL,
	FOREIGN KEY (estado) REFERENCES catalogobydatopadre(codigodato),
	FOREIGN KEY (codigopuntoasignado) REFERENCES puntosatencion(id)	
)

CREATE TABLE IF NOT EXISTS `banco_roles`(
	id INT(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	idrol INT(3) NOT NULL, 
	iduser INT(3) NOT NULL,
	estado INT(3)NOT null,
	FOREIGN KEY (idrol) REFERENCES catalogobydatopadre(codigodato),
	FOREIGN KEY (iduser) REFERENCES banco_users(id),
	FOREIGN KEY (estado) REFERENCES catalogobydatopadre(codigodato)
)


/*-----------------------------------------------------------*/
/*------------------------INSERT DATA------------------------*/
/*CREAR CATALOGOS PADRE*/
insert into catalogopadre values (1,"Estados","A");
insert into catalogopadre values (2,"Rol","A");
insert into catalogopadre values (3,"Region","A");
insert into catalogopadre values (4,"Departamento","A");
insert into catalogopadre values (5,"Cargo","A");
insert into catalogopadre values (6,"Medios de Ingreso","A");


/*1. ASIGNAR ROLES*/

/*2. CATALOGO ROLES
	2.1 ADMINISTRADOR
	2.2 OPERADOR
	2.3 CENTRALIZADOR*/
insert into catalogobydatopadre values (3,2,null,"ADMINISTRADOR","A");
insert into catalogobydatopadre values (4,2,null,"OPERADOR","A");
insert into catalogobydatopadre values (5,2,null,"CENTRALIZADOR","A");

/*3. CATALOGO REGIONES */
insert into catalogobydatopadre values (6,3,null,"CENTRAL","A")
insert into catalogobydatopadre values (7,3,null,"SUR","A")
insert into catalogobydatopadre values (8,3,null,"NORORIENTE","A")
insert into catalogobydatopadre values (9,3,null,"OCCIDENTE","A")

/*4. CATALOGO DEPARTAMENTOS*/
insert into catalogobydatopadre values (10,4,null,"ALTA VERAPAZ","A")
insert into catalogobydatopadre values (11,4,null,"BAJA VERAPAZ","A")
insert into catalogobydatopadre values (12,4,null,"CHIMALTENANGO","A")
insert into catalogobydatopadre values (13,4,null,"CHIQUIMULA","A")
insert into catalogobydatopadre values (14,4,null,"PETEN","A")
insert into catalogobydatopadre values (15,4,null,"EL PROGRESO","A")
insert into catalogobydatopadre values (16,4,null,"QUICHE","A")
insert into catalogobydatopadre values (17,4,null,"ESCUINTLA","A")
insert into catalogobydatopadre values (18,4,null,"GUATEMALA","A")
insert into catalogobydatopadre values (19,4,null,"HUEHUETENANGO","A")
insert into catalogobydatopadre values (20,4,null,"IZABAL","A")
insert into catalogobydatopadre values (21,4,null,"JALAPA","A")
insert into catalogobydatopadre values (22,4,null,"JUTIAPA","A")
insert into catalogobydatopadre values (23,4,null,"QUETZALTENANGO","A")
insert into catalogobydatopadre values (24,4,null,"RETALHULEU","A")
insert into catalogobydatopadre values (25,4,null,"SACATEPEQUEZ","A")
insert into catalogobydatopadre values (26,4,null,"SAN MARCOS","A")
insert into catalogobydatopadre values (27,4,null,"SANTA ROSA","A")
insert into catalogobydatopadre values (28,4,null,"SOLOLA","A")
insert into catalogobydatopadre values (29,4,null,"SUCHITEPEQUEZ","A")
insert into catalogobydatopadre values (30,4,null,"TOTONICAPAN","A")
insert into catalogobydatopadre values (31,4,null,"ZACAPA","A")

/*5. CATALOGO ESTADOS*/
insert into catalogobydatopadre values (1,1,null,"ACTIVO","A")
insert into catalogobydatopadre values (2,1,null,"INACTIVO","A")

insert into catalogobydatopadre values (39,6,null,"TELEFONO","A");
insert into catalogobydatopadre values (40,6,null,"CORREO","A");
insert into catalogobydatopadre values (41,6,null,"CHAT","A");
insert into catalogobydatopadre values (42,6,null,"PRESENCIAL","A");
insert into catalogobydatopadre values (43,6,null,"APLICACION MOVIL","A");

/*6. CATALOGO PUNTOS DE ATENCION (ESTE LLEVARA UN DEPTO EL CUAL VINCULA A REGION)*/
insert into puntosatencion values (1,"Central de Bancos",1,18,6)
insert into puntosatencion values (2,"Banco metropolitano",1,18,6)



/*-----------------------------------------------------------*/


CREATE TABLE tipo_quejas(
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  siglas VARCHAR (10),
  anio VARCHAR (5),
  descripcion varchar(500)
)

insert into tipo_quejas values(0,'QMS','2020','QUEJA DE PRUEBA2')
SELECT * FROM tipo_quejas

CREATE TABLE banco_quejas(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	codigotipoqueja INT(3),
	medioingreso INT(3),
	detallequeja VARCHAR(500),
	estado INT(3),
	fechaingreso DATE,
	fechamodifico DATE,
	usuarioingreso varchar (50),
	usuariomodifico varchar (50),
	usuarioasignado INT(3),
	fechaatencion DATE
)
	insert into banco_quejas values (0,1,2,'QUEJA POR X RAZON',1,null,null,'ldeleonr9',null, 1,null);

	
	
	select * from banco_users where usuario='ldeleonr9' and password='root123'
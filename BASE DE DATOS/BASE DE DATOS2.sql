CREATE DATABASE banco_bd;

CREATE TABLE catalogopadre (
codigopadre int (3)NOT NULL,
nombre VARCHAR (40)NOT NULL,
PRIMARY KEY (codigopadre) 
)
 
CREATE TABLE catalogobydatopadre (
codigo int (3)NOT NULL,
codigopadre int (3)NOT NULL,
codigodato int(3)NOT NULL,
nombre VARCHAR (40)NOT NULL,
PRIMARY KEY (codigo),
FOREIGN KEY (codigopadre) REFERENCES catalogopadre(codigopadre) 
)

CREATE TABLE puntosatencion(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(30) NOT NULL, 
	estado INT(3),
	codigoregion INT(3),
	codigomedioingreso INT(3)
)

ALTER TABLE puntosatencion
ADD FOREIGN KEY (estado) REFERENCES catalogobydatopadre(codigo);
ALTER TABLE puntosatencion
ADD FOREIGN KEY (codigoregion) REFERENCES catalogobydatopadre(codigo);
ALTER TABLE puntosatencion
ADD FOREIGN KEY (codigomedioingreso) REFERENCES catalogobydatopadre(codigo);


CREATE TABLE banco_users(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	dpi varchar (15),
	primernombre VARCHAR(30) NOT NULL,
	segundonombre VARCHAR(30) NOT NULL,
	tercernombre VARCHAR(30),
	primerapellido VARCHAR(30) NOT NULL,
	segundoapellido VARCHAR(30) NOT NULL,
	email VARCHAR(50),
	estado INT(3),
	codigopuntoasignado INT(3) 
)
ALTER TABLE banco_users
ADD FOREIGN KEY (estado) REFERENCES catalogobydatopadre(codigo);

CREATE TABLE banco_roles(
	iddetalle INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idrol INT(3),
	iduser INT(6),
	FOREIGN KEY (idrol) REFERENCES catalogobydatopadre(codigo)
)
ALTER TABLE banco_roles
ADD FOREIGN KEY (iduser) REFERENCES banco_users(id);



CREATE TABLE banco_quejas(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	codigotipoqueja INT(3),
	medioingreso INT(3),
	detallequeja VARCHAR(500),
	estado INT(3),
	fechaingreso DATE)


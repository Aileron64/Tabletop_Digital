
Use master

GO
	CREATE Database Tabletop
GO

Use Tabletop

CREATE TABLE Account (
  id          int IDENTITY NOT NULL, 
  userName    varchar(255) NOT NULL, 
  password    varchar(255) NOT NULL, 
  email       varchar(255) NOT NULL, 
  PRIMARY KEY (id));

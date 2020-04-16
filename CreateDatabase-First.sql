CREATE TABLE Account (
  id          int IDENTITY NOT NULL, 
  userName    varchar(255) NOT NULL, 
  password    varchar(255) NOT NULL, 
  email       varchar(255) NOT NULL, 
  displayName varchar(30), 
  PRIMARY KEY (id));

CREATE TABLE [Chat Record] (
  id         int IDENTITY NOT NULL, 
  Gameid     int NOT NULL, 
  Accountid  int NOT NULL, 
  chat_Input varchar(255) NULL, 
  PRIMARY KEY (id));

CREATE TABLE Friendlist (
  Accountid int NOT NULL, 
  friend_id int NULL);

CREATE TABLE Game (
  id         int IDENTITY NOT NULL, 
  gameTypeId int NOT NULL, 
  Accountid  int NOT NULL, 
  Lobbyid    int NOT NULL, 
  players    int NOT NULL, 
  turn_order int NOT NULL, 
  PRIMARY KEY (id));

CREATE TABLE [Game Record] (
  id         int IDENTITY NOT NULL, 
  Accountid  int NOT NULL, 
  win_count  int NULL, 
  loss_count int NULL, 
  game_count int NULL, 
  PRIMARY KEY (id));

CREATE TABLE GameType (
  id        int IDENTITY NOT NULL, 
  game_Name varchar(30) NULL, 
  PRIMARY KEY (id));

CREATE TABLE Lobby (
  id        int IDENTITY NOT NULL, 
  AccountId int NULL, 
  name      varchar(30) NULL, 
  admin     int NOT NULL, 
  [user]    int NOT NULL, 
  PRIMARY KEY (id));

CREATE TABLE [Move Record] (
  id          int IDENTITY NOT NULL, 
  Gameid      int NOT NULL, 
  Accountid   int NOT NULL, 
  record_move varchar(255) NULL, 
  PRIMARY KEY (id));

ALTER TABLE [Move Record] ADD CONSTRAINT [FKMove Recor9786] FOREIGN KEY (Accountid) REFERENCES Account (id);
ALTER TABLE [Move Record] ADD CONSTRAINT [FKMove Recor422987] FOREIGN KEY (Gameid) REFERENCES Game (id);
ALTER TABLE [Chat Record] ADD CONSTRAINT [FKChat Recor531716] FOREIGN KEY (Accountid) REFERENCES Account (id);
ALTER TABLE [Chat Record] ADD CONSTRAINT [FKChat Recor7101] FOREIGN KEY (Gameid) REFERENCES Game (id);
ALTER TABLE [Game Record] ADD CONSTRAINT [FKGame Recor225840] FOREIGN KEY (Accountid) REFERENCES Account (id);
ALTER TABLE Friendlist ADD CONSTRAINT FKFriendlist786353 FOREIGN KEY (Accountid) REFERENCES Account (id);
ALTER TABLE Game ADD CONSTRAINT FKGame992017 FOREIGN KEY (Lobbyid) REFERENCES Lobby (id);
ALTER TABLE Game ADD CONSTRAINT FKGame489276 FOREIGN KEY (Accountid) REFERENCES Account (id);
ALTER TABLE Game ADD CONSTRAINT FKGame375217 FOREIGN KEY (gameTypeId) REFERENCES GameType (id);
ALTER TABLE Lobby ADD CONSTRAINT FKLobby868231 FOREIGN KEY (AccountId) REFERENCES Account (id);
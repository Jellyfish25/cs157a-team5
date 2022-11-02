const mysql = require('serverless-mysql');

(async () => {
  const db = mysql({
    config: {
      host: process.env.HOST || 'localhost',
      user: process.env.USER || 'root',
      password: process.env.PASSWORD || 'password',
      port: 3306,
    },
  });

  await db.query('DROP DATABASE team5');
  await db.query('CREATE DATABASE team5');
  await db.query(`USE team5`);

  await db.query(`CREATE TABLE User(
    username varchar(255) PRIMARY KEY,
    password varchar(255)
  );`);

  await db.query(`CREATE TABLE Customer(
    username varchar(255) NOT NULL,
    paymentMethod varchar(15) CHECK (paymentMethod = 'credit card' OR paymentMethod = 'debit card' OR paymentMethod = 'gift card'),
    FOREIGN KEY (username) REFERENCES User(username)
  );`);

  await db.query(`CREATE TABLE Employee(
    username varchar(255) NOT NULL,
    hourlyWage REAL,
    FOREIGN KEY (username) REFERENCES User(username)
  );`);

  await db.query(`CREATE TABLE ContentCreator(
    username varchar(255),
    reputationRating REAL CHECK (reputationRating BETWEEN 0 AND 5),
    FOREIGN KEY (username) REFERENCES User(username)
  );`);

  await db.query(`CREATE TABLE Media(
    title varchar(255) PRIMARY KEY,
    cost REAL,
    inventory INTEGER,
    type varchar(10) CHECK (type = 'game' OR type = 'book' OR type = 'movie' OR type = 'musicAlbum')
    );`);

  await db.query(`CREATE TABLE Reminded(
    employeeUsername VARCHAR(255) NOT NULL,
    customerUsername VARCHAR(255) NOT NULL,
    reminderCount INTEGER,
    lastDateReminded DATE,
    FOREIGN KEY (employeeUsername) REFERENCES Employee(username),
    FOREIGN KEY (customerUsername) REFERENCES Customer(username)
    );`);

  await db.query(`CREATE TABLE Reviewed(
    customerUsername VARCHAR(255) NOT NULL,
    mediaTitle VARCHAR(255) NOT NULL,
    decision VARCHAR(20) CHECK (decision = 'approved' OR decision = 'denied' OR decision = 'pending'),
    reason VARCHAR(255),
    FOREIGN KEY (customerUsername) REFERENCES Customer(username),
    FOREIGN KEY (mediaTitle) REFERENCES Media(title)
    );`);

  await db.query(`CREATE TABLE Rented(
    customerUsername VARCHAR(255) NOT NULL,
    mediaTitle VARCHAR(255) NOT NULL,
    dueDate DATE,
    FOREIGN KEY (customerUsername) REFERENCES Customer(username),
    FOREIGN KEY (mediaTitle) REFERENCES Media(title)
  );`);

  await db.query(`CREATE TABLE Evaluated(
    customerUsername VARCHAR(255) NOT NULL,
    mediaTitle VARCHAR(255) NOT NULL,
    rating REAL CHECK (rating BETWEEN 0 AND 5),
    comment VARCHAR(255),
    FOREIGN KEY (customerUsername) REFERENCES Customer(username),
    FOREIGN KEY (mediaTitle) REFERENCES Media(title)
    );`);

  await db.query(`CREATE TABLE Created(
    creatorUsername VARCHAR(255) NOT NULL,
    mediaTitle VARCHAR(255) NOT NULL,
    dateCreated DATE,
    FOREIGN KEY (creatorUsername) REFERENCES ContentCreator(username),
    FOREIGN KEY (mediaTitle) REFERENCES Media(title)
  );`);

  await db.query(
    `insert into User (username, password) values ('Isadore', 'TQ5I1hM1kOn3');`
  );
  await db.query(
    `insert into User (username, password) values ('Augustin', 'lXGWYPRMZGE');`
  );
  await db.query(
    `insert into User (username, password) values ('Kenyon', 'XgHW6apPVFva');`
  );
  await db.query(
    `insert into User (username, password) values ('Hort', 'x5fsVP5j');`
  );
  await db.query(
    `insert into User (username, password) values ('Bastien', 'jgoOwRIP');`
  );
  await db.query(
    `insert into User (username, password) values ('Vita', '0t0yjp5plUm0');`
  );
  await db.query(
    `insert into User (username, password) values ('Abe', 'xzVCIn');`
  );
  await db.query(
    `insert into User (username, password) values ('Fayette', 'KoROxOe');`
  );
  await db.query(
    `insert into User (username, password) values ('Spike', 'hsvtF4');`
  );
  await db.query(
    `insert into User (username, password) values ('Shelden', 'TAIYmoGFlKY');`
  );
  await db.query(
    `insert into User (username, password) values ('Emelina', 'nfCZEwi54');`
  );
  await db.query(
    `insert into User (username, password) values ('Nonnah', 'bbW2s03');`
  );
  await db.query(
    `insert into User (username, password) values ('Clement', '9rig21FZDEUG');`
  );
  await db.query(
    `insert into User (username, password) values ('Quintana', 'QFyk3Gf0bYKH');`
  );
  await db.query(
    `insert into User (username, password) values ('Jesus', 'qLJC5dkNIG');`
  );
  await db.query(
    `insert into User (username, password) values ('Carley', 'AwC4RTu');`
  );
  await db.query(
    `insert into User (username, password) values ('Cymbre', 'e9NN6T8Rnp');`
  );
  await db.query(
    `insert into User (username, password) values ('Tabina', 'tgDh2xNBgKw');`
  );
  await db.query(
    `insert into User (username, password) values ('Vaclav', '5o8GV5K');`
  );
  await db.query(
    `insert into User (username, password) values ('Julie', 'zlFZcoaosWL');`
  );
  await db.end();
  db.quit();

  console.log('Db Migrated Succesfully');
})();

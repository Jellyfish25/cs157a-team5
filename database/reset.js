const mysql = require('serverless-mysql');
const users = require('../mocks/users.json');
const medias = require('../mocks/media.json');

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
    employeeUsername VARCHAR(255) NOT NULL,
    mediaTitle VARCHAR(255) NOT NULL,
    decision VARCHAR(20) CHECK (decision = 'approved' OR decision = 'denied' OR decision = 'pending'),
    reason VARCHAR(255),
    FOREIGN KEY (employeeUsername) REFERENCES Employee(username),
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

  let i = 0;
  const creators = [];
  const customers = [];
  const employees = [];
  for (const user of users) {
    const { username, password } = user;
    await db.query(`INSERT INTO User VALUES('${username}', '${password}')`);
    if (i < 10) {
      await db.query(
        `INSERT INTO Customer VALUES('${username}', '${
          ['credit card', 'debit card', 'gift card'][
            Math.floor(Math.random() * 3)
          ]
        }')`
      );
      customers.push(user);
    } else if (i < 20) {
      await db.query(
        `INSERT INTO Employee VALUES('${username}', '${
          Math.round((Math.random() * 3 + 15) * 100) / 100
        }')`
      );
      employees.push(user);
    } else {
      await db.query(
        `INSERT INTO ContentCreator VALUES('${username}', '${
          Math.round((Math.random() * 4 + 1) * 100) / 100
        }')`
      );
      creators.push(user);
    }
    i++;
  }

  for (const media of medias) {
    const { title, cost, inventory } = media;
    await db.query(
      `INSERT INTO Media VALUES('${title}', ${cost}, ${inventory}, '${
        ['game', 'book', 'movie', 'musicAlbum'][Math.floor(Math.random() * 4)]
      }')`
    );
    const index = [Math.floor(Math.random() * creators.length)];
    const { username } = creators[index];
    await db.query(
      `INSERT INTO Created VALUES('${username}', '${title}', '${new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')}')`
    );
  }

  for (let i = 0; i < 10; i++) {
    await db.query(
      `INSERT INTO Reminded VALUES('${getRandom(employees).username}', '${
        getRandom(customers).username
      }', ${Math.floor(Math.random() * 4)}, '${new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')}')`
    );
    const decision = getRandom(['approved', 'denied', 'pending']);
    const reason = (() => {
      if (decision == 'approved') return 'No Problems.';
      else if (decision == 'denied') return 'Inappropriate Content.';
      else return '';
    })();
    await db.query(
      `INSERT INTO Reviewed VALUES('${getRandom(employees).username}', '${
        getRandom(medias).title
      }', '${decision}', '${reason}')`
    );
    await db.query(
      `INSERT INTO rented VALUES('${getRandom(customers).username}', '${
        getRandom(medias).title
      }', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`
    );
    await db.query(
      `INSERT INTO evaluated VALUES('${getRandom(customers).username}', '${
        getRandom(medias).title
      }', ${Math.round((Math.random() * 4 + 1) * 10) / 10}, '${getRandom([
        'Alright.',
        'Poor',
        'This made me wanna stop consuming media.',
        '.',
        'Awesome!',
      ])}')`
    );
  }
  await db.end();
  db.quit();

  console.log('Db Migrated Succesfully');
})();

const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

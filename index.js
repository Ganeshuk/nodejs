const sql = require("mysql2");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
let time = new Date();
app.use(express.json());
app.listen(4004, () => {
  console.log("run");
});

const db = sql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12651911",
  password: "ztrhvXHT4w",
  database: "sql12651911",
});

app.post("/Login/", async (request, response) => {
  const { email } = request.body;
  const token = await jwt.sign(email, "nxtwave");
  console.log(token);
  response.send(token);
});
app.post("/insert", async (request, response) => {
  const {
    userid,
    user_email,
    user_password,
    user_name,
    user_image,
    total_orders,
    created_at,
    last_logged_in,
  } = request.body;
  db.query(
    `
     INSERT INTO users (user_id, user_name, user_email, user_password, user_image, total_orders,created_at,last_logged_in)
    VALUES (?,?,?,?,?,?,?,?)`,
    [
      userid,
      user_email,
      user_password,
      user_name,
      user_image,
      total_orders,
      created_at,
      last_logged_in,
    ],
    (err, row) => {
      if (err) {
        response.send(err);
      } else {
        response.send("added");
      }
    }
  );
});

app.get("/detail/:id/", (request, response) => {
  console.log("detail");
  const { id } = request.params;
  console.log(id);
  db.query(`select * from users where user_id=?`, [id], (err, row) => {
    if (err) {
      response.send(err);
    } else {
      response.send(row);
    }
  });
});
app.get("/", (request, response) => {
  db.query(`select * from users`, (err, row) => {
    if (err) {
      response.send(err);
    } else {
      response.send(row);
    }
  });
});

app.get("/delete/:id", (request, response) => {
  const { id } = request.params;
  db.query(`delete from users where user_id=? `, [id], (err, row) => {
    if (err) {
      response.send(err);
    } else {
      response.send("user deleted");
    }
  });
});

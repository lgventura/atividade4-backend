const express = require("express");
const fetch = require("cross-fetch");
const database = require("./database.js");
const server = express();

server.use(express.json());

server.get("/", async function (req, res) {
  try {
    const connection = await database.Connect();

    let select = `SELECT * FROM urls;`;

    const [rows] = await connection.query(select);

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

server.post("/create", async function (req, res) {
  try {
    const connection = await database.Connect();
    const data = req.body;
    const currentDate = new Date();
    const url = await CreateShortUrl(data.completeUrl);
    await connection.query(
      `INSERT INTO urls(short_url, data_created) VALUES ('${url.toString()}', '${currentDate}');`
    );

    const [rows] = await conn.query("SELECT LAST_INSERT_ID();");

    res.json({ id: rows, url: url });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

async function CreateShortUrl(url) {
  let shortRequest = {
    destination: url,
    domain: { fullName: "rebrand.ly" },
  };

  let headers = {
    "Content-Type": "application/json",
    apiKey: "",
  };

  await fetch("https://api.rebrandly.com/v1/links", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(shortRequest),
  })
    .then((response) => response.json())
    .then((json) => {
      url = json.shortUrl.toString();
    });

  return url;
}

server.get("/:url_id", async function (req, res) {
  try {
    var id = req.params.url_id;

    if (isNaN(id)) {
      res.json({
        mensagem:
          "O ID está incorreto ou ainda não foi adicionado uma URL nesta posição",
      });
    }

    const connection = await database.Conectar();

    const [rows] = await connection.query(
      `SELECT * FROM urls WHERE id = ${id};`
    );

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

server.post("/created", async function (req, res) {
  try {
    const data = req.body;
    const connection = await database.Connect();

    const [rows] = await connection.query(
      `SELECT * FROM urls WHERE data_created = '${data.dataCreated}';`
    );

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

server.post("/url", async function (req, res) {
  try {
    const data = req.body;

    const conn = await database.Conectar();

    const [rows] = await conn.query(
      `SELECT * FROM urls WHERE short_url = '${data.shortUrl}';`
    );

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

server.listen(3000);

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
const fs = require("fs");

const commonPaths = require("./webpack/paths");

// API server config

process.on("uncaughtException", err => {
  console.log("UCAUGHT EXCEPTION! Shutting down..");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const PORT = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful!"));

const server = app.listen(PORT, () =>
  console.log(`App running on port ${PORT}...`)
);

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION! Shutting down..");
  console.log(err.name, err.message);

  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully.");
  server.close(() => console.log("Process terminated!"));
});

// App production server config

const root = commonPaths.outputPath;

console.log(`root: ${root}`);

const inMemoryCache = {};

http
  .createServer((req, res) => {
    // sanitized to prevent unauthorized access file like ../../
    let sanite = path.normalize(req.url).replace(/^(\.\.[/\\])+/, "");

    if (
      !sanite.match(
        /\.(js|eot|ttf|woff(2)?|otf|png|jpg|gif|svg|ico|css|gz|map)$/
      )
    ) {
      sanite = "/index.html";
    }

    const filePath = path.join(root, sanite);

    // Check the cache first...
    if (inMemoryCache[filePath] !== undefined) {
      res.statusCode = 200;

      res.write(inMemoryCache[filePath]);
      return res.end();
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, "Not Found");
        res.write("404: File Not Found!");
        return res.end();
      }

      inMemoryCache[filePath] = data;

      res.statusCode = 200;
      res.write(data);
      return res.end();
    });
  })
  .listen(3000);

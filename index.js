const http = require("http");
const fs = require("fs");

const allFiles = fs.readdirSync("./", { withFileTypes: true });

//Get the html files with a regex test, and generate ends for URLs based on their names
const htmlFiles = allFiles
  .filter((file) => {
    return /^.*\.html$/gim.test(file.name);
  })
  .map((file) => {
    if (file.name === "index.html") {
      return "";
    } else {
      return file.name.slice(0, file.name.length - 5);
    }
  });

const server = http.createServer((req, res) => {
  const requestedURL = req.url.slice(1);
  res.setHeader("Content-Type", "text/html");
  if (htmlFiles.includes(requestedURL)) {
    if (requestedURL === "") {
      const file = fs.readFileSync("./index.html", "utf8");
      res.end(file);
    } else {
      const file = fs.readFileSync("./" + requestedURL + ".html");
      res.end(file);
    }
  } else {
    const file = fs.readFileSync("./404.html", "utf8");
    res.end(file);
  }
});

server.listen(8080, () => {
  console.log("Server connected");
});

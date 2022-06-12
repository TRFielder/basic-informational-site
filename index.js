const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(
  express.static("public", {
    extensions: ["html", "htm"],
  })
);

app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, "public/404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

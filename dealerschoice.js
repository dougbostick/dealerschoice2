const express = require("express");
const app = express();
const morgan = require("morgan");
const data = require("./data.js");
const content = data.list();

console.log("content", content);

app.use(express.static("public"));

app.get("/", (req, res) => {
  const html = `<html>
 <head>
   <title>Half-Stack Academy</title>
   <meta name="Doug Bostick" />
   <link rel="stylesheet" href="/main.css" />
 </head>
 <body>
   <h1>Half-Stack Academy</h1>
   <h3>
     The
     <span id="oops">worst</span>
     best place to learn about software development!
   </h3>
   <div id="content">
   <ul>
   ${content
     .map(
       (topic) => `<li><a href="/topic/${topic.topic}">${topic.topic}</a></li>`
     )
     .join("")}
     </ul>
   </div>
 </body>
</html>`;
  res.send(html);
});

app.get("/topic/:choice", (req, res) => {
  const search = req.params.choice;
  const topic = data.findTopic(search);
  res.send(`<head>
    <title>Half-Stack Academy</title>
    <meta name="Doug Bostick" />
    <link rel="stylesheet" href="/main.css" />
  </head>
  <body>
    <h1><a href="/">Half-Stack Academy</a></h1>
    <div id="content">
      <h2>${topic.topic}</h2>
      <p>${topic.info}</p>
    </div>
  </body>
 </html>`);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

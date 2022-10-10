const express = require("express")
const app = express()
const port = 37860;
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const info = require("./info.json")
app.use(express.static('../front'));
// app.use(cookieParser(info.cookieParser))

app.get("/verify", (req, res) => {
  const uses = require("./tmp.json")
  let use = null;
  uses.forEach((e) => {
    if (e.name == req.query.name) {
      use = e;
      return;
    }
  });

  if (!use) {
    res.json("no");
  } else if (req.query.pass && req.query.pass == use.pass) {
    res.cookie("is_login", "yes", {
      // domain: ".xf-yun.cn", // 设置生效域名
      // httpOnly: true, // 只运行Http访问
      maxAge: 1000 * 60 * 60 * 168, // 2个小时过期
    //   signed: true, // 设置签名
    });
    res.redirect("/a.html")
  } else res.json("no");
});


app.listen(port, () => {
  console.log(
    `Express started on http://localhost:${port}` +
      "; press Ctrl-C to terminate."
  );
});

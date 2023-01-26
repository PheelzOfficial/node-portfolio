const express = require("express");
const exphbs = require("express-handlebars");
const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  const sendEmail = (receiver)=>{
    

    const domain = "sandbox574517c48a6243aa8eb2098aac507dc3.mailgun.org";
    const apikey = '30e808d692fd9656f757b71c308e69cd-48c092ba-8663d82b'

    // Create Authentication
    const auth = {
        auth : {
            api_key: apikey,
            domain: domain
        } 
    }
    
    const transporter = nodemailer.createTransport(mailGun(auth))
    
    
    transporter.sendMail({
        from: email,
        to: "popoolaphilip12@gmail.com",
        subject: subject,
        html: `<h1> ${message}, ${name}</h1>`
    })
    }
 
    sendEmail(email)




  res.redirect("/");
});

app.listen(2000, () => {
  console.log("Server listening on port 2000 !");
});

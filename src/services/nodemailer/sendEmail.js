"use strict";

var nodemailer = require("nodemailer");
var fs = require("fs");
var handlebars = require("handlebars");

class SendEmail {
  constructor(data) {
    this.data = data;
  }

  get code() {
    return this._code(this.data);
  }


  //enviar la contraseña
  _code(data) {
    var readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
          throw err;
        } else {
          callback(null, html);
        }
      });
    };

    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: "huupa.xyz",
      port: 465,
      secure: true,
      auth: {
        user: "contacto@huupa.xyz",
        pass: "wGHY{4rRRkn[8~6),A",
      },
    });

    readHTMLFile(__dirname + "/views/sendMessage.html", function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        username: data.user.name,
        code: data.code,
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: "contacto@huupa.xyz",
        to: data.user.email,
        subject: "Código de Autentificación",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        console.log(response);
        if (error) {
          console.log(error);
        }
      });
    });
  }


}
module.exports = SendEmail;

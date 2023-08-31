'use strict'

var nodemailer = require("nodemailer");
var fs = require("fs");
var handlebars = require("handlebars");


class emailContact {
    constructor ( 
       data
    ) {
        this.data = data;
    }

    // Getters

    get  contacto(){
      return this._contacto(this.data);
    }

    get  contactoUser(){
      return this._contactoUser(this.data);
    }

    get  cotizar(){
      return this._cotizar(this.data);
    }

    get  userCreated(){
      return this._userCreated(this.data);
    }
   /* get  contactoEnvio(){
      return this._contactoEnvio(this.data);
    }
*/



_userCreated(data) {
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

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  readHTMLFile(__dirname + "/views/cuenta/cuentaNueva.html", function (err, html) {
    var template = handlebars.compile(html);
    var replacements = {
      app: "AppWeb",
      data: data,
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
      from: "contacto@huupa.xyz",
      to: data.email,
      subject: "¡Bienvenido!",
      html: htmlToSend,
    };
    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      }
    });
  });



}

   _contacto(data){
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

      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
     
  
      readHTMLFile(__dirname + "/views/contacto/contacto.html", function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          app: 'AppWeb',
          data:data
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
        from: "contacto@huupa.xyz",
        to: 'administracion@huupa.xyz', // jlvh1996@gmail.com administracion@huupa.xyz
        subject: "Contacto desde", // 
        html:htmlToSend,
      };

      
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }});
      });
   }



   _cotizar(data){
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

      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
     
  
      readHTMLFile(__dirname + "/views/contacto/cotizar.html", function (err, html) {
        var template = handlebars.compile(html);

        handlebars.registerHelper('ifCond', function (value) {
          return value !== false;
        });

        var replacements = {
          app: 'AppWeb',
          data:data
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
        from: "contacto@huupa.xyz",
        to: 'administracion@huupa.xyz', // jlvh1996@gmail.com
        subject: "Contacto desde", // 
        html:htmlToSend,
      };

      
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }});
      });
   }
   _contactoUser(data) {
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

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    readHTMLFile(__dirname + "/views/contacto/contactoUser.html", function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        app: "AppWeb",
        data: data,
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: "contacto@huupa.xyz",
        to: data.email,
        subject: "¡Bienvenido!",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
      });
    });
  }







  _contactoMedio(data){
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

      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
     
  
      readHTMLFile(__dirname + "/views/contactoMedio.html", function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          app: 'AppWeb',
          data:data
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
        from: "contacto@huupa.xyz",
        to: data.email, 
        subject: "Contacto ", // cambiar
        html:htmlToSend,
      };

      
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
      });
      });
   }

   
   

    
}
  module.exports = emailContact; 



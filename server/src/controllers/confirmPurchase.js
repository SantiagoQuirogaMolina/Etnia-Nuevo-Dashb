const sgMail = require("@sendgrid/mail");
const confirmPurchase = async (id) => {
    const email = "jmrodhurtado1989@hotmail.com";
    const URL = "http://localhost:3030"
    console.log("estoy confirmando compras")
    console.log(id);
    try {
      
      console.log("holaaaaaa")
      console.log(email);
      const { SENDGRID_API_KEY } = process.env;
      console.log(SENDGRID_API_KEY);
      sgMail.setApiKey(SENDGRID_API_KEY);
      //sendgrid
      const msg = {
        to: email, 
        from: "clickyticketg18pf@gmail.com", // Cambiar al remitente verificado
        subject: "Tu producto ETNIA ya va en camino",
        text: "Tu producto ETNIA ha sido comprado",
        html: `<p style="font-size: 16px; color: #0074d9;">
        Gracias por tu compra, continua comprando <a href="${URL}" style="text-decoration: none; color: #ff4136; font-weight: bold;">aquí</a>.
      </p>
      `,
      };
  
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email enviado");
        })
        .catch((error) => {
          console.error("Error al enviar el correo:", error);
        });
    } catch (error) {
      console.error("Error al registrar al usuario:", error);
      throw new Error("Error al registrar al usuario.");
    }
  };
  
  module.exports = confirmPurchase;
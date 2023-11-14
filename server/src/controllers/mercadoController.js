require("dotenv").config();
const {User, Purchase} = require("../db")
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { ACCESS_TOKEN } = process.env;

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
});
const payment = new Preference(client);
const placeOrder = async (req, res) => {
  try {
    // generar orden de compra a mercado pago con la info que llega por body
    const cart = req.body;
    console.log(cart);

    let items = cart.map((product) => ({
      title: product.title,
      quantity: product.quantity,
      unit_price: product.unit_price,
      currency_id: product.currency_id,
      image: product.image,
      description: product.description,
    }));

    let preference = {
      body: {
        items: items,
        back_urls: {
          failure: "www.google.com",
          pending: "http://localhost:3001/purchase/pending",
          success: "http://localhost:3001/purchase/success",
        },
      },
    };

    const response = await payment.create(preference);
    res.status(200).send(response);
    console.log(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const succesfulPurchase = async (req, res) => {
  try {
    const { payment_id } = req.query;
  
   const userId = req.user.id; 

   const user = await User.findById(userId);

   if (!user) {
     return res.status(404).json({ error: "User not found" });
   }

   
   await Purchase.findOneAndUpdate(
     { payment_id: payment_id },
     { $set: { user: user._id } },
     { new: true }
   );

    res.status(200).send("Compra realizada con exito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { placeOrder, succesfulPurchase };
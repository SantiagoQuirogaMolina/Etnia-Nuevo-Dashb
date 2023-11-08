const {getCarts, createCart, deleteFromCart} = require("../controllers/cartController");

const getAllCart = async (req, res)=>{
    const {id} = req.params;
    try {
        if(!id){return res.status(404).json("Missing data")};

        let carts = await getCarts(id);
        res.json(carts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postCart = async (req, res)=>{
    const {UserId, ProductId} = req.body
    try {
        if(!UserId || !ProductId){return res.status(404).json("Missing data")};

        let cart= await createCart({UserId, ProductId});
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteCart = async (req, res)=>{
    const {UserId, ProductId} = req.body;
    try {
        if(!UserId || !ProductId){return res.status(404).json("Missing data")};

        let cart = await deleteFromCart({UserId, ProductId});
        if(!cart){return res.json({message: "This not a cart"})}
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllCart,
    postCart,
    deleteCart
}
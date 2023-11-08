const getCarts = async (id)=>{
    return "Todas las Carts" + id
};

const createCart = async ({UserId, ProductId})=>{
    return ("Postear carrito " + UserId + " " + ProductId);
};

const deleteFromCart = async ({UserId, ProductId})=>{
    return ("Quitar del Carrito " + UserId + " " + ProductId);
};

module.exports = {
    getCarts,
    createCart,
    deleteFromCart,
}
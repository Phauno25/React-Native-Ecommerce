import cartFile from "../data/cart.json";

const useCart = (id = "none") => {
  if (id ==="none") {
    const cart = cartFile;
    return { cart };
  } else {
    const cart = cartFile.find((item) => item.id === id);
    return { cart };
  }
};

export default useCart;

import orderFile from "../data/orders.json";

const useOrder = (id = "none") => {
  if (id ==="none") {
    const order = orderFile;
    return { order };
  } else {
    const order = orderFile.find((item) => item.id === id);
    return { order };
  }
};

export default useOrder;

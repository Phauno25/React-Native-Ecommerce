import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { setProducts } from "../features/shop/shopSlice";

/*Usamos este hook para traer los productos de la db de firebase y setearlos en el estado global*/
/*Lo unico qe se exporta es el isLoading ya que para acceder a la data fetcheada se utiliza un useSelector desde la 
screen o componente que se necesite*/
const useProduct = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(data));
    setLoading(false);
  }, [isLoading]);

  return { loading };
};

export default useProduct;

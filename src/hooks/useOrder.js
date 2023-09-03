import { useEffect } from "react";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { setOrders } from "../features/shop/shopSlice";

/*Usamos este hook para traer las ordenes de la db de firebase y setearlas en el estado global*/
/*Lo unico qe se exporta es el isLoading ya que para acceder a la data fetcheada se utiliza un useSelector desde la 
screen o componente que se necesite*/
const useOrder = (email) => {
  const { data, isLoading } = useGetOrdersByUserQuery(email);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrders(data));
  }, [isLoading]);

  return { isLoading };
};

export default useOrder;

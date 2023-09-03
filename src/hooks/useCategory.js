import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { setCategories } from "../features/shop/shopSlice";

/*Usamos este hook para traer las categorias de la db de firebase y setearlas en el estado global*/
/*Lo unico qe se exporta es el isLoading ya que para acceder a la data fetcheada se utiliza un useSelector desde la 
screen o componente que se necesite*/
const useCategory = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    
    console.log("loading a cambiado a " + loading)
    dispatch(setCategories(data));
    setLoading(false);
  }, [isLoading]);

  return { loading };
};

export default useCategory;

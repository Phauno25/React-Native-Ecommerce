import products from "../data/product.json"

const useProduct = (id) =>{
    const product  = products.find( item => item.id === id)
    return {product}
}

export default useProduct
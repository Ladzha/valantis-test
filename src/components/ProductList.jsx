import ProductCard from './ProductCard'

const ProductList = ({products}) => {
  let cardCounter =1;
  return (
    <section className="product-container">
      {Boolean(products.length) && products.map((product)=>{
        cardCounter++;
        if(cardCounter < 200){
        return(
          <ProductCard 
          key={`${product.id}/${product.product}`}
          id={product.id}
          name={product.product}
          price={product.price}
          brand={product.brand}
          />
        );
      }else{
        return null; 
      }

    })}
    </section>
  )
}

export default ProductList
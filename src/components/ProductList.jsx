import ProductCard from './ProductCard'

const ProductList = ({products}) => {
  
  return (
    <section className="product-container">
      {Boolean(products.length) && products.map((product)=>(
        <ProductCard 
        key={`${product.id}/${product.product}`}
        id={product.id}
        name={product.product}
        price={product.price}
        brand={product.brand}
        />
      ))}
    </section>
  )
}

export default ProductList
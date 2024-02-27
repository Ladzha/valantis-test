import ProductCard from './ProductCard'

const ProductList = ({products}) => {
  return (
    <section className="product-container">
      {Boolean(products.length) && products.map((product)=>(
        <ProductCard 
        key={`${product.id}/${product.name}`}
        id={product.id}
        name={product.title}
        price={product.price}
        brand={product.brand}
        />
      ))}
    </section>
  )
}

export default ProductList
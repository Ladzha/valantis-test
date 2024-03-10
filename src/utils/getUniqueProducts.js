export const getUniqueProducts = (productsData, setProducts) =>{
  let uniqueIdProductList = [];
  let uniqueProductItem = {};
  for (let i in productsData) {
    let itemId = productsData[i]['id'];
    uniqueProductItem[itemId] = productsData[i];
  }
  for (let i in uniqueProductItem) {
    uniqueIdProductList.push(uniqueProductItem[i]);
  }
  setProducts(uniqueIdProductList)
}  

export default getUniqueProducts
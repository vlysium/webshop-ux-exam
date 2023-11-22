function calculateTotalPrice(products) {
  const initialTotalPrice = 0;

  /* 
    using the reduce function to calculate the total price in the basket,
    by multiplying each product price with its quantity,
    and adding the accumulated price from each product together
  */
  const finalTotalPrice = products.reduce((accumulatedTotalPrice, product) => {
    return accumulatedTotalPrice + (product.price * product.quantity);
  }, initialTotalPrice);
  
  return finalTotalPrice.toFixed(2);
}

export { calculateTotalPrice };
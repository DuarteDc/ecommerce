export const priceFormat = (number) =>{
    const price = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
      }).format(number);
    
    return price;
}
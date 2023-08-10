export class Product {
  constructor(
    categoryId,
    productId,
    nameProd,
    img,
    description,
    price,
    quantity
  ) {
    this.categoryId = categoryId;
    this.productId = productId;
    this.nameProd = nameProd;
    this.img = img;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}

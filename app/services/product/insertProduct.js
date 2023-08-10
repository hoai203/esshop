import FirebaseConstants from "../../constants/FirebaseConstants";
import { Product } from "../../models/product";
import ProductService from "./ProductService";
import CategoryService from "../category/CategoryService";
$(document).ready(function () {
  const categoryService = new CategoryService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );
  const productService = new ProductService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );
  const categoryIdCtrl = $("#categoryId");
  categoryService.findAllCategories().then((data) => {
    let list = "";

    for (const key in data) {
      const element = data[key];

      const { nameCate } = element;
      list += `<option value="${key}">${key} - ${nameCate}</option>`;
    }
    categoryIdCtrl.append(list);
  });

  $("#save").on("click", () => {
    const nameProd = $("#nameProd").val();
    const categoryIdCtrl = $("#categoryId");
    const productIdCtrl = $("#productId");
    const price = $("#price").val();
    const img = $("#img").val();
    const quantity = $("#quantity").val();
    const description = $("#description").val();

    const product = new Product(
      categoryIdCtrl.val(),
      productIdCtrl.val(),
      nameProd,
      img,
      description,
      price,
      quantity
    );
    console.log(product);
    // categoryId, productId, name, img, description, price, quantity
    if (
      nameProd == "" ||
      img == "" ||
      description == "" ||
      price == "" ||
      quantity == ""
    ) {
      alert("Không Được Để Trống");
    } else {
      try {
        productService.insertProduct(product).then((data) => {
          productIdCtrl.val(data);
          location.href = "listProducts.html";
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

import "regenerator-runtime/runtime";
import FirebaseConstants from "../../constants/FirebaseConstants";
import UrlHelper from "../../helpers/UrlHelper";
import Categoty from "../../models/category";
import { Product } from "../../models/product";
import CategoryService from "../../services/category/CategoryService";
import ProductService from "./ProductService";
$(document).ready(function () {
  const productService = new ProductService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );
  const categoryService = new CategoryService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );
  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParam(url, "id");
  // console.log(id);
  const categoryIdCtrl = $("#categoryId");
  const productIdCrlt = $("#productId");
  const nameProdCtrl = $("#nameProd");
  const imgCtrl = $("#img");
  const quantityCtrl = $("#quantity");
  const priceCtrl = $("#price");
  const descriptionCtrl = $("#description");
  categoryService.findAllCategories().then((data) => {
    let list = "";

    for (const key in data) {
      const element = data[key];

      const { nameCate } = element;
      list += `<option value="${key}">${key} - ${nameCate}</option>`;
    }
    categoryIdCtrl.append(list);
  });
  productService.findById(id).then((data) => {
    console.log(data);
    const { categoryId, nameProd, img, quantity, price, description } = data;
    categoryIdCtrl.val(categoryId);
    productIdCrlt.val(id);
    nameProdCtrl.val(nameProd);
    quantityCtrl.val(quantity);
    imgCtrl.val(img);
    priceCtrl.val(price);
    descriptionCtrl.val(description);
  });

  $("#update").on("click", () => {
    const prd = new Product(
      categoryIdCtrl.val(),
      null,
      nameProdCtrl.val(),
      imgCtrl.val(),
      descriptionCtrl.val(),
      priceCtrl.val(),
      quantityCtrl.val()
    );
    // console.log(prd);
    if (nameProd == "" || img == "" || price == "" || description == "") {
      alert("Không Được Để Trống");
    } else {
      try {
        productService.updateProduct(productIdCrlt.val(), prd).then((data) => {
          location.href = "listproducts.html";
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

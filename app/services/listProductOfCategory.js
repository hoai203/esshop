import FirebaseConstants from "../constants/FirebaseConstants";
import UrlHelper from "../helpers/UrlHelper";
import CategoryService from "./category/CategoryService";
import ProductService from "./product/ProductService";
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
$(document).ready(function () {
  const categoryService = new CategoryService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );
  const productService = new ProductService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );
  try {
    const listCategory = $("#list-category");
    const listProduct = $("#listProduct");
    categoryService.findAllCategories().then((data) => {
      // console.log(data);
      let list = "";
      for (const id in data) {
        const dev = data[id];
        list += `
                 <a class="dropdown-item category-item" href="listProductOfCategory.html?id=${id}">${dev.nameCate}</a>
                `;
      }
      listCategory.append(list); // list ra html
    });
    const url = location.href;
    const urlHelper = new UrlHelper();
    const categoryId = urlHelper.readParam(url, "id");
    console.log(categoryId);
    if (categoryId) {
      productService.findAllProducts().then((products) => {
        let productOptions = "";
        for (const id in products) {
          const dev = products[id];
          if (dev.categoryId === categoryId) {
            // check nè
            productOptions += `
                          <div class="col-md-4">
                              <div class="product" >
                                  <img src="${dev.img}" alt="${
              dev.nameProd
            }" class="img-thumbnail">
                                  <h4>${dev.nameProd}</h4>
                                  <p>Giá: ${formatNumber(dev.price)}</p>
                                  <button class="btn btn-primary text-white add-to-cart-btn" data-huyit="${id}">Add to Cart</a>
                              </div>
                          </div>
                          `;
          }
        }
        listProduct.append(productOptions);
      });
    }
  } catch (error) {
    console.log(error);
  }
});

import FirebaseConstants from "../constants/FirebaseConstants";
import ProductService from "./product/ProductService";
import CategoryService from "./category/CategoryService";
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
$(document).ready(function () {
  const productService = new ProductService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );
  const categoryService = new CategoryService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );
  try {
    const listProduct = $("#listProduct");
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // local

    // List Sản Phẩm
    productService.findAllProduct().then((data) => {
      console.log(data);
      // list product
      let list = "";
      for (const id in data) {
        const dev = data[id];
        list += `
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
      listProduct.append(list);
      // lọc sản phẩm theo giá
      $("#filter-form").submit(function (event) {
        // console.log('Oke');
        event.preventDefault();
        const lowPrice = $("#min-price").val();
        const highPrice = $("#max-price").val();
        let filteredData = data;
        if (lowPrice && highPrice) {
          filteredData = Object.values(data).filter(
            (product) => product.price >= lowPrice && product.price <= highPrice
          );
        }
        listProduct.empty();
        let filteredList = "";
        for (const id in filteredData) {
          const dev = filteredData[id];
          filteredList += `
            <div class="col-md-4">
              <div class="product" class="brand_img-box  item-1">
                <img src="${dev.img}" alt="${
            dev.nameProd
          }" class="img-thumbnail">
                <h4>${dev.nameProd}</h4>
                <p>Giá: ${formatNumber(dev.price)}</p>
                <button class="btn btn-primary text-white add-to-cart-btn" data-huyit="${id}">Add to Cart</button>
              </div>
            </div>
          `;
        }
        listProduct.append(filteredList);
      });

      //   Add To Cart thôi
      $(".add-to-cart-btn").click(function (event) {
        const productId = $(this).data("huyit");
        const product = data[productId];
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
        const index = cartItems.findIndex(
          (item) => item.productId === productId
        );
        if (index === -1) {
          // Sản phẩm chưa có trong giỏ hàng
          cartItems.push({
            productId: productId,
            product: product,
            quantity: 1,
          });
        } else {
          // Sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
          cartItems[index].quantity++;
        }
        // lưu giỏ hàng vào localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert("Thêm Sản Phẩm Thành Công");
        location.href = "/addToCart.html";
        console.log(cartItems); // log ra huy nhé
        event.preventDefault();
      });
    });
  } catch (error) {
    console.log(error);
  }
});

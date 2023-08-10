import FirebaseConstants from "../../constants/FirebaseConstants";
import ProductService from "./ProductService";
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
$(document).ready(function () {
  const productService = new ProductService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );

  try {
    const placeholder = $("#placeholder");
    productService.findAllProduct().then((data) => {
      console.log(data);
      let list = "";
      for (const key in data) {
        const element = data[key];
        const { nameProd } = element;
        const { price } = element;
        const { img } = element;
        const { quantity } = element;
        const { description } = element;

        list += `
          <tr>
            <td>${key}</td>
            <td>${nameProd}</td>
            <td>${formatNumber(price)}</td>
            <td><img src="${img}" width="150"></td>
            <td>${quantity}</td>
            <td>${description}</td>

            <td>
              
              <a href='./editProduct.html?id=${key}'class="btn btn-primary"> 
              Edit <i class="fa fa-pencil" aria-hidden="true" style='color:green'></i></a> |
              
              <a href='./deleteProduct.html?id=${key}'class="btn btn-danger">
              Delete <i class="fa fa-trash" aria-hidden="true" style='color:red'></i></a> |                            
              
            </td>
          </tr>
          `;
      }
      placeholder.append(list);
      // function confirm() {
      //   confirm("Are you sure you want to delete ");
      // }
    });
  } catch (error) {
    console.log(error);
  }
});

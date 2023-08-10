import FirebaseConstants from "../../constants/FirebaseConstants";
import Categoty from "../../models/category";
import CategoryService from "./CategoryService";
$(document).ready(function () {
  const categoryService = new CategoryService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );
  // function isDel(name) {
  //   return confirm("bạn cóa chắc chắn xóa: " + name);
  // }
  try {
    const placeholder = $("#placeholder");
    categoryService.findAllCategories().then((data) => {
      console.log(data);
      let list = "";
      for (const key in data) {
        const element = data[key];
        const { nameCate } = element;
        list += `
          <tr>
            <td>${key}</td>
            <td>${nameCate}</td>
            <td>
              
              
              <a href='./editCategory.html?id=${key}'class="btn btn-primary"> 
              Edit <i class="fa fa-pencil" aria-hidden="true" style='color:green'></i></a> |
              
              <a href='./deleteCategory.html?id=${key}'class="btn btn-danger">
              Delete <i class="fa fa-trash" aria-hidden="true" style='color:red'></i></a> |
            </td>
          </tr>
          `;
      }
      placeholder.append(list);
    });
  } catch (error) {
    console.log(error);
  }
});

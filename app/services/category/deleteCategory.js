import FirebaseConstants from "../../constants/FirebaseConstants";
import UrlHelper from "../../helpers/UrlHelper";
import Categoty from "../../models/category";
import CategoryService from "./CategoryService";
$(document).ready(function () {
  const categoryService = new CategoryService(
    FirebaseConstants.RealTimeDB,
    "Token"
  );
  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParam(url, "id");

  categoryService.deleteCategory(id).then((data) => {
    location.href = "./listCategories.html";
    alert("xoa thanh cong");
  });
});

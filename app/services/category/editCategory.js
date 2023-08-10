import "regenerator-runtime/runtime";
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

  const categoryIdCtrl = $("#categoryId");
  const nameCateCtrl = $("#nameCate");

  categoryService.findById(id).then((data) => {
    const { nameCate } = data;
    categoryIdCtrl.val(id);
    nameCateCtrl.val(nameCate);
  });

  $("#update").on("click", () => {
    const cate = new Categoty(null, nameCateCtrl.val());
    if (nameCate == "") {
      alert("Không Được Để Trống");
    } else {
      try {
        categoryService
          .updateCategory(categoryIdCtrl.val(), cate)
          .then((data) => {
            location.href = "./listcategories.html";
            alert("sua thanh cong");
          });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

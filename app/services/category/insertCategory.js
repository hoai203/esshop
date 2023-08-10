import FirebaseConstants from "../../constants/FirebaseConstants";
import Categoty from "../../models/category";
import CategoryService from "./CategoryService";
$(document).ready(function () {
  $("#save").on("click", () => {
    const categoryIdCtrl = $("#categoryId");
    const nameCate = $("#nameCate").val();

    const cate = new Categoty(null, nameCate);

    const categoryService = new CategoryService(
      FirebaseConstants.RealTimeDB,
      "Token"
    );
    if (nameCate == "") {
      alert("Không Được Để Trống Name");
    } else {
      try {
        categoryService.insertCategory(cate).then((data) => {
          categoryIdCtrl.val(data);
          location.href = "listcategories.html";
        });
      } catch (error) {
        console.log(error);
      }
    }
    console.log(cate);

    console.log("save click");
  });
});

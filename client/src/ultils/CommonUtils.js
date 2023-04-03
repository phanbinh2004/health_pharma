import { handleAddToCart } from "../services/userServices";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
class CommonUtils {
  static toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  static handleDiscount = (price, index) => {
    switch (index) {
      case "1":
        price = price * 0.95;
        return { price, discount: "5%" };
      case "2":
        price = price * 0.9;
        return { price, discount: "10%" };
      case "3":
        price = price * 0.85;
        return { price, discount: "15%" };
      case "4":
        price = price * 0.8;
        return { price, discount: "20%" };
      case "5":
        price = price * 0.75;
        return { price, discount: "25%" };
      case "6":
        price = price * 0.7;
        return { price, discount: "30%" };
      case "7":
        price = price * 0.65;
        return { price, discount: "35%" };
      case "8":
        price = price * 0.6;
        return { price, discount: "40%" };
      case "9":
        price = price * 0.55;
        return { price, discount: "45%" };
      case "10":
        price = price * 0.5;
        return { price, discount: "50%" };
      case "11":
        price = price * 0.45;
        return { price, discount: "55%" };
      case "12":
        price = price * 0.4;
        return { price, discount: "60%" };
      case "13":
        price = price * 0.35;
        return { price, discount: "65%" };
      case "14":
        price = price * 0.3;
        return { price, discount: "70%" };
      case "15":
        price = price * 0.25;
        return { price, discount: "75%" };
      default:
        return { price, discount: "0%" };
    }
  };
  static handleAddCart = async (data) => {
    let res = await handleAddToCart(data);
    return res;
  };
  static fireEventToasty = (title, text, icon, confirmButtonText) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: confirmButtonText,
    });
  };
}

export default CommonUtils;

import db from "../models/index";
import bcrypt from "bcryptjs";
import Category from "../models/category";
const salt = bcrypt.genSaltSync(10);

const handleLoggin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isEmail = await checkUserEmail(email);
      let res = {};
      if (isEmail) {
        let user = await db.User.findOne({
          attributes: [
            "email",
            "roleId",
            "password",
            "fullName",
            "address",
            "gender",
            "phoneNumber",
            "id",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let checkPass = await bcrypt.compareSync(password, user.password);
          if (checkPass) {
            res.errCode = 0;
            res.errMessage = "Loggin successful!!!";
            delete user.password;
            res.user = user;
          } else {
            res.errCode = 2;
            res.errMessage = "Wrong Password!!!";
          }
        } else {
          res.errCode = 2;
          res.errMessage = "User isn't Found!!!";
        }
      } else {
        res.errCode = 3;
        res.errMessage =
          "Your email isn't exist in System!!!, Please try other email";
      }
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

// Product
let handleAddNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.keyProduct) {
        let checkProduct = await checkKeyProduct(data.keyProduct);
        if (checkProduct) {
          resolve({
            errCode: 1,
            errMessage: "Product is exist in system",
          });
        } else {
          await db.Product.create({
            title: data.name,
            price: data.price,
            discount: data.discount,
            description: data.description,
            categoryId: data.category,
            keyProduct: data.keyProduct,
            brand: data.brand,
            thumbnail: data.arrPath,
          });
          resolve({
            errCode: 0,
            errMessage: "Create Success !!!",
          });
        }
      } else {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let checkKeyProduct = (keyProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { keyProduct },
      });
      if (product) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let checkKeyProductCart = (keyProduct, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Cart.findOne({
        where: { keyProduct, userId },
      });
      if (product) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllProducts = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = "";
      if (productId === "ALL") {
        products = await db.Product.findAll({
          raw: true,
        });
      } else if (productId && productId !== "ALL") {
        products = await db.Product.findOne({
          where: { id: productId },
        });
      }
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};
let getDeleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { id: id },
      });
      if (!product) {
        resolve({
          errCode: 1,
          message: "Product is't exist",
        });
      }
      await db.Product.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        message: "Delete success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let handleAddCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        if (!data?.userId) {
          resolve({
            errCode: 1,
            errMessage: "Vui lòng đăng nhập để thêm sản phẩm",
          });
        }
        let checkIdProduct = await checkKeyProductCart(
          data.keyProduct,
          data.userId
        );
        if (checkIdProduct) {
          resolve({
            errCode: 2,
            errMessage: "Sản phẩm đã có trong giỏ hàng của bạn",
          });
        } else {
          await db.Cart.create({
            name: data.title,
            price: data.price,
            discount: data.discount,
            quantity: data.quantity,
            thumbnail: data.thumbnail,
            keyProduct: data.keyProduct,
            userId: data.userId,
          });
          resolve({
            errCode: 0,
            errMessage: "Bạn đã thêm sản phẩm vào giỏ hàng thành công !!!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllProductsCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = "";
      products = await db.Cart.findAll({
        raw: true,
        where: {
          userId,
        },
      });
      if (!products) {
        resolve({
          errCode: 1,
          errMessage: "Can't find product in cart",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "OK",
          products,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let handleDeleteProductCartUser = (id, keyProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Cart.findOne({
        where: { userId: id, keyProduct },
      });
      if (!product) {
        resolve({
          errCode: 1,
          errMessage: "Product is't exist",
        });
      }
      await db.Cart.destroy({
        where: { userId: id, keyProduct },
      });
      resolve({
        errCode: 0,
        errMessage: "Delete success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.Category.findAll();
      if (categories) {
        resolve({
          errCode: 0,
          errMessage: "OK",
          categories,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Error from server",
          categories: [],
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
export {
  getAllCategory,
  handleLoggin,
  getAllUsers,
  handleAddNewProduct,
  getAllProducts,
  getDeleteProduct,
  handleAddCart,
  getAllProductsCart,
  handleDeleteProductCartUser,
};

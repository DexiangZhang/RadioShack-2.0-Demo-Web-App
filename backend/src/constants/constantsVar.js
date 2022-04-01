const TABLE_NAMES = {
  usersDatabase: "user_accounts",
  productDatabase: "products",
  orderDatabase: "orders",
  orderProdDatabase: "order_products",
};

const ERROR_MSG = {
  defaultText:
    "Sorry, Something wrong with your program, please check your code!",
  duplicateText:
    "Username, email or phone number already existed! Please try again! ",
  duplicateProdText:
    "Product Name or description already existed! Please try again!",
  passwordText: "Password incorrect! Please check your password!",
  accountText: "Username is not match! Please check your username!",
  userErrorText: "User not found!",
  updateErrorText: "Updated Fail!",
};

const SUCCESS_MSG = {
  createText: "Thanks! Your account has been successfully created",
  loginSuccessText: "Success",
  uploadProdSucText: "Uploaded Successful",
  updateSucText: "Your information has been updated!",
  orderSucText: "Order Completed!",
};

module.exports = {
  TABLE_NAMES,
  ERROR_MSG,
  SUCCESS_MSG,
};

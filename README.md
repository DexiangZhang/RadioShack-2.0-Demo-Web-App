# E-Commerce-Full-Stack-Site

## User Story 
---

### Goal-1: As a user, I want to create a user account when clicking the `New User` button so that I can log into my account securely 

- [x] subtask: create a form group that allows the user to input the user's detail and a `Sign Up` button that allows the user to submit the data to the backend when finish
- [x] subtask: create a backend API that accepts the data in JSON format from the HTTP body and store new data in the user database
---

### Goal-2: As a user, I want to log into my account, so that I can purchase items on the website

- [x] subtask: create a form group that allows users to enter his/her account's username and password with the `Login` button to submit the data to the backend
- [x] subtasK: write a validation code that compares the user's input and actual data in the database when clicks `Login` button
- [x] subtask: create a UI that when the result of the comparison fails, pop up a red error message. If successful, switch the page to the actual item page
---

### Goal-3: As a user, I want to logout my account securely when clicking the `Logout` button, so that no one uses my account except myself

- [x] subtask： create a `Logout` button on the upper-right hand corner near the username 
- [x] subtask: write the code that allows the user to switch to the login page when the user presses the button
---

### Goal-4: As a user, I want to display all the products with their quality and the products that are been sold out, so that I know which item is popular and how many are left for the remaining product

- [x] subtask: create a dynamic webpage and re-render whenever the data in the database is modified and make each item in a card box with product description, quality, price, name, and `Add to Cart` button
- [x] subtask: create a API that fetch all the product detail from the database
- [x] subtask: write the code that not allow the item to be added after reach its max quanlity and disabled the `cart` button when status is `outofstock`
---

### Goal-5: As a user, I want to select the item so that I can pay it on the checkout page

- [x] subtask: create a button `Cart` that transfer the user to the checkout page when pressing
- [x] subtasK: write the code that displays the number of items added on the upper-right hand corner of the `Cart` button 
- [x] subtask: create an array of objects that stores all the items user is added, and transfer the data to the checkout page when clicking the `Cart` button
----

### Goal-6：As a user, I want to show all the items I add to the cart with the total price and quality for each individual item and total price overall including the taxes I need to pay when pressing the checkout button

- [x] subtask: create a checkout page that displays the selected item in a big rectangle box with its quality, price, the total price of the item
- [x] subtasK: write the code that updates each item's data in the database when the user click `Checkout` button
- [x] subtask: display a confirmation message after click `Confirm Order` button
----

### Goal-7: As a user, I want to view the history of my orders and the status of my order so that I can track my package

- [x] subtask: create a page to display all the orders including previous orders and each order status 
- [x] subtask: write the code that retrieves the order detail data from the user's database with same user's id 
- [x] subtask: add the button for each order to view specific products and their information that was in this order
- [x] subtask: create a column that has either one of  `Transit`, `Processed`, `Shipped`, `Delivered` for each order status, so user knows the status of the order
---

### Goal-8: As a user, I want to edit my profile information so that I can update my latest personal information

- [x] subtask: create the form group for similar like signUp page with `Update Profile` button
- [x] subtask: autofill the input field by getting the data from the database once the user click the `Profile` section and updates the database info when the user clicks `Update Profile` button
- [x] subtask: Pop up a green message for update successfully, otherwise a red error message for fail
---

### Goal-9: As a user, I want to change my account password, so that I can reset my password whenever I forget

- [x] subtask: create a `Forgot Password` button that allows the user navigates to a page with an input field to change the password after vertifies user's username
- [x] subtask: update the user's password in the database when the user click the `Submit` button with a green message and navigate to the login page after a few seconds
---

### Goal-10: As a user, I want to upload my product to the website for selling so that I can make money 

- [x] subtask: create a form group that allows users to type all the information of the new product 
- subtask: when the user clicks the `Submit` button, the data will transfer to the backend and the backend will update the data into the existing product table
- [x] subtask: create API to store new product data into the exisiting product table in database
- [x] subtask: create CRUD table that allow user to create, read/display, update, and delete the product
---

### Goal-11: As a user, I want to have some security for my personal information
- [x] subtask:  encrypt the user password when store to the database and decrypt the user password when vertify user password
- [x] subtask: when user logout, userID is gone and no one can view that user information except when authorized user login to his account again
- [ ] subtasl: create the JWT token for front-end and back-end to have a better security system when accessed user information
---






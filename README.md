# RadioShack 2.0 Demo Web App

## Tech Skills
---
- Angular, HTML5, CSS3, TypeScript, NodeJS, ExpressJS, JWT Token, Docker, PostgreSQL, Swagger

## User Story 
---

### Goal-1: As a user, I want to create a user account when clicking the `New User` button so that I can log into my account securely

- [x] subtask: create a form group that allows the user to input the user's detail and a `Sign Up` button that allows the user to submit the data to the backend when finish
- [x] subtask: create a backend API that accepts the data in JSON format from the HTTP body and stores new data in the user database
---

### Goal-2: As a user, I want to log into my account, so that I can purchase items on the website

- [x] subtask: create a form group that allows users to enter his/her account's username and password with the `Login` button to submit the data to the backend
- [x] subtasK: write a validation code that compares the user's input and actual data in the database when clicking the` Login` button
- [x] subtask: create a UI that when the result of the comparison fails, pops up a red error message. If successful, switch the page to the actual item page
---

### Goal-3: As a user, I want to logout my account securely when clicking the `Logout` button, so that no one uses my account except myself

- [x] subtask： create a `Logout` button on the upper-right hand corner near the username
- [x] subtask: write the code that allows the user to switch to the login page when the user presses the button
---

### Goal-4: As a user, I want to display all the products with their quality and the products that are been sold out, so that I know which item is popular and how many are left for the remaining product

- [x] subtask: create a dynamic webpage and re-render whenever the data in the database is modified and make each item in a card box with product description, quality, price, name, and `Add to Cart button
- [x] subtask: create an API that fetches all the product detail from the database
- [x] subtask: write the code that does not allow the item to be added after reaching its max quantity and disabled the `cart` button when the status is `outofstock`
---

### Goal-5: As a user, I want to select the item so that I can pay it on the checkout page

- [x] subtask: create a button `Cart` that transfers the user to the checkout page when pressing
- [x] subtasK: write the code that displays the number of items added on the upper-right hand corner of the `Cart` button
- [x] subtask: create an array of objects that stores all the items the user is added, and transfer the data to the checkout page when clicking the `Cart` button
----

### Goal-6：As a user, I want to show all the items I add to the cart with the total price and quality for each individual item and total price overall including the taxes I need to pay when pressing the checkout button

- [x] subtask: create a checkout page that displays the selected item in a big rectangle box with its quality, price, the total price of the item
- [x] subtasK: write the code that updates each item's data in the database when the user clicks the `Checkout` button
- [x] subtask: display a confirmation message after click the `Confirm Order` button
----

### Goal-7: As a user, I want to view the history of my orders and the status of my order so that I can track my package

- [x] subtask: create a page to display all the orders including previous orders and each order's status
- [x] subtask: write the code that retrieves the order detail data from the user's database with the same user's id
- [x] subtask: add the button for each order to view specific products and their information that was in this order
- [x] subtask: create a column that has either one of  `Transit`, `Processed`, `Shipped`, `Delivered` for each order status, so the user knows the status of the order
---

### Goal-8: As a user, I want to edit my profile information so that I can update my latest personal information

- [x] subtask: create the form group for a similar signUp page with the `Update Profile` button
- [x] subtask: autofill the input field by getting the data from the database once the user clicks the `Profile` section and updates the database info when the user clicks the `Update Profile` button
- [x] subtask: Pop up a green message for update successfully, otherwise a red error message for fail
---

### Goal-9: As a user, I want to change my account password, so that I can reset my password whenever I forget

- [x] subtask: create a `Forgot Password` button that allows the user navigates to a page with an input field to change the password after verifies user's username
- [x] subtask: update the user's password in the database when the user clicks the `Submit` button with a green message and navigates to the login page after a few seconds
---

### Goal-10: As a user, I want to upload my product to the website for selling so that I can make money

- [x] subtask: create a form group that allows users to type all the information about the new product
- subtask: when the user clicks the `Submit` button, the data will transfer to the backend and the backend will update the data into the existing product table
- [x] subtask: create API to store new product data into the existing product table in the database
- [x] subtask: create a CRUD table that allows user to create, read/display, update, and delete the product
---

### Goal-11: As a user, I want to have some security for my personal information
- [x] subtask:  encrypt the user password when stored in the database and decrypt the user password when verifying user password
- [x] subtask: when the user logout, userID is gone and no one can view that user information except when the authorized user login to his account again
- [x] subtask: create the JWT token for the front-end and back-end to have a better security system when accessing user information
- [x] subtasK: refresh the JWT token when access token is expired, and auto logout the user when the refresh token and access token both expired
---



---
# How to run the program

1) Install all the dependencies from the package.json file
2) have docker platform downloaded and run the `docker-compose up` command in the backend folder to setup a PostgreSQL database
3) run the `app.js` and Angular App
4) Open the broswer and type `localhost:4200` to view the app



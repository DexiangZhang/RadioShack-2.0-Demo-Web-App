# E-Commerce-Full-Stack-Site

## User Story 
---

### Goal-1: As a user, I want to create an user account when click `New User` button so that I can log into my account securely 

- subtask: create a form group that allow user to input user's detail and a `New User` button that allow user to submit the data to backend when finish
- subtask: create a backend API that accept the data in JSON format from HTTP body and store new data in the database in exisitng table
---

### Goal-2: As a user, I want to log into my account, so that I can purchase items in the website

- subtask: create a form group that allow user to enter his/her account's username and password with `Login` button to submit the data to backend
- subtasK: create a validation code that compare user's input and actual data in the database
- subtask: create a UI that when the result of comparison is fail, pop up a red message with error message. If success, switch to the page to the actual content page
---

### Goal-3: As a user, I want to logout my account securely when clicking the `Logout` button, so that no one use my account except myself

- subtask： create a `Logout` button on the upper-right hand corner that near username 
- substask: write the code that allow user to `switch` to the login page when user press the button
---

### Goal-4: As a user, I want to display all the products with their quality and the products that are been sold out, so that I know which item is popular and how many are left for the remaining product

- subtask: create a dynamic webpage and re-render whenever the data in database is mondify and display each item in a card box with product description, quality, price, name and `Add to Cart` button
- subtask: write the code that change the item's `Add to Cart` to `Sold Out` whenever the quality is reach 0
---

### Goal-5: As a user, I want to select the item so that I can pay it in checkout page

- subtask: create a button `Cart` that transfer user to checkout page when press
- subtasK: write the code that display number of items added on upper-right hand corner of the `Cart` button 
- subtask: create an array of object that stores all the item user is added, and transfer the data to the checkout page when click `Cart` button
----

### Goal-6：As a user, I want to show all the items I add to the cart with the total price and quality for each individual item and total price overall including the taxes I need to pay when pressing the checkout button

- subtask: create a checkout page that display the selected item in a big rectangle box with its quality, price of single one, total price of same item
- subtask: crate another box that display the total cost before the taxes, taxes, and total cost (after add taxes) and a button `Checkout` that allow user to order items
- subtasK: write the code that modify each item's data in database when user click `Checkout`
- subtask: create a `Thank You` page when the order is sucessful
----

### Goal-7: As a user, I want to view the history of my orders and the status of my order so that I can track my package

- subtask: creat a page for display all the order this user ordered and each order status
- subtask: write the code that retrieving the order detail data from user's database
---

### Goal-8: As a user, I want to edit my profile information so that I can update my latest personal information

- subtasK: craete the form group for similar like signUp page
- subtask: autofill the input field by get the data from database when user click `Edit Personal Info` button
---

### Goal-9: As a user, I want to change my account password, so that I can reset my password whenever I forget

- subtask: create a `Change Password` button that allow user navigate to a page with input field to change password
- subtask: update the user's password in the database when user click `Submit` button with green message and navigate to the login page after few seconds
---

### Goal-10: As a seller, I want to upload my product to the website for selling so that I can make money 

- subtask: create a form group that allow user to type all the information of the product 
- subtask: when user click `Submit` button, the data will transfer to the backend and backend will update the data into existing product table
---

### Goal-11: As a seller, I want to update the status of user's order so that user can track their product

- subtask: create a page that allow seller to view all his order that is been purchased by user
- subtask: create several selection `In Transit`, `Processed`, `On the WAY`, `Delivered` that allow seller to modified those item's order status
---







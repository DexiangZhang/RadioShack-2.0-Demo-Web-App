# E-Commerce-Full-Stack-Site

## User Story 
---

### Goal-1: As a user, I want to create a user account when clicking the `New User` button so that I can log into my account securely 

- subtask: create a form group that allows the user to input the user's detail and a `New User` button that allows the user to submit the data to the backend when finish
- subtask: create a backend API that accepts the data in JSON format from the HTTP body and store new data in the user database
---

### Goal-2: As a user, I want to log into my account, so that I can purchase items on the website

- subtask: create a form group that allows users to enter his/her account's username and password with the `Login` button to submit the data to the backend
- subtasK: write a validation code that compares the user's input and actual data in the database when clicks `Login` button
- subtask: create a UI that when the result of the comparison fails, pop up a red error message. If successful, switch the page to the actual item page
---

### Goal-3: As a user, I want to logout my account securely when clicking the `Logout` button, so that no one uses my account except myself

- subtask： create a `Logout` button on the upper-right hand corner near the username 
- subtask: write the code that allows the user to switch to the login page when the user presses the button
---

### Goal-4: As a user, I want to display all the products with their quality and the products that are been sold out, so that I know which item is popular and how many are left for the remaining product

- subtask: create a dynamic webpage and re-render whenever the data in the database is modified and make each item in a card box with product description, quality, price, name, and `Add to Cart` button
- subtask: write the code that change the item's `Add to Cart` to `Sold Out` whenever item's quality is reach 0
---

### Goal-5: As a user, I want to select the item so that I can pay it on the checkout page

- subtask: create a button `Cart` that transfer the user to the checkout page when pressing
- subtasK: write the code that displays the number of items added on the upper-right hand corner of the `Cart` button 
- subtask: create an array of objects that stores all the items user is added, and transfer the data to the checkout page when clicking the `Cart` button
----

### Goal-6：As a user, I want to show all the items I add to the cart with the total price and quality for each individual item and total price overall including the taxes I need to pay when pressing the checkout button

- subtask: create a checkout page that displays the selected item in a big rectangle box with its quality, price, the total price of the same item
- subtask: crate another box that displays the total cost before the taxes, taxes, and total cost (after adding taxes) and a button `Checkout` that allows the user to order items
- subtasK: write the code that updates each item's data in the database when the user click `Checkout` button
- subtask: navigates to a `Thank You` page after click `Checkou` button
----

### Goal-7: As a user, I want to view the history of my orders and the status of my order so that I can track my package

- subtask: create a page to display all the orders including previous orders and each order status 
- subtask: write the code that retrieves the order detail data from the user's database with same user's id 
---

### Goal-8: As a user, I want to edit my profile information so that I can update my latest personal information

- subtask: create the form group for similar like signUp page with `Save` button
- subtask: autofill the input field by getting the data from the database once the user click the `Edit Personal Info` section and updates the database info when the user clicks `Save` button
- subtask: Pop up a green message for update successfully, otherwise a red error message for fail
---

### Goal-9: As a user, I want to change my account password, so that I can reset my password whenever I forget

- subtask: create a `Change Password` button that allows the user navigates to a page with an input field to change the password after vertifies user's username
- subtask: update the user's password in the database when the user click the `Submit` button with a green message and navigate to the login page after a few seconds
---

### Goal-10: As a seller, I want to upload my product to the website for selling so that I can make money 

- subtask: create a form group that allows users to type all the information of the product 
- subtask: when the user clicks the `Submit` button, the data will transfer to the backend and the backend will update the data into the existing product table
---

### Goal-11: As a seller, I want to update the status of user's orders so that user can track their product

- subtask: create a page that allows the seller to view all his orders that is been purchased by the user
- subtask: create a few selection `In Transit`, `Processed`, `On the WAY`, `Delivered` that allows the seller to modify those item's order status
---






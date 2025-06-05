# 📦 Inventory Manager — Your Friendly Stock Buddy!

Welcome to **Inventory Manager**, the happiest little backend API designed to help you keep track of your items with ease and joy! Whether you're managing your home office supplies, small business stock, or that quirky collection of treasures, Inventory Manager makes adding, editing, and organizing your items as smooth as a tail wag.

---

## 👩‍💼 Meet Your Inventory Manager!

Say hi to your trusty Inventory Manager account — your new best friend in stock-keeping!

- **Email:** InventoryManager@example.com  
- **Password:** 1234 

Log in with these details to explore all the features and get your inventory rocking!

---

## 🎉 Features That Will Make You Smile

- **User Accounts:** Sign up, log in, and keep your inventory safe and sound.
- **Add Items:** Easily add new items with details to your inventory.
- **Browse & Search:** Quickly find what you need with a neat list of your items.
- **Edit & Delete:** Made a mistake? No worries update or remove items anytime.
- **Secure Authentication:** Your data is protected with secure login and JWT tokens.

---

## 🛠️ Technologies Behind the Magic

- **Node.js:** The powerful JavaScript runtime that keeps things speedy.
- **Express:** Our lightweight web framework for smooth server operations.
- **Knex.js:** The handy SQL query builder for talking to PostgreSQL.
- **PostgreSQL:** The robust database where all your precious inventory lives.
- **JSON Web Tokens:** Keeping your sessions safe and secure.

---

## 🚀 How to Get Started in 5 Easy Steps


Set up your database
 CREATE DATABASE inventory_db;

Create a .env file in the root folder and add your database credentials:
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_pg_username
DB_PASSWORD=your_pg_password
DB_DATABASE=inventory_db
JWT_SECRET=yourSuperSecretKey

Run migrations to build your database tables
npx knex migrate:latest

Start the server and let the fun begin!
npm start

Your API will be running at: http://localhost:8080 !!

If frontend host port 5173 is not working try 5174. Check the server.js to verify that it is the same port. 


### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/inventory-manager.git
    cd inventory-manager
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install
    ```

3.  **Set up your PostgreSQL database:**

      * Create a new PostgreSQL database (e.g., `Inventorydb`).
        ```sql
        CREATE DATABASE inventorydb;
        ```
      * Create a `.env` file in the root of the `Inventory-api` directory.
      * Add your database connection string to `.env`. Replace placeholders with your actual database credentials:
        ```env
        # .env
        DB_CLIENT=pg
        DB_HOST=localhost
        DB_PORT=5432
        DB_USER=your_pg_username
        DB_PASSWORD=your_pg_password
        DB_DATABASE=inventorydb
        ```
        *(If you are using Railway, Render, ElephantSQL, etc., paste your provided connection string here.)*

4.  **Run database migrations:**
    This will create the `users` and `items` tables in your database.

    ```bash
    npx knex migrate:latest
    ```

### Running the API

Start the Express server:

```bash
npm start
```

The API will now be running on `http://localhost:8080`.

-----

API EndPoints You'll Love
## POST
   /signup: Create a new user account
   /login: Log in and get your access token
   /items: Add a new item

## GET
    /items: Get all your inventory items
    /items/:id : View details for a specific item

## PUT
    /items/:id : Update an item

## DELETE 
    /items/:id : emove an item from inventory

-----
🙋‍♂️ Need Help?

If you have any questions, just drop a message to your friendly Inventory Manager:

📧 InventoryManager@example.com

🤝 Contributions & Cheer

Feel free to fork this project, open issues, or submit pull requests. Let’s make inventory management fun and easy together!


✨ Thanks for stopping by! Happy organizing! 🎉


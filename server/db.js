const pg = require('pg');
const uuid = require('uuid');
const bcrypt = require('bcrypt');


//set onnection to pg db
const client = new pg.Client("postgres://kat:Kat1234@localhost:5432/acme_store_db");

const createTables = async () => {
    const SQL = `
        DROP TABLE IF EXISTS favorites;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;

        CREATE TABLE users(
            id UUID PRIMARY KEY,
            username VARCHAR(50) UNIQUE,
            password VARCHAR(255)
        );
        CREATE TABLE products(
            id UUID PRIMARY KEY,
            name VARCHAR(50) UNIQUE
        );
        CREATE TABLE favorites(
            id UUID PRIMARY KEY,
            product_id UUID REFERENCES products(id) NOT NULL,
            user_id UUID REFERENCES users(id) NOT NULL,
            CONSTRAINT unique_product_user UNIQUE(product_id, user_id)
        )
    `;
    await client.query(SQL);
}
//A method that creates a product in the database and then returns the created record.
const createProduct = async (name) => {
    const SQL = `
        INSERT INTO products(id, name)
        VALUES($1,$2)
        RETURNING *
    `
    const result = await client.query(SQL, [uuid.v4(), name]);
    return result.rows[0];
}

//A method that creates a user in the database and then returns the created record. The password of the user should be hashed by using Bcrypt.
const createUser = async (username, password) => {
    const SQL = `
        INSERT INTO users(id, username, password)
        VALUES ($1, $2, $3)
        RETURNING *
    `
    const hashedPassword = await bcrypt.hash(password, 5);
    const result = await client.query(SQL, [uuid.v4(), username,hashedPassword])
    return result.rows[0];
}

//A method that creates a favorite in the database and then returns the created record
const createFavorite = async (product_id, user_id) => {
    const SQL = `
        INSERT INTO favorites(id, product_id, user_id)
        VALUES($1,$2,$3)
        RETURNING *
    `
    const result = await client.query(SQL, [uuid.v4(), product_id, user_id]);
    return result.rows[0];
}

//A method that returns an array of users in the database.
const fetchUsers = async () => {
    const SQL = `
        SELECT * FROM users
    `;
    const result = await client.query(SQL);
    return result.rows;
}

//A method that returns an array of favorites for a user
const fetchFavorites = async (user_id) => {
    const SQL = `
        SELECT * FROM favorites
        WHERE user_id = $1
    `;
    const result = await client.query(SQL, [user_id]);
    return result.rows;
}

//A method that returns an array of products in the database.
const fetchProducts = async () => {
    const SQL = `
        SELECT * FROM products
    `;
    const result = await client.query(SQL);
    return result.rows;
}

// A method that deletes a favorite in the database.
const destroyFavorite = async () => {
    
}

const init = async () => {
    await client.connect();
    await createTables();
    const user1 = await createUser("smilingkat", "password");
    const user2 = await createUser("frowningFrank", "password");
    const product1 = await createProduct("Summer Friday's Lip Balm");
    const product2 = await createProduct("Lanolips Donut Glaze Lip Ointment");
    await createFavorite(product1.id, user2.id);
    await createFavorite(product2.id, user1.id);

}

module.exports = {
    init, 
    createFavorite,
    createProduct,
    createUser,
    fetchUsers,
    fetchProducts,
    fetchFavorites,
    destroyFavorite
}
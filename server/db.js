const pg = require('pg');
const uuid = require('uuid');
const bcrypt = require('bcrypt')


//set onnection to pg db
const client = new pg.Client("postgres://kat:Kat1234@localhost:5432/acme_store_db")

const createTables = async () => {
    const SQL = `
        DROP TABLE IF EXISTS favorites;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;

        CREATE TABLE users(
            id UUID PRIMARY KEY,
            username VARCHAR(50) UNIQUE,
            password VARCHAR(50)
        )
        CREATE TABLE products(
            id UUID PRIMARY KEY,
            name VARCHAR(50) UNIQUE,
        )
        CREATE TABLE favorites(
            id UUID PRIMARY KEY,
            product_id UUID REFERENCES products(id) NOT NULL,
            user_id UUID REFERENCES users(id) NOT NULL,
            CONSTRAINT unique_product_user UNIQUE(product_id, user_id)
        )
    `
    await client.query(SQL);
}
const createProduct = async () => {
    
}
const createUser = async () => {
    
}
const createFavorite = async () => {
    
}
const fetchUsers = async () => {
    
}
const fetchFavorites = async () => {
    
}
const fetchProducts = async () => {
    
}
const destroyFavorite = async () => {
    
}

const init = async (params) => {
    await client.connect();
    createTables()
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
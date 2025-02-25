
const db = require('./db');
const express = require('express');
const app = express();
app.use(express.json());

//Returns an array of users.
app.get('/api/users', async(req,res,next)=>{
    try {
        const result = await db.fetchUsers();
        res.send(result);
    } catch (error) {
        
    }
})

//Returns an array of products.
app.get('/api/products', async(req,res,next)=>{
    try {
        const result = await db.fetchProducts();
        res.send(result);
    } catch (error) {
        
    }
})

//Returns an array of favorites for a user.
app.get('/api/users/:id/favorites', async(req,res,next)=>{
    const {id} = req.params
    try {
        const result = await db.fetchFavorites(id);
        res.send(result);
    } catch (error) {
        
    }
})

//Has a product_id as the payload, and returns the created favorite with a status code of 201.
app.post('/api/users/:id/favorites', async (req,res,next) => {
    const {id} = req.params;
    const {product_id} = req.body;
    console.log(`Received user_id: ${id}, product_id: ${product_id}`); //  Log IDs

    try {
        const result = await db.createFavorite( product_id, id)

        res.status(201).send(result);

    } catch (error) {
        next(error);
    }

})
//Deletes a favorite for a user, and returns nothing with a status code of 204.
app.delete('/api/users/:userId/favorites/:id', async (req,res,next) => {
    const { id, userId } = req.params;
    try {
        const result = await db.destroyFavorite(id, userId);
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
    
})





const init = async () => {
    app.listen(3000, ()=> console.log('listening on port 3000'))
    db.init();
}
init();
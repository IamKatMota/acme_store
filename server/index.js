
const db = require('./db');
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/users', async(req,res,next)=>{
    try {
        const result = await db.fetchUsers();
        res.send(result);
    } catch (error) {
        
    }
})
app.get('/api/products', async(req,res,next)=>{
    try {
        const result = await db.fetchProducts();
        res.send(result);
    } catch (error) {
        
    }
})
app.get('/api/users/:id/favorites', async(req,res,next)=>{
    const {id} = req.params
    try {
        const result = await db.fetchFavorites(id);
        res.send(result);
    } catch (error) {
        
    }
})
const init = async () => {
    app.listen(3000, ()=> console.log('listening on port 3000'))
    db.init();
}
init();
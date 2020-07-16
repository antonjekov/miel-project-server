const controlers = require('../controllers');
const {auth,authorized} = require('../utils');

module.exports = (app) => {

    app.post('/register', controlers.user.post.register);
    app.post('/login', controlers.user.post.login);
    app.post('/logout', controlers.user.post.logout);

    app.post('/add-product',auth(),authorized(), controlers.product.post.add);
    app.post('/add-subcategory',auth(), authorized(), controlers.subcategory.post.add);
    app.get('/products-delete/:id',auth(),authorized(), controlers.product.get.delete);

    app.get('/categories', controlers.category.get.all);
    app.get('/subcategories/:category', controlers.subcategory.get.all);        
    app.get('/products/:category/:subcategory', controlers.product.get.allWithCatSubcat)
    app.get('/products', controlers.product.get.all);
    
    app.post('/shoppingCard/add',auth(), controlers.shoppingCart.post.addToShoppingCard);    
    app.post('/shoppingCart/checkout',auth(), controlers.shoppingCart.post.checkoutShoppingCard);
    app.post('/shoppingCart/deleteAll',auth(), controlers.shoppingCart.post.deleteAllFromShoppingCart);
    app.post('/shoppingCart/deleteOne',auth(), controlers.shoppingCart.post.deleteOneFromShoppingCart);
    app.post('/shoppingCard/get',auth(), controlers.shoppingCart.get.all);
    app.post('/user/getInfoForUser',auth(), controlers.user.get.getInfoForUser);
    // app.get('*', controlers.errors.get.notFound);
};
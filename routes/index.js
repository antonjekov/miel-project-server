const controlers = require('../controllers');
const {auth,authorized} = require('../utils');

module.exports = (app) => {

    app.post('/register', controlers.user.post.register);
    app.post('/login', controlers.user.post.login);
    app.post('/logout', controlers.user.post.logout);
    app.get('/categories', controlers.category.get.all);
    app.get('/subcategories/:category', controlers.subcategory.get.all);        
    app.get('/products', controlers.product.get.all);
    app.post('/subcategory/products', controlers.subcategory.get.allProductsInSubcat)
    
    app.post('/user/getInfoForUser',auth(), controlers.user.get.getInfoForUser);
    
    app.post('/add-product',auth(),authorized('admin'), controlers.product.post.add);
    app.post('/add-subcategory',auth(), authorized('admin'), controlers.subcategory.post.add);
    app.get('/products-delete/:id',auth(),authorized('admin'), controlers.product.get.delete);    
    
    app.post('/shoppingCard/add',auth(),authorized('client'), controlers.shoppingCart.post.addToShoppingCard);    
    app.post('/shoppingCart/checkout',auth(),authorized('client'), controlers.shoppingCart.post.checkoutShoppingCard);
    app.post('/shoppingCart/deleteAll',auth(),authorized('client'), controlers.shoppingCart.post.deleteAllFromShoppingCart);
    app.post('/shoppingCart/deleteOne',auth(),authorized('client'), controlers.shoppingCart.post.deleteOneFromShoppingCart);
    app.post('/shoppingCard/get',auth(),authorized('client'), controlers.shoppingCart.get.all);

    app.get('*', controlers.errors.get.notFound);
};
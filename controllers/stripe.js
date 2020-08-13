const STRIPE_SK = process.env.STRIPE_SK;

const stripe = require('stripe')(STRIPE_SK);

module.exports = {
    post: {
        openSession: async (req, res) => {
            const products = req.body
            const items = products.map(x => {
                const price = x.price - x.price * x.discount / 100
                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: x.name,
                            images: [x.imageUrl]
                        },
                        unit_amount: price * 100,
                    },
                    quantity: x.quantity,
                }
            })

            const session = await stripe.checkout.sessions.create({
                billing_address_collection: 'required',
                shipping_address_collection: {
                    allowed_countries: ['BG', 'US']
                },
                payment_method_types: ['card'],
                line_items: items,
                mode: 'payment',
                success_url: 'http://localhost:3000/shoppingCard/success/{CHECKOUT_SESSION_ID}',
                cancel_url: 'http://localhost:3000/shoppingCard/cancel',
                locale: 'en'
            });
            res.json({
                session_id: session.id
            });
        },
        
    }
}
//production environment 
//use the variables from heroku
//exports to the index.js


module.exports = {
	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY
}


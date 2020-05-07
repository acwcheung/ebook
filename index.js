const express = require('express');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const exphbs = require('express-handlebars');

const app = express();
app.use(express.json());

//set static folder
app.use(express.static('public')); 

//handlebars middleware
app.set('view engine', 'handlebars');
//main in layout folder is the placeholder
app.engine('handlebars', exphbs({defaultlayout: 'main'}));

//index route
app.get('/', (req, res) => {	
	res.render('index', {
		stripePublishableKey: keys.stripePublishableKey
	});
})

app.get('/success', (req, res) => {
	res.render('success');
})

//server side to create a session for a product item
//input: line items inc details of the product
//output: session ID
//amount is in cents, not dollar, divided by 100
app.post('/charge', (req, res) => {		
	const { title, amount, img } = req.body;
	stripe.checkout.sessions.create({
	  payment_method_types: ['card'],
	  line_items: [{
	    name: title,
	    description: 'Ebook',
	    images: [img],
	    amount: amount,
	    currency: 'usd',
	    quantity: 1,
	  }],
	  success_url: 'https://enigmatic-castle-40813.herokuapp.com/success',
	  cancel_url: 'https://enigmatic-castle-40813.herokuapp.com/',
	})
	.then(id => res.json(id))
	.catch(err => res.json(err))
})




const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`server started on port ${port}`);
})
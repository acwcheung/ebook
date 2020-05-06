const express = require('express');
const stripe = require('stripe')('sk_test_vecgwM2mcc3IN71n35ydIhRz00bVEq5y1G');
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
	res.render('index');
})

app.get('/success', (req, res) => {
	res.render('success');
})
//not used for client only integration
//charge route for the use of client end
//input the details of the item (to stripe server) and return session ID
//amount is in cents, not dollar, divided by 100
//how to access the image folder?
app.post('/charge', (req, res) => {
	stripe.checkout.sessions.create({
	  payment_method_types: ['card'],
	  line_items: [{
	    name: 'Radical Uncertainty',
	    description: 'Ebook',
	    images: ['https://m.media-amazon.com/images/I/519KHL1I2iL.jpg'],
	    amount: 1144,
	    currency: 'usd',
	    quantity: 1,
	  }],
	  success_url: 'http://localhost:5000/success',
	  cancel_url: 'http://localhost:5000/',
	})
	.then(id => res.json(id))
	.catch(err => res.json(err))
})




const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`server started on port ${port}`);
})
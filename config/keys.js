//test the node environment
//import the right api

if(process.env.NODE_ENV === 'production') {
	module.exports = require('./keys_prod');
} else {
	module.exports = require('./keys_dev');
}
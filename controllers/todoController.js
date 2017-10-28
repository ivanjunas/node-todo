
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// connect to the database
mongoose.connect('mongodb://test:test22@ds139585.mlab.com:39585/junotodo');
// create a schema
var todoSchema = new mongoose.Schema({
	item: String
});
var Todo = mongoose.model('Todo', todoSchema);


var urlEndcodedParser = bodyParser.urlencoded({extended: false});
            
module.exports = function(app) {

	app.get('/todo', function(req, res) {
		console.log('GET /todo');
		// get data from MongoDB
		Todo.find({}, function(err, data) {
			if (err) throw err;
			res.render('todo', {todos: data});
		});
		
	});

	// add todo into the list 
	app.post('/todo', urlEndcodedParser, function(req, res) {
		console.log('POST /todo');
		// get data from the view and add it to Mongo DB
		var newTodo = Todo(req.body).save(function(err, data) {
			if (err) throw err;
			res.json(data);
		});
	});

	// delete item
	app.delete('/todo/:item', function(req, res) {
		console.log('DELETE /todo');
		// delete the requested item from Mongo DB
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
			if (err) throw err;
			res.json(data);
		});
	});
};
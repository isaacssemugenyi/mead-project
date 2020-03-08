let express = require('express');
let app = express();

//set up handlebars view engine
let handlebars = require('express-handlebars')
		.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
	res.render('home');
})

app.get('/about', (req, res)=>{
	let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: randomFortune });
})

//custom 404 page
app.use((req, res) => {
	res.status(404).render('404')
});

//custom 500 page
app.use((err, req, res, next)=>{
	console.error(err.stack);
	res.status(500).render('500')
});

app.listen(app.get('port'), ()=>{
	console.log('Express started on locahost');
})

let fortunes = [
	"Conquer your fears or they will conquer you",
	"Rivers need springs",
	"Do not fear what you don't know",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple."
]
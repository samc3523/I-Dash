const express = require('express');
const app = express();
const port = 3000;
const { readMail } = require('./readEmail');
//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars.engine({
layoutsDir: __dirname + '/views/layouts',
extname: 'hbs',
defaultLayout: 'index.hbs',
}));
app.use(express.static('public'))
app.get('/', (req, res) => {
//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
res.render('main');
}); 


app.get('/api/messages',messages);
//config details for email library 


async function messages(req, res){
    readMail().then(msgs => {  
        console.log(msgs);
        res.json(msgs);
    })
    
};
console.log(process.env.USERNAME)
console.log(process.env.PASSWORD);
app.listen(port, () => console.log(`App listening to port ${port}`));
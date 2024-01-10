const express = require('express');
const app = express();
const port = 3000;
const { readMail } = require('./api/readEmail');
const { getTransit } = require('./api/getTransit');
const {getWeather } = require('./api/getWeather');
//Loads the handlebars module
const handlebars = require('express-handlebars');
const { spawn } = require('child_process');
// Launch external script
const externalScriptProcess = spawn('node', ['api/writeEmail.js']);

externalScriptProcess.stdout.on('data', data => {
  
    (`External script stdout: ${data}`);
});

externalScriptProcess.stderr.on('data', data => {
  console.error(`External script stderr: ${data}`);
});

externalScriptProcess.on('close', code => {
  console.log(`External script process exited with code ${code}`);
});
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



// messages proxy server 
app.get('/api/messages',messages);


//config details for email library 
const addressbook = [
    {'name':'Sam','number':'5082693523'},
    {'name':'Liam','number':'6175432323'},
    {'name':'John','number':'2159906534'},
    {'name':'Santi','number':'6463841729'},
]

function fna (msgs){
    let cleaned = [] 
    let i = 0
    while (i < msgs.length) {
        let j = 0;
        while (j < addressbook.length) {
            if (msgs[i].from.includes(addressbook[j].number)){
                //console.log(addressbook[j])
                msgs[i].from = addressbook[j].name
                cleaned.push(msgs[i])
            };
        j++;
        }
    i++;
    }
return cleaned;
};

async function messages(req, res){
    readMail().then(msgs => {  
        //console.log(msgs);
        filtered = fna(msgs)
        //console.log(filtered)
        res.json(filtered);
    })
    
};

// transit proxy server 
app.get('/api/transit/:stop',transit);

async function transit(req, res){
    getTransit(req.params['stop']).then(transit => {  
        //console.log(transit);
        res.json(transit);
    })
};

// weather proxy server 

app.get('/api/weather',weather);
async function weather(req, res){
    getWeather().then(weather => {  
        //console.log(weather);
        res.json(weather);
    })
};

app.listen(port, () => console.log(`App listening to port ${port}`));

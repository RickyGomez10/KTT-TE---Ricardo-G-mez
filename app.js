
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3030; //guardar en variable de entorno
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/icons', express.static(__dirname + '/node_modules/bootstrap-icons/font')); // Bootstrap Icons


var countryRouter = require('./country/routes');

app.use('/region', countryRouter);



app.get('/', (req, res, next) => {
    res.render('index', {});
})
app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
      
    }else{ 
        console.log("Error occurred, server can't start", error);
    }
}
    
);

//fetch('https://restcountries.com/v3.1/all').then( (response) => {return response.json}).then( finalJson => { console.log(finalJson) });
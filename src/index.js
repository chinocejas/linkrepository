const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); //plantillas
const path = require('path');
//init app
const app = express();

//setting 
app.set('port', process.env.PORT || 4001 );
app.set('views', path.join(__dirname,'views')); //Node knows the views folder
//For the themplate handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: 'hbs',
    helpers: require('./lib/handlebars.js')
}));

app.set('view engine','hbs');//para usarlo
//Middlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false})); //para poder aceptar desde el formulario los datos que envie el usuario, solo acepta strings
app.use(express.json()); //send and recive json

//Global variables
app.use((req,res,next)=> {
    next();
});

//Routes
app.use(require('./routes/'));
app.use(require('./routes/authentications'));
app.use('/links',require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname,'public')));

//Starting server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'))
});


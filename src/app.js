import express from 'express'
import morgan from 'morgan'
import path from 'path'
import {fileURLToPath} from 'url';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
dotenv.config()

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


// Imports
import appRoutes from './routes/app.routes.js'

import cookieParser from 'cookie-parser';

const app = express()

// Settings
app.set('port', process.env.PORT || 3000)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())
app.use(cookieParser())

// Routes
app.use('/',appRoutes)


// Static files
app.use(express.static(path.join(__dirname,'public')))



app.listen(app.get('port'),()=>{
  console.log('\x1b[33m%s\x1b[0m',`http://localhost:${app.get('port')}`);
})

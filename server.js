const express = require('express')
const ExpressEJSLayouts = require('express-ejs-layouts')
const expressFileUpload = require('express-fileupload')
const morgan = require('morgan')
const PORT = 3000

const app = express()

app.use(expressFileUpload())
app.use(morgan('dev'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))
app.use('/img', express.static(__dirname + 'public/img'))

app.use(ExpressEJSLayouts)
app.set('view engine', 'ejs')

app.use('/', require('./routes/home'))
app.use('/', require('./routes/allatRendeles'))
app.use('/', require('./routes/fajtak'))
app.use('/', require('./routes/rendelesek'))
app.use('/', require('./routes/feltoltes'))
app.use('/', require('./routes/admin'))

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
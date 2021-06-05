const express = require('express')
const morgan = require('morgan');
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '..' ,'public')))

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
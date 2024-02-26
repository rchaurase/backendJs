require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

const githubData=[
  {
    "fruit": "Apple",
    "size": "Large",
    "color": "Red"
},
  {
    "fruit": "Apple",
    "size": "Large",
    "color": "Red"
},
  {
    "fruit": "Apple",
    "size": "Large",
    "color": "Red"
}
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/twitter',(req,res)=>{
  res.send('rahul jedi')
})
app.get('/login',(req,res)=>{
  res.send('<h1>Please login in this website</h1>')
})
app.get('/github',(req,res)=>{
  res.json(githubData)
})

app.get('/youtube',(req,res)=>{
  res.send('<h2>finally it will work</h2>')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})
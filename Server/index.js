const express = require('express')
const app = express()

const port = 3001

app.get("/",(req,res) => {
    res.status(200).json({message: "Home Page"} )
})

const logoutRouter = require('./routes/logout')
//const loginRouter = require('./routes/login')
//const ApiRouter = require('./routes/Api')
//const registerRouter = require('./routes/reqister')

//app.use('/logout', logoutRouter)
//app.use('/logout', loginRouter)
//app.use('/logout', ApiRouter)
//pp.use('/logout', registerRouter)

app.listen(port)

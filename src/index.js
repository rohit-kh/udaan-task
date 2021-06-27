const express = require('express')
require('./db/mongoose')
const auth = require('./middleware/auth')
const userRouter = require('./routers/user.router')
const zoneRouter = require('./routers/zone.router')
const selfAssesmentRouter = require('./routers/self-assesment.router')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(auth)
app.use('/users', userRouter)
app.use('/', selfAssesmentRouter)
app.use('/', zoneRouter)

app.listen(port, () => {
	console.log('Server is up on port ' + port)
	console.log('Server Environment ' + process.env.NODE_ENV)
	console.log('Server Environment ' + process.env.MONGODBURL)
})


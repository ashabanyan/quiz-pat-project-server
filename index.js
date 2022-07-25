const express = require('express')
const userRouter = require('./routes/user.router')

const PORT = process.env.PORT || 8080

const app = express()

const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


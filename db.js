const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()
const { PORT, CONNECTION_STRING } = process.env
const connectDb = async () => {
    const db = new MongoClient(CONNECTION_STRING)
    await db.connect()
    module.exports = db.db()
    const app = require('./app')
    app.listen(PORT)
}
connectDb()
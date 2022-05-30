const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const connection = mongoose.connection
    connection.once('open', ()=>{
        console.log(`Succesful connection to the db on port ${connection.port}`)
    })
}

module.exports = connectDB
const mongoose = require("mongoose")

function DbConnection() {
    //const DB_URL = "mongodb+srv://sreeramdevendra51:sreeramdevendra51@cluster0.dowbr7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      throw err;
    });
    //const db = mongoose.connection;
    //db.on('error', console.error.bind(console, "connection error :"))
}
module.exports = DbConnection;
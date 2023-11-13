const mongoose = require('mongoose');

const db_url = "mongodb+srv://azaliavirna:Hariibu2212@cluster0.6yc29ps.mongodb.net/"

const db = mongoose.connect (db_url)

module.exports = db

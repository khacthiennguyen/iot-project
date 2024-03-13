
const express = require('express')
const app = express()
const cors = require("cors");


app.set('view engine', 'ejs')
app.use(express.static('public'))

var corsOptions = {};
app.use(cors(corsOptions));

const db = require("./models")
db.mongoose.connect(db.url, {}).then(() => {
    console.log("Connected database")
})
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


app.use(express.json());

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Chào mừng đến API cảm biến!" });
});


app.get("/sensor", (req, res) => {
    res.render('sensor/index')
});


require("./routes/sensorRoute")(app);


app.get('/Admin', (req, res) => {
    res.render('admin')
})


app.listen(8089, () => {
    console.log('Port 8089 đang chạy!')
})
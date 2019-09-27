const express = require('express');
const dotenv = require('dotenv');
const pug = require('pug');
const path = require('path');
const router = express.Router();


dotenv.config();

app = express();

const port = process.env.PORT || 9000

app.use(express.static('public'));

router.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.send('index.html');
});
router.get('/restaurant/', (req, res) => {
    res.sendFile(path.join(__dirname + '/restaurant.html'));
});



app.use('/', router);
app.listen(port, () => console.log(`the app is listening on port ${port}`));

import dotenv from 'dotenv';
import express from 'express';
import HomeController from './HomeController/HomeController.js';

dotenv.config();
const app = express();

app.get('/', HomeController.getHomepage);
app.get('/css', HomeController.css);
app.get('/js', HomeController.js);

app.get('/getNumber', HomeController.getNumber);
app.get('/updateNumber/:status/:amount', HomeController.updateNumber);

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`成功開啟於 http://localhost:${port}/`);
});
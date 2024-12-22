import path from 'path';
import dotenv from 'dotenv';
import FileController from '../FileController/FileController.js';

dotenv.config();

const filePath = path.join(process.cwd(), process.env.FILEPATH, process.env.FILENAME);
const fileController = new FileController(filePath);

export default class HomeController {
    static getHomepage(req, res) {
        res.sendFile('/Home.html', { root: 'HomeController' });
    }
    static css(req, res) {
        res.sendFile('/Home.css', { root: 'HomeController' });
    }
    static js(req, res) {
        res.sendFile('/Home.js', { root: 'HomeController' });
    }

    static getNumber(req, res) {
        try {
            const number = fileController.getNumber();
            res.json({ number });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static updateNumber(req, res) {
        try {
            const number = 0;
            const { status } = req.params;
            const { amount } = req.params;
            const amountInt = parseInt(amount);
            if (status === "add") {
                console.log(fileController.addNumber(amountInt));
                fileController.lineMessage('增加', amount)
            } else if (status === "sub") {
                console.log(fileController.subNumber(amountInt));
                fileController.lineMessage('減少', amount)
            }


            res.json({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
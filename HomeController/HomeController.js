import path from 'path';
import dotenv from 'dotenv';
import FileService from '../fileService/fileService.js';

dotenv.config();

const filePath = path.join(process.cwd(), process.env.FILEPATH, process.env.FILENAME);
const fileService = new FileService(filePath);

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
            const number = fileService.getNumber();
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
                console.log(fileService.addNumber(amountInt));
                fileService.lineMessage('增加', amount)
            } else if (status === "sub") {
                console.log(fileService.subNumber(amountInt));
                fileService.lineMessage('減少', amount)
            }


            res.json({ status: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
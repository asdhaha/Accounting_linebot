import fs from 'fs';
import dotenv from 'dotenv';
import { Client } from '@line/bot-sdk';

dotenv.config();

export default class FileController {
    constructor(filePath) {
        this.filePath = filePath;
        this.initFile();
    }

    initFile() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '0', 'utf8');
        }
    }

    getNumber() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return parseInt(data, 10);
        } catch (error) {
            console.error('Error reading file:', error);
            throw new Error('Could not read the file');
        }
    }

    addNumber(value) {
        try {
            const current = this.getNumber();
            const updated = parseInt(current) + value;

            fs.writeFileSync(this.filePath, updated.toString(), 'utf8');

            return updated;
        } catch (error) {
            console.error('Error reading file:', error);
            throw new Error('Could not read the file');
        }
    }

    subNumber(value) {
        try {
            const current = this.getNumber();
            const updated = parseInt(current) - value;

            fs.writeFileSync(this.filePath, updated.toString(), 'utf8');

            return updated;
        } catch (error) {
            console.error('Error reading file:', error);
            throw new Error('Could not read the file');
        }
    }

    lineMessage(status, amount) {
        try {
            const number = this.getNumber();
            const config = {
                channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
                channelSecret: process.env.CHANNEL_SECRET
            };
            const client = new Client(config);

            const message = {
                type: 'text',
                text: `你的存款 ${status} ${amount}, 目前存款為 ${number}`
            };
            client.pushMessage(process.env.USER_ID, message)
                .then(() => {
                    console.log('Message sent successfully!');
                })
                .catch((err) => {
                    console.error('Error sending message:', err);
                });

            return true;
        } catch (error) {
            return false;
        }
    }
}

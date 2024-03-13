import {config} from 'dotenv';

config();
export const settings = {
    PORT: process.env.PORT || 3001,
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
    NGROK_AUTH_TOKEN: process.env.AUTH_TOKEN_FOR_NGROK,
    RABBIT_MQ: process.env.RABBIT_MQ,
}
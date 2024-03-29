import axios from "axios";
import {settings} from "../../settings";

export class TelegramAdapter {
    private token = settings.TELEGRAM_TOKEN;

    async sendMessage(text: string, chatId: number) {
        await axios.post(`https://api.telegram.org/bot${this.token}/sendMessage`, {
            chat_id: chatId,
            text: text,
        });
    }

    async sendMessageForButton(chatId: number, replyMarkup: any, text: string) {
        await axios.post(`https://api.telegram.org/bot${this.token}/sendMessage`, {
            chat_id: chatId,
            text: text,
            reply_markup: replyMarkup,
        })
    }

    async sendPhoto(photo: string, chatId: number) {
        await axios.post(`https://api.telegram.org/bot${this.token}/sendPhoto`, {
            chat_id: chatId,
            photo: photo,
        })
    }

    async sendEditMessageReplyMarkup(chatId: number, messageId: number) {
        await axios.post(`https://api.telegram.org/bot${this.token}/editMessageReplyMarkup`, {
            chat_id: chatId,
            message_id: messageId,
            // reply_markup: {inline_keyboard: []} // Пустой массив кнопок для удаления
        });
    }

    // async sendOurHookForTelegram(url: string) {
    //     await axios.post(`https://api.telegram.org/bot${this.token}/setWebhook`, {
    //         url,
    //     });
    // }
    //
    // async connectToNgrok() {
    //     const url = await ngrok.connect({
    //         addr: 3000,
    //         authtoken: settings.NGROK_AUTH_TOKEN,
    //     });
    //     console.log(url);
    //     return url;
    // }
}
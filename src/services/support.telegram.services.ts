import {TelegramAdapter} from "../adapters/telegramAdapter/telegram.adapter";

export class SupportTelegramServices {
    private telegramAdapter = new TelegramAdapter();
    private timerId?: NodeJS.Timeout;
    private photo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/800px-SNice.svg.png";

    async startService(firstName: string, chatId: number) {
        const replyMarkup = {
            keyboard: [
                [{text: 'Сколько время?'}, {text: 'Привет'}],
            ],
            one_time_keyboard: true,
            resize_keyboard: true,
        };
        await this.telegramAdapter.sendMessageForButton(chatId, replyMarkup, `Привет ${firstName}!`);
        await this.telegramAdapter.sendPhoto(this.photo, chatId);
        this.timerId = setTimeout(() => {
            this.telegramAdapter.sendMessage(`Если хочешь продолжить напиши "Привет" или нажми "Привет"`, chatId);
        }, 15000);
    }

    async privetService(chatId: number) {
        clearTimeout(this.timerId);
        const text = "Вибери одно из действий:"
        const replyMarkup = {
            inline_keyboard: [
                [{text: 'Выбрать тариф', callback_data: 'Выбрать тариф'}],
                [{text: 'Попробовать бесплатно', callback_data: 'Попробовать бесплатно'}],
            ],
        };
        await this.telegramAdapter.sendMessageForButton(chatId, replyMarkup, text);
    }

    async selectPlansService(chatId: number) {
        const text = "Тарифы:"
        const replyMarkup = {
            inline_keyboard: [
                [{text: "Продвинутый", callback_data: 'Продвинутый'}, {text: "Pro", callback_data: 'Pro'}],
                [{text: "Базовый", callback_data: 'Базовый'},]
            ],
        };
        await this.telegramAdapter.sendMessageForButton(chatId, replyMarkup, text)
    }

    async plansKeyboardService(chatId: number) {
        const text = "Спасибо за выбор тарифа. Вам будет отправлено сообщение по активации.";
        await this.telegramAdapter.sendMessage(text, chatId);
        setTimeout(async () => {
            await this.telegramAdapter.sendMessage(`Тариф активирован`, chatId);
            setTimeout(async () => {
                await this.telegramAdapter.sendMessage("Спасибо", chatId);
                await this.telegramAdapter.sendPhoto(this.photo, chatId);
            }, 10000);
        }, 15000);
    }

    async selectFreePlanService(chatId: number) {
        setTimeout(async () => {
            await this.telegramAdapter.sendMessage("Спасибо", chatId);
            await this.telegramAdapter.sendPhoto(this.photo, chatId);
        }, 15000);
    }

    async howMuchTime(chatId: number) {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        await this.telegramAdapter.sendMessage(
            `${hours}:${minutes}:${seconds}`,
            chatId,
        );
    }

    async updateCallbackButton(chatId: number, messageId: number, text: string) {
        const messageResult = `Вы выбрали: ${text}`;
        await this.telegramAdapter.sendEditMessageReplyMarkup(chatId, messageId);
        await this.telegramAdapter.sendMessage(messageResult, chatId);
    }

    async defaultService(chatId: number) {
        await this.telegramAdapter.sendMessage(
            `Я немнгог туповат, и я не понимаю что вы ввели`,
            chatId,
        );
    }
}
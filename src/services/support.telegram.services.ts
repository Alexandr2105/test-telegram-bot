import {TelegramAdapter} from "../adapters/telegramAdapter/telegram.adapter";

export class SupportTelegramServices {
    private telegramAdapter = new TelegramAdapter();
    private timerId?: NodeJS.Timeout;
    private picture = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/800px-SNice.svg.png";

    async startService(firstName: string, chatId: number) {
        await this.telegramAdapter.sendMessage(`Привет ${firstName}!`, chatId);
        await this.telegramAdapter.sendPhoto(this.picture, chatId);
        this.timerId = setTimeout(async () => {
            await this.telegramAdapter.sendMessage(`Если хочешь продолжить напиши "Привет"`, chatId);
            return
        }, 15000);
    }

    async privetService(chatId: number) {
        clearTimeout(this.timerId);
        const text = "Вибери одно из действий:"
        const replyMarkup = {
            keyboard: [
                [{text: 'Выбрать тариф'}, {text: 'Попробовать бесплатно'}],
            ],
            one_time_keyboard: true,
            resize_keyboard: true,
        };
        await this.telegramAdapter.sendMessageForButton(chatId, replyMarkup, text);
    }

    async selectPlansService(chatId: number) {
        const text = "Тарифы"
        const replyMarkup = {
            keyboard: [
                [{text: "Продвинутый"}, {text: "Pro"}],
                [{text: "Базовый"},]
            ],
            one_time_keyboard: true,
            resize_keyboard: true,
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
                await this.telegramAdapter.sendPhoto(this.picture, chatId);
                return
            }, 10000);
        }, 15000);
    }

    async selectFreePlanService(chatId: number) {
        setTimeout(async () => {
            await this.telegramAdapter.sendMessage("Спасибо", chatId);
            await this.telegramAdapter.sendPhoto(this.picture, chatId);
            return
        }, 15000);
    }

    async defaultService(chatId: number) {
        await this.telegramAdapter.sendMessage(
            `Я немнгог туповат, и я не понимаю что вы ввели`,
            chatId,
        );
    }
}
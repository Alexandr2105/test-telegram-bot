import {TelegramMessageType} from "../types/telegram.message.type";
import {SupportTelegramServices} from "./support.telegram.services";

export class HandleTelegramUpdateServices {
    private supportTelegramServices = new SupportTelegramServices();

    async sendMessage(data: TelegramMessageType) {
        if (data?.message) {
            const chatId = data.message.chat.id;
            const message = data.message.text;

            switch (message) {
                case "/start":
                    return await this.supportTelegramServices.startService(data.message.from.first_name, chatId);
                case "Привет":
                    return this.supportTelegramServices.privetService(chatId);
                case "Выбрать тариф":
                    return this.supportTelegramServices.selectPlansService(chatId);
                case "Базовый":
                case "Продвинутый":
                case "Pro":
                    return this.supportTelegramServices.plansKeyboardService(chatId);
                case "Попробовать бесплатно":
                    return this.supportTelegramServices.selectFreePlanService(chatId);
                default:
                    return this.supportTelegramServices.defaultService(chatId);
            }
        } else {
            console.log("Error")
        }
    }
}
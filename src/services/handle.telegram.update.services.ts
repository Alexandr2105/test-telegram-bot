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
                    await this.supportTelegramServices.startService(data.message.from.first_name, chatId);
                    break;
                case "Привет":
                    await this.supportTelegramServices.privetService(chatId);
                    break;
                case "Выбрать тариф":
                    await this.supportTelegramServices.selectPlansService(chatId);
                    break;
                case "Базовый":
                case "Продвинутый":
                case "Pro":
                    await this.supportTelegramServices.plansKeyboardService(chatId);
                    break;
                case "Попробовать бесплатно":
                    await this.supportTelegramServices.selectFreePlanService(chatId);
                    break;
                default:
                    await this.supportTelegramServices.defaultService(chatId);
            }
        }else {
            console.log("Error")
        }
    }
}
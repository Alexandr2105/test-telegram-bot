import {SupportTelegramServices} from "./support.telegram.services";
import {TelegramMessageType} from "../types/telegram.message.type";
import {TelegramCallbackMessageType} from "../types/telegram.callback.message.type";

export class HandleTelegramUpdateServices {
    private supportTelegramServices = new SupportTelegramServices();

    async sendMessage(data: any) {
        let chatId;
        let message;
        let firstName;
        let messageId;

        try {
            if (data.message) {
                const typedData: TelegramMessageType = data;
                chatId = typedData.message.chat.id;
                message = typedData.message.text;
                firstName = typedData.message.from.first_name;
            } else {
                const typedData: TelegramCallbackMessageType = data;
                chatId = typedData.callback_query.message.chat.id;
                message = typedData.callback_query.data;
                firstName = typedData.callback_query.from.first_name;
                messageId = typedData.callback_query.message.message_id;
            }

            switch (message) {
                case "/start":
                    await this.supportTelegramServices.startService(firstName, chatId);
                    break;
                case "Привет":
                    await this.supportTelegramServices.privetService(chatId);
                    break;
                case "Выбрать тариф":
                    await this.supportTelegramServices.updateCallbackButton(chatId, messageId!, message);
                    await this.supportTelegramServices.selectPlansService(chatId);
                    break;
                case "Базовый":
                case "Продвинутый":
                case "Pro":
                    await this.supportTelegramServices.updateCallbackButton(chatId, messageId!, message);
                    await this.supportTelegramServices.plansKeyboardService(chatId);
                    break;
                case "Попробовать бесплатно":
                    await this.supportTelegramServices.selectFreePlanService(chatId);
                    break;
                case "Сколько время?":
                    await this.supportTelegramServices.howMuchTime(chatId);
                    break;
                default:
                    await this.supportTelegramServices.defaultService(chatId);
            }
        } catch (e) {
        }
    }
}
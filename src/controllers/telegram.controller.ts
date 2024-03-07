import {Request, Response} from "express";
import {TelegramMessageType} from "../types/telegram.message.type";
import {HandleTelegramUpdateServices} from "../services/handle.telegram.update.services";

export class TelegramController {
    handleTelegramUpdateServices = new HandleTelegramUpdateServices();

    async telegramHook(req: Request, res: Response): Promise<any> {
        const data: TelegramMessageType = req.body;
        console.log(req.body)
        await this.handleTelegramUpdateServices.sendMessage(data);
        res.send(true);
    }
}
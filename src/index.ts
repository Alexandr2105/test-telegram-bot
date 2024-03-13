import express, {Request, Response} from "express";
import {telegramBotRouter} from "./routers/telegram.bot.route";
import {settings} from "./settings";
import {TelegramAdapter} from "./adapters/telegramAdapter/telegram.adapter";
import {HandleTelegramUpdateServices} from "./services/handle.telegram.update.services";
import {TelegramMessageType} from "./types/telegram.message.type";
import {RabbitMQAdapter} from "./adapters/rabbitMQAdapter/rabbitMQ.adapter";

const app = express();
const port = settings.PORT;

app.use(express.json());

app.use("/telegram", telegramBotRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

async function start() {
    let baseUrl = settings.CURRENT_APP_BASE_URL;
    const telegramAdapter = new TelegramAdapter();
    if (!baseUrl) {
        baseUrl = await telegramAdapter.connectToNgrok();
    }
    await telegramAdapter.sendOurHookForTelegram(
        baseUrl + '/telegram/webhook',
    );
}

const consumeMessages = async () => {
    const rabbitMQAdapter = new RabbitMQAdapter();
    const handleTelegramUpdateServices = new HandleTelegramUpdateServices();
    const {channel, queue} = await rabbitMQAdapter.connectToRabbitMQ();

    await channel.consume(queue, (msg: any) => {
        const data: TelegramMessageType = JSON.parse(msg.content.toString());
        handleTelegramUpdateServices.sendMessage(data);
        channel.ack(msg);
    });
};

consumeMessages();
start();
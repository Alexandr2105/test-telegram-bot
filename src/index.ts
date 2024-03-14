import express, {Request, Response} from "express";
import {settings} from "./settings";
import {HandleTelegramUpdateServices} from "./services/handle.telegram.update.services";
import {RabbitMQAdapter} from "./adapters/rabbitMQAdapter/rabbitMQ.adapter";

const app = express();
const port = settings.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const consumeMessages = async () => {
    const rabbitMQAdapter = new RabbitMQAdapter();
    const handleTelegramUpdateServices = new HandleTelegramUpdateServices();

    const {channel, queue} = await rabbitMQAdapter.connectToRabbitMQ();
    await channel.consume(queue, async (msg: any) => {
        const data = JSON.parse(msg.content.toString());
        await handleTelegramUpdateServices.sendMessage(data);
        channel.ack(msg);
    });
};

consumeMessages();
// export default app;
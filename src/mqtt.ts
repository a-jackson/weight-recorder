import { Client, connect } from 'mqtt';
import { Config } from './config';

export type WeightReceivedCallback = (name: string, weight: number, date: Date) => void;

export class Mqtt {
    private client?: Client;

    constructor(
        private config: Config,
        private weightReceivedCallback: WeightReceivedCallback,
    ) {
    }

    public connect() {
        this.client = connect(this.config.mqttUrl, {
            username: this.config.mqttUser,
            password: this.config.mqttPassword,
        });

        this.client.subscribe(
            `${this.config.mqttBaseTopic}/+/set`,
            {
                qos: 2
            });
        this.client.on('message', (topic, payload) => this.onMessage(topic, payload));
        console.log('connected');
    }

    private onMessage(topic: string, payload: Buffer) {
        const name = topic.split('/')[1];
        const weight = parseInt(payload.toString(), 10);
        if (name && weight) {
            this.onWeight(name, weight);
        }
    }

    private onWeight(name: string, weight: number) {
        const now = new Date();
        this.weightReceivedCallback(name, weight, now);
        const payload = {
            weight: weight,
            date: now,
        };
        this.client.publish(
            `${this.config.mqttBaseTopic}/${name}`,
            JSON.stringify(payload),
            {
                retain: true,
                qos: 2,
            }
        );
    }
}

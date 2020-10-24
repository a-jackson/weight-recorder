export class Config {
    public readonly mqttUrl: string;
    public readonly mqttBaseTopic: string;
    public readonly mqttUser?: string;
    public readonly mqttPassword?: string;

    constructor() {
        this.mqttUrl = process.env.MQTT_URL;
        if (!this.mqttUrl) {
            throw new Error('MQTT_URL not specified');
        }

        if (process.env.MQTT_USER && process.env.MQTT_PASSWORD) {
            this.mqttUser = process.env.MQTT_USER;
            this.mqttPassword = process.env.MQTT_PASSWORD;
        }

        this.mqttBaseTopic = process.env.MQTT_BASE_TOPIC || 'weights';
    }
}

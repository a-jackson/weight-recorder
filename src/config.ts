export class Config {
    public readonly mqttUrl: string;
    public readonly mqttBaseTopic: string;
    public readonly mqttUser?: string;
    public readonly mqttPassword?: string;

    public readonly dbPath: string;

    public readonly csvPath?: string;

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
        this.csvPath = process.env.CSV_PATH;
        this.dbPath = process.env.DB_PATH || 'weights.db';
    }
}

export class Config {
    public readonly mqttUrl: string;
    public readonly mqttBaseTopic: string;
    public readonly mqttUser?: string;
    public readonly mqttPassword?: string;

    public readonly influxUrl: string;
    public readonly influxDatabase: string;
    public readonly influxUser?: string;
    public readonly influxPassword?: string;

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

        this.influxUrl = process.env.INFLUX_URL;
        this.influxDatabase = process.env.INFLUX_DATABASE;
        this.influxUser = process.env.INFLUX_USER;
        this.influxPassword = process.env.INFLUX_PASSWORD;
        if (!this.influxUrl) {
            throw new Error('INFLUX_URL not specified');
        }
        if (!this.influxDatabase) {
            throw new Error('INFLUX_DATABASE not specified');
        }

        this.csvPath = process.env.CSV_PATH;
    }
}

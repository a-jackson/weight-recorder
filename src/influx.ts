import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { Config } from './config';

export class Influx {
    private influxDb?: InfluxDB;
    constructor(
        private config: Config,
    ) { }

    public connect() {
        this.influxDb = new InfluxDB({
            url: this.config.influxUrl,
            token: `${this.config.influxUrl}:${this.config.influxPassword}`,
        });
    }

    public writeWeight(name: string, weight: number, date: Date) {
        const writeApi = this.influxDb.getWriteApi('', this.config.influxDatabase);
        const point = new Point('weight')
            .tag('name', name)
            .timestamp(date)
            .floatField('value', weight);
        writeApi.writePoint(point);
        writeApi.close();
    }
}
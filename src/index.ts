import { Influx } from './influx';
import { Mqtt, WeightReceivedCallback } from './mqtt';
import { Config } from './config';
import { config as loadDotenv } from 'dotenv';
import { Csv } from './csv';
loadDotenv();

const targets: WeightReceivedCallback[] = [];
targets.push((name, weight) => console.log(`${name} - ${weight}`));

const config = new Config();
const mqtt = new Mqtt(config, (name, weight, date) => targets.forEach(target => target(name, weight, date)));

const influx = new Influx(config);
targets.push((name, weight, date) => influx.writeWeight(name, weight, date));
influx.connect();

if (config.csvPath) {
    const csv = new Csv(config);
    targets.push((name, weight, date) => csv.writeEntry(name, weight, date));
}

mqtt.connect();

import { Mqtt, WeightReceivedCallback } from './mqtt';
import { Config } from './config';
import { config as loadDotenv } from 'dotenv';
import { Csv } from './csv';
import { Sqlite } from './sqlite';
loadDotenv();

const targets: WeightReceivedCallback[] = [];
targets.push((name, weight) => console.log(`${name} - ${weight}`));

const config = new Config();
const mqtt = new Mqtt(config, (name, weight, date) => targets.forEach(target => target(name, weight, date)));

const sqlite = new Sqlite(config);
targets.push((name, weight, date) => sqlite.writeWeight(name, weight,date));
sqlite.initialise();

if (config.csvPath) {
    const csv = new Csv(config);
    targets.push((name, weight, date) => csv.writeEntry(name, weight, date));
}

mqtt.connect();

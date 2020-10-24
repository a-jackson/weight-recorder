import { Mqtt } from './mqtt';
import { Config } from './config';
import { config as loadDotenv } from 'dotenv';
loadDotenv();

const config = new Config();

const mqtt = new Mqtt(config, (name, weight) => console.log(name + weight));
mqtt.connect();

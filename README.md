# Weight Recorder

The purpose of this project to it aid in the automation of weighing our guinea pigs.
They should be weighed weekly and I like to keep a record of the weights to identify if there are any problems.

This project subscribes to an MQTT topic `weights/+/set` where the `+` wildcard represents the name of guinea pig, expecting a payload of just the weight in grams.

The weight is then recorded in InfluxDB, and optionally written to a CSV file as well.
Finally a message is published on MQTT to `weights/[name]` with a Json payload of the weight and the date recorded.

The date will match in InfluxDB, CSV and the MQTT message.
I have a dashboard in Home Assistant that lists the weights of all guinea pigs and intend to set notifications to remind me when they haven't been weighed for a week.

Next steps are to build a scale with an ESP8622 to publish the MQTT message with the weight directly.
At the moment I am typing it into Home Assistant.

## How to Run

A docker image of the service is available at [Docker Hub](https://hub.docker.com/r/ajackson3/weight-recorder).
Or just run with Node.

There are several environment variables to set to configure the system.

* `MQTT_URL` - Required - URL of the MQTT broker
* `MQTT_USER` - Optional
* `MQTT_PASSWORD` - Optional
* `MQTT_BASE_TOPIC` - Default value `weights`
* `INFLUX_URL` - Required - URL for Influx DB
* `INFLUX_DATABASE` - Required - Should create the database first
* `INFLUX_USER` - Optional
* `INFLUX_PASSWORD` - Optional
* `CSV_PATH` - Optional, if specified will save weights to csv as well

The docker image has `CSV_PATH` set to `/out` so you can bind a volume here if desired.

I am running InfluxDB 1.8 so I'm not sure if it will work on 2.0.

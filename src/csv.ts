import { Config } from './config';
import { createObjectCsvWriter } from 'csv-writer';
import { join } from 'path';
import { existsSync } from 'fs';

export class Csv {
    constructor(
        private config: Config
    ) { }

    public writeEntry(name: string, weight: number, date: Date) {
        const path = join(this.config.csvPath, `${name}.csv`);
        const csvWriter = createObjectCsvWriter({
            path,
            header: [
                { id: 'date', title: 'Date' },
                { id: 'weight', title: 'Weight' },
            ],
            append: existsSync(path),
        });
        csvWriter.writeRecords([{
            date: date.toISOString(),
            weight
        }]).catch(error => console.error(error));
    }
}

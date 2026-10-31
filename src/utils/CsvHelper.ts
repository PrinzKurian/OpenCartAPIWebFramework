
import fs from "fs";
import {parse} from 'csv-parse/sync';

export class CsvHelper{

    static readCsv(filepath: string): Record<string, string>[] {

        return parse(fs.readFileSync(filepath,"utf-8"),{
            columns:true, //First row as headers
            skip_empty_lines: true,
            trim: true, //trim white spaces
        }) as Record<string, string>[];
    }
}

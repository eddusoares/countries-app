export interface Country {
    name: {
        common: string,
        official: string
    }
    flags: {
        png: string,
        svg:string
    }
    capital: Array<string>;
    population: number;
    region: string;
    languages: {
       [key:string]: string;
    }
}
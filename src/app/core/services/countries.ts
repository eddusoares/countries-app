import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class Countries {
  private http = inject(HttpClient);
  private url = 'https://restcountries.com/v3.1';
  private allUrl = '/all?fields=name,flags,capital,population,region,languages';
  private nameUrl = '/name/'

  getAll() {
    return this.http.get<Country[]>(this.url + this.allUrl);
  }

  getByName( countryName: string ){
    return this.http.get<Country[]>(this.url + this.nameUrl + countryName);
  }
}

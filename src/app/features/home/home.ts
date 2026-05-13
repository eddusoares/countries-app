import { Component, inject, signal } from '@angular/core';
import { Countries } from '../../core/services/countries';
import { Country } from '../../core/models/country.model';
import { RouterLink } from "@angular/router";
import { PopulationPipe } from '../../core/pipes/population-pipe';

@Component({
  selector: 'app-home',
  imports: [RouterLink, PopulationPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private countriesService = inject(Countries);
  protected countries = signal<Array<Country>>([]);
  protected loading = signal<boolean>(true);
  protected error = signal<boolean>(false);
  protected searchTerm = signal<string>('');

  constructor() {
    this.loadCountries();
  }

  loadCountries() {
    this.countriesService.getAll().subscribe({
      next: (data) => {
        this.countries.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    if (term) {
      this.countriesService.getByName(term).subscribe({
        next: (data) => {
          this.countries.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(true);
          this.loading.set(false);
        }
      });
    } else {
      this.loadCountries()
    }
  }
}

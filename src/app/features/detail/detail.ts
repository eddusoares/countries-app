import { Component, inject, signal } from '@angular/core';
import { Countries } from '../../core/services/countries';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Country } from '../../core/models/country.model';

@Component({
  selector: 'app-detail',
  imports: [RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  private countriesService = inject(Countries);
  private activatedRoute = inject(ActivatedRoute);

  protected name = String(this.activatedRoute.snapshot.params['name'])

  protected country = signal<Country | null>( null);
  protected loading = signal<boolean>(true);
  protected error = signal<boolean>(false); 

  constructor(){
    this.loadCountry();
  }

  loadCountry(){
   this.countriesService.getByName(this.name).subscribe({
    next: (data) => {
      this.country.set(data[0]);
      this.loading.set(false);
    },
    error: (err) => {
      this.error.set(true);
      this.loading.set(false)
    }
   });
  }

  getLanguages(): string {
    const langs = this.country()?.languages;
    return langs ? Object.values(langs).join(', ') : '';
  }
}

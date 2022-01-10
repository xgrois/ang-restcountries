import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries-by-name.interface';
import { RestcountriesService } from '../../services/restcountries.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }
  `
  ]
})
export class ByRegionComponent implements OnInit {

  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  selectedRegion: string = '';

  countries: Country[] = [];

  searchTerm: string = ''

  notFound: boolean = false;

  constructor(private restcountriesService: RestcountriesService) { }

  ngOnInit(): void {
  }

  getCSSButtonClass( region: string) {
    return (region === this.selectedRegion) ? 'btn btn-outline-primary' : 'btn btn-outline-secondary';
  }

  search(region: string) {

    if (region === this.selectedRegion) {
      return;
    }

    this.notFound = false;
    this.selectedRegion = region;
    this.countries = [];

    this.restcountriesService.getCountriesByRegion(this.selectedRegion).subscribe( {
      next: (r) => { 
        this.countries = r;
      },
      error: (e) => { 
        this.notFound = true;
        this.countries = [];
      },
      complete: () => console.info('complete') 
    });

  }

}

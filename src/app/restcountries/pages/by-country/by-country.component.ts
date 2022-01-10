import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries-by-name.interface';
import { RestcountriesService } from '../../services/restcountries.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `
  ]
})
export class ByCountryComponent implements OnInit {

  searchTerm: string = ''

  notFound: boolean = false;

  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  alertCondition(): boolean {
    return (this.notFound);
  }

  constructor(private restcountriesService: RestcountriesService) { }

  ngOnInit(): void {
  }

  search(searchTerm: string) {
    this.notFound = false;
    this.searchTerm = searchTerm;
    this.suggestedCountries = [];
    this.showSuggestions = false;

    this.restcountriesService.getCountriesByName(this.searchTerm).subscribe( {
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

  suggestions(partialSearchTerm: string) {
    this.notFound = false;
    this.searchTerm = partialSearchTerm;
    this.showSuggestions = true;



    this.restcountriesService.getCountriesByName(partialSearchTerm)
      .subscribe( {
        next: (r) => { 
          this.suggestedCountries = r.splice(0,5);
        },
        error: (e) => { 
          this.suggestedCountries = [];
          this.notFound = (this.searchTerm === '') ? false : true;
        },
        complete: () => console.info('complete') 
      });
  }

}

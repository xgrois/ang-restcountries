import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries-by-name.interface';
import { RestcountriesService } from '../../services/restcountries.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [
  ]
})
export class ByCapitalComponent implements OnInit {

  searchTerm: string = ''

  notFound: boolean = false;

  countries: Country[] = [];

  constructor(private restcountriesService: RestcountriesService) { }

  ngOnInit(): void {
  }

  search(searchTerm: string) {
    this.notFound = false;
    this.searchTerm = searchTerm;

    this.restcountriesService.getCountriesByCapital(this.searchTerm).subscribe( {
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

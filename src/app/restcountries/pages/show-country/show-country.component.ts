import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/countries-by-name.interface';

import { RestcountriesService } from '../../services/restcountries.service';

@Component({
  selector: 'app-show-country',
  templateUrl: './show-country.component.html',
  styles: [
  ]
})
export class ShowCountryComponent implements OnInit {

  country!: Country;

  constructor(private activatedRoute: ActivatedRoute, private restcountriesService: RestcountriesService) { }

  ngOnInit(): void {
    /*
    this.activatedRoute.params
      .subscribe( params => 
      {
        console.log(params);
        console.log(params['id']);
        this.restcountriesService.getCountryByCode(params['id']) 
          .subscribe( country => 
          {
              console.log(country);
          });
      });
      */

      // Better syntax
      this.activatedRoute.params
        .pipe(
          switchMap( params => this.restcountriesService.getCountryByCode(params['id']) ),
          tap(resp => console.log('tap',resp))
        )
        .subscribe( country => {
          // NOTE: https://restcountries.com/v3.1/alpha/{code} returns an [] with a single country or 400 Bad Request
          // thus we deencapsulate [0]
          this.country = country[0];
        });
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries-by-name.interface';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styles: [
  ]
})
export class CountriesTableComponent implements OnInit {

  @Input() countries: Country[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

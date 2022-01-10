import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/countries-by-name.interface';

@Injectable({
  providedIn: 'root'
})
export class RestcountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  getHttpParams() {
    return new HttpParams()
    .set('fields', 'name,capital,cca2,flags,population');
  }

  constructor(private http: HttpClient) { }

  getCountriesByName(name: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${name}`;

    return this.http.get<Country[]>(url, {params: this.getHttpParams() })
      .pipe(
        tap( console.log )
      );

  }

  getCountriesByCapital(name: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${name}`;

    return this.http.get<Country[]>(url, {params: this.getHttpParams() })
      .pipe(
        tap( console.log )
      );

  }

  getCountryByCode(code: string): Observable<Country[]> {

    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        tap( console.log )
      );

  }

  getCountriesByRegion(region: string): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${region}`;

    return this.http.get<Country[]>(url, {params: this.getHttpParams() })
      .pipe(
        tap( console.log )
      );

  }

}

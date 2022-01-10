import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ByCapitalComponent } from "./restcountries/pages/by-capital/by-capital.component";
import { ByCountryComponent } from "./restcountries/pages/by-country/by-country.component";
import { ByRegionComponent } from "./restcountries/pages/by-region/by-region.component";
import { ShowCountryComponent } from "./restcountries/pages/show-country/show-country.component";

const routes: Routes = [
    { path: '', component: ByCountryComponent, pathMatch: 'full' },
    { path: 'byregion', component: ByRegionComponent },
    { path: 'bycapital', component: ByCapitalComponent },
    { path: 'country/:id', component: ShowCountryComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
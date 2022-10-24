import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PokemonListComponent } from './pokemon-list/pokemon-list.component'
import { PokemonDescriptionComponent } from './pokemon-description/pokemon-description.component'

import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {DataViewModule} from 'primeng/dataview';
import { PokeListService } from './pokemon-list.service';
import {ProgressBarModule} from 'primeng/progressbar';
import {MenubarModule} from 'primeng/menubar';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    PanelModule,
    DropdownModule,
    CardModule,
    DataViewModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressBarModule,
    MenubarModule,
    

  ],
  providers: [PokeListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

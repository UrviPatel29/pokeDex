import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component'
import { PokemonDescriptionComponent } from './pokemon-description/pokemon-description.component'

const routes: Routes = [{path:'',component:PokemonListComponent},
{path:'pokemon-list',component:PokemonListComponent},
{path:'pokemon-description/:id',component:PokemonDescriptionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

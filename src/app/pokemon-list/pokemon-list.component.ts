import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PokeListService } from '../pokemon-list.service'
import { pokemon, dropDownInt } from './pokemon.modal';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, filter, from, fromEvent, tap } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, AfterViewInit {
    @ViewChild('input', { static: true })
    pokemonControls: any = FormGroup;
    ListPokemon: pokemon[] = []; // Pokemon to display
    allOriginalPokemon: pokemon[] = []; // original pokemon list From Service
    optionPokemon: any = [];
    gridViewToggle: boolean = true;
    filteredFavPoke: any = [];
    favoriteClicked: boolean = false;
    pokeFiltered: pokemon[] = [];
    searchedPokemon: any = [];
    dropDownSelectBool: boolean = false
    items: MenuItem[] = [];
    constructor(private pokeListService: PokeListService,
        private router: Router,
        private formBuilder: FormBuilder,
        private input: ElementRef) { }
    ngOnInit(): void {
        this.items = [
            { label: "All" },
            { label: "Favorite" },

        ]
        this.pokemonControls = this.formBuilder.group({
            searchBar: [''],
            typePokemon: ['']
        })
        this.getAllPokemon()
        this.getPokemonType()
    }
    ngAfterViewInit() {
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            filter(Boolean),
            debounceTime(200), //Search Optimization , Every 200 ml it will get called.
            distinctUntilChanged(),
            tap((event) => {
                if (this.pokemonControls && this.pokemonControls.controls &&
                    this.pokemonControls.controls.searchBar &&
                    this.pokemonControls.controls.searchBar) {
                    this.searchedPokemon = [];
                    if (!this.dropDownSelectBool) {
                        this.allOriginalPokemon.forEach(res => {
                            let name = res.name.toUpperCase();
                            let searchBoxVal = this.pokemonControls.controls.searchBar.value.toUpperCase()
                            if (name.startsWith(searchBoxVal)) {
                                this.searchedPokemon.push(res)
                            }
                        })
                    } else {
                        this.pokeFiltered.forEach(res => {
                            let name = res.name.toUpperCase();
                            let searchBoxVal = this.pokemonControls.controls.searchBar.value.toUpperCase()
                            if (name.startsWith(searchBoxVal)) {
                                this.searchedPokemon.push(res)
                            }
                        })
                    }
                    this.ListPokemon = [];
                    let poke = []
                    if (!this.favoriteClicked) {
                        this.ListPokemon = this.searchedPokemon
                    } else {
                        poke = this.searchedPokemon.filter(this.findFav)
                        this.ListPokemon = poke;
                    }

                }
            })).subscribe();
    }
    searchByName(pokemonSearch: any) {
        if (pokemonSearch && pokemonSearch.name && pokemonSearch.name == this.pokemonControls.controls.searchBar.value) {
            return pokemonSearch;
        }
    }
    getAllPokemon() {
        this.pokeListService.getPokemon().subscribe(response => {
            this.allOriginalPokemon = []
            this.allOriginalPokemon = response.items
            this.ListPokemon = response.items
            if (this.favoriteClicked) {
                let serachedPokemon = [];
                serachedPokemon = this.allOriginalPokemon.filter(this.findFav)
                this.ListPokemon = [];
                this.ListPokemon = serachedPokemon
            }
        })
    }
    getPokemonType() {
        this.pokeListService.getPokemonOpt().subscribe(res => {
            this.optionPokemon = []
            res.map((ele: any) => {
                this.optionPokemon.push({ label: ele, value: ele })
            });
        })
    }
    gridView(e: string) {
        if (e && e == 'grid') {
            this.gridViewToggle = true;
        } else {
            this.gridViewToggle = false;
        }
    }
    likeButtonClicked(val: any) {
        if (val && val.id) {
            if (!val.isFavorite) {
                this.pokeListService.likeButtonClicked(val.id).subscribe(res => {
                    if (res) {
                        this.getAllPokemon()
                    }

                })
            } else {
                this.pokeListService.dislikeButtonClicked(val.id).subscribe(res => {
                    if (res) {
                        this.getAllPokemon()
                    }
                })
            }
        }

    }
    imgClicked(e: any) {
        if (e && e.id) {
            this.router.navigateByUrl(['/pokemon-description/', e.id].join(''));
        }
    }
    navClicked(e: string) {
        this.pokemonControls.controls.searchBar.reset();
        if (e && e == 'All') {
            this.ListPokemon = this.allOriginalPokemon
            this.favoriteClicked = false;
        } else {
            this.favoriteClicked = true;
            this.filteredFavPoke = [];
            this.filteredFavPoke = this.allOriginalPokemon.filter(this.findFav)
            this.ListPokemon = [];
            this.ListPokemon = this.filteredFavPoke
        }
    }
    findFav(pokemon: any) {
        return pokemon.isFavorite
    }
    dropDownSelected(e: dropDownInt) {
        this.pokemonControls.controls.searchBar.reset();
        this.dropDownSelectBool = true;
        if (e && e.value && e.value) {
            this.pokeFiltered = [];
            this.allOriginalPokemon.filter(res => {
                if (res.types.includes(e.value)) {
                    this.pokeFiltered.push(res)
                }
            })
            this.ListPokemon = [];
            if (!this.favoriteClicked) {
                this.ListPokemon = this.pokeFiltered
            } else {
                this.filteredFavPoke = this.pokeFiltered.filter(this.findFav)
                this.ListPokemon = this.filteredFavPoke
            }
        }
    }
}



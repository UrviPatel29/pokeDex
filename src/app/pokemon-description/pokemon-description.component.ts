import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { pokemon } from './pokemon.modal';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PokeListService } from '../pokemon-list.service'

@Component({
  selector: 'app-pokemon-description',
  templateUrl: './pokemon-description.component.html',
  styleUrls: ['./pokemon-description.component.css']
})
export class PokemonDescriptionComponent implements OnInit {
  pokeMonId: any = '';
  pokemonDesc: any;
  favorite: boolean = false;
  progressValueCP: number = 0
  progressValueHP: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private pokeListService: PokeListService,
    private changeDetectorRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.pokeMonId = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : null;
    if (this.pokeMonId) this.getPokemonDetails();
  }
  getPokemonDetails() {
    this.pokeListService.getPokemonDesc(this.pokeMonId).subscribe(res => {
      this.pokemonDesc = res;
      this.progressValueCP = res.maxCP
      this.progressValueHP = res.maxHP
    })
  }
  likeButtonClicked(val: any) {
    if (val && val.id) {
      if (!val.isFavorite) {
        this.pokeListService.likeButtonClicked(val.id).subscribe(res => {
          if (res) {
            this.getPokemonDetails()
          }
        })
      } else {
        this.pokeListService.dislikeButtonClicked(val.id).subscribe(res => {
          if (res) {
            this.getPokemonDetails()
          }
        })
      }
    }
  }
  playSound(e: any) {
    if (e && e.sound) {
      e.sound.play();
    }
  }
}

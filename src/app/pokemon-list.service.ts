import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from "rxjs";
import {  } from "rxjs";

import { map, filter, switchMap } from 'rxjs/operators'

@Injectable()

export class PokeListService {

    constructor(private http:HttpClient,
         ) {

        }
    getPokemon = ():Observable<any> =>{
        const url = "https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/?limit="+20
        return this.http.get(url)
    }
    getPokemonOpt = ():Observable<any> => {
        const url ="https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types"
        return this.http.get(url)
    }
    likeButtonClicked = (val:any):Observable<any> => {
        const url ="https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/"+val+"/favorite"
        let postObj = {
            id:val
        }
        return this.http.post(url,postObj)
    }
    dislikeButtonClicked= (val:any):Observable<any> => {
        const url ="https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/"+val+"/unfavorite"
        let postObj = {
            id:val
        }
        return this.http.post(url,postObj)
    }
    getPokemonDesc = (id:string):Observable<any> =>{
        const url = "https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/"+id
        return this.http.get(url)
    }
    // getFavPokemon  = ():Observable<any> => {
    //     const url ="https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types"
    //     return this.http.get(url)
    // } 
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public setItem(key, value){
    return localStorage.setItem(key, value);
  }

  public getItem(key){
    return localStorage.getItem(key);
  }
}

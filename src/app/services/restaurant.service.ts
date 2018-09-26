import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Restaurant } from '../models/restaurant';


@Injectable()

export class RestaurantService {

  public url: String;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  saveRestaurant(token, restaurant: Restaurant) {

    let json = JSON.stringify(restaurant);
    let params = json;

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });

    return this._http.post(this.url + 'restaurant', params, { headers: headers })
      .map(res => res.json());
  }

  getRestaurant(token, restaurantId = null) {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let options = new RequestOptions({ headers: headers });

    return this._http.get(this.url + 'restaurant/' + restaurantId, options)
      .map(res => res.json());
  }



  updateRestaurant(token, id: String, restaurant: Restaurant) {

    let json = JSON.stringify(restaurant);
    let params = json;

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });

    return this._http.put(this.url + 'restaurant/' + id, params, { headers: headers })
      .map(res => res.json());
  }



  getRestaurants(token, usuarioId = null) {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let options = new RequestOptions({ headers: headers });

    if (usuarioId == null) {
      return this._http.get(this.url + 'restaurants', options)
        .map(res => res.json());
    } else {
      return this._http.get(this.url + 'restaurants/' + usuarioId, options)
        .map(res => res.json());
    }
  }

  deleteRestaurant(token, id: String) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let options = new RequestOptions({ headers: headers });

    return this._http.delete(this.url + 'restaurant/' + id, options).map(res => res.json());
  }

}

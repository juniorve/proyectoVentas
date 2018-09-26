import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Platillo } from '../models/platillo';


@Injectable()

export class PlatilloService {

  public url: String;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  savePlatillo(token, platillo: Platillo) {

    let json = JSON.stringify(platillo);
    let params = json;

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });

    return this._http.post(this.url + 'platillo', params, { headers: headers })
      .map(res => res.json());
  }

/*   getImagen(token, imagenId = null) {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let options = new RequestOptions({ headers: headers });

    if (imagenId == null) {
      return this._http.get(this.url + 'imagen', options)
        .map(res => res.json());
    } else {
      return this._http.get(this.url + 'imagen/' + imagenId, options)
        .map(res => res.json());
    }
  } */

 /*  getImagenesxU(token, usuarioId = null) {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let options = new RequestOptions({ headers: headers });

    if (usuarioId == null) {
      return this._http.get(this.url + 'getComentarios', options)
        .map(res => res.json());
    } else {
      return this._http.get(this.url + 'getcomentarios/' + usuarioId, options)
        .map(res => res.json());
    }
  } */

  getPlatilloxRestaurant(token, restaurantId = null) {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let options = new RequestOptions({ headers: headers });


      return this._http.get(this.url + 'platillo/' + restaurantId, options)
        .map(res => res.json());
  }

 /*  getComentariosxUsuario(token, usuarioId = null) {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let options = new RequestOptions({ headers: headers });


      return this._http.get(this.url + 'comentariosUser/' + usuarioId, options)
        .map(res => res.json());
  }
 */

  updatePlatillo(token, id: String, platillo: Platillo) {

    let json = JSON.stringify(platillo);
    let params = json;

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });

    return this._http.put(this.url + 'platillo/' + id, params, { headers: headers })
      .map(res => res.json());
  }

  deletePlatillo(token, id: String) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let options = new RequestOptions({ headers: headers });

    return this._http.delete(this.url + 'platillo/' + id, options).map(res => res.json());
  }

}

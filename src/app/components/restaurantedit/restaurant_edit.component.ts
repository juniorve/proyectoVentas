import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

//defino como variables para poder usar JQuery
declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'app-restaurant_edit',
  templateUrl: './restaurant_edit.component.html',
  styleUrls: ['./restaurant_edit.component.css'],
  providers: [RestaurantService, UserService]

})
export class RestauranteditComponent implements OnInit {
  public identity: any;
  public token;
  public url;
  public _idRestaurant: String;
  restaurants: Restaurant[] = [];

  constructor(private _restaurantService: RestaurantService, private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit() {
    this.getRestaurant();
  }

  editRestaurant(idRestaurant: String) {
    this._router.navigate(['/editrestaurant/' + idRestaurant]);
  }

  getRestaurant() {
    this._restaurantService.getRestaurants(this.token, this.identity._id).subscribe(
      response => {
        if (!response.restaurants) {

        } else {
          this.restaurants = response.restaurants;
          console.log(this.restaurants);
        }

      },
      error => {

      }
    );
  }

  deleteRestaurant(idRestaurant: String) {
    this._restaurantService.deleteRestaurant(this.token, idRestaurant).subscribe(
      response => {
        if (!response.restaurant) {
          swal('Lo sientimos','El restaurant no pudo ser eliminado','warning');

        } else {
          swal('Restaurante eliminado','Información del restaurante eliminada exitosamente','success');
          this.getRestaurant();
        }

      },
      error => {

      }
    );
  }


  /*
    getEvento(idEvento: String) {
      let id = idEvento;
      this._idEvento = idEvento;
      this._eventoService.getEvento(this.token, id).subscribe(
        response => {
          if (!response.evento) {
            //  this.aletMessage
          } else {
            this.evento = response.evento;
            console.log(this.evento);
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            console.log(error);
          }
        }
      );
    }



    public eventos: Evento[];
    getEventos() {
      //   this._eventoService.getEventos(this.token, this.identity._id).subscribe(
      this._eventoService.getEventos(this.token, this.identity._id).subscribe(
        response => {
          if (!response.eventos) {
            //  this.aletMessage
          } else {
            this.eventos = response.eventos;
            console.log(this.eventos);
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            console.log(error);
          }
        }
      );
    }


    updateEvento() {
      this._eventoService.updateEvento(this.token, this._idEvento, this.evento).subscribe(

        response => {
          if (!response.evento) {
            alert("Error al editar evento");
          }
          else {
            alert("evento modificado exitosamente");
            this.getEventos();
            // this.evento = new Etapa('','','','','');

            this.makeFileRequest(this.url + 'upload-img-evento/' + this._idEvento, [], this.filesToUpload).then(
              (result) => {
                // this._router.navigate(['/vista']);
              },
              (error) => {
                console.log(error);
              }
            );
          }
        },

        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            console.log(error);
          }
        }
      );
    }

    deleteEvento(idEvento: String) {
      this._idEvento = idEvento;
      this._eventoService.deleteEvento(this.token, this._idEvento).subscribe(
        response => {
          if (!response.evento) {
            alert("Error en el servidor");
          } else {
            this.getEventos();
            alert("Evento eliminado con exito");
          }

        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            console.log(error);
          }
        }
      );
    }

    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }


    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
      var token = this.token;

      return new Promise(function (resolve, reject) {
        var formData: any = new FormData;
        var xhr = new XMLHttpRequest();

        for (var i = 0; i < files.length; i++) {
          formData.append('foto_evento', files[i], files[i].name);
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              resolve(JSON.parse(xhr.response));
            } else {
              reject(xhr.response);
            }
          }
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send(formData);
      });

    }

   */
}

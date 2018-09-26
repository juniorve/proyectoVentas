import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'app-editrestaurant',
  templateUrl: './editrestaurant.component.html',
  styleUrls: ['./editrestaurant.component.css'],
  providers: [RestaurantService, UserService]

})
export class EditrestaurantComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  tipoControl = new FormControl([Validators.required]);
  tipos = [
    { name: 'Comida china' },
    { name: 'Comida japonesa' },
    { name: 'Pescados y mariscos' },
    { name: 'Hornos y parrillas' },
  ];

  public usuario;
  public title: String = 'EDICION DE DATOS DEL RESTAURANTE';
  public token;
  public url;
  public restaurant: Restaurant;
  public mensajeError: String;
  public _idRestaurant: String;
  public imagenTemp: String;
  restaurantId: string;


  constructor(private _restaurantService: RestaurantService, private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.token = this._userService.getToken();
    this.usuario = this._userService.getIdentity();
    this.restaurant = new Restaurant('', '', '', '', '', '', '', '');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getRestaurantUrl();
    this.getRestaurant();
  }

  getRestaurantUrl() {
    this._route.params.forEach((params: Params) => {
      if (params['id']) {
        this.restaurantId = params['id'];
      }
    });
  }

  editRestaurant() {
    this._restaurantService.updateRestaurant(this.token, this.restaurantId, this.restaurant).subscribe(
      response => {
        if (!response.restaurant) {
          swal('Lo sientimos', 'Información no moficada', 'warning');

        } else {
          this.makeFileRequest(this.url + 'upload-img-restaurant/' + response.restaurant._id, [],
            this.filesToUpload).then(
              (result) => {
          swal('Restaurante modificado', 'Información del restaurante modificada exitosamente', 'success');
          this._router.navigate(['/restaurantedit']);
              },
              (error) => {
                console.log(error);
              }
            );

        }
      },
      error => {


      });
  }

  getRestaurant() {
    this._restaurantService.getRestaurant(this.token, this.restaurantId).subscribe(
      response => {
        if (!response.restaurant) {
        } else {
          this.restaurant = response.restaurant;
          console.log(this.restaurant);
          //    this.imagenTemp=this.restaurant.imagen;
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

  filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any, archivo: File) {
    this.filesToUpload = <Array<File>>fileInput.target.files;


    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      console.log(reader.result);

      this.imagenTemp = reader.result;
    };

  }


  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    var token = this.token;

    return new Promise(function (resolve, reject) {
      var formData: any = new FormData;
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append('imagen', files[i], files[i].name);
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


}

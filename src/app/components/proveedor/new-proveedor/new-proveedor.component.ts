import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant.service';
import { Restaurant } from '../../../models/restaurant';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.css'],
  providers: [RestaurantService, UserService]

})
export class NewProveedorComponent implements OnInit {
  tipoControl = new FormControl([Validators.required]);
  tipos = [
    { name: 'Comida china' },
    { name: 'Comida japonesa' },
    { name: 'Pescados y mariscos' },
    { name: 'Hornos y parrillas' },
  ];


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  public identity;
  public title: String = 'REGISTRO DE NUEVO RESTAURANTE';
  public token;
  public url;
  public restaurant: Restaurant;
  public mensajeError: String;
  public _idRestaurant: String;
  public imagenTemp: String;

  constructor(private _restaurantService: RestaurantService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.restaurant = new Restaurant('', '', '', '', '', '', '', this.identity._id);
  }

  ngOnInit() {
  }


  saveRestaurant() {


    console.log(this.restaurant);
    this._restaurantService.saveRestaurant(this.token, this.restaurant).subscribe(
      response => {
        if (!response.restaurant) {
          swal('Error', 'el restaurant no se guardo correctamente', 'warning');
        }
        else {
          this._idRestaurant = response.restaurant._id;
          this.makeFileRequest(this.url + 'upload-img-restaurant/' + this._idRestaurant, [],
            this.filesToUpload).then(
              (result) => {
                swal('Restaurante registrado', 'Datos guardados correctamente', 'success');
                this._router.navigate(['/restaurantedit']);
              },
              (error) => {
                console.log(error);
              }
            );
        }
      },

      error => {
        this.mensajeError = error;
        let errorMessage = <any>error;
        if (errorMessage != null) {
          console.log(error);
        }
      }
    );
  }
  /*
  public eventos:Evento[];
  getEventos()
  {
        this._eventoService.getEventos(this.token, this.identity._id).subscribe(
            response =>{
              if(!response.eventos){
                }else{
                    this.eventos= response.eventos;
                    console.log(this.eventos);
                 }
            },
          error =>{
            var errorMessage = <any>error;
            if(errorMessage!=null){
              console.log(error);
             }
          }
     );
    }

      updateEvento()
    {
        this._eventoService.updateEvento(this.token,this._idEvento, this.evento).subscribe(

          response=>{
             if(!response.evento){
              swal('Error','El desafio no fue modificado','warning');
            }
            else{
              swal('Actualización exitosa','El desafio se modifico correctamente','success');
                }
          },

          error=>{
            var errorMessage = <any>error;
            if(errorMessage!=null){
              console.log(error);
            }
          }

        );
    }

    deleteEvento(){
      this._eventoService.deleteEvento(this.token, this._idEvento).subscribe(
        response =>{
            if(!response.evento){
              swal('Error','El desafio no fue eliminado','warning');
            }else{
             swal('Eliminación exitosa','El desafio se elimino correctamente','success');
            }

          },
            error =>{
            var errorMessage = <any>error;
            if(errorMessage!=null){
              console.log(error);
             }
          }
        );
    }

   */
  //--------------------imagenes--------------

  public filesToUpload: Array<File>;

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

import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  onDrop:boolean =false;
  archivos:FileItem[]=[];
  constructor(public _cargaImagenes:CargaImagenesService) { }

  ngOnInit() {
  }
  cargarImagenes(){
    this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }
  limpiar(){
    this.archivos = [];
  }

}

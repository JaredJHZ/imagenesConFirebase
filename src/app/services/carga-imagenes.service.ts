import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-items';
@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {
  private CARPETA_IMAGENES = 'img';

  constructor(private db:AngularFirestore) { }

  private guardarImagen(imagen:{nombre:string,url:string}){
    this.db.collection(`${this.CARPETA_IMAGENES}`)
      .add(imagen);
  }

  cargarImagenesFirebase(imagenes:FileItem[]){
    const storageRef = firebase.storage().ref();
    for(let item of imagenes){
      item.subiendo = true;
      if(item.progreso >=100){
        continue;
      }
      const uploadTask:firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);
      const referenciaImagen = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo }`);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot:firebase.storage.UploadTaskSnapshot)=>{
          item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error)=>{
          console.error('error al subir',error);
        },
        ()=>{

          referenciaImagen.getDownloadURL().then(
            (url)=>{
            console.log('Imagen cargada');
            item.url = url;
            item.subiendo = false;
            this.guardarImagen({
            nombre:item.nombreArchivo,
            url:item.url
          });
            }
          ).catch((rejected)=>{console.error(rejected)});
        }
        
      )
    }
  }
}

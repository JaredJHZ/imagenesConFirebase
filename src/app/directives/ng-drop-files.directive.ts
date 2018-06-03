import { Directive, EventEmitter, ElementRef, HostListener,Input,Output } from '@angular/core';
import { FileItem } from '../models/file-items';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archivos:FileItem[] = [];
  @Output() mouseSobre:EventEmitter<any>= new EventEmitter();

  constructor() { }

  @HostListener('dragover',['$event'])
  public onDragEnter(event:any){
    this._prevenirDetener(event);
    this.mouseSobre.emit(true);
  }
  @HostListener('dragleave',['$event'])
  public onDragLeave(event:any){
    this.mouseSobre.emit(false);
  }
  @HostListener('drop',['$event'])
  public onDrop(event:any){
   const TRANSFERENCIA = this.getTransferencia(event);
    if(!TRANSFERENCIA){
      return;
    }

    this.extraerArchivos(TRANSFERENCIA.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);
  }

  private getTransferencia(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivos(archivosLista:FileList){
    for(const propiedad in Object.getOwnPropertyNames(archivosLista)){
      console.log(archivosLista[propiedad]);
      const archivoTemporal = archivosLista[propiedad];
      if(this.puedeSerCargado(archivoTemporal)){
        let nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
    console.log(this.archivos);
  }
  //validaciones

  private puedeSerCargado(archivo:File):boolean{
      if(!this._archivoYaFueDroppeado(archivo.name) && this._esImagen(archivo.type)){
        return true;
      }else return false;
  }

  private _prevenirDetener(event){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDroppeado(nombreArchivo:string):boolean{
    for(const archivo of this.archivos){
      if(archivo.nombreArchivo == nombreArchivo){
        console.log(nombreArchivo+" ya existe");
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo:string):boolean{
    return (tipoArchivo ==='' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}

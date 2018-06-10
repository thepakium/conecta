import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: Http) { }

  listadoBarrios(organizacion: string): Observable<any> {
    const apiURL = `${environment.apiUrl}/getbarrio.php`;
    const formData2: FormData = new FormData();
    formData2.append('organizacion', organizacion );
    return this.http.post( apiURL, formData2 )
    .pipe(map((r: Response) => r ));
  }

  listadoUsuarios(): Observable<any> {
    const apiURL = `${environment.apiUrl}/try.php`;
    return this.http.get( apiURL )
  }

  listadoDatos( tipo: string): Observable<any> {
    const apiURL = `${environment.apiUrl}/getData.php`;
    const formData: FormData = new FormData();
    formData.append('data', btoa(encodeURIComponent(tipo)) );
    return this.http.post( apiURL, formData )
    .pipe(map((r: Response) => r.json() ));
  }


  obtenerDatos( tipo , cb ) {
    const req = new XMLHttpRequest();
    req.open('POST', `${environment.apiUrl}/getData.php`, true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send('data=' +  btoa(encodeURIComponent( tipo )) );
  }

  enviarMsj( datos: string): Observable<any> {
    const apiURL = `${environment.apiUrl}/bulkSMS.php`;
    const formData: FormData = new FormData();
    formData.append('data', datos );
    return this.http.post( apiURL , formData )
    .pipe(map((r: Response) => r ));
  }

  crearPersona( nombre: string , apellido: string , telefono: string , genero :string, mail :string, fecha_nacimiento :string): Observable<any> {
    const apiURL = `${environment.apiUrl}/crea_person.php`;
    const formData: FormData = new FormData();
    formData.append('nombre', nombre );
    formData.append('apellido', apellido );
    formData.append('telefono', telefono );
    formData.append('genero', genero );
    formData.append('mail', mail );
    formData.append('fecha_nacimiento', fecha_nacimiento );
    return this.http.post( apiURL , formData )
    .pipe(map((r: Response) => r ));
  }
}

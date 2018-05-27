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

  listadoDatos( tipo: string): Observable<any> {
    const apiURL = `${environment.apiUrl}/try.php`;
    const formData: FormData = new FormData();
    formData.append('tipo', tipo );
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

    req.send('tipo=' + tipo);
  }

  enviarMsj( fono: string , msj: string ): Observable<any> {
    const apiURL = `${environment.apiUrl}/bulkSMS.php`;
    const formData: FormData = new FormData();
    formData.append('telefono', fono );
    formData.append('mensaje', msj );
    return this.http.post( apiURL , formData )
    .pipe(map((r: Response) => r ));
  }

}

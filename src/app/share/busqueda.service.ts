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
    const apiURL = `${environment.apiUrl}/getData.php`;
    const formData: FormData = new FormData();
    formData.append('data', tipo );
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

    req.send('data=' + tipo);
  }

  enviarMsj( datos: string  ): Observable<any> {
    const apiURL = `${environment.apiUrl}/bulkSMS.php`;
    const formData: FormData = new FormData();
    formData.append('data', datos );
    return this.http.post( apiURL , formData )
    .pipe(map((r: Response) => r ));
  }

}

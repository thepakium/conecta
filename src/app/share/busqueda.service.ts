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

  ingresaDatos( tipo , cb ) {
    const req = new XMLHttpRequest();
    req.open('POST', `${environment.apiUrl}/gatherData.php`, true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onload = () => {
      cb( req.response );
    };

    req.send('data=' +  btoa(encodeURIComponent( tipo )) );
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

  enviarMsj( datos: string  ): Observable<any> {
    const apiURL = `${environment.apiUrl}/bulkSMS.php`;
    const formData: FormData = new FormData();
    formData.append('data', btoa(encodeURIComponent( datos )) );
    return this.http.post( apiURL , formData )
    .pipe(map((r: Response) => r ));
  }

}

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

  listadoUsuarios(): Observable<any> {
    const apiURL = `${environment.apiUrl}/try.php`;
    return this.http.get( apiURL )
    .pipe(map((r: Response) => r.json() ));
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

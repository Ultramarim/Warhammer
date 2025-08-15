import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../common/mision';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiMisionesService {
  constructor(private http:HttpClient) {}

   baseUrl = "http://localhost:3000/api/table"

  getMisions(): Observable<Table[]> {
    return this.http.get<Table[]>(this.baseUrl);
  }

  updateMision( table: Table): Observable<any> {
    return this.http.put(this.baseUrl+ '/' +table._id, table);
  }

  newMision(table: Table): Observable<any> {
    return this.http.post(this.baseUrl,table);
  }

  removeMision(id: string): Observable<any> {
    return this.http.delete(this.baseUrl+'/'+id);
  }

}


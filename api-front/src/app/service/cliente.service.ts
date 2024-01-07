import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../principal/domain/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url:string = 'http://localhost:8080/api/Cliente';

  constructor(private http:HttpClient) { }

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }


  save(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, cliente);     
  }


  update(cliente:Cliente, id:number):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.url}/${id}`, cliente);     
  }

  remove(id:number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)
  }
}


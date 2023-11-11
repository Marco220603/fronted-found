import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Temper } from '../model/temper';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class TemperService {
  private url = `${base_url}/temper`
  private listaCambio = new Subject<Temper[]>();
  constructor(private http:HttpClient) { }

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Temper[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(t: Temper) {
    return this.http.post(this.url, t);
  }
  update(t:Temper) { 
    return this.http.put(this.url, t);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  setList(listaNueva: Temper[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}

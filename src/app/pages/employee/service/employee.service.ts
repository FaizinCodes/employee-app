import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {



  constructor(
    private http: HttpClient
  ) { }

  getListEmployee(): Observable<employee[]> {
    return this.http.get<employee[]>(`${environment.apiUrlDomain}/employee`)
  }

  addEmployer(data: employee): Observable<any> {
    return this.http.post<any>(`${environment.apiUrlDomain}/employee/add`, data)
  }
}

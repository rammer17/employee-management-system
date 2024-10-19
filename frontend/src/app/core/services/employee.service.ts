import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  EmployeeCreateRequest,
  EmployeeResponse,
  EmployeeSearchRequest,
  EmployeeUpdateRequest
} from '../models/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly http: HttpClient = inject(HttpClient)

  getAll(): Observable<EmployeeResponse[]> {
    return this.http.get<EmployeeResponse[]>(`/api/employee/all`);
  }

  add(body: EmployeeCreateRequest): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>(`/api/employee/create`, body);
  }

  update(body: EmployeeUpdateRequest): Observable<EmployeeResponse> {
    return this.http.put<EmployeeResponse>(`/api/employee/update`, body);
  }

  delete(id: number): Observable<any> {
    const queryParams = new HttpParams().set('id', id);
    return this.http.delete<void>(`/api/employee/delete`, {
      params: queryParams
    });
  }

  search(body: EmployeeSearchRequest): Observable<EmployeeResponse[]> {
    return this.http.post<EmployeeResponse[]>(`/api/employee/search`, body);
  }
}

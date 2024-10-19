import {computed, inject, Injectable, Signal} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {EmployeeResponse} from '../models/Employee.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {EmployeeService} from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  private readonly employeeService: EmployeeService = inject(EmployeeService);
  /*
    ADD - when creating employee
    EmployeeResponse - when editing employee
    null - rest of cases
   */
  private selectedEmployee$: BehaviorSubject<EmployeeResponse | 'ADD' | null> = new BehaviorSubject<EmployeeResponse | 'ADD' | null>(null);
  private selectedEmployeeSignal: Signal<EmployeeResponse | 'ADD' | null | undefined> = toSignal<EmployeeResponse | 'ADD' | null>(this.selectedEmployee)
  private employees$: BehaviorSubject<EmployeeResponse[]> = new BehaviorSubject<EmployeeResponse[]>([]);

  constructor() {
    this.employeeService.getAll().pipe(tap((response: EmployeeResponse[]) => this.setEmployees(response, 'ADD'))).subscribe()
  }

  get employees(): Observable<EmployeeResponse[]> {
    return this.employees$.asObservable();
  }

  setEmployees(newData: EmployeeResponse | EmployeeResponse[], action: 'ADD' | 'UPDATE' | 'DELETE' | 'SEARCH') {
    let newEmployeeArr: EmployeeResponse[] = [];
    if (action === 'ADD') {
      newEmployeeArr = this.employees$.value.concat(newData);
    } else if (action === 'DELETE') {
      newEmployeeArr = this.employees$.value.filter((employee: EmployeeResponse) => employee.id !== (newData as EmployeeResponse).id);
    } else if (action === 'UPDATE') {
      const employeeForUpdateIndex = this.employees$.value.findIndex(employee => employee.id == (newData as EmployeeResponse).id);
      newEmployeeArr = this.employees$.value;
      newEmployeeArr[employeeForUpdateIndex] = (newData as EmployeeResponse);
    } else {
      newEmployeeArr = newData as EmployeeResponse[];
    }
    this.employees$.next(newEmployeeArr);
  }

  get selectedEmployee(): Observable<EmployeeResponse | 'ADD' | null> {
    return this.selectedEmployee$.asObservable();
  }

  setSelectedEmployee(employee: EmployeeResponse | 'ADD' | null) {
    this.selectedEmployee$.next(employee);
  }

  get mode(): Signal<'ADD' | 'UPDATE' | 'NONE'> {
    return computed(() => this.selectedEmployeeSignal() === 'ADD' ? 'ADD' : this.selectedEmployeeSignal() === null ? 'NONE' : 'UPDATE');
  }
}

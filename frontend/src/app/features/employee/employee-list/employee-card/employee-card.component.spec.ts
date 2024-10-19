import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeCardComponent } from './employee-card.component';
import { EmployeeService } from '../../../../core/services/employee.service';
import { EmployeeDataService } from '../../../../core/services/employee-data.service';
import { of, throwError } from 'rxjs';
import { EmployeeResponse } from '../../../../core/models/Employee.model';
import { toast } from 'ngx-sonner';
import {signal, Signal} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('EmployeeCardComponent', () => {
  let component: EmployeeCardComponent;
  let fixture: ComponentFixture<EmployeeCardComponent>;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;
  let mockEmployeeDataService: jasmine.SpyObj<EmployeeDataService>;

  const mockEmployee: EmployeeResponse = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: '123 Main St',
    imageUrl: 'https://example.com/image.jpg',
    position: 'Developer'
  };

  const mockEmployeeSignal: Signal<EmployeeResponse> = signal(mockEmployee);

  beforeEach(async () => {
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['delete']);
    mockEmployeeDataService = jasmine.createSpyObj('EmployeeDataService', ['setSelectedEmployee', 'setEmployees']);

    await TestBed.configureTestingModule({
      imports: [EmployeeCardComponent],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: EmployeeDataService, useValue: mockEmployeeDataService },
        HttpClient
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCardComponent);
    component = fixture.componentInstance;
    (component as any).employee = mockEmployeeSignal;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set selected employee on edit', () => {
    component.onEditEmployee();

    expect(mockEmployeeDataService.setSelectedEmployee).toHaveBeenCalledWith(mockEmployee);
  });

  it('should call delete employee and handle success', () => {
    mockEmployeeService.delete.and.returnValue(of({}));

    component.onDeleteEmployee();

    expect(mockEmployeeService.delete).toHaveBeenCalledWith(mockEmployee.id!);
    expect(mockEmployeeDataService.setEmployees).toHaveBeenCalledWith(mockEmployee, 'DELETE');
  });

  it('should handle error on delete employee', () => {
    spyOn(toast, 'error');
    const errorResponse = { error: { error: 'Deletion error' } };
    mockEmployeeService.delete.and.returnValue(throwError(errorResponse));

    component.onDeleteEmployee();

    expect(mockEmployeeService.delete).toHaveBeenCalledWith(mockEmployee.id!);
    expect(toast.error).toHaveBeenCalledWith('Deletion error');
  });

  it('should handle array of errors on delete employee', () => {
    spyOn(toast, 'error');
    const errorResponse = {
      error: [{ defaultMessage: 'Error 1' }, { defaultMessage: 'Error 2' }]
    };
    mockEmployeeService.delete.and.returnValue(throwError(errorResponse));

    component.onDeleteEmployee();

    expect(toast.error).toHaveBeenCalledWith('Error 1');
    expect(toast.error).toHaveBeenCalledWith('Error 2');
  });
});

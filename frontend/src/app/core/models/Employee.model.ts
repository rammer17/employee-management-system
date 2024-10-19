type Employee = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string;
  position: string;
}

export type EmployeeResponse = Employee

export type EmployeeCreateRequest = Employee

export type EmployeeUpdateRequest = Employee

export type EmployeeViewModel = {
  employees: Employee[]
  isLoading: boolean
}

export type EmployeeSearchRequest = {
  firstName: string;
  lastName: string;
  position: string;
}





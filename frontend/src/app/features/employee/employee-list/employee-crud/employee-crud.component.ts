import {
  Component,
  computed,
  effect,
  inject,
  output,
  OutputEmitterRef,
  Signal
} from '@angular/core';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent
} from '@spartan-ng/ui-dialog-helm';
import {
  BrnDialogContentDirective,
  BrnDialogDescriptionDirective,
  BrnDialogTitleDirective
} from '@spartan-ng/ui-dialog-brain';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {HlmLabelDirective} from '@spartan-ng/ui-label-helm';
import {HlmInputDirective} from '@spartan-ng/ui-input-helm';
import {EmployeeService} from '../../../../core/services/employee.service';
import {
  EmployeeCreateRequest,
  EmployeeResponse,
  EmployeeUpdateRequest
} from '../../../../core/models/Employee.model';
import {
  EmployeeDataService
} from '../../../../core/services/employee-data.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {catchError, EMPTY, tap} from 'rxjs';
import {toast} from 'ngx-sonner';

@Component({
  selector: 'app-employee-crud',
  standalone: true,
  imports: [
    HlmDialogComponent,
    HlmDialogContentComponent,
    BrnDialogContentDirective,
    HlmDialogHeaderComponent,
    BrnDialogTitleDirective,
    BrnDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmButtonDirective,
    HlmDialogContentComponent,
    ReactiveFormsModule,
    HlmLabelDirective,
    HlmInputDirective,
    HlmDialogComponent
  ],
  templateUrl: './employee-crud.component.html',
  styleUrl: './employee-crud.component.scss'
})
export class EmployeeCrudComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly employeeService: EmployeeService = inject(EmployeeService);
  private readonly employeeDataService: EmployeeDataService = inject(EmployeeDataService);

  selectedEmployeeSignal = toSignal<EmployeeResponse | 'ADD' | null>(this.employeeDataService.selectedEmployee)
  mode = this.employeeDataService.mode;
  close: OutputEmitterRef<void> = output<void>();

  modeLabel: Signal<string> = computed(() => (this.mode().charAt(0).toUpperCase() + this.mode().slice(1).toLowerCase()));
  state = computed(() => this.selectedEmployeeSignal() === null && this.mode() !== 'ADD' ? 'closed' : 'open');

  employeeForm?: FormGroup;

  constructor() {
    effect(() => this.initForm());
  }

  onSubmitForm(): void {
    const method = this.mode() === 'ADD' ? 'add' : 'update';
    const body: EmployeeCreateRequest | EmployeeUpdateRequest = {
      id: this.employeeForm?.get('id')?.value,
      firstName: this.employeeForm?.get('firstName')?.value,
      lastName: this.employeeForm?.get('lastName')?.value,
      email: this.employeeForm?.get('email')?.value,
      phone: this.employeeForm?.get('phone')?.value,
      address: this.employeeForm?.get('address')?.value,
      imageUrl: this.employeeForm?.get('imageUrl')?.value,
      position: this.employeeForm?.get('position')?.value
    }

    this.employeeService[method](body)
      .pipe(
        catchError((err: any) => {
          if (Array.isArray(err.error)) {
            err.error.forEach((error: any) => toast.error(error.defaultMessage))
          } else if (err?.error?.error) {
            toast.error(err?.error?.error)
          } else {
            toast.error(err?.error)
          }
          return EMPTY
        }),
        tap((response: EmployeeResponse) => {
          if (this.mode() === 'ADD') {
            this.employeeDataService.setEmployees(response, 'ADD')
          } else {
            this.employeeDataService.setEmployees(response, 'UPDATE')
          }
        })
      )
      .subscribe(() => {
        this.employeeDataService.setSelectedEmployee(null)
        toast.success('Success')
      })
  }

  onCloseModal(): void {
    this.employeeDataService.setSelectedEmployee(null);
    this.close.emit();
  }

  private initForm(): void {
    const initialValues = this.selectedEmployeeSignal()
    this.employeeForm = this.fb.group({
      id: this.fb.control<number>(initialValues && typeof initialValues === 'object' && initialValues.id ? initialValues.id : 0),
      firstName: this.fb.control<string>(initialValues && typeof initialValues === 'object' && initialValues.firstName ? initialValues.firstName : '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastName: this.fb.control<string>(initialValues && typeof initialValues === 'object' && initialValues.lastName ? initialValues.lastName : '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: this.fb.control<string>(initialValues && typeof initialValues === 'object' && initialValues.email ? initialValues.email : '', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      phone: this.fb.control<string>(initialValues && typeof initialValues === 'object' && initialValues.phone ? initialValues.phone : '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      address: this.fb.control<string>(initialValues && typeof initialValues === 'object' && initialValues.address ? initialValues.address : '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      imageUrl: this.fb.control<string>(initialValues && typeof initialValues === 'object' && initialValues.imageUrl ? initialValues.imageUrl : '', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      position: this.fb.control<string>(initialValues && typeof initialValues === 'object' && initialValues.position ? initialValues.position : '', [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
    })
  }
}

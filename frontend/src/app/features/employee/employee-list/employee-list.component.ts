import {Component, inject, OnInit} from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective
} from '@spartan-ng/ui-card-helm';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent
} from '@spartan-ng/ui-table-helm';
import {EmployeeResponse, EmployeeSearchRequest, EmployeeViewModel} from '../../../core/models/Employee.model';
import {catchError, combineLatest, EMPTY, Observable, of, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {EmployeeCardComponent} from './employee-card/employee-card.component';
import {EmployeeCrudComponent} from './employee-crud/employee-crud.component';
import {HlmInputDirective} from '@spartan-ng/ui-input-helm';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {HlmIconComponent} from '@spartan-ng/ui-icon-helm';
import {provideIcons} from '@ng-icons/core';
import {lucideArrowUpDown, lucideUserPlus2} from '@ng-icons/lucide';
import {EmployeeDataService} from '../../../core/services/employee-data.service';
import {FormsModule} from '@angular/forms';
import {EmployeeService} from '../../../core/services/employee.service';
import {toast} from 'ngx-sonner';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective
} from '@spartan-ng/ui-popover-brain';
import {HlmPopoverContentDirective} from '@spartan-ng/ui-popover-helm';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmCaptionComponent,
    AsyncPipe,
    EmployeeCardComponent,
    EmployeeCrudComponent,
    HlmInputDirective,
    HlmButtonDirective,
    HlmIconComponent,
    FormsModule,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective
  ],
  viewProviders: [provideIcons({lucideUserPlus2, lucideArrowUpDown})],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService: EmployeeService = inject(EmployeeService);
  private readonly employeeDataService: EmployeeDataService = inject(EmployeeDataService);

  searchValue: string = '';

  vm$?: Observable<EmployeeViewModel>;

  ngOnInit(): void {
    this.initViewModel();
  }

  onAddEmployee(): void {
    this.employeeDataService.setSelectedEmployee('ADD')
  }

  onSearchEmployees(): void {
    const body: EmployeeSearchRequest = {
      firstName: this.searchValue,
      lastName: this.searchValue,
      position: this.searchValue
    }

    this.employeeService.search(body)
      .pipe(
        catchError((err: any) => {
          if (Array.isArray(err.error)) {
            err.error.forEach((error: any) => toast.error(error.defaultMessage))
          } else {
            toast.error(err?.error?.error)
          }
          return EMPTY
        }),
      )
      .subscribe((resp: EmployeeResponse[]) => {
        this.employeeDataService.setEmployees(resp, 'SEARCH')
      })
  }

  private initViewModel(): void {
    this.vm$ = combineLatest({
      employees: this.employeeDataService.employees,
      isLoading: of(false)
    });
  }
}

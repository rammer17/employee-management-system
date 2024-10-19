import {ChangeDetectionStrategy, Component, inject, input, InputSignal} from '@angular/core';
import {EmployeeResponse} from '../../../../core/models/Employee.model';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective
} from '@spartan-ng/ui-card-helm';
import {HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective} from '@spartan-ng/ui-avatar-helm';
import {HlmIconComponent} from '@spartan-ng/ui-icon-helm';
import {provideIcons} from '@ng-icons/core';
import {lucideChevronRight, lucideContact, lucideEdit, lucideHome, lucideTrash} from '@ng-icons/lucide';
import {HlmBadgeDirective} from '@spartan-ng/ui-badge-helm';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {EmployeeDataService} from '../../../../core/services/employee-data.service';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective
} from '@spartan-ng/ui-popover-brain';
import {HlmPopoverContentDirective} from '@spartan-ng/ui-popover-helm';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent
} from '@spartan-ng/ui-menu-helm';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogTitleDirective
} from '@spartan-ng/ui-alertdialog-helm';
import {BrnAlertDialogContentDirective, BrnAlertDialogTriggerDirective} from '@spartan-ng/ui-alertdialog-brain';
import {EmployeeService} from '../../../../core/services/employee.service';
import {catchError, EMPTY} from 'rxjs';
import {toast} from 'ngx-sonner';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmAvatarComponent,
    HlmAvatarImageDirective,
    HlmAvatarFallbackDirective,
    HlmCardDescriptionDirective,
    HlmIconComponent,
    HlmBadgeDirective,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
    HlmMenuComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmAlertDialogComponent,
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,
    HlmAlertDialogContentComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogTitleDirective,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogFooterComponent,
  ],
  viewProviders: [provideIcons({lucideContact, lucideHome, lucideChevronRight, lucideTrash, lucideEdit})],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss'
})
export class EmployeeCardComponent {
  private readonly employeeService: EmployeeService = inject(EmployeeService);
  private readonly employeeDataService: EmployeeDataService = inject(EmployeeDataService)

  employee: InputSignal<EmployeeResponse> = input.required();

  onEditEmployee(): void {
    this.employeeDataService.setSelectedEmployee(this.employee())
  }

  onDeleteEmployee(): void {
    const employeeId: number = this.employee().id!;
    this.employeeService.delete(employeeId).pipe(
      catchError((err: any) => {
        if (Array.isArray(err.error)) {
          err.error.forEach((error: any) => toast.error(error.defaultMessage))
        } else {
          toast.error(err?.error?.error)
        }
        return EMPTY;
      }),
    ).subscribe(() => {
      this.employeeDataService.setEmployees(this.employee(), 'DELETE')
    })
  }
}

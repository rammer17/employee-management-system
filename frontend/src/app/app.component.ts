import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EmployeeListComponent} from './features/employee/employee-list/employee-list.component';
import {HlmToasterComponent} from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeeListComponent, HlmToasterComponent, HlmToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}

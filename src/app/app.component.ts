import { Component } from '@angular/core';
import { SpinnerService } from './service/spinnerService/spinner-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stockmanagement';
  constructor ( public spinnerService: SpinnerService ) {}
}

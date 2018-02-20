import { Component } from '@angular/core';

declare var UIkit: any;

@Component({
  selector: 'WD-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WD';
  showAlert(): void {
    UIkit.modal.alert('UIkit alert!');
  }
}

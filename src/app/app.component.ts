import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isActive = false;
  title = 'app';

  toggleAddingNewFolder() {

    this.isActive === false ? this.isActive = true : this.isActive = false;
  }
}



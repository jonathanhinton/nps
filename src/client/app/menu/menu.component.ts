import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
      private api: ApiService,
      public auth: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

  // View Profile
  viewProfile() {
    // Add logic to show users profile
  }

}

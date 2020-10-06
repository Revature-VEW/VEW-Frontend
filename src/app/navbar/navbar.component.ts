import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: number;

  constructor() { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    if (JSON.parse(localStorage.getItem('userInfo')) != null) {
      this.userId = JSON.parse(localStorage.getItem('userInfo')).userId;
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.setItem('userInfo', null);
  }
}

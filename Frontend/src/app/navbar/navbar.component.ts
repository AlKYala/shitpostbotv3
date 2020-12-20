import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return (user == null) ? false : true;
  }
}

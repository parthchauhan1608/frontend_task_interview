import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  /**
 * @description
 * Input user logged or not for displaying naigation-bar as. 
 */
  @Input() userLogged: boolean;

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
 * @description
 * Logout function on click logout.
 */
  logoutUser() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userDetail');
    this.router.navigate(['']);
    this.toastr.success("Logout successfully");
  }
}

import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  type: any;
  subscribeUsers: any;
  name: any;
  email: any;
  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router,
    private api:AuthService,
    private userData: UserService,
  ) { }

  ngOnInit(): void {
    this. userSubcribeData()
    this.getUserProfileDetails()
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  // getUserlogout(){
  //   console.log("hii1")
  //   this.api.getUserProfile().subscribe(data => {
  //     console.log("hii")
  //   },
  //   (error) => {
      
  //   });
  // }
  onLogout(e) {
    e.preventDefault();
    this.api.getUserlogout().subscribe(data => {
      this.router.navigate(['/auth/login'] );
        },
        (error) => {
          this.router.navigate(['/auth/login'] );
        });
      }
      userSubcribeData(){
        this.type = "daily"
        this.userData.dashboardAllData(this.type).subscribe((data: any) => {
          this.subscribeUsers = data.data.edugamoSubscribers
        });
      }
      getUserProfileDetails(){
        this.type = "daily"
        this.api.getUserProfile().subscribe((data: any) => {
          this.name = data.data.firstName
          this.email = data.data.email
        });
      }
  }



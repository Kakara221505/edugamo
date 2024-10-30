import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  page: any = 0;
  filterObj: any = { p: 0, limit: 50 };
  copyArr: any;
  filter = {
    type:"",
    order:""
  }
  socialList: any;
  constructor(private modalService: NgbModal,  private toastr: ToastrService, private router: Router,
     private spinner: NgxSpinnerService,private userService:UserService) { }

  ngOnInit(): void {
    this.getAllSocialSharing()
  }

  getAllSocialSharing(){
    this.spinner.show()
    this.userService.socialSharing(this.filter.order,this.page,this.filter.type).subscribe((data: any) => {
      this.socialList = data.data
      this.copyArr = data.totalRecords
      console.log(this.socialList)
      this.spinner.hide()
    })
  }
  pageChangeEvent(event: any) {
    this.page = event - 1;
    this.filterObj.p = event;
    this.getAllSocialSharing()
  }

 
  ascending1() {
    this.filter.order = "asc";
    this.filter.type = "game";
    this.getAllSocialSharing();
  }
  ascending2() {
    this.filter.order = "desc";
    this.filter.type = "game";
    this.getAllSocialSharing();
  }
  ascending3() {
    this.filter.order = "asc";
    this.filter.type = "tiktok"
    this.getAllSocialSharing();
  }
  ascending4() {
    this.filter.order = "desc";
    this.filter.type = "tiktok";
    this.getAllSocialSharing();
  }
  ascending5() {
    this.filter.order = "asc";
    this.filter.type = "instagram";
    this.getAllSocialSharing();
  }
  ascending6() {
    this.filter.order = "desc";
    this.filter.type = "instagram";
    this.getAllSocialSharing();
  }
  ascending7() {
    this.filter.order = "asc";
    this.filter.type = "twitter";
    this.getAllSocialSharing();
  }
  ascending8() {
    this.filter.order = "desc";
    this.filter.type = "twitter";
    this.getAllSocialSharing();
  }
  ascending9() {
    this.filter.order = "asc";
    this.filter.type = "facebook";
    this.getAllSocialSharing();
  }
  ascending10() {
    this.filter.order = "desc";
    this.filter.type = "facebook";
    this.getAllSocialSharing();
  }
  ascending11() {
    this.filter.order = "asc";
    this.filter.type = "pinterest";
    this.getAllSocialSharing();
  }
  ascending12() {
    this.filter.order = "desc";
    this.filter.type = "pinterest";
    this.getAllSocialSharing();
  }
  ascending13() {
    this.filter.order = "asc";
    this.filter.type = "text";
    this.getAllSocialSharing();
  }
  ascending14() {
    this.filter.order = "desc";
    this.filter.type = "text";
    this.getAllSocialSharing();
  }
  ascending15() {
    this.filter.order = "asc";
    this.filter.type = "email";
    this.getAllSocialSharing();
  }
  ascending16() {
    this.filter.order = "desc";
    this.filter.type = "email";
    this.getAllSocialSharing();
  }
  ascending17() {
    this.filter.order = "asc";
    this.filter.type = "others";
    this.getAllSocialSharing();
  }
  ascending18() {
    this.filter.order = "desc";
    this.filter.type = "others";
    this.getAllSocialSharing();
  }


  export(){
    this.spinner.show()
   
    this.userService.socialSharingExport(this.filter.order,this.page,this.filter.type).subscribe((data: any) => {
      const file = data;
      const url = window.URL.createObjectURL(
        new Blob([data as BlobPart], { type: 'application/Social Sharing.xlsx' })
      );
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.setAttribute('style', 'display: none');
      link.href = url;
      link.download = `Social Sharing.xlsx`;
      link.click();
    },error =>{
      this.toastr.error('There is no data to export.',`Error`)
    });
    this.getAllSocialSharing()
  }



}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ManualVerificationService } from 'src/app/services/manual/manual-verification.service';

@Component({
  selector: 'app-manual-verification',
  templateUrl: './manual-verification.component.html',
  styleUrls: ['./manual-verification.component.scss']
})
export class ManualVerificationComponent implements OnInit {

  filter = {
    order:"",
    type:"",
    keyword:""
  }
  pageNo: any = 0;
  pageSize: any = 50;
  filterObj: any = { p: 0, limit: 50 };
  copyArr: any;
  playList: any;
  plalistName: "";
  tags: any = [] ;
  pro = false;
  userPlayList: any;
  keywordSearch: ""
  @ViewChild('basicModal') basicModal: TemplateRef<any>;
  constructor(private manualService: ManualVerificationService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService,
    private modalService: NgbModal,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllManual()
  }
  // ascending1() {
  //   this.filter.order = "asc";
  //   this.filter.type = "totalGames"
  //   this.getAllPlaylist();
  // }
  // ascending2() {
  //   this.filter.order = "desc";
  //   this.filter.type = "totalGames"
  //   this.getAllPlaylist();
  // }
  // ascending3() {
  //   this.filter.order = "asc";
  //   this.filter.type = "totalGamesSaved"
  //   this.getAllPlaylist();
  // }
  // ascending4() {
  //   this.filter.order = "desc";
  //   this.filter.type = "totalGamesSaved"
  //   this.getAllPlaylist();
  // }
  getAllManual(){
    this.spinner.show()
    this.manualService.getAllManualList(this.filter.keyword,this.pageNo,this.pageSize).subscribe((data: any) => {
      this.userPlayList = data.data
      console.log("user",this.userPlayList)
      this.copyArr = data.totalRecords
      this.spinner.hide()
    })
  }
  pageChangeEvent(event: any) {
    this.pageNo = event - 1;
    this.filterObj.p = event;
    this.getAllManual()
  }
  searchFilter(){
    this.spinner.show()
    this.filter.keyword = this.keywordSearch
    this.manualService.getAllManualList(this.filter.keyword,this.pageNo,this.pageSize).subscribe((data: any) => {
      this.userPlayList = data.data
      this.copyArr = data.totalRecords
      console.log(this.userPlayList)
      this.spinner.hide()
    })
  }

  reSetForm(){
    this.filter.keyword = ""
    this.manualService.getAllManualList(this.filter.keyword,this.pageNo,this.pageSize).subscribe((data: any) => {
      this.userPlayList = data.data
      this.copyArr = data.totalRecords
      console.log(this.userPlayList)
    })
  }
  
      onChangeEvent(event: any){
        console.log(event.target.value);
        this.pro = event.target.value
      }


      verifyUser(id: number) {
        this.spinner.show();
      
        this.manualService.verifyManualVerification(id).subscribe(
          (response: any) => {
           
              const modalRef = this.modalService.open(this.basicModal);
              modalRef.result.then(() => {
                this.getAllManual();
              });
              this.toastr.success('User verified successfully!');
      
              // Hide the verify button for this user
              this.userPlayList = this.userPlayList.map((item: any) => {
                if (item.id === id) {
                  item.verified = true;
                }
                return item;
              });
         
            this.spinner.hide();
          },
          (error) => {
            this.toastr.error('Verification failed, please try again!');
            this.spinner.hide();
          }
        );
      }
      
      
     
    
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FlaggedService } from 'src/app/services/flagged/flagged.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-flagged-game',
  templateUrl: './flagged-game.component.html',
  styleUrls: ['./flagged-game.component.scss']
})
export class FlaggedGameComponent implements OnInit {
  modalReference: NgbModalRef;
  basicModalCloseResult: string;
  
  deleteRequest = true
  filter = {
    order:"",
    keyword:"",
    type:""
  }
  pageNo: any = 0;
  filterObj: any = { p: 0, limit: 50 };
  copyArr: any;
  flaggedList: any;
  viewData: any;
  constructor(private route: ActivatedRoute,private router: Router,private toastr: ToastrService,private modalService: NgbModal,
     private spinner: NgxSpinnerService,private flaggedService:FlaggedService) { }

  ngOnInit(): void {
  
    this.getAllFlaggedGame()
  }
  openBasicModal(content) {
    this.spinner.show()
    this.modalReference = this.modalService.open(content, {})
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
    this.spinner.hide()
  }
  openBasicModal2(content) {
    this.modalReference = this.modalService.open(content,{scrollable: true,size: 'lg'})
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }
  pageChangeEvent(event: any) {
    this.pageNo = event - 1;
    this.filterObj.p = event;
    this.getAllFlaggedGame()
  }

  
  ascending1() {
    this.spinner.show()
    this.filter.order = "asc";
    this.filter.type = "game";
    this.getAllFlaggedGame();
    this.spinner.hide()
  }
  ascending2() {
    this.filter.order = "desc";
    this.filter.type = "game";
    this.getAllFlaggedGame();
  }
  ascending3() {
    this.filter.order = "asc";
    this.filter.type = "subject"
    this.getAllFlaggedGame();
  }
  ascending4() {
    this.filter.order = "desc";
    this.filter.type = "subject";
    this.getAllFlaggedGame();
  }
  ascending5() {
    this.filter.order = "asc";
    this.filter.type = "totalUsersSaved";
    this.getAllFlaggedGame();
  }
  ascending6() {
    this.filter.order = "desc";
    this.filter.type = "totalUsersSaved";
    this.getAllFlaggedGame();
  }

reset(){
  this.spinner.show()
  this.filter.order = ""
  this.filter.keyword = ""
  this.filter.type = ""
  this.getAllFlaggedGame()
  this.spinner.hide()
}
  getAllFlaggedGame(){
    this.spinner.show()
    this.flaggedService.getAllFlagged(this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
      this.flaggedList = data.data
      this.copyArr = data.totalRecords
     
      console.log(this.flaggedList)
      this.spinner.hide()
    })
  }
flaggedGameBan(id){
  this.spinner.show()
this.flaggedService.banFlaggedGame(id).subscribe((data:any)=>{
this.toastr.success('Data update successfull', `Success`)
this.getAllFlaggedGame();
}, error => {
  this.toastr.error(error.error.message, `Error`)
})
}
flaggedGamedelete(id){
  this.spinner.show()
this.flaggedService.deleteFlaggedGame(id).subscribe((data:any)=>{
this.toastr.success('Data Delete successfull', `Success`)
this.deleteRequest = false
this.getAllFlaggedGame();
this.modalReference.close(); 
window.location.reload()
}, error => {
  this.toastr.error(error.error.message, `Error`)
})
}
 
close(){
  this.deleteRequest = true 
}
flaggedGameview(id){
  this.spinner.show()
this.flaggedService.viewFlaggedGame(id).subscribe((data:any)=>{
this.viewData = data.data
console.log(this.viewData)
this.getAllFlaggedGame();
}, error => {
  this.toastr.error(error.error.message, `Error`)
})
}
flaggedGameChangesStatus(list) {
  this.spinner.show();
  this.flaggedService.statusChange(list.id, list.status).subscribe((data: any) => {
    this.toastr.success('Data update successful', `Success`);
    console.log(list.status);
    this.getAllFlaggedGame();
  }, error => {
    this.toastr.error(error.error.message, `Error`);
  });
}
export(){
  this.spinner.show()
 
  this.flaggedService.flaggedGameExport(this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
    const file = data;
    const url = window.URL.createObjectURL(
      new Blob([data as BlobPart], { type: 'application/Flagged-Game.xlsx' })
    );
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display: none');
    link.href = url;
    link.download = `Flagged-Game.xlsx`;
    link.click();
  },error =>{
    this.toastr.error(error.error.message,`Error`)
  });
  this.getAllFlaggedGame()
}
  
}

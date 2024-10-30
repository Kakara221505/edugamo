import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-admin-paylist',
  templateUrl: './admin-paylist.component.html',
  styleUrls: ['./admin-paylist.component.scss'],
  
})
export class AdminPaylistComponent implements OnInit {
  modalReference: NgbModalRef;
  basicModalCloseResult: string;
  CreatePlay = true
 
  filter = {
    order:"",
    type:"",
    keyword:""
  }
  pageNo: any = 0;
  filterObj: any = { p: 0, limit: 50 };
  copyArr: any;
  playList: any;
  plalistName: "";
  tags: any = [] ;
  pro = false;
  tagLength :any
  successDone :false
  dataId: any;
  constructor(private playlistService: PlaylistService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService,
    private modalService: NgbModal,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllPlaylist();
    
  }
  viewPaylist(){
    this.router.navigate(["playlist/view"])
  }
  openBasicModal(content) {
    this.modalReference = this.modalService.open(content, )
    this.plalistName = ""
    this.tags = ""
    this.pro = false
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  pageChangeEvent(event: any) {
    this.pageNo = event - 1;
    this.filterObj.p = event;
    this.getAllPlaylist()
  }

  ascending1() {
    this.filter.order = "asc";
    this.filter.type = "totalGames"
    this.getAllPlaylist();
  }
  ascending2() {
    this.filter.order = "desc";
    this.filter.type = "totalGames"
    this.getAllPlaylist();
  }
  ascending3() {
    this.filter.order = "asc";
    this.filter.type = "totalGamesSaved"
    this.getAllPlaylist();
  }
  ascending4() {
    this.filter.order = "desc";
    this.filter.type = "totalGamesSaved"
    this.getAllPlaylist();
  }

  getAllPlaylist(){
    this.spinner.show()
    this.playlistService.getAllPlaylist(this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
      this.playList = data.data
      this.copyArr = data.totalRecords
      console.log(this.playList)
      this.spinner.hide()
    })
  }

  checkLength(value: string) {
    const array = this.tags.split(',');
    if (array.length > 3) {
      this.tagLength = array
        this.toastr.error("You can only add maximum 3 tags.")
    }
    for (var i = 0; i < array.length; i++) {
      var trimmedValue = array[i].trim();
      if (trimmedValue !== "") {
        this.tags.push(trimmedValue);
      }
    }
  }
  
  playlistAdd(){
    this.CreatePlay = false
    this.successDone = false
    this.spinner.show()
    let body = {
      tags:this.tags.split(","),
      pro:this.pro,
      plalistName :this.plalistName,
    };
    this.playlistService.addPlaylist(body).subscribe((data: any) => {
      this.dataId = data.data
      console.log(this.dataId)
      this.spinner.hide()
      this. getAllPlaylist()
    }, error => {
      this.CreatePlay = false
      this.toastr.error(error.error.message, `Error`)
    })
    this.spinner.hide()
  }
close(){
  this.successDone =  false
  this. getAllPlaylist()
  this.CreatePlay = true
 
}
adminPlaylistDelete(id){
this.spinner.show()
this.playlistService.deletePlaylist(id).subscribe((data:any) => {
  this.toastr.success('Data Delete successfull', `Success`)
  this.getAllPlaylist()
  this.spinner.hide()
}, error => {
  this.toastr.error(error.error.message, `Error`)
})
this.spinner.hide()
}
  onChangeEvent(event: any){
    console.log(event.target.value);
    this.pro = event.target.value
  }
  export(){
    this.spinner.show()
   
    this.playlistService.getExportPlaylist(this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
      const file = data;
      const url = window.URL.createObjectURL(
        new Blob([data as BlobPart], { type: 'application/Playlist.xlsx' })
      );
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.setAttribute('style', 'display: none');
      link.href = url;
      link.download = `Admin-Playlist.xlsx`;
      link.click();
      this.toastr.success('Admin Playlist Download Successfully !', 'Success');
    },error =>{
      this.toastr.error(error.error.message,`Error`)
    });
   
  }

}

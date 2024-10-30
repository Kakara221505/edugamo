import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-playlist-created',
  templateUrl: './playlist-created.component.html',
  styleUrls: ['./playlist-created.component.scss']
})
export class PlaylistCreatedComponent implements OnInit {
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
  userPlayList: any;
  keywordSearch: ""
  constructor(private playlistService: PlaylistService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService,
    private modalService: NgbModal,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllPlaylist()
  }
gotoView(id){
  this.router.navigate([`../user/playlist/view/`,id] );
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

  reSetForm(){
    this.filter.keyword = ""
    this.playlistService.getUserPlaylist(this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
      this.userPlayList = data.data
      this.copyArr = data.totalRecords
      console.log(this.userPlayList)
    })
  }
  getAllPlaylist(){
    this.spinner.show()
    this.playlistService.getUserPlaylist(this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
      this.userPlayList = data.data
      this.copyArr = data.totalRecords
      console.log(this.userPlayList)
      this.spinner.hide()
    })
  }
  pageChangeEvent(event: any) {
    this.pageNo = event - 1;
    this.filterObj.p = event;
    this.getAllPlaylist()
  }
  searchFilter(){
    this.spinner.show()
    this.filter.keyword = this.keywordSearch
    this.playlistService.getUserPlaylist(this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
      this.userPlayList = data.data
      this.copyArr = data.totalRecords
      console.log(this.userPlayList)
      this.spinner.hide()
    })
  }
  adminUserPlaylistDelete(id){
    this.spinner.show()
    this.playlistService.deleteUserPlaylist(id).subscribe((data:any) => {
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
        this.playlistService.getExportUserPlaylist(this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
          const file = data;
          const url = window.URL.createObjectURL(
            new Blob([data as BlobPart], { type: 'application/User-Playlist.xlsx' })
          );
          var link = document.createElement('a');
          document.body.appendChild(link);
          link.setAttribute('style', 'display: none');
          link.href = url;
          link.download = `User-Playlist.xlsx`;
          link.click();
          this.toastr.success('User Playlist Download Successfully !', 'Success');
          this.spinner.hide()
        },error =>{
          this.toastr.error(error.error.message,`Error`)
        });
       
      }
    
}

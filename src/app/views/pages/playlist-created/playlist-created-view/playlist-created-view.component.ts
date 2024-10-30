
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators,FormBuilder} from "@angular/forms";
import {ActivatedRoute,Router} from '@angular/router'
import {ToastrService} from 'ngx-toastr'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-playlist-created-view',
  templateUrl: './playlist-created-view.component.html',
  styleUrls: ['./playlist-created-view.component.scss']
})
export class PlaylistCreatedViewComponent implements OnInit {
  modalReference: NgbModalRef;
  basicModalCloseResult: string;
  id: string;
  playlistViewData: any;
  playlistGameData: any;
  status: any;
  // allGamesView: any;
  gameId: any ;
  checkboxID:any = [];
  isAllSelected = false;
  selectAll: boolean = false;
  playlistViewName: any;
  playlistCreatedDate: any;
  playlistTotalGames: any;
  playlistSavedGames: any;
  allGamesView: any[] = [];
  toogleBool: boolean;
  createdBy: any;
  createdID: any;
  playlistUrl: any;
  constructor(private playlistService: PlaylistService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService,
    private modalService: NgbModal,private spinner: NgxSpinnerService) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.playlistView()
  }
  playlistView(){
    this.spinner.show()
    this.playlistService.playlistView(this.id).subscribe((data: any) => {
      this.playlistViewData = data.data.tags
      this.playlistViewName = data.data.playListName
      this.playlistUrl = data.data.playlistUrl
      this.playlistCreatedDate = data.data.createdOn
      this.playlistTotalGames = data.data.totalGames
      this.playlistSavedGames = data.data.totalGamesSaved
      this.playlistGameData = data.data.games
      this.createdBy = data.data.craetedBy
      this.createdID = data.data.createdById
      console.log(this.playlistGameData)
      this.spinner.hide()
    }, error => {
      this.toastr.error(error.error.message, `Error`)
    })
    this.spinner.hide()
  }
  removeGame(id){
    this.spinner.show()
    this.playlistService.deleteGame(id,this.id).subscribe((data: any) => {  
      console.log(this.playlistGameData)
      this.playlistView()
      this.spinner.hide()
     this.playlistView()
    }, error => {
      this.toastr.error(error.error.message, `Error`)
    })
    this.spinner.hide()
  }
 
  flaggedGameBan(list) {
    this.spinner.show();
    this.playlistService.statusChange(list.id, list.status).subscribe((data: any) => {
      this.toastr.success('Data update successful', `Success`);
      console.log(list.status);
      this.playlistView();
      this.spinner.hide()
    }, error => {
      this.toastr.error(error.error.message, `Error`);
    });
  }
}

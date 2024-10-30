import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators,FormBuilder} from "@angular/forms";
import {ActivatedRoute,Router} from '@angular/router'
import {ToastrService} from 'ngx-toastr'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit {
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
  playlistUrl: any;
  constructor(private playlistService: PlaylistService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService,
    private modalService: NgbModal,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this. playlistView()
  }
  openScrollableModal(content) {
      this.modalReference = this.modalService.open(content, {scrollable: true})
      this.modalReference.result.then((result) => {
        this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }
 

  toggleSelect(option, event: any){
    console.log(option)
    if (event.target.checked) {
      this.toogleBool = false;
      this.checkboxID.push(option.id);
    } else {
      for (var i = 0; i < this.checkboxID.length; i++) {
        if (this.checkboxID[i] == option.id) {
          this.checkboxID.splice(i, 1);
        }
      }
    }
    }

  toggleSelectAll(event) {
      if (event.target.checked) {
        for (var i = 0; i < this.allGamesView.length; i++) {
          this.checkboxID.push(this.allGamesView[i].id);
        }
      } else {
        for (var i = 0; i < this.allGamesView.length; i++) {
          this.checkboxID = [];
        }
      }
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
  addPlaylistGet(){
    this.spinner.show()
    this.playlistService.getAllGamesPlaylist(this.id).subscribe((data: any) => {
      this.allGamesView = data.data
      console.log(this.allGamesView)
      this.spinner.hide()
    }, error => {
      this.toastr.error(error.error.message, `Error`)
    })
    this.spinner.hide()
  }
// selet checkbox add functinality


addGameplaylist(){
  this.spinner.show()
  let body = {
    playListId : this.id,
    gameId : this.checkboxID
  }
  this.playlistService.addPlaylistGame(body).subscribe((data: any) => {
    this.allGamesView = data.data
    console.log(this.allGamesView)
    this.modalReference.close(); 
    this.playlistView()
    window.location.reload()
    this.spinner.hide()
  }, error => {
    this.toastr.error(error.error.message, `Error`)
  })
  this.spinner.hide()
}
}
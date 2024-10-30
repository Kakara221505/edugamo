import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { FormGroup,FormControl, Validators,FormBuilder} from "@angular/forms";
import {ActivatedRoute,Router} from '@angular/router'
import {ToastrService} from 'ngx-toastr'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-bulk-game-create',
  templateUrl: './bulk-game-create.component.html',
  styleUrls: ['./bulk-game-create.component.scss']
})
export class BulkGameCreateComponent implements OnInit {
  modalReference: NgbModalRef;
  basicModalCloseResult: string;
  items: any;
  filter = {
    order:"",
    type:""
  }
  pageNo: any = 0;
  filterObj: any = { p: 0, limit: 50 };
  copyArr: any;
  check = []
  createGameList: any;
  createGameview: any;
  gameName: any;
  subject: [];
  templates: [];
  tags: any;
  createdBy: any;
  totalGamesPlay: any;
  createdOn: any;
  favouritedGames: any;
  playlistGames: any;
  rating: any;
  gamePlays: any;
  gameUrl: any;

  constructor(private api: GameService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService,
    private modalService: NgbModal,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getGameData();
  }
  createGame(){
    this.router.navigate(['/bulk-game/create'])
}

getGameData(){
  this.spinner.show()
  this.api.createAgameList(this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
    this.createGameList = data.data
    
    this.copyArr = data.totalRecords
    console.log(this.createGameList)
    this.spinner.hide()
  })
 
}
getGameViewData(id){
  this.spinner.show()
  this.api.createAgameView(id).subscribe((data: any) => {
    this.createGameview = data.data
    this.gameName = data.data.gameName
    this.gameUrl = data.data.gameUrl
    this.subject = data.data.subject.subject
    this.templates = data.data.template.template
    this.tags = data.data.tags
    this.createdBy = data.data.createdBy
    this.totalGamesPlay= data.data.totalGamesPlay
    this.createdOn = data.data.createdOn
    this.favouritedGames = data.data.favouritedGames
    this.playlistGames = data.data.playlistGames
    this.rating = data.data.rating
    this.gamePlays = data.data.gamePlays
    this.spinner.hide()
  }, error => {
    this.toastr.error(error.error.message, `Error`)
  })
  this.spinner.hide()
}
getGameDeleteData(id){
  this.spinner.show()
  this.api.createAgameDelete(id).subscribe((data: any) => {
    this.toastr.success('Data Delete successfull', `Success`)
    this.getGameData();
    this.spinner.hide()
  }, error => {
    this.toastr.error(error.error.message, `Error`)
  })
  this.spinner.hide()
}

 // pagination
 pageChangeEvent(event: any) {
  this.pageNo = event - 1;
  this.filterObj.p = event;
  this.getGameData();
}
 
ascending1() {
  this.filter.order = "asc";
  this.filter.type = "game";
  this.getGameData();
}
ascending2() {
  this.filter.order = "desc";
  this.filter.type = "game";
  this.getGameData();
}
ascending3() {
  this.filter.order = "asc";
  this.filter.type = "subject"
  this.getGameData();
}
ascending4() {
  this.filter.order = "desc";
  this.filter.type = "subject";
  this.getGameData();
}
ascending5() {
  this.filter.order = "asc";
  this.filter.type = "templates";
  this.getGameData();
}
ascending6() {
  this.filter.order = "desc";
  this.filter.type = "templates";
  this.getGameData();
}
ascending7() {
  this.filter.order = "asc";
  this.filter.type = "totalGamePlays";
  this.getGameData();
}
ascending8() {
  this.filter.order = "desc";
  this.filter.type = "totalGamePlays";
  this.getGameData();
}
ascending9() {
  this.filter.order = "asc";
  this.filter.type = "ratings";
  this.getGameData();
}
ascending10() {
  this.filter.order = "desc";
  this.filter.type = "ratings";
  this.getGameData();
}



openBasicModal(content) {
  this.modalReference = this.modalService.open(content, {})
  this.modalReference.result.then((result) => {
    this.basicModalCloseResult = "Modal closed" + result
  }).catch((res) => {});
}
export(){
  this.spinner.show()
  this.api.createAgameExport(this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
    const file = data;
    const url = window.URL.createObjectURL(
      new Blob([data as BlobPart], { type: 'application/Create a Game.xlsx' })
    );
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display: none');
    link.href = url;
    link.download = `Create a Game.xlsx`;
    link.click();
  },error =>{
    this.toastr.error(error.error.message,`Error`)
  });
  this.getGameData()
}


}

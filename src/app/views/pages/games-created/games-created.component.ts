import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators,FormBuilder} from "@angular/forms";
import {ActivatedRoute,Router} from '@angular/router'
import {ToastrService} from 'ngx-toastr'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from 'src/app/services/game/game.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-games-created',
  templateUrl: './games-created.component.html',
  styleUrls: ['./games-created.component.scss']
})
export class GamesCreatedComponent implements OnInit {
  modalReference: NgbModalRef;
  basicModalCloseResult: string;
  createdList: any;
  page: any = 0;
  filterObj: any = { p: 0, limit: 50 };
  copyArr: any;
  filter = {
    createdBy : "all",
    keyword :"",
    order :"",
    status : "all",
    type:""
  }
  gameCreatedView: any;
  subject: any;
  template: any;
  tags: any;
  createdBy: any;
  gamePlays: any;
  createdOn: any;
  favouritedGames: any;
  playlistGames: any;
  rating: any;
  constructor(private modalService: NgbModal,  private toastr: ToastrService, private router: Router,
    private spinner: NgxSpinnerService,private gameService:GameService) { }

  ngOnInit(): void {
    this.getGameTemplate()
  }
  openBasicModal(content) {
    this.modalReference = this.modalService.open(content, {})
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }
  getGameTemplate(){
    this.spinner.show();
    this.gameService.getAllGameCreated(this.filter.createdBy,this.filter.keyword,this.filter.order,
      this.page,this.filter.status,this.filter.type).subscribe((data:any)=>{
      this.createdList = data.data
      this.copyArr = data.totalRecords
      console.log(this.createdList)
      this.spinner.hide() 
    }) 
    }
    pageChangeEvent(event: any) {
      this.page = event - 1;
      this.filterObj.p = event;
      this.getGameTemplate()
    }
  
    reSetForm(){
      this.spinner.show()
      this.filter.keyword = ""
      this.filter.createdBy = "all"
      this.filter.status = "all"
      this.page = 0
      this.gameService.getAllGameCreated(this.filter.createdBy,this.filter.keyword,this.filter.order,
        this.page,this.filter.status,this.filter.type).subscribe((data:any)=>{
        this.createdList = data.data
        this.copyArr = data.totalRecords
        this.spinner.hide()
        })
    }
    ascending1() {
      this.filter.order = "asc";
      this.filter.type = "game";
      this.getGameTemplate();
    }
    ascending2() {
      this.filter.order = "desc";
      this.filter.type = "game";
      this.getGameTemplate();
    }
    ascending3() {
      this.filter.order = "asc";
      this.filter.type = "subject"
      this.getGameTemplate();
    }
    ascending4() {
      this.filter.order = "desc";
      this.filter.type = "subject";
      this.getGameTemplate();
    }
    ascending5() {
      this.filter.order = "asc";
      this.filter.type = "templates";
      this.getGameTemplate();
    }
    ascending6() {
      this.filter.order = "desc";
      this.filter.type = "templates";
      this.getGameTemplate();
    }
    ascending7() {
      this.filter.order = "asc";
      this.filter.type = "totalGamePlays";
      this.getGameTemplate();
    }
    ascending8() {
      this.filter.order = "desc";
      this.filter.type = "totalGamePlays";
      this.getGameTemplate();
    }
    ascending9() {
      this.filter.order = "asc";
      this.filter.type = "totalFavoritess";
      this.getGameTemplate();
    }
    ascending10() {
      this.filter.order = "desc";
      this.filter.type = "totalFavoritess";
      this.getGameTemplate();
    }
    ascending11() {
      this.filter.order = "asc";
      this.filter.type = "totaAddPlaylist";
      this.getGameTemplate();
    }
    ascending12() {
      this.filter.order = "desc";
      this.filter.type = "totaAddPlaylist";
      this.getGameTemplate();
    }
    ascending13() {
      this.filter.order = "asc";
      this.filter.type = "totaFlagged";
      this.getGameTemplate();
    }
    ascending14() {
      this.filter.order = "desc";
      this.filter.type = "totaFlagged";
      this.getGameTemplate();
    }
    ascending15() {
      this.filter.order = "asc";
      this.filter.type = "ratings";
      this.getGameTemplate();
    }
    ascending16() {
      this.filter.order = "desc";
      this.filter.type = "ratings";
      this.getGameTemplate();
    }
    gameCreatedChangeStatus(list){
      this.spinner.show();
      this.gameService.statusChange(list.id, list.status).subscribe((data: any) => {
        this.toastr.success('Data update successful', `Success`);
        console.log(list.status);
        this.getGameTemplate();
      }, error => {
        this.toastr.error(error.error.message, `Error`);
      });
    }
    getGameCreatedViewData(id){
      this.spinner.show()
    this.gameService.gameCreatedView(id).subscribe((data: any) => {
    this.gameCreatedView = data.data.gameName
    this.subject = data.data.subject.subject
    this.template = data.data.template.template
    this.tags = data.data.tags
    this.createdBy = data.data.createdBy
    this.createdOn = data.data.createdOn
    this.gamePlays = data.data.gamePlays
    this.favouritedGames = data.data.favouritedGames
    this.playlistGames = data.data.playlistGames
    this.rating = data.data.rating
    console.log(this.gameCreatedView)
    console.log(this.tags)
    this.spinner.hide()
  }, error => {
    this.toastr.error(error.error.message, `Error`)
  })
  this.spinner.hide()
}
    gameCreatedDelete(id){
      this.spinner.show()
      this.gameService.deleteGameCreated(id).subscribe((data:any)=>{
      this.toastr.success('Data Delete successfull', `Success`)
      this.getGameTemplate();
      this.spinner.hide()
      }, error => {
        this.toastr.error(error.error.message, `Error`)
      })
    }
    export(){
      this.spinner.show();
      this.gameService.gameCreatedExport(this.filter.createdBy,this.filter.keyword,this.filter.order,
        this.page,this.filter.status,this.filter.type).subscribe((data:any)=>{
          const file = data;
          const url = window.URL.createObjectURL(
            new Blob([data as BlobPart], { type: 'application/Game-Created.xlsx' })
          );
          var link = document.createElement('a');
          document.body.appendChild(link);
          link.setAttribute('style', 'display: none');
          link.href = url;
          link.download = `Game-Created.xlsx`;
          link.click();
          this.spinner.hide();
        },error =>{
          this.toastr.error(error.error.message,`Error`)
        });
        this.spinner.hide();
    }
}

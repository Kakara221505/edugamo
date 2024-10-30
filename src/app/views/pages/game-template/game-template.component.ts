import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from 'src/app/services/game/game.service';
@Component({
  selector: 'app-game-template',
  templateUrl: './game-template.component.html',
  styleUrls: ['./game-template.component.scss']
})
export class GameTemplateComponent implements OnInit {
  shortList: any;
  page: any = 0;
  filterObj: any = { p: 0, limit: 50 };
  templateList: any;
  copyArr: any;
filter = {
  order : "",
  type : ""
}
  status: any;
  constructor(private modalService: NgbModal,  private toastr: ToastrService, private router: Router,
     private spinner: NgxSpinnerService,private gameService:GameService) { }

  ngOnInit(): void {
    this.getGameTemplate()
  }
  ascending1(){
    this.filter.order = "asc";
    this.filter.type = "totalGamePlayes"
    this.getGameTemplate()
  }
  ascending2(){
    this.filter.order= "desc";
    this.filter.type = "totalGamePlayes"
    this.getGameTemplate()
  }
  ascending3(){
    this.filter.order = "asc";
    this.filter.type = "totalGames"
    this.getGameTemplate()
  }
  ascending4(){
    this.filter.order = "desc";
    this.filter.type = "totalGames"
   this.getGameTemplate()
  }
  getGameTemplate(){
    this.spinner.show()
    this.gameService.getAllTempalet(this.filter.order,this.filter.type).subscribe((data:any)=>{
      this.templateList = data.data
      console.log(this.templateList)
      this.spinner.hide() 
    }) 
    }

  GameTemplateStatusChanged(list) {
    this.spinner.show()
    this.gameService.changeStatuFlagged(list.id,list.status).subscribe((data: any) => {
      console.log(data);
      this.toastr.success('Game Status Changed Successfully !', 'Success');
      this.spinner.hide()
      this.getGameTemplate()
    }, error => {
      this.toastr.error(error.message, `Error`)
      this.spinner.hide()
    })
  }
  export(){
    this.spinner.show()
    this.gameService.GameTemplateExport().subscribe((data: any) => {
      const file = data;
      const url = window.URL.createObjectURL(
        new Blob([data as BlobPart], { type: 'application/user.xlsx' })
      );
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.setAttribute('style', 'display: none');
      link.href = url;
      link.download = `Game Template.xlsx`;
      link.click();
    },error =>{
      this.toastr.error('There is no data to export.',`Error`)
    });
    this.getGameTemplate()
  }

}

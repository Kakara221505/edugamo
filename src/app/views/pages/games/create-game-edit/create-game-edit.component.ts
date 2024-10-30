import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { FormGroup,FormControl, Validators,FormBuilder} from "@angular/forms";
import {ActivatedRoute,Router} from '@angular/router'
import {ToastrService} from 'ngx-toastr'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner'
import { read, utils, writeFile} from 'xlsx'
import * as XLSX from 'xlsx'
import { Binary } from '@angular/compiler';
@Component({
  selector: 'app-create-game-edit',
  templateUrl: './create-game-edit.component.html',
  styleUrls: ['./create-game-edit.component.scss']
})
export class CreateGameEditComponent implements OnInit {
  modalReference: NgbModalRef;
  basicModalCloseResult: string;
  filter = {
    order : "",
    type : ""
  }
  pro = false
  title:any
  tags = [];
    sideA:"";
    sideB:"";
  showPopup: boolean = false;
  showPopupPlaylist: boolean = false;
  subjectObj: any;
  templateObj: any;
  displayData: any;
  subjectId: any;
  templateId:any;
  userId:any;
  newArray = []
  tag :any
  disableButton: boolean = true;
  disableButton1: boolean = false;
  goToPlaylistId: any;
  subjectValue : any;
  templateValue : any;
  playlistData: any;
  playlistValue :any
  plalistName: any;
  tagsForPlaylist = []
  tagsAdd : ""
  id: string;
  createGameview: any;
  gameName: any;
  templates: any;
  gamePlays: any;
  subjectData: any;
  templateData: any;
  tagValuesAdd : any
  subjectValuePreview: any;
  templateValuePreview: any;
  displayObj: any;
  displayPreviewValue: any;
  excelFileData: any[];
  sideALimit: number = 50;
  sideBLimit: number = 80;
  constructor(private api: GameService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService,
    private modalService: NgbModal,private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAllSubjectGame()
  }

  checkInputLength(): void {
    if (this.sideA.length > this.sideALimit) {
      this.toastr.error("Side A text should be maximum 50 characters.");
    }
    if (this.sideB.length > this.sideBLimit) {
      this.toastr.error("Side B text should be maximum 80 characters.");
    }
    this.disableButton = this.sideA.length > this.sideALimit || this.sideB.length > this.sideBLimit;
  }

tagValue(){
  let tagString = ""
  for (let elem of this.tag){
    console.log(elem.tags);
    tagString += elem.tags + ","; 
  } 
  console.log(tagString)
  tagString = tagString.substring(0, tagString.length -1);
  console.log(tagString)
  this.tagValuesAdd = tagString
}
  getGameViewData(){
    this.spinner.show()
    this.api.createAgameView(this.id).subscribe((data: any) => {
      this.createGameview = data.data
      this.gameName = data.data.gameName
      this.subjectObj = data.data.subject.id
      this.subjectValuePreview = data.data.subject.subject
      this.templateObj = data.data.template.id
      this.displayObj = data.data.createdById
      this.displayPreviewValue = data.data.createdBy
      this.templateValuePreview = data.data.template.template
      this.tag = data.data.tags
      this.pro = data.data.pro
      
      for(let sideValue of data.data.allGames){
        this.newArray.push(sideValue)
      }
      console.log(this.newArray)
      this.tagValue()
   console.log(this.subjectObj)
      this.spinner.hide()
    }, error => {
      this.toastr.error(error.error.message, `Error`)
    })
    this.spinner.hide()
  }
  // removeSide(i: number): void {
  //   console.log(i);
  //   this.newArray.splice(i, 1);
  //   // Recalculate disableButton after removing the invalid entry
  //   this.updateDisableButton();
  // }
  removeSide(i: number,index:any): void {
    this.spinner.show()
    this.api.deletegameContent(index).subscribe((data: any) => {
      // this.toastr.success('Data Delete successfull', `Success`)
      // this.newArray.splice(i, 1);
      // this.updateDisableButton();
    }, error => {
      // this.toastr.error(error.error.message, `Error`)
     
    })
    this.newArray.splice(i, 1);
    this.updateDisableButton()
    this.spinner.hide()
  }
  
  updateDisableButton(): void {
    // Count the number of invalid entries
    let invalidCount = this.newArray.filter(entry => entry['invalid']).length;
  
    // Disable the button if there are any invalid entries or newArray length is outside the specified range
    this.disableButton1 = invalidCount > 0 || this.newArray.length < 10 || this.newArray.length > 300;
  }
  readFileCsv(event: any): void {
    let file = event.target.files[0];
    let filesReader = new FileReader();
    filesReader.readAsText(file, 'UTF-8');
  
    filesReader.onload = (e) => {
      var workBoox = XLSX.read(filesReader.result, { type: 'binary' });
      var sheetname = workBoox.SheetNames;
      this.excelFileData = XLSX.utils.sheet_to_json(workBoox.Sheets[sheetname[0]], { header: ["sideA", "sideB"] });
  
      console.log(this.excelFileData);
  
      // Push the data to newArray and check for character limits
      for (let i = 0; i < this.excelFileData.length; i++) {
        let sideAContent = this.excelFileData[i]['sideA'];
        let sideBContent = this.excelFileData[i]['sideB'];
  
        // Check character limits for each side A and side B content
        if (sideAContent.length > 50 || sideBContent.length > 80) {
       
          this.excelFileData[i]['invalid'] = true;
        }
      }
  
      console.log(this.excelFileData);
  
      // Update the newArray with all data including invalid entries
      this.newArray = this.excelFileData;
  
      // Disable the button if any entry is invalid or newArray length is less than 10 or greater than 300
      this.disableButton1 = this.newArray.some(entry => entry['invalid']) || this.newArray.length < 10 || this.newArray.length > 300;
    };
  
    event.target.value = ''; // Clear file input value after processing
  }
  splitTag(){
   this.tags = this.tagValuesAdd.split(",")
   if(this.tags.length >3){
    this.toastr.error("You can only add maximum 3 tags.")
  }
   console.log(this.tags)
  }
  getSubjectValue(event:any){
    let selectElementText = event.target['options'][event.target['options'].selectedIndex].text;
    console.log(selectElementText);
    this.subjectValuePreview = selectElementText
  }
  getTemplateValue(event:any){
    let selectElementText2 = event.target['options'][event.target['options'].selectedIndex].text;
    console.log(selectElementText2);
this.templateValuePreview = selectElementText2
  }
  
  getDisplayValue(event:any){
    let selectElementText3 = event.target['options'][event.target['options'].selectedIndex].text;
    console.log(selectElementText3);
this.displayPreviewValue = selectElementText3
  }

  getplayListValue(event:any){
    console.log(event.target.value);
  }
 
  addValueArray(){
    let objectSide = {
      sideA:"",
      sideB:""
    }
    objectSide.sideA = this.sideA
    objectSide.sideB = this.sideB
    this.newArray.push(objectSide)
    console.log(this.newArray)
    if(this.newArray.length <= 10 ){
      this.toastr.error("minimum sides should be 10.")
    }
    if(this.newArray.length > 300){
      this.toastr.error("maximum sides should be 300.")
    }
    }
    
  createGame(){
    let body = {
      gameContents:
      this.newArray,
      gameId:this.id,
      pro:this.pro,
      subjectId :this.subjectObj,
      tags:this.tags,
      templateId:this.templateObj,
      title :this.gameName,
      userId:this.displayObj,
    }
    this.api.updateCreateAgameAdd(body).subscribe((data:any)=>{
     this.spinner.hide()
     this.router.navigate(['/game'])
    }, error => {
      this.toastr.error(error.error.message, `Error`)
    })
    this.spinner.hide()
  }

  getAllSubjectGame(){
    this.api.getAllSubjectForCreateGame().subscribe((data:any)=>{
  this.subjectData = data.data
  console.log(this.subjectData)
  this.getTemplateName()
     this.spinner.hide()
    }, error => {
      this.toastr.error(error.error.message, `Error`)
    })
    this.spinner.hide()
  }
  getDisplayNameForCreateGame(){
    this.api.getDisplayNameForCreateGame().subscribe((data:any)=>{
  this.displayData = data.data
  console.log(this.displayData)
  this.getGameViewData()
     this.spinner.hide()
    }, error => {
      this.toastr.error(error.error.message, `Error`)
    })
    this.spinner.hide()
  }
  getTemplateName(){
    this.spinner.show()
    this.api.getAllTempaletForCreateGame(this.filter.order,this.filter.type).subscribe((data:any)=>{
      this.templateData = data.data
      console.log(this.templateData)
      this.getDisplayNameForCreateGame()
      this.spinner.hide() 
    },error =>{
       this.toastr.error(error.error.message,`Error`)
      })
      this.spinner.hide() 
    }
}

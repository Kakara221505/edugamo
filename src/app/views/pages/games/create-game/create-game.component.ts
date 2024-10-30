import { Component, ElementRef, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { FormGroup,FormControl, Validators,FormBuilder} from "@angular/forms";
import {ActivatedRoute,Router} from '@angular/router'
import {ToastrService} from 'ngx-toastr'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { read, utils, writeFile} from 'xlsx'
import * as XLSX from 'xlsx'
import { Binary } from '@angular/compiler';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  modalReference: NgbModalRef;
  basicModalCloseResult: string;
  user :any[]= []
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
  hasError:boolean = false;
  showPopupPlaylist: boolean = false;
  subjectData: any;
  templateData: any;
  displayData: any;
  subjectId: any;
  templateId:any;
  userId:any;
  newArray:any[] = []
  tag : ""
  goToPlaylistId: any;
  subjectValue : any;
  templateValue : any;
  playlistData: any;
  playlistValue :any;
  plalistName: "";
  tagsForPlaylist = []
  tagsAdd : any = [] ;
  excelFileData: any[];
  disabledButton: any[];
  maxNumberOfCharacters = 30;
  counter = true;
  tagsTitle: any = [] ;
  trimmedTags = [];
  array = [];

  numberOfCharacters1 = 0;
  tagLength: any;
  sideALimit: number = 50;
  sideBLimit: number = 80;
  disableButton: boolean = true;
  sideAContent: any;
  sideBContent: any;
  constructor(private api: GameService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService,
    private modalService: NgbModal,private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.getAllSubjectGame()
    this.getTemplateName()
    this.getDisplayNameForCreateGame()
    this.playlistValue = null;
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


  openBasicModal(content) {
    this.showPopup = false 
    this.plalistName = ''; // Clear playlist name when opening the modal
    this.tagsAdd = '';
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    
    }).catch((res) => {});
  }
  openBasicModal6(content) {
    this.showPopup = false 
    this.plalistName = ''; // Clear playlist name when opening the modal
  this.tagsTitle = '';
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
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
  this.sideA = "";
  this.sideB = "";
  }
  removeSide(i: number): void {
    console.log(i);
    this.newArray.splice(i, 1);
    // Recalculate disableButton after removing the invalid entry
    this.updateDisableButton();
  }
  isMoreThanThreeTags(): boolean {
    return this.tags.length > 3;
  }
  
  updateDisableButton(): void {
    // Count the number of invalid entries
    let invalidCount = this.newArray.filter(entry => entry['invalid']).length;
  
    // Disable the button if there are any invalid entries or newArray length is outside the specified range
    this.disableButton = invalidCount > 0 || this.newArray.length < 10 || this.newArray.length > 300;
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
      this.disableButton = this.newArray.some(entry => entry['invalid']) || this.newArray.length < 10 || this.newArray.length > 300;
    };
  
    event.target.value = ''; // Clear file input value after processing
  }
  


// readFileCsv(event: any): void {
//   let file = event.target.files[0];
//   let filesReader = new FileReader();
//   filesReader.readAsBinaryString(file);
  
//   filesReader.onload = (e) => {
//     var workBoox = XLSX.read(filesReader.result, { type: 'binary' });
//     var sheetname = workBoox.SheetNames;
//     this.excelFileData = XLSX.utils.sheet_to_json(workBoox.Sheets[sheetname[0]], { header: ["sideA", "sideB"] });
    
//     console.log(this.excelFileData);
    
//     // Validate character limits for Side A and Side B
//     for (let i = 0; i < this.excelFileData.length; i++) {
//       let sideAContent = this.excelFileData[i]['sideA'];
//       let sideBContent = this.excelFileData[i]['sideB'];
      
//       if (sideAContent.length > 50) {
//         this.toastr.error("Side A text should be maximum 50 characters.");
//         return; // Exit the loop if validation fails
//       }
      
//       if (sideBContent.length > 80) {
//         this.toastr.error("Side B text should be maximum 80 characters.");
//         return; // Exit the loop if validation fails
//       }
      
//       // Push the data to newArray if validation passes
//       this.newArray.push({ sideA: sideAContent, sideB: sideBContent });
//     }
    
//     // Check minimum sides condition
//     if (this.newArray.length < 10) {
//       this.toastr.error("Minimum sides should be 10.");
//       return;
//     }
    
//     // Check maximum sides condition
//     if (this.newArray.length > 300) {
//       this.toastr.error("Maximum sides should be 300.");
//       return;
//     }
    
//     console.log(this.newArray);
//   };

//   event.target.value = ''; // Clear file input value after processing
// }




  

    
splitTag(){
 this.tags = this.tag.split(",")
 console.log(this.tags)
 if(this.tags.length >3){
  this.toastr.error("You can only add maximum 3 tags.")
}
}
sideLength(){
  if(this.newArray.length < 10){
    this.toastr.error("minimum sides should be 10.")
  }
  if(this.newArray.length > 300){
    this.toastr.error("maximum sides should be 300.")
  }
}
getSubjectValue(event:any){
  console.log(event.target.value);
}
getplayListValue(event:any){
  console.log(event.target.value);
}
createGame(){
  let body = {
    gameContents:
    this.newArray,
    pro:this.pro,
    subjectId :this.subjectValue.id,
    tags:this.tags,
    templateId:this.templateValue.id,
    title :this.title,
    userId:this.userId,
  }
  this.api.createAgameAdd(body).subscribe((data:any)=>{
    this.goToPlaylistId = data.data
    console.log(this.goToPlaylistId)
    this.router.navigate(['/game'])
    this.addPlaylistCreate()
   this.spinner.hide()
  }, error => {
    this.toastr.error(error.error.message, `Error`)
  })
  this.spinner.hide()
}
getAllSubjectGame(){
  this.api.getAllSubjectForCreateGame().subscribe((data:any)=>{
this.subjectData = data.data
console.log(this.subjectData)
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
    this.spinner.hide() 
  },error =>{
     this.toastr.error(error.error.message,`Error`)
    })
    this.spinner.hide() 
  }
  addPlaylistCreate() {
    this.spinner.show()
    this.api.createGameAddPlaylist().subscribe((data:any)=>{
      this.playlistData = data.data
      console.log(this.playlistData)
      this.spinner.hide() 
      this.showPopup = false
    },error =>{
       this.toastr.error(error.error.message,`Error`)
      })
      this.spinner.hide() 
  }
  createPlaylist(){
    this.addPlaylistCreate();
  }

  addGameplaylist(){
    this.spinner.show()
    let body = {
      gameId : [this.goToPlaylistId],
      playListId : this.playlistValue.id
    }
    this.api.addPlaylistGameInCreate(body).subscribe((data: any) => {
      this.toastr.success('Game  Added Successfully !', 'Success');
      this.spinner.hide()
      this.router.navigate(['/game'])
    }, error => {
      this.toastr.error(error.error.message, `Error`)
    })
    this.spinner.hide()
  }
  closePopup() {
   this.showPopup = true
    this.router.navigate(['/game'])
  }
  openBasicModal2(content) {
    this.plalistName = ''; // Clear playlist name when opening the modal
    this.tagsAdd = '';
    this.modalReference = this.modalService.open(content)
   
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }
  openBasicModal3(content) {
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }
  openBasicModal4(content) {
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
      this.plalistName = ''; // Clear playlist name when opening the modal
      this.tagsAdd = '';
    }).catch((res) => {});

  }
  splitPlaylistTag(){
    this.tagsForPlaylist = this.tag.split(",")
    console.log(this.tags)
   }
  playlistAdd(){
    console.log("hii")
    this.spinner.show()
    let body = {
      tags:this.tagsAdd.split(","),
      pro:this.pro,
      plalistName :this.plalistName,
    };
    this.api.addPlaylist(body).subscribe((data: any) => {
      this.spinner.hide()
      this.toastr.success('Playlist Added Successfully !', 'Success');
      this.plalistName = ''; // Clear playlist name
      this.tagsAdd = '';
      this.addPlaylistCreate()
    }, error => {
      this.toastr.error(error.error.message, `Error`)
    })
    this.spinner.hide()
  }

  checkLength(value: string) {
   this.array = value.split(',');
    this.trimmedTags = this.array.map(tag => tag.trim()).filter(tag => tag !== "");
  
    // Check if the number of trimmed tags is greater than 3
    if (this.trimmedTags.length > 3) {
      this.toastr.error("You can only add a maximum of 3 tags.");
      return;
    }
  
    // Check if a comma is added after entering three tags
    if (this.array.length > 3) {
      this.toastr.error("You can only add a maximum of 3 tags.");
      return;
    }
  
    this.tags = this.trimmedTags;
    this.tagsTitle = value;
  }
  
  

  onModelChange(textValue: string): void {
    this.numberOfCharacters1 = textValue.length;
  }


}

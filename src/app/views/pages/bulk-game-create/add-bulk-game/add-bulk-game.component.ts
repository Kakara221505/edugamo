import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-add-bulk-game',
  templateUrl: './add-bulk-game.component.html',
  styleUrls: ['./add-bulk-game.component.scss'],
  // encapsulation: ViewEncapsulation.None  // Disable view encapsulation
  
})
export class AddBulkGameComponent implements OnInit {

 
  gameTitles: any[] = [];
  updatedSides: any[] = [];

  @ViewChild('fileInput') fileInput: ElementRef;
  user :any[]= []
  filter = {
    order : "",
    type : ""
  }
  title:any
  subjectData: any;
  templateData: any;
  displayData: any;
  templateId:any;
  playlistValue :any;
  templateValue: any = {};
  userId: any = {};
  tag : "";
  tags = [];
  gameToEdit: any;
    subjectValue : any;
  modalReference: NgbModalRef;
  pro = false
  zipFileUploaded: boolean = false;
  uploadedFileName: string = '';
 
  constructor(private api: GameService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService,
    private modalService: NgbModal,private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.getAllSubjectGame()
    this.getTemplateName()
    this.getDisplayNameForCreateGame()
    this.playlistValue = null;
   

  }
 


  openEditModal(content, game) {
    // Pass the game data to the modal
    this.gameToEdit = game;
    // Open the modal
    this.modalReference = this.modalService.open(content, {})
    const models = document.getElementsByClassName("modal-dialog");
    console.log("model",models)
    if (models.length > 0) {
      const model = models[0] as HTMLElement; // Access the first element
      model.style.maxWidth = "70%";
      console.log("model",model)
    }
  }
  isSideAExceeded(sideA: string): boolean {
    // console.log("hii",sideA.length)
    return sideA.length > 50 || sideA.length < 1;
  }

  isSideBExceeded(sideB: string): boolean {
    return sideB.length > 80 || sideB.length < 1;
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
       this.toastr.error(error.error.message,`Erro`)
      })
      this.spinner.hide() 
    }

    splitTag(){
      this.tags = this.tag.split(",")
      console.log(this.tags)
      if(this.tags.length >3){
       this.toastr.error("You can only add maximum 3 tags.")
     }
     }

     onFileChange(event) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        
        const file: File = fileList[0];
        console.log(file);
        this.uploadFile(file);
        this.zipFileUploaded = true;
    
        // Reset the value of the file input
        event.target.value = null;
      }
    }
    
  
    uploadFile(file: File) {
      this.spinner.show();
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
  
      this.api.uploadBulkImport(formData).subscribe((data: any) => {
        // Handle success response
        this.toastr.success('File uploaded successfully.', 'Success');
        this.gameTitles = this.formatGameTitles(data.data);

        const gameData = this.formatGameTitles(data.data);
    const invalidSides = gameData.some(game => {
      return game.sides.some(side => side.sideA.length < 10 || side.sideB.length < 10 || side.sideA.length > 300 || side.sideB.length > 300);
    });

    if (invalidSides) {
      this.toastr.error('Each game should have between 10 and 300 sides.).', 'Error');
      this.spinner.hide();
      return;
    }

    this.gameTitles = gameData;
        this.spinner.hide();
      }, error => {
        // Handle error response
        this.toastr.error(error.error.message, 'Error');
        this.spinner.hide();
      });
    }
    isNextButtonDisabled(): boolean {
      // Check if any game has characterMet set to "Yes"
      return this.gameTitles.some(game => game.characterMet === 'Yes');
    }

    // formatGameTitles(data: any[]): any[] {
    //   return data.map(game => {
    //     const fileName = game.fileName.replace(/\.csv$/, '');
    //     // Check if either side exceeds its respective character limit for any of the sides in the game
    //     const characterMet = game.sides.some(side => side.sideA.length > 50 || side.sideB.length > 80) ? 'Yes' : 'No';
        
    //     // Here you can also update individual characterMet for each side if needed
        
    //     const sidesWithCharacterMet = game.sides.map(side => {
    //       return { ...side, characterMet: (side.sideA.length > 50 || side.sideB.length > 80) ? 'Yes' : 'No' };
    //     });
    
    //     // Add characterMet property to the game object
    //     return { ...game, fileName, sides: sidesWithCharacterMet, characterMet };
    //   });
    // }

    formatGameTitles(data: any[]): any[] {
      return data.map(game => {
        const fileName = game.fileName.replace(/\.csv$/, '');
    
        // Check if either side exceeds its respective character limit for any of the sides in the game
        const sideAExceeded = game.sides.some(side => side.sideA.length > 50 || side.sideA.length < 1);
        const sideBExceeded = game.sides.some(side => side.sideB.length > 80 || side.sideB.length < 1);
    
        // Check if any side exceeds its character limit
        const characterMet = sideAExceeded || sideBExceeded ? 'Yes' : 'No';
    
        if (characterMet === 'Yes') {
          // If any side exceeds its character limit, set characterMet to 'Yes'
          return { ...game, fileName, characterMet };
        } else {
          // Check if the file name exceeds the character limit
          const fileNameCharacterMet = this.isFileNameExceeded(fileName) ? 'Yes' : 'No';
          return { ...game, fileName, characterMet: fileNameCharacterMet };
        }
      });
    }
    
    
    onSubmit() {
      // Prepare the payload
      console.log("hiihjfd",this.templateValue)
      const payload = this.gameTitles.map(game => {
        if (this.templateValue==="0000"){
        const templateId = game.teplateId;
        
          return {
            gameId: game.gameId,
            title: game.fileName, // Assuming fileName is the title
            subjectId: this.subjectValue.id, // Assuming you have an id property in subjectValue
            templateId: templateId, // Use the extracted templateId
            userId: this.userId.id, // Assuming you have an id property in userId
            pro: this.pro,
            tags: this.tags,
            gameContents: game.sides.map(side => {
              return {
                id: side.id, // Assuming you have an id property for each side
                sideA: side.sideA,
                sideB: side.sideB,
                deleted: side.deleted
              };
            })
          };
      
      } else {
        return {
          gameId: game.gameId,
          title: game.fileName, // Assuming fileName is the title
          subjectId: this.subjectValue.id, // Assuming you have an id property in subjectValue
          templateId: this.templateValue.id, // Assuming you have an id property in templateValue
          userId:this.userId.id, // Assuming you have an id property in userId
          pro: this.pro,
          tags: this.tags,
          gameContents: game.sides.map(side => {
            return {
              id: side.id, // Assuming you have an id property for each side
              sideA: side.sideA,
              sideB: side.sideB,
              deleted: side.deleted
            };
          })
        };
      }
      });
    
  
      // Call the API to save bulk games
      this.api.saveBulkGames(payload).subscribe(
        (response) => {
          // Handle success response
          this.toastr.success('Bulk games created successfully.', 'Success');
          this.router.navigate(['/game'])
        },
        (error) => {
          // Handle error response
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  
    createGame(){
      this.onSubmit()
    }
    resetUploadFlag() {
      // Reset zipFileUploaded to false when file input is clicked
      this.zipFileUploaded = false;
    }
    
  
    deleteGame(index: number) {
      // Remove the game from the gameTitles array based on the index
      this.gameTitles.splice(index, 1);
      console.log("hii",this.gameTitles)
      // Check if there are no more games, then reset zipFileUploaded to false
      if (this.gameTitles.length === 0) {
        this.zipFileUploaded = false;
      }
    }
    
    deleteSide(index: number) {
      // Find the side with the given index in gameToEdit
      const deletedSide = this.gameToEdit.sides[index];
      // Remove the side from gameToEdit
      this.gameToEdit.sides.splice(index, 1);
    
      // Check if deleting this side changes the characterMet property
      const characterMet = this.gameToEdit.sides.some(side => side.sideA.length > 50 || side.sideB.length > 80 || side.sideA.length < 1 || side.sideB.length < 1) ? 'Yes' : 'No';
      
      // Update the characterMet property of the game
      this.gameToEdit.characterMet = characterMet;
    }

    startEditing(side: any, editingSide: string) {
      // Set the editing flag and editing side for both Side A and Side B
      if (editingSide === 'sideA') {
        side.editingSideA = true;
      } else if (editingSide === 'sideB') {
        side.editingSideB = true;
      }
    }
     
    saveChanges() {
      // Iterate over gameToEdit.sides to save changes
      this.gameToEdit.sides.forEach(side => {
        // Reset editing flag and editing side
        side.editing = false;
        side.editingSide = null;
        side.editingSideA = false;
        side.editingSideB = false;
      });
     // Check if deleting this side changes the characterMet property
     const characterMet = this.gameToEdit.sides.some(side => side.sideA.length > 50 || side.sideB.length > 80 || side.sideA.length < 1 || side.sideB.length < 1) ? 'Yes' : 'No';
      
     // Update the characterMet property of the game
     this.gameToEdit.characterMet = characterMet;
     // If the game title was edited, update the fileName
  if (this.gameToEdit.editingFileName) {
    this.gameToEdit.fileName = this.gameToEdit.updatedFileName;
    // Exit edit mode after saving changes
    this.gameToEdit.editingFileName = false;
  }
      this.modalReference.close();
    }
    isSideALessThanMinLength(sideA: string): boolean {
      return sideA.length < 10;
    }
  
    isSideBExceededMaxLength(sideB: string): boolean {
      return sideB.length > 300;
    }
  
    isNextButtonDisabled1(): boolean {
      // Check if any game has total sides less than 10 or more than 300
     
      return this.gameTitles.some(game => {
        console.log("gdds",game.sides)
        return game.sides.length < 10 || game.sides.length > 300;
      });
    }

    isSidesLengthInvalid(sides: any[]): boolean {
      return sides.length < 10 || sides.length > 300;
    }
    

    
    
    isMoreThanThreeTags(): boolean {
      return this.tags.length > 3;
    }
    isFileNameExceeded(fileName: string): boolean {
      // Exclude ".zip" and check if fileName length exceeds 30
      return fileName.replace('.zip', '').length > 30;
    }
    isFileNameLimitExceeded(): boolean {
  // Check if any fileName exceeds the character limit
  return this.gameTitles.some(game => this.isFileNameExceeded(game.fileName));
}

toggleEditFileName(game: any) {
  // Toggle the editing mode
  game.editingFileName = !game.editingFileName;
  // If the user is switching to edit mode, initialize updatedFileName with the current value
  if (game.editingFileName) {
    game.updatedFileName = game.fileName;
  }
}

deleteAllGames() {
  // Clear the gameTitles array
  this.gameTitles = [];
  // Disable the Next button
  if (this.gameTitles.length === 0) {
    this.zipFileUploaded = false;
  }
}


     
  

}

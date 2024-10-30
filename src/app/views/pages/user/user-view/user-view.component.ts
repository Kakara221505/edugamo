import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  gameactive:boolean=false;
  gamecreated:boolean=false;
  gameflagged:boolean=false;
  gameuser:boolean=false;
  favorites:boolean=false;
  playlistactive:boolean=false;
  profile:boolean=false;
  subscription:boolean=false;
  isData: number;

  data: any='Games';
  game:any ='GamesCreated';
  gameplayed:boolean=false;
  displayStyleModel = 'none';
  id: any;
  displayName: any;
  firstName: any;
  lastName: any;
  email: any;
  mobileNo: any;
  plan: any;
  banned: any;
  dateOfJoining: any;
  lastActiveDate: any;
  totalGameCreated: any;
  top3PlayedSubjects: any;
  gameCreated: any;
  playList: any;
  favorite: any;
  subscriptions: any;
  gameCreate: any;
  flaggedGames: any;
  flaggedGamesByUserName: any;
  gamePlayed: any;
  profileData: any;
  totalGamesBanned: any;
  score: any;
  playlist: any;
  playlistInfo: any;
  bannedUser: any;
  playlistId: any;
  topTags: any;
  countryCode: any;
  top3Playedgame: any;
  imageUrl: any;
  showDeleteIcon: boolean = false;
  showModel:boolean
  basicModalCloseResult: string;
  editedImageFile: File = null;
  role: any;
  constructor(private modalService: NgbModal,private api: UserService,private router: Router,private toastr: ToastrService,private activatdRoute: ActivatedRoute,private calendar: NgbCalendar,private spinner: NgxSpinnerService) { }

  currentDate: NgbDateStruct;

  ngOnInit(): void {
    this.id= this.activatdRoute.snapshot.params['id']
    this.userData();
   
    this.currentDate = this.calendar.getToday();
    if(this.data=='Games' || this.game=='GamesCreated'){
      this.isData=1
      this.gameactive=true
      this.playlistactive=false
      this.favorites=false
      this.profile=false
      this.gameplayed=false
      this.gameflagged=false
      this.gameuser=false
      this.subscription=false
      this.gamecreated=true
      
      
    }
  }

  openBasicModal(content) {
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }
// User Info Data
userData(){
  this.spinner.show()
  this.api.getUserData(this.id).subscribe((res:any) => {
  this.id=res.data.id;
  this.displayName=res.data.displayName;
  this.firstName=res.data.firstName;
  this.lastName=res.data.lastName;
  this.email=res.data.email;
  this.role=res.data.role
  this.countryCode=res.data.countryCode;
  this.mobileNo=res.data.mobileNo;
  this.plan=res.data.plan;
  this.bannedUser=res.data.bannedUser
  this.dateOfJoining=res.data.dateOfJoining;
  this.lastActiveDate=res.data.lastActiveDate;
  this.totalGamesBanned=res.data.totalGamesBanned;
  this.score=res.data.score;
  this.totalGameCreated=res.data.totalGameCreated;
  this.top3PlayedSubjects=res.data.top3PlayedSubjects;
  this.top3Playedgame=res.data.top3MostPlayedGames;
  this.topTags=res.data.top3PlayedTags;
  this.gameCreate=res.data.gameCreated;
  this.playList=res.data.playList;
  this.favorite=res.data.favorites
  this.subscriptions=res.data.subscription
  this.flaggedGames=res.data.flaggedGames
  this.flaggedGamesByUserName=res.data.flaggedGamesByUserName
  this.gamePlayed=res.data.gamePlayed
  this.profileData=res.data.profile
  this.imageUrl = res.data.imageUrl
  console.log(this.imageUrl)
  console.log(this.gameCreated)
  this.playlistId = res.data.playList.id
  // const emailDomain = this.email.split('@')[1];
  if (this.role === 'ROLE_ADMIN') {
    this.showModel=true
  } else {
    this.showModel=false
  }
  this.spinner.hide()
  });
}

editedImageUrl: string = '';

previewImage(event: any) {
  const imageInput = event.target;
  
  if (imageInput.files && imageInput.files[0]) {
    this.editedImageFile = imageInput.files[0]; // Set the editedImageFile property

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.editedImageUrl = e.target.result;
    };

    reader.readAsDataURL(imageInput.files[0]);
  }
  this.updateImage()
}

updateImage() {
  // Check if an edited image file is selected
  this.modalService.dismissAll();
    const formData = new FormData();
    formData.append('image', this.editedImageFile);

    this.spinner.show();

    // Call the API to update the image
    this.api.updateImage(formData, this.id).subscribe(
      (response: any) => {    
       this.userData();
       this.spinner.hide();
        this.editedImageUrl = '';
        this.editedImageFile = null; // Clear the editedImageFile property
       
      },
      (error) => {
        this.spinner.hide();
        // Handle API error (e.g., display an error message)
        console.error('Error updating image', error);
        // Optionally, show an error message to the user
        this.toastr.error('Failed to update the image.', 'Error');
      }
    );
  
}








// Game Info Data
gameData(){
  this.spinner.show()
  this.api.getGameData(this.id).subscribe((res:any) => {
    this.spinner.hide()
    });
}

  // tab info data
  getData(text:any){
    this.spinner.show()
    if(this.data=='Games' || this.game=='GamesCreated'){
      this.isData=1
      this.gameactive=true
      this.playlistactive=false
      this.favorites=false
      this.profile=false
      this.gameplayed=false
      this.gameflagged=false
      this.gameuser=false
      this.subscription=false
      this.gamecreated=true
      
      
    }
    if(this.data=='Playlist'){
      this.isData=2
      this.playlistactive=true
      this.gameplayed=false
      this.gameactive=false
      this.gameflagged=false
      this.gameuser=false
      this.favorites=false
      this.gamecreated=false
      this.profile=false
      this.subscription=false
    }
    if(this.data=='Favorites'){
      this.isData=3
      this.favorites=true
      this.gameplayed=false
      this.gameactive=false
      this.gameflagged=false
      this.gameuser=false
      this.gameactive=false
      this.playlistactive=false
      this.gamecreated=false
      this.profile=false
      this.subscription=false
      
    }
    if(this.data=='Profile'){
      this.isData=4
      this.profile=true
      this.gameplayed=false
      this.gameactive=false
      this.gameflagged=false
      this.gameuser=false
      this.favorites=false
      this.gameactive=false
      this.playlistactive=false
      this.gamecreated=false
      this.subscription=false
      
    }
    if(this.data=='Subscription'){
      this.isData=5
      this.subscription=true
      this.gameplayed=false
      this.gameactive=false
      this.gameflagged=false
      this.gameuser=false
      this.profile=false
      this.favorites=false
      this.gameactive=false
      this.playlistactive=false
      this.gamecreated=false
      
    }
    this.spinner.hide()
    
  }

  // game data

  getGameData(text:any){
    this.spinner.show()
    if(this.game=='GamesCreated'){
      this.isData=6
      this.isData=1
      this.gamecreated=true
      this.gameplayed=false
      this.gameflagged=false
      this.gameuser=false
      this.subscription=false
      this.playlistactive=false
      this.favorites=false
      this.profile=false
    }
    if(this.game=='GamesPlayed'){
      this.isData=1
      this.isData=7
      this.gameplayed=true
      this.gamecreated=false
      this.gameflagged=false
      this.gameuser=false
      this.subscription=false
      this.playlistactive=false
      this.favorites=false
      this.profile=false
    }
    if(this.game=='GamesFlagged'){
      this.isData=8
      this.gameflagged=true
      this.gameplayed=false
      this.gamecreated=false
      this.gameuser=false
      this.subscription=false
      this.playlistactive=false
      this.favorites=false
      this.profile=false
      
    }
    if(this.game=='GamesUser'){
      this.isData=9
      this.gameuser=true
      this.gameflagged=false
      this.gameplayed=false
      this.gamecreated=false
      this.subscription=false
      this.playlistactive=false
      this.favorites=false
      this.profile=false
    }
    this.spinner.hide()
    
  }


  // get Playlist
  


  // get Document
  document(){
    this.displayStyleModel = 'block';
  }
  export(){

  }

  // Model

  openVerticalCenteredModal() {
    this.api.getCsvData(this.id).subscribe((res:any) => {
      const file = res;
      const url = window.URL.createObjectURL(
        new Blob([res as BlobPart], { type: 'application/user.xlsx' })
      );
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.setAttribute('style', 'display: none');
      link.href = url;
      link.download = `User-Information.xlsx`;
      link.click();
     this.toastr.success("File downloaded successfully",`Success`)
      this.router.navigate(['/user/view/',this.id]);
    });
  
  }
  viePlayList(content,id:any) {
    console.log(id)
    this.api.getPlaylistData(id).subscribe((res:any) => {
      this.playlistInfo=res.data
    });
    this.modalService.open(content, {}).result.then((result) => {
      console.log("hii1")
      
    }).catch((res) => {});
  }

  removeUserImage(){
      this.spinner.show()
      this.api.imageDelete(this.id).subscribe((res:any) => {
        this.userData();
        this.spinner.hide()
        });
    
  }
  handleBackImg(id){
    console.log(id)
    let url = "url('../../../../assets/images/Use it or lose it.png')"
    if(id === 'Use it or Lose it'){
      return url
    }
    let url2 = "url('../../../../assets/images/Knowledge is power.png')"
    if(id === 'Knowledge Is Power'){
      return url2
    }
    let url3 = "url('../../../../assets/images/Cognitive Connection.png')"
    if(id === 'Cognitive Connections'){
      return url3
    }
    let url4 = "url('../../../../assets/images/Brain Food.png')"
    if(id === 'Brain Food'){
      return url4
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GameService {

 

constructor(private http: HttpClient) {
  
 }

options = { withCredentials: true };


  getGame(page:any){
 
    return this.http.get(
      environment.baseUrl +`getAllGames?pageNo=`+page,
      { withCredentials: true }
    );
  }

  getSubject(page:any){
 
    return this.http.get(
      environment.baseUrl +`getAllGames?pageNo=`+page,
      { withCredentials: true }
    );
  }
  getAllTempalet(order:any,type:any){
    return this.http.get(
      environment.baseUrl +`getAllTemplates?order=${order}&type=${type}`,
      { withCredentials: true }
    );
  }
  changeStatuFlagged(id:any,status:any){
    return this.http.put(
      environment.baseUrl + `changeStatusTemplate?id=`+id +'&status='+status,null,
      { withCredentials: true }
    );
  }
  GameTemplateExport() {
    return this.http.get(
      environment.baseUrl+`exportTemplates`,
      { withCredentials: true,responseType: 'blob' }
    );
  }
  createAgameList(order:any,pageNo:any,type:any){
    return this.http.get(
      environment.baseUrl+`getCreateAGame?order=${order}&pageNo=${pageNo}&type=${type}`,
      { withCredentials: true}
    );
  }
  getAllSubjectForCreateGame(){
    return this.http.get(
      environment.baseUrl+`getAllSubjectsForGame`,
      { withCredentials: true}
    );
  }
  createAgameExport(order:any,pageNo:any,type:any){
    return this.http.get(
      environment.baseUrl+`exportCreateAGame?order=${order}&pageNo=${pageNo}&type=${type}`,
      { withCredentials: true,responseType: 'blob'}
    );
  }
  createAgameView(id: any){
    return this.http.get(
      environment.baseUrl+`getGamesById?id=`+id,
      { withCredentials: true }
    );
  }
  createAgameDelete(gameId: any){
    return this.http.delete(
      environment.baseUrl+`deleteGame?gameId=`+gameId,
      { withCredentials: true }
    );
  }

  deletegameContent(id: any){
    return this.http.delete(
      environment.baseUrl+`deleteGameContent?id=`+id,
      { withCredentials: true }
    );
  }
  createAgameAdd(AddCreateGame: any){
    return this.http.post(
      environment.baseUrl+`createGame`,
      AddCreateGame,
      { withCredentials: true }
    );
  }
  getDisplayNameForCreateGame(){
    return this.http.get(
      environment.baseUrl+`getUserDisplayname`,
      { withCredentials: true }
    );
  }
getAllTempaletForCreateGame(order:any,type:any){
  return this.http.get(
    environment.baseUrl +`getAllTemplates?order=${order}&type=${type}`,
    { withCredentials: true }
  );
}

uploadBulkImport(fileData: FormData) {
  return this.http.post(
    environment.baseUrl + `uploadBulkImport`,
    fileData,
    { withCredentials: true }
  );
}

saveBulkGames(payload: any[]) {
  return this.http.post(
    environment.baseUrl + `saveBulkGames`,
    payload,
    { withCredentials: true }
  );
}



updateCreateAgameAdd(updateCreateGame: any){
  return this.http.put(
    environment.baseUrl+`updateGame`,
    updateCreateGame,
    { withCredentials: true }
  );
}
createGameAddPlaylist(){
  return this.http.get(
    environment.baseUrl +`getAllPlayList`,
    { withCredentials: true }
  );
}
addPlaylistGameInCreate(playListId:any){
  return this.http.post(
    environment.baseUrl + `addGamesInPlayList`,
    playListId,
    { withCredentials: true },
  );
}
addPlaylist(addPlaylist:any){
  return this.http.post(
    environment.baseUrl + `addPlaylist`,
    addPlaylist,
    { withCredentials: true },
  );
}

getAllGameCreated(createdBy:any,keyword:any,order:any,pageNo:any,status:any,type:any){
  return this.http.get(
    environment.baseUrl +`getAllGamesCreated?createdBy=${createdBy}&keyword=${keyword}&order=${order}&pageNo=${pageNo}&status=${status}&type=${type}`,
    { withCredentials: true }
  );
}

gameCreatedExport(createdBy:any,keyword:any,order:any,pageNo:any,status:any,type:any){
  return this.http.get(
    environment.baseUrl+`exportAllGamesCreated?createdBy=${createdBy}&keyword=${keyword}&order=${order}&pageNo=${pageNo}&status=${status}&type=${type}`,
    { withCredentials: true,responseType: 'blob'}
  );
}
statusChange(id: any,status:any){
  return this.http.put(
    environment.baseUrl+`changeStatusFlaggedGames?gameId=`+id +'&status='+status,null,
    { withCredentials: true }
  );
}
gameCreatedView(id: any){
  return this.http.get(
    environment.baseUrl+`getGamesById?id=`+id,
    { withCredentials: true }
  );
}
deleteGameCreated(gameId: any){
  return this.http.delete(
    environment.baseUrl+`deleteFlaggedGames?gameId=`+gameId,
    { withCredentials: true }
  );
}
}

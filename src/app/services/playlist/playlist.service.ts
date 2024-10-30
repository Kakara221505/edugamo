import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient) { }
  options = { withCredentials: true };

  getAllPlaylist(keyword:any,order:any,pageNo:any,type:any){
    return this.http.get(
      environment.baseUrl + `getMyPlayList?keyword=${keyword}&order=${order}&pageNo=${pageNo}&type=${type}`,
      { withCredentials: true }
    );
  }
  getExportPlaylist(keyword:any,order:any,pageNo:any,type:any){
    return this.http.get(
      environment.baseUrl + `exportPlayList?keyword=${keyword}&order=${order}&pageNo=${pageNo}&type=${type}`,
      { withCredentials: true,responseType: 'blob' }
    );
  }
  addPlaylist(addPlaylist:any){
    return this.http.post(
      environment.baseUrl + `addPlaylist`,
      addPlaylist,
      { withCredentials: true },
    );
  }
  deletePlaylist(playlistId:any){
    return this.http.delete(
      environment.baseUrl+`deletePlaylist?playlistId=`+playlistId,
      { withCredentials: true }
    );
  }
  playlistView(id: any){
    return this.http.get(
      environment.baseUrl+`viewPlayListById?id=`+id,
      { withCredentials: true }
    );
  }
  statusChange(id: any,status:any){
    return this.http.put(
      environment.baseUrl+`changeStatusGamesInPlayList?gameId=`+id +'&status='+status,null,
      { withCredentials: true }
    );
  }
  getAllConsent(category:any,filterDate:any,keyword:any,order:any,pageNo:any,type:any){
    return this.http.get(
      environment.baseUrl + `getConsentLog?category=${category}&filterDate=${filterDate}&keyword=${keyword}&order=${order}&pageNo=${pageNo}&type=${type}`,
      { withCredentials: true }
    );
  }
  getExportConsent(category:any,filterDate:any,keyword:any,order:any,pageNo:any,type:any){
    return this.http.get(
      environment.baseUrl + `exportConsentLog?category=${category}&filterDate=${filterDate}&keyword=${keyword}&order=${order}&pageNo=${pageNo}&type=${type}`,
      { withCredentials: true,responseType: 'blob' }
    );
  }
  getAllGamesPlaylist(id:any){
    return this.http.get(
      environment.baseUrl+`getAdminAllGames?playlistId=${id}`,
      { withCredentials: true }
    );
  }

  deleteGame(gameId:any,id: any){
    return this.http.delete(
      environment.baseUrl+`removeGamesInPlayList?gameId=${gameId}&id=${id} `,
      { withCredentials: true }
    );
  }

  addPlaylistGame(playListId:any){
    return this.http.post(
      environment.baseUrl + `addGamesInPlayList`,
      playListId,
      { withCredentials: true },
    );
  }
  getUserPlaylist(keyword:any,order:any,pageNo:any,type:any){
    return this.http.get(
      environment.baseUrl + `getUserPlayList?keyword=${keyword}&order=${order}&pageNo=${pageNo}&type=${type}`,
      { withCredentials: true }
    );
  }
  getExportUserPlaylist(keyword:any,order:any,pageNo:any,type:any){
    return this.http.get(
      environment.baseUrl + `exportUserPlayList?keyword=${keyword}&order=${order}&pageNo=${pageNo}&type=${type}`,
      { withCredentials: true,responseType: 'blob' }
    );
  }
  deleteUserPlaylist(playlistId:any){
    return this.http.delete(
      environment.baseUrl+`deletePlaylist?playlistId=`+playlistId,
      { withCredentials: true }
    );
  }
}

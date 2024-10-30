import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FlaggedService {

  constructor(private http: HttpClient) { }
  options = { withCredentials: true };

  getAllFlagged(keyword:any,order:any,pageNo:any,type:any){
    return this.http.get(
      environment.baseUrl + `getFlaggedGames?keyword=${keyword}&order=${order}&pageNo=${pageNo}&type=${type}`,
      { withCredentials: true }
    );
  }
  flaggedGameExport(keyword:any,order:any,pageNo:any,type:any){
    return this.http.get(
      environment.baseUrl + `exportFlaggedGames?keyword=${keyword}&order=${order}&pageNo=${pageNo}&type=${type}`,
      { withCredentials: true,responseType: 'blob' }
    );
  }
  banFlaggedGame(gameId: any){
    return this.http.put(
      environment.baseUrl+`banFlaggedGames?gameId=`+gameId,null,
      { withCredentials: true }
    );
  }
  deleteFlaggedGame(gameId: any){
    return this.http.delete(
      environment.baseUrl+`deleteFlaggedGames?gameId=`+gameId,
      { withCredentials: true }
    );
  }
  viewFlaggedGame(id: any){
    return this.http.get(
      environment.baseUrl+`viewFlaggedGames?id=`+id,
      { withCredentials: true }
    );
  }
  statusChange(id: any,status:any){
    return this.http.put(
      environment.baseUrl+`changeStatusFlaggedGames?gameId=`+id +'&status='+status,null,
      { withCredentials: true }
    );
  }
}

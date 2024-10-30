import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface UpdateUserResponse {
  success: boolean;
  message?: string; // Optional property if your API returns a message
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

 

constructor(private http: HttpClient) {
  
 }
options = { withCredentials: true };
getUser(page:any){
  return this.http.get(
    environment.baseUrl+`getUserDetails?pageNo=`+page,
    { withCredentials: true }
  );
}
// userInfo
getUserData(id: number){
 
  return this.http.get(
    environment.baseUrl+`getUserById?id=`+id,
    { withCredentials: true }
  );
}

dashboardAllData(type:any){
  return this.http.get(
    environment.baseUrl+`getAllDashboardDetails?type=${type}`,
    { withCredentials: true }
  );
}

// playListInfo
getPlaylistData(id: number){
 
  return this.http.get(
    environment.baseUrl+`getGamesByPlaylistId?id=`+id,
    { withCredentials: true }
  );
}

// Export Csv
getCsvData(id: number){
 
  return this.http.get(
    environment.baseUrl+`exportUserByUserId?userId=`+id,
    { withCredentials: true,responseType: 'blob'}
  );
}


// gameInfo
getGameData(id: number){
  return this.http.get(
    environment.baseUrl+`getGamesByPlaylistId?id=`+id,
    { withCredentials: true }
  );
}


// serach User
searchUser(banned:any,user: any,pageNo:any,subscription:any,shortKeyword:any,sortType:any){
  return this.http.get(
    environment.baseUrl+`getUserDetailsFilter?bannedUser=`+banned+'&keyword='+user+'&pageNo='+pageNo+'&subscription='+subscription+'&sortKeyword='+shortKeyword+'&sortType='+sortType,
    { withCredentials: true }
  );
}

// Banned User

blockUser(userId: any){
  return this.http.post(
    environment.baseUrl+`banUser?id=`+userId,null,
    { withCredentials: true }
  );
}
//  pro user
makeProUser(userId: any){
  return this.http.put(
    environment.baseUrl+`changeUserPro?id=`+userId,null,
    { withCredentials: true }
  );
}

userListCsv(endDate: any,keyword: any,startDate:any,filterKeyword:any,bannedUser:any,subscription:any,sortkeyword:any,sortType:any) {
  return this.http.get(
    environment.baseUrl+`exportUserCsv?endDate=`+endDate+'&keyword='+keyword+'&startDate='+startDate +'&bannedUser='+ bannedUser+'&filterKeyword='+filterKeyword +'&sortKeyword='+ sortkeyword  +'&sortType='+ sortType +'&subscription='+subscription,
    { withCredentials: true,responseType: 'blob' }
  );
}

socialSharing(order:any,pageNo:any,type:any){
  return this.http.get(
    environment.baseUrl+`getSocialSharingTracking?order=${order}&pageNo=${pageNo}&type=${type}`,
    { withCredentials: true }
  );
}
socialSharingExport(order:any,pageNo:any,type:any){
  return this.http.get(
    environment.baseUrl+`exportSocialSharingTracking?order=${order}&pageNo=${pageNo}&type=${type}`,
    { withCredentials: true,responseType: 'blob' }
  );
}
policyPrivacy(type:any){
  return this.http.get(
    environment.baseUrl+`getTermsAndPrivacyPolicy?type=${type}`,
    { withCredentials: true }
  );
}
policyPrivacyEdit(data:any){
  return this.http.post(
    environment.baseUrl+`saveTermsAndPrivacyPolicy`,
    data,
    { withCredentials: true }
  );
}
imageDelete(id: number){
  return this.http.delete(
    environment.baseUrl+`removeImage?id=`+id,
    { withCredentials: true }
  );
}

updateImage(formData:any,id: number){
  return this.http.put(
    environment.baseUrl + `editImage/`+id,
    formData,
    { withCredentials: true }
  );
}

updateEmailAndPhone(payload: any): Observable<UpdateUserResponse> {
  return this.http.post<UpdateUserResponse>( environment.baseUrl +`updateEmailAndPhone`, payload, { withCredentials: true });
}


}

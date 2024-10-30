import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }
  options = { withCredentials: true };

 getAllSubject(date:any,keyword:any,order:any,pageNo:any,status:any,type:any){
    return this.http.get(
      environment.baseUrl + `getAllSubjects?date=${date}&keyword=${keyword}&order=${order}&pageNo=${pageNo}&status=${status}&type=${type}`,
      { withCredentials: true }
    );
  }

 addSubject(formData:any){
    return this.http.post(
      environment.baseUrl + `addSubject`,
      formData,
      { withCredentials: true }
    );
  }
 changeStatusSubject(id:any,status:any){
    return this.http.put(
      environment.baseUrl + `changeStatus?id=`+id +'&status='+status,null,
      { withCredentials: true }
    );
  }
 editSubject(formData:any){
    return this.http.put(
      environment.baseUrl + `updateSubject`,
      formData,
      { withCredentials: true }
    );
  }
 getSubject(id:any){
    return this.http.get(
      environment.baseUrl + `getSubjectById?id=`+id ,
      { withCredentials: true }
    );
  }

 edit(title:any,status:any,formData:any,id:any){
    return this.http.post(
      environment.baseUrl + `aupdateSubject?id=`+id + '&title='+title +'&status='+status,
      formData,
      { withCredentials: true }
    );
  }

  subjectListCsv(date:any,keyword:any,order:any,pageNo:any,status:any,type:any) {
    return this.http.get(
      environment.baseUrl+`exportSubject?date=${date}&keyword=${keyword}&order=${order}&pageNo=${pageNo}&status=${status}&type=${type}`,
      { withCredentials: true,responseType: 'blob' }
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManualVerificationService {
  constructor(private http: HttpClient) { }
  options = { withCredentials: true };

  getAllManualList(keyword:any,pageNo:any,pageSize:any){
    return this.http.get(
      environment.baseUrl + `getManualVerificationRequest?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`,
      { withCredentials: true }
    );
  }

  verifyManualVerification(id: number) {
    return this.http.post(environment.baseUrl + `verifyManyalVerification?id=${id}`, {}, this.options);
  }
  
}

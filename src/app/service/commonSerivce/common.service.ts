import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../notificationService/notification.service';
import { apiService } from '../constants/apiurls.constants';

const headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})


export class CommonService {
  // TOASTR CSS CLASS NAME
  public SUCCESS_TOAST = 'success-snackbar';
  public ERROR_TOAST = 'error-snackbar';
  public WARNING_TOAST = 'warning-snackbar';

  profile: any = {};

  constructor(private http: HttpClient, private toastr: NotificationService) { }

    // POST FUNCTION
    postfunction(url,data): Observable<any> {
      return this.http.post(url, data, { headers: headers });
    }

    // GET FUNCTION
    getfunction(url): Observable<any> {
      return this.http.get(url, { headers: headers });
    }

    // DELETE FUNCTION
    deletefunction(url, email){
      return this.http.delete(url+'/:'+ email, { headers: headers });
    }

    // PUT FUNCTION
    updatefunction(url, data): Observable<any> {
      return this.http.put(url, data, {headers: headers});
    }

    // GET METHOD USING PROMISE
    getFunction(url){
      let promise: any;

      promise = new Promise((resolve, reject) => {
        this.http.get(url, {observe: 'response' as 'response'}).toPromise()
        .then((async (res) => {
            if( res['body']['status'] === 0 ){
              resolve(res);
            } else {
              this.toastr.snackBar(res['body']['message'], 'error-snackbar')
            }
        }), err => {
          reject(err);
        })
      })
      return promise;
    }

    async profileDetails(){
      let res: any;

      res = await this.getFunction(apiService.GET_USER)
      if ( res['body']['status'] === 0 ){
        if ( this.nullUndefined(res['body']['data']) ){
          return this.profile = res['body']['data'];
        } else 
          this.toastr.snackBar(res['body']['message'], 'error-snackbar');
      } else {
        this.toastr.snackBar(res['body']['message'], 'error-snackbar');
      }
    }

    // TO CHECK DATA OR NOT
    nullUndefined(data){
      if ( data == null || data == undefined || data == 'null' || data == 'N/A' || data == 'n/a' || data == 'NaN' || data == 'undefined' || data == NaN)
        return data = '';
      else
        return data;
    }

    loadCountryList(): Observable<any>{
      return this.http.get("./assets/country.json");
    }


    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}

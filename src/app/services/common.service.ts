import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'app-global';
 

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http:HttpClient){
  }
  
  savetodatabase(dataset:any, excel_Id: any){
    return this.http.post(Api+  'Excelupload/create', { dataset, excel_Id }).toPromise();
  }
  savetodatabasesecond(dataset:any){
    return this.http.post(Api+  'Excelupload/createsecond', dataset).toPromise();
  }
  updateExcelHistory(createdDate: string, createdBy: string, Remark: string, rcount: any): Promise<any>{
    return this.http.post(Api+ 'Excelupload/updateExcelHistory', {createdDate, createdBy, Remark, rcount}).toPromise();
  }
  updateuserHistory(dataset:any){ 
    return this.http.post(Api+  'MainDataset/updateuserHistory', dataset).toPromise();
  }
  updatestock(dataset:any){
    return this.http.post(Api+  'MainDataset/updatestock', dataset).toPromise();
  }

  getDatafromMain(filterdataset:any){
    return this.http.post(Api+  'MainDataset/select', filterdataset).toPromise();
  }
  getDatafromSecond(filterdataset:any){
    return this.http.post(Api+  'MainDataset/getDatafromSecond', filterdataset).toPromise();
  }

  LoaduserId(filterdataset:any){
    return this.http.post(Api+  'MainDataset/LoaduserId', filterdataset).toPromise();
  }

  getDatafromMainDropdown(filterdataset:any){
    return this.http.post(Api+  'MainDataset/selectdropdown', filterdataset).toPromise();
  }
  
  saveItemQty(filterdataset:any){

    return this.http.post(Api+  'MainDataset/insertqty', filterdataset).toPromise();
  }
  loadItemQty(filterdataset:any){

    return this.http.post(Api+  'MainDataset/selectOrderHistory', filterdataset).toPromise();
  }
  userselect(){

    return this.http.post(Api+  'user/select', "").toPromise();
  }
  userinsert(dt:any){

    return this.http.post(Api+  'user/insert', dt).toPromise();
  }
  login(dt:any){

    return this.http.post(Api+  'user/login', dt).toPromise();
  }
  loadhistory(){
    return this.http.post(Api+ 'Excelupload/selectExcelUploadHistory', "").toPromise();
  }
  selectExcelDateCollection(){
    return this.http.post(Api+ 'Excelupload/selectExcelCreatedDate', "").toPromise()
  }
  dataWithExcelIdx(excelIdx: string) {
    return this.http.post(Api + 'Excelupload/selectDatawithExcelIdx', { excelIdx }).toPromise();
  }

}

import { Component, ViewChild, HostListener } from '@angular/core';

import * as XLSX from 'xlsx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { CommonService } from 'src/app/services/common.service';
import { SocketService } from 'src/app/services/socket.service';


export class users {
  username: string = "";
  password: string = "";
  rack: string = "";
  idx: string = "";
}


@Component({
  selector: 'app-excelupload',
  templateUrl: './excelupload.component.html',
  styleUrls: ['./excelupload.component.scss']
})
export class ExceluploadComponent {

  @ViewChild('fileInput') fileInput: any;
  @ViewChild('remarkInput') remarkInput: any;
  
  isSubmitted: boolean = false;

  
  arrayBuffer: any;
  file: any;

  dataset: any;
  dataset1: any;
  issearch = 0;
  upload1() {
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      //  console.log('running')
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });


      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.dataset = (XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      console.log(this.dataset)
      console.log(this.dataset.length)

      var first_sheet_name1 = workbook.SheetNames[1];
      var worksheet1 = workbook.Sheets[first_sheet_name1];
      this.dataset1 = (XLSX.utils.sheet_to_json(worksheet1, { raw: true }));
      console.log(this.dataset1)

    }
    fileReader.readAsArrayBuffer(this.file);
  }
  ret: any = "";
  ret1: any = "";
  ret3: any = "";
  
  savetodatabase() {
    this.isSubmitted = true;
    this.issearch = 1;
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    currentDate.setMinutes(currentDate.getMinutes() + 30);
    const createdDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');


    console.log(createdDate)
    const createdBy = localStorage.getItem('groupno') || ''; // Get current user

    if (this.fileInput && this.remarkInput) {
    const Remark = this.remarkInput.value;
    //return this.http.post('http://localhost:4100/api/Excelupload/create', this.dataset).toPromise();
    const rcount = this.dataset.length

        this.serv.updateExcelHistory(createdDate, createdBy, Remark, rcount).then(ret => {
          this.ret3 = ret;

          const excel_Id = ret.newIdx;
          
          console.log(excel_Id)

          this.serv.savetodatabase(this.dataset, excel_Id).then(ret => {
            
            this.ret = ret;
             
            this.serv.savetodatabasesecond(this.dataset1).then(ret => {
              this.ret1 = ret;
              this.issearch = 0;

              window.location.reload();
            });
      
          });
        })};

      

    
  }

  upload() {
    this.file = this.fileInput.nativeElement.files[0];
    // console.log( this.file)
    this.upload1();
  }
  incomingfile(event: any) {
    this.file = event.target.files[0];
  }

  downloadExcelTemplate(): void{
    // const filePath = './assets/ExcelTemplate.xls'
    const filePath = '/assets/ExcelTemplate.xls'

    const link = document.createElement('a');
    link.href = filePath;

    link.download = 'ExcelTemplate.xls';

    link.click();
  }





//for excel upload history table ===>>

  usr = new users();
  details: any;
  rcount: any;
  ret2: any = "";
   
  userType: any;
  constructor(public serv: CommonService,public http: HttpClient ) {
    this.loaddata();
    var usertype = localStorage.getItem('groupno');
    this.userType = usertype;
    console.log(this.userType)

  } 
  loaddata() {
    this.usr = new users();
    this.serv.loadhistory().then(ret2 => {
      console.log(ret2)
      this.ret2 = ret2;
      this.details = this.ret2.data[0];
       
    })
  }
}









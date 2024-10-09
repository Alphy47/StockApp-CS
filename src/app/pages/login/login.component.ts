import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent {
  constructor(  public router:Router,public loginserv:CommonService ) { }
  username:string='';
  password:string='';
  dateOptions: any = [];


  ret:any;
  ret1:string = '';
  excelIdx:string='';
  ret3:any;

  ngOnInit(): void {
    this.loginserv.selectExcelDateCollection().then((ret:any) => {

      this.dateOptions = ret.excelCreatedDates.recordsets[0]
      var infos = ret.excelCreatedDates.recordsets[0]
      
      console.log(infos)

    }).catch(error => {
      console.error('Error fetching Excel created dates:', error);
    })
  }
  

  errorMessage: string = '';
  isSubmitted: boolean = false;

  signin(){

    console.log(this.excelIdx)
    this.isSubmitted = true;
    this.errorMessage = '';


    //login when date selected

    if (this.excelIdx != '') {
      this.loginserv.dataWithExcelIdx(this.excelIdx).then((ret3:any) => {

        if (ret3.excelIdxData[0].excelIdx.length > 0){
          console.log(ret3.excelIdxData[0].excelIdx)
          localStorage.setItem('excelIdx', ret3.excelIdxData[0].excelIdx);
          localStorage.setItem('createdDate', ret3.excelIdxData[0].createdDate);
          //var excelIdx = localStorage.getItem('createdDate') as string;
          console.log('a date selected')

          
          if(this.username==""){
            this.errorMessage="*Text field should not be empty."
          }
          else if(this.password==""){
            this.errorMessage="*Text field should not be empty."
          } else{
            this.loginserv.login({username:this.username,password:this.password}).then(ret=>{
      
             this.ret=ret;
      
             if(this.ret.data[0].length>0){
                 console.log(this.ret.data[0])
                 localStorage.setItem('groupno',this.ret.data[0][0].Userdetails1)
                 localStorage.setItem('userIdx',this.ret.data[0][0].Idx)
      
                this.router.navigate(['/dashboard']) 
                
             } else{
              this.errorMessage="Username or Password is incorrect"
             }
      
               
          });
        }

        }
      
 

      }).catch(error => {
          console.error("Error fetching data:", error);
      });
  } else {

    //login when date not selected

    var createdDate = localStorage.getItem('createdDate') as string;

      createdDate='';
      console.log(createdDate)
      console.log('running without date')
      localStorage.setItem('createdDate', createdDate);

      var selectedExcelIdx = localStorage.getItem('excelIdx') as string;
      selectedExcelIdx='00000000-0000-0000-0000-000000000000';
      console.log(selectedExcelIdx)
      localStorage.setItem('excelIdx', selectedExcelIdx);

      if(this.username==""){
        this.errorMessage="*Text field should not be empty."
      }
      else if(this.password==""){
        this.errorMessage="*Text field should not be empty."
      } else{
        this.loginserv.login({username:this.username,password:this.password}).then(ret=>{
  
         this.ret=ret;
  
         if(this.ret.data[0].length>0){
             console.log(this.ret.data[0])
             localStorage.setItem('groupno',this.ret.data[0][0].Userdetails1)
             localStorage.setItem('userIdx',this.ret.data[0][0].Idx)
  
            this.router.navigate(['/dashboard']) 
            
         } else{
          this.errorMessage="Username or Password is incorrect"
         }
  
           
      });
    }
    }

    
  }


  
  signup(){

  }
  forgetpassword(){

  }

}

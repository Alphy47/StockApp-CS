import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  group:any="";
  createdDate:any;
constructor( public router:Router){
 this.group =localStorage.getItem('groupno') ;
 var selectedDate = localStorage.getItem('createdDate') as string;
 

if(selectedDate == ''){
  selectedDate = '--no specific date selected--'
  this.createdDate = selectedDate
}else{
  this.createdDate = selectedDate;
}
console.log(this.group,this.createdDate)
 
}

logout(){
  // this.group =localStorage.getItem('groupno') ;
  localStorage.removeItem('groupno');
  localStorage.removeItem('createdDate');
  this.router.navigate(['/']) 
}
}

import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

export class users {
  username: string = "";
  password: string = "";
  rack: string = "";
  idx: string = "";
}


@Component({
  selector: 'app-userhandle',
  templateUrl: './userhandle.component.html',
  styleUrls: ['./userhandle.component.scss']
})
export class UserhandleComponent {
  usr = new users();
  details: any;
  ret: any;
  userType: any;
  constructor(public serv: CommonService) {
    this.loaddata();
    var usertype = localStorage.getItem('groupno');
    this.userType = usertype;
    console.log(this.userType)

  }
  loaddata() {
    this.usr = new users();
    this.serv.userselect().then(ret => {
      console.log(ret)
      this.ret = ret;
      this.details = this.ret.data[0];
      if (this.userType != "Admin") {
        this.details = this.details.filter((ret: any) => {
          if (ret.Userdetails1 == this.userType) {
            return ret;
          }

        })

      }
    })
  }

  savedata() {
    if (this.usr.idx == "") {
      this.usr.idx = "97CFA6D3-89FF-4395-9BD8-40198CC2A299";
    }
 console.log(this.usr.rack ,this.details.Userdetails1)
    if (this.userType  == "Admin" ||  this.userType  != "Admin" && this.usr.rack == this.userType) {
     
      this.serv.userinsert(this.usr).then(ret => {
        this.loaddata();
      })
    }


  }
  update(subLst: any) {
    this.usr.username = subLst.UserName;
    this.usr.rack = subLst.Userdetails1;
    this.usr.idx = subLst.Idx;
    this.usr.password = subLst.Userdetails2;


  }
}

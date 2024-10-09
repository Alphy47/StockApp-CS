import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExceluploadComponent } from './pages/excelupload/excelupload.component';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardviewComponent } from './pages/dashboardview/dashboardview.component';
import { HeaderComponent } from './pages/header/header.component';
import { OrderhistoryComponent } from './pages/orderhistory/orderhistory.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './pages/login/login.component';
import { UserhandleComponent } from './pages/userhandle/userhandle.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import{HashLocationStrategy, LocationStrategy}from '@angular/common';

const config: SocketIoConfig = {
	url: "http://localhost:4100", // socket server url;
	options: {
		transports: ['websocket']
	}
}


@NgModule({
  declarations: [
    AppComponent,
    ExceluploadComponent,
    DashboardviewComponent,
    HeaderComponent,
    OrderhistoryComponent,
    LoginComponent,
    UserhandleComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,MatAutocompleteModule,MatSlideToggleModule,SocketIoModule.forRoot(config), Ng2SearchPipeModule,
  ],
  providers: [  { 
    provide: LocationStrategy, 
     useClass:HashLocationStrategy,
    
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexmonsterPivotModule } from 'ng-flexmonster';
import { TabsComponent } from './tabs/tabs.component';
import { FlexMonsterComponent } from './flex-monster/flex-monster.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { RouteDefinitions } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { ViewFilesComponent } from './view-files/view-files.component';
import { MatDialogModule } from '@angular/material';


@NgModule({

  declarations: [
    AppComponent,
    TabsComponent,
    FlexMonsterComponent,
    HomeComponent,
    ViewFilesComponent
  ],
  imports: [
    MatDialogModule,FormsModule, ReactiveFormsModule,
    BrowserModule, BrowserAnimationsModule, MatTabsModule, FlexmonsterPivotModule,  RouterModule.forRoot(RouteDefinitions),  HttpClientModule, FileUploadModule
  ],
  // exports: [MatTabsModule,ViewFilesComponent],
  providers: [MatDialogModule],
  bootstrap: [AppComponent],
  entryComponents: [
  ViewFilesComponent
  ]
})
export class AppModule { }

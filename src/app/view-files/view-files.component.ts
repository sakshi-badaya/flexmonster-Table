import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent implements OnInit {
  files=[];
  fileName;
  constructor(private http: HttpClient, public dialogRef: MatDialogRef<ViewFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    console.log(dialogData);
    //  this.files=dialogData; 
  }

  ngOnInit() {
    if (this.dialogData.dialogData != null) {
      console.log(this.dialogData);
      
      this.files.push(this.dialogData.dialogData);
    } else {
      this.getFiles();
    }
  }

  donloadFile(file) {
    this.dialogRef.close(file);
  }

  getFiles() {
    this.getAllFiles().subscribe(data => {
      this.files = data['data']
      console.log(this.files)
    }),//console.log(data),
      error => console.log('Error downloading the file.'),
      () => console.info('OK');
  }
  getAllFiles() {
    return this.http.get('http://52.165.145.32:9091/viewFiles');
  }

}

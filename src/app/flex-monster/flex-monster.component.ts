import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-flex-monster',
  templateUrl: './flex-monster.component.html',
  styleUrls: ['./flex-monster.component.css']
})
export class FlexMonsterComponent implements OnInit {
  

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  constructor(private http: HttpClient) { }
  uploader: FileUploader;
  isDropOver: boolean;
  fileName: string;
  files;

  ngOnInit(): void {
    this.getFiles();
    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploader = new FileUploader({ url:'http://52.165.145.32:9091/uploadFile/', autoUpload: true, headers: headers });

    this.uploader.onCompleteAll = () => alert('File uploaded');
  }

  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }

  fileClicked() {
    this.fileInput.nativeElement.click();
    console.log();
    
  }

  donloadFile(fileName) {
    this.getFile(fileName).subscribe(data => saveAs(data, `${fileName}`)),
    console.log(fileName),
      error => console.log('Error downloading the file.'),
      () => console.info('OK');
  }

  getFile(fileName) {
    return this.http.get('http://52.165.145.32:9091/downloadFile/' + fileName,
      { responseType: 'blob' });
  }

  getFiles() {
    this.getAllFiles().subscribe(data => {this.files = data['data']
    console.log(data['data'])}),//console.log(data),
      error => console.log('Error downloading the file.'),
      () => console.info('OK');
  }

  getAllFiles() {
    return this.http.get('http://52.165.145.32:9091/viewFiles');
  }
  }
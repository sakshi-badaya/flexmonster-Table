import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerPath } from '../constant';
import { FlexmonsterPivot } from 'ng-flexmonster';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ViewFilesComponent } from '../view-files/view-files.component';
import { FileUploader } from 'ng2-file-upload';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  files: any;
  uploader: FileUploader;
  file: any;
  ngOnInit() {
    this.getFiles();
    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploader = new FileUploader({ url: 'http://52.165.145.32:9091/uploadFile/', autoUpload: true, headers: headers });

    this.uploader.onCompleteAll = () => alert('File uploaded');
  }


  constructor(public dialog: MatDialog, private route: Router, private http: HttpClient) { }
  @ViewChild('pivot', { static: false }) pivot: FlexmonsterPivot;


  flexmonster() {
    this.route.navigate([routerPath.flexMonster]);
  }

  pivotReport = {
    dataSource: {
      // filename: 'https://cdn.flexmonster.com/data/data.csv'
    },
    slice: {
      rows: [
        { uniqueName: 'Destination' },
        { uniqueName: 'Color' },
        { uniqueName: '[Measures]' }
      ],
      columns: [
        { uniqueName: 'Category' },
        { uniqueName: 'Country' }
      ],
      measures: [
        { uniqueName: 'Price', aggregation: 'sum' },
        { uniqueName: 'Quantity', aggregation: 'sum' }
      ]
    }
  };

  onPivotReady(pivot: Flexmonster.Pivot): void {
    console.log('[ready] FlexmonsterPivot', this.pivot);
  }

  onCustomizeCell(cell: Flexmonster.CellBuilder, data: Flexmonster.CellData): void {
    // console.log("[customizeCell] FlexmonsterPivot");
    if (data.isClassicTotalRow) {
      cell.addClass('fm-total-classic-r');
    }
    if (data.isGrandTotalRow) {
      cell.addClass('fm-grand-total-r');
    }
    if (data.isGrandTotalColumn) {
      cell.addClass('fm-grand-total-c');
    }
  }

  customizeToolbar(toolbar) {
    // get all tabs
    let tabs = toolbar.getTabs();
    toolbar.getTabs = function () {
        // delete the first tab
        delete tabs[0];
        return tabs;
    }
  }

  onReportComplete(): void {
    this.pivot.flexmonster.off('reportcomplete');
    this.pivot.flexmonster.setReport({
      dataSource: {
        // dataSourceType: 'json',
        // filename: 'https://cdn.flexmonster.com/data/data.json'
      }
    });
  }


  donloadFile(file: string) {

    if (file.includes('.json')) {

      this.pivot.flexmonster.load('http://52.165.145.32:9091/downloadFile/' + file);

      // let e = this.donloadFiles(file);
      // console.log(e);
      
      // let fileReader = new FileReader();
      // let read
      // fileReader.onload = (e) => {
      //   console.log(fileReader.result);
      //   read = fileReader.result;
      // }
      
      // this.pivotReport = fileReader.result;
      // console.log(read);
      // let x = 'http://52.165.145.32:9091/downloadFile/' + file
      // this.pivot.flexmonster.setReport({
      //   dataSource: {
      //     browseForFile:false
      //   }
      // });

    } else {

      this.pivot.flexmonster.setReport({
        dataSource: {
          // dataSourceType: 'json',
          filename: 'http://52.165.145.32:9091/downloadFile/' + file
        }
      });
    }
  }
  donloadFiles(fileName) {
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



  viewFiles() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {};
    let dialogRef = this.dialog.open(ViewFilesComponent, {
      width: '600px',
      height: 'auto',
      data: {
        "dialogData": null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('$$$$$', result);
      if (result != null || result != undefined) {
        this.donloadFile(result);
      }
    });
  }


  fileChanged(e) {
    this.file = e.target.files[0];
    console.log(this.file);

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.file);

  }


  save(){

  //   this.pivot.flexmonster.save(
  //    'myreport.json', 
  //     'server',
  //     'reportSaved',
  //     'http://52.165.145.32:9091/uploadFile',     
  // );
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {};
  let dialogRef = this.dialog.open(ViewFilesComponent, {
    width: '600px',
    height: 'auto',
    data: {
      "dialogData": 'save'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('$$$$$', result);
    if (result != null || result != undefined) {
      var params = {
        filename:result,
        destinationType: 'server',
        url: 'http://52.165.145.32:9091/uploadFile',
        // requestHeaders:headers
      };
      this.pivot.flexmonster.exportTo('csv', params);
      alert('file saved');
    }
  });




  }



  viewDatasource(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {};
    let dialogRef = this.dialog.open(ViewFilesComponent, {
      width: '600px',
      height: 'auto',
      data: {
        "dialogData": 'https://raw.githubusercontent.com/abhishek-sisodiya/UploadDownloadFile-Java-/master/uploads/pivot.csv'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('$$$$$', result);
      if (result != null || result != undefined) {
        this.pivot.flexmonster.setReport({
          dataSource: {
            filename: result
          }
        });
      }
    });
  }


}

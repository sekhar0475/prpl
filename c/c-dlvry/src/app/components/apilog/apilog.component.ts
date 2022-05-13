import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from 'src/app/core/services/api.service';
import { ApilogDialogComponent } from 'src/app/dialog/apilog-dialog/apilog-dialog.component';

@Component({
  selector: 'app-apilog',
  templateUrl: './apilog.component.html',
  styleUrls: ['./apilog.component.css']
})
export class ApilogComponent implements OnInit{

  userName = JSON.parse(sessionStorage.getItem('all')).data.responseData.user.username;
  displayedColumns = ['id', 'apiName',
    'errorCode', 'errorMsg', 'extInterface',
    'interfaceName', 'lastRetry', 'logDate',
    'objName', 'payload', 'retries', 'userId'];
  dataSource;
  countOfAll;
  showTable = false;
  reportTitle;
  categoryType;
  selectedDays: any = 5;
  selectedRetries: any = 'All';
  sectionData;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) set matSort(sort: MatSort) {
    if(this.dataSource){
      this.dataSource.sort = sort;
    }
  }

  constructor(private _apiservice: ApiService, private spinner: NgxSpinnerService, public dialog: MatDialog, public router: Router, private toastr : ToastrService) {
  }

  ngOnInit() {
    if(sessionStorage.getItem('defaultLandingTarget')){
      sessionStorage.removeItem("defaultLandingTarget");
    }
    this.sectionData = [];
    this.spinner.show();
    this.getSourceData(this.selectedDays, this.selectedRetries);
  }

  getSourceData(days, retries) {
    this._apiservice.getApilog(days, retries).subscribe((resp) => {
      this.sectionData = resp['data'];
      this.dataSource = new MatTableDataSource(resp['data']);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    }, (err) =>{
      this.spinner.hide();
      this.toastr.error('Service not avilable');
    });
  }

  selectNumberOfDays(days) {
    this.spinner.show();
    this.selectedDays = days;
    if (this.selectedDays !== undefined) {
      this.getSourceData(this.selectedDays, this.selectedRetries);
    }
  }

  selectNumberOfRetries(retries) {
    this.spinner.show();
    this.selectedRetries = retries;
    if (this.selectedRetries !== undefined) {
      this.getSourceData(this.selectedDays, this.selectedRetries);
    }
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  openModal(payLoad) {
    const dialogRef = this.dialog.open(ApilogDialogComponent,
      {
        data: payLoad,
        panelClass: 'apilog-dilog',
        minWidth: '500px',
        hasBackdrop: true,
      }
    );
    dialogRef.afterClosed().subscribe((submit) => {
    })
  }

  greeting() {
    let myDate = new Date();
    let hrs = myDate.getHours();

    let greet;

    if (hrs < 12)
      greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      greet = 'Good Evening';

    return greet
  }

}

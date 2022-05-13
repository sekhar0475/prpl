import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-view-branches',
  templateUrl: './view-branches.component.html'
})
export class ViewBranchesComponent implements OnInit{
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['Bname', 'Btype', 'BstartDate', 'BendDate'];
  dataSource: any;

  constructor( public dialogRef: MatDialogRef<ViewBranchesComponent>, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.branchData);
    this.dataSource.sort = this.sort;
  }
  

  closeDialog(): void {
      
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      panelClass: 'creditDialog',
      data:{message:'Are you sure ?'},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close(false);
      }else{
        console.log('Keep Open');
      }
    });

  }



}

export interface PeriodicElement {
  Bname: string; 
  Btype: string;
  BstartDate: Date;
  BendDate: Date;
}



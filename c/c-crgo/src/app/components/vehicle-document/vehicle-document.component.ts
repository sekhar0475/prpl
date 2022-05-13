import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxPermissionsService } from 'ngx-permissions';

import { AppSetting } from '../../app.setting';
import { ApiService } from '../../core/services/api.service';
import { ErrorConstants } from '../../core/models/constants';
import { AuthorizationService } from '../../core/services/authorization.service';
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';


@Component({
  selector: 'app-vehicle-document',
  templateUrl: './vehicle-document.component.html',
  styleUrls: ['./vehicle-document.component.css'],
  providers : [DatePipe]
})
export class VehicleDocumentComponent implements OnInit {
  @ViewChild("docform", null) docformupload: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  editflow = false;
  isDisable: boolean;
  deptName: any;
  entityType : string = 'VEHICLE';
  docExpiryDate = '';
  displayedColumns: string[] = ['Kname', 'KdocumentType','subType','expiry','view', 'delete'];
  fileModel : any = {};
  vehicleID : number;
  VehicleNumber : string;
  displayedColumnsForPending : string[] = ['docType'];
  pendingDocsUplod : any = [];
  noRecdFundMsg: boolean;
  pengingListDataSource : any;
  minDate : Date;
  perList: any = [];

  fileToUpload: File = null;
  uploadedFileName: string = '';
  fileBrowseflag: boolean = false;
  isValidDocExpiryDate: boolean = false;

  uploadedFileName_upper: string ='';

  // for Security Fix
  public upldFilSub = new BehaviorSubject(null);
  public upldFilObs$ = this.upldFilSub.asObservable();
  // end for Security Fix

  constructor(private apiSer: ApiService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private acrouter: ActivatedRoute,
    private datePipe : DatePipe,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.authorizationService.setPermissions('DOCUMENT UPLOAD');
    this.perList = this.authorizationService.getPermissions('DOCUMENT UPLOAD') == null ? [] : this.authorizationService.getPermissions('DOCUMENT UPLOAD');
    this.permissionsService.loadPermissions(this.perList);

    this.isDisable = false;
    this.vehicleID = AppSetting.vehicleId;
    this.VehicleNumber = AppSetting.vehicleNumber;

    let e = new Date();
    e.setDate(e.getDate() + 1);
    this.minDate = e;

    this.acrouter.params.subscribe(params => {
      if (params['editflow']) {
        this.editflow = params['editflow'];
        this.isDisable = true;
      }
    });

    this.getDocumentDetailbyId();
    this.upldFilObs$.subscribe(fileName =>{
      this.uploadedFileName = fileName;
        let ele = document.getElementById('uploadedFileName');
        if(ele){
           ele.textContent = fileName;
        }
    })
  }

  //On file browse
  handleFileInput(event) {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      this.fileToUpload = fileList[0];
      this.fileToUpload = fileList[0];
      let fileSizeTemp = this.fileToUpload.size / 1024 / 1024;
      if (fileSizeTemp > 5) {
        this.upldFilSub.next(this.fileToUpload.name);  //  security fix
        this.fileBrowseflag = false;
        this.toaster.error("File size should be less then 5 MB");
        return
      }
      if (this.fileToUpload.name && !this.validateFileLength(this.fileToUpload.name)) {
        this.upldFilSub.next(this.fileToUpload.name);  //  security fix
        this.fileBrowseflag = false;
        this.toaster.error("File Name should not be greater than 50");
        return;
      }
      if (this.fileToUpload.name && this.validateFileExt(this.fileToUpload.name)) {
        this.upldFilSub.next(this.fileToUpload.name);  //  security fix
        this.fileBrowseflag = true;
      } else {
        this.fileBrowseflag = false;
        this.upldFilSub.next(this.fileToUpload.name);  //  security fix
        this.toaster.error("Invalid file type");
      }

      if(document.getElementById("uploadedFileName")){
        this.uploadedFileName_upper =  document.getElementById("uploadedFileName").textContent;
      }
    }

  }
  clearDate() {
    this.fileModel.docExpiryDate = '';
  }

  postDocumentUploadDetail() {
    this.spinner.show();
     
    if (this.validateUploadFile(this.fileModel.docTypeId, this.fileModel.subTypeId, this.fileModel.docExpiryDate, this.uploadedFileName)) {
      /*
      * Required Date format: yyyy-MM-dd
      * User input date formate: mm/dd/yyyy
      */
      var formattedDate = this.datePipe.transform(this.fileModel.docExpiryDate, 'yyyy-MM-dd');

      let requestData: any;

      requestData = {
        entityId: this.vehicleID,
        entityType : this.entityType,
        expDt : formattedDate ? formattedDate: '',
        lkpDocTypeId : this.fileModel.docTypeId,
        lkpDocSubtypeId : this.fileModel.subTypeId
    }

      console.log("testRequest : ", requestData);
      this.apiSer.postDocumentUploadDetail(requestData, this.fileToUpload)
        .subscribe(data => {
          this.toaster.success("Saved Successfully");

          //Refesh Page data
          this.fileModel = {};
          this.uploadedFileName = '';
          this.upldFilSub.next('');  //  security fix
          this.docformupload.resetForm();
          this.getDocumentDetailbyId();
        }, error => {
          this.toaster.error(ErrorConstants.errorNotFound);
          console.log(error);
          this.spinner.hide();
        });
    } else {
      this.spinner.hide();
    }

  }

  subTypeId = ''; //sub document type id, required for post document data
  docTypeId = ''; //input for service, need to update as per service
  // moduleEntityId='';
  docData: any = {}
  subDocData: any = {}
  docTypeList = [] //for docuementType dropdown
  moduleEntityList = []
  subTypeNameList = []
  docList = [] // for available uploaded/searched documents

  dataSource: any;
  getDocumentDetailbyId() {
    this.noRecdFundMsg = false;
    this.spinner.show();
    this.apiSer.documentTypeData(this.entityType, this.vehicleID)
      .subscribe(data => {
        this.docData = data;

        this.docTypeList = this.docData.data.referenceData.docTypeList;
        this.subTypeNameList = this.docData.data.referenceData.docSubTypeList;
        this.pendingDocsUplod = this.docData.data.referenceData.pendingDocumentList;   
        this.pengingListDataSource = new MatTableDataSource(this.pendingDocsUplod);
        this.spinner.hide();
        /**
         * To get the docType name and SubDocType name from ref list 
         * against received codes in document list
         */
        this.docList = [];
        for (let obj of this.docData.data.responseData) {
          var docObj = {
            "docRef": "",
            "docType": "",
            "docSubtype": "",
            "expDt": "",
            "docPathRef": "",
            "docId": '',
            "lkpDocTypeId": "",
            "lkpDocSubtypeId": "",
            "signedUrl" : ""
          };
          //set all values in doc object
          docObj.docRef = obj.docRef;
          docObj.expDt = obj.expDt;
          docObj.docPathRef = obj.docPathRef;
          docObj.docId = obj.id;
          docObj.lkpDocTypeId = obj.lkpDocTypeId;
          docObj.lkpDocSubtypeId = obj.lkpDocSubtypeId;
          docObj.signedUrl = obj.signedUrl;
          for (let docTypeObj of this.docTypeList) {
            if (obj.lkpDocTypeId == docTypeObj.id) {
              docObj.docType = docTypeObj.descr;
            }
          }
          for (let subTypeObj of this.subTypeNameList) {
            if (obj.lkpDocSubtypeId == subTypeObj.id) {
              docObj.docSubtype = subTypeObj.descr;
            }
          }
          this.docList.push(docObj)
          this.dataSource = new MatTableDataSource(this.docList);
          this.cloneDoc = new MatTableDataSource(this.docList);
          this.dataSource.sort = this.sort
        }
       
      },(error) => {
          this.spinner.hide();
          this.toaster.error(ErrorConstants.getValue(404));
        });
  }

  // To get the list of sub documents type on change of document type dropdown
  subTypeList //for subDocumentType dropdown
  subDocTypeData() {
    console.log(this.fileModel.docTypeId, "selected doc type id");

    if (this.fileModel.docTypeId == 'undefined' || this.fileModel.docTypeId == null || this.fileModel.docTypeId == '') {
      //do not hit the service and set the subtype list as empty
      this.subTypeList = [];
      this.fileModel.subTypeId = '';
    } else {
      this.spinner.show()
      this.apiSer.getSubDocTypeData(this.fileModel.docTypeId).subscribe(
        data => {
          var resData: any = data;
          this.subTypeList = resData.data.responseData;
          this.spinner.hide();
          console.log(data, "sub Document list");
        },
        error => {
          this.spinner.hide();
          this.toaster.error(ErrorConstants.getValue(404));
        }

      )
    }
  }

  /*
  * This will be called on click of download icon to download the document
  */
  downloadDocument(element) {
    //this.spinner.show();
    let fileName = element.docPathRef;
    var fName = fileName.substr(fileName.lastIndexOf('/') + 1, fileName.length);
    var a = document.createElement("a");
    a.href = element.signedUrl;
    a.download = fName;
    a.click();
    this.toaster.success("Download Successfully");

    // this.apiSer.postDownloadDocument(fileName).subscribe(data => {
    //     var a = document.createElement("a");
    //     var blob = new Blob([data], { type: "octet/stream" });
    //     var url = window.URL.createObjectURL(blob);
    //     a.href = url;
    //     a.download = fName;
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //     this.spinner.hide();
    //     this.toaster.success("Download Successfully");
       
    //   }, (error) => {
    //     this.spinner.hide();
    //   //console.log(error, "Error in download")
    // });
  }

  /**diseable all date before current date in angular*/
  todaydate: Date = new Date();
  /**toggle button action */
  isToggle = false;
  swapOffToggleButton() {
    this.uploadedFileName = '';
    if (!this.isToggle) {
      console.log("on");
      this.isToggle = true;
    } else {
      console.log("off");
      this.isToggle = false;
    }
  }


  validateUploadFile(userDocTypeId, userSubTypeId, userDocExpiryDate, fileName) {
    let errorMsg = "";
    if (userDocTypeId == "") {
      errorMsg += "Please select document type!";
    } else if (userSubTypeId == "") {
      errorMsg += "Please select sub type!"
    } 
    /*------- Expiry Date is not required ------- */
    // else if (userDocExpiryDate == "") {
    //   errorMsg += "Please select expiry date!"
    // } 
    else if (!this.validateFileLength(fileName)) {
      errorMsg += "File Name should not be greater than 50";
    } else if (!this.validateFileExt(fileName)) {
      errorMsg += "Invalid file type";
    } else if (!this.validateFileSize()) {
      errorMsg += 'File size should be less than 5 MB';
    }
    if (errorMsg.length > 0) {
      this.toaster.error(errorMsg);
      //alert(errorMsg);
      return false
    }
    return true;
  }

  cloneDoc:any;
  searchDoc() {
    this.noRecdFundMsg = false;
    this.dataSource = this.cloneDoc;
    if (this.dataSource !== undefined) {
      this.docList = this.dataSource.data.filter(v => this.fileModel.docTypeId == v.lkpDocTypeId && this.fileModel.subTypeId == v.lkpDocSubtypeId);

      this.dataSource = new MatTableDataSource(this.docList);
      if (this.docList.length == 0) {
        this.noRecdFundMsg = true;
      }else{
        this.dataSource = new MatTableDataSource(this.docList);
      }
    }
  }
  validateFileSize() {
    let fileSizeTemp = this.fileToUpload.size / 1024 / 1024;
    if (fileSizeTemp > 5) {
      return false;
    } else {
      return true;
    }
  }

  validFileExtensions = [".jpg", ".jpeg", ".png", ".doc", ".pdf", ".docx"];
  validFormatsMgs: string = 'Allowed file formats are ' + this.validFileExtensions.join(', ');
  // fileName
  validateFileExt(fileName) {
    if (fileName && fileName.length < 51) {
      var blnValid = false;
      var ext = fileName.substr(fileName.lastIndexOf("."), fileName.length);
      console.log(ext, "file extension");
      for (var j = 0; j < this.validFileExtensions.length; j++) {
        var valExtension = this.validFileExtensions[j];
        if (ext.toLowerCase() == valExtension.toLowerCase()) {
          blnValid = true;
          break;
        }
      }
      return blnValid;
    }
  }

  validateFileLength(fileName) {
    if (fileName && fileName.length > 51) {
      return false;
    } else { return true }
  }

  /*---------- check valid date ---------- */
  checkValidDate(value) {
    let expYear = parseInt(this.datePipe.transform(value, 'yyyy'));
    if (expYear > 9999) {
      this.fileModel.docExpiryDate = '';
    }
  }

  onSubmit() {
    const dialog = this.dialog.open(confimationdialog, {
      data: { message: "Do you want to create Associate Staff?"},
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'  
    })

    dialog.afterClosed().subscribe(res => {
      if(res) {
        this.router.navigate(['/asso_cargo-contract/associate-staff'], {skipLocationChange: true})
      } else {
        this.router.navigate(['/asso_cargo-contract/asso_cargo'], {skipLocationChange: true})
      }
    })
  }

  deleteKycDocument(element) {
    console.log('element', element);
    console.log('datasore', this.dataSource);
    const dialog = this.dialog.open(confimationdialog, {
      data: { message: "Are you sure want to delete?"},
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'  
    })

    dialog.afterClosed().subscribe(res => {
      if(res) {
        let documentID = element.docId;
        this.apiSer.post('secure/v1/document/delete/associate/'+documentID).subscribe(res => {
          this.dataSource.data = this.dataSource.data.filter(function( obj ) {
            return obj.docId !== element.docId;
          });
          this.getDocumentDetailbyId();   
          this.spinner.hide();
          this.toaster.success('Document has been deleted');
        });
      }
    })
  }

}

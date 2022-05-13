import { HostListener, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { SearchCustomerComponent } from "src/app/dialog/search-customer/search-customer.component";
import { ApiService } from "src/app/core/services/api.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { NavigationStart, Router, ActivatedRoute } from "@angular/router";
import { AppSetting } from "src/app/app.setting";
import { PaymentCommercialGen} from "src/app/core/models/paymentTermsModel";
import { PayoutGenDetailComponent } from "./payout-gen-detail/payout-gen-detail.component";
import * as _ from "lodash";
import { DatePipe } from "@angular/common";
import { Subscription } from 'rxjs';
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';
import { AuthorizationService } from "src/app/core/services/authorization.service";
import { NgxPermissionsService } from "ngx-permissions";

// table 2
export interface PeriodicElement1 {
  ExBranch: string;
  ExAmount: string;
  ExReaspm: string;
  ExSdate: string;
  ExEdate: string;
}

export let browserRefresh = false;
export interface PeriodicElement2 {
  MgBranch: string;
  MgAmount: string;
  MgReaspm: string;
  MgSdate: string;
  MgEdate: string;
}

@Component({
  selector: "app-booking-payout",
  templateUrl: "./booking-payout.component.html",
  styleUrls: ["./booking-payout.component.css"],
  providers: [PaymentCommercialGen, DatePipe],
})
export class BookingPayoutComponent implements OnInit {
  @ViewChild(PayoutGenDetailComponent, null) childValidation: PayoutGenDetailComponent;
  
  
  subscription: Subscription;
  // @ViewChild('cust', {static: false}) cust: PaymentCommercialGen;
  // @ViewChild('gen', {static: false}) gen: PaymentCommercialGen;
  

  displayedColumns1: string[] = [
    "ExBranch",
    "ExAmount",
    "ExReaspm",
    "ExSdate",
    "ExEdate",
  ];
  dataSourceExBranch = new  MatTableDataSource();

  displayedColumns2: string[] = [
    "MgBranch",
    "MgAmount",
    "MgReaspm",
    "MgSdate",
    "MgEdate",
  ];
  dataSourceMgBranch = new  MatTableDataSource()// = ELEMENT_DATA_2;

  // displayedColumns3: string[] = ['Flabel', 'Fvalue'];
  // dataSource3 = ELEMENT_DATA_3;

  // Data set end for Tables

  // Variables Difine
  cusBpayment;
  soffhide;
  hrHideEx;
  HoffringBkg;
  hidePerWay;
  addBRemark;
  csBpay;
  otherEAdd;
  netAdd;

  radioButtontncData = [];
  selectortncData = [];
  stringtncData = [];

  contractId;
  associateId;
  paymentData;
  // paymentCommercialData: any; //= PaymentCommercialGen;
  paymentCommercialRefData: any;
  assocAdditionalParamList;
  assocExpenseTypeList;
  assocPaymentTypeList;
  assocPayoutTypeList;
  mdmNotepadList;
  serviceOfferingList;
  vehicleCargoCapacityList;
  attrTypeListTnc = [];
  notepadAttributesList = [];
  branchIds :any = [];
  customerIdList:any = [];
  paymentDataBranch;
  editflow: any;
  editStatusId = AppSetting.editStatus;
  searchNotePad = '';

  maxdate:any;
  minDate:any = new Date();
  minDateStart:any = new Date();
  perList: any = [];

  paymentCommercialData: any = {
    assocCntrId: AppSetting.contractId,
    lkpAssocBkngPayoutCtgyId: null,
    lkpAssocBkngExpnsTypeId: null,
    minAmtPerWaybl: null,
    maxAmtPerWaybl: null,
    addtnlParamFlag: 0,
    lkpAssocAddtnlParamId: null,
    addtnlParamVal: null,
    effectiveDt: null,
    expDt: null,
    exgratiaFlag: 0,
    minGuaranteeFlag: 0,
    promotionApplicableFlag: 0,
    addtnlExpnsFlag: 0,
    addtnlExpnsRemark: '',
    custPymtFlag: 0,
    bookingCommercialEntList : [],
    assocNotepadList: [],
    bookingBranchCommercialList : [],
    bookingCommercialCustomerList :  [],    
    
  };

  
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private acRoute: ActivatedRoute,
    private permissionsService: NgxPermissionsService,
    private authorizationService : AuthorizationService,
    public datePipe: DatePipe
  ) {
    this.contractId = AppSetting.contractId;
    this.associateId = AppSetting.associateId;

    }

  ngOnInit() {
    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    console.log('Permissions List', this.perList);
    this.acRoute.params.subscribe(x => {
      if(x.editflow){
        this.editflow = x.editflow;
      }
      
    })
    this.getCommerceDataWithctrtId();
    //console.log("model", this.paymentCommercialData);
  }

  // Custmer Model Search Start
  openSearchCustomerModal() {
    //console.log('branch', this.branchIds);
    if(this.paymentCommercialData.custPymtFlag){
      if(this.paymentCommercialData.bookingCommercialCustomerList && this.paymentCommercialData.bookingCommercialCustomerList.length > 0){
        this.customerIdList = this.paymentCommercialData.bookingCommercialCustomerList.map(obj => {
          return obj.msaCustId;
        })
      }else{
        this.customerIdList = [];
      }
      const dialogRef = this.dialog.open(SearchCustomerComponent, {    
        data: { 'BranchIds': this.branchIds, 'customerList':  this.paymentCommercialData.bookingCommercialCustomerList  }, // , 'customerList': obj 
        // width: '40vw',
        panelClass: 'mat-dialog-responsive',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        //console.log('result', result);
        if(result){
          this.paymentCommercialData.bookingCommercialCustomerList = JSON.parse(JSON.stringify(result))
        }else if(this.paymentCommercialData.bookingCommercialCustomerList && this.paymentCommercialData.bookingCommercialCustomerList.length > 0){
          this.paymentCommercialData.custPymtFlag = 1;
        }else{
          this.paymentCommercialData.custPymtFlag = 0;
        }
        
      })

    }else{
      this.paymentCommercialData.bookingCommercialCustomerList = [];
    }
    

  }

  notepadData() {
    //console.log('this.notepadAttributesList', this.notepadAttributesList);
    this.radioButtontncData = this.notepadAttributesList.filter(function (
      filt
    ) {
      return filt.attributeTypeId == 1;
    });
    this.selectortncData = this.notepadAttributesList.filter(function (filt) {
      return filt.attributeTypeId == 2;
    });
    this.stringtncData = this.notepadAttributesList.filter(function (filt) {
      return filt.attributeTypeId == 3;
    });
  }
 
  getbranchWithctrtId() {
    this.spinner.show();
    this.apiService
      .get(`secure/v1/networkcontract/contracts/branches/${this.contractId}`)
      .subscribe(
        (res) => {
          
          if (res.data) {
            this.paymentDataBranch = res.data.responseData;
            this.branchIds = res.data.responseData.map(obj => {
              return obj.branchId;
            })
            let exBranchTemp  = JSON.parse(JSON.stringify(res.data.responseData));
            let mgBranchTemp  = JSON.parse(JSON.stringify(res.data.responseData));
            let  exBranchTempNew  = [] , mgBranchTempNew  = [] ;
            exBranchTemp.filter(element => {        
              element.amtType = "EX-GRATIA"              
              element.assocBranchId = element.id;
              element.amt = null;
              element.reason = '';
              delete element.id;
              delete element.assocBranchVehicles;
              delete element.branchName;
              delete element.branchType;              
              let tempArr;
              if(this.dataSourceExBranch && this.dataSourceExBranch.data && this.dataSourceExBranch.data.length > 0 ){
                tempArr = _.find(this.dataSourceExBranch.data , { 'assocBranchId': Number(element.assocBranchId) });
              }
              if(!tempArr || tempArr.length == 0){
                exBranchTempNew.push(element);    
              }else {
                exBranchTempNew.push(tempArr);
              }
                       
            });
            this.dataSourceExBranch.data = exBranchTempNew;
            mgBranchTemp.forEach(element => {
              element.amtType = "MG"; 
              element.assocBranchId = element.id;
              element.amt = null;
              element.reason = '';
              delete element.id;
              delete element.branchName;
              delete element.branchType;
              delete element.assocBranchVehicles;
              // return element;  
              let tempArr;
              if(this.dataSourceMgBranch && this.dataSourceMgBranch.data && this.dataSourceMgBranch.data.length > 0){
                tempArr = _.find(this.dataSourceMgBranch.data , { 'assocBranchId': Number(element.assocBranchId) });
              }      
               
              if(!tempArr || tempArr.length == 0){
                mgBranchTempNew.push(element);    
              }else {
                mgBranchTempNew.push(tempArr);
              }
                       
            });
            //console.log('exBranchTemp',exBranchTemp, mgBranchTempNew);
            this.dataSourceMgBranch.data = mgBranchTempNew;
            this.exgratiaAndMGChange();
            this.spinner.hide();
          }
          this.spinner.hide();
        },
        (err) => {
          // this.toastr.error()
          //console.log(
          //   "Message : " + err.error.message,
          //   +"Path : " + err.error.path
          // );
          this.spinner.hide();
        }
      );
      
  }

  getCommerceDataWithctrtId() {
    this.notepadAttributesList = [];
    this.spinner.show();
    this.apiService
      .get(`secure/v1/networkcontract/commercial/${this.contractId}`)
      .subscribe(
        (res) => {
          //console.log("res", res);
          if (res.data) {
            this.paymentData = res.data;
            this.paymentCommercialRefData = res.data.referenceData;
            if(res.data.responseData && res.data.responseData.id ){
              this.paymentCommercialData = res.data.responseData;
              this.setDataObject(this.paymentCommercialData);
            }
            this.attrTypeListTnc = this.paymentCommercialRefData.attrTypeList;
            for (var item of this.paymentCommercialRefData.mdmNotepadList) {
              delete item.status;
              if (item.attributeTypeId === 3) {
                item.notepadInputVal = item.attributeValue;
              }
              if(this.paymentCommercialData && this.paymentCommercialData.assocNotepadList && this.paymentCommercialData.assocNotepadList.length > 0){
                for (var notepadData of this.paymentCommercialData[
                  "assocNotepadList"
                ]) {
                  if (
                    item.id == notepadData.notepadId &&
                    notepadData.notepadInputVal != undefined
                  ) {
                    item.notepadInputVal = notepadData.notepadInputVal.trim();
                    if(notepadData.status){
                      item.status = notepadData.status;
                    }
                    
                  }
                }
              }

              if (item.attributeTypeId == 1 || item.attributeTypeId == 2) {
                if (item.attributeValue)
                  item.attributeValue = item.attributeValue
                    .toUpperCase()
                    .split(",");
              }
              this.notepadAttributesList.push(item);
            }
          }
          this.notepadData();
          this.getbranchWithctrtId();
          //console.log("this.paymentCommercialData", this.paymentCommercialData);
        },
        (err) => {
          // this.toastr.error()
          //console.log(
          //   "Message : " + err.error.message,
          //   +"Path : " + err.error.path
          // );
          this.spinner.hide();
        }
        
      );
      this.spinner.show();

          
  }
  exgratiaAndMGChange(){   
    if(this.paymentCommercialData.minGuaranteeFlag && this.paymentCommercialData.exgratiaFlag){
      this.paymentCommercialData.bookingBranchCommercialList = [...this.dataSourceExBranch.data, ...this.dataSourceMgBranch.data];
    }else if(this.paymentCommercialData.minGuaranteeFlag && !this.paymentCommercialData.exgratiaFlag){
      this.paymentCommercialData.bookingBranchCommercialList = [...this.dataSourceMgBranch.data];
    } else if(!this.paymentCommercialData.minGuaranteeFlag && this.paymentCommercialData.exgratiaFlag){
      this.paymentCommercialData.bookingBranchCommercialList = [...this.dataSourceExBranch.data];
    }else{
      this.paymentCommercialData.bookingBranchCommercialList = [];
    }
    
  }

  addNewCustomer(){
    this.openSearchCustomerModal() 
  }
  submitPayment(flag) {
    let cloneObject = JSON.parse(JSON.stringify(this.paymentCommercialData));
    this.paymentCommercialData.bookingCommercialEntList.forEach(obj=> {     
      obj.effectiveDt = this.paymentCommercialData.effectiveDt;
      obj.expDt = this.paymentCommercialData.expDt;
      if(this.paymentCommercialData['id']){
        obj.bkngCmrclId = this.paymentCommercialData['id'];
      }
      
    })
    this.paymentCommercialData.bookingCommercialCustomerList.forEach(element=> {
      element.commercialEntList.forEach(obj => {       
        obj.effectiveDt = element.effectiveDt;
        obj.expDt = element.expDt;
        if(this.paymentCommercialData['id']){
          obj.bkngCmrclId = this.paymentCommercialData['id'];
        }
      });
      //console.log('cust',  this.paymentCommercialData);
      delete element["BookingCommercialEntListObjOff"];
      delete element['BookingCommercialEntListObjBook'];
      delete element['BookingCommercialEntListObjPer'];
    })
    let notepadTrans=[]
  // this.spinner.show();
   for(let item of this.radioButtontncData){
     let data1={};
     if(this.paymentCommercialData['id']){
      data1["entityRefId"]= this.paymentCommercialData['id'] ? this.paymentCommercialData['id'] : 0;
      if(item['status']){
        data1["status"]= item['status'];
      }
      

     }
      data1["notepadId"]=item.id;
      data1["notepadInputVal"]=item.notepadInputVal;
     notepadTrans.push(data1);
    }
    for(let item of this.selectortncData){
        let data1={};
        if(this.paymentCommercialData['id']){
          data1["entityRefId"]= this.paymentCommercialData['id'] ? this.paymentCommercialData['id'] : 0;
         }
      data1["notepadId"]=item.id;
      data1["notepadInputVal"]=item.notepadInputVal;
     notepadTrans.push(data1);
    }

    for(let item of this.stringtncData){
       let data1={};
       if(this.paymentCommercialData['id']){
        data1["entityRefId"]= this.paymentCommercialData['id'] ? this.paymentCommercialData['id'] : 0;
       }
     
      data1["notepadId"]=item.id;
      data1["notepadInputVal"]=item.notepadInputVal;
     notepadTrans.push(data1);
    }
    
    if(this.paymentCommercialData && this.paymentCommercialData.assocNotepadList && this.paymentCommercialData.assocNotepadList.length){
      for(let i=0; i<this.paymentCommercialData.assocNotepadList.length;i++) {
        for (let j = 0; j < notepadTrans.length; j++) {
        if(this.paymentCommercialData.assocNotepadList[i].notepadId==notepadTrans[j].notepadId)
            {
              notepadTrans[j]["id"]=this.paymentCommercialData.assocNotepadList[i].id;
              notepadTrans[j]["status"]=this.paymentCommercialData.assocNotepadList[i].status;
              }
              }
    }
  }
    this.paymentCommercialData["assocNotepadList"] = notepadTrans; 
    this.paymentCommercialData["assocNotepadList"].forEach(obj=> {     
      obj.effectiveDt = this.paymentCommercialData.effectiveDt;
      obj.expDt = this.paymentCommercialData.expDt;
    });
    delete this.paymentCommercialData["BookingCommercialEntListObjOff"];
    delete this.paymentCommercialData['BookingCommercialEntListObjBook'];
    delete this.paymentCommercialData['BookingCommercialEntListObjPer'];
    //console.log("data", this.paymentCommercialData);
    if(!this.paymentCommercialData['id']){
      delete this.paymentCommercialData["status"];
      if(this.paymentCommercialData.bookingBranchCommercialList && this.paymentCommercialData.bookingBranchCommercialList.length > 0){
        this.paymentCommercialData.bookingBranchCommercialList.forEach(element => {    
          delete element.status;     
      });
      }

  }
    this.apiService.post(`secure/v1/networkcontract/commercial`, this.paymentCommercialData).subscribe((res) => {
      if(res.status == "SUCCESS"){
        this.getCommerceDataWithctrtId();   
        this.toastr.success(res.message);
        if(flag == 'next'){
          if(this.editflow){
            this.router.navigate(['/asso_network-contract/booking-sla',{ steper:true,'editflow': 'true' }], {skipLocationChange: true});
          }else{
            this.router.navigate(['/asso_network-contract/booking-sla'], {skipLocationChange: true});
          }
        }  
      }else{
        this.paymentCommercialData = cloneObject;
        this. exgratiaAndMGChange();
        this.toastr.error(res.message);
        // this.getCommerceDataWithctrtId();
      }
    }, (err) => {
      this.paymentCommercialData = cloneObject;
      this.exgratiaAndMGChange();
      //console.log('err', err);
      this.toastr.error(err.error.errors.error[0].code + ' : ' + err.error.errors.error[0].description );
    }
    )

    
  }

  setDataObject(objectData){    
    let exBranchTemp = [];
    let mgBranchTemp = [];
    if(objectData.bookingBranchCommercialList && objectData.bookingBranchCommercialList.length > 0){
      objectData.bookingBranchCommercialList.forEach(element => {
        if(element.amtType == "MG"){
          mgBranchTemp.push(element);
        } else{
          exBranchTemp.push(element);
        }
      });
    }


    this.dataSourceExBranch = new MatTableDataSource(
      exBranchTemp
    );
    this.dataSourceMgBranch = new MatTableDataSource(
      mgBranchTemp
    );
  }

  ngAfterViewInit(): void {

    // this.fAssoPaygen = this.child.form.form;
    //console.log('hello', this.childValidation);
    // //console.log('hello', this.gen);
  }

  editInput(element){
    if(this.editflow){
      element.status = this.editStatusId;
    }
  }

  effectiveDate(isExpToUpdate, element) {
    let effYear = parseInt(this.datePipe.transform(element.effectiveDt, 'yyyy'))
    if (effYear > 9999) {
      element.effectiveDt = "";
    } else {
    let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd')
    let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd')
    let c = this.datePipe.transform(element.expDt, 'yyyy-MM-dd')
    if(c && a){
      if (a <=b && b < c) {
        element.isValidEffectiveDt = false;
      }
      else {
        element.isValidEffectiveDt = true;
      }
    }
    else if(c){
      if (b < c) {
        element.isValidEffectiveDt = false;
      }
      else {
        element.isValidEffectiveDt = true;
      }
    }else if(a){
      if (b >= a) {
        element.isValidEffectiveDt = false;
      }
      else {
        element.isValidEffectiveDt = true;
      }
    }else{
      element.isValidEffectiveDt = false;
    }
    if(b){
      let e = new Date(b);
      e.setDate(e.getDate()+1);
      element.expiryDate_min = e;
    }

    // increment exp date by one year
    // if(isExpToUpdate && b && !element.isValidEffectiveDt){
    //   let f = new Date(b);
    //   f.setFullYear(f.getFullYear()+1);
    //   element.expDt = f;
    // }
  }
  this.expDate(element);
  }

  expDate(element) {
    let expYear = parseInt(this.datePipe.transform(element.expDt, 'yyyy'))
    if (expYear > 9999) {
      element.expDt = "";
    } else {
    let a = this.datePipe.transform(element.effectiveMinDt, 'yyyy-MM-dd')
    let b = this.datePipe.transform(element.effectiveDt, 'yyyy-MM-dd')
    let c = this.datePipe.transform(element.expDt, 'yyyy-MM-dd')

    if(b){
      if (b < c) {
        element.isValidExpDt = false;
      }
      else {
        element.isValidExpDt = true;
      }
    } else if(a){
      if ( a < c) {
        element.isValidExpDt = false;
      }
      else {
        element.isValidExpDt = true;
      }
    }else{
      element.isValidExpDt = false;
    }
    if(c){
      var e = new Date(c);
      e.setDate(e.getDate()-1);
      element.maxdate = e;
    }else{
      
      element.isValidExpDt = false;
    }
  }
  }

  deleteBranchDialog(customer) {
    const dialog = this.dialog.open(confimationdialog, {
      data: { message: "Are you sure want to Delete?"},
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'  
    });

    dialog.afterClosed().subscribe(res => {
      if(res) {
        this.paymentCommercialData.bookingCommercialCustomerList = this.paymentCommercialData.bookingCommercialCustomerList.filter(function( obj ) {
          return obj.msaCustId !== customer.msaCustId;
        });
        this.paymentCommercialData.custPymtFlag = 0;
      }
    });
  }
  
  nextReadMode() {
    if(this.editflow){
      this.router.navigate(['asso_network-contract/booking-sla',{ steper:true,'editflow': 'true' }], {skipLocationChange: true});
    }else{
      this.router.navigate(['asso_network-contract/booking-sla'], {skipLocationChange: true});
    }
  }

}

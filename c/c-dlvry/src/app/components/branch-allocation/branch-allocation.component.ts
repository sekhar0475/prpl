
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { AssignVehicleComponent } from 'src/app/dialog/assign-vehicle/assign-vehicle.component';
import { SearchBranchComponent } from 'src/app/dialog/search-branch/search-branch.component';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSetting } from 'src/app/app.setting';
import { DatePipe } from '@angular/common';
import { PincodeCustomizeComponent } from 'src/app/dialog/pincode-customize/pincode-customize.component';
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';
import { ErrorConstants } from 'src/app/core/models/constants';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-branch-allocation',
  templateUrl: './branch-allocation.component.html',  
  providers: [ApiService, DatePipe]
})
export class BranchAllocationComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['branchName', 'branchType', 'effectiveDt', 'expDt', 'Avehicle', 'CustomizePin', 'delete'];
  dataSource: any;
  SearchType;
  userBranch;
  DefaultB;
  todaydate;
  branches = [];  
  tempArr = [];
  existBranch = [];
  referenceData;
  editflow;
  flag: boolean = false;

  perList: any = [];

  constructor(public dialog: MatDialog, private toast: ToastrService, private apiSer: ApiService, private SpinnerService: NgxSpinnerService, public router: Router, private acRoute:ActivatedRoute, public datePipe: DatePipe,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    this.SpinnerService.show();
    this.authorizationService.setPermissions('BRANCH');
    this.perList = this.authorizationService.getPermissions('BRANCH') == null ? [] : this.authorizationService.getPermissions('BRANCH');
    this.authorizationService.setPermissions('PINCODE');
    this.perList = this.perList.concat(this.authorizationService.getPermissions('PINCODE'));
    this.permissionsService.loadPermissions(this.perList);
    // this.exAttrMap = this.authorizationService.getExcludedAttributes('VIEW CONTRACT');
    // this.exAttrKeyList = Array.from(this.exAttrMap.values());
    // console.log('Attribute List', this.exAttrKeyList);
    console.log('perlist',this.perList)

    this.getAllBranchWithCtr();
    this.getAllVehicle();
    this.getContractData();
    this.acRoute.params.subscribe(x => {
      if(x.editflow){
        this.editflow = x.editflow;
      }
      
    })
  }

  getAllVehicle(){
    this.tempArr = [];
    // this.SpinnerService.show();
    let associateId = AppSetting.associateId;
    this.apiSer.get(`secure/v1/associates/vehicles/associate/${associateId}`).subscribe(res => {
      this.tempArr = [];
      if (res && res.data) {
        let newtemp = res.data.responseData;
        newtemp.forEach(element => {
          // Market Flag for Veicle  is false vendorMktFlag
          if(!element.vendorMktFlag){
            this.tempArr.push(this.setVehicle(element, res.data.referenceData))
          }         
        });
        // this.SpinnerService.hide();
      }
      // this.SpinnerService.hide();
    }, err => {
      // this.SpinnerService.hide();
    });
    // this.SpinnerService.hide();
  }
  contractData: any;
  scheduledDeliveryFlag:any;
  safextDeliveryFlag:any;
  getContractData() {
    this.apiSer.get('secure/v1/deliverycontract/' + AppSetting.contractId).subscribe(data => {
      let ob = ErrorConstants.validateException(data);      
      if (ob.isSuccess) {
        this.contractData = data.data.responseData;    
        this.scheduledDeliveryFlag = this.contractData.scheduledDeliveryFlag;
        this.safextDeliveryFlag = this.contractData.safextDeliveryFlag;
        // this.SpinnerService.hide();
      }else{
        // this.SpinnerService.hide();
      }
    }, (error) => {
      this.toast.error(ErrorConstants.getValue(404));
      // this.SpinnerService.hide();
    })
  }

  backupBranch:any;
  getAllBranchWithCtr(){
    this.backupBranch = [];
    let contractId = AppSetting.contractId;
    this.apiSer.get(`secure/v1/deliverycontract/contracts/branches/${contractId}`).subscribe(res => {
      if (res && res.data) {
        this.existBranch = res.data.responseData;
        this.backupBranch = JSON.parse(JSON.stringify(this.existBranch))
        this.referenceData = res.data.referenceData;
        this.branches = this.existBranch;
        if (this.existBranch && this.existBranch.length > 0) {
          this.existBranch.forEach(element => {
            element.effectiveDate_min = new Date(element.effectiveDt);
            let e = new Date(element.effectiveDt);
            e.setDate(e.getDate()+1);
            element.expiryDate_min = e;
            // element.expiryDate_min = new Date(element.expDt);
            element.effectiveDate_max = null;
            // expiry
            element.expiryDate_max = null;
            element.checked = true;

            element.assocBranchVehicles.forEach(obj => {
              obj.checked = true;
            });
          });
        }
        this.dataSource = new MatTableDataSource(this.existBranch);
        this.dataSource.sort = this.sort;
        this.SpinnerService.hide();
      }else{
        this.SpinnerService.hide();
      }
    }, err => {
      this.SpinnerService.hide();
    });
    // this.SpinnerService.show();
  }

  openSearchBranchModal() {
    const dialogRef = this.dialog.open(SearchBranchComponent, {
      data: { data: this.branches, referenceData: this.referenceData, editflow:this.editflow },
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.searchType) {
        this.SearchType = result.searchType
      }
      if (result != undefined && result.userBranch) {
        this.userBranch = result.userBranch; // Defult Branch Data
        this.DefaultB = result.defaultBranch;   // Defult Branch Data
      }
      if (result != undefined && result.defaultBranch) {
        let existBranch = [];
        result.defaultBranch.forEach(element => {
            this.setBranchWithVecle(element);
        });
        if (existBranch.length > 0) {
          this.toast.info(`Branch Name  ${existBranch} already exists in List`);
        }

      }
      if(result.defaultBranch){
        this.branches = result.defaultBranch;
        this.existBranch = this.branches;
        this.dataSource = new MatTableDataSource(this.branches);
        this.dataSource.sort = this.sort;
      }

    });

  }
  trackById(index, item) {
    console.log(item.branchId);
    return item.branchId;
  }

  ngOnChanges(changes: any) {
    if (changes.groupingTabValid) {
        if (changes.groupingTabValid.currentValue !== changes.groupingTabValid.previousValue) {
          
            // this.groupingTabValidChange.emit(this.groupingTabValid);
        }
    }
}

  setBranchWithVecle(element) {  
    if(!element.assocCntrId){ 
      element.assocBranchVehicles = [];
      element.assocBranchPincodes = [];
      element.assocCntrId = AppSetting.contractId;
      element.effectiveDate_min = new Date();
      let e = new Date();
      e.setDate(e.getDate()+1);
      element.expiryDate_min = e;
    }else{
      element.effectiveDate_min = new Date(element.effectiveDt);
      let e = new Date(element.effectiveDt);
      e.setDate(e.getDate()+1);
      element.expiryDate_min = e;
    }

    element.effectiveDate_max = null;
    element.expiryDate_max = null;
    
  }

  checkInPriviArry = (objArray, val) => {
    for (var i = 0; i < objArray.length; i++) {
      if (objArray[i].branchId == val.branchId) {
        return true;
      }
    }
    return false;
  };

  submit(btnName) {
    this.SpinnerService.show();
    this.branches.forEach(element => {
      if(!element.id){
        this.backupBranch.forEach(obj => {
          if(obj.branchId == element.branchId){            
            element.id = obj.id;
              element.assocBranchVehicles.forEach(elementvel => {
                obj.assocBranchVehicles.forEach(objVel => {
                  if(objVel.vehicleId == elementvel.vehicleId){            
                    elementvel.id = objVel.id;
                  }
                });
              });
              element.assocBranchPincodes.forEach(elementvel => {
                obj.assocBranchPincodes.forEach(objVel => {
                  if(objVel.dlvryBranchPinMapId == elementvel.dlvryBranchPinMapId){            
                    elementvel.id = objVel.id;
                  }
                });
              });
          }
        });
      } else {

        this.backupBranch.forEach(obj => {
          if(obj.branchId == element.branchId){            
              element.assocBranchVehicles.forEach(elementvel => {
                obj.assocBranchVehicles.forEach(objVel => {
                  if(objVel.vehicleId == elementvel.vehicleId){            
                    elementvel.id = objVel.id;
                  }
                });
              });
              element.assocBranchPincodes.forEach(elementvel => {
                obj.assocBranchPincodes.forEach(objVel => {
                  if(objVel.dlvryBranchPinMapId == elementvel.dlvryBranchPinMapId){            
                    elementvel.id = objVel.id;
                  }
                });
              });
          }
        });
      }
     
    })
      this.branches.forEach(el => {
        el.effectiveDt = this.datePipe.transform(el.effectiveDt, 'yyyy-MM-dd');
        el.expDt = this.datePipe.transform(el.expDt, 'yyyy-MM-dd')
      });
      
      this.apiSer.post(`secure/v1/deliverycontract/contracts/branches`, this.branches).subscribe((res) => {
      if(res.data.responseData){
        this.toast.success('Saved Successfully');
        if(btnName == 'next'){
          this.SpinnerService.hide();
          if(this.editflow){
            this.router.navigate(['asso_delivery-contract/booking-payout',{ steper:true,'editflow': 'true' }], {skipLocationChange: true});
          }else{
            this.router.navigate(['asso_delivery-contract/booking-payout'], {skipLocationChange: true});
          }
        }else {
          this.ngOnInit();
        }
      }
    }, (err) =>{
      this.SpinnerService.hide();
      this.toast.error(err.error.errors.error[0].code + ' : ' + err.error.errors.error[0].description );
    })
  }

  nextReadMode() {
    if(this.editflow){
      this.router.navigate(['asso_delivery-contract/booking-payout',{ steper:true,'editflow': 'true' }], {skipLocationChange: true});
    }else{
      this.router.navigate(['asso_delivery-contract/booking-payout'], {skipLocationChange: true});
    }
  }

  // validationBranchCheck(btnName){
  //   this.submit(btnName);
  // }

  validationBranchCheck(btnName){
    let cntrId = String(AppSetting.contractId);
   let listBranchIds =  this.branches.map( obj=> {
      return  obj.branchId;
    });
    let branchMap = {};
    branchMap[cntrId] = [...listBranchIds];
    this.SpinnerService.show();
    this.apiSer.post(`secure/v1/deliverycontract/validBranches/`, branchMap).subscribe(
      res => {
        let listBranchNames = [];
        if (res && res.data && res.data.responseData) {
          if (res.data.responseData.length > 0) {
            this.branches.forEach(element => {
              res.data.responseData.filter(obj => {
                if (obj == element.branchId) {
                  listBranchNames.push(element.branchName);
                }
              });

            });
            this.toast.error('Not a Valid Branch, Already Allocated ! ', listBranchNames[0].toString());
            this.SpinnerService.hide();
          } else {

            /*   Remove validation for Pincode as now pincode is not mandatory 
            */

            // let tempFlag = true;
            // this.branches.filter(obj=> {
            //   let tempArray:any[] = JSON.parse(JSON.stringify(obj.assocBranchPincodes))
            //   obj.assocBranchPincodes = this.checkPinWithFlag(obj.assocBranchPincodes);
            //   if(!obj.assocBranchPincodes ||  obj.assocBranchPincodes.length == 0){
            //     obj.assocBranchPincodes = tempArray;
            //     // this.toast.warning('Add Pincode for each branch ');
            //     tempFlag = false;
            //     this.SpinnerService.hide();
            //     return
            //   }
            //   if(!tempFlag){
            //     this.SpinnerService.hide();
            //     return  
            //   }
            // })
            // if(tempFlag){
            //   this.submit(btnName);
            // }

            this.submit(btnName);
            
          }
        }
      },
    );
  }
  setVehicle(obj, ref) {
    if(ref){
      ref.vehicleModelList.forEach(element => {
        if(obj.vehicleModelId == element.id){
          obj.vehicleModel = element.vehicleModelName
        }
      });
    }
    let temp = {
      // "id" : obj.id,
      "bodyHeight": obj.bodyHeight,
      "bodyLength": obj.bodyLength,
      "bodyWidth": obj.bodyWidth,
      "effectiveDt": obj.effectiveDt,
      "expDt": obj.expDt,
      // "status": obj.status,
      "vehicleId": obj.id,
      "vehicleModel": obj.vehicleModel,
      "vehicleNumber": obj.vehicleNum,
      "vehicleTonnge": obj.vehicleTonnge ? obj.vehicleTonnge : obj.modelCargoCapacity ,
      "checked": false
    }
    // if(obj.id){
    //   temp['id'] = obj.id;
    // }
    return temp;

  }

  openAssignVehicleModal(obj) {
    console.log('this.tempArr', this.tempArr);
    const vehicle = JSON.parse(JSON.stringify(this.tempArr));
    const dialogRef = this.dialog.open(AssignVehicleComponent, {
      data: { 'tempVehicle': vehicle, 'obj': obj, 'component' : 'branch' },
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
    })

  }

  deleteBranchDialog(element) {
    const dialog = this.dialog.open(confimationdialog, {
      data: { message: "Are you sure want to delete?" },
      disableClose: true,
      panelClass: 'creditDialog',
      width: '300px'
    });

    dialog.afterClosed().subscribe(response => {
      if(response) {
        this.dataSource.data = this.branches = this.branches.filter(function( obj ) {
          return obj.branchId !== element.branchId;
      });
      }
    })
  }

  validateVehicle(): boolean{
    let flag = false
    if (this.branches.length == 0){
      return flag = true;
    }
    this.branches.forEach(obj => {
      if (obj.effectiveDt) {
        if(!obj.assocBranchVehicles || obj.assocBranchVehicles.length == 0){
          return flag = true;
        }
      } else {
        return flag = true;
      }

    });

     /*  Remove validation for Pincode as now pincode is not mandatory 
      */

    // this.branches.forEach(obj => {
    //   if (obj.effectiveDt) {
    //     if(!obj.assocBranchPincodes || obj.assocBranchPincodes.length == 0){
    //       return flag = true;
    //     }
    //   } else {
    //     return flag = true;
    //   }

    // });
    return flag;

    
  }

  editInput(element){
    if(this.editflow){
      element.status = AppSetting.editStatus;
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
      element.expMinDt = e;
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

    if (c) {
      if(b){
        if (b < c) {
          element.isValidExpDt = false;
          this.flag = false;
        }
        else {
          element.isValidExpDt = true;
          this.flag = true;
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
    }

    if(c){
      var e = new Date(c);
      e.setDate(e.getDate()-1);
      element.maxdate = e;
    }
  }
  }

  excludePincode(index) {
    let branchPin = JSON.parse(JSON.stringify(this.branches[index].assocBranchPincodes));
    const excludePincode = this.dialog.open(PincodeCustomizeComponent, {disableClose: true,
       panelClass: 'mat-dialog-responsive',
      data: {
        cmdmntId: 1, excludedPincodeList: branchPin,
        safextDeliveryFlag: this.safextDeliveryFlag,
        scheduledDeliveryFlag: this.scheduledDeliveryFlag,  
        geoFeatureId: this.branches[index].geoFeatureId
      },
      width: '60%',
    });
    excludePincode.afterClosed().subscribe(objEl => {
      if(objEl){
        let result = this.checkPinWithFlagSave(objEl);
        if(result != undefined){
        if (result.length > 0){
          result.forEach(element => {
            element.effectiveDt = this.branches[index].effectiveDt;
            element.expDt = this.branches[index].expDt;
          });
          this.branches[index].assocBranchPincodes = result.filter(obj => obj.isChecked == true);
        } else {
          this.branches[index].assocBranchPincodes = [];
        }
      } else {
        this.branches[index].assocBranchPincodes = [];
      }
      }

    });
  }

  checkPinWithFlag(array){
    let arrSafext:any[]; 
    let arrScheduled:any[]; 

    arrSafext = array.filter(obj=> obj.safextFlag);
    arrScheduled = array.filter(obj=> !obj.safextFlag);
    // let  tempArrSafext:any[] = arrSafext.filter(obj => obj.isChecked);
    // let  tempArrScheduled:any[] = arrScheduled.filter(obj => obj.isChecked);
    if(array && array.length > 0){
      if(this.scheduledDeliveryFlag && this.safextDeliveryFlag){
        if(arrScheduled.length > 0 && arrSafext.length > 0){
          return array              
        }else{
          this.toast.info('Add Pincode for each branch ');
          return
        }
      }else{
        if(this.scheduledDeliveryFlag){
          if(arrScheduled.length > 0){
            return arrScheduled              
          }else{
            this.toast.info('Add Pincode for each branch ');
            return
          }
        }else if(this.safextDeliveryFlag){
          if(arrSafext.length > 0){
            return arrSafext              
          }else{
            this.toast.info('Add Pincode for each branch ');
            return
          }
        }
      } 

    }
  }

  checkPinWithFlagSave(array){
    let arrSafext:any[]; 
    let arrScheduled:any[]; 

    arrSafext = array.filter(obj=> obj.safextFlag);
    arrScheduled = array.filter(obj=> !obj.safextFlag);
    let  tempArrSafext:any[] = arrSafext.filter(obj => obj.isChecked);
    let  tempArrScheduled:any[] = arrScheduled.filter(obj => obj.isChecked);
    if(array && array.length > 0){
      if(this.scheduledDeliveryFlag && this.safextDeliveryFlag){
        if(tempArrScheduled.length > 0 || tempArrSafext.length > 0){
          return array;              
        }
      }else{
        if(this.scheduledDeliveryFlag){
          if(tempArrScheduled.length > 0){
            return tempArrScheduled              
          }
        }else if(this.safextDeliveryFlag){
          if(tempArrSafext.length > 0){
            return tempArrSafext              
          }
        }
      } 

    }
  }



}


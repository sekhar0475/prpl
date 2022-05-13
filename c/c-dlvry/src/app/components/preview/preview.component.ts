import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AppSetting } from '../../app.setting';
import { ErrorConstants } from '../../core/models/constants';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SuccessComponent } from '../success/success.component';
import * as _ from "lodash";
import { confimationdialog } from 'src/app/dialog/confirmationdialog/confimationdialog';
import { DatePipe } from '@angular/common';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { EmailPreviewComponent } from 'src/app/dialog/email-preview/email-preview.component';
import { AuthorizationService } from '../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';
declare let jspdf;
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  providers: [DatePipe]
})
export class PreviewComponent implements OnInit {
  previewList;
  previewRefList;
  graciaList: any = [];
  mgList: any = [];
  insuranceList: any = [];
  emiList: any = [];
  editflow: boolean;
  isPCD: boolean;
  categoryList: any = [];
  scheduledProductList: any = [];
  safextensionProductList: any = [];
  currentDt: string;
  data: any = {};
  perList: any = [];

  constructor(
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    public dialog: MatDialog,
    private tosterservice: ToastrService,
    private router: Router,
    private datePipe: DatePipe,
    private exportAsService: ExportAsService,
    private activeRoute: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private permissionsService: NgxPermissionsService) { }

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'previewContent', // the id of html/table element
  }

  customerName: string = AppSetting.customerName;
  ngOnInit() {

    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.perList);

    this.activeRoute.params.subscribe(params => {
      if (params['editflow']) {
        this.editflow = params['editflow'];
      }
    });
    this.spinner.show();
    this.currentDt = this.datePipe.transform(new Date(), 'MM-dd-yyyy');

    this.apiService.get(`secure/v1/deliverypreview/preview/${AppSetting.contractId}`).subscribe((suc) => {
      if (suc.data && suc.data.responseData) {
        this.previewList = suc.data.responseData;
        this.previewRefList = suc.data.referenceData;
        this.renderPreviewData();

      } else {
        console.log("Data not Found");
        // this.spinner.hide();
      }
    }, (err) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
       this.spinner.hide();
    });
  }

  closePreview($event) {
    $event.preventDefault();
    if (this.editflow) {
      this.router.navigate(['/asso_delivery-contract/booking-document', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
    } else {
      this.router.navigate(['/asso_delivery-contract/booking-document'], { skipLocationChange: true });
    }
  }

  sendContractId(e) {
    this.spinner.show();
    this.apiService.put(`secure/v1/deliverycontract/submit/${AppSetting.contractId}`).subscribe((suc) => {
      let ob = ErrorConstants.validateException(suc);
      if (ob.isSuccess) {
        this.spinner.hide();
        AppSetting.sfxCode = suc.data.responseData;
        // this.router.navigate(['/asso_delivery-contract/success'])
        const dialogRef = this.dialog.open(SuccessComponent, {
          disableClose: true,
          panelClass: 'mat-dialog-responsive',
          data: { editflow: this.editflow },
          width: '64rem'
        });

      } else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue in generating Associate Contract Code.');
    });

  }

  sendEmail() {
    let userDt = JSON.parse(sessionStorage.getItem("all")).data.responseData
      .user;
    const addrDialog = this.dialog.open(EmailPreviewComponent, {
      panelClass: "mat-dialog-responsive",
      disableClose: true,
      data: { email: userDt.email },
    });

    addrDialog.afterClosed().subscribe((result) => {
      if (result && result != "") {
        this.spinner.show();
        let ob = {
          userId: userDt.userId,
          associateEmailId: result,
          assocId: AppSetting.associateId,
          cntrctCode : this.previewList.cntrCode ? this.previewList.cntrCode : "NOT GENERATED YET",
          ver : this.previewList.contractDetals.ver ? this.previewList.contractDetals.ver : "1"
        };

        // before making pad do some initial things
        document.querySelectorAll("tr").forEach((v) => {
          if (!v.innerText) {
            v.parentNode.removeChild(v);
          }
        });
        // end before making pad do some initial things

        let doc = new jspdf("p", "px", "a4");
        doc.setFont("helvetica");

        document.querySelectorAll(".table_").forEach((v: any, i) => {
          if (v.getAttribute("data-page") || doc.autoTableEndPosY() > 450) {
            doc.addPage();
          }

          // start headers
          let h3 = "";
          let h5 = "";
          let addPagFlg = false;
          if (!v.getAttribute("class").includes("h5")) {
            h3 = v.id;
          } else {
            h5 = v.id;
          }
          if (v.getAttribute("data-h5")) {
            h5 = v.getAttribute("data-h5");
          }

          let billingSecondtbl = v.getAttribute("class").includes("billingTwo");
          if (h3) {
            doc.setFontSize(15);
            if (v.getAttribute("data-page") || doc.autoTableEndPosY() > 450) {
              doc.text(h3, 10, 45);
            } else {
              if (h3 == "Delivery Associate Contract") {
                // doc.text('Preview For Edited Data', 10, 45)
                doc.text(h3, 10, 60);
              } else {
                doc.text(h3, 20, doc.autoTableEndPosY() + 20);
                doc.rect(0, doc.autoTableEndPosY() + 11, 15, 10, "F");

                if (v.id == "Allocation") {
                  doc.setFontSize(12);
                  doc.text("Branch", 10, doc.autoTableEndPosY() + 40);
                }

                // if (
                //   v.id == "Payment Terms" &&
                //   this.previewList &&
                //   this.previewList.scheduled_Payout !== undefined &&
                //   !this.isPCD
                // ) {
                //   doc.setFontSize(10);
                //   doc.text("Scheduled Payout", 10, doc.autoTableEndPosY() + 40);
                // } else if (
                //   v.id == "Payment Terms" &&
                //   this.previewList &&
                //   this.previewList.scheduled_Payout != undefined &&
                //   this.previewList.scheduled_Payout.dlvryPayoutCtgy &&
                //   !this.isPCD
                // ) {
                //   doc.setFontSize(10);
                //   doc.text("GENERAL", 10, doc.autoTableEndPosY() + 40);
                // }
              }
            }
            doc.setFontSize(9);
          }

          if (h5 && !h3) {
            doc.setFontSize(12);
            if (v.getAttribute("data-page") || doc.autoTableEndPosY() > 450) {
              doc.text(h5, 10, 40); // new page start heading
              addPagFlg = true;
            } else {
              doc.text(h5, 10, doc.autoTableEndPosY() + 20);
            }
            doc.setFontSize(9);
          }

          if (h5 && h3) {
            doc.setFontSize(12);
            if (v.getAttribute("data-page") || doc.autoTableEndPosY() > 450) {
              doc.text(h5, 10, 60);
            } else {
              doc.text(h5, 60, doc.autoTableEndPosY() + 60);
            }
            doc.setFontSize(9);
          }
          // headers end

          // show heading
          let tableHeading = v.getAttribute("data-heading");
          let fillColor_ = [255, 255, 255];
          let textColor_ = [255, 255, 255];
          if (tableHeading) {
            fillColor_ = [39, 174, 96];
            textColor_ = [0, 0, 0];
          }
          // end show heading

          // track & set table marting
          var res = doc.autoTableHtmlToJson(v);
          if (res) {
            let tblMgn = 13;
            if (h3 || h5) {
              tblMgn = 25;
            }
            if (h5 && h3) {
              tblMgn = 65;
            }
            if (billingSecondtbl) {
              tblMgn = 5;
            }

            // track individula tables
            if (v.id == "Delivery Associate Contract") {
              tblMgn = 100;
            }
            if (
              h5 == "MSA Details" ||
              h5 == "Opportunity" ||
              h5 == "Increment Clause" ||
              h5 == "Insurance Details" ||
              h5 == "Security Detail"
            ) {
              tblMgn = 22;
            }
            if (h5 == "Details") {
              tblMgn = 60;
            }

            if (v.getAttribute("class").includes("commerTble")) {
              tblMgn = 20;
            }
            if (v.getAttribute("class").includes("GSTApplicable")) {
              tblMgn = 2;
            }
            if (v.getAttribute("class").includes("Safextension")) {
              tblMgn = 30;
            }

            if (v.id == "Billing") {
              tblMgn = 35;
            }
            if (v.getAttribute("class").includes("ServiceTblTop")) {
              tblMgn = 20;
            }
            if (v.getAttribute("class").includes("rateCardTble")) {
              tblMgn = 26;
            }
            if (v.id == "Allocation") {
              tblMgn = 50;
            }
            if (v.getAttribute("class").includes("general")) {
              tblMgn = 20;
            }

            if (addPagFlg) {
              // if page add then add extra margin
              tblMgn = tblMgn + 15;
            }
            // end track individula tables

            //  colume styles
            let cs;
            let green = [39, 174, 96];
            let grey = [204, 204, 204];
            let white = [255, 255, 255];
            let blk = [0, 0, 0];

            // colume styles

            if (v.getAttribute("class").includes("twoCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 215,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 215,
                },
              };
            } else if (v.getAttribute("class").includes("threeCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 143,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 143,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 143,
                },
              };
            } else if (v.getAttribute("class").includes("fourColWithHead")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
              };
            } else if (v.getAttribute("class").includes("fourCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                2: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
              };
            } else if (v.getAttribute("class").includes("fiveCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 86,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 86,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 86,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 86,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 86,
                },
              };
            } else if (v.getAttribute("class").includes("sixCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
                5: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
              };
            } else if (v.getAttribute("class").includes("sevenCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                5: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                6: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
              };
            } else if (v.getAttribute("class").includes("eightCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                5: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                6: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                7: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
              };
            } else if (v.getAttribute("class").includes("nineCol")) {
              // for billing only
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 40.7,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 40.7,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 47.7,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 83.7,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 47.7,
                },
                5: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 40.7,
                },
                6: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 37.7,
                },
                7: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 47.7,
                },
                8: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 42.7,
                },
              };
            } else if (v.getAttribute("class").includes("tenCol")) {
              // for billing only
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 36.7,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 36.7,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 43.7,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 79.7,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 42.7,
                },
                5: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 36.7,
                },
                6: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 33.7,
                },
                7: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 43.7,
                },
                8: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 38.7,
                },
                9: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 43.7,
                },
              };
            } else if (
              v.id == "Delivery Associate Contract" ||
              v.getAttribute("class").includes("billingTwo")
            ) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: white,
                  lineColor: white,
                  columnWidth: 215,
                  fontSize: 10,
                  fontStyle: "bold",
                },
                1: {
                  fillColor: green,
                  textColor: white,
                  lineColor: white,
                  columnWidth: 215,
                  fontSize: 10,
                  fontStyle: "bold",
                },
              };
            } else if (v.getAttribute("class").includes("customersTable")) {
              // for billing only
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: green,
                  columnWidth: 200,
                },
                1: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: green,
                  columnWidth: 200,
                },
              };
            } else if (v.getAttribute("class").includes("general")) {
              // for billing only
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: green,
                  columnWidth: 200,
                },
              };
            }

            //for billing tbl
            let trLnofBilTbl: any;
            if (document.querySelectorAll(".billTh_edit")) {
              trLnofBilTbl = document.querySelectorAll(".billTh_edit").length;
              if (trLnofBilTbl == 8) {
                trLnofBilTbl = "eightCol";
              } else if (trLnofBilTbl == 9) {
                trLnofBilTbl = "nineCol";
              } else if (trLnofBilTbl == 10) {
                trLnofBilTbl = "tenCol";
              }
              let blgTbl = document.getElementsByClassName("billTbl_edit");
              if (blgTbl[0]) {
                blgTbl[0].setAttribute(
                  "class",
                  "table_ billTbl_edit " + trLnofBilTbl
                );
              }
            }

            // table font size
            let fontSize = 8;
            if (
              v.id == "Geography Commandments" ||
              v.id == "Non Geography Commandments" ||
              v.getAttribute("class").includes("nonGeoTwo")
            ) {
              fontSize = 6;
            }
            // table font size

            if (v.getAttribute("data-page") || doc.autoTableEndPosY() > 450) {
              doc.autoTable(res.columns, res.data, {
                startY: tblMgn,
                minCellWidth: 40,
                cellWidth: "auto",
                tableWidth: "auto",
                theme: "grid",
                columnStyles: cs,
                drawRow: function (row) {
                  if ((row.index > 0 && row.index % 20) === 0) {
                    doc.autoTableAddPageContent();
                  }
                },
                margin: {
                  top: 70,
                  left: 10,
                },
                styles: {
                  cellPadding: 3,
                  fontSize: fontSize,
                  valign: "middle",
                  overflow: "linebreak",
                  tableWidth: "auto",
                  //fileColor: [30, 30, 30],
                },
                headerStyles: {
                  //columnWidth: 'wrap',
                  cellPadding: 2,
                  valign: "top",
                  fontStyle: "bold",
                  halign: "left", //'center' or 'right'
                  fillColor: fillColor_,
                  // textColor: [78, 53, 73], //Black
                  textColor: textColor_, //White
                  fontSize: fontSize,
                },
              });
            } else {
              let startY = doc.autoTableEndPosY() + tblMgn;
              if (v.id == "Delivery Associate Contract") {
                startY = 70;
              }
              doc.autoTable(res.columns, res.data, {
                startY: startY,
                minCellWidth: 40,
                cellWidth: "auto",
                tableWidth: "auto",
                theme: "grid",
                columnStyles: cs,
                drawRow: function (row) {
                  if ((row.index > 0 && row.index % 20) === 0) {
                    doc.autoTableAddPageContent();
                  }
                },
                margin: {
                  top: 70,
                  left: 10,
                },
                styles: {
                  cellPadding: 3,
                  fontSize: fontSize,
                  valign: "middle",

                  overflow: "linebreak",
                  tableWidth: "auto",
                  //fileColor: [30, 30, 30],
                },
                headerStyles: {
                  //columnWidth: 'wrap',
                  cellPadding: 2,

                  valign: "top",
                  fontStyle: "bold",
                  halign: "left", //'center' or 'right'
                  fillColor: fillColor_,
                  //textColor: [78, 53, 73], //Black
                  textColor: textColor_, //White
                  fontSize: fontSize,
                },
              });
            }
            if (billingSecondtbl) {
              doc.setLineWidth(2);
              doc.setDrawColor(39, 174, 96);
              doc.line(
                10,
                doc.autoTableEndPosY() + tblMgn,
                440,
                doc.autoTableEndPosY() + tblMgn
              );
              doc.setLineWidth(0.5);
            }
          }
          // end  track & set table marting
        });

        // header footer
        const pageCount = doc.internal.getNumberOfPages();
        const base64Img =
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/4RD0RXhpZgAATU0AKgAAAAgABAE7AAIAAAAOAAAISodpAAQAAAABAAAIWJydAAEAAAAcAAAQ0OocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE5hcmVzaCAgS3VtYXIAAAWQAwACAAAAFAAAEKaQBAACAAAAFAAAELqSkQACAAAAAzA1AACSkgACAAAAAzA1AADqHAAHAAAIDAAACJoAAAAAHOoAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyMDIwOjExOjA1IDIwOjUzOjE1ADIwMjA6MTE6MDUgMjA6NTM6MTUAAABOAGEAcgBlAHMAaAAgACAASwB1AG0AYQByAAAA/+ELIGh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iLz48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHhtcDpDcmVhdGVEYXRlPjIwMjAtMTEtMDVUMjA6NTM6MTUuMDQ2PC94bXA6Q3JlYXRlRGF0ZT48L3JkZjpEZXNjcmlwdGlvbj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPk5hcmVzaCAgS3VtYXI8L3JkZjpsaT48L3JkZjpTZXE+DQoJCQk8L2RjOmNyZWF0b3I+PC9yZGY6RGVzY3JpcHRpb24+PC9yZGY6UkRGPjwveDp4bXBtZXRhPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8AAEQgAagdUAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+kaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACsvxOSPCOsEcEWM//AKLNalZfij/kUNY/68Z//RbUAfNvw9+Hut+OfDq3em65DZJbhImWeJ5Cx2g5BDD1rW1j4X3fh+SNNd+Iuhac8n3FuUaMsPUAy9Peuv8A2cP+RHuv+uyf+i1rya7sdE1r9pbXbH4pzzQ2ss8sdszSmNQcjyQW7Ls6dulRGKaPOw+GozpqUo3ev5ncRfBTX57AXsPjXS5LQp5gnSBzGV67t3mYx71V0r4T3+vGUaH8QtD1Ew480WimXZnOM7ZTjOD+Vd18Q47L4a/s+ajpukSSeQtsbO2Mr7mPmtg8+ysx/CvKf2fvP8IfFhdHvXxHrejRXMeeMsY1mX8gXFPlib/U8P8Ayo0r74dHTL2Sz1H4n+G7S5iOJIZ22Oh68qZcint8NJU02LUH+Jfh1bKZykdyxxG7DqA3m4JHpXO67pfhrxF+09rdv4rulj0diWeZZtg3CJcDcPftVj4up4Sh+HejeGvh/cyXcVnfSTujBztDA5O9gAeT60uWJEsNhY/EkjcsPhjcarLJFpfxK8PXskcZldLc+YVQdWIWU4Az1rX8FfDVbnXYdRPjjR9b07T5BJdRWPzYwCQGYSEKMjv2BqP4YW/gzwzPDqvhXwz4n1DUZrMQTyQwb4STtLAMzBRyvrXmfiLUdV+FHijxZptpplzptn4lsiLa3nZN0SO/B+RmX5QZVGD3FPliVHC4fdRR758Rzpvj3wukOi+O9F0+ws7lJL24M6SoT/yzVmDgLzk4J5IHpXn2mfC9taufs+j/ABP0K/nxnyrZBI2PosxNReI/BX/CE/smyW9xHs1C9ngu7vI5Ds4wp/3VwPqDXmWuW3hzRPA/gzV/Cl6I/FMhaS8W2uC7Iyt8hZcnY2eg4z6U2k9zWpQp1Heauep6j8Ln0i7Nrq3xQ0GxuAAxhuVEbgHodrTA1ai+DWp3GlvqVv8AEHS5rFEZ2uY7YtGFAyTuEuMAVyHxB/sjxB+0JpjeI3jn0uS2t1v2hkJVT5Z3DchyMN6VR8L63beDtd8c6XYTXR8M6jYXdvY+YDh5D8sTc4xwSMnHHWp5YmEsPhY/Ekjo4/BWnzSpFF8XPDryOwVVVQSxPQD99V7XPhfL4aEf9v8AxK0jTzLzGtxbMrMPUDzcke9cn8H/AAp4f1PS5Z9X8I63rupwX2YZ9NkAhjUKhCs/mKu7OTg9iKXxMNN1D9pCcfFi2urLS7jASKWXAiQoBFlkJG3PUqeuc96fLEpYXDtXUUdpD8H7+40f+1oPiJpL6dt3fa1tz5WPXf5uKh0f4Vz+IWkXQviVo+otH99baAyFfcgS8Cq3x88PReEfhR4e0nwm03/CPfbZZJCJTICz/PH83ccvjPtXoHwa8GeBbKzh8UeBrmeZ7iz+zXAefdhiVZgyn7rAr7D9KOWI/qlD+VHE+B9I1Dwz8foNA1HUFvmtMnzo0KBt9szfdLHpn1r6Mrw1P+Ttrj/dj/8ASM17lRHS4sNGMHOMdr/ogoooqjrCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKy/FH/ACKGsf8AXjP/AOi2rUrL8Uf8ihrH/XjP/wCi2oA8y/Zw/wCRHuv+uyf+i1rkfj7q/wAO/Emk6iTeGHxZpE5tY41iYPIVfDKxxgrjJBzx+OK679nD/kR7r/rsn/ota6rVfg74E1rXpNY1LQIZr2aTzJX8xwsjHkllBwc+4qY7HNhf4K+f5nzVrXiLVtQ+FHg7RPEVzJPaXMkr28KRnzSI3KRszZyyncVAAH3e9UL+6tmvbd9SmM10FW2hM7FnVR8oQbvugdOwFfWepfDfwnq2rafqV9pET3OmqiWhDMqwqjblAUHGAfaovE/gbwZ4m8n/AISHTbacwO7ptYoQzY3E7SMk7R19KHG5FfC+2knzNLsfOvhXw1Jqfxj/AOEI1sfZBAjPM9q4ZiQgYAEjHfnit39ojwRoXhDwVo50S08qWW8KyTO7O7jYTgknpnt0r2iHw/4SsfFj+JbXTf8AicSLta6BbJG0L3OOgHapfEvh7SPHdnBa67on26CB/MjEkjIFbGM8Y7U1FLY0pYelS+CJQ+HPxF8KeJdPsdF0PVVudQtbBHmhEMi7QoVWOWUDgkd6+ffiNcX/AMXfHXifUtFcvp3hexLQbeQ6o43EfX94wPooFfQ/h74VeGPDdxcXGj6RDYy3Vu1tK0UshYxtjIyW46DkVo+Gfh54Y8IW17BoGlpbR36hbkF2fzAARg7iePmP50zoPCfE/i3UvHfwJs9YvNShbTLd4rTVrMRgS+epGJN3Uhsq2BjGe9cX4a8INr1wsPhrSftz8EvGoIQerOeB+Jr6atPhB4IsdGvdKttG22N86PcQG4kZXZCSp5bjGe1b+kadonhbSotN0iKGztYRhIo+cc5+pqHG5x18Kq0k3Jpdj5N1nw1rmn/Ei08FPJbxXt1EGWSI7wHZCyrkgdwAeK6L4S32m33w/wDHGk6zp9u3iDT7C6lS4mjBl8vy2BXJ5G1h/wCPCvdL/wAO+EbzxfD4nuNNM+sQbfLudzDbtGBxnHT2qpB4A8Lv4gvdas/DmL2/WVLmUzuqyrICHBXO3BzVKKWxrSw9Kl8ETyP9nj4k+F/CXhK60fXtQNtfXepl4YxC7bgyRqOQCByDW58ePEXw813StV0rV5pIfE2kDbZ7YW3sxAYAMBgoc85IxXf2vwb8Fw3Ec6+GtOhkjYOpVWJBByD1rQ1r4V+C/EOsHVdZ0G2ub1iC8pBHmYGBuAOG4A60zc8j+FvifRLX4G22mfE+QjSNRvJ7aya4jZkMahTjI5GGLYPbHbFYHwHnTT/jtqmm+Ebue78OyRzZdwQGjU/u3I9cnAPHU19D694A8MeJdEttI1fSIJbG0/494kzGIuMfLtxjj0qTwt4H8OeC7aSDw1pcNkJceYy5Z3x0yxyT+dAHlif8nbT/AO7H/wCkZr3KvDU/5O2n/wB2P/0jNe5VK6nNQ+Kp6/ogoooqjpCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKy/FH/Ioax/14z/APotq1Ky/FH/ACKGsf8AXjP/AOi2oA8y/Zw/5Ee6/wCuyf8Aota9hrwP4H+KdC0PwRc2utaklnJOylQwbJXywMggV2LeK/DwZfK8ahUXTDZ7CshzLz++zjOefWoi1Y4cNWpxpJOS69fM77ULJ7qP91KysP4c/KaybfSLiZz5g8pQcEtWBP438NS+GoNPTxXALmNYg85WUb9pGc7cHnHY1U1HxZoN2NZ+z+NktjfCH7MyrL/oxTGSO3OO2PfNVzI6Pb0f5l96PQbbTLa3wQm9v7zc1c6V5uni/wAOx+dKvjNWma0igQOJDGrJyXIxnJPXnpT5fGPhqe61R5fFsYivYY0iRBIvkMowSCPU80cyD29L+Zfej0WiuEsvHnhe21nULqXxRDLBc+X5UJV8Q7VwccdzzVR/GugSHTy/i+AfZZma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4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSiqdnqltfuy24uAVGT5ttJEPzZRmrlABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/2Q==";
        let dt = this.toJSONLocal(new Date());
        let dtArr = dt.split("-");
        let y = dtArr[0];
        let m = dtArr[1];
        let d = dtArr[2];
        for (var i = 1; i <= pageCount; i++) {
          doc.setPage(i);

          if (i == 1) {
            //only on first page
            doc.text(
              "PREVIEW GENERATED ON : " + d + "/" + m + "/" + y,
              310,
              45
            );
          }
          // doc.text(this.customerName, 190 - (this.customerName.length/2), 13);

          // header
          doc.addImage(base64Img, "JPEG", 8, 5, 434, 20); //original
          // doc.setFontSize(5);
          // doc.text('SAFEXPRESS CONFIDENTIAL', 380, 20);
          // doc.setFontSize(8);

          doc.setLineWidth(0.4);
          doc.setDrawColor(204, 204, 204);

          // doc.line(10, 25, 440, 25)
          doc.line(10, 610, 440, 610);

          // footer

          doc.setFontSize(5);
          doc.text("SAFEXPRESS CONFIDENTIAL", 10, 620);
          doc.setFontSize(8);
          doc.text(String(i) + " / " + String(pageCount), 420, 620);
        }
        // end header footer

        // file save and send
        var file = new Blob([doc.output("blob")], {
          type: "application/pdf",
        });
        // doc.save("table.pdf");
        this.sendData(ob, file);
        this.spinner.hide();
        // end file save and send
      }
    });
  }
  toJSONLocal (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}

  b64toBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'application/pdf' });
  }

  sendData(ob, file){
 this.apiService.sendEmail(file, ob, this.previewList.assocName)
 .subscribe(data => {
   this.spinner.hide();
   this.tosterservice.success("Email Sent Successfully !");
 }, error => {
   this.spinner.hide();
   this.tosterservice.error('Issue In Sending Email !');
 });

}
  /*---------- return service offerings -------- */
  displayServiceOffr(offeringArray) {
    let offeringNames = '';
    if (offeringArray !== undefined) {
      offeringArray.forEach((element, index) => {
        let obj = this.previewRefList.serviceOfferingList.find(x => x.id == element.serviceOfferingId);
        if (obj !== undefined) {
          if (index !== 0) {
            offeringNames = offeringNames + ', ' + obj.serviceOffering;
          } else {
            offeringNames = obj.serviceOffering;
          }
        }
      });
    }
    return offeringNames;
  }

  renderPreviewData() {
    let subDelivery = this.previewRefList.subDeliveryTypeList.find(x => x.id == this.previewList.contractDetals.lkpSubDeliveryId);
    if (subDelivery !== undefined) {
      this.previewList.contractDetals['subDeliveryName'] = subDelivery.lookupVal;
      if (subDelivery.lookupVal == 'PCD') {
        this.isPCD = true;
      } else {
        this.isPCD = false;
      }
    } else {
      this.previewList.contractDetals['subDeliveryName'] = '';
    }

    let statusObj = this.previewRefList.statusList.find(x => x.id == this.previewList.contractDetals.status);
    if (statusObj !== undefined) {
      this.previewList.contractDetals['statusName'] = statusObj.lookupVal;
    } else {
      this.previewList.contractDetals['statusName'] = '';
    }

    this.previewList.contractDetals['serviceOffrNames'] = this.displayServiceOffr(this.previewList.contractDetals.serviceOfferings)
    if (this.previewList['deliveryDeduction']['vehicleDeductionList'] !== undefined) {
      this.previewList['deliveryDeduction']['vehicleDeductionList'].forEach(elem => {
        if (elem.type == 'INSURANCE') {
          this.insuranceList.push(elem);
        } else if (elem.type == 'EMI') {
          this.emiList.push(elem);
        }
      });
    }
    
    if (this.previewList.deliveryCommercial !== undefined) {
      if (this.isPCD) {
        this.previewList['scheduled_Payout'] = this.previewList.deliveryCommercial.find(x => {
          if(x.customerCommercial){
           return  x.customerCommercial.find(y => y.dlvryPayoutCtgy == 'SECHEDULED' || y.dlvryPayoutCtgy == 'SCHEDULED');
          }
        });
        this.previewList['safextension_Payout'] = this.previewList.deliveryCommercial.find(x => {
          if(x.customerCommercial){
           return x.customerCommercial.find(y => y.dlvryPayoutCtgy == 'SAFEXTENSION' || y.dlvryPayoutCtgy == 'SAFE EXTENSION')
          }
        });
      } else {
        this.previewList['scheduled_Payout'] = this.previewList.deliveryCommercial.find(x => x.dlvryPayoutCtgy == 'SECHEDULED' || x.dlvryPayoutCtgy == 'SCHEDULED');
        this.previewList['safextension_Payout'] = this.previewList.deliveryCommercial.find(x => x.dlvryPayoutCtgy == 'SAFEXTENSION' || x.dlvryPayoutCtgy == 'SAFE EXTENSION');
      }
    } 

    /*------------- get Product Category list ----------- */

    this.apiService.get('secure/v1/deliveryCommercial/productcategory').subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        this.categoryList = data.data.responseData;

        /*------------ Get product list for given Category ID of scheduled payout --------------- */
        if (this.previewList['scheduled_Payout'] !== undefined && this.previewList['scheduled_Payout'].prdctCtgyId) {
          let categoryObj = this.categoryList.find(x => x.id == this.previewList['scheduled_Payout'].prdctCtgyId);
          if (categoryObj !== undefined) {
            this.previewList['scheduled_Payout'].prdctCtgyName = categoryObj.prdctCtgy;

            this.apiService.get('secure/v1/deliveryCommercial/productcategory/' + this.previewList['scheduled_Payout'].prdctCtgyId).subscribe(productData => {
              let ob = ErrorConstants.validateException(productData);
              if (ob.isSuccess) {
                this.scheduledProductList = productData.data.responseData;
                this.previewList['scheduled_Payout'].productNames = this.getProductNames(this.previewList['scheduled_Payout'].deliveryProductList, this.scheduledProductList);
              }
            });
          }
        }

        /*------------------ Get product list for scheduled Payout Customers ------- */
        if (this.previewList['scheduled_Payout'] !== undefined && this.previewList['scheduled_Payout'].customerCommercial.length > 0) {
          this.previewList['scheduled_Payout'].customerCommercial.forEach(element => {
            if (element.prdctCtgyId) {
              let catObj = undefined;
              catObj = this.categoryList.find(x => x.id == element.prdctCtgyId);
              if (catObj != undefined) {
                element.prdctCtgyName = catObj.prdctCtgy;

                this.apiService.get('secure/v1/deliveryCommercial/productcategory/' + element.prdctCtgyId).subscribe(product => {
                  let ob = ErrorConstants.validateException(product);
                  if (ob.isSuccess) {
                    let pData = product.data.responseData;
                    element['productNames'] = this.getProductNames(element.deliveryProductList, pData);
                  }
                });
              }
            }
          });
        }

        /*------------ Get product list for given Category ID of Safextension payout --------------- */
        if (this.previewList['safextension_Payout'] !== undefined && this.previewList['safextension_Payout'].prdctCtgyId) {
          let categoryObj1 = this.categoryList.find(x => x.id == this.previewList['safextension_Payout'].prdctCtgyId);
          if (categoryObj1 !== undefined) {
            this.previewList['safextension_Payout'].prdctCtgyName = categoryObj1.prdctCtgy;

            this.apiService.get('secure/v1/deliveryCommercial/productcategory/' + this.previewList['safextension_Payout'].prdctCtgyId).subscribe(productData => {
              let ob = ErrorConstants.validateException(productData);
              if (ob.isSuccess) {
                this.safextensionProductList = productData.data.responseData;
                this.previewList['safextension_Payout'].productNames = this.getProductNames(this.previewList['safextension_Payout'].deliveryProductList, this.safextensionProductList);
              }
            })
          }
        }

        /*------------------ Get product list for Safextention Payout Customers ------- */
        if (this.previewList['safextension_Payout'] !== undefined && this.previewList['safextension_Payout'].customerCommercial.length > 0) {
          this.previewList['safextension_Payout'].customerCommercial.forEach(elem => {
            if (elem.prdctCtgyId) {
              let catObjSafex = undefined;
              catObjSafex = this.categoryList.find(x => x.id == elem.prdctCtgyId);
              if (catObjSafex != undefined) {
                elem.prdctCtgyName = catObjSafex.prdctCtgy;

                this.apiService.get('secure/v1/deliveryCommercial/productcategory/' + elem.prdctCtgyId).subscribe(product => {
                  let ob = ErrorConstants.validateException(product);
                  if (ob.isSuccess) {
                    let pDataSafex = product.data.responseData;
                    elem['productNames'] = this.getProductNames(elem.deliveryProductList, pDataSafex);
                  }
                });
              }
            }
          });
        }

      }
    })

    if (this.previewList['generalTerms']['deliveryBranchCommercialList'] !== undefined) {
      this.previewList['generalTerms']['deliveryBranchCommercialList'].forEach(elem => {
        if (elem.branchType == 'Gratia' || elem.branchType == 'EX-GRATIA') {
          this.graciaList.push(elem);
        } else if (elem.branchType == 'MG') {
          this.mgList.push(elem);
        }
      });
    }
    this.spinner.hide();
  }

  /*--------- Open Edit preview Dialog ------- */
  openEditPreview() {
    const dialogRefVersion = this.dialog.open(EditPreviewComponent, {
      width: '80vw',
      panelClass: 'mat-dialog-responsive',
      data: { editflow: this.editflow }
    });

    dialogRefVersion.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /*----------- get Payment Scenario --------- */
  getPaymentScenario(lkpAssocDlvryPayoutOptId) {
    let paymentScenario = '';
    if (this.previewRefList && this.previewRefList.assocDeliveryPayOutOptionList !== undefined) {
      var scenarioObj = this.previewRefList.assocDeliveryPayOutOptionList.find(x => x.id == lkpAssocDlvryPayoutOptId);
      if (scenarioObj !== undefined) {
        switch (scenarioObj.lookupVal) {
          case "WEIGHT BASIS":
            paymentScenario = scenarioObj.lookupVal;
            break;
          case "PER TRIP":
            paymentScenario = scenarioObj.lookupVal;
            break;
          case "PER WAYBILL":
            paymentScenario = scenarioObj.lookupVal;
            break;
          case "PRODUCT SPECIFIC":
            paymentScenario = scenarioObj.lookupVal;
            break;
        }
      }
      return paymentScenario;
    }
  }

  /*---------- get product names for Product specific scenario  -------- */
  getProductNames(selectedPrductArray, productList) {
    let productNames = '';
    if (selectedPrductArray !== undefined) {
      selectedPrductArray.forEach((element, index) => {
        let obj = productList.find(x => x.id == element.productId);
        if (obj !== undefined) {
          if (index !== 0) {
            productNames = productNames + ', ' + obj.prdctName;
          } else {
            productNames = obj.prdctName;
          }
        }
      });
    }
    return productNames;
  }
  /*----- Go to Doument Upload page ---------- */
  back($event) {
    $event.preventDefault();
    if (this.editflow) {
      this.router.navigate(['/asso_delivery-contract/booking-document', { steper: true, editflow: this.editflow }], { skipLocationChange: true });
    } else {
      this.router.navigate(['/asso_delivery-contract/booking-document'], { skipLocationChange: true });
    }
  }

}



@Component({
  selector: 'app-edit-preview',
  templateUrl: './edit-preview.component.html',
  styleUrls: ['./preview.component.css'],
  providers: [DatePipe]
})
export class EditPreviewComponent implements OnInit {

  editflow: boolean;
  previewList: any;
  data: any;
  previewRefList: any;
  graciaList: any = [];
  mgList: any = [];
  insuranceList: any = [];
  emiList: any = [];
  isPCD: boolean;
  categoryList: any = [];
  scheduledProductList: any = [];
  safextensionProductList: any = [];
  currentDt: string;
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'previewContent', // the id of html/table element
  }
  perList: any = [];

  customerName: string = AppSetting.customerName;
  constructor(public dialogRef: MatDialogRef<EditPreviewComponent>,
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    public dialog: MatDialog,
    private tosterservice: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private confirmDialog: MatDialog,
    private datePipe: DatePipe,
    private exportAsService: ExportAsService,
    private authorizationService: AuthorizationService,
    private permissionsService: NgxPermissionsService) { }

  ngOnInit() {

    this.authorizationService.setPermissions('CONTRACT');
    this.perList = this.authorizationService.getPermissions('CONTRACT') == null ? [] : this.authorizationService.getPermissions('CONTRACT');
    this.permissionsService.loadPermissions(this.perList);

    this.activeRoute.params.subscribe(params => {
      if (params['editflow']) {
        this.editflow = params['editflow'];
      }
    });

    this.currentDt = this.datePipe.transform(new Date(), 'MM-dd-yyyy');

    this.spinner.show();
    this.apiService.get(`secure/v1/deliverypreview/editpreview/${AppSetting.contractId}`).subscribe((suc) => {
      if (suc.data && suc.data.responseData) {
        this.previewList = suc.data.responseData;
        this.previewRefList = suc.data.referenceData;
        this.renderEditPreviewData();
        this.spinner.hide();
      } else {
        console.log("Data not Found");
        this.spinner.hide();
      }
    }, (err) => {
      this.tosterservice.error(ErrorConstants.getValue(404));
      this.spinner.hide();
    });
  }

  closePreview($event) {
    $event.preventDefault();
    if (this.editflow) {
      this.router.navigate(['/asso_delivery-contract/booking-document', { steper: true, 'editflow': 'true' }], { skipLocationChange: true });
    } else {
      this.router.navigate(['/asso_delivery-contract/booking-document'], { skipLocationChange: true });
    }
  }
  renderEditPreviewData() {
    let subDelivery = this.previewRefList.subDeliveryTypeList.find(x => x.id == this.previewList.contractDetals.lkpSubDeliveryId);
    if (subDelivery !== undefined) {
      this.previewList.contractDetals['subDeliveryName'] = subDelivery.lookupVal;
      if (subDelivery.lookupVal == 'PCD') {
        this.isPCD = true;
      } else {
        this.isPCD = false;
      }
    } else {
      this.previewList.contractDetals['subDeliveryName'] = '';
    }

    let statusObj = this.previewRefList.statusList.find(x => x.id == this.previewList.contractDetals.status);
    if (statusObj !== undefined) {
      this.previewList.contractDetals['statusName'] = statusObj.lookupVal;
    } else {
      this.previewList.contractDetals['statusName'] = '';
    }

    this.previewList.contractDetals['serviceOffrNames'] = this.displayServiceOffr(this.previewList.contractDetals.serviceOfferings);

    if (this.previewList['deliveryDeduction']['vehicleDeductionList'] !== undefined) {
      this.previewList['deliveryDeduction']['vehicleDeductionList'].forEach(elem => {
        if (elem.type == 'INSURANCE') {
          this.insuranceList.push(elem);
        } else if (elem.type == 'EMI') {
          this.emiList.push(elem);
        }
      });
    }

    if (this.previewList.deliveryCommercial !== undefined) {
      if (this.isPCD) {
        this.previewList['scheduled_Payout'] = this.previewList.deliveryCommercial.find(x => {
          if(x.customerCommercial){
           return  x.customerCommercial.find(y => y.dlvryPayoutCtgy == 'SECHEDULED' || y.dlvryPayoutCtgy == 'SCHEDULED');
          }
        });
        this.previewList['safextension_Payout'] = this.previewList.deliveryCommercial.find(x => {
          if(x.customerCommercial){
           return x.customerCommercial.find(y => y.dlvryPayoutCtgy == 'SAFEXTENSION' || y.dlvryPayoutCtgy == 'SAFE EXTENSION')
          }
        });
      } else {
        this.previewList['scheduled_Payout'] = this.previewList.deliveryCommercial.find(x => x.dlvryPayoutCtgy == 'SECHEDULED' || x.dlvryPayoutCtgy == 'SCHEDULED');
        this.previewList['safextension_Payout'] = this.previewList.deliveryCommercial.find(x => x.dlvryPayoutCtgy == 'SAFEXTENSION' || x.dlvryPayoutCtgy == 'SAFE EXTENSION');
      }
    } 

    /*------------- get Product Category list ----------- */

    this.apiService.get('secure/v1/deliveryCommercial/productcategory').subscribe(data => {
      let ob = ErrorConstants.validateException(data);
      if (ob.isSuccess) {
        this.categoryList = data.data.responseData;

        /*------------ Get product list for given Category ID of scheduled payout --------------- */
        if (this.previewList['scheduled_Payout'] !== undefined && this.previewList['scheduled_Payout'].prdctCtgyId) {
          let categoryObj = this.categoryList.find(x => x.id == this.previewList['scheduled_Payout'].prdctCtgyId);
          if (categoryObj !== undefined) {
            this.previewList['scheduled_Payout'].prdctCtgyName = categoryObj.prdctCtgy;

            this.apiService.get('secure/v1/deliveryCommercial/productcategory/' + this.previewList['scheduled_Payout'].prdctCtgyId).subscribe(productData => {
              let ob = ErrorConstants.validateException(productData);
              if (ob.isSuccess) {
                this.scheduledProductList = productData.data.responseData;
                this.previewList['scheduled_Payout'].productNames = this.getProductNames(this.previewList['scheduled_Payout'].deliveryProductList, this.scheduledProductList);
              }
            });
          }
        }

        /*------------------ Get product list for scheduled Payout Customers ------- */
        if (this.previewList['scheduled_Payout'] !== undefined && this.previewList['scheduled_Payout'].customerCommercial.length > 0) {
          this.previewList['scheduled_Payout'].customerCommercial.forEach((element, i) => {
            if (element.prdctCtgyId) {
              let catObj = undefined;
              catObj = this.categoryList.find(x => x.id == element.prdctCtgyId);
              if (catObj != undefined) {
                element.prdctCtgyName = catObj.prdctCtgy;

                this.apiService.get('secure/v1/deliveryCommercial/productcategory/' + element.prdctCtgyId).subscribe(product => {
                  let ob = ErrorConstants.validateException(product);
                  if (ob.isSuccess) {
                    let pData = product.data.responseData;
                    element['productNames'] = this.getProductNames(element.deliveryProductList, pData);
                  }
                });
              }
            }
          });
        }

        /*------------ Get product list for given Category ID of Safextension payout --------------- */
        if (this.previewList['safextension_Payout'] !== undefined && this.previewList['safextension_Payout'].prdctCtgyId) {
          let categoryObj1 = this.categoryList.find(x => x.id == this.previewList['safextension_Payout'].prdctCtgyId);
          if (categoryObj1 !== undefined) {
            this.previewList['safextension_Payout'].prdctCtgyName = categoryObj1.prdctCtgy;

            this.apiService.get('secure/v1/deliveryCommercial/productcategory/' + this.previewList['safextension_Payout'].prdctCtgyId).subscribe(productData => {
              let ob = ErrorConstants.validateException(productData);
              if (ob.isSuccess) {
                this.safextensionProductList = productData.data.responseData;
                this.previewList['safextension_Payout'].productNames = this.getProductNames(this.previewList['safextension_Payout'].deliveryProductList, this.safextensionProductList);
              }
            })
          }
        }

        /*------------------ Get product list for Safextention Payout Customers ------- */
        if (this.previewList['safextension_Payout'] !== undefined && this.previewList['safextension_Payout'].customerCommercial.length > 0) {
          this.previewList['safextension_Payout'].customerCommercial.forEach(elem => {
            if (elem.prdctCtgyId) {
              let catObjSafex = undefined;
              catObjSafex = this.categoryList.find(x => x.id == elem.prdctCtgyId);
              if (catObjSafex != undefined) {
                elem.prdctCtgyName = catObjSafex.prdctCtgy;

                this.apiService.get('secure/v1/deliveryCommercial/productcategory/' + elem.prdctCtgyId).subscribe(product => {
                  let ob = ErrorConstants.validateException(product);
                  if (ob.isSuccess) {
                    let pDataSafex = product.data.responseData;
                    elem['productNames'] = this.getProductNames(elem.deliveryProductList, pDataSafex);
                  }
                });
              }
            }
          });
        }

      }
    })


    if (this.previewList['generalTerms']['deliveryBranchCommercialList'] !== undefined) {
      this.previewList['generalTerms']['deliveryBranchCommercialList'].forEach(elem => {
        if (elem.branchType == 'Gratia' || elem.branchType == 'EX-GRATIA') {
          this.graciaList.push(elem);
        } else if (elem.branchType == 'MG') {
          this.mgList.push(elem);
        }
      });
    }
    this.spinner.hide();
  }

  /*---------- return service offerings -------- */
  displayServiceOffr(offeringArray) {
    let offeringNames = '';
    if (offeringArray !== undefined) {
      offeringArray.forEach((element, index) => {
        let obj = this.previewRefList.serviceOfferingList.find(x => x.id == element.serviceOfferingId);
        if (obj !== undefined) {
          if (index !== 0) {
            offeringNames = offeringNames + ',' + obj.serviceOffering;
          } else {
            offeringNames = obj.serviceOffering;
          }
        }
      });
    }
    return offeringNames;
  }

  /*----------- get Payment Scenario --------- */
  getPaymentScenario(lkpAssocDlvryPayoutOptId) {
    let paymentScenario = '';
    if (this.previewRefList && this.previewRefList.assocDeliveryPayOutOptionList !== undefined) {
      var scenarioObj = this.previewRefList.assocDeliveryPayOutOptionList.find(x => x.id == lkpAssocDlvryPayoutOptId);
      if (scenarioObj !== undefined) {
        switch (scenarioObj.lookupVal) {
          case "WEIGHT BASIS":
            paymentScenario = scenarioObj.lookupVal;
            break;
          case "PER TRIP":
            paymentScenario = scenarioObj.lookupVal;
            break;
          case "PER WAYBILL":
            paymentScenario = scenarioObj.lookupVal;
            break;
          case "PRODUCT SPECIFIC":
            paymentScenario = scenarioObj.lookupVal;
            break;
        }
      }
      return paymentScenario;
    }
  }

  /*---------- get product names for Product specific scenario  -------- */
  getProductNames(selectedPrductArray, productList) {
    let productNames = '';
    if (selectedPrductArray !== undefined) {
      selectedPrductArray.forEach((element, index) => {
        let obj = productList.find(x => x.id == element.productId);
        if (obj !== undefined) {
          if (index !== 0) {
            productNames = productNames + ',' + obj.prdctName;
          } else {
            productNames = obj.prdctName;
          }
        }
      });
    }
    return productNames;
  }

  /*---------- On close dialog ------- */
  onCloseEditPreview() {
    const dialogRefConfirm = this.confirmDialog.open(confimationdialog, {
      width: '300px',
      data: { message: 'Are you sure ?' },
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if (value) {
        this.dialogRef.close();
      } else {
        console.log('Keep Open');
      }
    });
  }

  sendEmail() {
    let userDt = JSON.parse(sessionStorage.getItem("all")).data.responseData
      .user;
    const addrDialog = this.dialog.open(EmailPreviewComponent, {
      panelClass: "mat-dialog-responsive",
      disableClose: true,
      data: { email: userDt.email },
    });

    addrDialog.afterClosed().subscribe((result) => {
      if (result && result != "") {
        this.spinner.show();
        let ob = {
          userId: userDt.userId,
          associateEmailId: result,
          assocId: AppSetting.associateId,
          cntrctCode : this.previewList.cntrCode ? this.previewList.cntrCode : "NOT GENERATED YET",
          ver : this.previewList.contractDetals.ver ? this.previewList.contractDetals.ver : "1"
        };

        // before making pad do some initial things
        document.querySelectorAll("tr").forEach((v) => {
          if (!v.innerText) {
            v.parentNode.removeChild(v);
          }
        });
        // end before making pad do some initial things

        let doc = new jspdf("p", "px", "a4");
        doc.setFont("helvetica");

        document.querySelectorAll(".table_edit").forEach((v: any, i) => {
          if (v.getAttribute("data-page") || doc.autoTableEndPosY() > 450) {
            doc.addPage();
          }

          // start headers
          let h3 = "";
          let h5 = "";
          let addPagFlg = false;
          if (!v.getAttribute("class").includes("h5")) {
            h3 = v.id;
          } else {
            h5 = v.id;
          }
          if (v.getAttribute("data-h5")) {
            h5 = v.getAttribute("data-h5");
          }

          let billingSecondtbl = v.getAttribute("class").includes("billingTwo");
          if (h3) {
            doc.setFontSize(15);
            if (v.getAttribute("data-page") || doc.autoTableEndPosY() > 450) {
              doc.text(h3, 10, 45);
            } else {
              if (h3 == "Delivery Associate Contract") {
                // doc.text('Preview For Edited Data', 10, 45)
                doc.text(h3, 10, 60);
              } else {
                doc.text(h3, 20, doc.autoTableEndPosY() + 20);
                doc.rect(0, doc.autoTableEndPosY() + 11, 15, 10, "F");

                if (v.id == "Allocation") {
                  doc.setFontSize(12);
                  doc.text("Branch", 10, doc.autoTableEndPosY() + 40);
                }

                // if (
                //   v.id == "Payment Terms" &&
                //   this.previewList &&
                //   this.previewList.scheduled_Payout !== undefined &&
                //   !this.isPCD
                // ) {
                //   doc.setFontSize(10);
                //   doc.text("Scheduled Payout", 10, doc.autoTableEndPosY() + 40);
                // } else if (
                //   v.id == "Payment Terms" &&
                //   this.previewList &&
                //   this.previewList.scheduled_Payout != undefined &&
                //   this.previewList.scheduled_Payout.dlvryPayoutCtgy &&
                //   !this.isPCD
                // ) {
                //   doc.setFontSize(10);
                //   doc.text("GENERAL", 10, doc.autoTableEndPosY() + 40);
                // }
              }
            }
            doc.setFontSize(9);
          }

          if (h5 && !h3) {
            doc.setFontSize(12);
            if (v.getAttribute("data-page") || doc.autoTableEndPosY() > 450) {
              doc.text(h5, 10, 40); // new page start heading
              addPagFlg = true;
            } else {
              doc.text(h5, 10, doc.autoTableEndPosY() + 20);
            }
            doc.setFontSize(9);
          }

          if (h5 && h3) {
            doc.setFontSize(12);
            if (v.getAttribute("data-page") || doc.autoTableEndPosY() > 450) {
              doc.text(h5, 10, 60);
            } else {
              doc.text(h5, 60, doc.autoTableEndPosY() + 60);
            }
            doc.setFontSize(9);
          }
          // headers end

          // show heading
          let tableHeading = v.getAttribute("data-heading");
          let fillColor_ = [255, 255, 255];
          let textColor_ = [255, 255, 255];
          if (tableHeading) {
            fillColor_ = [39, 174, 96];
            textColor_ = [0, 0, 0];
          }
          // end show heading

          // track & set table marting
          var res = doc.autoTableHtmlToJson(v);
          if (res) {
            let tblMgn = 13;
            if (h3 || h5) {
              tblMgn = 25;
            }
            if (h5 && h3) {
              tblMgn = 65;
            }
            if (billingSecondtbl) {
              tblMgn = 5;
            }

            // track individula tables
            if (v.id == "Delivery Associate Contract") {
              tblMgn = 100;
            }
            if (
              h5 == "MSA Details" ||
              h5 == "Opportunity" ||
              h5 == "Increment Clause" ||
              h5 == "Insurance Details" ||
              h5 == "Security Detail"
            ) {
              tblMgn = 22;
            }
            if (h5 == "Details") {
              tblMgn = 60;
            }

            if (v.getAttribute("class").includes("commerTble")) {
              tblMgn = 20;
            }
            if (v.getAttribute("class").includes("GSTApplicable")) {
              tblMgn = 2;
            }
            if (v.getAttribute("class").includes("Safextension")) {
              tblMgn = 30;
            }

            if (v.id == "Billing") {
              tblMgn = 35;
            }
            if (v.getAttribute("class").includes("ServiceTblTop")) {
              tblMgn = 20;
            }
            if (v.getAttribute("class").includes("rateCardTble")) {
              tblMgn = 26;
            }
            if (v.id == "Allocation") {
              tblMgn = 50;
            }
            if (v.getAttribute("class").includes("general")) {
              tblMgn = 20;
            }

            if (addPagFlg) {
              // if page add then add extra margin
              tblMgn = tblMgn + 15;
            }
            // end track individula tables

            //  colume styles
            let cs;
            let green = [39, 174, 96];
            let grey = [204, 204, 204];
            let white = [255, 255, 255];
            let blk = [0, 0, 0];

            // colume styles

            if (v.getAttribute("class").includes("twoCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 215,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 215,
                },
              };
            } else if (v.getAttribute("class").includes("threeCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 143,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 143,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 143,
                },
              };
            } else if (v.getAttribute("class").includes("fourColWithHead")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
              };
            } else if (v.getAttribute("class").includes("fourCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                2: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 107.5,
                },
              };
            } else if (v.getAttribute("class").includes("fiveCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 86,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 86,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 86,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 86,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 86,
                },
              };
            } else if (v.getAttribute("class").includes("sixCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
                5: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 71.6,
                },
              };
            } else if (v.getAttribute("class").includes("sevenCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                5: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
                6: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 61.4,
                },
              };
            } else if (v.getAttribute("class").includes("eightCol")) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                5: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                6: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
                7: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 53.7,
                },
              };
            } else if (v.getAttribute("class").includes("nineCol")) {
              // for billing only
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 40.7,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 40.7,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 47.7,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 83.7,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 47.7,
                },
                5: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 40.7,
                },
                6: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 37.7,
                },
                7: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 47.7,
                },
                8: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 42.7,
                },
              };
            } else if (v.getAttribute("class").includes("tenCol")) {
              // for billing only
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 36.7,
                },
                1: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 36.7,
                },
                2: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 43.7,
                },
                3: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 79.7,
                },
                4: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 42.7,
                },
                5: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 36.7,
                },
                6: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 33.7,
                },
                7: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 43.7,
                },
                8: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 38.7,
                },
                9: {
                  fillColor: grey,
                  textColor: blk,
                  lineColor: white,
                  columnWidth: 43.7,
                },
              };
            } else if (
              v.id == "Delivery Associate Contract" ||
              v.getAttribute("class").includes("billingTwo")
            ) {
              cs = {
                0: {
                  fillColor: green,
                  textColor: white,
                  lineColor: white,
                  columnWidth: 215,
                  fontSize: 10,
                  fontStyle: "bold",
                },
                1: {
                  fillColor: green,
                  textColor: white,
                  lineColor: white,
                  columnWidth: 215,
                  fontSize: 10,
                  fontStyle: "bold",
                },
              };
            } else if (v.getAttribute("class").includes("customersTable")) {
              // for billing only
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: green,
                  columnWidth: 200,
                },
                1: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: green,
                  columnWidth: 200,
                },
              };
            } else if (v.getAttribute("class").includes("general")) {
              // for billing only
              cs = {
                0: {
                  fillColor: green,
                  textColor: blk,
                  lineColor: green,
                  columnWidth: 200,
                },
              };
            }

            //for billing tbl
            let trLnofBilTbl: any;
            if (document.querySelectorAll(".billTh_edit")) {
              trLnofBilTbl = document.querySelectorAll(".billTh_edit").length;
              if (trLnofBilTbl == 8) {
                trLnofBilTbl = "eightCol";
              } else if (trLnofBilTbl == 9) {
                trLnofBilTbl = "nineCol";
              } else if (trLnofBilTbl == 10) {
                trLnofBilTbl = "tenCol";
              }
              let blgTbl = document.getElementsByClassName("billTbl_edit");
              if (blgTbl[0]) {
                blgTbl[0].setAttribute(
                  "class",
                  "table_ billTbl_edit " + trLnofBilTbl
                );
              }
            }

            // table font size
            let fontSize = 8;
            if (
              v.id == "Geography Commandments" ||
              v.id == "Non Geography Commandments" ||
              v.getAttribute("class").includes("nonGeoTwo")
            ) {
              fontSize = 6;
            }
            // table font size

            if (v.getAttribute("data-page") || doc.autoTableEndPosY() > 450) {
              doc.autoTable(res.columns, res.data, {
                startY: tblMgn,
                minCellWidth: 40,
                cellWidth: "auto",
                tableWidth: "auto",
                theme: "grid",
                columnStyles: cs,
                drawRow: function (row) {
                  if ((row.index > 0 && row.index % 20) === 0) {
                    doc.autoTableAddPageContent();
                  }
                },
                margin: {
                  top: 70,
                  left: 10,
                },
                styles: {
                  cellPadding: 3,
                  fontSize: fontSize,
                  valign: "middle",
                  overflow: "linebreak",
                  tableWidth: "auto",
                  //fileColor: [30, 30, 30],
                },
                headerStyles: {
                  //columnWidth: 'wrap',
                  cellPadding: 2,
                  valign: "top",
                  fontStyle: "bold",
                  halign: "left", //'center' or 'right'
                  fillColor: fillColor_,
                  // textColor: [78, 53, 73], //Black
                  textColor: textColor_, //White
                  fontSize: fontSize,
                },
              });
            } else {
              let startY = doc.autoTableEndPosY() + tblMgn;
              if (v.id == "Delivery Associate Contract") {
                startY = 70;
              }
              doc.autoTable(res.columns, res.data, {
                startY: startY,
                minCellWidth: 40,
                cellWidth: "auto",
                tableWidth: "auto",
                theme: "grid",
                columnStyles: cs,
                drawRow: function (row) {
                  if ((row.index > 0 && row.index % 20) === 0) {
                    doc.autoTableAddPageContent();
                  }
                },
                margin: {
                  top: 70,
                  left: 10,
                },
                styles: {
                  cellPadding: 3,
                  fontSize: fontSize,
                  valign: "middle",

                  overflow: "linebreak",
                  tableWidth: "auto",
                  //fileColor: [30, 30, 30],
                },
                headerStyles: {
                  //columnWidth: 'wrap',
                  cellPadding: 2,

                  valign: "top",
                  fontStyle: "bold",
                  halign: "left", //'center' or 'right'
                  fillColor: fillColor_,
                  //textColor: [78, 53, 73], //Black
                  textColor: textColor_, //White
                  fontSize: fontSize,
                },
              });
            }
            if (billingSecondtbl) {
              doc.setLineWidth(2);
              doc.setDrawColor(39, 174, 96);
              doc.line(
                10,
                doc.autoTableEndPosY() + tblMgn,
                440,
                doc.autoTableEndPosY() + tblMgn
              );
              doc.setLineWidth(0.5);
            }
          }
          // end  track & set table marting
        });

        // header footer
        const pageCount = doc.internal.getNumberOfPages();
        const base64Img =
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/4RD0RXhpZgAATU0AKgAAAAgABAE7AAIAAAAOAAAISodpAAQAAAABAAAIWJydAAEAAAAcAAAQ0OocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE5hcmVzaCAgS3VtYXIAAAWQAwACAAAAFAAAEKaQBAACAAAAFAAAELqSkQACAAAAAzA1AACSkgACAAAAAzA1AADqHAAHAAAIDAAACJoAAAAAHOoAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyMDIwOjExOjA1IDIwOjUzOjE1ADIwMjA6MTE6MDUgMjA6NTM6MTUAAABOAGEAcgBlAHMAaAAgACAASwB1AG0AYQByAAAA/+ELIGh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iLz48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHhtcDpDcmVhdGVEYXRlPjIwMjAtMTEtMDVUMjA6NTM6MTUuMDQ2PC94bXA6Q3JlYXRlRGF0ZT48L3JkZjpEZXNjcmlwdGlvbj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPk5hcmVzaCAgS3VtYXI8L3JkZjpsaT48L3JkZjpTZXE+DQoJCQk8L2RjOmNyZWF0b3I+PC9yZGY6RGVzY3JpcHRpb24+PC9yZGY6UkRGPjwveDp4bXBtZXRhPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8AAEQgAagdUAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+kaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACsvxOSPCOsEcEWM//AKLNalZfij/kUNY/68Z//RbUAfNvw9+Hut+OfDq3em65DZJbhImWeJ5Cx2g5BDD1rW1j4X3fh+SNNd+Iuhac8n3FuUaMsPUAy9Peuv8A2cP+RHuv+uyf+i1rya7sdE1r9pbXbH4pzzQ2ss8sdszSmNQcjyQW7Ls6dulRGKaPOw+GozpqUo3ev5ncRfBTX57AXsPjXS5LQp5gnSBzGV67t3mYx71V0r4T3+vGUaH8QtD1Ew480WimXZnOM7ZTjOD+Vd18Q47L4a/s+ajpukSSeQtsbO2Mr7mPmtg8+ysx/CvKf2fvP8IfFhdHvXxHrejRXMeeMsY1mX8gXFPlib/U8P8Ayo0r74dHTL2Sz1H4n+G7S5iOJIZ22Oh68qZcint8NJU02LUH+Jfh1bKZykdyxxG7DqA3m4JHpXO67pfhrxF+09rdv4rulj0diWeZZtg3CJcDcPftVj4up4Sh+HejeGvh/cyXcVnfSTujBztDA5O9gAeT60uWJEsNhY/EkjcsPhjcarLJFpfxK8PXskcZldLc+YVQdWIWU4Az1rX8FfDVbnXYdRPjjR9b07T5BJdRWPzYwCQGYSEKMjv2BqP4YW/gzwzPDqvhXwz4n1DUZrMQTyQwb4STtLAMzBRyvrXmfiLUdV+FHijxZptpplzptn4lsiLa3nZN0SO/B+RmX5QZVGD3FPliVHC4fdRR758Rzpvj3wukOi+O9F0+ws7lJL24M6SoT/yzVmDgLzk4J5IHpXn2mfC9taufs+j/ABP0K/nxnyrZBI2PosxNReI/BX/CE/smyW9xHs1C9ngu7vI5Ds4wp/3VwPqDXmWuW3hzRPA/gzV/Cl6I/FMhaS8W2uC7Iyt8hZcnY2eg4z6U2k9zWpQp1Heauep6j8Ln0i7Nrq3xQ0GxuAAxhuVEbgHodrTA1ai+DWp3GlvqVv8AEHS5rFEZ2uY7YtGFAyTuEuMAVyHxB/sjxB+0JpjeI3jn0uS2t1v2hkJVT5Z3DchyMN6VR8L63beDtd8c6XYTXR8M6jYXdvY+YDh5D8sTc4xwSMnHHWp5YmEsPhY/Ekjo4/BWnzSpFF8XPDryOwVVVQSxPQD99V7XPhfL4aEf9v8AxK0jTzLzGtxbMrMPUDzcke9cn8H/AAp4f1PS5Z9X8I63rupwX2YZ9NkAhjUKhCs/mKu7OTg9iKXxMNN1D9pCcfFi2urLS7jASKWXAiQoBFlkJG3PUqeuc96fLEpYXDtXUUdpD8H7+40f+1oPiJpL6dt3fa1tz5WPXf5uKh0f4Vz+IWkXQviVo+otH99baAyFfcgS8Cq3x88PReEfhR4e0nwm03/CPfbZZJCJTICz/PH83ccvjPtXoHwa8GeBbKzh8UeBrmeZ7iz+zXAefdhiVZgyn7rAr7D9KOWI/qlD+VHE+B9I1Dwz8foNA1HUFvmtMnzo0KBt9szfdLHpn1r6Mrw1P+Ttrj/dj/8ASM17lRHS4sNGMHOMdr/ogoooqjrCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKy/FH/ACKGsf8AXjP/AOi2rUrL8Uf8ihrH/XjP/wCi2oA8y/Zw/wCRHuv+uyf+i1rkfj7q/wAO/Emk6iTeGHxZpE5tY41iYPIVfDKxxgrjJBzx+OK679nD/kR7r/rsn/ota6rVfg74E1rXpNY1LQIZr2aTzJX8xwsjHkllBwc+4qY7HNhf4K+f5nzVrXiLVtQ+FHg7RPEVzJPaXMkr28KRnzSI3KRszZyyncVAAH3e9UL+6tmvbd9SmM10FW2hM7FnVR8oQbvugdOwFfWepfDfwnq2rafqV9pET3OmqiWhDMqwqjblAUHGAfaovE/gbwZ4m8n/AISHTbacwO7ptYoQzY3E7SMk7R19KHG5FfC+2knzNLsfOvhXw1Jqfxj/AOEI1sfZBAjPM9q4ZiQgYAEjHfnit39ojwRoXhDwVo50S08qWW8KyTO7O7jYTgknpnt0r2iHw/4SsfFj+JbXTf8AicSLta6BbJG0L3OOgHapfEvh7SPHdnBa67on26CB/MjEkjIFbGM8Y7U1FLY0pYelS+CJQ+HPxF8KeJdPsdF0PVVudQtbBHmhEMi7QoVWOWUDgkd6+ffiNcX/AMXfHXifUtFcvp3hexLQbeQ6o43EfX94wPooFfQ/h74VeGPDdxcXGj6RDYy3Vu1tK0UshYxtjIyW46DkVo+Gfh54Y8IW17BoGlpbR36hbkF2fzAARg7iePmP50zoPCfE/i3UvHfwJs9YvNShbTLd4rTVrMRgS+epGJN3Uhsq2BjGe9cX4a8INr1wsPhrSftz8EvGoIQerOeB+Jr6atPhB4IsdGvdKttG22N86PcQG4kZXZCSp5bjGe1b+kadonhbSotN0iKGztYRhIo+cc5+pqHG5x18Kq0k3Jpdj5N1nw1rmn/Ei08FPJbxXt1EGWSI7wHZCyrkgdwAeK6L4S32m33w/wDHGk6zp9u3iDT7C6lS4mjBl8vy2BXJ5G1h/wCPCvdL/wAO+EbzxfD4nuNNM+sQbfLudzDbtGBxnHT2qpB4A8Lv4gvdas/DmL2/WVLmUzuqyrICHBXO3BzVKKWxrSw9Kl8ETyP9nj4k+F/CXhK60fXtQNtfXepl4YxC7bgyRqOQCByDW58ePEXw813StV0rV5pIfE2kDbZ7YW3sxAYAMBgoc85IxXf2vwb8Fw3Ec6+GtOhkjYOpVWJBByD1rQ1r4V+C/EOsHVdZ0G2ub1iC8pBHmYGBuAOG4A60zc8j+FvifRLX4G22mfE+QjSNRvJ7aya4jZkMahTjI5GGLYPbHbFYHwHnTT/jtqmm+Ebue78OyRzZdwQGjU/u3I9cnAPHU19D694A8MeJdEttI1fSIJbG0/494kzGIuMfLtxjj0qTwt4H8OeC7aSDw1pcNkJceYy5Z3x0yxyT+dAHlif8nbT/AO7H/wCkZr3KvDU/5O2n/wB2P/0jNe5VK6nNQ+Kp6/ogoooqjpCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKy/FH/Ioax/14z/APotq1Ky/FH/ACKGsf8AXjP/AOi2oA8y/Zw/5Ee6/wCuyf8Aota9hrwP4H+KdC0PwRc2utaklnJOylQwbJXywMggV2LeK/DwZfK8ahUXTDZ7CshzLz++zjOefWoi1Y4cNWpxpJOS69fM77ULJ7qP91KysP4c/KaybfSLiZz5g8pQcEtWBP438NS+GoNPTxXALmNYg85WUb9pGc7cHnHY1U1HxZoN2NZ+z+NktjfCH7MyrL/oxTGSO3OO2PfNVzI6Pb0f5l96PQbbTLa3wQm9v7zc1c6V5uni/wAOx+dKvjNWma0igQOJDGrJyXIxnJPXnpT5fGPhqe61R5fFsYivYY0iRBIvkMowSCPU80cyD29L+Zfej0WiuEsvHnhe21nULqXxRDLBc+X5UJV8Q7VwccdzzVR/GugSHTy/i+AfZZma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4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSisv/hI7D+7ff+C+f/4ij/hI7D+7ff8Agvn/APiKANSisv8A4SOw/u33/gvn/wDiKP8AhI7D+7ff+C+f/wCIoA1KKy/+EjsP7t9/4L5//iKP+EjsP7t9/wCC+f8A+IoA1KKy/wDhI7D+7ff+C+f/AOIo/wCEjsP7t9/4L5//AIigDUorL/4SOw/u33/gvn/+Io/4SOw/u33/AIL5/wD4igDUorL/AOEjsP7t9/4L5/8A4ij/AISOw/u33/gvn/8AiKANSiqdnqltfuy24uAVGT5ttJEPzZRmrlABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/2Q==";
        let dt = this.toJSONLocal(new Date());
        let dtArr = dt.split("-");
        let y = dtArr[0];
        let m = dtArr[1];
        let d = dtArr[2];
        for (var i = 1; i <= pageCount; i++) {
          doc.setPage(i);

          if (i == 1) {
            //only on first page
            doc.text(
              "PREVIEW GENERATED ON : " + d + "/" + m + "/" + y,
              310,
              45
            );
          }
          // doc.text(this.customerName, 190 - (this.customerName.length/2), 13);

          // header
          doc.addImage(base64Img, "JPEG", 8, 5, 434, 20); //original
          // doc.setFontSize(5);
          // doc.text('SAFEXPRESS CONFIDENTIAL', 380, 20);
          // doc.setFontSize(8);

          doc.setLineWidth(0.4);
          doc.setDrawColor(204, 204, 204);

          // doc.line(10, 25, 440, 25)
          doc.line(10, 610, 440, 610);

          // footer

          doc.setFontSize(5);
          doc.text("SAFEXPRESS CONFIDENTIAL", 10, 620);
          doc.setFontSize(8);
          doc.text(String(i) + " / " + String(pageCount), 420, 620);
        }
        // end header footer

        // file save and send
        var file = new Blob([doc.output("blob")], {
          type: "application/pdf",
        });
        // doc.save("table.pdf");
        this.sendData(ob, file);
        this.spinner.hide();
        // end file save and send
      }
    });
  }
  toJSONLocal (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}
  b64toBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'application/pdf' });
  }

  sendData(ob, file){
    this.apiService.sendEmail(file, ob, this.previewList.assocName)
    .subscribe(data => {
      this.spinner.hide();
      this.tosterservice.success("Email Sent Successfully !");
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue In Sending Email !');
    });
   
   }

  /*---------- on submit prview open success page ------------ */
  submitContract() {
    this.spinner.show();
    this.apiService.put(`secure/v1/deliverycontract/submit/${AppSetting.contractId}`).subscribe((suc) => {
      let ob = ErrorConstants.validateException(suc);
      if (ob.isSuccess) {
        this.spinner.hide();
        AppSetting.sfxCode = suc.data.responseData;
        // this.router.navigate(['/asso_delivery-contract/success'])
        const succDialog = this.dialog.open(SuccessComponent, {
          disableClose: true,
          panelClass: 'mat-dialog-responsive',
          data: { editflow: true },
          width: '64rem'
        });

        succDialog.afterClosed().subscribe(data => {
          this.dialog.closeAll();
        })

      } else {
        this.tosterservice.error(ob.message);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.tosterservice.error('Issue in generating Associate Contract Code.');
    });
  }
}

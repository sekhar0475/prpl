import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingAssociateContractComponent } from './components/booking-associate-contract/booking-associate-contract.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateAssociateContractComponent } from './components/create-associate-contract/create-associate-contract.component';
import { BranchAllocationComponent } from './components/branch-allocation/branch-allocation.component';
import { BookingPayoutComponent } from './components/booking-payout/booking-payout.component';
import { BookingSlaComponent } from './components/booking-sla/booking-sla.component';
import { BookingDocumentComponent } from './components/booking-document/booking-document.component';
import { SuccessComponent } from './components/success/success.component';
import { CreateAssociateComponent } from './components/create-associate/create-associate.component';
import { AssociateKycComponent } from './components/associate-kyc/associate-kyc.component';
import { VehicleAllocationComponent } from './components/vehicle-allocation/vehicle-allocation.component';
import { VehicleDocumentComponent } from './components/vehicle-document/vehicle-document.component';
import { AssociateStaffComponent } from './components/associate-staff/associate-staff.component';
import { CreateAssociateStaffComponent } from './components/create-associate-staff/create-associate-staff.component';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';
import { AssignAssociateComponent } from './components/assign-associate/assign-associate.component';
import { BranchVehicleAllocationComponent } from './components/branch-vehicle-allocation/branch-vehicle-allocation.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { PreviewComponent } from './components/preview/preview.component';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyComponetComponent } from './empty-componet/empty-componet.component';
import { StaffDocumentComponent } from './components/staff-document/staff-document.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ApilogComponent } from './components/apilog/apilog.component';

const routes: Routes = [
  {
    path: 'asso_delivery-contract',
    children: [
      {
        path: "",
        component: EmptyComponetComponent
      },
      {
        path: "booking-associate-contract",
        component: BookingAssociateContractComponent
      },
      {
        path: "asso_delivery",
        component: DashboardComponent
      },
      {
        path: "create-associate-contract",
        component: CreateAssociateContractComponent
      },
      {
        path: "assign-associate",
        component: AssignAssociateComponent
      },
      {
        path: "branch-allocation",
        component: BranchAllocationComponent
      },
      {
        path: "booking-payout",
        component: BookingPayoutComponent
      },
      {
        path: "booking-sla",
        component: BookingSlaComponent
      },
      {
        path: "booking-document",
        component: BookingDocumentComponent
      },
      {
        path: "success",
        component: SuccessComponent
      },

      {
        path: "create-associate",
        component: CreateAssociateComponent
      },
      {
        path: "associate-kyc",
        component: AssociateKycComponent
      },
      {
        path: "vehicle-allocation",
        component: VehicleAllocationComponent
      },
      {
        path: "vehicle-document",
        component: VehicleDocumentComponent
      },
      {
        path: "associate-staff",
        component: AssociateStaffComponent
      },
      {
        path: "create-associate-staff",
        component: CreateAssociateStaffComponent
      },
      {
        path: "create-associate-staff/:id",
        component: CreateAssociateStaffComponent
      },
      {
        path: "pending-tasks",
        component: PendingTasksComponent
      },
      {
        path: "branch-vehicle-allocation",
        component: BranchVehicleAllocationComponent
      },
      {
        path: "vehicle",
        component: VehicleComponent
      },
      {
        path: "preview",
        component: PreviewComponent
      },
      {
        path: "staff-document",
        component: StaffDocumentComponent
      },
      {
        path: "reports",
        component: ReportsComponent
      },
      {
        path: "apilog",
        component: ApilogComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],

})
export class AppRoutingModule { }

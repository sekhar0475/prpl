import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'booking';


  core_css = `html {
    font-size: 45% !important;
}

body {
    margin: 0;
    font-family: 'Open Sans', sans-serif !important;
    background: #f3f3f3 !important;
    font-weight: 400;
    line-height: 1.8;
    height: 100vh;
    box-sizing: border-box;
    font-size: 1.4rem;
    overflow-y: scroll !important;
}

::-webkit-scrollbar {
    width: 1rem !important;
    height: 1rem !important;
}
.parent{position: relative !important;}

::-webkit-scrollbar-track {
    background: #EBEBF2;
}

::-webkit-scrollbar-thumb {
    background: #6A6868;
    border-radius: 1rem;
}

::-webkit-scrollbar-thumb:hover {
    background: #585757;
}

h1 {
    font-size: 4.2rem !important;
}

h2 {
    font-size: 3.2rem !important;
}

h3 {
    font-size: 2.4rem !important;
    /* word-break: break-all; */
}

h4 {
    font-size: 1.8rem !important;
}

h5 {
    font-size: 1.8rem !important;
}

h6 {
    font-size: 1.6rem !important;
}

p {
    margin: 0 0 1.4rem !important;
    font-size: 1.6rem !important;
}

strong {
    font-weight: 700 !important;
}

.col-lg-1,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-md-1,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-sm-1,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-xs-1,
.col-xs-10,
.col-xs-11,
.col-xs-12,
.col-xs-2,
.col-xs-3,
.col-xs-4,
.col-xs-5,
.col-xs-6,
.col-xs-7,
.col-xs-8,
.col-xs-9 {
    min-height: 0.1rem !important;
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
}

.row {
    margin-left: -1.5rem !important;
    margin-right: -1.5rem !important;
}

a {
    color: #27AE60;
    cursor: pointer !important;
}

hr {
    margin: 8px 0px;
}

.associateAirContainer .theme_color {
    color: #27AE60 !important;
}

.associateAirContainer .theme_bg_color {
    background: #27AE60 !important;
}

.associateAirContainer .color_white {
    color: #fff !important;
}

.associateAirContainer .color_black {
    color: #333;
}

.associateAirContainer .position_relative {
    position: relative !important;
}

.associateAirContainer .mat-grid-tile.notepad_card .mat-figure {
    justify-content: flex-start !important;
    padding: 0 20px;
}

.associateAirContainer .mat-grid-tile.notepad_open_card .mat-figure {
    justify-content: flex-start !important;
    padding: 5px 20px;
    align-items: start;
}

.associateAirContainer .mat-grid-tile.module_area .mat-figure {
    padding: 5px 15px;
}
.associateAirContainer .module_area {
    margin-bottom: 1rem;
}
.associateAirContainer .mr_top_10 {
    margin-top: -9px !important;
}

.associateAirContainer .mat-grid-tile.module_area.module_btn .mat-figure {
    padding: 5px 0px;
}

.associateAirContainer .mat-grid-tile.module_area.module_txt .mat-figure {
    padding: 5px 15px;
    justify-content: start;
    padding-left: 35px;
}

.associateAirContainer .mat_card_zone {
    padding: 30px 5% 40px !important;
    border-radius: 0px !important;
    min-height: auto;
}

.associateAirContainer .left_00 {
    left: 0;
}
.associateAirContainer .pL_10{padding-left: 10px !important;}
.associateAirContainer .aF .mat-select-value-text{position: relative !important; top: .4rem !important;}

.associateAirContainer .add_new_left.mat-grid-tile .mat-figure {
    justify-content: left;
}

.associateAirContainer .mat_cell_icon {
    display: flex !important;
    justify-content: flex-end !important;
    height: 30px;
    padding: 2px;
}

.associateAirContainer .grid_title h3 {
    margin: 20px 0;
}

.associateAirContainer .mat-button {
    line-height: 31px !important;
    padding: 4px 16px !important;
}


/* modals css start */

.associateAirContainer h5.sub_heading {
    font-weight: 700;
    font-size: 18px;
}

.associateAirContainer .modals_cancel_btn {
    position: absolute;
    right: 0px;
    top: -2px;
    color: #000;
    cursor: pointer;
}

.associateAirContainer .modals_card {
    padding: 0px !important;
    box-shadow: none !important;
}

.associateAirContainer .mat-dialog-container {
    padding: 10px !important;
    border-radius: 20px !important;
}

.associateAirContainer .modal-container {
    width: auto;
    position: relative;
}

.associateAirContainer .border_row {
    background: #27AE60;
}


/* delete modals stert */

.associateAirContainer .delete_modal {
    text-align: center;
    padding: 0 105px;
}

.associateAirContainer .delete_modal p {
    line-height: 22px;
    font-size: 15px;
    margin: 30px 0 56px;
}

.associateAirContainer .display_inline {
    display: inline-block;
    margin: 0 15px 0px 0;
}

.associateAirContainer .text-center {
    text-align: center;
}


/*  input css */



.associateAirContainer .float_right {
    float: right;
}

.associateAirContainer .mat-button {
    min-width: 30px !important;
    padding: 0 11px !important;
}

.associateAirContainer .mat-expansion-panel-header {
    padding: 0 9px !important;
}

.associateAirContainer .mat-content>mat-panel-title,
.associateAirContainer .mat-content>mat-panel-title {
    font-size: 1.6rem;
    font-weight: 600;
    margin-top: 5px;
    color: #27ae60;
    font-family: 'Open Sans', sans-serif !important;
}

.associateAirContainer .mat-radio-button.mat-accent .mat-radio-inner-circle,
.associateAirContainer .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple),
.associateAirContainer .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-persistent-ripple,
.associateAirContainer .mat-radio-button.mat-accent:active .mat-radio-persistent-ripple {
    background-color: #27AE60;
}

.associateAirContainer .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {
    border-color: #27AE60;
    width: 12px;
    height: 12px;
}

.associateAirContainer .mat-radio-button .mat-ripple-element {
    background-color: #0000;
}
.associateAirContainer .mat-radio-button.mat-accent .mat-radio-outer-circle {
    border-color: rgba(0,0,0,.54);
    width: 12px;
    height: 12px;
    border-width: 0.1rem;
}

.associateAirContainer .mat-radio-button .mat-radio-container {
    width: 12px;
    height: 12px;
}
.associateAirContainer .mat-radio-inner-circle {
    height: 12px;
    width: 12px;
}
.mat-radio-input.cdk-visually-hidden {
    height: 0px !important;
}

.associateAirContainer .mat-grid-tile .mg_left_3 {
    margin: 0 -3px !important;
}

.associateAirContainer .mat_card_zone .mat-grid-tile .mat-figure {
    display: block;
    /* padding: 5px 10px; */
}

.associateAirContainer .mr_rl_10 {
    margin: 0 10px;
}

.associateAirContainer .minimize_icon {
    position: absolute;
    top: -5px;
    left: 3px;
}


/* adarsh css start */

.associateAirContainer .container {
    width: 73vw;
    margin: 0 auto;
    position: relative;
}
.associateAirContainer .breadcrumb1{padding: 0rem 1.5rem !important;margin-bottom: 3rem !important;border-radius: .4rem !important;}

.associateAirContainer .breadcrumbs span {
    font-size: 1.4rem;
    font-weight: 400;
    font-family: "Open Sans", sans-serif !important;
}

.associateAirContainer .breadcrumbs span a {
    color: #27AE60;
    font-family: "Open Sans", sans-serif !important;
    font-size: 1.associateAirContainer .4rem;
}

.associateAirContainer .breadcrumbs_icon {
    font-size: 18px;
    height: 18px;
    width: 18px;
}

.associateAirContainer .breadcrumbs_nav {
    min-height: 36px !important;
    background: #eee0;
}

.associateAirContainer .breadcrumbs_nav .breadcrumbs {
    height: 3rem !important;
    background-color: #f3f3f3;
}

.associateAirContainer .mat-toolbar-row,
.associateAirContainer .mat-toolbar-single-row .breadcrumbs {
    padding-left: 0px !important;
}

.associateAirContainer .sub_heading {
    font-size: 2vw;
    font-weight: 400;
    margin: 0px;
}

.associateAirContainer .button_grid_position {
    margin-top: 15px;
}

.associateAirContainer .button_grid_position:before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    width: 2px;
    height: 100%;
    background: #d9d9d98f;
}

.associateAirContainer .ml_grid {
    margin-top: 15px;
}

.associateAirContainer .btn_delete {
    float: right;
    margin: 17px 0 !important;
}

.associateAirContainer .mat-row,
.associateAirContainer .mat-header-row {
    display: table-row;
    border-bottom-width: .1rem;
    border-bottom-style: solid;
    align-items: center;
    padding: 0px 1rem 0;
}

.associateAirContainer .mat-cell,
.associateAirContainer .mat-header-cell {
    flex: 1;
    overflow: hidden;
    word-wrap: break-word;
}
.mat-dialog-responsive .pd_0_20{
    padding:0 20px;
}
.associateAirContainer .mat-cell{
    word-break: break-all;
}

.associateAirContainer .hdr_srch_field {
    padding-left: 0px;
    position: relative;
    margin: 5px 0px;
}

.associateAirContainer .hdr_srch_field input {
    padding-left: 030px;
    border: 0.1rem solid #6a6868;
    width: 174px;
}

.associateAirContainer .hdr_srch_field .search_icon {
    position: absolute;
    top: 7px;
    left: 5px;
    font-size: 20px;
    color: #6f6c6c;
}

.associateAirContainer .add_btn {
    font-size: 12px;
    background: #27AE60;
    color: #fff;
    width: 30px;
    height: 30px;
    line-height: 29px !important;
    min-width: 30px !important;
    padding-left: 3px !important;
    border-radius: 30px !important;
    margin-left: 10px !important;
    box-shadow: 0px 6px 6px #0000003D;
}

.associateAirContainer .mat-grid-tile .mat-figure {
    display: block !important;
}

.associateAirContainer .mat_card_zone .mat-cell {
    font-size: .8vw;
    text-transform: uppercase;
    text-align: left;
}

.associateAirContainer .mat_card_zone .mat-row {
    border: none;
    background: #F1F1F1;
    margin-top: 7px;
    min-height: 4vh;
}


.associateAirContainer .mat-checkbox-checked.mat-accent .mat-checkbox-background,
.associateAirContainer .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background-color: #27AE60 !important;
}

.associateAirContainer .mat-checkbox-background {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    transition: #27AE60 90ms cubic-bezier(0, 0, .2, .1), opacity 90ms cubic-bezier(0, 0, .2, .1) !important;
}

.associateAirContainer .bg_light_grey .icon_theme_color {
    font-size: 1vw;
}

.associateAirContainer .active_btn,
.associateAirContainer .deactive_btn {
    width: 9vw;
    height: 5vh;
    color: #fff;
    margin-bottom: 8px !important;
    font-size: 0.8vw !important;
    border-radius: 0px !important;
    text-transform: uppercase;
    font-weight: 400;
}

.associateAirContainer .active_btn {
    background: #27AE60 !important;
    color: #fff !important;
}

.associateAirContainer .mat-snack-bar-container {
    color: rgba(255, 255, 255, .7);
    background: #27AE60;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
}

.associateAirContainer .snackbar {
    max-width: 90% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 1rem !important;
    padding: 10px !important;
    background-color: #0b8357;
    color: #f7f0cf;
}

.associateAirContainer .mat-snack-bar-container {
    max-width: 100% !important;
}

.associateAirContainer .deactive_btn {
    background: #F1F1F1;
    color: #27AE60;
    font-weight: 500 !important;
}

.associateAirContainer .selected_list li {
    display: inline;
    font-size: 14px;
}

.associateAirContainer .selected_list ul {
    list-style: none;
    margin: 0;
}

.associateAirContainer .grid_title {
    font-size: .8vw;
    padding-left: 15px;
    margin: 10px 0;
}

.associateAirContainer .card_white {
    width: 278px !important;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 6px #0000000A;
    opacity: 1;
    margin-top: 50px;
}

.associateAirContainer .dashboard_icon {
    position: absolute;
    top: 5px;
    left: 5px;
}

.associateAirContainer .location_icon {
    position: absolute;
    top: 40%;
    right: 15px;
}

.associateAirContainer .card_white p {
    width: 72%;
    margin: 45px 35px;
}

.associateAirContainer .dashboard_icon,
.associateAirContainer .location_icon,
.associateAirContainer .card_white p {
    color: #27AE60;
}

.associateAirContainer .zone_title {
    font-size: 1vw;
    font-weight: 400;
    letter-spacing: 0;
    color: #1A1A1A;
    border-bottom: 2px solid #27AE60 !important;
    margin: 15px 0px 30px 0px;
}

.associateAirContainer .mat-grid-tile.module_area .mat-figure {
    padding: 0px 0px !important;
}

.associateAirContainer .mat_card_zone mat-label {
    font-size: 14px;
}

.associateAirContainer .theme_btn {
    background: #27AE60;
    border: 1px solid #27AE60;
    color: #fff;
    margin: auto !important;
    margin-top: 30px;
    display: flex !important;
    text-transform: uppercase;
    font-size: 1.5rem;
}

.associateAirContainer .round_btn {
    border-radius: 50px !important;
}

.associateAirContainer .zone_mapping .mat-button {
    position: absolute;
    top: 0px;
    right: 0px;
    width: auto;
    height: auto;
    line-height: 20px;
    min-width: auto;
    padding: 5px;
}

.associateAirContainer .zone_mapping .material-icons {
    font-size: 14px;
    color: #27AE60;
}

.associateAirContainer .zone_mapping {
    position: relative;
}


.associateAirContainer .input_padding input {
    padding: 0 0 2px 0 !important;
    height: 2.7rem !important;
}

.associateAirContainer .mr_top_20 {
    margin-top: 40px;
}

.associateAirContainer .mr-top-20 {
    margin-top: 20px;
}

.associateAirContainer .bdr_top_none {
    border-top: 0px !important;
}

.associateAirContainer .btn_mt {
    margin-top: 25px;
}

.associateAirContainer .bg_shado_none {
    background: transparent;
    box-shadow: none;
    color: #333;
}

.associateAirContainer .add_geography_edit {
    color: #27AE60;
}

.associateAirContainer .manage_pin p,
.associateAirContainer .manage_pin .material-icons {
    font-size: 15px;
    font-weight: 600;
    color: #27AE60;
    cursor: pointer;
}

.associateAirContainer .hdr_srch_field input {
    border: none !important;
    padding: 8px 0 5px 20px !important;
    height: 2.7rem;
}

.associateAirContainer .mr_top_30 {
    margin-top: 22px;
}

.associateAirContainer .pin_code_list ul {
    list-style: none;
    padding-left: 5px;
    margin: 0px;
}

.associateAirContainer .pin_code_list {
    min-height: 100px;
    height: 100px;
    overflow-y: scroll;
    padding-right: 5px;
    border: 0.1rem solid #6a6868;
    margin: 0 0 12px;
}

.associateAirContainer .drag_icon {
    text-align: center;
}

.associateAirContainer .drag_icon i {
    font-weight: 900;
    cursor: pointer;
}

.associateAirContainer .drag_icon i:hover {
    color: #27AE60;
}

.associateAirContainer .dragan_drop_dialog {
    width: 80%;
    margin: auto;
}

.associateAirContainer .pin_code_list::-webkit-scrollbar {
    width: 7px;
    background-color: #ddd;
    border-radius: 15px;
}

.associateAirContainer .pin_code_list::-webkit-scrollbar-thumb {
    background-color: #515457;
    border-radius: 15px;
}

.associateAirContainer .pin_crid_block .mat-grid-tile .mat-figure {
    display: block !important;
}

.associateAirContainer .expand_less_more {
    position: absolute;
    bottom: 0px;
    left: 50%;
    right: 0px;
    justify-content: center;
    text-align: center;
}

.associateAirContainer .expand_less_more i {
    color: #27AE60;
    cursor: pointer;
}

.associateAirContainer .mat_figure_block .mat-grid-tile .mat-figure {
    display: block !important;
}

.associateAirContainer .sub_sub_heading {
    margin-bottom: 30px !important;
}

.associateAirContainer .mr_top_40 {
    margin: 40px 0 0;
}

.associateAirContainer .radio_btn_margin {
    margin-bottom: 15px;
}


/* snackbar_css_start */

.associateAirContainer #snackbar_module {
    display: none;
    position: absolute;
    top: 6%;
    width: 50%;
    background: #27AE60;
    padding: 30px;
    left: 23%;
    border-radius: 5px;
    z-index: 9999;
}

.mat-expansion-panel-content {
    font-family: 'Open Sans', sans-serif !important;
}

.associateAirContainer #snackbar_module h2 {
    color: #FFFFFF;
    margin: 0;
    font-weight: 500;
    font-size: 25px;
}

.associateAirContainer .mr_left_70 {
    height: 30px !important;
}

.associateAirContainer .pd_8 input.input_padding {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
}

.associateAirContainer .card_body {
    padding: 1px 0 20px !important;
    border-radius: 10px !important;
    box-shadow: 0px 0px 1px -1px rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.11), 1px 1px 8px 0 rgba(0, 0, 0, 0.08) !important;
}

@keyframes fadeIn {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1
    }
    100% {
        opacity: 0
    }
}


/* adarsh css end */

.associateAirContainer .upper-case {
    text-transform: uppercase;
}


/*Chosen style*/

.associateAirContainer .chosen-wrapper {
    margin: 0 auto 25px;
    max-width: 400px;
    position: relative;
}

.associateAirContainer .chosen-wrapper:after {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 32px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid rgba(0, 0, 0, 0.5);
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 9;
}

.associateAirContainer .chosen-wrapper.is-active:after {
    border-top: 8px solid black;
    -ms-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}

.associateAirContainer .chosen-wrapper .chosen-container .chosen-single {
    border-radius: 0;
    height: 70px;
    border: solid 2px #d9d9d9;
    background: #fff;
    font-size: 22px;
    color: rgba(0, 0, 0, 0.5);
    padding: 0 30px;
    line-height: 66px;
    transition: all 0.3s ease;
    box-shadow: none;
    background: #fff;
}

.associateAirContainer .chosen-wrapper .chosen-container .chosen-single b {
    display: none !important;
}

.associateAirContainer .chosen-wrapper .chosen-container .chosen-single span {
    letter-spacing: 0;
    padding: 0;
    line-height: inherit;
}

.associateAirContainer .chosen-wrapper .chosen-container.chosen-with-drop .chosen-single {
    border-width: 2px 2px 1px;
    border-color: #000 #000 #d9d9d9;
    color: #000;
    background-image: none;
}

.associateAirContainer .chosen-wrapper .chosen-container.chosen-with-drop .chosen-drop {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.associateAirContainer .chosen-wrapper .chosen-container.chosen-container-single-nosearch .chosen-search {
    display: none;
}

.associateAirContainer .chosen-wrapper .chosen-container .chosen-drop {
    letter-spacing: 0;
    border-radius: 0;
    box-shadow: none;
    border-width: 0 2px 2px;
    border-color: #000;
    margin-top: 0;
    -webkit-transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    -o-transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    opacity: 0;
}

.associateAirContainer .chosen-wrapper .chosen-container .chosen-results {
    font-size: 22px;
    color: #000;
    max-height: 245px;
    margin: 0;
    padding: 0;
}

.associateAirContainer .chosen-wrapper .chosen-container .chosen-results li {
    padding: 16px 30px 18px;
    margin: 0;
    border-bottom: 1px solid #e5e5e5;
    -webkit-transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    -o-transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    line-height: 20px;
}

.associateAirContainer .chosen-wrapper .chosen-container .chosen-results li .highlighted {
    background-color: #eeeeee !important;
    color: #000;
    background-image: none;
}

.associateAirContainer .chosen-wrapper--style2:after {
    right: 0;
}

.associateAirContainer .chosen-wrapper--style2:before {
    content: '';
    width: 0;
    border-top: 2px solid #000;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    transition: all 0.2s cubic-bezier(0.06, 1, 0.89, 0.85);
}

.associateAirContainer .chosen-wrapper--style2.is-active:before {
    width: 100%;
}

.associateAirContainer .chosen-wrapper--style2 .chosen-container .chosen-single {
    border-width: 0 0 2px;
    padding: 0;
}

.associateAirContainer .chosen-wrapper--style2 .chosen-container.chosen-with-drop .chosen-single {
    border-width: 0 0 2px;
}

.associateAirContainer .chosen-wrapper--style2 .chosen-container.chosen-with-drop .chosen-drop {
    opacity: 1;
    visibility: visible;
    transform: translateY(5px);
}

.associateAirContainer .chosen-wrapper--style2 .chosen-container .chosen-drop {
    border-color: #d9d9d9;
    border-top: 2px solid #d9d9d9;
}

.associateAirContainer .chosen-wrapper--style2 .chosen-container .chosen-results li {
    padding: 16px 15px 18px;
}


/*ScrollBox style*/

.associateAirContainer .nicescroll-rails {
    border-left: 1px solid #d9d9d9;
    transform: translate(-2px);
    top: 0 !important;
}

.associateAirContainer .nicescroll-rails .nicescroll-cursors {
    width: 6px !important;
    margin-right: 2px;
}

.associateAirContainer .link {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 20px;
}

.associateAirContainer .link a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000;
}

.associateAirContainer .link .fa {
    font-size: 28px;
    margin-right: 8px;
    color: #000;
}

.associateAirContainer .mapping_dropdown .mat-row {
    min-height: 7vh !important;
    /* padding: 2px; */
}

.associateAirContainer .rupee_icon {
    position: absolute;
    top: -28px;
    left: 10px;
}

.tab_btn_active {
    margin: 0 20px 0px 0 !important;
    padding: 35px 0px 70px !important;
    color: #fff;
    background: #27AE60;
    font-weight: 600;
    font-size: 1vw !important;
}

.associateAirContainer .tab_btn_active p {
    font-size: 12px;
}

.associateAirContainer .tab_btn_deactive p {
    font-size: 12px;
}

.associateAirContainer .tab_btn_deactive {
    margin: 0 20px 0px 0 !important;
    padding: 35px 0px 70px !important;
    color: #27AE60;
    background: #fff;
    font-weight: 600;
    font-size: 1vw !important;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12) !important;
}

.associateAirContainer .search_icon {
    z-index: 9999 !important;
    cursor: pointer;
}


/* branch css start */

.associateAirContainer .search_branch h3 {
    border-bottom: 1px solid #ddd;
    margin: 0px;
    margin-bottom: 15px;
}

.associateAirContainer .last_update h3 {
    border-bottom: 1px solid #27AE60;
    font-weight: 400;
}

.associateAirContainer .all_branch_main {
    border-right: 1px solid #ddd;
    padding-right: 12%;
    min-height: 300px;
}

.associateAirContainer .all_brnach_search input.mat-input-element {
    padding: 5px 0px 4px 25px;
    margin-left: 2px;
    border: 0.1rem solid #6a6868;
    width: 76%;
    margin-top: -2px;
    font-size: 12px;
    text-transform: uppercase;
}

.associateAirContainer .all_brnach_search {
    position: relative;
}

.associateAirContainer .all_brnach_search i {
    position: absolute;
    top: 3px;
    left: 4px;
    font-size: 18px;
}

.associateAirContainer .all_brnach_search {
    position: relative;
}

.associateAirContainer .all_brnach_search button {
    position: absolute;
    top: 0px;
    right: -5px;
    font-size: 12px;
    background: #27AE60;
    color: #fff;
    width: 25px;
    height: 25px;
    min-width: 25px !important;
    border-radius: 30px !important;
    box-shadow: 0px 6px 6px #0000003D;
}

.associateAirContainer .all_branch_right {
    padding: 0px 30px;
}

.associateAirContainer .all_branch_right .mat-row {
    padding: 0px 15px 0;
    margin-bottom: 8px;
    border: none;
}

.associateAirContainer .all_branch_right .mat-cell {
    text-transform: uppercase;
}

.associateAirContainer .card_mb {
    margin-bottom: 30px;
}

.associateAirContainer .create_branch h3 {
    border-bottom: 1px solid #27AE60;
    margin: 0px;
    margin-bottom: 15px;
    font-weight: 400;
}

.associateAirContainer .create_branch h4 {
    border-bottom: 2px solid #27AE60;
    margin: 0px;
    margin-bottom: 15px;
    font-weight: 400;
    font-weight: 700;
}

.associateAirContainer .add_branch_main mat-label {
    font-size: 14px;
}

.associateAirContainer .add_branch_main input {
    padding: 8px 5px;
}

.associateAirContainer .add_branch_main input {
    padding: 8px 5px;
}

.associateAirContainer .search_branch_detail {
    position: relative;
}

.associateAirContainer .search_branch_detail i {
    position: absolute;
    top: 6px;
    left: 3px;
    font-size: 21px;
}

.associateAirContainer .search_branch_detail input {
    padding-left: 20px;
    width: 94%;
}

.associateAirContainer .brnch_feature_header {
    border-bottom: 2px solid #27AE60;
    border-radius: 0px !important;
    padding: 0px !important;
    height: 40px !important;
}

.associateAirContainer .shadow_none {
    box-shadow: none !important;
    position: relative;
}

.associateAirContainer .brnch_feature_header:hover {
    background-color: transparent !important;
}

.associateAirContainer .branch_feature_heading h2 {
    font-size: 15px;
    font-weight: 700;
    margin: 0px;
}

.associateAirContainer .assign_feature_pt {
    padding-top: 10px;
}

.associateAirContainer .branch_merge_position {
    text-align: right;
    float: right;
    font-weight: 700;
    color: #27AE60;
    cursor: pointer;
}

.associateAirContainer .branch_next_btn {
    text-align: center;
}

.associateAirContainer .width_block {
    width: 100%;
}

.associateAirContainer .branch_next_btn button {
    text-align: center;
    text-transform: uppercase;
    margin: 2% 0%;
    background: #27AE60;
    color: #fff;
    border-radius: 30px;
    padding: 4px 25px !important;
}

.associateAirContainer .radio_button_pr {
    padding-right: 15px;
}

.associateAirContainer .branch_add_brn {
    background: #27AE60;
    color: #fff;
    border-radius: 50% !important;
    min-width: auto !important;
    padding: 3px 4px !important;
    line-height: 23px !important;
}

.associateAirContainer .branch_bg_gray {
    background: #6a6868;
}

.associateAirContainer .branch_bg_gray h5 {
    text-align: center;
    margin: 0px;
    color: #fff;
    padding: 9px 0px;
    font-size: 14px;
    font-weight: 600;
}

.associateAirContainer .brnach_add_assign {
    position: relative;
}

.associateAirContainer .brnach_add_assign button {
    position: absolute;
    top: 0px;
    right: -40px;
}

.associateAirContainer .last_update {
    padding: 0px;
}

.associateAirContainer .pin_branch_mapping h3 {
    margin: 0px;
    font-size: 16px;
    font-weight: 700;
}

.associateAirContainer .pin_branch_pb {
    padding-bottom: 15px;
}

.associateAirContainer .branch_sub_heading {
    font-size: 15px !important;
    font-weight: 700;
    color: #27AE60;
}


/* branch css end */

.associateAirContainer .round_icon_btn {
    padding: 0 !important;
    width: 35px;
    height: 35px;
    border-radius: 30px !important;
}

.associateAirContainer .round_icon_btn .associateAirContainer .mat-button-wrapper {
    margin: auto;
    margin-top: -2px;
}


/* manage route css start */

.associateAirContainer .route_searchbar .search_bar {
    position: absolute;
    top: 4px;
    left: 4px;
}

.associateAirContainer .route_searchbar input {
    padding-left: 22px;
    width: 91%;
}

.associateAirContainer .manage_route_tab {
    text-align: center;
    height: 66px;
    border-radius: 0px !important;
    margin: 15px 0px 10px 0px;
    padding: 15px 66px !important;
}

.associateAirContainer .manage_route_tab h3 {
    line-height: 33px;
}

.associateAirContainer .route_active {
    background-color: #27AE60;
}

.associateAirContainer .route_active h3 {
    color: #fff;
}

.associateAirContainer .route_deactive {
    background-color: #fff;
}

.associateAirContainer .route_deactive h3 {
    color: #27AE60;
}

.associateAirContainer .route_touch_point {
    padding: 25px;
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
}

.associateAirContainer .route_touch_point h4 {
    border: none;
}

.associateAirContainer .padding_0 {
    padding: 0px;
}

.associateAirContainer .manage_schedule {
    padding-top: 15px;
}

.associateAirContainer .manage_schedule h4 {
    border: none;
}


/* manage route css end */

.associateAirContainer .order_dragan_drop {
    position: absolute;
    top: 42%;
    left: 15px;
}

.associateAirContainer .order_dragan_drop i {
    font-size: 40px;
    color: #27AE60;
    display: inline;
}

.associateAirContainer .orgination_modal_inner {
    width: 90%;
    margin: auto;
}

.associateAirContainer .rr_value_round {
    width: 25px;
    height: 30px;
    margin-bottom: 15px !important;
}

.associateAirContainer .mt_15 {
    margin-top: 15px !important;
}


/* mdm2 start 24-03-2020 */

.associateAirContainer .mdm2_breadcrumb {
    font-size: 12px;
    font-weight: 400;
    color: #27AE60;
    padding: 5px 0px;
}

.associateAirContainer .mdm_d_btn button {
    font-size: 12px;
    font-weight: 400;
    background: #fff;
    border-radius: 0px;
    outline: 0;
}

.associateAirContainer .mdm_d_btn button:hover {
    background: #fff;
}

.associateAirContainer .mdm_d_btn .active,
.associateAirContainer .mdm_d_btn .active:hover {
    background: #27AE60;
    color: #fff;
}

.associateAirContainer .d_request_payment {
    margin-top: 20px;
}

.associateAirContainer .d_request_payment button {
    text-align: left;
    padding: 10px !important;
}

.associateAirContainer .create_search_head {
    display: inline-block;
}

.associateAirContainer .create_srch_bar {
    position: relative;
    margin-left: 15px;
}

.associateAirContainer .initlate_request_add {
    text-align: right;
}

.associateAirContainer .initlate_request_add {
    font-size: 12px;
    font-weight: 600;
    margin: 10px 0px;
}

.associateAirContainer .initlate_request_add button {
    font-size: 9px;
    background: #27AE60;
    color: #fff;
    width: 30px;
    height: 30px;
    line-height: 20px !important;
    min-width: 30px !important;
    padding-left: 3px !important;
    border-radius: 30px !important;
    margin-left: 0px !important;
    box-shadow: 0px 6px 6px #0000003D;
    margin-top: 0px;
}

.associateAirContainer .booking_card {
    background: #fff;
    padding: 15px 15px 35px 15px;
    margin-bottom: 20px;
    border-radius: 5px;
}


.associateAirContainer .border_none {
    border: none;
    margin-top: 2px;
}

.associateAirContainer .booking_view_sec_2 {
    margin-top: 25px;
}

.associateAirContainer .booking_view_sec_2 {
    font-size: 12px;
}

.associateAirContainer .col_plr_0 {
    padding: 0px !important;
}

.associateAirContainer .col_pl_0 {
    padding-left: 0px !important;
}

.associateAirContainer .col_pr_0 {
    padding-right: 0px !important;
}

.associateAirContainer .view_booking_inner p {
    padding-top: 5px;
}

.associateAirContainer .view_payment_date {
    text-align: right;
    padding-right: 5px;
}

.associateAirContainer .mdm_active_btn {
    background: #27AE60;
    color: #fff;
    border-radius: 30px !important;
    padding: 1px 20px !important;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    outline: 0 !important;
}

.associateAirContainer .pb_5 {
    padding-bottom: 5px;
}

.associateAirContainer .booking_view_sec_1 {
    padding-top: 30px;
}

.associateAirContainer .mb_0 {
    margin-bottom: 0px;
}




/* Aman Css Start */

.associateAirContainer input {
    position: relative;
}

.associateAirContainer .search_bar_mdm2d i {
    position: absolute;
    top: 5px;
    left: 17px;
    font-size: 1.5rem;
}

.associateAirContainer .create_srch_bar i {
    left: 5px;
}

.associateAirContainer .top-5 {
    top: 5px !important;
}

.associateAirContainer .top-6 {
    top: 6px !important;
}

.associateAirContainer .pdleft_0 {
    padding-left: 0px !important;
}

.associateAirContainer .overline_hidden {
    overflow: hidden;
    height: 4rem;
    margin-bottom: 0px !important;
}

.associateAirContainer .mr-lr-20 {
    margin: 0 30px !important;
    
}

.associateAirContainer .icon_danger {
    color: #B00020 !important;
}

.associateAirContainer .btn_order_tab {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
}


.associateAirContainer .displa_one_tab {
    display: inline-block;
    width: 25%;
    text-align: center;
}

.associateAirContainer .text-active {
    color: #00af65;
    font-weight: 700;
}

ul.associateAirContainer .listbtn_tab {
    list-style: none;
    position: absolute;
    width: 96.5%;
    list-style: none;
    margin: -54px 0;
}

.associateAirContainer hr.bdr_theme_color {
    border: 2px solid #00af65 !important;
}

.associateAirContainer mat-label {
    font-family: "Open Sans", sans-serif !important;
    margin-bottom: 2rem !important;
    font-size: 1.6rem;
    color: #1A1A1A;
}

.associateAirContainer .mr-bottom-15 {
    margin-bottom: 15px;
}

.associateAirContainer .mat-radio-label-content {
    font-size: 1.5rem !important;
}

.associateAirContainer .bg_black {
    background: #3f3f3ffc;
    padding: 10px 0;
    color: #fff;
}

.associateAirContainer .mat-checkbox-inner-container-no-side-margin {
    margin-right: 8px !important;
}
.associateAirContainer .label-text {
    padding-top: 0;
}

.associateAirContainer .search_left {
    left: 17px !important;
}

.associateAirContainer .float_right {
    float: right;
}

.associateAirContainer .mr-bottom-10 {
    margin-bottom: 10px;
}

.associateAirContainer .color_theme {
    color: #27AE60;
    cursor: pointer;
}

.associateAirContainer .mr_top_10 {
    margin: 10px 0 !important;
}

.associateAirContainer .danger_btn {
    background-color: #B00020 !important;
}

.associateAirContainer .btn_order_tab.mat-checkbox-checked.mat-accent .mat-checkbox-background {
    background-color: #27AE60 !important;
    border-radius: 50% !important;
    /* border: 2px solid #fff !important; */
}

.associateAirContainer .btn_order_tab .mat-checkbox-inner-container {
    width: 16px !important;
    height: 16px !important;
    background: #6d6d6d;
    border-radius: 50%;
}

.associateAirContainer .btn_order_tab .mat-checkbox-frame {
    background-color: transparent;
    transition: border-color 90ms cubic-bezier(0, 0, .2, .1);
    border-radius: 50% !important;
    border-color: #6d6d6d !important;
}

.associateAirContainer .pd_top_50 {
    padding: 50px 0 0;
}

.associateAirContainer .mr-top-80 {
    margin: 80px 0 0;
}

.associateAirContainer .mr-top-bottom-50 {
    margin: 50px 0;
}

.associateAirContainer .mr-7 {
    margin: 7px 0;
}

.associateAirContainer .pd_00 {
    padding: 0rem !important;
}

.associateAirContainer .left_8 {
    left: 8px !important;
}

.associateAirContainer .mr-top-10 {
    margin-top: 10px;
}

.associateAirContainer .mr-top-7 {
    margin-top: 7px;
}

.associateAirContainer .pd-4 {
    padding: 4px;
}

.associateAirContainer .mr_left_40 {
    margin: 0 0px 0 40px;
}

.associateAirContainer .mat-cell,
.associateAirContainer .mat-footer-cell {
    font-size: 1.6rem !important;
    text-transform: uppercase !important;
    line-height: 1.4 !important;
    font-weight: 400 !important;
}

.associateAirContainer .pd_5_20 {
    padding: 5px 20px !important;
}

.associateAirContainer .danger_color {
    color: #B00020;
}

.associateAirContainer .mat-tab-label {
    width: 50% !important;
    background-color: #eeeeee;
}

.associateAirContainer .mat-tab-label-active {
    background-color: #27AE60 !important;
    color: #fff !important;
    font-weight: 600;
}

.associateAirContainer .mat-tab-group.mat-primary .mat-ink-bar {
    background: transparent !important;
}

.associateAirContainer button:focus {
    outline: none !important;
}


/* aman css End */


/* adarsh 25-Mar-2020 start */

.associateAirContainer .booking_msa_sec .initlate_request_add {
    text-align: left;
    margin: -3px 0px;
}

.associateAirContainer .mt_10 {
    margin-top: 10px;
}

.associateAirContainer .mtb_15 {
    margin: 15px 0px;
}

.associateAirContainer .box_shadow_none,
.associateAirContainer .box_shadow_none:hover {
    box-shadow: none !important;
    background: transparent !important;
}

.associateAirContainer .collapse_panel_header {
    background: transparent !important;
    border-bottom: 2px solid #27AE60;
    border-radius: 0px !important;
    padding-left: 0px !important;
    margin-bottom: 10px;
}

.associateAirContainer .mtb_30 {
    margin: 30px 0px;
}
.associateAirContainer .grey_card_width {
    width: 14%;
    padding: 1.2rem;
}
.associateAirContainer .gray_card_msa1 {
    background: #ccc;
    color: #111;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 2rem;
    padding: 10px 0px;
    box-shadow: 0 0.3rem 0.6rem #00000029
}

.associateAirContainer .gray_card_msa1 h3 {
    border-bottom: 1px solid #fff;
    padding-left: 5px;
    font-weight: 600 !important;
    text-transform: uppercase;
    padding-bottom: 3px;
    margin-bottom: 8px;
    margin-top: 0;
    font-size: 1.6rem !important;
}

.associateAirContainer .gray_card_msa1 p {
    margin: 0px;
    padding-left: 5px;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 14px;
    font-size: 1.2rem !important;
    margin: 0px !important;
}

.associateAirContainer .gray1_card_msa1 {
    background-image: linear-gradient(to top, #d2d1d1, #fff);
    text-align: center;
    color: #333;
    height: 113px;
}

.associateAirContainer .gray1_card_msa1 .mat-icon {
    font-size: 40px;
    color: #27AE60;
}

.associateAirContainer .add_icon .mat-icon {
    font-size: 80px;
    margin-left: -50px;
    margin-top: -15px;
}

.associateAirContainer .add_icon_txt p {
    margin-top: -10px;
    line-height: 16px;
}

.associateAirContainer .type_date_msa1 i {
    float: right;
    color: #fff;
    font-style: italic;
    margin-right: 10px;
    cursor: pointer;
}


/* adarsh 25-Mar-2020 end */


/* adarsh 26-Mar-2020 start */

.associateAirContainer .bg_gray_msa_4 {
    background: #515457;
    height: 35px;
}

.associateAirContainer .padding_0 {
    padding: 0px;
}

.associateAirContainer .bg_gray_msa_4 p {
    color: #fff;
    margin: 0px;
    padding: 6px 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.associateAirContainer .plr_15 {
    padding: 0px 15px;
}

.associateAirContainer .bg_trans_border {
    background: transparent;
    border: 1px solid #27ae60 !important;
    color: #333;
}

.associateAirContainer .bg_gray_btn {
    background: #515457;
    margin-left: 15px !important;
}

.associateAirContainer .mt_n15 {
    margin-top: -15px;
}

.associateAirContainer .mt_28 {
    margin-top: 28px;
}

.associateAirContainer .searchbar_mdm2 i {
    top: 1.3rem;
    left: 2.5rem;
}

.associateAirContainer .emi_calculation_modla .mat-row {
    padding: 0px 5px;
    margin-top: 0px;
}

.associateAirContainer .emi_calculation_modla .active .mat-cell {
    color: #fff !important;
}

.associateAirContainer .theme_text_color {
    color: #27AE60;
}

.associateAirContainer .ml_15 {
    margin-left: 15px !important;
}

.associateAirContainer .padding_10 {
    padding: 10px;
}

.associateAirContainer .add_btn_ption {
    position: relative;
}

.associateAirContainer .add_btn_ption button {
    position: absolute;
    top: 0px;
    right: 30%;
    background: #27AE60;
    color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 0px !important;
    margin-left: 5px;
    outline: 0;
    box-shadow: 0px 6px 6px #0000003D;
}

.associateAirContainer .mt_6 {
    margin-top: 6px;
}


/* adarsh 26-Mar-2020 end */


/* adarsh 27-Mar-2020 start */

.associateAirContainer .float_left {
    float: left;
}

.associateAirContainer .width_20 {
    width: 20%;
}

.associateAirContainer .modal_card_5 {
    box-shadow: 0px 4px 6px #0000003D;
    padding: 30px 5px;
    text-align: center;
    margin-right: 15%;
}

.associateAirContainer .modal_card_5 p {
    margin: 0px;
}

.associateAirContainer .active {
    background: #27AE60 !important;
    color: #fff !important;
}

.associateAirContainer .heading_with_icon {
    position: relative;
}

.associateAirContainer .heading_with_icon i {
    position: absolute;
    top: 10px;
    font-style: italic;
    right: 10px;
}

.associateAirContainer .heading_with_icon p,
.associateAirContainer .heading_with_icon h3 {
    text-align: left;
}

.associateAirContainer .mb_30 {
    margin-bottom: 30px;
}

.associateAirContainer .bac_update_modal {
    box-shadow: 0px 2px 6px #00000029;
    padding: 0px;
    border-radius: 4px;
    width: 100%;
    height: 75px;
    text-align: center;
}

.associateAirContainer .mat-dialog-container {
    overflow-x: hidden !important;
}

.associateAirContainer .bac_update_modal p {
    margin: 0px;
    line-height: 16px;
    font-size: 1.6rem;
}

.associateAirContainer .pt_15 {
    padding-top: 15px;
}

.associateAirContainer .pt_7 {
    padding-top: 7px;
}

.associateAirContainer .pt_22 {
    padding-top: 22px;
}

.associateAirContainer .mt_30 {
    margin-top: 30px;
}

.associateAirContainer .pb_0 {
    padding-bottom: 0px;
}


/* adarsh 28-Mar-2020 start */

.associateAirContainer .arrow_up_down i {
    color: #27AE60;
    font-size: 20px;
    padding: 0px 8px;
    text-align: center;
    padding-bottom: 10px;
}

.associateAirContainer .add_desi_scroll {
    height: 150px;
    overflow-y: scroll;
    padding: 15px;
    box-shadow: 0px 2px 6px #00000029;
}

.associateAirContainer .add_desi_scroll p {
    margin: 0px;
}

.associateAirContainer .add_another_cust button {
    right: 5%;
}

.associateAirContainer .mtb_5 {
    margin: 5px 0px;
}

.associateAirContainer .emi_insu_add button {
    right: -15px;
}

.associateAirContainer .insu_calcu button {
    right: 17%;
}

.associateAirContainer .ba_success_width {
    width: 15%;
}

.associateAirContainer .ba_dashboard_1 {
    background: #27AE60;
    padding: 30px 0px;
    height: 200px;
}

.associateAirContainer .ba_dashboard_1 h2,
.associateAirContainer .ba_dashboard_1 h3 {
    color: #fff;
}

.associateAirContainer .ba_dashboard_1 h3 {
    text-transform: uppercase;
}

.associateAirContainer .bkng_dsh_card {
    background: #fff;
    padding: 30px 75px;
    border-radius: 8px;
}

.associateAirContainer .bkng_dsh_card h2,
.associateAirContainer .bkng_dsh_card h3 .bkng_dsh_card p {
    margin: 0px;
}

.associateAirContainer .pb_10 {
    padding-bottom: 10px;
}

.associateAirContainer .bkng_dsh_card_3 {
    margin-top: -80px;
}

.associateAirContainer .dsh_right_card {
    width: 115px;
    height: 115px;
    border-radius: 50%;
    text-align: center;
    padding: 15px 10px;
    box-shadow: 0px 0.3rem 0.6rem #00000029;
    background: #fff;
}

.associateAirContainer .dsh_right_card p {
    margin: 0px;
    line-height: 16px;
    margin-bottom: 4px !important;
}

.associateAirContainer .dsh_right_card i {
    padding: 0px 5px;
}

.associateAirContainer .mb_15 {
    margin-bottom: 15px;
}

.associateAirContainer .bd_title_icon {
    box-shadow: 0 11px 15px -7px rgba(202, 199, 199, 0.2), 0 24px 38px 3px rgba(199, 199, 202, 0.14), 0 9px 46px 8px rgba(192, 188, 188, 0.12);
    padding: 40px 15px 30px 15px;
    background: #fff;
    margin-bottom: 15px;
    border-radius: 6px;
    position: relative;
    height: 108px;
}

.associateAirContainer .bd_title_icon h3 {
    color: #27AE60;
    margin: 0px;
}

.associateAirContainer .bd_title_icon h4 {
    margin: 0px;
}

.associateAirContainer .bd_c_icon {
    font-size: 30px !important;
    color: #27AE60;
}

.associateAirContainer .bd_title_icon .cart_icon_dbooking {
    position: absolute;
    top: 5px;
    left: 15px;
}

.associateAirContainer .bd_title_icon .wish_icon_dbooking {
    position: absolute;
    top: 5px;
    right: 15px;
}

.associateAirContainer .bd_report_card {
    padding: 45px 15px 32px 15px;
}

.associateAirContainer .add_btn_sec {
    position: relative;
}

.associateAirContainer .add_btn_sec .add_btn_icon {
    position: absolute;
    top: -10px;
    right: -40px;
    font-size: 9px;
    background: #27AE60;
    color: #fff;
    width: 30px;
    height: 30px;
    line-height: 20px !important;
    min-width: 30px !important;
    padding-left: 3px !important;
    border-radius: 30px !important;
    margin-left: 10px !important;
    box-shadow: 0px 6px 6px #0000003D;
}

.associateAirContainer .rate_weight_btn {
    box-shadow: 0 11px 15px -7px rgba(202, 199, 199, 0.2), 0 24px 38px 3px rgba(199, 199, 202, 0.14), 0 9px 46px 8px rgba(192, 188, 188, 0.12);
    background: #fff;
    padding: 7px 15px;
    margin-right: 10px !important;
    border-radius: 0px;
}

.associateAirContainer .mt_40 {
    margin-top: 40px;
}

.associateAirContainer .pb_0 {
    padding-bottom: 0px;
}

.associateAirContainer .pt_0 {
    padding-top: 0px;
}

.associateAirContainer .ptb_0 {
    padding-top: 0px;
    padding-bottom: 0px;
}

.associateAirContainer .pb_15 {
    padding-bottom: 15px;
}

.associateAirContainer .pin_cust_posi {
    position: relative;
}

.associateAirContainer .pin_arrow_abs {
    position: absolute;
    top: 30%;
    left: 0px;
    right: 0px;
    text-align: center;
    z-index: 999;
}

.associateAirContainer .pin_arrow_abs i {
    font-size: 40px;
    font-weight: 900;
}

.associateAirContainer .pin_cust_posi p {
    margin: 0px;
}

.associateAirContainer b,
.associateAirContainer strong {
    font-weight: 700;
}

.associateAirContainer .mr_15 {
    margin-right: 15px;
}

.associateAirContainer .mtb_40 {
    margin-top: 40px;
    margin-bottom: 40px;
}

.associateAirContainer .dsh_bkg_sec_2 {
    padding-bottom: 18%;
}

.associateAirContainer .dsh_bkg_sec_2 .db_module {
    padding: 30px 5px !important;
}

.associateAirContainer .dsec2_cart {
    box-shadow: 0 11px 15px -7px rgba(202, 199, 199, 0.2), 0 24px 38px 3px rgba(199, 199, 202, 0.14), 0 9px 46px 8px rgba(192, 188, 188, 0.12);
    background: #fff;
    padding: 10px 10px 0px 10px;
    margin-bottom: 30px;
    border-radius: 4px;
    min-height: 95px;
}

.associateAirContainer .dsec2_cart_text p {
    margin: 0px;
    font-weight: 600;
}

.associateAirContainer .sraft_mode_d p {
    color: #27AE60;
}

.associateAirContainer .sraft_mode_d h3 {
    font-weight: 700;
    padding-top: 15px;
}

.associateAirContainer .dsec2_cart_text ul {
    padding-left: 15px;
}

.associateAirContainer .dsec2_cart_text li {
    line-height: 15px;
    text-transform: uppercase;
}

.associateAirContainer .dsec2_cart_text span {
    float: right;
}

.associateAirContainer .dsec2_cart_img {
    margin-left: 0px;
    margin-top: 20px;
}

.associateAirContainer .dsec2_cart_img img {
    width: 100%;
    margin-top: -15px;
}

.associateAirContainer .add_new_d {
    text-align: center;
    box-shadow: 0 11px 15px -7px rgba(202, 199, 199, 0.2), 0 24px 38px 3px rgba(199, 199, 202, 0.14), 0 9px 46px 8px rgba(192, 188, 188, 0.12);
    background: #fff;
    min-height: 85px;
    padding: 10px 5px;
    border-radius: 4px;
}

.associateAirContainer .add_new_d p {
    color: #27AE60;
    margin-top: 0px;
}

.associateAirContainer .add_new_d .initlate_request_add {
    text-align: center;
    margin-top: 0px;
}

.associateAirContainer .progress_bar_booking p {
    font-size: 1.6rem !important;
}

.associateAirContainer .progress_bar_booking ul.listbtn_tab {
    margin: -50px 0px;
}

.associateAirContainer .progress_bar_booking .ba_success_width {
    width: 13rem;
    margin-top: 0.5rem;
    margin-left: 0.2rem;
}

.associateAirContainer .booking_breadcrumb_sec h2 {
    margin-bottom: 1rem;
    margin-top: 0.4rem;
    font-size: 2.4rem !important;
    font-family: "Open Sans", sans-serif !important;
}

.associateAirContainer .booking_success_m ul.listbtn_tab {
    width: 100%;
    margin: -50px 0px;
}

.associateAirContainer .booking_success_m p {
    font-size: 9px;
}

.associateAirContainer .bg_gray_msa_4 p {
    font-size: 12px;
    margin-bottom: 0px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.associateAirContainer .new_cont_book {
    float: right;
    padding-right: 60px;
    margin-top: 5px;
}

.associateAirContainer .vehicle_b_tab {
    text-align: center;
    padding: 25px 15px;
    border: 0.1rem solid #6a6868;
    margin-bottom: 15px;
}

.associateAirContainer .green_truck_h {
    padding: 37px 15px;
}

.associateAirContainer .vehicle_b_tab h2 {
    font-size: 20px !important;
    text-transform: uppercase;
    font-weight: 600;
}

.associateAirContainer .vehicle_b_tab p {
    font-weight: 600;
    margin: 0px;
    padding: 0px;
}

.associateAirContainer .vehicle_master_h {
    font-size: 18px !important;
    font-weight: 600;
    border-bottom: 1px solid #27AE60;
    margin-bottom: 15px;
    padding-bottom: 1rem;
}

.associateAirContainer .vehicle_mstr_btn {
    text-transform: uppercase;
    border-radius: 0px !important;
    margin-top: 15px !important;
    font-family: 'Open Sans',sans-serif;
}

.associateAirContainer .vehicle_page_sec {
    padding: 10px 30px;
}


/* adarsh 28-Mar-2020 end */


/* preview page css start */

.associateAirContainer .preview_main_card {
    border: 1px solid #ddd;
    background: #fff;
    margin-top: 0px;
}

.associateAirContainer .mgsg_print_sec {
    box-shadow: 0 11px 15px -7px rgba(202, 199, 199, 0.2), 0 24px 38px 3px rgba(199, 199, 202, 0.14), 0 9px 46px 8px rgba(192, 188, 188, 0.12);
    background: #fff;
    padding: 15px 30px;
}

.associateAirContainer .mgsg_print_sec p {
    margin: 0px;
}

.associateAirContainer .mgsg_print_sec img {
    width: 27px;
    padding-right: 5px;
}

.associateAirContainer .preview_sec_1 {
    padding: 15px;
}

.associateAirContainer .preview_sec_1 h1 {
    font-weight: 600;
    margin: 0px;
}

.associateAirContainer .preview_sec_1 h2 {
    margin: 0px;
    text-align: right;
    text-transform: uppercase;
}

.associateAirContainer .preview_sec_2 {
    background: #27AE60 0% 0% no-repeat padding-box;
    padding: 0px 18px;
}

.associateAirContainer .preview_sec_2 h3 {
    color: #000;
    font-weight: 600;
    padding: 10px 0px;
}

.associateAirContainer .text_right {
    text-align: right;
}

.associateAirContainer .preview_sec_3 {
    padding: 15px 50px;
    position: relative;
}

.associateAirContainer .preview_sec_3:before {
    content: '';
    position: absolute;
    top: 21px;
    left: 0px;
    width: 50px;
    height: 26px;
    background: #6A6868 0% 0% no-repeat padding-box;
}

.associateAirContainer .preview_sec_3 h2 {
    font-size: 28px !important;
    font-weight: 600;
    padding-bottom: 15px;
    padding-left: 15px;
}

.associateAirContainer .preview_sec .mat-row {
    align-items: inherit;
    border: none !important;
}

.associateAirContainer .preview_sec {
    margin-bottom: 50px;
}

.associateAirContainer .payment_base_t {
    padding: 10px 0px;
}


.associateAirContainer .preview_sec_5:before {
    background: transparent;
}


/* preview page css end */

.associateAirContainer .dsh_right_card img {
    width: 30px;
    margin-bottom: 4px;
}

.associateAirContainer .create_search_pin {
    position: relative;
}

.associateAirContainer .create_search_pin i {
    left: 1rem;
}


/* global css start 07/May/2020 */


/* table css */


/* 11/May/2020 start */

.associateAirContainer .mat_card_zone .mat-row.table_main_header {
    background: #F1F1F1;
}

.associateAirContainer .mat_table_input .mat-cell {
    padding: 2px;
}

.associateAirContainer .mat_table_input input {
    padding: 8px;
}

.associateAirContainer .mat_table_input .mat-row,
.associateAirContainer .mat-header-row {
    border-color: #ddd;
}

.associateAirContainer .table_color {
    color: #27AE60;
    cursor: pointer;
}

.associateAirContainer .mat_table_main .mat-button {
    line-height: 25px;
}

.associateAirContainer .table_main_header .mat-cell {
    font-size: .8vw;
    text-transform: uppercase;
}

.associateAirContainer .branch_table_head {
    background: #eee !important;
    min-height: 35px;
}

.associateAirContainer .mat-table .mat-radio-button,
.associateAirContainer .mat-table .form-control,
.associateAirContainer .mat-table .date_picker_adjust .mat-input-element {
    margin-bottom: 0px !important;
}

.associateAirContainer .mat-table.prvw_tbl {
    border-collapse: separate !important;
    border-spacing: 2px !important;
}
.associateAirContainer .branch_table_dis {
    background: #eeeeee6e;
    min-height: 30px;
}

.associateAirContainer .branch_table_dis .mat-button {
    line-height: 16px !important;
}

.associateAirContainer .branch_table_dis .material-icons {
    font-size: 20px;
    color: #27AE60;
}

.associateAirContainer .add_branch_main .table_input input {
    padding: 4px 5px;
}

.associateAirContainer .preview_table_1 .mat-cell {
    padding: 2rem 1.6rem !important;
    width: 60%;
    font-size: 1.6rem !important;
    font-weight: 600;
    margin: 0px;
    display: table-cell;
    text-transform: inherit;
    word-break : break-word !important;
}
.mat-dialog-responsive .mat-row.align_item_top{
    align-items: normal !important;
}
.associateAirContainer .preview_table_bg_1 {
    background: #27AE60 0% 0% no-repeat padding-box;
    font-weight: 600;
}

.associateAirContainer .preview_table_bg_2 {
    background: #6A686879 0% 0% no-repeat padding-box;
}

.associateAirContainer .preview_sec_4 img {
    font-size: 20px;
    width: 45px;
}

.associateAirContainer .preview_table_2 .pab_table_head {
    background: #27AE60 0% 0% no-repeat padding-box;
    font-weight: 600;
}

.associateAirContainer .preview_table_2 .pab_table_dis1 {
    background: #6A686879 0% 0% no-repeat padding-box;
}

.associateAirContainer .preview_table_2 .pab_table_dis2 {
    background: #27AE60 0% 0% no-repeat padding-box;
    font-weight: 600;
}

.associateAirContainer .preview_table_2 .mat-cell {
    padding: 2rem 1.6rem !important;
    font-size: 1.6rem !important;
    width: 40%;
    font-weight: 600;
    margin: 0px;
    margin-right: 2px;
    display: table-cell;
    word-break : break-word !important;
}

.associateAirContainer .float_table {
    width: 100%;
    display: table;
}

.associateAirContainer .input_table_width {
    width: 95%;
    padding-top: 5px;
}

.associateAirContainer .mat-table {
    display: table;
    width: 100%;
}

.associateAirContainer .mat-table {
    min-height: .01%;
    overflow-x: auto;
}

.associateAirContainer .all_branch_right .mat-table {
    padding-top: 15px;
}

.associateAirContainer .manage_route_table {
    border-radius: 15px;
    border: 1px solid #ddd;
    padding: 10px 0px 15px;
}

.associateAirContainer .manage_route_table .mat-table {
    padding: 5px 0px;
}
.associateAirContainer .container-fluid {
    padding: 0;
}

/* 11/May/2020 end */

.associateAirContainer .mat-table {
    font-family: "Open Sans", sans-serif !important;
}

.associateAirContainer td.mat-cell,
.associateAirContainer td.mat-footer-cell,
.associateAirContainer th.mat-header-cell {
    font-size: 1.6rem !important;
    padding: 0.7rem !important;
}

.associateAirContainer th.mat-header-cell {
    text-transform: uppercase !important;
    line-height: 1.4 !important;
}

.associateAirContainer td.mat-cell:first-of-type,
.associateAirContainer td.mat-footer-cell:first-of-type,
.associateAirContainer th.mat-header-cell:first-of-type,
.associateAirContainer td.mat-cell:last-of-type,
.associateAirContainer td.mat-footer-cell:last-of-type,
.associateAirContainer th.mat-header-cell:last-of-type {
    padding-left: 2.4rem !important;
}

.associateAirContainer tr.mat-footer-row,
.associateAirContainer tr.mat-header-row,
.associateAirContainer tr.mat-row {
    height: 4.4rem !important;
}


/* 
BUTTON CSS */

.associateAirContainer .theme-button {
    color: #fff !important;
    cursor: pointer !important;
    font-size: 1.6rem !important;
    background-color: #27AE60 !important;
    border: 0.2rem solid #27AE60 !important;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
    margin: 0 1rem !important;
    font-family: "Open Sans", sans-serif !important;
    border-radius: 2rem !important;
    padding: 0.1rem 4rem !important;
    line-height: 1.8 !important;
}
body .associateAirContainer .container {
    width:100%!important;
    
}

.associateAirContainer .theme-button:hover,
.associateAirContainer .theme-button:focus,
.associateAirContainer .theme-button:visited {
    background-color: #81C784 !important;
    border-color: #81C784 !important;
}

.associateAirContainer .white-button {
    color: #1A1A1A !important;
    cursor: pointer !important;
    font-size: 1.6rem !important;
    background-color: #fff !important;
    border: 0.2rem solid #27AE60 !important;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
    margin: 0 1rem;
    font-family: "Open Sans", sans-serif !important;
    border-radius: 2rem !important;
    padding: 0 2rem !important;
    line-height: 1.8 !important;
}

.associateAirContainer .white-button:hover,
.associateAirContainer .white-button:focus,
.associateAirContainer .white-button:visited {
    border-color: #1A1A1A !important;
}


/* FORM CSS */


/* 11/May/2020 start */

.associateAirContainer .mapping_dropdown .select_box_dropwodn {
    height: 23px;
}

.associateAirContainer .select_rate_group {
    margin-top: 10px;
}

.associateAirContainer .mat-select-value-text {
    margin-top: .4rem !important;   
    font-size: 1.4rem !important;
    margin-top: 20pxm!important;
    display: inline-block;
    margin-left: .5rem;
}

.associateAirContainer .allc .mat-select-value{
    padding-top: 0rem !important;
}

.associateAirContainer .mat-select-value {
    padding-top: 0rem;
    font-family: 'Open Sans',sans-serif !important;
}
.associateAirContainer .mat-select {
    height: 2.7rem;
}
.associateAirContainer .mat-select-trigger {
    height: 2.7rem;
}
.associateAirContainer .select_rate_group select,
.associateAirContainer .select_rate_group select:focus {
    width: 100%;
    border: none;
    border-bottom: 2px solid #F1F1F1;
    font-size: 22px;
    padding: 0px;
    padding-bottom: 2px;
    outline: none;
    box-shadow: none;
}

.mat-select-panel .mat-option:hover {
    background: #27AE60 !important;
    color: #fff;
}

.mat-select-panel:not([class*=mat-elevation-z]) {
    border: 2px solid #27AE60;
    box-shadow: none;
}

.mat_ngx_select_search_booking {
    font-size: 2rem !important;
    position: absolute;
    top: 0.4rem;
    left: 0;
  }

.associateAirContainer .hyperlink {
    cursor: pointer;
}

.associateAirContainer .mat-primary .mat-option.mat-selected:hover {
    color: #fff !important;
}

.associateAirContainer .all_branch_select .mat-select {
    border: 0.1rem solid #6a6868;
    font-size: 12px;
    padding: 2px 0px;
}

.associateAirContainer .all_branch_select {
    margin-top: -3px;
}

.associateAirContainer .mat_select {
    border: 0.1rem solid #6a6868;
    padding: 5px 0px;
    border-radius: 3px;
    margin-bottom: 15px;
    width: 99% !important;
    box-shadow: 0px 2px 6px #00000029;
}

.associateAirContainer .mat_select {
    border: 0.1rem solid #6a6868;
    padding: 5px 1px;
    border-radius: 3px;
    width: 98% !important;
    margin-bottom: 15px;
}

.associateAirContainer .mat_select:hover,
.associateAirContainer .mat_select:focus {
    border: 1px solid #27AE60;
}

.associateAirContainer .hdr_srch_field .mat-form-field-infix {
    width: 100%;
}

.associateAirContainer .mat_form_field {
    width: 150px !important;
}

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-thick {
    opacity: 1;
}

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-infix {
    padding: 0px !important;
    border-radius: 0px !important;
    outline: 0;
}

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline {
    color: transparent !important;
}
.associateAirContainer .ng-select {
    top: 0 !important;
    box-shadow: 0 0.2rem 0.2rem #00000029 !important;
    border: .1rem solid #6A6868 !important;
    padding: 0 4px;
}
.associateAirContainer .ng-select .ng-select-container {
    height: 2.7rem !important;
    border-radius: .2rem !important;
}
.associateAirContainer .ng-select .ng-select-container .ng-value-container {
    padding-left: 0rem !important;
    font-size: 1.4rem !important;
    margin-left: -6px !important;
}
.associateAirContainer .ng-select div, 
.associateAirContainer .ng-select input, 
.associateAirContainer .ng-select span {
    font-size: 1.4rem;
}
.associateAirContainer .ng-placeholder {
    color: #6A6868 !important;
    opacity: .8 !important;
    padding-left: 1rem !important;
    position: relative !important;
    bottom: 0.3rem !important;
}
.associateAirContainer .ng-value {
    font-size: 1.4rem !important;
    margin-top: -1px;
}
.associateAirContainer .mat-form-field.mat-focused .mat-form-field-ripple {
    background-color: #27ae60;
}
.ng-select .ng-clear-wrapper {
    margin-top: 0px !important;
}
.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-input {
    position: absolute;
    left: 0;
    top: 1px !important;
    width: 100%;
}
.ng-select .ng-clear-wrapper .ng-clear {
    display: inline-block;
    font-size: 18px;
    line-height: 1;
    pointer-events: none;
}
.ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option {
    font-size: 1.4rem !important;
    padding: .2rem 1.0rem !important;
    background: #fff !important;
}
.ng-dropdown-panel .ng-dropdown-panel-items .ng-option {
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ng-dropdown-panel.creditNgDropdown .scroll-host {
    max-height: 32rem !important;
    overflow-y: auto;
}

.ng-dropdown-panel .scroll-host {
    overflow: hidden;
    overflow-y: auto;
    position: relative;
    display: block;
    -webkit-overflow-scrolling: touch;
}
.ng-dropdown-panel.creditNgDropdown.ng-select-bottom {
    border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;
}
.ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option {
    font-size: 1.4rem !important;
    padding: .2rem 1.0rem !important;
    background: #fff !important;
}
.ng-dropdown-panel.creditNgDropdown .ng-dropdown-panel-items .ng-option.ng-option-marked {
    background: #27AE60 !important;
    color: #fff;
}








.associateAirContainer .mat-expansion-indicator::after {
    border-style: solid !important;
    border-width: 0px !important;
    content: '';
    display: inline-block !important;
    padding: 0px !important;
    transform: none !important;
    vertical-align: middle;
    border-left: 7px solid transparent !important;
    border-right: 7px solid transparent !important;
    border-top: 13px solid !important;
    color: rgb(129, 199, 132);
}

.associateAirContainer .mat-form-field-type-mat-native-select .mat-form-field-infix::after {
    border-left: 7px solid transparent !important;
    border-right: 7px solid transparent !important;
    border-top: 13px solid !important;
    top: 40% !important;
    right: 6px !important;
}
.mat-form-field.mat-focused.mat-primary .mat-select-arrow {
    color: rgba(0, 0, 0, .54) !important;
}
.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-thick {
    color: transparent;
}

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline {
    display: none;
}

.associateAirContainer .mat-form-field-infix {
    border-top: 0px;
}

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-start {
    border-radius: 0 !important;
    min-width: 0px !important;
}
.associateAirContainer a {
    color: #27ae60;
}
.mat_ngx_booking .mat-select-search-input {
    padding: 2px 10px 2px 16px !important;
    text-transform: uppercase;
    font-size: 1.4rem;
}
.mat_ngx_booking .mat-select-search-clear {
    width: 24px;
    line-height: 24px;
    height: 24px;
}
.mat_ngx_booking .mat-select-search-clear .material-icons {
    font-size: 1.6rem;
}
.mat_ngx_booking .mat-select-search-inner {
    position: fixed;
    top: 50px
}
.mat-select-panel.mat_ngx_booking {
    margin-top: 31px !important;
    padding-top:5px;
}
/* Stepper */


.associateAirContainer .mat-stepper-horizontal, .mat-stepper-vertical {position: relative;}
 .associateAirContainer .mat-stepper-horizontal-line.ng-tns-c19-3.ng-star-inserted {opacity: 0;}
 .associateAirContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label {display: flex  !important;
flex-direction: column !important;justify-content: center;align-items: center !important;align-content: center !important;}
 .associateAirContainer .marginzero{margin: 0 !important;}
 .associateAirContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{display: none !important;}
 .associateAirContainer .round{width: 18px;height: 18px;border-radius: 50%; z-index: 4; background: #6d6d6d;box-shadow: 0px -1px 5px #CCC;outline: none; border: 1px solid #fff}

.associateAirContainer .breadcrumb{padding: 0rem 1.5rem !important;margin-bottom: 3rem !important;border-radius: .4rem !important;}
.associateAirContainer .parent{position: relative !important;}
.associateAirContainer .mat-step-label{font-size: 1.6rem;}
.associateAirContainer .mat-stepper-horizontal, .mat-stepper-vertical {background: transparent !important;}
.associateAirContainer .mat-horizontal-content-container {overflow: hidden; padding: 0 !important;}
.associateAirContainer .mat-horizontal-stepper-header {box-sizing: border-box;  flex-direction: column-reverse !important;  height: auto;padding: 0px !important;}
.associateAirContainer .mat-horizontal-stepper-header .mat-step-label {padding: 0px 0px 0px !important;}
.associateAirContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, .associateAirContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after{
top: 6.8rem !important;}
 .associateAirContainer .mat-stepper-horizontal-line {border-top-width: .3rem !important; border-color: #27AE60 !important; position: relative !important; top: 3.8rem !important;
  margin:0px !important; min-width: 8rem !important;}  

@media only screen and (max-width: 1440px) {
     .associateAirContainer .mat-stepper-horizontal-line{min-width: 6rem !important;}
  }

@media only screen and (max-width: 1440px) {
     .associateAirContainer .mat-stepper-horizontal-line{min-width: 5rem !important;}
  }
  
@media only screen and (max-width: 1366px) {
     .associateAirContainer .mat-stepper-horizontal-line{min-width: 4rem !important;}
  }
.associateAirContainer .mat-step-icon{height: 2.4rem !important; width: 2.4rem !important;}
.associateAirContainer .mat-horizontal-stepper-header-container { margin-bottom: 1% !important;}
.associateAirContainer .mat-step-header .mat-step-icon {background: #27AE60 !important;}
.associateAirContainer .stepper-label{position: relative;top: 0px; right: 0px; bottom: 0px; left: 0px;}
/* Stepper */
.mat-stepper-horizontal{font-family: 'Open Sans', sans-serif !important;}/* end of Stepper */

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-form-field-appearance-outline .mat-form-field-outline-start{
border: .1rem solid currentColor !important;}
.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-start{display: none !important;}


.associateAirContainer .mat-step-icon-content{display: none !important;}
.associateAirContainer .stepperLine{height: .5rem !important; background: #27ae60; position: absolute;top: 5.1rem !important; right: 0; width: 100% !important; z-index: 1;}
   .associateAirContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:focus{background: transparent !important;}
   .associateAirContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header{cursor:  pointer !important;}
   .associateAirContainer .mat-step-header .mat-step-icon-selected{background: #27AE60 !important; cursor:  pointer !important;}
   .associateAirContainer .mat-step-header .mat-step-icon{background: #696969 !important;z-index: 999999 !important; cursor:  pointer !important;}
   .associateAirContainer .mat-step-header:hover{background: rgba(0,0,0,0) !important;}
 
 
   .associateAirContainer .mat-step-label{font-size: 1.6rem;}
   .associateAirContainer .mat-stepper-horizontal, .mat-stepper-vertical {background: transparent !important;}
   .associateAirContainer .mat-horizontal-content-container {overflow: hidden; padding: 0 !important;}
   .associateAirContainer .mat-horizontal-stepper-header {box-sizing: border-box;  flex-direction: column-reverse !important;  height: auto;padding: 0px !important;}
   .associateAirContainer .mat-horizontal-stepper-header .mat-step-label {padding: 0px 0px 0px !important;}
   .associateAirContainer .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after{
   top: 6.8rem !important;}
   .associateAirContainer .mat-stepper-horizontal-line {border-top-width: 3px !important; border-color: #27AE60 !important; position: relative !important; top: 3.8rem !important;
     margin:0px !important; min-width: 8rem !important;}  
 @media only screen and (max-width: 1440px) {
         .associateAirContainer .mat-stepper-horizontal-line{min-width: 6rem !important;}
     }
   
 @media only screen and (max-width: 1440px) {
         .associateAirContainer .mat-stepper-horizontal-line{min-width: 5rem !important;}
     }
     
 @media only screen and (max-width: 1366px) {
         .associateAirContainer .mat-stepper-horizontal-line{min-width: 4rem !important;}
     }
   .associateAirContainer .mat-stepper-horizontal-line{opacity: 0;}
   .associateAirContainer .mat-step-icon{height: 2.4rem !important; width: 2.4rem !important;}
   .associateAirContainer .mat-horizontal-stepper-header-container { margin-bottom: 1% !important;}
   .associateAirContainer .stepper-label{position: relative;top: 0px; right: 0px; bottom: 0px; left: 0px;}
 /* Stepper */
   .associateAirContainer .mat-stepper-horizontal{font-family: 'Open Sans', sans-serif !important;}/* end of Stepper */
 
   #stepper{position: absolute !important; top: -6rem !important; right: 2rem !important;}
   .associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-form-field-appearance-outline .mat-form-field-outline-start{
   border: .1rem solid currentColor !important;}
     .associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-start{display: none !important;}
 
   .associateAirContainer .mat-step-icon .mat-icon,   .mat-step-icon-content {
   z-index: 99;
 }
     .associateAirContainer .biilingTable{width: 206rem !important;}
 
     .associateAirContainer .bilingConsinee{min-height: 4.5rem !important;display: flex;align-items: center;font-size: 1.6rem !important;overflow-wrap: anywhere !important;}
     .associateAirContainer .billingFonts{font-size: 1.8rem !important;}
  
   .associateAirContainer .commercialSlab-container {width: 164rem !important;}

/* Stepper */


.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-suffix {
    top: -2px !important;
}

.associateAirContainer .mat-form-field {
    width: 100%;
}


.associateAirContainer .mat-form-field-type-mat-select .mat-form-field-label {
    margin: -1.2rem 0px 0 -1rem !important;
    color: #948787;
    font-size: 1.4rem !important;
    font-family: 'Open Sans', sans-serif !important;
    text-transform: uppercase !important;
}
.associateAirContainer .mat-option-text {
    font-family: 'Open Sans', sans-serif !important;
    text-transform: uppercase !important;
}

.associateAirContainer .select_down_dropdown .mat-form-field-flex {
    border: 0.1rem solid #686868;
    height: 34px;
    border-radius: 3px;
    box-shadow: 0px 2px 6px #00000029;
}

.associateAirContainer .select_down_dropdown select {
    padding: 0 !important;
    height: 17px !important;
    text-transform: uppercase;
    font-size: .9vw;
}

.associateAirContainer .all_form {
    padding: 0 20px;
}

.associateAirContainer .mat-select {
    text-transform: uppercase !important;
}

.associateAirContainer .select_down_dropdown .mat-form-field-label {
    margin: 0 5px !important;
}

.associateAirContainer .mat_card_zone form {
    margin-top: -5px;
}

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-flex {
    padding: 0 !important;
    margin-top: 0px !important;    
    border: 0.1rem solid #6a6868 !important;
    box-shadow: 0 0.2rem 0.2rem #00000029 !important;
}

.associateAirContainer .select_box_dropwodn .mat-form-field-flex {
    position: absolute;
}

.associateAirContainer .all_form select {
    width: 100%;
    height: 34px;
    background: #fff;
}

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-start {
    border-radius: 3px 0 0 3px !important;
}

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-end {
    border-radius: 0 3px 3px 0 !important;
}

.associateAirContainer .select_box_dropwodn .mat-form-field-flex {
    border: 0.1rem solid #6a6868;
    height: 2.7rem;
    box-shadow: 0 0.2rem 0.2rem #00000029 !important;
}


.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline {
    top: 0 !important;
}

.associateAirContainer .mat-form-field-label {
    top: 20px !important;
    left: 12px !important;
    font-size: 20px !important;
}

.associateAirContainer .mapping_dropdown .mat-form-field-type-mat-select .mat-form-field-label {
    color: #333 !important;
}

.associateAirContainer .mapping_dropdown .select_box_dropwodn .mat-form-field-flex {
    box-shadow: 0px 2px 6px #00000029 !important;
    border-radius: 3px !important;
    border: 0.1rem solid #6a6868 !important;
    margin: 0px 0 !important;
    padding: -1px !important;
    background: #fff !important;
    height: 28px !important;
}

.associateAirContainer .branch_date_piker .mat-form-field-flex {
    height: 28px;
    width: 75%;
    top: 4px !important;
}

.associateAirContainer .last_update .mat-form-field-wrapper {
    padding-bottom: 0px !important;
}

.associateAirContainer .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {
    color: #27AE60;
}

.associateAirContainer .select_avtive .mat-form-field-flex {
    background: #27AE60;
}

.associateAirContainer .select_avtive .mat-form-field-label {
    color: #fff !important;
}

.associateAirContainer .table_input .mat-form-field-appearance-outline .mat-form-field-flex {
    width: 75%;
    margin: 0px !important;
}

.associateAirContainer .table_input .mat-form-field-wrapper {
    padding-bottom: 0px !important;
}

.associateAirContainer .control-label {
    font-family: "Open Sans", sans-serif !important;
    font-size: 1.6rem !important;
    margin-bottom: 2rem !important;
}

/* DATEPICKER CSS */


/* 12/May/2020 start */

.associateAirContainer .top_10 .date_picker_adjust .mat-input-element {
    top: 3px 0 !important;
}

.associateAirContainer .date_choose_picker {
    font-size: 17px !important;
    color: #c5c2c2 !important;
    font-weight: 300 !important;
}

.associateAirContainer .date_picker_adjust .mat-input-element {
    border-radius: 0 !important;
    font-size: 1.4rem !important;
    font-family: 'Open Sans', sans-serif !important;
    height: 2.7rem !important;
    margin-bottom: 0rem !important;
}

.associateAirContainer .date_picker_adjust .mat-form-field-flex {
    height: 2.7rem !important;
}


/* 12/May/2020 end */

.associateAirContainer .mat-radio-button {
    margin-right: 1rem !important;
    margin-bottom: 0rem !important;
}

.associateAirContainer .mat_radio_btn_mb_0 .mat-radio-button {
    margin-bottom: 0px !important;
}

.associateAirContainer .mat-radio-label-content {
    font-size: 1.6rem !important;
    font-weight: 500;
    font-family: "Open Sans", sans-serif !important;
    padding-left: 4px;
}

.associateAirContainer .mat-radio-label {
    text-transform: capitalize !important;
}

.associateAirContainer #datepickerwidth {
    width: 100% !important;
}

.associateAirContainer .ass_date_icon .mat-datepicker-toggle-default-icon {
    position: absolute;
    top: 0.8rem;
    right: 1.2rem;
    font-size: 1.6rem !important;
}

.associateAirContainer .mat-datepicker-toggle-default-icon {
    position: absolute;
    top: 0.2rem;
    right: 0;
    font-size: 1.6rem !important;
}

.associateAirContainer .mat-calendar-body-selected {
    background-color: #27AE60 !important;
}

.associateAirContainer .mat-calendar-body-today:not(.mat-calendar-body-selected) {
    border-color: #27AE60 !important;
}

.mat-datepicker-toggle-active {
    color: #27AE60 !important;
}

.mat-datepicker-content .mat-calendar {
    width: 29.6rem !important;
    height: 35.4rem !important;
}

.mat-datepicker-toggle .mat-icon-button {
    top: -2.2rem !important;
    border-radius: 0 !important;
}

.mat-calendar-body-selected {
    background-color: #27AE60 !important;
}

td.mat-calendar-body-cell {
    font-size: 1.5rem;
    line-height: 2rem;
    padding: 1.8rem 0 !important;
}

.mat-calendar-controls .mat-icon-button {
    width: 5.5rem !important;
    height: 5.5rem !important;
}


.mat-form-field-infix {
    padding: 6px 0px !important;
    border-top: 0 !important;
}
.mat-calendar-table-header th {
    color: #111;
    font-weight: 700;
}
.associateAirContainer .mat-form-field {
    width: 100% !important;
}

.associateAirContainer .mat-form-field-prefix,
.associateAirContainer .mat-form-field-suffix {
    margin-left: -20px !important;
}

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-prefix {
    position: absolute;
    top: 15px !important;
    right: 0px;
    z-index: 99;
}

.associateAirContainer .prefixCom .mat-form-field-appearance-outline .mat-form-field-prefix {
    position: absolute;
    top: .6rem !important;
    left: 3rem !important;
    overflow: hidden !important;
    /* text-overflow: ellipsis !important; */
    white-space: nowrap !important;
    width: 8rem !important;
    font-size: 1.6rem !important;    
}
.associateAirContainer .mat-form-field .mat-placeholder-required.mat-form-field-required-marker {
    display: none;
}
.associateAirContainer .prefixCom .mat-input-element {
    text-align: left !important;
    padding-left: 3rem !important;  
    text-overflow: ellipsis !important;
}
.associateAirContainer .errorMsg {
    margin-top: -4px;
    color: red;
    font-size: 1.5rem;
    text-transform: capitalize;
}

.associateAirContainer .errorCreMsg {
    margin-top: -13px;
    color: red;
    font-size: 1.6rem;
}

/* global css end 07/May/2020 */

.associateAirContainer .create_search_pin .form-control,
.associateAirContainer .search_bar_mdm2d .form-control {
    padding: 0.2rem 1rem 0.2rem 3rem !important;
}

.associateAirContainer .branch_location_sec .search_bar_mdm2d i {
    top: 7px;
}

.associateAirContainer .br_allo_ser i {
    top: 9px;
}

.associateAirContainer .branch_allo_search i {
    top: 7px;
}

::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    font-family: "Open Sans", sans-serif !important;
}

::-moz-placeholder {
    /* Firefox 19+ */
    font-family: "Open Sans", sans-serif !important;
}

:-ms-input-placeholder {
    /* IE 10+ */
    font-family: "Open Sans", sans-serif !important;
}

:-moz-placeholder {
    /* Firefox 18- */
    font-family: "Open Sans", sans-serif !important;
}


/* responsive css start */

@media only screen and (max-width: 767px) {
    .associateAirContainer .card_white {
        width: 100% !important;
        margin-top: 20px;
    }
    .associateAirContainer .all_form {
        padding: 0 0px;
    }
    .associateAirContainer .active_btn,
    .associateAirContainer .deactive_btn {
        margin: 0px;
        padding: 0 9px;
        width: 100px;
        border-radius: 0;
    }
    .associateAirContainer .active_btn,
    .associateAirContainer .deactive_btn {
        font-size: 3vw !important;
        margin-right: 5px !important;
    }
    .associateAirContainer .mat_card_zone .mat-grid-tile .mat-figure {
        padding: 0px;
    }
    .associateAirContainer .mat-button {
        padding: 0 4px !important;
    }
    .associateAirContainer .grid_title {
        margin: 13px 0;
    }
    .associateAirContainer .button_grid_position:before {
        display: none;
    }
    .associateAirContainer .mobile_height_sidebar {
        height: 66px !important;
    }
    .associateAirContainer .coll_lookpup_height {
        height: 100px !important;
    }
    .associateAirContainer .mat_card_zone {
        padding: 15px !important;
    }
    .associateAirContainer .mat-grid-tile.notepad_open_card .mat-figure {
        padding: 0;
    }
    .associateAirContainer .mat-grid-tile.notepad_card .mat-figure {
        padding: 0;
    }
    .associateAirContainer .mat-grid-tile.module_area .mat-figure {
        justify-content: flex-start !important;
    }
    .associateAirContainer .grid_title {
        font-size: 2.8vw;
    }

    .associateAirContainer .table_main_header .mat-cell {
        font-size: 1.8vw;
    }
    .associateAirContainer .mat_card_zone .mat-cell {
        font-size: 1.8vw;
    }
    .associateAirContainer .sub_heading {
        font-size: 6vw;
    }
    .associateAirContainer .add_btn {
        float: right;
        position: absolute !important;
        right: -45px;
        top: 0;
    }
    .associateAirContainer .hdr_srch_field input {
        padding-left: 030px;
        border: 0.1rem solid #ddd;
        width: 116px;
        font-size: 2vw;
    }
    .associateAirContainer .hdr_srch_field {
        padding-left: 0px;
        position: relative;
        margin: 5px 0px;
        width: 146px;
        margin: 0 25px;
    }
    .mapping_dropdown .select_box_dropwodn .mat-form-field-flex {
        height: 2.7rem !important;
    }
    .associateAirContainer .mat-row,
    .associateAirContainer .mat-header-row,
    .associateAirContainer .mat-footer-row {
        display: table-row;
    }
    .associateAirContainer .mat-cell,
    .associateAirContainer .mat-header-cell .mat-footer-cell {
        display: table-cell;
        padding: 1rem;
        line-height: 1.42857143;
        vertical-align: top;
    }
    .associateAirContainer .mat-dialog-responsive {
        width: 80vw !important;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
    .associateAirContainer .card_white {
        width: 140px !important;
    }
    .associateAirContainer .card_white p {
        width: 74px;
        margin: 48px 7px;
        font-size: 13px;
    }
    .associateAirContainer .active_btn,
    .associateAirContainer .deactive_btn {
        height: 3vh;
    }
    .associateAirContainer .mat_card_zone .mat-row {
        min-height: 2vh;
    }
}

@media only screen and (min-width: 1024px) and (max-width: 1365px) {
    .associateAirContainer .active_btn,
    .associateAirContainer .deactive_btn {
        width: 9vw;
        height: 37px;
        margin-bottom: 8px !important;
        font-size: 11px !important;
    }
    .associateAirContainer .mapping_dropdown .select_box_dropwodn {
        height: 40px;
    }
    .associateAirContainer .mapping_dropdown .select_box_dropwodn {
        height: 30px;
    }
    .associateAirContainer .card_white {
        width: 175px !important;
    }
    .associateAirContainer .table_main_header .mat-cell {
        font-size: 1vw;
        text-transform: uppercase;
    }
    .associateAirContainer .mat_card_zone mat-label {
        font-size: 13px;
    }
    .associateAirContainer .hdr_srch_field .material-icons {
        left: 15px !important;
    }
    .associateAirContainer .hdr_srch_field {
        padding-left: 10px !important;
    }
    .associateAirContainer .user-img img {
        margin: 0 0px 0 30px !important;
    }
    .associateAirContainer .mat-icon-button.menu_icon_position {
        position: absolute;
        top: 10px;
        left: 0;
        padding: 0 15px;
    }
    .associateAirContainer .mat-icon-button.header_bell {
        position: absolute;
        right: 20%;
        top: 0 !important;
        padding: 0 15px;
    }
}

@media only screen and (min-width: 1366px) and (max-width: 1440px) {
    .associateAirContainer .active_btn,
    .associateAirContainer .deactive_btn {
        width: 135px;
        height: 37px;
    }
    .associateAirContainer .mapping_dropdown .select_box_dropwodn {
        height: 2.7rem;
    }
    .associateAirContainer .new_contracts {
        margin-left: 45px;
    }
    .associateAirContainer .mat-table {
        overflow: hidden;
    }
}

@media only screen and (max-width: 767px) {
    /* booking module mobile responsive start */
    .associateAirContainer .bkng_dsh_card {
        margin-bottom: 15px;
    }
    .associateAirContainer .mo_ml_0 {
        margin-left: 0px
    }
    .associateAirContainer .mob_searchbar_mdm2 i {
        top: 5px !important;
        left: 8px !important;
    }
    .associateAirContainer .mob_plr_15 {
        padding-left: 15px !important;
        padding-right: 15px !important;
    }
    .associateAirContainer .gray_card_msa1 {
        margin-bottom: 15px;
    }
    .associateAirContainer .mob_sla_1 .row {
        margin-bottom: 15px;
    }
    .associateAirContainer .bg_gray_msa_4 p {
        padding: 0px 15px;
    }
    .associateAirContainer .hdr_srch_field {
        width: auto !important;
        margin: 0px !important;
        padding: 0px 5px !important;
    }
    .associateAirContainer .mo_float_left {
        float: left;
    }
    .associateAirContainer .mo_float_right {
        float: right;
    }
    .associateAirContainer .mob_hide {
        display: none;
    }
    .associateAirContainer .mob_mt_15 {
        margin-top: 15px;
    }
    .associateAirContainer .dsh_bkg_sec_2 .db_module {
        margin-bottom: 15px;
        padding-bottom: 10px;
    }
    .associateAirContainer .dsec2_cart_img img {
        width: auto;
    }
    .associateAirContainer .add_new_d {
        margin-bottom: 50px;
    }
    .associateAirContainer .booking_msa_sec .initlate_request_add {
        margin-top: -5px;
    }
    .associateAirContainer .ba_dashboard_1 h2 {
        margin-bottom: 15px;
    }
    .associateAirContainer .modal_table_full_width .mat-row {
        display: block;
    }
    .associateAirContainer .mat-dialog-container {
        height: 600px !important;
        overflow-y: scroll !important;
    }
    .associateAirContainer .contract_update_bm .width_20 {
        width: 50%;
        margin-bottom: 20px;
        text-align: center;
    }
    .associateAirContainer .contract_update_bm .mo_width_100 {
        width: 100%;
    }
    .associateAirContainer .contract_update_bm .mo_width_100 .modal_card_5 {
        margin-right: 7%;
    }
    .associateAirContainer .bac_update_modal {
        margin-bottom: 15px;
    }
    .associateAirContainer .new_cont_book {
        float: left;
    }
    .associateAirContainer .create_srch_bar {
        margin-left: 0px;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
    .associateAirContainer .bkng_dsh_card {
        padding: 30px 25px;
    }
    .associateAirContainer .dsh_right_card .float_right {
        float: none;
    }
    .associateAirContainer .dsh_right_card {
        margin-right: 6%;
        float: left;
    }
    .associateAirContainer .mob_plr_15 {
        padding-left: 15px !important;
        padding-right: 15px !important;
    }
    .associateAirContainer .search_bar_mdm2d i {
        left: 9px;
    }
    .associateAirContainer .progress_bar_booking {
        padding: 15px 0px;
    }
    .associateAirContainer .add_new_d {
        margin-bottom: 50px;
    }
    .associateAirContainer .dsec2_cart_img img {
        width: 87%;
    }
    .associateAirContainer .dsh_bkg_sec_2 .db_module {
        margin-top: 30px;
    }
    .associateAirContainer .mat-dialog-responsive {
        width: 80vw !important;
    }
    .associateAirContainer .modal_card_5 p {
        font-size: 12px;
    }
    .associateAirContainer .heading_with_icon {
        margin-bottom: 15px;
    }
    .associateAirContainer .bac_update_modal {
        margin-bottom: 30px;
    }
    .associateAirContainer .laptop_cre_width {
        width: 40%;
    }
    .associateAirContainer .search_bar_mdm2d i {
        left: 20px;
    }
    .associateAirContainer .new_cont_book {
        float: left;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1366px) {
    .associateAirContainer .bg_gray_msa_4 p {
        font-size: 12px !important;
    }
    .associateAirContainer .container {
        width: 85vw;
    }
    .associateAirContainer .dsh_bkg_sec_2 {
        padding-bottom: 20%;
    }
    .associateAirContainer .laptop_cre_width {
        width: 22%;
    }
}


/* 15/may/2020 start */

.associateAirContainer .m_add_new_contract {
    float: right;
    display: flex;
}

.associateAirContainer .m_add_new_contract mat-label {
    margin-top: 5px;
    margin-right: 10px;
}

.associateAirContainer .m_add_new_contract .add_icon,
.associateAirContainer .title_search_add .add_icon,
.associateAirContainer .label_and_add .add_icon,
.associateAirContainer .add_create_designation .add_icon {
    cursor: pointer;
    background: #27ae60;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 20px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.associateAirContainer .m_add_new_contract .add_icon:focus,
.associateAirContainer .m_add_new_contract .add_icon:hover,
.associateAirContainer .title_search_add .add_icon:focus,
.associateAirContainer .title_search_add .add_icon:hover,
.associateAirContainer .label_and_add .add_icon:focus,
.associateAirContainer .label_and_add .add_icon:hover,
.associateAirContainer .add_create_designation .add_icon:focus,
.associateAirContainer .add_create_designation .add_icon:hover {
    outline: 0;
    background-color: #81C784;
}

.associateAirContainer .mat-row {
    background: #fff;
    border-bottom: 1px solid #eee !important;
}

.associateAirContainer .title_search_add {
    display: flex;
}

.associateAirContainer .mdm_searchbar {
    position: relative;
    margin-left: 8px;
    margin-top: -0.56rem;
}

.associateAirContainer .mdm_searchbar i {
    position: absolute;
    top: 1.2rem;
    left: 1rem;
    font-size: 1.4rem;
}
.associateAirContainer .mdm_searchbar span {
    position: absolute;
    top: 0.7rem;
    left: 1rem;
    font-size: 1.4rem;
}

.associateAirContainer .mdm_searchbar em {
    position: absolute;
    top: 1rem;
    cursor: pointer;
    left: 1rem;
    font-size: 1.4rem;
}

.associateAirContainer .mdm_searchbar .form-control {
    padding-left: 20px !important;
}

.associateAirContainer .search_branch_tbl {
    max-height: 20rem;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 2rem;
}

.associateAirContainer .search_branch_tbl div {
    font-size: 1.6rem !important;
}

.associateAirContainer .title_search_add .add_icon {
    margin: -3px 0px 0px 15px;
}

.associateAirContainer .label_and_add {
    display: flex;
}

.associateAirContainer .label_and_add .add_icon {
    margin: 5px 0px 0px 15px;
}

.associateAirContainer .label_and_add mat-label {
    margin-top: 9px;
}

.associateAirContainer .box_shadow_none,
.associateAirContainer .box_shadow_none:hover {
    box-shadow: none !important;
}

.associateAirContainer .as_lsa mat-label {
    margin-top: 0px;
}

.associateAirContainer .as_lsa i {
    top: 7px;
}

.associateAirContainer .as_lsa em {
    top: 7px;
}

.associateAirContainer .as_lsa .add_icon {
    margin-top: 0px;
}

.associateAirContainer .mat-table img {
    margin: 0px 10px;
    cursor: pointer;
}

.associateAirContainer .emi_daily_calcu_mod .branch_table_dis {
    background: #eeeeee6e;
    border: none !important;
}

.associateAirContainer .black_card_blank {
    background: #515457;
    height: 34px;
}


/* Mat Select Form CSS */

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-start {
    border-radius: 3px 0 0 3px !important;
}

.associateAirContainer .mat-form-field-appearance-outline .mat-form-field-outline-end {
    border-radius: 0 3px 3px 0 !important;
}

.associateAirContainer .mat-select-arrow {
    border-left: 4px solid transparent !important;
    border-right: 4px solid transparent !important;
    border-top: 9px solid !important;
    right: 8px !important;
    margin-top: 0px !important;
}
.associateAirContainer .mat-form-field-label-wrapper {
    font-size: 1.4rem !important;
}

.associateAirContainer .mat-form-field-appearance-legacy .mat-form-field-infix {
    padding: 0 !important;
    height: 2.7rem;
}

.associateAirContainer .mat-form-field-appearance-legacy .mat-form-field-wrapper {
    padding-bottom: 0.25em;
}
.associateAirContainer .mat-form-field-wrapper {
    padding-bottom: 1rem !important;
}
.associateAirContainer .mat-input-element {
    caret-color: #686868;
    padding: 0px 4px !important;
    font-family: 'Open Sans', sans-serif !important;
    font-size: 1.4rem;
}

.mat-select-panel .mat-option {
    background: #fff !important;
    font-size: 1.5rem !important;
    text-transform: uppercase;
    height: 2.7rem !important;
    padding: 0 0.5rem;
    font-family: 'Open Sans', sans-serif !important;
}

.mat-select-panel .mat-option:hover {
    background: #27AE60 !important;
    color: #fff;
}

.mat-select-panel:not([class*=mat-elevation-z]) {
    border: 2px solid #27AE60;
    box-shadow: none;
}

.mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {
    background-color: #27AE60 !important;
    color: #fff !important;
}

.mat-select-panel {
    min-width: calc(100% + 3px) !important;
    width: 100% !important;
    top: 2.1rem !important;
    margin-top: 0rem !important;
    left: 2.1rem !important;
    box-shadow: none !important;
    position: absolute !important;
    border: .1rem solid #6A6868 !important;
    border-radius: .2rem !important;
    max-height: 29vh !important;
    overflow-y: auto !important;
}
.mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {
    background: #27ae60 !important;
}
.mat-primary .mat-pseudo-checkbox-checked, .mat-primary .mat-pseudo-checkbox-indeterminate {
    background: #27ae60 !important;
}
.mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {
    color: #fff !important;
}
.cdk-overlay-pane {
    transform: translateX(-16px) !important;
}


/* Mat Select Form CSS */


/* table css start */

.associateAirContainer .create_new_tale_mdm2 .mat-table tbody,
.associateAirContainer .create_new_tale_mdm2 .mat-table tfoot,
.associateAirContainer .create_new_tale_mdm2 .mat-table thead,
.associateAirContainer .create_new_tale_mdm2 .mat-table-sticky {
    display: contents;
}

.associateAirContainer .create_new_tale_mdm2 td.mat-cell,
.associateAirContainer .create_new_tale_mdm2 td.mat-footer-cell,
.associateAirContainer .create_new_tale_mdm2 th.mat-header-cell {
    border-bottom-width: 0px;
    color: rgba(0, 0, 0, .87) !important;
    border-bottom: none;
}

.associateAirContainer .create_new_tale_mdm2 tr.mat-header-row {
    background: #F1F1F1 0% 0% no-repeat padding-box;
}

.associateAirContainer .create_new_tale_mdm2 .input_table_width {
    padding-top: 0rem;
}

.associateAirContainer .create_new_tale_mdm2 .table_input_width {
    padding-top: 5px;
}

.associateAirContainer .create_new_tale_mdm2 .mat-checkbox-layout {
    margin: 0;
}
.associateAirContainer .table-responsive {
    overflow-y: hidden;
}

/* table css end */


/*---- multiselect css start ---- */

.associateAirContainer .primary-color {
    color: #27AE60 !important;
}

.associateAirContainer .mat-pseudo-checkbox.mat-pseudo-checkbox-checked,
.associateAirContainer .mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate {
    border-color: #757575 !important;
}

.associateAirContainer .mat-primary .mat-pseudo-checkbox-checked,
.associateAirContainer .mat-primary .mat-pseudo-checkbox-indeterminate {
    background: #53af61 !important;
}

.cdk-overlay-pane {
    transform: translateX(-16px);
}


/*------ multiselect css end --------- */


/* Pradeep Css */

.displayflex{display: flex; align-items: center;}
.bar{width: 20%;}
.paddingzero{padding: 0;}
.margin-row{margin: 0; padding: 0;}
.margin-row{padding-left: 0; padding-right: 0; margin-right: 0; margin-left: 0;}
.searchby{position: relative; font-weight: bold; margin-left: 0; padding-left: 1.5rem; margin-right: 0; font-size: 1.6rem;bottom: 1rem;}
.associateAirContainer .zonalheadingbar {
    font-size: 1.6rem !important;
    /* width: 20%; */
}

.associateAirContainer .displayflex {
    display: flex;
    align-items: center;
}

.associateAirContainer .bar {
    width: 20%;
}

.associateAirContainer .paddingzero {
    padding: 0;
}

.associateAirContainer .margin-row {
    margin: 0;
    padding: 0;
}

.associateAirContainer .margin-row {
    padding-left: 0;
    padding-right: 0;
    margin-right: 0;
    margin-left: 0;
}

.associateAirContainer .searchby {
    position: relative;
    font-weight: bold;
    font-size: 1.4rem !important;
    margin-top: 0px !important;
    margin-bottom: 0 !important;
}


/* Pradeep Css END */

/* Sarvjyoti css*/
/* for DASHBOARD */

.associateAirContainer .mat-cell,.mat-header-cell {flex: 1 !important;overflow: hidden;word-wrap: break-word;}
.associateAirContainer tr.mat-footer-row, .associateAirContainer tr.mat-row{height: 4.2rem !important;}
.associateAirContainer td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type, .associateAirContainer th.mat-header-cell:first-of-type{padding-left: 2.4rem !important;}
.associateAirContainer td.mat-cell, td.mat-footer-cell, .associateAirContainer th.mat-header-cell {border-bottom-width: .1rem !important; border-bottom-color: rgba(0,0,0,.12) !important;}
.associateAirContainer mat-header-cell:first-of-type{padding-left: 1.2rem !important;}
.associateAirContainer mat-header-cell:last-of-type{padding-right: 0 !important;}
.associateAirContainer mat-cell:first-of-type, .associateAirContainer mat-footer-cell:first-of-type, .associateAirContainer mat-header-cell:first-of-type {
  padding-left: 1.2rem !important;}
  .associateAirContainer mat-cell:last-of-type, .associateAirContainer mat-footer-cell:last-of-type, .associateAirContainer mat-header-cell:last-of-type {
  padding-right: 0 !important;}
  .associateAirContainer .mat-header-cell{font-size: 1.6rem; font-weight: 600; background: #F1F1F1;}
  .associateAirContainer .mat-table{font-family: 'Open Sans', sans-serif !important;}
  .associateAirContainer mat-header-row{min-height: 4.5rem !important;}
  .associateAirContainer .example-container {overflow: auto;box-shadow: none;}
  .associateAirContainer mat-footer-row, .associateAirContainer mat-row {min-height: 4.5rem !important;}
  .associateAirContainer .mat-cell, .associateAirContainer .mat-footer-cell {font-size: 1.5rem !important;}
  .associateAirContainer .wordBreakall{word-break: break-all !important;}
  .associateAirContainer .overflow::-webkit-scrollbar {width: .7rem;  max-height: 1.0rem;}
  .associateAirContainer .overflow::-webkit-scrollbar-track {display: none;border-radius: 1.0rem;}
  .associateAirContainer .overflow::-webkit-scrollbar-thumb {background: #6A6868 !important;border-radius: 1.0rem;  max-height: 1.0rem;}
.associateAirContainer .overflow::-webkit-scrollbar-thumb:hover {background: #585757 !important;}
/* end of mat table */

.associateAirContainer table {width: 100%;}
.associateAirContainer .dashboardTable .mat-sort-header-arrow, [dir=rtl] .mat-sort-header-position-before .mat-sort-header-arrow {margin: 0px 10px 0 1px !important;}
.associateAirContainer table.mat-table {box-shadow: none !important;}
.associateAirContainer tr.mat-footer-row {font-weight: bold;}
.associateAirContainer .mat-table-sticky {border-top: .1rem solid #e0e0e0;}
.associateAirContainer td.mat-cell, .associateAirContainer td.mat-footer-cell, th.mat-header-cell {border-bottom-width: .1rem !important;}

/* tooltip */
.tooltiptext {display: none; background: #27AE60; color: #fff; text-align: left; border-radius: .6rem; padding: .5rem 0;
    z-index: 1123456;word-break: break-all !important} 
    .dots:hover .tooltiptext {display: block;}
    .mat-tooltip {background: #27AE60 !important; color: #fff !important; font-size: 1.6rem !important;font-family: 'Open Sans', sans-serif !important;
  top: 0 !important; right: 0 !important; left: 0 !important; bottom: 0 !important;}
   /* Position the tooltip */
   .associateAirContainer .mat-sort-header-button{text-align: left !important;}

   .associateAirContainer .mat-card { font-family: 'Open Sans', sans-serif !important;box-shadow: none !important; cursor: pointer;}
/* search Icon */
.associateAirContainer #defualtBranchSearch{position: absolute;top: .5rem;z-index: 99;left: 2rem;font-size: 1.8rem; color: #ccc; cursor: pointer;}
.associateAirContainer #defualtBranchSearch9{position: absolute; right: 2rem;z-index: 1234; font-size: 1.7rem; top: 1rem; z-index: 10; color: #BCBCCB;}
.associateAirContainer #defualtBranchSearch2{position: absolute;left: 2.0rem;z-index: 1234; font-size: 1.7rem; top: .6rem; z-index: 10; color: #ccc;}
.associateAirContainer #defualtBranchSearch1{position: absolute; right: 4rem;z-index: 1234; font-size: 1.7rem; top: .5rem; z-index: 10; color: #BCBCCB;}
.associateAirContainer #defualtBranchSearch5{position: absolute;left: 2.0rem;z-index: 1234; font-size: 1.7rem; z-index: 10; color: #ccc;}
.associateAirContainer #defualtBranchSearchbase{position: absolute;top: .7em;z-index: 1234; left: 2rem;font-size: 1.8rem; color: #ccc; cursor: pointer;}
/* End of Search Icon */

/* Form Control */
.associateAirContainer .form-control{ width: 99.8%; color: rgba(0,0,0,.87) !important;font-family: 'Open Sans', sans-serif !important; border-radius: 0 !important; height: 2.7rem !important; font-size:1.4rem}
.associateAirContainer .form-control.not-mat-form{
    border: 0.1rem solid #6a6868;
    height: 2.7rem;
    box-shadow: 0 0.2rem 0.2rem #00000029 !important;
}
.associateAirContainer .form-control-textarea {padding-left: .6rem !important; color: #686868 !important; border-radius: 0 !important; border: .1rem solid #6a6868 !important; box-shadow: 0rem .2rem .6rem #00000029 !important; }
.associateAirContainer input{text-transform: uppercase !important;}
.associateAirContainer textarea{text-transform: uppercase !important; font-size: 1.6rem; padding: 0 0.5rem;}
.associateAirContainer .form-control:focus {outline: none !important;color: #686868 !important; border-color: #27AE60 !important; box-shadow: 0 0 0 0 !important;}
.associateAirContainer .form-control:hover{outline: none !important;color: #686868 !important; border-color: #27AE60 !important; box-shadow: 0 0 0 0 !important;}
.associateAirContainer textarea:focus {outline: none !important; border-color: #27AE60 !important; box-shadow: 0 0 0 0 !important;}
.associateAirContainer textarea:hover{outline: none !important; border-color: #27AE60 !important; box-shadow: 0 0 0 0 !important;}
.associateAirContainer .form-control-textarea:focus{border-color: #27AE60 !important;  box-shadow: none !important; -webkit-box-shadow: none !important;}
.associateAirContainer mat-panel-title{font-weight: bold !important;}
.associateAirContainer .form-control[disabled],
.associateAirContainer .form-control[readonly],
.associateAirContainer fieldset[disabled] .form-control {
    margin-top: 0.1px;
}

.associateAirContainer .content{margin-top: 1rem !important; margin-bottom: 1rem !important;}
.associateAirContainer .marginTopOne{margin-top: 1rem !important;}
.associateAirContainer .marginBottomOne{margin-bottom: 1rem !important;}

/* Mat-table */

/** CSS FOR Paginator Starts HERE **/  
.associateAirContainer .paginator .mat-form-field{width: 6rem !important;}
.associateAirContainer .paginator .mat-form-field-appearance-legacy .mat-form-field-underline{height: .1rem !important;width: 6rem !important;}
.associateAirContainer .paginator .mat-select-value{width: 60% !important;}
.associateAirContainer .paginator .mat-primary .mat-option.mat-selected:not(.mat-option-disabled){color: #fff !important;}
.associateAirContainer .paginator .mat-option.mat-selected:not(.mat-option-multiple){background: #27AE60 !important;}
.associateAirContainer .paginator .cdk-overlay-pane{top: 2rem !important;} 
.associateAirContainer .mat-paginator-page-size-label {margin: 0 0 !important;position: relative !important;bottom: 0rem !important;right: 1rem !important;}
.associateAirContainer .mat-paginator-page-size {margin-right: 0;}
.associateAirContainer .mat-paginator-range-label {margin: 0 15px;}
.associateAirContainer .mat-icon-button {width: 3rem !important;height: 3rem !important;line-height: 1.8 !important;border-radius: 0 !important; right: 4px !important;}
.associateAirContainer .mat-paginator-icon {width: 2.8rem !important;}

.associateAirContainer .mat-form-field-appearance-legacy .mat-form-field-wrapper {padding-bottom: 0px !important;}
.associateAirContainer .mat-paginator, .associateAirContainer .mat-paginator-page-size .mat-select-trigger{position: relative !important; top: 1rem !important;margin-top: -1rem;font-family: 'Open Sans', sans-serif !important;}
/* End of Sarvjyot Css */
.associateAirContainer .material-icons.iconSize {
    font-size: 2.4rem;
    color: #27AE60 !important;
    position: relative;
    top: 0.3rem;
}
/* END DASHBOARD */

.associateAirContainer .errorMsg em{
    font-style: normal;
    color: red;
    font-size: 1.4rem;
    text-align: left;
    text-transform: capitalize;
}
.associateAirContainer .redMark {
    color: red;
    font-weight: 500;
}
/* Advance Search Pop-Up */

.cdk-overlay-backdrop {background: rgba(51, 51, 51, 0.78) !important;}
.associateAirContainer .fa-times{color: #1a1a1a;position: absolute;right: 1rem;top: -1rem; cursor: pointer;opacity: 0.6;}
.associateAirContainer .zonalheadingbar{background: #F1F1F1; height: 4.5rem; display: flex;  align-items: center; line-height: 1.2;
font-size: 1.6rem; font-weight: 500;border-right: .1rem solid #fff;}
.associateAirContainer .commercial-padding{padding-left: .5rem; padding-right: .5rem;}
#popup-hr{margin-top: .5rem; border: 0;border-top: .2rem solid #27AE60;}
#h2{margin-top: 1.8rem; margin-left: 2.0rem; margin-bottom: 0; min-width: 47rem !important;}
#h3{margin-top: .8rem; margin-bottom: 0; min-width: 47rem !important;}
#h4{margin-top: 1.8rem; margin-bottom: 0; min-width: 47rem !important;}
.associateAirContainer .paddingLeftZero{padding-left: 0 !important;}
.associateAirContainer .paddingRightZero{padding-right: 0 !important;}
.associateAirContainer .marginLeftZero{margin-left: 0 !important;}
.associateAirContainer .marginRightZero{margin-right: 0 !important;}

.associateAirContainer .margin-row{margin-right: 0 !important; margin-left: 0 !important;}
.associateAirContainer .row-margin{margin-left: 0; margin-right: 0;padding-left: 0 !important;padding-right: 0 !important;position: relative;}
.associateAirContainer .searchby{font-weight: bold; font-size: 1.6rem !important; margin-bottom: 2.5rem; padding-left: 1.5rem; margin-right: 0; margin-top: .4rem;}
.associateAirContainer .searchby1{font-weight: bold; font-size: 1.6rem !important; margin-bottom: 1.5rem; padding-left: 1.5rem; margin-right: 0; margin-top: .4rem;}
.associateAirContainer .mat-dialog-content{display: block; margin: 0 0; padding: 0 0; max-height: 52vh; overflow: auto;}
.associateAirContainer .mat-dialog-container{border-radius: 2.0rem; padding: 0; overflow-x: unset;}
.associateAirContainer .width{width: 20%;height: 3.5rem; display: flex; border-bottom: 1 solid #f1f1f1; align-items: center;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;}
.associateAirContainer .input-field{height: 2.7rem; padding-left: 2.3rem;cursor: pointer;}
.mat-tooltip-panel {font-family: 'Open Sans', sans-serif !important}
/* End of Pop Up */





/************** MODAL CSS ****************/

.mat-dialog-responsive a {color: #27ae60;}
.mat-dialog-responsive .table-responsive {overflow-y: hidden;}
.mat-dialog-responsive .theme_color {color: #27AE60 !important;}
.mat-dialog-responsive .theme_bg_color {background: #27AE60 !important;}
.mat-dialog-responsive .color_white {color: #fff !important;}
.mat-dialog-responsive .color_black {color: #333;}
.mat-dialog-responsive .position_relative {position: relative !important;}

/* modals css start */
.mat-dialog-responsive h5.sub_heading {font-weight: 700;font-size: 1.8rem;}
.mat-dialog-responsive .modals_cancel_btn {position: absolute;right: 0px;top: -.3rem;color: #000;cursor: pointer;}
.mat-dialog-responsive .modals_card {padding: 0px !important;box-shadow: none !important;}
.mat-dialog-responsive .mat-dialog-container {padding: 2rem !important;border-radius: 2rem !important;overflow: hidden;}
.mat-dialog-responsive .modal-container {width: auto;position: relative;}
.mat-dialog-responsive .border_row {border-color: #27AE60;
    margin: 2rem 0;}


/* delete modals stert */
.mat-dialog-responsive .delete_modal {text-align: center;padding: 0 11rem;}
.mat-dialog-responsive .delete_modal p {line-height: 2.3rem;font-size: 1.6rem;margin: 3.2rem 0 5.8rem;}
.mat-dialog-responsive .display_inline {display: inline-block;margin: 0 1.5rem 0px 0;}
.mat-dialog-responsive .text-center {text-align: center;}
/*  input css */
.mat-dialog-responsive .mat-expansion-panel-body {padding: 0 7px 12px 0 !important;}
.mat-dialog-responsive .float_right {float: right;}
.mat-dialog-responsive .mat-button {min-width: 3.2rem !important;padding: 0 1.2rem !important;}
.mat-dialog-responsive .mat-expansion-panel-header {padding: 0 1rem !important;}
.mat-dialog-responsive .mat-content>mat-panel-title,
.mat-dialog-responsive .mat-content>mat-panel-title {
    font-size: 18px;
    font-weight: 600;
    margin-top: 15px;
    color: #27ae60;
    font-family: 'Open Sans', sans-serif !important;
}

.mat-dialog-responsive .mat-radio-button.mat-accent .mat-radio-inner-circle,
.mat-dialog-responsive .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple),
.mat-dialog-responsive .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-persistent-ripple,
.mat-dialog-responsive .mat-radio-button.mat-accent:active .mat-radio-persistent-ripple {
    background-color: #27AE60;
}

.mat-dialog-responsive .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {
    border-color: #27AE60;
}
.mat-dialog-responsive .mat-radio-outer-circle {
    border-width: 0.1rem !important;
    width: 12px;
    Height: 12px;
}
.mat-dialog-responsive .mat-radio-button .mat-ripple-element {
    background-color: #0000;
}
.mat-dialog-responsive .mat-grid-tile .mg_left_3 {
    margin: 0 -3px !important;
}

.mat-dialog-responsive .mat_card_zone .mat-grid-tile .mat-figure {
    display: block;
}

.mat-dialog-responsive .mr_rl_10 {
    margin: 0 10px;
}

.mat-dialog-responsive .minimize_icon {
    position: absolute;
    top: -5px;
    left: 3px;
}
.mat-dialog-responsive .mat-row,
.mat-dialog-responsive .mat-header-row {
    display: flex;
    border-bottom-width: .1rem;
    border-bottom-style: solid;
    /* align-items: center; */
    padding: 0px;
}

.mat-dialog-responsive .mat-cell,
.mat-dialog-responsive .mat-header-cell {
    flex: 1;
    overflow: hidden;
    word-wrap: break-word;
}

.mat-dialog-responsive .hdr_srch_field {
    padding-left: 0px;
    position: relative;
    margin: 5px 0px;
}

.mat-dialog-responsive .hdr_srch_field input {
    padding-left: 030px;
    border: 1px solid #ddd;
    width: 174px;
}

.mat-dialog-responsive .hdr_srch_field .search_icon {
    position: absolute;
    top: 7px;
    left: 5px;
    font-size: 20px;
    color: #6f6c6c;
}

.mat-dialog-responsive .add_btn {
    font-size: 12px;
    background: #27AE60;
    color: #fff;
    width: 30px;
    height: 30px;
    line-height: 29px !important;
    min-width: 30px !important;
    padding-left: 3px !important;
    border-radius: 30px !important;
    margin-left: 10px !important;
    box-shadow: 0px 6px 6px #0000003D;
}

.mat-dialog-responsive .mat-grid-tile .mat-figure {
    display: block !important;
}

.mat-dialog-responsive .mat_card_zone .mat-cell {
    font-size: .8vw;
    text-transform: uppercase;
    text-align: left;
}

.mat-dialog-responsive .mat_card_zone .mat-row {
    border: none;
    background: #F1F1F1;
    margin-top: 7px;
    min-height: 4vh;
}

.mat-dialog-responsive .mat-checkbox-checked.mat-accent .mat-checkbox-background,
.mat-dialog-responsive .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
    background-color: #27AE60 !important;
}

.mat-dialog-responsive .mat-checkbox-background {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    transition: #27AE60 90ms cubic-bezier(0, 0, .2, .1), opacity 90ms cubic-bezier(0, 0, .2, .1) !important;
}

.mat-dialog-responsive .bg_light_grey .icon_theme_color {
    font-size: 1vw;
}

.mat-dialog-responsive .active_btn,
.mat-dialog-responsive .deactive_btn {
    width: 9vw;
    height: 5vh;
    color: #fff;
    margin-bottom: 8px !important;
    font-size: 0.8vw !important;
    border-radius: 0px !important;
    text-transform: uppercase;
    font-weight: 400;
}

.mat-dialog-responsive .active_btn {
    background: #27AE60 !important;
    color: #fff !important;
}

.mat-dialog-responsive .mat-snack-bar-container {
    color: rgba(255, 255, 255, .7);
    background: #27AE60;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
}

.mat-dialog-responsive .snackbar {
    max-width: 90% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 1rem !important;
    padding: 10px !important;
    background-color: #0b8357;
    color: #f7f0cf;
}


.mat-dialog-responsive .mat-snack-bar-container {
    max-width: 100% !important;
}

.mat-dialog-responsive .deactive_btn {
    background: #F1F1F1;
    color: #27AE60;
    font-weight: 500 !important;
}

.mat-dialog-responsive .selected_list li {
    display: inline;
    font-size: 14px;
}

.mat-dialog-responsive .selected_list ul {
    list-style: none;
    margin: 0;
}

.mat-dialog-responsive .grid_title {
    font-size: .8vw;
    padding-left: 15px;
    margin: 10px 0;
}

.mat-dialog-responsive .card_white {
    width: 278px !important;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 6px #0000000A;
    opacity: 1;
    margin-top: 50px;
}

.mat-dialog-responsive .dashboard_icon {
    position: absolute;
    top: 5px;
    left: 5px;
}

.mat-dialog-responsive .location_icon {
    position: absolute;
    top: 40%;
    right: 15px;
}

.mat-dialog-responsive .card_white p {
    width: 72%;
    margin: 45px 35px;
}

.mat-dialog-responsive .dashboard_icon,
.mat-dialog-responsive .location_icon,
.mat-dialog-responsive .card_white p {
    color: #27AE60;
}

.mat-dialog-responsive .zone_title {
    font-size: 1vw;
    font-weight: 400;
    letter-spacing: 0;
    color: #1A1A1A;
    border-bottom: 2px solid #27AE60 !important;
    margin: 15px 0px 30px 0px;
}

.mat-dialog-responsive .mat-grid-tile.module_area .mat-figure {
    padding: 0px 0px !important;
}

.mat-dialog-responsive .mat_card_zone mat-label {
    font-size: 14px;
}

.mat-dialog-responsive .theme_btn {
    background: #27AE60;
    border: 1px solid #27AE60;
    color: #fff;
    margin: auto !important;
    margin-top: 30px;
    display: flex !important;
    text-transform: uppercase;
    font-size: 1.5rem;
}

.mat-dialog-responsive .round_btn {
    border-radius: 50px !important;
}

.mat-dialog-responsive .zone_mapping .mat-button {
    position: absolute;
    top: 0px;
    right: 0px;
    width: auto;
    height: auto;
    line-height: 20px;
    min-width: auto;
    padding: 5px;
}

.mat-dialog-responsive .zone_mapping .material-icons {
    font-size: 14px;
    color: #27AE60;
}

.mat-dialog-responsive .zone_mapping {
    position: relative;
}

.mat-dialog-responsive .input_padding input {
    padding: 0 0 2px 0 !important;
    height: 2.7rem !important;
}

.mat-dialog-responsive .mr_top_20 {
    margin-top: 40px;
}

.mat-dialog-responsive .mr-top-20 {
    margin-top: 20px;
}

.mat-dialog-responsive .bdr_top_none {
    border-top: 0px !important;
}

input {
    position: relative;
}

.mat-dialog-responsive .search_bar_mdm2d i {
    position: absolute;
    top: 8px;
    left: 17px;
    font-size: 1.5rem;
}

.mat-dialog-responsive .create_srch_bar i {
    left: 5px;
}

.mat-dialog-responsive .top-5 {
    top: 5px !important;
}

.mat-dialog-responsive .top-6 {
    top: 6px !important;
}

.mat-dialog-responsive .pdleft_0 {
    padding-left: 0px !important;
}

.mat-dialog-responsive .overline_hidden {
    overflow: hidden;
    height: 2.7rem;
}

.mat-dialog-responsive .mr-lr-20 {
    margin: 0 30px !important;
    ;
}

.mat-dialog-responsive .icon_danger {
    color: #B00020 !important;
}

.mat-dialog-responsive .btn_order_tab {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
}

.mat-dialog-responsive .displa_one_tab {
    display: inline-block;
    width: 25%;
    text-align: center;
}

.mat-dialog-responsive .text-active {
    color: #00af65;
    font-weight: 700;
}
.mat-dialog-responsive hr.bdr_theme_color {
    border: 2px solid #00af65 !important;
}

.mat-dialog-responsive mat-label {
    font-family: "Open Sans", sans-serif !important;
    margin-bottom: 2rem !important;
    font-size: 1.6rem;
    color: #1A1A1A;
}

.mat-dialog-responsive .mat-checkbox-inner-container-no-side-margin {
    margin-right: 1rem !important;
}


.mat-dialog-responsive .search_left {
    left: 17px !important;
}

.mat-dialog-responsive .float_right {
    float: right;
}

.mat-dialog-responsive .mr-bottom-10 {
    margin-bottom: 10px;
}

.mat-dialog-responsive .color_theme {
    color: #27AE60;
    cursor: pointer;
}

.mat-dialog-responsive .danger_btn {
    background-color: #B00020 !important;
}

.mat-dialog-responsive .mat-cell,
.mat-dialog-responsive .mat-footer-cell {
    font-size: 1.6rem !important;
    padding: 1rem !important;
    text-transform: uppercase !important;
    line-height: 1.4 !important;
    font-weight: 400 !important;
}

.mat-dialog-responsive .add_btn_ption {
    position: relative;
}

.mat-dialog-responsive .add_btn_ption button {
    position: absolute;
    top: 0px;
    right: 30%;
    background: #27AE60;
    color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 0px !important;
    margin-left: 5px;
    outline: 0;
    box-shadow: 0px 6px 6px #0000003D;
}
.mat-dialog-responsive b,
.mat-dialog-responsive strong {
    font-weight: 700;
}
.mat-dialog-responsive .mat_card_zone .mat-row.table_main_header {
    background: #F1F1F1;
}

.mat-dialog-responsive .mat_table_input .mat-cell {
    padding: 2px;
}

.mat-dialog-responsive .mat_table_input input {
    padding: 8px;
}

.mat-dialog-responsive .mat_table_input .mat-row,
.mat-dialog-responsive .mat-header-row {
    border-color: #ddd;
}

.mat-dialog-responsive .table_color {
    color: #27AE60;
    cursor: pointer;
}

.mat-dialog-responsive .mat_table_main .mat-button {
    line-height: 25px;
}

.mat-dialog-responsive .table_main_header .mat-cell {
    font-size: .8vw;
    text-transform: uppercase;
}

.mat-dialog-responsive .branch_table_head {
    background: #eee !important;
    min-height: 35px;
}

.mat-dialog-responsive .mat-table .mat-radio-button,
.mat-dialog-responsive .mat-table .form-control,
.mat-dialog-responsive .mat-table .date_picker_adjust .mat-input-element {
    margin-bottom: 0px !important;
}

.mat-dialog-responsive .branch_table_dis {
    background: #eeeeee6e;
    min-height: 30px;
}

.mat-dialog-responsive .branch_table_dis .mat-button {
    line-height: 16px !important;
}

.mat-dialog-responsive .branch_table_dis .material-icons {
    font-size: 20px;
    color: #27AE60;
}

.mat-dialog-responsive .add_branch_main .table_input input {
    padding: 4px 5px;
}
.mat-dialog-responsive td.mat-cell {
    border-bottom-color: transparent !important;
}

.mat-dialog-responsive .preview_table_1 .mat-cell {
    padding: 2rem 1.6rem !important;
    font-size: 1.5rem !important;
    word-break: break-word !important;
    font-weight: 600;
    margin: 0px;
    width: 50%;
    text-transform: inherit;
    min-height: 44px;
}

.mat-dialog-responsive .preview_table_bg_1 {
    background: #27ae60 0% 0% no-repeat padding-box;
    font-weight: 600 !important;
}

.mat-dialog-responsive .preview_table_bg_2 {
    background: #6A686879 0% 0% no-repeat padding-box;
}

.mat-dialog-responsive .preview_sec_4 img {
    font-size: 20px;
    width: 45px;
}

.mat-dialog-responsive .preview_table_2 .pab_table_head {
    background: #27ae60 0% 0% no-repeat padding-box;
    color: #000;
    font-weight: 600 !important;
}
.mat-dialog-responsive .preview_table_2.dynmc_tbl .pab_table_head {
    min-height: 60px !important;
}
.mat-dialog-responsive .preview_sec_2 {
    background-color: #27AE60;
    padding: 0 15px;
}
.mat-dialog-responsive .float_right{
    float:right;
}
.mat-dialog-responsive .preview_table_2 .pab_table_dis1 {
    background: #6A686879 0% 0% no-repeat padding-box;
}
.mat-dialog-responsive .preview_table_2.dynmc_tbl .pab_table_dis1 {
    min-height: 60px !important;
}

.mat-dialog-responsive .preview_table_2 .pab_table_dis2 {
    background: #27AE60 0% 0% no-repeat padding-box;
    font-weight: 600 !important;
}

.mat-dialog-responsive .preview_table_2 .mat-cell {
    padding: 2rem 1.6rem !important;
    font-size: 1.5rem !important;
    word-break: break-word !important;
    font-weight: 600;
    margin: 0px;
    /* width: 50%; */
    margin-right: 2px;
    min-height: 44px;
}

.mat-dialog-responsive .preview_popup .container,
.mat-dialog-responsive .preview_sec .container {
    width: 100%;
}
.mat-dialog-responsive .preview_popup,
.mat-dialog-responsive .preview_sec {
    overflow-y: scroll;
    max-height: 85vh;
    overflow-x: hidden;
    padding-bottom: 2rem;
}
.mat-dialog-responsive .preview_sec_2 .h3 {
    margin-bottom: 10px;
}
.mat-dialog-responsive .preview_email_icon {
    width: 20px;
    margin-right: 1rem;
}

.mat-dialog-responsive .float_table {
    width: 100%;
    display: table;
}

.mat-dialog-responsive .input_table_width {
    width: 95%;
    padding-top: 5px;
}

.mat-dialog-responsive .mat-table {
    display: block;
}

.mat-dialog-responsive .mat-table {
    min-height: .01%;
    overflow-x: auto;
}

.mat-dialog-responsive .all_branch_right .mat-table {
    padding-top: 15px;
}

.mat-dialog-responsive .manage_route_table {
    border-radius: 15px;
    border: 1px solid #ddd;
    padding: 10px 0px 15px;
}

.mat-dialog-responsive .manage_route_table .mat-table {
    padding: 5px 0px;
}


/* 11/May/2020 end */

.mat-dialog-responsive .mat-table {
    font-family: "Open Sans", sans-serif !important;
}

.mat-dialog-responsive td.mat-cell,
.mat-dialog-responsive td.mat-footer-cell,
.mat-dialog-responsive th.mat-header-cell {
    font-size: 1.6rem !important;
    padding: 1rem !important;
}

.mat-dialog-responsive th.mat-header-cell {
    text-transform: uppercase !important;
    line-height: 1.4 !important;
}

.mat-dialog-responsive td.mat-cell:first-of-type,
.mat-dialog-responsive td.mat-footer-cell:first-of-type,
.mat-dialog-responsive th.mat-header-cell:first-of-type,
.mat-dialog-responsive td.mat-cell:last-of-type,
.mat-dialog-responsive td.mat-footer-cell:last-of-type,
.mat-dialog-responsive th.mat-header-cell:last-of-type {
    padding-left: 2.4rem !important;
}

.mat-dialog-responsive tr.mat-footer-row,
.mat-dialog-responsive tr.mat-header-row,
.mat-dialog-responsive tr.mat-row {
    height: 4.4rem !important;
}
.mat-dialog-responsive tr.mat-header-row {
    background: #eee;
}
.mat-dialog-responsive .theme-button {
    color: #fff !important;
    cursor: pointer !important;
    font-size: 1.6rem !important;
    background-color: #27AE60 !important;
    border: 0.2rem solid #27AE60 !important;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
    font-family: "Open Sans", sans-serif !important;
    border-radius: 2rem !important;
    padding: -0.9rem 2rem !important;
    line-height: 1.8 !important;
}

.mat-dialog-responsive .theme-button:hover,
.mat-dialog-responsive .theme-button:focus,
.mat-dialog-responsive .theme-button:visited {
    background-color: #81C784 !important;
    border-color: #81C784 !important;
}

.mat-dialog-responsive .white-button {
    color: #1A1A1A !important;
    cursor: pointer !important;
    font-size: 1.6rem !important;
    background-color: #fff !important;
    border: 0.2rem solid #27AE60 !important;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
    margin: 0 1rem;
    font-family: "Open Sans", sans-serif !important;
    border-radius: 2rem !important;
    padding: 0 2rem !important;
    line-height: 1.8 !important;
}

.mat-dialog-responsive .white-button:hover,
.mat-dialog-responsive .white-button:focus,
.mat-dialog-responsive .white-button:visited {
    border-color: #1A1A1A !important;
}

.mat-dialog-responsive .mapping_dropdown .select_box_dropwodn {
    height: 23px;
}

.mat-dialog-responsive .select_rate_group {
    margin-top: 10px;
}

.dropdown {
    cursor: auto;
}


.mat-dialog-responsive .mat-select {
    height: 10px;
    font-size: 1.5rem;
}

.mat-dialog-responsive .mat-form-field .mat-placeholder-required.mat-form-field-required-marker {
    display: none;
}
.mat-dialog-responsive .select_rate_group select,
.mat-dialog-responsive .select_rate_group select:focus {
    width: 100%;
    border: none;
    border-bottom: 2px solid #F1F1F1;
    font-size: 22px;
    padding: 0px;
    padding-bottom: 2px;
    outline: none;
    box-shadow: none;
}

.mat-dialog-responsive .mat-select-panel .mat-option:hover {
    background: #27AE60 !important;
    color: #fff;
}

.mat-dialog-responsive .mat-select-panel:not([class*=mat-elevation-z]) {
    border: 2px solid #27AE60;
    box-shadow: none;
}

.mat-dialog-responsive .hyperlink {
    cursor: pointer;
}

.mat-dialog-responsive .mat-primary .mat-option.mat-selected:hover {
    color: #fff !important;
}

.mat-dialog-responsive .all_branch_select .mat-select {
    border: 0.1rem solid #686868;
    font-size: 12px;
    padding: 2px 0px;
}

.mat-dialog-responsive .all_branch_select {
    margin-top: -3px;
}

.mat-dialog-responsive .mat_select {
    box-shadow: 0px 2px 6px #00000029;
    border: 0.1rem solid #686868;
    padding: 5px 1px;
    border-radius: 3px;
    width: 98% !important;
    margin-bottom: 15px;
}

.mat-dialog-responsive .mat_select:hover,
.mat-dialog-responsive .mat_select:focus {
    border: 1px solid #27AE60;
}

.mat-dialog-responsive .hdr_srch_field .mat-form-field-infix {
    width: 100%;
}

.mat-dialog-responsive .mat_form_field {
    width: 150px !important;
}

.mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline-thick {
    opacity: 1;
}

.mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-infix {
    padding: 0px !important;
    border-radius: 0px !important;
    outline: 0;
}

.mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline {
    color: transparent !important;
}

.mat-dialog-responsive .mat-expansion-indicator::after {
    border-style: solid !important;
    border-width: 0px !important;
    content: '';
    display: inline-block !important;
    padding: 0px !important;
    transform: none !important;
    vertical-align: middle;
    border-left: 7px solid transparent !important;
    border-right: 7px solid transparent !important;
    border-top: 13px solid !important;
    color: rgb(129, 199, 132);
}

.mat-dialog-responsive .mat-form-field-type-mat-native-select .mat-form-field-infix::after {
    border-left: 7px solid transparent !important;
    border-right: 7px solid transparent !important;
    border-top: 13px solid !important;
    top: 40% !important;
    right: 6px !important;
}

.mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline-thick {
    color: transparent;
}

.mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline {
    display: none;
}

.mat-dialog-responsive .mat-form-field-infix {
    border-top: 0px;
}

.mat-dialog-responsive .mat-form-field-infix {
    width: auto !important;
}

.mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline-end, .mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline-start{
    border: .1rem solid currentColor !important;}
    .mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline-start{display: none !important;}
    
    

    .mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-suffix {
        top: -2px !important;
    }
    
    .mat-dialog-responsive .mat-form-field {
        width: 100%;
    }
    
    
    .mat-dialog-responsive .mat-form-field-type-mat-select .mat-form-field-label {
        margin: -7px 0px !important;
        color: #948787;
        font-size: 1.2em !important;
    }
    
    .mat-dialog-responsive .select_down_dropdown .mat-form-field-flex {
        border: 0.1rem solid #686868;
        height: 2.7rem;
        border-radius: 3px;
        box-shadow: 0px 2px 6px #00000029;
    }
    
    .mat-dialog-responsive .select_down_dropdown select {
        padding: 0 !important;
        height: 17px !important;
        text-transform: uppercase;
        font-size: .9vw;
    }
    
    .mat-dialog-responsive .all_form {
        padding: 0 20px;
    }
    
    .mat-dialog-responsive .mat-select {
        text-transform: uppercase !important;
    }
    
    .mat-dialog-responsive .select_down_dropdown .mat-form-field-label {
        margin: 0 5px !important;
    }
    
    .mat-dialog-responsive .mat_card_zone form {
        margin-top: -5px;
    }
    
    .mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-flex {
        padding: 0 !important;
        margin-top: -4px !important;
    }
    
    .mat-dialog-responsive .select_box_dropwodn .mat-form-field-flex {
        position: absolute;
    }
    
    .mat-dialog-responsive .all_form select {
        width: 100%;
        height: 34px;
        background: #fff;
    }
    
    .mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline-start {
        border-radius: 3px 0 0 3px !important;
    }
    
    .mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline-end {
        border-radius: 0 3px 3px 0 !important;
    }
    
    .mat-dialog-responsive .select_box_dropwodn .mat-form-field-flex {
        box-shadow: 0px 2px 6px #00000029;
        border: .1px solid #6a6868;
        height: 2.7rem;
    }
    
    .mat-dialog-responsive .mat-select-arrow {
        border-left: 5px solid transparent !important;
        border-right: 5px solid transparent !important;
        border-top: 9px solid !important;
        right: 8px !important;
        margin-top: -1.5px !important;
    }
    
    .mat-dialog-responsive .mat-form-field-appearance-legacy .mat-form-field-infix {
        padding: 5px;
    }
    
    
    .mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline {
        top: 0 !important;
    }
    
    .mat-dialog-responsive .mat-form-field-label {
        top: 20px !important;
        left: 12px !important;
        font-size: 20px !important;
    }
    
    .mat-dialog-responsive .mapping_dropdown .mat-form-field-type-mat-select .mat-form-field-label {
        color: #333 !important;
    }
    
    .mat-dialog-responsive .mapping_dropdown .select_box_dropwodn .mat-form-field-flex {
        box-shadow: 0px 2px 6px #00000029 !important;
        border-radius: 3px !important;
        border: 0.1rem solid #6a6868 !important;
        margin: 0px 0 !important;
        padding: -1px !important;
        background: #fff !important;
        height: 2.7rem !important;
    }
    
    .mat-dialog-responsive .branch_date_piker .mat-form-field-flex {
        height: 2.7rem;
        width: 75%;
        top: 4px !important;
    }
    
    .mat-dialog-responsive .last_update .mat-form-field-wrapper {
        padding-bottom: 0px !important;
    }
    
    .mat-dialog-responsive .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {
        color: #27AE60;
    }
    
    .mat-dialog-responsive .select_avtive .mat-form-field-flex {
        background: #27AE60;
    }
    
    .mat-dialog-responsive .select_avtive .mat-form-field-label {
        color: #fff !important;
    }
    
    .mat-dialog-responsive .table_input .mat-form-field-appearance-outline .mat-form-field-flex {
        width: 75%;
        margin: 0px !important;
    }
    
    .mat-dialog-responsive .table_input .mat-form-field-wrapper {
        padding-bottom: 0px !important;
    }
    
    .mat-dialog-responsive .control-label {
        font-family: "Open Sans", sans-serif !important;
        font-size: 1.6rem !important;
        margin-bottom: 2rem !important;
    }
    
    /* DATEPICKER CSS */
    
    
    /* 12/May/2020 start */
    
    .mat-dialog-responsive .top_10 .date_picker_adjust .mat-input-element {
        top: 3px 0 !important;
    }
    
    .mat-dialog-responsive .date_choose_picker {
        font-size: 17px !important;
        color: #c5c2c2 !important;
        font-weight: 300 !important;
    }
    
    .mat-dialog-responsive .date_picker_adjust .mat-input-element {
        border-radius: 0 !important;
        border: 0.1rem solid #6a6868 !important;
        padding: 0.2rem 1rem 0.2rem 1rem !important;
        font-size: 1.4rem !important;
        height: 2.7rem !important;
        margin-bottom: 0.4rem !important;
        box-shadow: 0 0.2rem 0.2rem #00000029 !important;
    }
    
    .mat-dialog-responsive .date_picker_adjust .mat-form-field-flex {
        height: 2.7rem;
    }
    
    
    /* 12/May/2020 end */
    
    .mat-dialog-responsive .mat-radio-button {
        margin-right: 2rem !important;
        margin-bottom: 3.4rem !important;
    }
    
    .mat-dialog-responsive .module_area .mat-radio-button {
        margin-bottom: 0rem !important;
    }
    
    .mat-dialog-responsive .mat_radio_btn_mb_0 .mat-radio-button {
        margin-bottom: 0px !important;
    }
    
    .mat-dialog-responsive .mat-radio-label-content {
        font-size: 1.6rem !important;
        font-weight: 500;
        font-family: "Open Sans", sans-serif !important;
    }
    
    .mat-dialog-responsive .mat-radio-label {
        text-transform: capitalize !important;
    }
    
.selectBranchDialog .mat-dialog-container {
    padding: 5px 5px 10px 5px !important;
    overflow-x: hidden;
}
    .mat-dialog-responsive #datepickerwidth {
        width: 100% !important;
    }
    
    .mat-dialog-responsive .ass_date_icon .mat-datepicker-toggle-default-icon {
        position: absolute;
        top: 0.8rem;
        right: 1.2rem;
        font-size: 1.6rem !important;
    }
    
    .mat-dialog-responsive .mat-datepicker-toggle-default-icon {
        position: absolute;
        top: 0.2rem;
        right: 0;
        font-size: 1.6rem !important;
    }
    
    .mat-dialog-responsive .mat-calendar-body-selected {
        background-color: #27AE60 !important;
    }
    
    .mat-dialog-responsive .mat-calendar-body-today:not(.mat-calendar-body-selected) {
        border-color: #27AE60 !important;
    }
    
    .mat-dialog-responsive .mat-datepicker-toggle-active {
        color: #27AE60 !important;
    }
    
    .mat-dialog-responsive .mat-datepicker-content .mat-calendar {
        width: 29.6rem !important;
        height: 35.4rem !important;
    }
    
    .mat-dialog-responsive .mat-datepicker-toggle .mat-icon-button {
        top: -2.2rem !important;
        border-radius: 0 !important;
    }
    
    .mat-dialog-responsive .mat-calendar-body-selected {
        background-color: #27AE60 !important;
    }
    
    .mat-dialog-responsive td.mat-calendar-body-cell {
        font-size: 1.5rem;
        line-height: 2rem;
        padding: 1.8rem 0 !important;
    }
    
    .mat-dialog-responsive .mat-calendar-controls .mat-icon-button {
        width: 5.5rem !important;
        height: 5.5rem !important;
    }
    
    
    .mat-dialog-responsive .mat-form-field-infix {
        padding: 6px 0px !important;
        border-top: 0 !important;
    }
    
    .mat-dialog-responsive .mat-form-field {
        width: 100% !important;
    }
    
    .mat-dialog-responsive .mat-form-field-prefix,
    .mat-dialog-responsive .mat-form-field-suffix {
        margin-left: -20px !important;
    }
    
    .mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-prefix {
        position: absolute;
        top: 15px !important;
        right: 0px;
        z-index: 99;
    }

    

    .mat-dialog-responsive .m_add_new_contract .add_icon,
    .mat-dialog-responsive .title_search_add .add_icon,
    .mat-dialog-responsive .label_and_add .add_icon,
    .mat-dialog-responsive .add_create_designation .add_icon {
        cursor: pointer;
        background: #27ae60;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        width: 24px;
        height: 24px;
        line-height: 24px;
        font-size: 20px;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }
    
    .m_add_new_contract .add_icon:focus,.mat-dialog-responsive 
    .mat-dialog-responsive .m_add_new_contract .add_icon:hover,
    .mat-dialog-responsive .title_search_add .add_icon:focus,
    .mat-dialog-responsive .title_search_add .add_icon:hover,
    .mat-dialog-responsive .label_and_add .add_icon:focus,
    .mat-dialog-responsive .label_and_add .add_icon:hover,
    .mat-dialog-responsive .add_create_designation .add_icon:focus,
    .mat-dialog-responsive .add_create_designation .add_icon:hover {
        outline: 0;
        background-color: #81C784;
    }
    
    .mat-dialog-responsive .mat-row {
        background: #fff;
        border-bottom: 1px solid #eee !important;
    }
    
    .mat-dialog-responsive .title_search_add {
        display: flex;
    }
    
    .mat-dialog-responsive .mdm_searchbar {
        position: relative;
        margin-left: 8px;
    }
    
    .mat-dialog-responsive .mdm_searchbar i {
        position: absolute;
        top: 1rem;
        left: 1rem;
        font-size: 1.6rem;
    }
    
    .mat-dialog-responsive .mdm_searchbar em {
        position: absolute;
        top: 1rem;
        cursor: pointer;
        left: 1rem;
        font-size: 1.6rem;
    }
    
    .mat-dialog-responsive .mdm_searchbar .form-control {
        padding-left: 2.6rem !important;
        height: 2.7rem !important;
    }
    
    .mat-dialog-responsive .search_branch_tbl {
        max-height: 20rem;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-bottom: 2rem;
    }
    
    .mat-dialog-responsive .search_branch_tbl div {
        font-size: 1.6rem !important;
    }
    
    .mat-dialog-responsive .title_search_add .add_icon {
        margin: -3px 0px 0px 15px;
    }
    
    .mat-dialog-responsive .label_and_add {
        display: flex;
    }
    
    .mat-dialog-responsive .label_and_add .add_icon {
        margin: 5px 0px 0px 15px;
    }
    
    .mat-dialog-responsive .label_and_add mat-label {
        margin-top: 9px;
    }
    
    .mat-dialog-responsive .box_shadow_none,
    .mat-dialog-responsive .box_shadow_none:hover {
        box-shadow: none !important;
    }
    .mat-dialog-responsive .mat-select {
        font-family: 'Open Sans', sans-serif !important;
        position: absolute;
        top: 0;
    }
    
    .mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline-start {
        border-radius: 3px 0 0 3px !important;
    }
    
    .mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline-end {
        border-radius: 0 3px 3px 0 !important;
    }
    
    .mat-dialog-responsive .mat-select-arrow {
        border-left: 4px solid transparent !important;
        border-right: 4px solid transparent !important;
        border-top: 9px solid !important;
        right: 8px !important;
        margin-top: 0px !important;
    }
    
    .mat-dialog-responsive .mat-form-field-appearance-legacy .mat-form-field-infix {
        padding: 4px;
        height: 2.7rem;
    }
    
    .mat-dialog-responsive .mat-form-field-appearance-legacy .mat-form-field-wrapper {
        padding-bottom: 0.25em;
    }
    .mat-dialog-responsive .mat-form-field-wrapper {
        padding-bottom: 0rem !important;
    }
    .mat-dialog-responsive .mat-input-element {
        caret-color: #27ae60;
        padding: 0px 4px !important;
    }

    .mat-dialog-responsive .mat-select-panel .mat-option {
        background: #fff !important;
        font-size: 1.4rem !important;
        text-transform: uppercase;
        height: 2.7rem !important;
        font-family: 'Open Sans', sans-serif !important;
    }
    
    .mat-dialog-responsive .mat-select-trigger {
        height: 2.7rem !important;
    }
    
    .mat-dialog-responsive .mat-select-panel .mat-option:hover {
        background: #27AE60 !important;
        color: #fff;
    }
    
    .mat-dialog-responsive .mat-select-panel:not([class*=mat-elevation-z]) {
        border: 2px solid #27AE60;
        box-shadow: none;
    }
    
    .mat-dialog-responsive .mat-select-value-text {
        position: relative;
        top: 2px;
        font-size: 1.4rem !important;
        margin: 0 4px !important;
    }
    
    .mat-dialog-responsive .mat-select {
        position: absolute;
        top: 0;
    }
    
    .mat-dialog-responsive .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {
        background-color: #27AE60 !important;
        color: #fff !important;
    }
    
    .mat-dialog-responsive .mat-select-panel {
        box-shadow: none !important;
        position: absolute !important;
        font-family: "Open Sans", sans-serif !important;
        top: 3.8rem !important;
        left: 2rem !important;
        border: .1rem solid #ccc !important;
        max-height: 30rem !important;
        overflow-y: scroll !important;
        max-width: calc(100% + 2px) !important;
        min-width: calc(100% + 2px) !important;
        width: calc(100% + 2px) !important;
    }

    .mat-dialog-responsive .primary-color {
        color: #27AE60 !important;
    }
    
    .mat-dialog-responsive .mat-pseudo-checkbox.mat-pseudo-checkbox-checked,
    .mat-dialog-responsive .mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate {
        border-color: #757575 !important;
    }
    
    .mat-dialog-responsive .mat-primary .mat-pseudo-checkbox-checked,
    .mat-dialog-responsive .mat-primary .mat-pseudo-checkbox-indeterminate {
        background: #53af61 !important;
    }
    
    .mat-dialog-responsive .cdk-overlay-pane {
        transform: translateX(-16px);
    }
    
    
    /*------ multiselect css end --------- */
    
    
    /* Pradeep Css */
    
    .mat-dialog-responsive .zonalheadingbar {
        font-size: 1.6rem !important;
        width: 25%;
    }

    
    .mat-dialog-responsive .displayflex {
        display: flex;
        align-items: center;
    }
    
    .mat-dialog-responsive .bar {
        width: 20%;
    }
    
    .mat-dialog-responsive .paddingzero {
        padding: 0;
    }
    
    .mat-dialog-responsive .margin-row {
        margin: 0;
        padding: 0;
    }
    
    .mat-dialog-responsive .margin-row {
        padding-left: 0;
        padding-right: 0;
        margin-right: 0;
        margin-left: 0;
    }
    
    .mat-dialog-responsive .searchby {position: relative;font-weight: bold;font-size: 1.6rem !important;margin-top: 5px !important;
        margin-bottom: 0 !important;}
    .mat-dialog-responsive .mat-cell, .mat-dialog-responsive .mat-header-cell {flex: 1 !important;overflow: hidden;word-wrap: break-word;}
    .mat-dialog-responsive tr.mat-footer-row, tr.mat-row{height: 4.2rem !important;}
    .mat-dialog-responsive td.mat-cell:first-of-type, .mat-dialog-responsive td.mat-footer-cell:first-of-type, .mat-dialog-responsive th.mat-header-cell:first-of-type{padding-left: 2.4rem !important;}
    .mat-dialog-responsive td.mat-cell, td.mat-footer-cell, th.mat-header-cell {border-bottom-width: .1rem !important;}
    .mat-dialog-responsive mat-header-cell:first-of-type{padding-left: 1.2rem !important;}
    .mat-dialog-responsive mat-header-cell:last-of-type{padding-right: 0 !important;}
    .mat-dialog-responsive mat-cell:first-of-type, .mat-dialog-responsive mat-footer-cell:first-of-type, mat-header-cell:first-of-type {
     padding-left: 1.2rem !important;}
     .mat-dialog-responsive mat-cell:last-of-type, .mat-dialog-responsive mat-footer-cell:last-of-type, .mat-dialog-responsive mat-header-cell:last-of-type {
     padding-right: 0 !important;}
     .mat-dialog-responsive .mat-header-cell{font-size: 1.6rem; font-weight: 600; background: #F1F1F1;}
     .mat-dialog-responsive .mat-table{font-family: 'Open Sans', sans-serif !important; margin-bottom: 1rem;}
     .mat-dialog-responsive mat-header-row{min-height: 4.5rem !important;}
     .mat-dialog-responsive .example-container {overflow: auto;box-shadow: none;}
     .mat-dialog-responsive mat-footer-row, .mat-dialog-responsive mat-row {min-height: 4.5rem !important;}
    .mat-dialog-responsive .mat-cell, .mat-dialog-responsive .mat-footer-cell {font-size: 1.6rem !important; word-break: break-all !important;}
    .mat-dialog-responsive .wordBreakall{word-break: break-all !important;}
   .mat-dialog-responsive .overflow::-webkit-scrollbar {width: .7rem;  max-height: 1.0rem;}
   .mat-dialog-responsive .overflow::-webkit-scrollbar-track {display: none;border-radius: 1.0rem;}
   .mat-dialog-responsive .overflow::-webkit-scrollbar-thumb {background: #6A6868 !important;border-radius: 1.0rem;  max-height: 1.0rem;}
   .mat-dialog-responsive .overflow::-webkit-scrollbar-thumb:hover {background: #585757 !important;}
   /* end of mat table */
   
   table {width: 100%;}
   .mat-dialog-responsive .dashboardTable .mat-sort-header-arrow, [dir=rtl] .mat-sort-header-position-before .mat-sort-header-arrow {margin: 0px 10px 0 1px !important;}
   .mat-dialog-responsive table.mat-table {
    box-shadow: none !important;
    overflow-y: auto;
    max-height: 200px;
    min-height: 70px;
}
   .mat-dialog-responsive tr.mat-footer-row {font-weight: bold;}
   .mat-dialog-responsive .mat-table-sticky {border-top: .1rem solid #e0e0e0;}
   
   .mat-dialog-responsive .mat-sort-header-button{text-align: left !important;}
   
   .mat-dialog-responsive .mat-card { font-family: 'Open Sans', sans-serif !important;box-shadow: none !important;}
   /* search Icon */
   .mat-dialog-responsive #defualtBranchSearch{position: absolute;top: .7rem;   z-index: 1234; left: 2rem;font-size: 1.8rem; color: #999; cursor: pointer;}
   .mat-dialog-responsive #defualtBranchSearch9{position: absolute; right: 2rem;z-index: 1234; font-size: 1.7rem; top: 1rem; z-index: 10; color: #BCBCCB;}
   .mat-dialog-responsive #defualtBranchSearch2{position: absolute;left: 2.0rem;z-index: 1234; font-size: 1.7rem; top: .6rem; z-index: 10; color: #ccc;}
   .mat-dialog-responsive #defualtBranchSearch1{position: absolute; right: 1rem;z-index: 1234; font-size: 1.7rem; top: .5rem; z-index: 10; color: #BCBCCB;}
   .mat-dialog-responsive #defualtBranchSearch5{position: absolute;left: 2.0rem;z-index: 1234; font-size: 1.7rem; z-index: 10; color: #ccc;}
   .mat-dialog-responsive #defualtBranchSearchbase{position: absolute;top: .7em;z-index: 1234; left: 2rem;font-size: 1.8rem; color: #ccc; cursor: pointer;}
   /* End of Search Icon */
   
   /* Form Control */
   .mat-dialog-responsive .form-control{height: 2.7rem !important; font-size: 1.4rem !important;}
   .mat-dialog-responsive .form-control {border-radius: 0 !important; border: .1rem solid #6a6868 !important; box-shadow: 0rem .2rem .6rem #00000029 !important;height: 2.7rem !important;}
   .mat-dialog-responsive .form-control-textarea {padding-left: .6rem !important; border-radius: 0 !important; border: .1rem solid #6a6868 !important; box-shadow: 0rem .2rem .6rem #00000029 !important; }
   .mat-dialog-responsive input{text-transform: uppercase !important;}
   .mat-dialog-responsive textarea{text-transform: uppercase !important;}
   .mat-dialog-responsive .form-control:focus {outline: none !important; border-color: #27AE60 !important; box-shadow: 0 0 0 0 !important;}
   .mat-dialog-responsive .form-control:hover{outline: none !important; border-color: #27AE60 !important; box-shadow: 0 0 0 0 !important;}
   .mat-dialog-responsive textarea:focus {outline: none !important; border-color: #27AE60 !important; box-shadow: 0 0 0 0 !important;}
   .mat-dialog-responsive textarea:hover{outline: none !important; border-color: #27AE60 !important; box-shadow: 0 0 0 0 !important;}
   .mat-dialog-responsive .form-control-textarea:focus{border-color: #27AE60 !important;  box-shadow: none !important; -webkit-box-shadow: none !important;}
   .mat-dialog-responsive mat-panel-title{font-weight: bold !important;}
   
   .mat-dialog-responsive .content{margin-top: 1rem !important; margin-bottom: 1rem !important;}
   .mat-dialog-responsive .marginTopOne{margin-top: 1rem !important;}
   .mat-dialog-responsive .marginBottomOne{margin-bottom: 1rem !important;}
   
   /* Mat-table */
   
   /** CSS FOR Paginator Starts HERE **/  
   .mat-dialog-responsive .paginator .mat-form-field{width: 6rem !important;}
   .mat-dialog-responsive .paginator .mat-form-field-appearance-legacy .mat-form-field-underline{height: .1rem !important;width: 6rem !important;}
   .mat-dialog-responsive .paginator .mat-select-value{width: 60% !important;}
   .mat-dialog-responsive .paginator .mat-primary .mat-option.mat-selected:not(.mat-option-disabled){color: #fff !important;}
   .mat-dialog-responsive .paginator .mat-option.mat-selected:not(.mat-option-multiple){background: #27AE60 !important;}
   .mat-dialog-responsive .paginator .cdk-overlay-pane{top: 2rem !important;} 
   .mat-dialog-responsive .mat-paginator-page-size-label {margin: 0 0 !important;position: relative !important;bottom: 1rem !important;right: 1rem !important;}
   .mat-dialog-responsive .mat-icon-button {width: 4rem !important;height: 4rem !important;line-height: 1.8 !important;border-radius: 0 !important; right: 0px !important;}
   .mat-dialog-responsive .mat-paginator-page-size-label{margin: 0 0 !important;position: relative !important;bottom: 1rem !important;right: 1rem !important;}
   .mat-dialog-responsive .mat-paginator-icon {width: 2.8rem !important;}
   
   .mat-dialog-responsive .mat-form-field-appearance-legacy .mat-form-field-wrapper {padding-bottom: 0px !important;}
   .mat-dialog-responsive .mat-paginator, .mat-paginator-page-size .mat-select-trigger{position: relative !important; top: .7rem !important;}
   /* End of Sarvjyot Css */
   
   /* END DASHBOARD */
   
.mat-dialog-responsive .create_new_tale_mdm2 td.mat-cell,
.mat-dialog-responsive .create_new_tale_mdm2 td.mat-footer-cell,
.mat-dialog-responsive .create_new_tale_mdm2 th.mat-header-cell {
    border-bottom-width: 0px;
    color: rgba(0, 0, 0, .87) !important;
    border-bottom: none;
    background: transparent;
    width: 205px;
}

.mat-dialog-responsive .create_new_tale_mdm3 th.mat-header-cell {
    border-bottom-width: 0px;
    color: rgba(0, 0, 0, .87) !important;
    border-bottom: none;
    background: transparent;
    width: 123px;
}

.mat-dialog-responsive .create_new_tale_mdm2.view_cont_tbl th.mat-header-cell{
    width: 310px;
}
.mat-dialog-responsive .sub_heading {
    font-size: 2vw;
    font-weight: 400;
    margin: 0px;
}

.mat-dialog-responsive .bg_gray_msa_4 {
    background: #515457;
}

.mat-dialog-responsive .padding_0 {
    padding: 0px;
}

.mat-dialog-responsive .bg_gray_msa_4 p {
    color: #fff;
    margin: 0px;
    padding: 10px 15px;
}

.mat-dialog-responsive .bg_gray_msa_4 p {
    font-size: 12px;
    margin-bottom: 0px !important;
}

.mat-dialog-responsive .bac_update_modal {
    box-shadow: 0px 2px 6px #00000029;
    padding: 0px;
    border-radius: 4px;
    width: 100%;
    height: 96px;
    padding: 3rem 1.9rem;
    text-align: left;
    background-color: #27AE60;
}

.mat-dialog-responsive .mat-dialog-container {
    overflow-x: hidden !important;
}

.mat-dialog-responsive .bac_update_modal p {
    margin: 0px !important;
    line-height: 16px;
    color: #fff;
    cursor: pointer;
    font-size: 1.6rem;
}

.mat-dialog-responsive .mtb_15 {
    margin: 15px 0px;
}

.mat-dialog-responsive .pt_15 {
    padding-top: 15px;
}

.mat-dialog-responsive .pt_7 {
    padding-top: 7px;
}

.mat-dialog-responsive .pt_22 {
    padding-top: 22px;
}

.mat-dialog-responsive .mt_30 {
    margin-top: 30px;
}

.mat-dialog-responsive .pb_0 {
    padding-bottom: 0px;
}
.mat-dialog-responsive td.mat-cell, .mat-dialog-responsive td.mat-footer-cell, .mat-dialog-responsive th.mat-header-cell {border-bottom-width: 0rem !important;}
/************** MODAL CSS ****************/
.mat-dialog-responsive .mat-form-field-appearance-outline:hover{border-color: #27AE60;}
.mat-dialog-responsive .mat-form-field.mat-focused .mat-form-field-ripple {background: #27AE60 !important;}
.mat-dialog-responsive .mat-form-field-appearance-outline .mat-form-field-outline-thick {color: #27AE60 !important;}
.mat-dialog-responsive .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {color: #27AE60 !important;}
.mat-dialog-responsive .mat-focused .mat-form-field-label {color: green !important;}
.branchType{background: #27ae60 !important;}
.mat-dialog-responsive .branchType .mat-select-value-text {color: #fff !important;}
.mat-dialog-responsive .branchType .mat-select-arrow{color: #fff !important;}
.mat-dialog-responsive .branchType .mat-form-field.mat-focused.mat-primary .mat-select-arrow{color: #fff!important;}

/* checkbox */
.mat-dialog-responsive .mat-checkbox .mat-checkbox-frame {border-color: #6a6868; border-width: .2rem; width: 2rem !important;
height: 2rem !important; margin-top: .6rem !important;}
.mat-dialog-responsive .mat-checkbox-checked .mat-checkbox-background {background: #81C784 !important;}
.mat-dialog-responsive .mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
  background: #27AE60;width: 2rem !important;height: 2rem !important;margin-top: .6rem !important;}
  .mat-dialog-responsive .mat-checkbox-layout .mat-checkbox-label{padding-left: .6rem !important;}
/* checkbox */
.mat-dialog-responsive .width20{width: 25% !important;}
.mat-dialog-responsive .width25{width: 25rem !important;}

.mat-dialog-container .create_search_pin .form-control,
.mat-dialog-container .search_bar_mdm2d .form-control {
    padding: 0.2rem 1rem 0.2rem 3rem !important;
}
.mat-dialog-container .module_area {
    margin-bottom: 2rem;
}
.mat-dialog-container .errorMsg em{
    font-style: normal;
    color: red;
    font-size: 1.4rem;
    text-align: left;
}
.mat-dialog-container .redMark {
    color: red;
}
.mat-dialog-container .mat-raised-button[disabled] {
    opacity: 0.6;
    color: #F1F1F1;
    background: transparent;
    cursor: not-allowed !important;
}
.mat-dialog-container .mat-button[disabled] {
    opacity: 0.6;
    color: #F1F1F1;
    background: transparent;
    cursor: not-allowed !important;
}

/* Version Preview css issue start */

.mat-dialog-responsive td.mat-cell, .mat-dialog-responsive td.mat-footer-cell, .mat-dialog-responsive th.mat-header-cell {border-bottom-width: 0rem !important;}

/* Version Preview css issue end */

/************** MODAL CSS ****************/


.associateAirContainer span.brancSearchIcon{top: .9rem; left: .6rem !important;position: absolute;font-size: 1.8rem;opacity: .5;}


/* mat-expansion */
.associateAirContainer .mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow: none !important;}
.associateAirContainer .mat-expansion-panel-spacing {margin: 0 0;}
.associateAirContainer .mat-expansion-indicator{transform: rotate(0deg) !important;border-style: none; width: 0; height: 0; border-left: .7rem solid transparent;border-right: .7rem solid transparent; 
 border-top: 1.0rem solid #27AE60;}
.associateAirContainer .mat-expansion-indicator::after{border-style: none;  color: #fff;}
.associateAirContainer .mat-expansion-indicator.mat-expanded{transform: rotate(0deg) !important;}
.associateAirContainer .mat-expansion-panel-header.mat-expanded{color:#27AE60; border-bottom: .2rem solid #27AE60;border-radius: 0}
.associateAirContainer .mat-expansion-panel-header {  padding: 0 0!important;border-bottom: .1rem solid #f1f1f1;height: 5.0rem !important;
  font-size: 1.6rem; font-family: 'Open Sans', sans-serif !important}
.associateAirContainer .mat-expansion-panel-content{font-family: 'Open Sans', sans-serif !important}
.associateAirContainer .mat-content.mat-expanded {border-bottom: .2rem solid red !important; font-weight: bold;color: #27AE60;border-color: #27AE60;}
.associateAirContainer .mat-content { font-weight: bold; padding-top: 2.0rem;}
.associateAirContainer .mat-expansion-panel-body {padding: 0 0 0 !important; margin-top: 1rem !important;}
.associateAirContainer .mat-card { font-family: 'Open Sans', sans-serif !important;box-shadow: none !important;}
.associateAirContainer .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover { background: #fff; } 
/* mat-expansion */
/* mat-select */
.mat-select-panel.creditSelect {max-height: 29vh !important; overflow-y: auto !important;}
.mat-select-panel.creditSelect.state_dropdown:not([class*=mat-elevation-z]) { box-shadow: none !important;position: absolute !important;top: -31rem !important;left: -1rem !important;  border: .1rem solid #ccc !important;}
.creditSelect .mat-option:hover:not(.mat-option-disabled){background: #27AE60 !important; color: #fff !important}
.creditSelect .mat-option.mat-active{background: #27AE60 !important; color: #fff !important}
.mat-primary.creditSelect .mat-option:hover.mat-selected:not(.mat-option-disabled) {color: #fff !important; background: #27AE60 !important;}
.mat-select-panel.creditSelect:hover .mat-active{background: transparent !important;color: #1a1a1a !important;}
.associateAirContainer .mat-option.mat-active:hover{background: #27AE60 !important; color: #fff !important;}
.creditSelect .cdk-overlay-backdrop{background: transparent !important;}
.cdk-overlay-backdrop.creditSelect{background: transparent !important;}
.mat-primary.creditSelect .mat-option.mat-selected:not(.mat-option-disabled) {color: #1a1a1a !important;}
/* Mat form field */
.associateAirContainer .hasErrorMsgRight{    margin: 0 !important;position: relative;color: red;top: -1rem;font-size: 1.6rem !important}
.associateAirContainer .datePickHeight{height: 2.7rem !important;}
.associateAirContainer .fileUpload{position: relative;right: 1.3rem;font-weight: bold;font-size: 1.6rem;}
.associateAirContainer .file_name{  white-space: nowrap;overflow: hidden;text-overflow: ellipsis; width: 180% !important; text-transform: uppercase !important;}
.associateAirContainer .docUpload{font-weight: normal !important;}

/* Pradeep Add some class */

.mat-select-disabled {
    background-color: #b1adadc9;
}
.associateAirContainer .mat-raised-button[disabled] {
    opacity: 0.6;
    color: #F1F1F1;
    background: transparent;
    cursor: not-allowed !important;
}
.associateAirContainer .mat-button[disabled] {
    opacity: 0.6;
    color: #F1F1F1;
    background: transparent;
    cursor: not-allowed !important;
}

.mat-dialog-responsive .errorMsg {
    margin-top: -5px;
    color: red;
    font-size: 1.5rem;
}

.padding_10 .mat-form-field-appearance-outline .mat-form-field-suffix {
    top: -3px !important;
    left: 4px;

}
.fileUpload{position: relative;right: 1.3rem;font-weight: bold;font-size: 1.4rem; margin-left: 1.1rem;}
th.mat-calendar-table-header-divider {
    display: none;
}

.mat-dialog-responsive .create_new_tale_mdm2 {
    margin-top: 2rem;
}
.mat-dialog-responsive .mat-radio-inner-circle {
    height: 12px;
    width: 12px;
}
.mat-dialog-responsive .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {
    border-color: #27AE60;
    width: 12px;
    height: 12px;
}
.mat-dialog-responsive .mat-radio-button .mat-radio-container {
    width: 12px;
    height: 12px;
}
.search_bar_mdm2d.searchbar_mdm2 >i {
    margin-top: -.7rem;
}


@media print{
    .preview_table_1 .mat-cell{
        word-break : break-word !important;
    }
    .preview_table_2 .mat-cell{
        word-break : break-word !important;
    }
    .col-md-6, .col-md-5{
        float:left;
        width:49%;
    }
    .col-md-12{
        width:98% !important;
    }
    h3 {
        font-size: 2rem;
    }
   
    .preview_sec_1 {
        padding: 0px;
    }
.billingHr{border-color: #27AE60 !important;margin-top: 2.5rem !important;margin-bottom: 3rem !important;border-width: .4rem;}
    
    .preview_sec_1 h1 {
        font-weight: 600;
        margin: 0px;
    }
    
    .preview_sec_1 h2 {
        margin: 0px;
        text-align: right;
        text-transform: uppercase;
    }
    
    .preview_sec_2 {
        background: #27AE60 !important;
        -webkit-print-color-adjust: exact;
        padding: 10px 16px;
    }
    
    .preview_sec_2 h3 {
        color: #fff !important;
        -webkit-print-color-adjust: exact;
        font-weight: 600;
        font-size: 15px !important;
        padding: 10px 0px;
    }

    .preview_sec_2 .strong-text {
        color: #fff !important;
        -webkit-print-color-adjust: exact;
        font-weight: 600;
        font-size: 15px !important;
        padding: 10px 0px;
    }
    
    .text_right {
        text-align: right;
    }
    
    .preview_sec_3 {
        padding: 5px 0 !important;
        position: relative;
    }
    .preview_sec_3 h3{
        padding : 0px 16px 5px 50px !important;
    }
    .preview_sec_3:before {
        content: '';
        position: absolute;
        top: 21px;
        left: 0px;
        width: 50px;
        height: 26px;
        background: #6A6868 !important;
        -webkit-print-color-adjust: exact;
    }
    
    .preview_sec_3 h2 {
        font-size: 28px !important;
        font-weight: 600;
        padding-bottom: 15px;
        padding-left: 15px;
    }

    .preview_sec_3:before {
        content: '';
        position: absolute;
        top: 21px;
        left: 0px;
        width: 50px;
        height: 26px;
        background-color: #6A6868;
        -webkit-print-color-adjust: exact;
    }
    
    .preview_sec_3 h2 {
        font-size: 28px !important;
        font-weight: 600;
        padding-bottom: 15px;
        padding-left: 15px;
    }
    
    .preview_sec .mat-row {
        align-items: inherit;
        border: none !important;
    }
    
    .preview_sec {
        margin-bottom: 50px;
    }
    
    .payment_base_t {
        padding: 15px 0px 30px 0px;
    }
    
    .preview_sec_5:before {
        background: transparent;
    }
    
    
    /* preview page css end */
    
    .dsh_right_card img {
        width: 30px;
        margin-bottom: 4px;
    }
    
    .create_search_pin {
        position: relative;
    }
    
    .create_search_pin i {
        left: 1rem;
    }
    
    .mat_card_zone .mat-row.table_main_header {
        background: #F1F1F1 !important;
        -webkit-print-color-adjust: exact;
    }
    
    .mat_table_input .mat-cell {
        padding: 2px;
    }
    
    .mat_table_input input {
        padding: 8px;
    }
    
    .mat_table_input .mat-row,
    .mat-header-row {
        border-color: #ddd !important;
        -webkit-print-color-adjust: exact;
    }
    
    .table_color {
        color: #27AE60 !important;
        -webkit-print-color-adjust: exact;
        cursor: pointer;
    }
    
    .mat_table_main .mat-button {
        line-height: 25px;
    }
    
    .table_main_header .mat-cell {
        font-size: .8vw;
        text-transform: uppercase;
    }
    
    .branch_table_head {
        background: #eee !important;
        -webkit-print-color-adjust: exact;
        min-height: 35px;
    }
    
    .mat-table .mat-radio-button,
    .associateContainer .mat-table .form-control,
    .associateContainer .mat-table .date_picker_adjust .mat-input-element {
        margin-bottom: 0px !important;
    }
    
    // .mat-table.prvw_tbl {
    //     border-collapse: separate !important;
    //     border-spacing: 1px !important;
    // }
    .branch_table_dis {
        background: #eeeeee6e;
        -webkit-print-color-adjust: exact;
        min-height: 30px;
    }
    
    .branch_table_dis .mat-button {
        line-height: 16px !important;
    }
    
    .branch_table_dis .material-icons {
        font-size: 20px;
        color: #27AE60 !important;
        -webkit-print-color-adjust: exact;
    }
    
    .add_branch_main .table_input input {
        padding: 4px 5px;
    }
    
    .preview_table_1 .mat-cell {
        padding: 1rem 0.6rem !important;
        font-size: 1.4rem !important;
        font-weight: 600;
        margin: 0px;
        display: table-cell;
        text-transform: inherit;
        
    }
    .mat-cell {
        word-break: break-word !important;
        width:20% !important;
    }
    .preview_table_bg_1 {
        background: #27AE60 !important;
        -webkit-print-color-adjust: exact;
        font-weight: 600;
        border-collapse: seperete !important;
        border : 1px solid #fff !important;
        width:300px !important;
        outline: none !important;
    }
    
    .preview_table_bg_2 {
        background: #6A686879 !important;
        -webkit-print-color-adjust: exact;
        border-collapse: seperete !important;
        border : 1px solid #fff !important;
        width:200px !important;
        outline: none !important;
    }
    
    .preview_sec_4 img {
        font-size: 20px;
        width: 45px;
    }
    .dynmc_tbl .mat-cell.pab_table_dis1 {
        max-width: 40px;
        min-width: 40px;
    }
    .dynmc_tbl .mat-cell.pab_table_head {
        max-width: 40px;
        min-width: 40px;
    }
    .pb_tb .pab_table_dis1.pb_tb_hd {
        width: 160px;
    }
    .pb_tb .pab_table_head.pb_tb_hd {
        width: 160px;
    }
    
    .preview_table_2 .pab_table_head {
        background: #27AE60 !important;
        -webkit-print-color-adjust: exact;
        font-weight: 600;
        border-collapse: seperete !important;
        border : 1px solid #fff !important;
        outline: none !important;
    }
    
    .preview_table_2 .pab_table_dis1 {
        background: #6A686879 !important;
        -webkit-print-color-adjust: exact;
        border-collapse: seperete !important;
        border : 1px solid #fff !important;
        outline: none !important;
    }
    
    .preview_table_2 .pab_table_dis2 {
        background: #27AE60 !important;
        -webkit-print-color-adjust: exact;
        font-weight: 600;
    }
    
    .preview_table_2 .mat-cell {
        padding: 1rem 0.6rem !important;
        font-size: 1.4rem !important;
        font-weight: 600;
        margin: 0px;
        margin-right: 2px;
        display: table-cell;
        min-width: 40px;
    }

    .marginZonal{margin-left: 0 !important;}
.viewHeading{position: relative;left: 3.5%;margin-top: 3rem !important;}
.geoWidth{width: 10% !important;}
.leftPrint{position:relative !important; left: -5% !important;}
.h3Margin{margin-left: 0 !important;}
.h3HeadingStyle{margin-left: 0 !important;}
.commercialLeft{position: relative !important;left: 2.4% !important;}
.marginZonL{margin-left: -10% !important;}
.mat-expansion-panel-body{padding: 0 !important;}
.zoal-rate-content{min-height: 8rem !important;}
.flex1{flex: 1 !important;}
.flex2{flex: 2 !important;}
.flex3{flex: 3 !important;}
.flex4{flex: 4 !important;}
.flex5{flex: 5 !important;}
.flex-box{display: flex;}
// .associateContainer .mat-table{
//     border-collapse: separate !important;
//     border-spacing: 1px !important;
// }
.col-print-1 {width:6%;  float:left;}
.col-print-2 {width:9%; float:left;}
.green_th{background: #27AE60 !important; color: #000 !important; -webkit-print-color-adjust: exact; font-weight: 600; font-size: 1.5rem;word-break: break-all !important;}
.grey_td{background: #b8b7b7 !important; color: #000 !important; -webkit-print-color-adjust: exact;word-break: break-all !important;}
.prev_width {width: 11% !important;}
.text-heading-bar{background: #ccc; -webkit-print-color-adjust: exact;}
.smallPrint{left: 0 !important;}
 @page { margin: 5rem !important;display: none !important; }
 .previewHeading{width: 100%;background: #fff !important;margin-top: 1.5rem !important;}
 
 #topbar{display: none !important;}
 .nav{display: none !important;}
 .noneDisplay{display: none !important;}
 body { margin: 1.6cm !important; }
.mat-expansion-panel-content
  {
    overflow: visible !important;
    display: block !important;
    visibility: visible !important;
    height: inherit !important;
  }
  .width-800{
      width:800px !important;
      flex:auto !important;
     
  }
  .preview_sec{
    margin-left:-40px !important;
  }
  .width-200{
    width:200px !important;
    flex:auto !important;
  }
  .width-100{
    width:100px !important;
    flex:auto !important;
  }
.width-150{
    width:150px !important;
    flex:auto !important;
}
  .preview_sec_3 h3{
    margin-left: 2rem !important;
    margin-top: 2.5rem !important;
  }
  .customer_preview{
    background: #27ae60 !important;
    padding: 1rem 0 1rem 1.6rem !important;
    -webkit-print-color-adjust: exact; 
}
.col-md-3{
    width:25% !important;
}
.width-1000{
    width:100% !important;
    margin : auto !important;
}
.highlight {background-color: yellow !important; color: black !important;  -webkit-print-color-adjust: exact !important;}

}

.associateAirContainer .docToggle{position: relative !important;top: .7rem !important;left: 1rem !important;cursor: pointer !important;}
.associateAirContainer .toggleText{font-weight: bold !important; font-size: 1.6rem !important;}
.mat-slide-toggle.mat-checked .mat-slide-toggle-thumb {
    background-color: #27ae60!important;
}
.mat-slide-toggle.mat-checked .mat-slide-toggle-bar {
    background-color: #2e9459!important;
}
.cdk-global-scrollblock {top: 0 !important;}

.dropdown {
    cursor: auto;
}

.mat-button:hover .mat-button-focus-overlay, 
.mat-stroked-button:hover .mat-button-focus-overlay {
    opacity: 0 !important;
}
.mat-button-ripple.mat-ripple {display: none !important}

.mat-select-panel .mat-option.mat-active {
    background: #27AE60 !important;
    color: #fff !important;
}

/*-- for preview -- */
.associateAirContainer .break-word {
    word-break : break-word !important
}
.mat-dialog-responsive .break-word {
    word-break : break-word !important
}

/*--- Date Picker changed css --- */
  .mat-calendar-controls {
    position: relative !important;
    display: flex !important;
    justify-content: center !important;
}
.mat-calendar-period-button {
    position: absolute !important;
    display: flex !important;
    font-weight: bold !important;
}

.mat-calendar-previous-button {
    position: absolute !important;
    left: 0 !important;
    color: #27AE60 !important;
}
.mat-calendar-arrow {
    display: none !important;
}

.mat-calendar-table-header {
    box-shadow: 0 3px 5px -6px #000 !important;
}

.mat-calendar-table-header {
    color: rgba(0,0,0,.38);
}

.mat-calendar-table thead.mat-calendar-table-header tr th {
    background: transparent !important;
    color: #1a1a1a;
    font-weight: bold;
    font-size: 1.6rem;
}
.mat-calendar-body-label {
    visibility: hidden!important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}
.mat-calendar-body-label {
    height: 0;
    line-height: 0;
    text-align: left;
    padding-left: 4.71429%;
    padding-right: 4.71429%;
}
.mat-calendar-next-button {
    color: #27AE60 !important;
}

section.mgsg_print_sec p {
    cursor: pointer!important;
}
img.preview_email_icon, img.preview_email_icon + strong {
    cursor: pointer;
}


/* for firefox only */
@-moz-document url-prefix() {        

    html body #defualtBranchSearch {
        top: 2rem !important;
    }
    
    /* for vechicle upldoad */
     html body #mozila .firefox .mat-datepicker-toggle{  
       
        top: 2.3rem !important;
        left: -.4rem !important;  
    } 

    html body .firefox.date_picker_adjust .mat-input-element {                    
        margin-bottom: 1rem !important;
    } 
     /* for vechicle upldoad */

     html body #mozila .firefox2 .mat-datepicker-toggle {
        top: .3rem !important;
        left: -29px;
    }

    

    .date_picker_adjust {
        position: relative;
    }
    html body #mozila  .mat-datepicker-toggle {   
        top: 0rem !important;                   
    }

    html body #mozila span.mat-button-wrapper svg.mat-datepicker-toggle-default-icon{
        position: absolute;
        top: 1px !important;
        left: 6px !important;
      }
}

`

  ngOnInit() {
    var container;
    if (/Edge/.test(navigator.userAgent)) {
      container = document.getElementsByTagName("head")[0];
    } else {
      container = document.getElementsByClassName("associateAirContainer")[0];
    }
    const style: any = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(this.core_css));
    container.appendChild(style);
  }
}

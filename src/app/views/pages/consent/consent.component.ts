import { Component, Injectable, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
 
})
export class ConsentComponent implements OnInit {
  selectedDate: string | NgbDateStruct = ""
  maxDate: any
  date:any
  copyArr: any;
  filter = {
    order:"",
    type:"",
    keyword:""
  }
  filterObj: any = { p: 0, limit: 50 };
  selectDate: any = { day: '', month: '', year: '' }
  pageNo: any = 0;
  consentData: any;
  category = "all"
  constructor(private route: ActivatedRoute, public formatter: NgbDateParserFormatter, private calendar: NgbCalendar, private router: Router, private toastr: ToastrService, private modalService: NgbModal, private playlistService: PlaylistService, private spinner: NgxSpinnerService) {
      this.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
   }

  ngOnInit(): void {
    this.getAllConsent();
  }
  openDatePicker(datepicker: any) {
    datepicker.toggle();
  }
  getAllConsent(){
    this.spinner.show()
    if (this.selectDate.year && this.selectDate.month && this.selectDate.day) {
      if(this.selectDate.month.toString().length === 1){
        this.selectDate.month = "0" + this.selectDate.month
      }
      if(this.selectDate.day.toString().length === 1){
        this.selectDate.day = "0" + this.selectDate.day
      }
      this.selectedDate = `${this.selectDate.year}-${this.selectDate.month}-${this.selectDate.day}`
    };
    console.log(this.selectedDate)
    console.log(this.selectDate.month.toString().length)
    this.playlistService.getAllConsent(this.category,this.selectedDate,this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
      this.consentData = data.data
      this.copyArr = data.totalRecords
      console.log(this.consentData)
      this.spinner.hide()
    })
  }
reset(){
  this.spinner.show();
  this.selectedDate = ""
  this.filter.keyword = ""
  this.filter.order =""
  this.category = "all"
  this.playlistService.getAllConsent(this.category,this.selectedDate,this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
    this.consentData = data.data
    this.copyArr = data.totalRecords
    this.filter.keyword = ""
    this.selectDate = this.selectedDate
    this.category = "all"
    console.log(this.consentData)
    this.spinner.hide()
  })
}

  pageChangeEvent(event: any) {
    this.pageNo = event - 1;
    this.filterObj.p = event;
    this.getAllConsent()
  }
  ascending1() {
    this.filter.order = "asc";
    this.filter.type = "displayName";
    this.getAllConsent();
  }
  ascending2() {
    this.filter.order = "desc";
    this.filter.type = "displayName";
    this.getAllConsent();
  }
  ascending3() {
    this.filter.order = "asc";
    this.filter.type = "email"
    this.getAllConsent();
  }
  ascending4() {
    this.filter.order = "desc";
    this.filter.type = "email";
    this.getAllConsent();
  }
  ascending5() {
    this.filter.order = "asc";
    this.filter.type = "deviceType";
    this.getAllConsent();
  }
  ascending6() {
    this.filter.order = "desc";
    this.filter.type = "deviceType";
    this.getAllConsent();
  }
  ascending7() {
    this.filter.order = "asc";
    this.filter.type = "gameCreation";
    this.getAllConsent();
  }
  ascending8() {
    this.filter.order = "desc";
    this.filter.type = "gameCreation";
    this.getAllConsent();
  }
  ascending9() {
    this.filter.order = "asc";
    this.filter.type = "termsAndCondition";
    this.getAllConsent();
  }
  ascending10() {
    this.filter.order = "desc";
    this.filter.type = "termsAndCondition";
    this.getAllConsent();
  }
  ascending11() {
    this.filter.order = "asc";
    this.filter.type = "firstLogin";
    this.getAllConsent();
  }
  ascending12() {
    this.filter.order = "desc";
    this.filter.type = "firstLogin";
    this.getAllConsent();
  }
  ascending13() {
    this.filter.order = "asc";
    this.filter.type = "lastLogin";
    this.getAllConsent();
  }
  ascending14() {
    this.filter.order = "desc";
    this.filter.type = "lastLogin";
    this.getAllConsent();
  }
  ascending15() {
    this.filter.order = "asc";
    this.filter.type = "privacyPolicy";
    this.getAllConsent();
  }
  ascending16() {
    this.filter.order = "desc";
    this.filter.type = "privacyPolicy";
    this.getAllConsent();
  }
  ascending17() {
    this.filter.order = "asc";
    this.filter.type = "cookieConsent";
    this.getAllConsent();
  }
  ascending18() {
    this.filter.order = "desc";
    this.filter.type = "cookieConsent";
    this.getAllConsent();
  }

  export(){
    this.spinner.show()
    this.playlistService.getExportConsent(this.category,this.selectedDate,this.filter.keyword,this.filter.order,this.pageNo,this.filter.type).subscribe((data: any) => {
      const file = data;
      const url = window.URL.createObjectURL(
        new Blob([data as BlobPart], { type: 'application/Consent-log.xlsx' })
      );
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.setAttribute('style', 'display: none');
      link.href = url;
      link.download = `Consent-log.xlsx`;
      link.click();
      this.spinner.hide()
    },error =>{
      this.toastr.error("please select Date & Category ",`Error`)
    });
    this.getAllConsent()
  }
}

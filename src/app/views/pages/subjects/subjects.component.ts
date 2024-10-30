import { Component, Injectable, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  modalReference: NgbModalRef;
  basicModalCloseResult: string;
  selectedDate: string | NgbDateStruct = ""
  maxDate: any
  pageNo: any = 0;
  filterObj: any = { p: 0, limit: 50 };
  copyArr: any;
  subjectList: any;
  file : File;
  filter = {
    status: "all",
    keyword:"",
    order: "",
    type: "",
  }
  selectDate: any = { day: '', month: '', year: '' }
  title: any;
  fromDate: any;
  subjectName: any;
  subject: any;
  noOFGames: any;
  totalGameplay: any;
  status: "";
  data: any;
  fileName:any
  imageUrl: any;
  constructor(private route: ActivatedRoute, public formatter: NgbDateParserFormatter,
     private calendar: NgbCalendar, private router: Router, private toastr: ToastrService,
      private modalService: NgbModal, private subjectService: SubjectService,
       private spinner: NgxSpinnerService,) {
    this.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
  }
  ngOnInit(): void {
    this.getsubjectData()
  }
  openBasicModal(content) {
    this.modalReference = this.modalService.open(content, {});
    this.title = ""
    this.file = this.file
    this.status = ""
  this.modalReference.result
 .then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    })
    .catch((res) => {});
  }

close(){
  window.location.reload()
}
openDatePicker(datepicker: any) {
  datepicker.toggle();
}
  openBasicModal2(content) {
    this.modalReference = this.modalService.open(content, {})
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
     
    }).catch((res) => { });
  }
  openBasicModal3(content) {
    this.modalReference = this.modalService.open(content, {})
    this.modalReference.result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
     
    }).catch((res) => { });
  }

  pageChangeEvent(event: any) {
    this.pageNo = event - 1;
    this.filterObj.p = event;
    this.getsubjectData()
  }

  ascending1() {
    this.filter.order = "asc";
    this.filter.type = "subject"
    this.getsubjectData();
  }
  ascending2() {
    this.filter.order = "desc";
    this.filter.type = "subject"
    this.getsubjectData();
  }
  ascending3() {
    this.filter.order = "asc";
    this.filter.type = "totalGames"
    this.getsubjectData();
  }
  ascending4() {
    this.filter.order = "desc";
    this.filter.type = "totalGames"
    this.getsubjectData();
  }
  ascending5() {
    this.filter.order = "asc";
    this.filter.type = "totalGamePlayes "
    this.getsubjectData();
  }
  ascending6() {
    this.filter.order = "desc";
    this.filter.type = "totalGamePlayes "
    this.getsubjectData();
  }
  getsubjectData() {
    this.spinner.show()
    if (this.selectDate.year && this.selectDate.month && this.selectDate.day) {
      this.selectedDate = `${this.selectDate.year}-${this.selectDate.month}-${this.selectDate.day}`
    }
    console.log(this.selectedDate)
    this.subjectService.getAllSubject(this.selectedDate,this.filter.keyword,this.filter.order,this.pageNo,this.filter.status,this.filter.type).subscribe((data: any) => {
      this.subjectList = data.data
      this.copyArr = data.totalRecords
      console.log(this.subjectList)
      this.spinner.hide()
    })
  }
  reSetForm() {
    this.spinner.show()
    this.selectedDate = ""
      this.filter.status = "all"
      this.filter.keyword = ""
      this.pageNo = 0
    this.subjectService.getAllSubject(this.selectedDate, this.filter.keyword, this.filter.order, this.pageNo, this.filter.status, this.filter.type).subscribe((data: any) => {
      this.subjectList = data.data
      this.copyArr = data.totalRecords
      console.log(this.subjectList)
      this.filter.keyword = ""
      this.selectDate = this.selectedDate
      this.filter.status = "all"
      this.spinner.hide()
    })
  }
  uploadFile(fileInput: any) {
    this.file = <File>fileInput.target.files[0];
  }
  subjectAdd() {
    this.spinner.show()
    const formData = new FormData();
    formData.append('icon', this.file);
    formData.append('title', this.title);
    formData.append('status', this.status);
    this.subjectService.addSubject(formData).subscribe((data: any) => {
      console.log(data);
      this.toastr.success('Subject Added Successfully !', 'Success');
      this.getsubjectData()
      this.spinner.hide()
    }, error => {
      this.toastr.error(`Please Choose File to Upload`, `Error`)
      this.spinner.hide()
    })
  }
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      this.displaySelectedImage();
      
    }
  }
  // Function to display the selected image
  displaySelectedImage(): void {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(this.file);
    }
    
  }
  subjectEdit(id) {
    this.spinner.show()
    const formData = new FormData();
    if(this.file != undefined || this.file != null){
      formData.append('icon', this.file);
    }

    formData.append('id',id)
    formData.append('status',this.status)
    formData.append('title',this.title)
    this.subjectService.editSubject(formData).subscribe((data: any) => {
      console.log(data);
      this.toastr.success('Subject Edit Successfully !', 'Success');
      this.modalReference.close();
       this.getsubjectData()
      this.spinner.hide()
    }, error => {
      this.toastr.error(`Please Choose File to Upload`, `Error`)
      this.spinner.hide()
    })
  }

  subjectStatusChange(list) {
    this.spinner.show()
    this.subjectService.changeStatusSubject(list.id, list.status).subscribe((data: any) => {
      console.log(data);
      this.toastr.success('Subject Status Changed Successfully !', 'Success');
      this.spinner.hide()
      this.getsubjectData()
    }, error => {
      this.toastr.error(error.message, `Error`)
      this.spinner.hide()
    })
  }
  subjectGetID(id){
    this.spinner.show()
    this.subjectService.getSubject(id).subscribe((data:any)=>{
      this.data = data.data
      this.title = this.data.title
      this.status = this.data.status
      this.imageUrl = data.data.imageUrl
      console.log(this.imageUrl)
      this.spinner.hide()
    })
  }
  subjectView(id){
    this.spinner.show()
    this.subjectService.getSubject(id).subscribe((data:any)=>{
      this.subjectName = data.data
      this.subject = this.subjectName.title
      this.noOFGames = this.subjectName.totalGames
      this.totalGameplay = this.subjectName.totalGameplay
      this.status = this.subjectName.status
      console.log(this.subjectName)
      this.spinner.hide()
    })
  }
export(){
  this.spinner.show()
  if(this.selectDate.year && this.selectDate.month && this.selectDate.day){
    this.selectedDate = `${this.selectDate.year}-${this.selectDate.month}-${this.selectDate.day}`
  }
  this.subjectService.subjectListCsv(this.selectedDate, this.filter.keyword, this.filter.order, this.pageNo, this.filter.status, this.filter.type).subscribe((data: any) => {
    const file = data;
    const url = window.URL.createObjectURL(
      new Blob([data as BlobPart], { type: 'application/user.xlsx' })
    );
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display: none');
    link.href = url;
    link.download = `subject.xlsx`;
    link.click();
    this.spinner.hide()
  },error =>{
    this.toastr.error('There is no data to export.',`Error`)
  });
  this.getsubjectData()
  this.spinner.hide()
}
}



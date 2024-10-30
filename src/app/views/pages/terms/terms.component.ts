import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  policy: any;
  data: any;
  id: number= 0;
  isEditing: boolean = false;
  textData: any; 
  public Editor = ClassicEditor;
  
  @ViewChild('editorComponent') editorComponent: any;
  constructor(private modalService: NgbModal,  private toastr: ToastrService, private router: Router,
    private spinner: NgxSpinnerService,private userService:UserService) { }

  ngOnInit(): void {
    this.privacyPolicy()
  }

    
  toggleEditing() {
    console.log("hii")
    this.isEditing = !this.isEditing;
  }

  privacyPolicy(){
    this.spinner.show();
    let type = "TermsAndCondition";
    this.userService.policyPrivacy(type).subscribe((data: any) => {
      this.textData = data.data;
      console.log(this.textData.data);
      // Set data to the CKEditor once available
      if (this.editorComponent) {
        this.editorComponent.editorInstance.setData(this.textData.data);
      }
      this.spinner.hide();
    });
  }
  
  editPolicy(){
    this.spinner.show();
    if (this.isEditing) {
      const updatedData = this.editorComponent.editorInstance.getData();
    let body = {
      data:updatedData,
      id: this.textData.id,
      type:this.textData.type
    }
    this.userService.policyPrivacyEdit(body).subscribe((data: any) => {
      this.policy = data.data
      this.privacyPolicy()
      this.toastr.success(`Terms & Condition Updated Successfully`,`Success`)
      this.spinner.hide()
     },error =>{
      this.toastr.error(error.error.message,`Error`)
    });
      }
      this.isEditing = false;
      
    this.spinner.hide()
    }
  }

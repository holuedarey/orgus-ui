import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/@core/data-services/agent.service';
import { SeoService } from 'src/app/@core/utils/seo.service';
import { AppResources, AppResourcesNavMap } from 'src/app/app-resources';

@Component({
  selector: 'app-profile-agent-documents',
  templateUrl: './profile-agent-documents.component.html',
  styleUrls: ['./profile-agent-documents.component.scss']
})
export class AgentDocumentsComponent implements OnInit, OnDestroy {

  constructor(private seo: SeoService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private agentService: AgentService,) { }


  updetailsForm!: FormGroup;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  userName: string = '';
  disableUserName = true;
  isPasswordHidden = true;


  showMessages: any = {};


  filesId: File[] = [];
  utilityBill: File[] = [];
  passport: File[] = [];
  cacDocument: File[] = [];
  guarantorsId: File[] = [];
  guarantorsPassport: File[] = [];


  formData = new FormData(); 

  onSelect(event: any, type: string) {
    console.log(event.addedFiles, type);
    switch (type) {
      case "filesId":
        this.filesId.push(...event.addedFiles);
        this.formData.append('idCard', this.filesId[0])
        break;
      case "utilityBill":
        this.utilityBill.push(...event.addedFiles);
        this.formData.append('utilityBill', this.utilityBill[0])
        break;
      case "passport":
        this.passport.push(...event.addedFiles);
        this.formData.append('passport', this.passport[0])
        break;
      case "cacDocument":
        this.cacDocument.push(...event.addedFiles);
        this.formData.append('cacDocument', this.cacDocument[0])
        break;
      case "guarantorsId":
        this.guarantorsId.push(...event.addedFiles);
        this.formData.append('guarantorsId', this.guarantorsId[0])
        break;
      case "guarantorsPassport":
        this.guarantorsPassport.push(...event.addedFiles);
        this.formData.append('guarantorsPassport', this.guarantorsPassport[0])
        break;
    }
  }

  onRemove(event: any, type:string) {
    console.log(event);
    switch (type) {
      case "filesId":
        this.filesId.splice(this.filesId.indexOf(event), 1);
        break;
      case "utilityBill":
        this.utilityBill.splice(this.filesId.indexOf(event), 1);
        break;
      case "passport":
        this.passport.splice(this.filesId.indexOf(event), 1);
        break;
      case "cacDocument":
        this.cacDocument.splice(this.filesId.indexOf(event), 1);
        break;
      case "guarantorsId":
        this.guarantorsId.splice(this.filesId.indexOf(event), 1);
        break;
      case "guarantorsPassport":
        this.guarantorsPassport.splice(this.filesId.indexOf(event), 1);
        break;
    }
   
  }

  ngOnInit(): void {
    this.seo.setSeoData('Agent Onboarding', 'Document Upload');
  }


  updateDetails(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    

    this.agentService.postAgentDocument(this.formData).subscribe(
      (result) : any => {
        this.submitted = false;
        console.log(result)

        if (result.status) {
          this.messages = [result.message || 'Agent Document Updated successful'];
          // this._router.navigate(['agent-otp'])
          return this._router.navigateByUrl(AppResourcesNavMap.get(AppResources.AppView)?.route as string);
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: any) => {
        this.submitted = false;
        this.errors = [
          error.error.message || 'An Error occured while creating client.',
        ];
      }
    );
  }

  ngOnDestroy(): void {

  }


}

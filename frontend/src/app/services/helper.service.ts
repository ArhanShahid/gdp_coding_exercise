import { Injectable } from '@angular/core';
import {ToasterService} from 'angular2-toaster';

@Injectable()
export class HelperService {

  private toasterService: ToasterService;

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  errorNotification(message: string ) {
    console.error('Error', message );
    this.toasterService.pop('error', 'Error', message);
  }
  successNotification(message: string ) {
    console.log('success', message );
    this.toasterService.pop('success', 'Success', message);
  }
  
}

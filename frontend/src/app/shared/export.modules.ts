import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ToasterModule} from 'angular2-toaster';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HelperService } from '../services/helper.service';
import { ConstantService } from '../services/constant.service';
import { HTTPService } from '../services/http.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    ToasterModule,
    HttpModule,
    FormsModule,
    CommonModule,
    TooltipModule
  ],
  providers: [
    CookieService,
    HelperService,
    HTTPService,
    ConstantService
  ]
})
export class ExportModules { }

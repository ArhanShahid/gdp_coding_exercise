import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HttpModule} from '@angular/http';
import {ToasterModule} from 'angular2-toaster';
import {NgLoadingBarModule} from 'ng-loading-bar';

import {CollapseModule} from 'ngx-bootstrap/collapse';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import {SIDEBAR_TOGGLE_DIRECTIVES} from './shared/sidebar.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieService, CookieOptions} from 'angular2-cookie/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';

// Services
import {HelperService} from './services/helper.service';
import {ConstantService} from './services/constant.service';
import {HTTPService} from './services/http.service';
import {AuthGuard} from './services/auth.guard.service';

// Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';
import {SimpleLayoutComponent} from './layouts/simple-layout.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgLoadingBarModule.forRoot(),
    TooltipModule.forRoot(),
    ToasterModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    SIDEBAR_TOGGLE_DIRECTIVES
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, HelperService,
    HTTPService,
    ConstantService,
    CookieService,
    AuthGuard,
    { provide: CookieOptions, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

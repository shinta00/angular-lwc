import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { contactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    contactsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [contactsComponent]
})
export class AppModule {
constructor(private injector: Injector) {    
  const customElement = createCustomElement(contactsComponent, { injector });
  customElements.define('angular-cmp', customElement);
}

ngDoBootstrap() {}
}

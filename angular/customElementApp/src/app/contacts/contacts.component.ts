import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls:  ['./contacts.component.css'],
})
export class contactsComponent implements OnInit {
  @Input() contacts :any;
  public editContact: any = {};
  public showModal = false;

  ngOnInit() {
    const that = this;
    window.addEventListener('message', function(event) {
            if(event.data.includes('getData ')){
                that.contacts = JSON.parse(event.data.replace('getData ', ''));
            }
    });
    window.postMessage('loadData', '*');
  }
  handleEdit(event: any){
    this.editContact = this.contacts[event?.currentTarget.id];
    this.showModal = true;
  }

  handleClose(){
    this.showModal = false;
  }
  handleChange(event: any){
    this.editContact.Email = event.currentTarget.value;
  }
  handleSave(){
    this.contacts.filter((item: any) => item.Id == this.editContact.Id)[0].Email = this.editContact.Email;
    window.postMessage('handleSave ' + JSON.stringify(this.editContact), '*');
    this.showModal = false;
  }
}
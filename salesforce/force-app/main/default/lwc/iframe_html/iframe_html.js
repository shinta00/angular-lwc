import { LightningElement } from 'lwc';
import iframe_html_resource from '@salesforce/resourceUrl/iframe_html_resource';
import getContacts from "@salesforce/apex/ContactControler.getContacts";
import { deleteRecord } from "lightning/uiRecordApi";

export default class Iframe_html extends LightningElement {
    urlStatic = iframe_html_resource + '/iframe_html_resource.html';

    connectedCallback(){
        console.log('-----------------------------------------')
        const that = this;
        window.addEventListener('message', function(event) {
            if(event.data == 'getData'){
                that.getData();
            }else if(event.data.includes('delete-contact')){
                const contactIdToDelete = event.data.split(' ')[1];
                deleteRecord(contactIdToDelete)
                .then(() => {
                }).finally(()=>{
                    that.getData()
                })
            }
        });
    }
    getData() {
        getContacts()
        .then((result) => {
            this.sendMessageToIFrame(JSON.stringify(result));
        })
        .catch((error) => {
            console.error('iframe_html - getData', error);
        });
    }

    sendMessageToIFrame(data) {
        const iframe = this.template.querySelector("iframe");
        iframe.contentWindow.postMessage(data, "*");
      }
}
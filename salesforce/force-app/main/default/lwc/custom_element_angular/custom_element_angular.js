import { LightningElement }         from 'lwc';
import getContacts from "@salesforce/apex/ContactControler.getContacts";
import updateContactEmail from "@salesforce/apex/ContactControler.updateContactEmail";

// Lightning imports.
import { loadStyle, loadScript }    from 'lightning/platformResourceLoader';

// Resources URL imports.
import angular_cmp from "@salesforce/resourceUrl/custom_element_angular_resource";

export default class Custom_element_angular extends LightningElement {

    connectedCallback() {
        const that = this;
        Promise.all([
          	loadStyle(this, angular_cmp + '/styles.ef46db3751d8e999.css'),
          	loadScript(this, angular_cmp + '/main.17a1e20fb8778ce4.js'),
          	loadScript(this, angular_cmp + '/polyfills.a12b761530c21a70.js'),
          	loadScript(this, angular_cmp + '/runtime.d245997a85a8cdce.js'),
        ]).then(() => {
            const ngEl = document.createElement('angular-cmp');
			const ngElContainer = this.template.querySelector('.custom-element-container');
            ngElContainer.appendChild(ngEl);
        }).catch((error) => {
			console.error('LWC customElement - connectedCallback: ', JSON.stringify(error));
		});
        window.addEventListener('message', function(event) {
            if(event.data.includes('handleSave')){
                let contact = JSON.parse(event.data.replace('handleSave ', ''));
                that.updateRecord(contact.Id, contact.Email);
            }else if(event.data.includes('loadData')){
                that.getContacts();
            }
        });
    }
    updateRecord(id, email) {
        updateContactEmail({id: id, email: email})
        .then(() => {
        })
        .catch((error) => {
            console.error('LWC customElement - updateRecord', error);
        });
    }

    getContacts() {
        getContacts()
        .then((res) => {
            window.postMessage('getData ' + JSON.stringify(res), '*')
        })
        .catch((error) => {
            console.error('LWC customElement - getContacts', error);
        });
    }
}
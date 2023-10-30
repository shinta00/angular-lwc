import { LightningElement } from 'lwc';
import iframe_angular_resource from '@salesforce/resourceUrl/iframe_angular_resource';

export default class Iframe_angular extends LightningElement {
    urlStatic = iframe_angular_resource + '/index.html';
}
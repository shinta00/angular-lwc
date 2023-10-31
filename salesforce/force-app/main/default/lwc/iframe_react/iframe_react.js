import { LightningElement } from 'lwc';
import iframe_react_resource from '@salesforce/resourceUrl/iframe_react_resource';

export default class Iframe_angular extends LightningElement {
    urlStatic = iframe_react_resource + '/index.html';
}
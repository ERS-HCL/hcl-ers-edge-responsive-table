import {
    html,
    PolymerElement
  } from '@polymer/polymer/polymer-element.js';
  import '@polymer/iron-ajax/iron-ajax.js';
  import  '../core-grid/core-grid.js';
  import {
    CoreGridDatatypesModel
  } from './core-grid-datatypes-model.js';
  import {
    style
  } from './core-grid-datatypes-css.js';
   /**
   * @customElement
   * @polymer
   * @description 
   * CoreGridDatatypes Component can be added by using `<core-grid-datatypes>` element.
   * CoreGridDatatypes holds the methods for api call and formats the response using 
   * CoreGridDatatypesModel. In this class the Api request is made with fully configured 
   * gridConfig parameter.
   */
  class CoreGridDatatypes extends PolymerElement {
    static get template() {
      return html `      
         ${style}
        <div class$="{{applyClass}}" style="text-align:center;height:100%;">
              <iron-ajax id="ironId" handle-as="json" on-error="_handleError"></iron-ajax>
              <div id="autoGridTest"></div>
              <template is="dom-if" if="{{showLoader}}">
                  <div class="loader"></div>
              </template>
              <template class="center-align" is="dom-if" if="{{showMsg}}">
                  [[errorMessage]]
              </template>
              <template is="dom-if" if="{{!showMsg}}">
                <core-grid 
                    tableconfig="[[tableconfig]]" 
                    gridcolumndata="[[gridcolumndata]]" 
                    gridrowdata="[[gridrowdata]]" 
                    gridrowdatapaging="[[gridrowdatapaging]]"
                    gridrowdataoriginal = "[[gridrowdataoriginal]]">
                </core-grid>
            </template>
          </div>     
        `;
    }
    static get properties() {
      return {
        apirequest: {
          type: Object,
          value: {}
        },
        /**
         * @description Tableconfig is an object and its having the properties like theme
         * @example
         * "theme" : "blue",
         */
        tableconfig: {
          type: Object,
          value: {}
        },
         /**
         * @description Response object for card layout view of material summary
         */
        gridcolumndata: {
            type: Object,
            value: {}
        },
         /**
         * @description Response object for card layout view of material summary
         */
        gridrowdata: {
            type: Object,
            value: {}
        },
        gridrowdatapaging: {
          type: Object,
          value: {}
        },
        gridrowdataoriginal: {
          type: Object,
          value: {}
        }
      };
    }
  
  
    constructor() {
      super();
      this.errorStatus = ""; /** Holds the status of API error. */
      this.errorMessage = ""; /** Holds the status message of API error. */
      this.showMsg = false; /** Holds the flag to show or hide error message. */
      this.showLoader = ""; /** Holds the flag to show or hide loading img. */
    }
  
    connectedCallback() {
      super.connectedCallback();
      this.coreGridDatatypesModel = new CoreGridDatatypesModel();
      if (this.apirequest) {
        var self = this;
        this._setIronAjaxConfig();
        this.coreGridDatatypesModel.showLoader = true;
        this.showLoader = this.coreGridDatatypesModel.showLoader;
        this._callIronAjaxApi();
      }
    }

    /**
     * Using Iron Ajax generateRequest() promise
     * Call API to get employee details data response.
     */
    _callIronAjaxApi() {
      this.$.ironId.generateRequest().completes.then((data, res) => {
        this.$.autoGridTest.setAttribute('data', JSON.stringify(data.response));
        this.gridcolumndata = data.response.columns;
        this.gridrowdata = data.response.data.slice(0,10);
        this.gridrowdatapaging = data.response.data;
        this.gridrowdataoriginal = data.response.data;
        this.coreGridDatatypesModel.showLoader = false;
        this.showLoader = this.coreGridDatatypesModel.showLoader;
  
      }, (rejected) => {
        let req = rejected.request;
        let error = rejected.error;
      });
    }

    /**
     *  To set API Header Params.
     *  To set API Header Auth params.
     *  To set endpoint URL
     *  To set request body for the POST method
     */
    _setIronAjaxConfig() {
      this.coreGridDatatypesModel.handleUrl = this.apirequest ? this.apirequest.handlerURL : '';
      this.$.ironId.url = this.coreGridDatatypesModel.handleUrl;
      //this.$.ironId.method = this.apirequest.method;
      //this.$.ironId.body = this.apirequest.params;
    }

    /**
     * To handle the Error part in iron-ajax request
     */
    _handleError(e) {
      const res = e.detail.request; // iron-request
      this.errorStatus = res.status;
      this.errorMessage = res.response && res.response.responseMessage ?
        res.response.responseMessage : res.statusText;
      this.showMsg = true;
      this.coreGridDatatypesModel.showLoader = false;
      this.showLoader = this.coreGridDatatypesModel.showLoader;
    }
  }
  
  window.customElements.define('core-grid-datatypes', CoreGridDatatypes);
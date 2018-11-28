import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import 'fontawesome-icon';
import {
  style
} from './core-grid-css.js';
import {
  blueTheme
} from './core-grid-bluetheme-css.js';
import {
  darkTheme
} from './core-grid-darktheme-css.js';

import {CellTemplateModel} from '../core-base/celltemplate-model.js';
/**
 * @customElement
 * @polymer
 * @description
 * CoreGrid Component can be added by using `<core-grid>` element.
 * CoreGrid is the place where the Grid is actually plotted. Response data is formatted and 
 * DataSeries to render the Grid is passed.
 */
class CoreGrid extends PolymerElement {
  static get template() {
    return html `
     <template is="dom-if" if="[[getBlueTheme()]]">
      ${style}
      ${blueTheme}
    </template>
    <template is="dom-if" if="[[getDarkTheme()]]">
      ${style}
      ${darkTheme}
    </template>
    <template is="dom-if" if="[[checkMaterialSummaryLength(gridcolumndata)]]">
      <template is="dom-if" if="[[!!tableconfig.title.text]]">
        <div align$="{{tableconfig.title.align}}" style$="[[applyTitleStyle(tableconfig)]]">{{tableconfig.title.text}}</div>
      </template>
      <template is="dom-if" if="[[!!tableconfig.subtitle.text]]">
        <div align$="{{tableconfig.subtitle.align}}" style$="[[applySubtitleStyle(tableconfig)]]">{{tableconfig.subtitle.text}}</div>
      </template>
      <template is="dom-if" if="[[enableSearchFilter(tableconfig)]]">
        <div class="ui-grid-filter">
          <input type="text" value="{{searchString::input}}" placeholder="Search Filter.." on-keyup="filterSearch"> 
        </div>
      </template>
    <div class="ui-grid-wrapper">
        <div class="ui-grid-table">
            <div class="ui-grid-thead">
                <div class="ui-grid-tr">
                  <template is="dom-if" if="[[checkMaterialSummaryLength(gridcolumndata)]]">
                      <template is="dom-if" if="[[showCheckboxCellTemplate(tableconfig)]]">
                        <div class="ui-grid-th selCol">
                          <div class="checkbox_wrapper">
                              <input type="checkbox" id="selectallcheckbox_id" on-click="onSelectAllCheckbox"/>
                              <label for="selectallcheckbox_id"></label>
                          </div>
                        </div>
                      </template>
                        <template is="dom-repeat"  items="[[gridcolumndata]]" index-as="index_id" as="column">
                            <div class$="ui-grid-th [[column.field]]" >
                              {{column.title}}
                              <template is="dom-if" if="[[column.sortable]]">
                                <span class="sort-by" data-column$="[[column.field]]" data-sort="DESC" on-click="updateColumnVal"></span>
                              </template>
                            </div>
                        </template>
                        <template is="dom-if" if="[[showIconCellTemplate(tableconfig)]]">
                          <div class="ui-grid-th">Action</div>
                        </template> 
                          <span class="columnlistspan">
                            <fontawesome-icon prefix="fas" name="list" size="7x" fixed-width on-click="showColumnList"></fontawesome-icon>
                            <ul class="columnlist displayNone">
                              <template is="dom-repeat"  items="[[gridcolumndata]]" index-as="index_id" as="column">
                                  <li><input data-column$="[[column.field]]" type="checkbox" on-click="toggleColumns"/> {{column.title}}</li>
                              </template>
                            </ul>
                          </span>
                    </template>
                </div>
            </div>
            <div class="ui-grid-tbody">
                <template is="dom-if" if="[[checkMaterialSummaryLength(gridrowdata)]]" >
                    <!--<template is="dom-repeat"  items="[[gridrowdata]]" index-as="row_index_id" as="rowdata" filter="{{computeFilterTable(searchString)}}" rendered-item-count="{{renderedCount}}" sort="[[_sort(sortColumn)]]">-->
                    <template is="dom-repeat"  items="[[gridrowdata]]" index-as="row_index_id" as="rowdata" rendered-item-count="{{renderedCount}}" sort="[[_sort(sortColumn,sortVal)]]">
                    <div class="ui-grid-tr">
                        <template is="dom-if" if="[[showCheckboxCellTemplate(tableconfig)]]">
                          <div class="ui-grid-td selCol">
                              <div class="checkbox_wrapper">
                                  <input type="checkbox" data-row$="[[rowdata]]" id$="{{getCheckboxId(rowdata, tableconfig)}}" value$="{{getEquipmentId(rowdata,tableconfig)}}" on-click="onCheckboxSelect">
                                  <label for$="{{getCheckboxId(rowdata, tableconfig)}}"></label>
                              </div>
                          </div>
                        </template>
                        <template is="dom-repeat"  items="[[gridcolumndata]]" index-as="column_index_id" as="columndata">
                            <div class$="{{applyColumnClass(tableconfig, column_index_id, columndata)}}">
                            <template is="dom-if" if="[[showLegendCellTemplate(columndata.field, tableconfig)]]">
                              <span class="legendCelltemplateSpan" style$="[[legendCellTemplate(columndata.field, tableconfig)]]"></span>
                            </template>
                              <template is="dom-if" if="[[showLinkCellTemplate(columndata.field, tableconfig)]]">
                                <span style="cursor:pointer;color:#0066f5;" data-row$="[[rowdata]]" on-click="linkDelegateAction">{{getRowData(rowdata,columndata.field)}}</span>
                              </template>
                              <template is="dom-if" if="[[!showLinkCellTemplate(columndata.field, tableconfig)]]">
                                {{getRowData(rowdata,columndata.field)}}
                              </template>
                              <template is="dom-if" if="[[isShowAccordion(column_index_id, tableconfig)]]">
                                <span style="width:3em;
                                vertical-align: middle;
                                font-size: 0.75rem;
                                float:right;">
                                    <a on-click="showAccordion"><i class="chevron down"></i></a>
                                </span>
                              </template>
                            </div>
                        </template>
                        <template is="dom-if" if="[[showIconCellTemplate(tableconfig)]]">
                          <div class="ui-grid-td">
                            <template is="dom-if" if="[[showEditIcon(tableconfig)]]">
                              <span data-row$="[[rowdata]]"><fontawesome-icon prefix="fas" name="edit" fixed-width on-click="delegateAction"></fontawesome-icon></span>
                            </template>
                            <template is="dom-if" if="[[showDeleteIcon(tableconfig)]]">
                              <span data-row$="[[rowdata]]"><fontawesome-icon prefix="fas" name="times" fixed-width on-click="delegateAction"></fontawesome-icon></span>
                            </template>
                            <template is="dom-if" if="[[showDownloadIcon(tableconfig)]]">
                              <span data-row$="[[rowdata]]"><fontawesome-icon prefix="fas" name="download" fixed-width on-click="delegateAction"></fontawesome-icon></span>
                            </template>
                          </div>
                        </template>
                      </div>
                      <div class="ui-grid-tr ui-grid-tr-card-layout displayNone">
                        <div class="ui-grid-td">
                            <div class="ui-grid-card-layout">
                              <template is="dom-repeat"  items="[[gridcolumndata]]" index-as="column_index_id" as="columndata">
                                <template is="dom-if" if="[[showCardLayoutContent(column_index_id, tableconfig)]]">
                                  <div style="width:100%;" class$="[[columndata.field]]">
                                      <span class="layout-label">{{columndata.title}}</span>
                                      <span class="layout-label-seperator">:</span>
                                      <span class="layout-label-content">
                                        <template is="dom-if" if="[[showLegendCellTemplate(columndata.field, tableconfig)]]">
                                          <span class="legendCelltemplateSpan" style$="[[legendCellTemplate(columndata.field, tableconfig)]]"></span>
                                        </template>
                                        <template is="dom-if" if="[[showLinkCellTemplate(columndata.field, tableconfig)]]">
                                          <span style="cursor:pointer;color:#0066f5;" data-row$="[[rowdata]]" on-click="linkDelegateAction">{{getRowData(rowdata,columndata.field)}}</span>
                                        </template>
                                        <template is="dom-if" if="[[!showLinkCellTemplate(columndata.field, tableconfig)]]">
                                          {{getRowData(rowdata,columndata.field)}}
                                        </template>
                                      </span>               
                                  </div>
                                  </template>
                                </template>
                                <template is="dom-if" if="[[showIconCellTemplate(tableconfig)]]">
                                  <div style="width:100%">
                                    <span class="layout-label">Action</span>
                                    <span class="layout-label-seperator">:</span>
                                    <span class="layout-label-content">
                                      <template is="dom-if" if="[[showEditIcon(tableconfig)]]">
                                        <span data-row$="[[rowdata]]"><fontawesome-icon prefix="fas" name="edit" fixed-width on-click="delegateAction"></fontawesome-icon></span>
                                      </template>
                                      <template is="dom-if" if="[[showDeleteIcon(tableconfig)]]">
                                        <span data-row$="[[rowdata]]"><fontawesome-icon prefix="fas" name="times" fixed-width on-click="delegateAction"></fontawesome-icon></span>
                                      </template>
                                      <template is="dom-if" if="[[showDownloadIcon(tableconfig)]]">
                                        <span data-row$="[[rowdata]]"><fontawesome-icon prefix="fas" name="download" fixed-width on-click="delegateAction"></fontawesome-icon></span>
                                      </template>
                                    </span>
                                  </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    </template>
                  </template>
                  <template is="dom-if" if="{{!renderedCount}}">
                    <div class="ui-grid-tr">
                        <div class="ui-grid-td">There is no data to display.</div>
                    </div>
                  </template> 
                  <template is="dom-if" if="[[!checkMaterialSummaryLength(gridrowdata)]]">
                    <div class="ui-grid-tr">
                        <div class="ui-grid-td">There is no data to display.</div>
                    </div>
                  </template>
            </div>
           
        </div>
    </div>   
    </template> 
    <template is="dom-if" if="[[showPaging(gridrowdatapaging)]]" >
      <div class="pagination clearfix">
          <a href="#" on-click="paginationFirst" id="paginationFirst"><fontawesome-icon prefix="fas" name="angle-double-left" fixed-width></fontawesome-icon></a>
          &nbsp;<a href="#" on-click="paginationPrevious" id="paginationPrevious"><fontawesome-icon prefix="fas" name="angle-left" fixed-width></fontawesome-icon></a>
          <input type="number" min="1" max$="[[setPagingMaxValue()]]" step="1" value$="{{currentindex}}"  title="Selected page" aria-label="Selected page"  on-input="paginationInput" pattern= "[0-9]" >/{{setPagingMaxValue()}}
          <a href="#" on-click="paginationNext" id="paginationNext"><fontawesome-icon prefix="fas" name="angle-right" fixed-width></fontawesome-icon></a>
          &nbsp;<a href="#" on-click="paginationLast" id="paginationLast"><fontawesome-icon prefix="fas" name="angle-double-right" fixed-width></fontawesome-icon></a>
      </div>
    </template>
        `;
  }
  static get properties() {
    return {
      /**
       * @description Tableconfig is an object and its having the properties like theme
       * @example
       * "theme" : "blue",
       */
      tableconfig: {
        type: Object
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
      searchString: {
        type: String
      },
      sortColumn: {
        type: String
      },
      sortVal: {
        type: String,
        value: ''
      },
      currentindex: {
        type: Number,
        value: 1
      }
    };
  }


  constructor() {
    super();
    this.currentindex = 1;
    this.totalRecordsPerPage = 10;
    this.selectedAssets = [];
    this.cellTemplateModel = new CellTemplateModel();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  enableSearchFilter(tableconfig) {
    return !!tableconfig.search && tableconfig.search.enabled==true;
  }
  compareObjects(o1, o2) {
    let k = '';
    for(k in o1) if(o1[k] != o2[k]) return false;
    for(k in o2) if(o1[k] != o2[k]) return false;
    return true;
  }

  trimString(s) {
    let l=0, r=s.length -1;
    while(l < s.length && s[l] == ' ') l++;
    while(r > l && s[r] == ' ') r-=1;
    return s.substring(l, r+1);
  }

  itemExists(haystack, needle) {
    for(let i=0; i<haystack.length; i++) if(this.compareObjects(haystack[i], needle)) return true;
    return false;
  }
  filterSearch(event) {
    let results = [];
    if(!!this.searchString && this.searchString.length>0) {
      if(this.showPaging) {
        let pagingInput = this.shadowRoot.querySelector('input[type="number"]');
        if(!!pagingInput) {
          pagingInput.value = 1;
          this.enablePagination(pagingInput.value);
        }
      }        
      this.searchString = this.trimString(this.searchString); // trim it
        for(let i=0; i<this.gridrowdataoriginal.length; i++) {
          for(let key in this.gridrowdataoriginal[i]) {
            if(this.gridrowdataoriginal[i][key].toLowerCase().indexOf(this.searchString)!=-1) {
              if(!this.itemExists(results, this.gridrowdataoriginal[i])) results.push(this.gridrowdataoriginal[i]);
            }
          }
        }
        this.currentindex = 1;
        this.gridrowdatapaging = results;
        this.gridrowdata = results.slice(0,this.totalRecordsPerPage);
    }
    else {
      this.gridrowdata = this.gridrowdataoriginal.slice(0,this.totalRecordsPerPage);
      this.currentindex = 1;
      this.gridrowdatapaging = this.gridrowdataoriginal;
      if(this.showPaging) {
        let pagingInput = this.shadowRoot.querySelector('input[type="number"]');
        if(!!pagingInput) {
          pagingInput.value = 1;
          this.enablePagination(pagingInput.value);
        }
      } 
    }
  }

  toggleElements(ele, eventTarget, eleType) {
    if(ele.length>0) {
      for(let i=0; i<ele.length; i++) {
        let displayEleProp = (eleType=="cardLayout")?'displayBlock':'displayTableCell';
        if(ele[i].classList.contains('displayNone') && eventTarget.checked==false) {
          ele[i].classList.remove('displayNone');
          ele[i].classList.add(displayEleProp);
        }
        else if(ele[i].classList.contains(displayEleProp) && eventTarget.checked==true) {
          ele[i].classList.remove(displayEleProp);
          ele[i].classList.add('displayNone');
        } 
        else {
          ele[i].classList.remove(displayEleProp);
          ele[i].classList.add('displayNone');
        }
      }
    }
  }
  toggleColumns(event) {
    let headerElement = this.shadowRoot.querySelectorAll('div.ui-grid-thead div.'+event.target.getAttribute('data-column'));
    let bodyElement = this.shadowRoot.querySelectorAll('div.ui-grid-tbody > div.ui-grid-tr > div.' + event.target.getAttribute('data-column'));
    let cardLayoutElement = this.shadowRoot.querySelectorAll('div.ui-grid-tbody div.ui-grid-tr-card-layout div.' + event.target.getAttribute('data-column'));
    if(headerElement.length>0) {
      this.toggleElements(headerElement, event.target, '');
    }
    if(bodyElement.length>0) {
      this.toggleElements(bodyElement, event.target,'');
    }
    if(cardLayoutElement.length>0) {
      this.toggleElements(cardLayoutElement, event.target,'cardLayout');
    }
  }
  showColumnList(event) {
    let columnList = event.target.parentElement.querySelector('ul.columnlist');
    if(columnList.getAttribute('class').indexOf('displayNone')>-1 && columnList.classList.contains('displayNone') ) {
      columnList.classList.remove('displayNone');
      columnList.classList.add('displayBlock');
    } else {
      columnList.classList.remove('displayBlock');
      columnList.classList.add('displayNone');
    }
  }
  showLinkCellTemplate(columnField, tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.linkCellTemplate) > -1) {
        let legendIndex = cellTemplateArray.indexOf(this.cellTemplateModel.linkCellTemplate);
        return !!tableconfig.cellTemplate[legendIndex].value && tableconfig.cellTemplate[legendIndex].value.length>0 && tableconfig.cellTemplate[legendIndex].enabled==true && tableconfig.cellTemplate[legendIndex].value.indexOf(columnField) > -1;
      }
    }
  }
  showCheckboxCellTemplate(tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate) > -1) {
        let checkboxIndex = cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate);
        return !!tableconfig.cellTemplate[checkboxIndex].value && tableconfig.cellTemplate[checkboxIndex].enabled==true;
      }
      else 
        return false;
    }
  }
  showIconCellTemplate(tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.iconCellTemplate) > -1) {
        let iconIndex = cellTemplateArray.indexOf(this.cellTemplateModel.iconCellTemplate);
        return !!tableconfig.cellTemplate[iconIndex].icons && tableconfig.cellTemplate[iconIndex].icons.length>0 && tableconfig.cellTemplate[iconIndex].enabled==true;
      }
    } 
  }

  showEditIcon(tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.iconCellTemplate) > -1) {
        let iconIndex = cellTemplateArray.indexOf(this.cellTemplateModel.iconCellTemplate);
        return !!tableconfig.cellTemplate[iconIndex].icons && tableconfig.cellTemplate[iconIndex].icons.length>0 && tableconfig.cellTemplate[iconIndex].enabled==true && tableconfig.cellTemplate[iconIndex].icons.indexOf("edit") > -1;
      }
    }    
  }

  showDeleteIcon(tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.iconCellTemplate) > -1) {
        let iconIndex = cellTemplateArray.indexOf(this.cellTemplateModel.iconCellTemplate);
        return !!tableconfig.cellTemplate[iconIndex].icons && tableconfig.cellTemplate[iconIndex].icons.length>0 && tableconfig.cellTemplate[iconIndex].enabled==true && tableconfig.cellTemplate[iconIndex].icons.indexOf("delete") > -1;
      }
    }   
  }

  showDownloadIcon(tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.iconCellTemplate) > -1) {
        let iconIndex = cellTemplateArray.indexOf(this.cellTemplateModel.iconCellTemplate);
        return !!tableconfig.cellTemplate[iconIndex].icons && tableconfig.cellTemplate[iconIndex].icons.length>0 && tableconfig.cellTemplate[iconIndex].enabled==true && tableconfig.cellTemplate[iconIndex].icons.indexOf("download") > -1;
      }
    }   
  }
  showLegendCellTemplate(columnField, tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.legendCellTemplate) > -1) {
        let legendIndex = cellTemplateArray.indexOf(this.cellTemplateModel.legendCellTemplate);
        return !!tableconfig.cellTemplate[legendIndex].value && tableconfig.cellTemplate[legendIndex].value.length>0 && tableconfig.cellTemplate[legendIndex].enabled==true && tableconfig.cellTemplate[legendIndex].value.indexOf(columnField) > -1;
      }
    }   
  }
  legendCellTemplate(columnField, tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      let legendIndex = cellTemplateArray.indexOf(this.cellTemplateModel.legendCellTemplate);
      if(cellTemplateArray.indexOf(this.cellTemplateModel.legendCellTemplate) > -1 && !!tableconfig.cellTemplate[legendIndex].value && tableconfig.cellTemplate[legendIndex].value.length>0 && tableconfig.cellTemplate[legendIndex].enabled==true && tableconfig.cellTemplate[legendIndex].value.indexOf(columnField) > -1) {
        let backgroundColor = tableconfig.cellTemplate[legendIndex].color[tableconfig.cellTemplate[legendIndex].value.indexOf(columnField)];
        return 'background:'+backgroundColor;
      }
    }   
  }
  applySubtitleStyle(subtitleconfig) {
    return (!!subtitleconfig.subtitle && !!subtitleconfig.subtitle.style)?'font-size:'+subtitleconfig.subtitle.style.fontSize+';font-weight:'+subtitleconfig.subtitle.style.fontWeight+';font-family:'+subtitleconfig.subtitle.style.fontFamily+';color:'+subtitleconfig.subtitle.style.color+';margin:0 1%;':'';
  }
  applyTitleStyle(titleconfig) {
    return (!!titleconfig.title && !!titleconfig.title.style)?'font-size:'+titleconfig.title.style.fontSize+';font-weight:'+titleconfig.title.style.fontWeight+';font-family:'+titleconfig.title.style.fontFamily+';color:'+titleconfig.title.style.color+';margin:0 1%;':'';
  }
  applyColumnClass(tableconfig, column_index_id, columndata) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate) > -1) {
        let checkboxIndex = cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate);
        return  !!tableconfig.cellTemplate[checkboxIndex] && !!tableconfig.cellTemplate[checkboxIndex].enabled==false && column_index_id==0?'ui-grid-td '+ columndata.field+' borderLeft':'ui-grid-td '+columndata.field;
      }
      return column_index_id==0?'ui-grid-td '+ columndata.field+' borderLeft':'ui-grid-td '+columndata.field;
    }
    else {
      return column_index_id==0?'ui-grid-td '+ columndata.field+' borderLeft':'ui-grid-td '+columndata.field;
    } 
  }
  
  getCheckboxId(rowdata, tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate) > -1) {
        let checkboxIndex = cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate);
        let assetId = (!!tableconfig.cellTemplate[checkboxIndex] && !!tableconfig.cellTemplate[checkboxIndex].value)?rowdata[tableconfig.cellTemplate[checkboxIndex].value]:rowdata.assetId;
        return (!!assetId)?'column_index_id_'+assetId:'';
      }
    }
  }

  getEquipmentId(rowdata, tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate) > -1) {
        let checkboxIndex = cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate);
        let assetId = (!!tableconfig.cellTemplate[checkboxIndex] && !!tableconfig.cellTemplate[checkboxIndex].value)?rowdata[tableconfig.cellTemplate[checkboxIndex].value]:rowdata.assetId;
        return (!!assetId)?assetId:'';
      }
    }
  }
  onSelectAllCheckbox(event) {
    let selectAllCheckbox = this.shadowRoot.querySelectorAll('.ui-grid-tr .ui-grid-td.selCol .checkbox_wrapper input[type="checkbox"]');
    if(selectAllCheckbox.length>0){
      for(let i=0; i<selectAllCheckbox.length;i++) {
        if(!!event.target && event.target.checked) {
          selectAllCheckbox[i].checked= true;
          if(this.selectedAssets.indexOf(selectAllCheckbox[i].value)<0)
            this.selectedAssets.push(selectAllCheckbox[i].value);
        }
        else {
          selectAllCheckbox[i].checked= false;
          let selectedIndex = this.selectedAssets.indexOf(selectAllCheckbox[i].value);
          this.selectedAssets.splice(selectedIndex, 1);
        }
      }
    }
    if(this.selectedAssets.length>0){
      this._getSelectedRowsData();
    }
  }
  onCheckboxSelect(event) {
    let selectAllcheckbox = this.shadowRoot.querySelector('.ui-grid-tr .ui-grid-th.selCol .checkbox_wrapper input[type="checkbox"]');
    
    if(!!event.target && event.target.checked) {
      if(this.selectedAssets.indexOf(event.target.value)<0){
        this.selectedAssets.push(event.target.value);
      }
      if(this.selectedAssets.length>0 && this.shadowRoot.querySelectorAll('.ui-grid-tr .ui-grid-td.selCol .checkbox_wrapper input[type="checkbox"]:checked').length==this.selectedAssets.length && this.shadowRoot.querySelectorAll('.ui-grid-tr .ui-grid-td.selCol .checkbox_wrapper input[type="checkbox"]:checked').length==this.shadowRoot.querySelectorAll('.ui-grid-tr .ui-grid-td.selCol .checkbox_wrapper input[type="checkbox"]').length){
        selectAllcheckbox.checked = true;
      }
      else {
        selectAllcheckbox.checked = false;
      }
    }
    else {
      let selectedIndex = this.selectedAssets.indexOf(event.target.value);
      this.selectedAssets.splice(selectedIndex, 1);
      selectAllcheckbox.checked = false;
    }
    this._getSelectedRowsData();
  }

  _getSelectedRowsData() {
    let selectedCheckBoxData = this.shadowRoot.querySelectorAll('.ui-grid-tr .ui-grid-td.selCol .checkbox_wrapper input[type="checkbox"]:checked');
    if(selectedCheckBoxData.length>0){
      let selectedRowData = [];
      for(let i=0; i<selectedCheckBoxData.length;i++){
        selectedRowData.push(JSON.parse(selectedCheckBoxData[i].getAttribute('data-row')));
      }
      window.dispatchEvent(new CustomEvent('customValue', {detail: {customval: selectedRowData, id:this.tableconfig.id}}));
    }
  }

  linkDelegateAction(event) {
    let rowdata = event.target.getAttribute('data-row');
    window.dispatchEvent(new CustomEvent('linkDelegateAction', {detail: {rowdata: JSON.parse(rowdata), id:this.tableconfig.id}}));
  }

  delegateAction(event) {
    let rowdata = event.target.parentNode.getAttribute('data-row');
    window.dispatchEvent(new CustomEvent('delegateAction', {detail: {rowdata: JSON.parse(rowdata), id:this.tableconfig.id}}));
  }
  setPagingMaxValue() {
    return Math.ceil(this.gridrowdatapaging.length/this.totalRecordsPerPage);
  }

  showPaging() {
    return Math.ceil(this.gridrowdatapaging.length/this.totalRecordsPerPage) >1 ? true: false;
  }
  /**
   * To check whether the material summary having data to show card layout
   */
  checkMaterialSummaryLength(gridcolumndata) {
    return (!!gridcolumndata && gridcolumndata.length > 0) ? true : false;
  }

  getRowData(rowdata, columndata) {
    return !!rowdata[columndata] ? rowdata[columndata] : '-';

  }

  showAccordion(event) {
    let currentTarget = (event.target.getAttribute('class').indexOf("chevron down") >= -1) ? event.target.parentElement.parentElement.parentElement.parentElement : event.target.parentElement.parentElement.parentElement;
    if (currentTarget.nextElementSibling && currentTarget.nextElementSibling.getAttribute('class').indexOf("displayNone") >= -1 && currentTarget.nextElementSibling.classList.contains('displayNone')) {
      currentTarget.nextElementSibling.classList.remove('displayNone');
      currentTarget.nextElementSibling.classList.add('displayBlock');
    } else if (currentTarget.nextElementSibling && currentTarget.nextElementSibling.getAttribute('class').indexOf("displayBlock") >= -1 && currentTarget.nextElementSibling.classList.contains('displayBlock')) {
      currentTarget.nextElementSibling.classList.remove('displayBlock');
      currentTarget.nextElementSibling.classList.add('displayNone');
    }
  }

  isShowAccordion(column_index_id, tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate) > -1) {
        let checkboxIndex = cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate);
        return ((!!tableconfig.cellTemplate[checkboxIndex] && tableconfig.cellTemplate[checkboxIndex].enabled==false && column_index_id == 1) || (!!tableconfig.cellTemplate[checkboxIndex] && tableconfig.cellTemplate[checkboxIndex].enabled==true && column_index_id == 0)) ? true : false;
      }
    }
    else {
      return column_index_id == 1 ? true : false;
    }
  }

  showCardLayoutContent(column_index_id, tableconfig) {
    if(!!tableconfig.cellTemplate) {
      let cellTemplateArray = tableconfig.cellTemplate.map(function(cellTemplate) {return cellTemplate.name});
      if(cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate) > -1) {
        let checkboxIndex = cellTemplateArray.indexOf(this.cellTemplateModel.checkboxCellTemplate);
        return ((!!tableconfig.cellTemplate[checkboxIndex] && tableconfig.cellTemplate[checkboxIndex].enabled==false && column_index_id > 1) || (!!tableconfig.cellTemplate[checkboxIndex] && tableconfig.cellTemplate[checkboxIndex].enabled==true && column_index_id > 0)) ? true : false;
      }
    } else {
      return column_index_id > 1  ? true : false;
    }
  }

  computeFilterTable(string) {
    if (!string) {
      // set filter to null to disable filtering
      return null;
    } else {
      string = string.toLowerCase();
      return (item) => {
        let serialNumber = item.serialNumber.toLowerCase();
        return serialNumber.indexOf(string) != -1;
      };
    }
  }
  updateColumnVal(event) {
    this.sortColumn = (!!event && event.target) ? event.target.getAttribute('data-column') : '';
    this.sortVal = event.target.getAttribute('data-sort') == 'ASC' ? 'DESC' : 'ASC';
    this._sort(this.sortColumn, this.sortVal);
    event.target.setAttribute('data-sort', this.sortVal);

  }

  _sort(sortColumn, sortVal) {
    if (!!sortColumn && !!sortVal) {
      switch (sortColumn) {
        case sortColumn:
          return function (a, b) {
            if (a[sortColumn] === b[sortColumn]) return 0;
            if (sortVal == "ASC")
              return a[sortColumn] < b[sortColumn] ? 1 : -1;
            else if (sortVal == "DESC")
              return a[sortColumn] > b[sortColumn] ? 1 : -1;
          };
      }
    }
  }
  /**
   * @description Return boolean value import styles for blue theme
   */
  getBlueTheme() {
    return this.tableconfig.theme == "blue" ? true : false;
  }

  /**
   * @description Return boolean value import styles for dark theme
   */
  getDarkTheme() {
    return this.tableconfig.theme == "dark" ? true : false;
  }

  paginationInput(event) {
    event = (event) ? event : window.event;
    let charCode = (event.which) ? event.which : event.keyCode;
    this.currentindex = (!event.target.value)?1:event.target.value;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.target.value = 1;
      this.currentindex = (!event.target.value)?1:event.target.value;
      this.gridrowdata = this.gridrowdatapaging.slice(((this.currentindex-1)*this.totalRecordsPerPage),this.currentindex*this.totalRecordsPerPage);
      this.enablePagination(this.currentindex);
    } else {
      event.target.value = (!event.target.value)?1:event.target.value;
      event.target.value = event.target.value>Math.ceil(this.gridrowdatapaging.length/this.totalRecordsPerPage)?1:event.target.value
      this.currentindex = parseInt(event.target.value);
      this.gridrowdata = this.gridrowdatapaging.slice(((this.currentindex-1)*this.totalRecordsPerPage),this.currentindex*this.totalRecordsPerPage);
      this.enablePagination(this.currentindex);
    }
    
  }
  paginationFirst() {
    this.currentindex = 1;
    this.gridrowdata = this.gridrowdatapaging.slice(((this.currentindex-1)*this.totalRecordsPerPage),this.currentindex*this.totalRecordsPerPage);
    this.enablePagination(this.currentindex);
  }
  paginationLast() {
    this.currentindex = Math.ceil(this.gridrowdatapaging.length/this.totalRecordsPerPage);
    this.gridrowdata = this.gridrowdatapaging.slice(((this.currentindex-1)*this.totalRecordsPerPage),this.currentindex*this.totalRecordsPerPage);
    this.enablePagination(this.currentindex);
  }

  paginationNext() {
    this.currentindex = (this.currentindex<1)?1:this.currentindex+1;
    this.gridrowdata = this.gridrowdatapaging.slice(((this.currentindex-1)*this.totalRecordsPerPage),this.currentindex*this.totalRecordsPerPage);
    this.enablePagination(this.currentindex);
  }

  paginationPrevious() {
    this.currentindex = (this.currentindex<1)?1:this.currentindex-1;
    this.gridrowdata = this.gridrowdatapaging.slice(((this.currentindex-1)*this.totalRecordsPerPage),this.currentindex*this.totalRecordsPerPage);
    this.enablePagination(this.currentindex);
  }

  enablePagination(currentindex) {
    this.shadowRoot.querySelector('input[type="number"]').value = currentindex;
    if(currentindex==1) {
      this.shadowRoot.querySelector('a#paginationFirst').style.pointerEvents="none";
      this.shadowRoot.querySelector('a#paginationFirst').style.cursor="default";
      this.shadowRoot.querySelector('a#paginationPrevious').style.pointerEvents="none";
      this.shadowRoot.querySelector('a#paginationPrevious').style.cursor="default";
      this.shadowRoot.querySelector('a#paginationLast').style.pointerEvents="auto";
      this.shadowRoot.querySelector('a#paginationLast').style.cursor="pointer";
      this.shadowRoot.querySelector('a#paginationNext').style.pointerEvents="auto";
      this.shadowRoot.querySelector('a#paginationNext').style.cursor="pointer";
    }
    else if(currentindex == Math.ceil(this.gridrowdatapaging.length/this.totalRecordsPerPage)){
      this.shadowRoot.querySelector('a#paginationFirst').style.pointerEvents="auto";
      this.shadowRoot.querySelector('a#paginationFirst').style.cursor="pointer";
      this.shadowRoot.querySelector('a#paginationPrevious').style.pointerEvents="auto";
      this.shadowRoot.querySelector('a#paginationPrevious').style.cursor="pointer";
      this.shadowRoot.querySelector('a#paginationLast').style.pointerEvents="auto";
      this.shadowRoot.querySelector('a#paginationLast').style.pointerEvents="none";
      this.shadowRoot.querySelector('a#paginationLast').style.cursor="default";
      this.shadowRoot.querySelector('a#paginationNext').style.pointerEvents="none";
      this.shadowRoot.querySelector('a#paginationNext').style.cursor="default";
    }
    else {
      this.shadowRoot.querySelector('a#paginationFirst').style.pointerEvents="auto";
      this.shadowRoot.querySelector('a#paginationFirst').style.cursor="pointer";
      this.shadowRoot.querySelector('a#paginationPrevious').style.pointerEvents="auto";
      this.shadowRoot.querySelector('a#paginationPrevious').style.cursor="pointer";
      this.shadowRoot.querySelector('a#paginationLast').style.pointerEvents="auto";
      this.shadowRoot.querySelector('a#paginationLast').style.cursor="pointer";
      this.shadowRoot.querySelector('a#paginationNext').style.pointerEvents="auto";
      this.shadowRoot.querySelector('a#paginationNext').style.cursor="pointer";
    }
  }
}

window.customElements.define('core-grid', CoreGrid);
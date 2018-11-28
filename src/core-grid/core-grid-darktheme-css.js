
import {
    html
} from '@polymer/polymer/polymer-element.js';

export const darkTheme = html `<style>.ui-grid-wrapper .ui-grid-thead {
    border-bottom: darkgrey 2px solid;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr {
    background-color: #626262;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th {
    color: #ccc;
    border-right: 1px solid darkgrey;
    border-top: 1px solid darkgrey;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th:nth-child(1),
    .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr .ui-grid-td:nth-child(1){
    border-left: 1px dotted darkgrey;
    }
    .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr .ui-grid-td:last-of-type, 
    .ui-grid-tr-card-layout {
    border-right: 1px dotted darkgrey;
    }
    .ui-grid-wrapper .ui-grid-tbody {
    background: #302e2e;
    color:#ccc;
    }
    .ui-grid-tbody .ui-grid-tr {
    border-bottom: 1px dotted darkgrey;
    background-color: #302e2e;
    }
    .ui-grid-wrapper .ui-grid-tr .ui-grid-th, 
    .ui-grid-wrapper .ui-grid-tr .ui-grid-td,
    .ui-grid-wrapper .ui-grid-tr .ui-grid-td,
    .layout-label, .layout-label-seperator, .layout-label-content {
    color: #ccc;
    }
    .chevron {
    border: solid #ccc;
    border-width: 0 1px 1px 0;
    }
    .ui-grid-card-layout {
    border-right: 1px dotted darkgrey;
    }
    span.sort-by:before {
        border-bottom-color: #ccc;
    }
    span.sort-by:after {
        border-top-color: #ccc;
    }
    @media only screen and (max-width: 768px) {
       .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr .ui-grid-td:nth-child(n+3){
            border-right: 1px dotted darkgrey;
        }
    }
    .borderLeft {
        border-left: 1px dotted darkgrey;
    }
  </style>`;
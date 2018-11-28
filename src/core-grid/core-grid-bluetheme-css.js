import {
    html
} from '@polymer/polymer/polymer-element.js';

export const blueTheme = html `<style>.ui-grid-wrapper .ui-grid-thead {
    border-bottom: #9bc2e6 2px solid;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr {
    background-color: #5e9cd3;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th {
    color: #fff;
    border-right: 1px solid #9bc2e6;
    border-top: 1px solid #9bc2e6;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th:nth-child(1),
    .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr .ui-grid-td:nth-child(1){
    border-left: 1px dotted #9bc2e6;
    }
    .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr .ui-grid-td:last-of-type, 
    .ui-grid-tr-card-layout {
    border-right: 1px dotted #9bc2e6;
    }
    .ui-grid-wrapper .ui-grid-tbody {
    background: #f7f7f7;
    }
    .ui-grid-tbody .ui-grid-tr {
    border-bottom: 1px dotted #9bc2e6;
    background-color: #fff;
    }
    .ui-grid-wrapper .ui-grid-tr .ui-grid-th, .ui-grid-wrapper .ui-grid-tr .ui-grid-td {
    color: #fff;
    }
    .ui-grid-wrapper .ui-grid-tr .ui-grid-td {
        color: #000;
    }
    .layout-label, .layout-label-seperator, .layout-label-content {
        color: #000;
    }
    .chevron {
    border: solid black;
    border-width: 0 1px 1px 0;
    }
    .ui-grid-card-layout {
    border-right: 1px dotted #9bc2e6;
    }
    span.sort-by:before {
        border-bottom-color: #fff;
    }
    span.sort-by:after {
        border-top-color: #fff;
    }
    @media only screen and (max-width: 768px) {
        .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr .ui-grid-td:nth-child(n+3){
            border-right: 1px dotted #9bc2e6;
        }
    }
    .borderLeft {
        border-left: 1px dotted #9bc2e6;
    }
  </style>`;
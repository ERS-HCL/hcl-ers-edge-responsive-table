import {
    html
} from '@polymer/polymer/polymer-element.js';

export const style = html `<style>:host {
    display: block;
    text-align: left;
    font-family: 'Roboto', sans-serif;
    height: 100%;
   }
   
    .ui-grid-wrapper {
    overflow: hidden;
    overflow-x: auto;
    height: 67.5%;
    margin: 1%;
    }
    .ui-grid-wrapper .ui-grid-table {
    min-width: 100%;
    height: 100%;
    display: table;
    table-layout: fixed;
    margin-bottom: 0;
    width: auto;
    }

    .ui-grid-wrapper .ui-grid-thead {
    border-bottom: #9bc2e6 2px solid;
    }
    .ui-grid-wrapper .ui-grid-thead, .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr {
    display: table;
    min-width: 100%;
    table-layout: fixed;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr {
    background-color: #5e9cd3;
    padding: 0;
    }

    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th {
    font-weight: 400;
    color: #fff;
    border-right: 1px solid #9bc2e6;
    border-top: 1px solid #9bc2e6;
    text-align:center;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th:nth-child(1),
    .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr .ui-grid-td:nth-child(1){
    border-left: 1px dotted #9bc2e6;
    }
    .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr .ui-grid-td:last-of-type, 
    .ui-grid-tr-card-layout {
    border-right: 1px dotted #9bc2e6;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th.sort-icon {
    position: relative;
    cursor: pointer;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th.sort-icon:before, .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th.sort-icon:after {
    border: 4px solid transparent;
    content: "";
    display: block;
    height: 0;
    right: 5px;
    top: 50%;
    position: absolute;
    width: 0;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th.sort-icon:before {
    border-bottom-color: #969696;
    margin-top: -9px;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th.sort-icon:after {
    border-top-color: #969696;
    margin-top: 1px;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th.sort-icon.asc:after {
    display: none;
    }
    .ui-grid-wrapper .ui-grid-thead .ui-grid-tr .ui-grid-th.sort-icon.desc:before {
    display: none;
    }
    .ui-grid-wrapper .ui-grid-tbody {
    display: block;
    width: auto;
    height: 296px;
    overflow: hidden;
    overflow-y: auto;
    min-width: 100%;
    background: #f7f7f7;
    }
    .ui-grid-wrapper .ui-grid-tr {
    display: table-row;
    overflow: hidden;
    position: relative;
    }
    .ui-grid-tbody .ui-grid-tr {
    border-bottom: 1px dotted #9bc2e6;
    background-color: #fff;
    }
    
    .ui-grid-wrapper .ui-grid-tr .ui-grid-th, .ui-grid-wrapper .ui-grid-tr .ui-grid-td {
    display: table-cell;
    vertical-align: middle;
    font-size:14px;
    padding: 10px 5px;
    color: #fff;
    min-width: 150px;
    }
    .ui-grid-wrapper .ui-grid-tr .ui-grid-td {
        color: #000;
    }
    .layout-label, .layout-label-seperator, .layout-label-content {
    vertical-align: top;
    font-size:13px;
    padding: 5px;
    color: #000;
    font-weight:bold;
    display: inline-block;
    text-align: right;
    }

    .layout-label-content {
    text-align: left;
    font-weight:normal;
    }
    .chevron {
    border: solid black;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 4px;
    vertical-align: middle;
    }
    .chevron.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    display: none;
    }
    .ui-grid-card-layout {
    height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
    clear: both;
    display: block;
    width: 100%;
    border-right: 1px dotted #9bc2e6;
    }
    .ui-grid-card-layout .dataCell {
    border: none;
    position: relative;
    background-color: #fffae7;
    width: 100% !important;
    }
    .selCol {
    width: 50px;
    border: none;
    }
    .selCol .checkbox_wrapper {
    text-align: center;
    }
    .selCol .checkbox_wrapper input[type="checkbox"] {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;
    }
    .selCol .checkbox_wrapper input[type="checkbox"] + label {
    margin-bottom: 0;
    position: relative;
    cursor: pointer;
    }
    .selCol .checkbox_wrapper input[type="checkbox"] + label:before {
    content: '';
    -webkit-appearance: none;
    background-color: #f5f5f5;
    border: 1px solid #969696;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 7px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
    }
    .selCol .checkbox_wrapper input[type="checkbox"]:checked + label:before {
    background-color: #fbcd11;
    }
    .selCol .checkbox_wrapper input[type="checkbox"]:checked + label:after {
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 6px;
    width: 6px;
    height: 11px;
    border: solid #404040;
    border-width: 0 1.5px 1.5px 0;
    transform: rotate(45deg);
    }
    .table-pagination {
    margin-top: 28px;
    color: #969696;
    font-size: 0.75rem;
    font-weight: 500;
    }
    
    .ui-grid-tr.ui-grid-tr-card-layout .ui-grid-td {
        display: block;
        padding: 0px;
    }

    .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr.ui-grid-tr-card-layout {
        display: none;
        width: 100%;
    }
    .displayBlock {
        display: block !important;
    }

    .displayNone {
        display: none !important;
    }
    .ui-grid-filter {
        margin: 5px 10px;
        text-align: left;
    }

    span.sort-by { 
    position: relative;
    padding: 7px 5px;
    vertical-align: middle;
    float: right;
    }
    span.sort-by:before,
    span.sort-by:after {
        border: 4px solid transparent;
        content: "";
        display: block;
        height: 0;
        right: 5px;
        top: 50%;
        position: absolute;
        width: 0;
    }
    span.sort-by:before {
        border-bottom-color: #fff;
        margin-top: -9px;
    }
    span.sort-by:after {
        border-top-color: #fff;
        margin-top: 1px;
    }

    .pagination a {
        color: #4A4A4A;
        border: 0; outline: 0;
    }

    .pagination {
        text-align: center;
        margin: -3px 5px;
    }
    .pagination a, .pagination strong {
        background: #fff;
        display: inline-block;
        padding: 4px 8px;
        text-decoration: none;
        line-height: 1.5em;
        
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        border: solid 1px #BEBEBE;
    }
    .pagination a:hover {
        background-color: #BEBEBE;
        color: #fff;
    }
    .pagination a:active {
        background: rgba(190, 190, 190, 0.75);
    }
    .pagination strong {
        color: #fff;
        background-color: #BEBEBE;
    }
    .pagination input[type="number"] {
        height: 25px;
        width: 50px;
    }

    #paginationFirst, #paginationPrevious {
        pointer-events: none;
        cursor: default;
    }
    .ui-grid-wrapper .ui-grid-tr .ui-grid-th.selCol,
    .ui-grid-wrapper .ui-grid-tr .ui-grid-td.selCol {
        min-width:60px;
        width: auto;
    }
    @media only screen and (max-width: 768px) {
        .table-pagination {
            text-align: center;
        }
        .ui-grid-table>.ui-grid-thead>.ui-grid-tr>.ui-grid-th:nth-child(n+4),
        .ui-grid-table>.ui-grid-tbody>.ui-grid-tr>.ui-grid-td:nth-child(n+4) {
            display: none;
        }
        .chevron.down {
            display: inline-block;
        }

        .ui-grid-wrapper .ui-grid-tbody .ui-grid-tr .ui-grid-td:nth-child(n+3){
            border-right: 1px dotted #9bc2e6;
        }
        .ui-grid-tr.ui-grid-tr-card-layout .ui-grid-td {
            display: block;
            padding: 0px;
        }
        ul.columnlist {
            right: -15px !important;
        }
    }
    @media only screen and (max-width: 320px) {
        .ui-grid-wrapper .ui-grid-tr .ui-grid-th, .ui-grid-wrapper .ui-grid-tr .ui-grid-td {
            min-width: 120px;
        }
        ul.columnlist {
            right: 0px !important;
        }
    }
    @media only screen and (max-width: 375px) {
        ul.columnlist {
            right: 0px !important;
        }
    }
    @media only screen and (min-width: 769px) {
        .ui-grid-tr-card-layout {
            display: none !important;
        }
    }
    .borderLeft {
        border-left: 1px dotted #9bc2e6;
    }
    .legendCelltemplateSpan {
        width:12px;
        height:12px;
        display:inline-block;
    }
    span fontawesome-icon {
        float: left;
        cursor: pointer;
        margin-right:5px;
    }
    span.columnlistspan {
        position: relative;
    }
    span.columnlistspan fontawesome-icon {
        float: right;
        margin-top: 10px;
    }
    ul.columnlist {
        position: absolute;
        width: 200px;
        text-align: left;
        background: #fff;
        border: solid 1px #d4d4d4;
        max-height: 250px;
        height: auto;
        padding: 0px;
        margin: 15px 0px;
        z-index: 100;
        right: 2%;
        overflow-y: scroll;
    }
    ul.columnlist li {
        list-style:none;
        clear:both;
        display: block;
        font-size: 13px;
        padding: 5px;
        border-bottom: solid 1px #d4d4d4;
    }
    ul.columnlist li:hover, ul.columnlist li:visited {
        background: #9bc2e6;
        color: #fff;
        font-weight:bold;
    }
    .displayTableCell {
        display: table-cell;
    }
  </style>`;
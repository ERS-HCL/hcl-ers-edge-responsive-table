import {html} from '@polymer/polymer/polymer-element.js';

export const style = html`<style>:host {
  display: block;
  font-family: 'Roboto', sans-serif;
  height: 100%;
 }

.loader {
  position: relative;
  border: 12px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid #666666;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite;
  /* Safari */
  animation: spin 2s linear infinite;
  margin: 0 auto;
  margin-top: 20%;
  display: inline-flex;
  align-self: center; }

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg); }
  100% {
    -webkit-transform: rotate(360deg); } }

@keyframes spin {
  0% {
    transform: rotate(0deg); }
  100% {
    transform: rotate(360deg); } }
</style>`;
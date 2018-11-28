/**
* @customElement
* @polymer
* @description
* CoreGridDatatypesModel formats the grid response came from api request according to the user request.
* If the data came is not appropriate  then  this model will format the data according to the chart needed to be shown.
*/
export class CoreGridDatatypesModel {
    constructor() {
      this.CONTENT_TYPE = 'application/json'; /** Content type property for API calls. */
      this._showLoader = null; /** Show the loader image until API loads. */
      this._handleUrl = ''; /** Parent app API URL to fetch data. */
  
      /** Header property for API calls. */
      this._header = {
        "Content-Type": "application/json"
      }
    }
  
    /**
     * Getter and Setter for loader property.
     *
     * @param {bool} element holds the boolean value for loader.
     * @return {Boolean} To show or hide the loader image.
     */
    get showLoader() {
      return this._showLoader;
    }
  
    set showLoader(val) {
      this._showLoader = val;
    }
  
    /**
     * Getter and Setter for API URL property.
     *
     * @param {url} element holds the API URL defined by the Parent app.
     * @return {String} To call the API end point.
     */
    get handleUrl() {
      return this._handleUrl;
    }
  
    set handleUrl(url) {
      this._handleUrl = url;
    }
  
    /**
     * Getter for API header.
     *
     * @return {Object} To call API endpoint to plot the chart.
     */
    get ironAjaxHeader() {
      return this._header;
    }

    set ironAjaxHeader(headerObj){
      this._header = headerObj || this._header;
    }
  
  }
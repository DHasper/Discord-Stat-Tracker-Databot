const axios = require('axios');
const config = require('../config.json');

const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
}

class Http {

    constructor(){
        this.URL = config['webserver'];
    }

    /**
     * Used to do a GET request to the web server.
     * 
     * @param {*} endpoint 
     */
    get(endpoint) {
        return new Promise( (resolve, reject) => {

            axios.get(this.URL + endpoint)
            .then( res => {
                resolve(res);
            })
            .catch( err => {
                reject(err);
            });
        });
    }

    /**
     * Used to da a POST request to the web server.
     * 
     * @param {*} endpoint to do the request to
     * @param {*} data to send with the request
     */
    post(endpoint, params) {
        return new Promise( (resolve, reject) => {

            axios.post(this.URL + endpoint, new URLSearchParams(params).toString(), options)
            .then( res => {
                resolve(res);
            })
            .catch( err => {
                reject(err);
            });
        });
    }

    /**
     * Used to do a DELETE request to the web server.
     * 
     * @param {*} endpoint 
     */
    delete(endpoint) {
        return new Promise( (resolve, reject) => {

            axios.delete(this.URL + endpoint)
            .then( res => {
                resolve(res);
            })
            .catch( err => {
                reject(err);
            });
        });
    }

    /**
     * Used to do a PUT request to the web server.
     * 
     * @param {*} endpoint 
     * @param {*} params 
     */
    patch(endpoint, params) {
        return new Promise( (resolve, reject) => {

            axios.patch(this.URL + endpoint, new URLSearchParams(params).toString(), options)
            .then( res => {
                resolve(res);
            })
            .catch( err => {
                reject(err.response);
            });
        });
    }
}

module.exports = new Http();
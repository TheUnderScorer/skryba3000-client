import axios from 'axios';
import { buildQuery } from '../../helpers/url';

export default class Client {

    /** @property {String} API endpoint */
    static endpoint = 'http://localhost:5000';

    /** @property {String} API token */
    static token = '';

    static axios = axios.create( {
        baseURL:         'https://api-skryba3000.herokuapp.com/api',
        headers:         {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    } );

    /**
     * Generate new access token if it's not stored in localStorage
     *
     * @return void
     * */
    static async getToken() {

        const Response = await Client.axios.get( '/get-token' );

        return Response.data.result;

    }

    static clearToken() {
        Client.token = '';
    }

    /**
     * Perform post request to api
     *
     * @param {String} url
     * @param {FormData|Object} data
     *
     * @return Promise
     * */
    static async post( url, data ) {

        try {

            const Token = await Client.getToken();

            const Response = await Client.axios.post( `${url}?token=${Token}`, data );

            return Response.data;

        } catch ( e ) {

            return {
                error:   true,
                message: 'Invalid server response'
            }

        }

    }

    /**
     * Perform get request to api
     *
     * @param {String} url
     * @param {Object} query
     *
     * @return {Promise}
     * */
    static async get( url, query = {} ) {

        query.token = await Client.getToken();

        try {

            const Url = buildQuery( url, query );

            const Response = await Client.axios.get( Url );

            return Response.data;

        } catch ( e ) {

            return {
                error:   true,
                message: 'Invalid server response'
            }

        }

    }

}

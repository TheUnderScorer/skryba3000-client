/**
 * Builds url query
 *
 * @param {string} url
 * @param {Object} data Query data
 *
 * @return {String}
 * */
export function buildQuery( url, data = {} ) {
    let ret = [];
    for ( let d in data )
        ret.push( encodeURIComponent( d ) + '=' + encodeURIComponent( data[ d ] ) );
    return `${url}?${ret.join( '&' )}`;
}



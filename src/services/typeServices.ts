
import { isStringValidDate } from './dateServices';

export type ITypeStrings = 'unknown' | 'undefined' | 'null' | 'function' | 'numberstring' | 'datestring' | 'string' | 'date' | 'number' | 'boolean' | 'object' |  'array' ;

/**
 * Gets actual likely type
 * @param fieldValue 
 */
export function getDetailValueType ( fieldValue : any ) {

    let fieldType = typeof fieldValue;
    let result : ITypeStrings = 'unknown';


    if ( fieldValue === undefined ) { result = 'undefined'; }
    else if ( fieldValue === null ) { result = 'null'; }
    else if ( fieldType === 'function' ) { result = 'function'; }
    else if ( fieldType === 'string' ){
        if ( isNaN(fieldValue) ) { //This is a string or date string

            if ( isStringValidDate(fieldValue, 'common') ) {
                result = 'datestring';

            } else { result = 'string'; }

        } else { result = 'numberstring' ; }

    } else if ( fieldType === 'boolean' ){
        result = 'boolean';

    } else if ( fieldType === 'number' ){
        result = 'number';

    } else if ( fieldType === 'object' ){

        //If it's a multi-choice; return all choices in an array.
        if (Array.isArray(fieldValue)) {
            result = 'array';

        //Else just stringify it
        } else {
            result = 'object';
        }
    }

    return result;
}
/***
 *    .d888b.  .d88b.  .d888b.  .d88b.          db .d888b.         db   j88D                     
 *    VP  `8D .8P  88. VP  `8D .8P  88.        o88 VP  `8D        o88  j8~88                     
 *       odD' 88  d'88    odD' 88  d'88         88    odD'         88 j8' 88                     
 *     .88'   88 d' 88  .88'   88 d' 88 C8888D  88  .88'   C8888D  88 V88888D                    
 *    j88.    `88  d8' j88.    `88  d8'         88 j88.            88     88                     
 *    888888D  `Y88P'  888888D  `Y88P'          VP 888888D         VP     VP                     
 *                                                                                               
 *                                                                                               
 *    d8888b. d888888b db    db  .d88b.  d888888b      d888888b d888888b db      d88888b .d8888. 
 *    88  `8D   `88'   88    88 .8P  Y8. `~~88~~'      `~~88~~'   `88'   88      88'     88'  YP 
 *    88oodD'    88    Y8    8P 88    88    88            88       88    88      88ooooo `8bo.   
 *    88~~~      88    `8b  d8' 88    88    88            88       88    88      88~~~~~   `Y8b. 
 *    88        .88.    `8bd8'  `8b  d8'    88            88      .88.   88booo. 88.     db   8D 
 *    88      Y888888P    YP     `Y88P'     YP            YP    Y888888P Y88888P Y88888P `8888Y' 
 *                                                                                               
 *                                                                                               
 */

 
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
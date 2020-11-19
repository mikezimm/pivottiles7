//Utils Concept from:  https://stackoverflow.com/questions/32790311/how-to-structure-utility-class

import { getTheCurrentTime,} from '../../../../services/createAnalytics';
import {tileTime} from '../TileItems/IPivotTileItemProps';
import { getLocalMonths } from '../../../../services/dateServices';


    
export function convertCategoryToIndex(cat: string) {
    //https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript
    //string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    //console.log('convertCategoryToIndex', cat);
    if (!cat) { return "";}
  
    const thisCat = cat.toString();
    if (thisCat == null) { return ""; }
    if (thisCat){
      return (thisCat.replace(" ",'_').replace(/[&]/,'And').replace(/[*]/,'aamp').replace(/[\/\\#,+()$~%.'":*?<>{}]/g,''));
    } else {
      return ("");
    }
  }

  /***
 *    d88888b d888888b db    db      db    db d8888b. db      .d8888. 
 *    88'       `88'   `8b  d8'      88    88 88  `8D 88      88'  YP 
 *    88ooo      88     `8bd8'       88    88 88oobY' 88      `8bo.   
 *    88~~~      88     .dPYb.       88    88 88`8b   88        `Y8b. 
 *    88        .88.   .8P  Y8.      88b  d88 88 `88. 88booo. db   8D 
 *    YP      Y888888P YP    YP      ~Y8888P' 88   YD Y88888P `8888Y' 
 *                                                                    
 *                                                                    
 */


export function fixURLs(oldURL,pageContext) {
    let newURL = oldURL;
    if (!oldURL || newURL.length === 0) {
      newURL = pageContext.web.absoluteUrl;
    }
    newURL += newURL.endsWith("/") ? "" : "/";
    return newURL;
  }
  
  
  /***
 *    d8888b.  .d8b.  d8888b. .d8888. d88888b      .88b  d88. d88888b 
 *    88  `8D d8' `8b 88  `8D 88'  YP 88'          88'YbdP`88 88'     
 *    88oodD' 88ooo88 88oobY' `8bo.   88ooooo      88  88  88 88ooooo 
 *    88~~~   88~~~88 88`8b     `Y8b. 88~~~~~      88  88  88 88~~~~~ 
 *    88      88   88 88 `88. db   8D 88.          88  88  88 88.     
 *    88      YP   YP 88   YD `8888Y' Y88888P      YP  YP  YP Y88888P 
 *                                                                    
 *                                                                    
 */
  
    export function parseMe(str, parser, leftOrRight) {
    // Usage:
    // parseMe(theseProps[getProp],"/",'left')
    // parseMe(theseProps[getProp],"/",'right');

    let splitCol = str.split(parser);
    if (leftOrRight.toLowerCase() === 'left') {
      return splitCol[0];
    } else if (leftOrRight.toLowerCase() === 'right') {
      return splitCol[1] ? splitCol[1] : "";
    }
  }
  

  /***
  *     .o88b.  .d88b.  d8b   db db    db d88888b d8888b. d888888b      db      d888888b d8b   db db   dD .d8888. 
  *    d8P  Y8 .8P  Y8. 888o  88 88    88 88'     88  `8D `~~88~~'      88        `88'   888o  88 88 ,8P' 88'  YP 
  *    8P      88    88 88V8o 88 Y8    8P 88ooooo 88oobY'    88         88         88    88V8o 88 88,8P   `8bo.   
  *    8b      88    88 88 V8o88 `8b  d8' 88~~~~~ 88`8b      88         88         88    88 V8o88 88`8b     `Y8b. 
  *    Y8b  d8 `8b  d8' 88  V888  `8bd8'  88.     88 `88.    88         88booo.   .88.   88  V888 88 `88. db   8D 
  *     `Y88P'  `Y88P'  VP   V8P    YP    Y88888P 88   YD    YP         Y88888P Y888888P VP   V8P YP   YD `8888Y' 
  *                                                                                                               
  *                                                                                                               
  */

  /**
  * The purpose of this function is to convert links such as relative shortcut links ../SitePages etc...
  * @param theseProps 
  * @param itemVal 
  */
 export function convertLinks(theseProps, itemValL){
    let itemVal2 = itemValL;
    if (itemValL && itemValL.indexOf('../') === 0){
      itemVal2 = itemVal2.replace('../', (theseProps.pageContext.web.absoluteUrl + '/'));
    }
    return itemVal2;
  }

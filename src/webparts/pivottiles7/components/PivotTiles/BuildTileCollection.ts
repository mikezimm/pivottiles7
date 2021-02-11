
import { IPivotTilesProps, ICustomCategories } from './IPivotTilesProps';
import { IPivotTilesState } from './IPivotTilesState';
import { IPivotTileItemProps,  } from './../TileItems/IPivotTileItemProps';

import { getTheCurrentTime,} from '../../../../services/createAnalytics';
import {tileTime} from '../TileItems/IPivotTileItemProps';
import { getLocalMonths, ISO8601_week_no, makeSmallTimeObject, ITheTime } from '../../../../services/dateServices';
import { encodeDecodeString } from '../../../../services/stringServices';

import { removeLeadingUnderScore } from './BuildTileCategories';

import { LoadErrorIcon } from './PivotTiles';

import { convertLinks, parseMe } from './UtilsNew';

import { getQuarter } from './QuickBuckets';

export const jiraIcon = 'https://cdn.onlinewebfonts.com/svg/img_117214.png';

//SVG Converted here:  https://base64.guru/converter/encode/image/svg
export const defaultHubIcon = "data:image/png;base64,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";
export const defaultHubIcon2 = "data:image/png;base64,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";
export const defaultWebIcon = 'SharepointLogo';
export const defaultSPOIcon = 'SharepointLogo';

const monthCats = getLocalMonths('en-us','short');
const one_day = 1000 * 60 * 60 * 24;

//https://stackoverflow.com/a/33076482
export function getNameInitials( name : any ) {

  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;

}
























/***
 *    d8888b.  .d8b.  .d8888. d88888b      .88b  d88.  .d88b.  d8888b.       .d88b.  d8888b.    d88b d88888b  .o88b. d888888b 
 *    88  `8D d8' `8b 88'  YP 88'          88'YbdP`88 .8P  Y8. 88  `8D      .8P  Y8. 88  `8D    `8P' 88'     d8P  Y8 `~~88~~' 
 *    88oooY' 88ooo88 `8bo.   88ooooo      88  88  88 88    88 88   88      88    88 88oooY'     88  88ooooo 8P         88    
 *    88~~~b. 88~~~88   `Y8b. 88~~~~~      88  88  88 88    88 88   88      88    88 88~~~b.     88  88~~~~~ 8b         88    
 *    88   8D 88   88 db   8D 88.          88  88  88 `8b  d8' 88  .8D      `8b  d8' 88   8D db. 88  88.     Y8b  d8    88    
 *    Y8888P' YP   YP `8888Y' Y88888P      YP  YP  YP  `Y88P'  Y8888D'       `Y88P'  Y8888P' Y8888P  Y88888P  `Y88P'    YP    
 *                                                                                                                            
 *                                                                                                                            
 */

function createBaselineModObject() {

  let baseline : any = {};
  
  baseline.modifiedInfo = createIDateCategoryArrays('modified');
  baseline.createdInfo = createIDateCategoryArrays('created');
  baseline.categoryInfo = createIDateCategoryArrays('category');

  baseline.modifiedByInfo = createIPersonCategoryArrays('modifiedBy');
  baseline.createdByInfo = createIPersonCategoryArrays('createdBy');

  baseline.modifiedByTitles = [];
  baseline.modifiedByIDs = [];
  baseline.createdByTitles = [];
  baseline.createdByIDs = [];

  baseline.createdInfo.earliest = new Date(2033,1,1);
  baseline.createdInfo.latest = new Date(1999,1,1);

  baseline.modifiedInfo.earliest = new Date(2033,1,1);
  baseline.modifiedInfo.latest = new Date(1999,1,1);

  baseline.startTime = makeSmallTimeObject('');

  return baseline;

}





/***
 *     .d8b.  d8888b. d8888b.      d888888b d8b   db d88888b  .d88b.       d888888b  .d88b.       d888888b d888888b d88888b .88b  d88. 
 *    d8' `8b 88  `8D 88  `8D        `88'   888o  88 88'     .8P  Y8.      `~~88~~' .8P  Y8.        `88'   `~~88~~' 88'     88'YbdP`88 
 *    88ooo88 88   88 88   88         88    88V8o 88 88ooo   88    88         88    88    88         88       88    88ooooo 88  88  88 
 *    88~~~88 88   88 88   88         88    88 V8o88 88~~~   88    88         88    88    88         88       88    88~~~~~ 88  88  88 
 *    88   88 88  .8D 88  .8D        .88.   88  V888 88      `8b  d8'         88    `8b  d8'        .88.      88    88.     88  88  88 
 *    YP   YP Y8888D' Y8888D'      Y888888P VP   V8P YP       `Y88P'          YP     `Y88P'       Y888888P    YP    Y88888P YP  YP  YP 
 *                                                                                                                                     
 *                                                                                                                                     
 */


function addModifiedInfoToItem( item : any, theseProps, tc: any, includePeople: boolean ) {

      item.modified = (getColumnValue(theseProps,item,'colModified'));
      if ( includePeople === true ) {

          //Do all to modified
           item.modifiedByID = (getColumnValue(theseProps,item,'colModifiedById')); // This is required for addPersonVariations
           item.modifiedByTitle = (getColumnValue(theseProps,item,'colModifiedByTitle')); // This is required for addPersonVariations

           item = addPersonVariations(item,'modifiedBy');

           if(tc.modifiedByTitles.indexOf(item.modifiedByTitle) === -1) { tc.modifiedByTitles.push(item.modifiedByTitle); }
           if(tc.modifiedByIDs.indexOf(item.modifiedByID) === -1) { tc.modifiedByIDs.push(item.modifiedByID); }

          //Do all to created
           item.createdByID = (getColumnValue(theseProps,item,'colCreatedById')); // This is required for addPersonVariations
           item.createdByTitle = (getColumnValue(theseProps,item,'colCreatedByTitle')); // This is required for addPersonVariations
 
           item = addPersonVariations(item,'createdBy');
 
           if(tc.createdByTitles.indexOf(item.createdByTitle) === -1) { tc.createdByTitles.push(item.createdByTitle); }
           if(tc.createdByIDs.indexOf(item.createdByID) === -1) { tc.createdByIDs.push(item.createdByID); }

      }

      item = addDateVariations(item,'modified', tc.startTime);
      tc.modifiedInfo.cats = pushDatesToCategories(tc.modifiedInfo.cats, item.modifiedTime);
      item = localizeDateVariations(item,'modified');

      if ( includePeople === true ) {
           tc.modifiedByInfo.cats = pushPersonsToCategories(tc.modifiedByInfo.cats, item.modifiedBy);
      }

      if ( item.modifiedTime.cats.time[0] < tc.modifiedInfo.earliest )  { tc.modifiedInfo.earliest = item.modifiedTime.cats.time[0]; }
      if ( item.modifiedTime.cats.time[0] > tc.modifiedInfo.latest )  { tc.modifiedInfo.latest = item.modifiedTime.cats.time[0]; } 

      item.modifiedSimpleDate = item.modifiedTime.cats.dayYYYYMMDD[0];
      item.modifiedSimpleTime = item.modifiedTime.cats.locTime[0];
      item.modifiedSimpleDateTime = item.modifiedSimpleDate + ' - ' + item.modifiedSimpleTime;

      item.modifiedNote = item.modifiedSimpleDate;

      if ( includePeople === true ) {
        item.modifiedInitials = getNameInitials( item.modifiedByTitle ); 
          item.modifiedNote += ' ( ' + item.createdInitials + ' )';
      }

      //Do all to created
      item.created = (getColumnValue(theseProps,item,'colCreated'));

      item = addDateVariations(item,'created', tc.startTime);
      tc.createdInfo.cats = pushDatesToCategories(tc.createdInfo.cats, item.createdTime);
      item = localizeDateVariations(item,'created');
      
      if ( includePeople === true ) {
          tc.createdByInfo.cats = pushPersonsToCategories(tc.createdByInfo.cats, item.createdBy);
      }

      if ( item.createdTime.cats.time[0] < tc.createdInfo.earliest )  { tc.createdInfo.earliest = item.createdTime.cats.time[0] ; }
      if ( item.createdTime.cats.time[0] > tc.createdInfo.latest )  { tc.createdInfo.latest = item.createdTime.cats.time[0] ; } 

      item.createdSimpleDate = item.createdTime.cats.dayYYYYMMDD[0];
      item.createdSimpleTime = item.createdTime.cats.locTime[0];
      item.createdSimpleDateTime = item.createdSimpleDate + ' - ' + item.createdSimpleTime;
      item.createdNote = item.createdSimpleDate; // + ' ( ' + item.createdInitials + ' )';

      if ( includePeople === true ) {
          item.createdInitials = getNameInitials( item.createdByTitle );   
          item.createdNote += ' ( ' + item.createdInitials + ' )';
      }

    return { item: item, tc: tc };

}






/***
 *    .d8888. d88888b d888888b      .88b  d88.  .d88b.  d8888b.       .o88b.  .d8b.  d888888b .d8888. 
 *    88'  YP 88'     `~~88~~'      88'YbdP`88 .8P  Y8. 88  `8D      d8P  Y8 d8' `8b `~~88~~' 88'  YP 
 *    `8bo.   88ooooo    88         88  88  88 88    88 88   88      8P      88ooo88    88    `8bo.   
 *      `Y8b. 88~~~~~    88         88  88  88 88    88 88   88      8b      88~~~88    88      `Y8b. 
 *    db   8D 88.        88         88  88  88 `8b  d8' 88  .8D      Y8b  d8 88   88    88    db   8D 
 *    `8888Y' Y88888P    YP         YP  YP  YP  `Y88P'  Y8888D'       `Y88P' YP   YP    YP    `8888Y' 
 *                                                                                                    
 *                                                                                                    
 */

function setModifiedCats (  tc, pivotProps ) {

  tc.createdInfo.cats = sortAllDateCategories(tc.createdInfo.cats);
  tc.modifiedInfo.cats = sortAllDateCategories(tc.modifiedInfo.cats);
  tc.categoryInfo.cats = sortAllDateCategories(tc.categoryInfo.cats);
  tc.modifiedByInfo.cats = sortAllPersonCategories(tc.modifiedByInfo.cats);
  tc.createdByInfo.cats = sortAllPersonCategories(tc.createdByInfo.cats);

  /**
   *   In this area, go back and localize date categories like we do for items above.
   */

  tc.modifiedInfo.range = (Math.round(tc.modifiedInfo.latest.getTime() - tc.modifiedInfo.earliest.getTime()) / (one_day));
  tc.createdInfo.range = (Math.round(tc.createdInfo.latest.getTime() - tc.createdInfo.earliest.getTime()) / (one_day));

  tc.createdInfo.bestFormat = findBestDateCategory(tc.createdInfo.cats, pivotProps.maxPivotChars);
  tc.modifiedInfo.bestFormat = findBestDateCategory(tc.modifiedInfo.cats, pivotProps.maxPivotChars);

  tc.modifiedByInfo.bestFormat = findBestPersonCategory(tc.modifiedByInfo.cats, pivotProps.maxPivotChars);
  tc.createdByInfo.bestFormat = findBestPersonCategory(tc.createdByInfo.cats, pivotProps.maxPivotChars);

  return tc;

}






/***
 *    .d8888. d88888b d888888b      d8888b. d88888b .d8888. d888888b      d88888b  .d88b.  d8888b. .88b  d88.  .d8b.  d888888b 
 *    88'  YP 88'     `~~88~~'      88  `8D 88'     88'  YP `~~88~~'      88'     .8P  Y8. 88  `8D 88'YbdP`88 d8' `8b `~~88~~' 
 *    `8bo.   88ooooo    88         88oooY' 88ooooo `8bo.      88         88ooo   88    88 88oobY' 88  88  88 88ooo88    88    
 *      `Y8b. 88~~~~~    88         88~~~b. 88~~~~~   `Y8b.    88         88~~~   88    88 88`8b   88  88  88 88~~~88    88    
 *    db   8D 88.        88         88   8D 88.     db   8D    88         88      `8b  d8' 88 `88. 88  88  88 88   88    88    
 *    `8888Y' Y88888P    YP         Y8888P' Y88888P `8888Y'    YP         YP       `Y88P'  88   YD YP  YP  YP YP   YP    YP    
 *                                                                                                                             
 *                                                                                                                             
 */


function setBestFormat ( response, tc, includePeople: boolean  ) {

  
  for (let item of response) {
    item.created = item.createdTime.cats[tc.createdInfo.bestFormat][0];
    item.createdTime.cats.bestFormat[0] = tc.createdInfo.bestFormat;
    item.modified = item.modifiedTime.cats[tc.modifiedInfo.bestFormat][0];
    item.modifiedTime.cats.bestFormat[0] = tc.modifiedInfo.bestFormat;

    if ( includePeople === true ) {
         item.createdBy.cats.bestFormat[0] = tc.createdByInfo.bestFormat;
         item.modifiedBy.cats.bestFormat[0] = tc.modifiedByInfo.bestFormat;
    }

  }

  return response;

}






/***
 *    .d8888. d88888b d888888b      db       .d8b.  .d8888. d888888b       .o88b.  .d8b.  d888888b 
 *    88'  YP 88'     `~~88~~'      88      d8' `8b 88'  YP `~~88~~'      d8P  Y8 d8' `8b `~~88~~' 
 *    `8bo.   88ooooo    88         88      88ooo88 `8bo.      88         8P      88ooo88    88    
 *      `Y8b. 88~~~~~    88         88      88~~~88   `Y8b.    88         8b      88~~~88    88    
 *    db   8D 88.        88         88booo. 88   88 db   8D    88         Y8b  d8 88   88    88    
 *    `8888Y' Y88888P    YP         Y88888P YP   YP `8888Y'    YP          `Y88P' YP   YP    YP    
 *                                                                                                 
 *                                                                                                 
 */

function setLastCat ( tc, pivotProps ) {

  tc.modifiedInfo = setLastCategoryPer(tc.modifiedInfo);
  tc.createdInfo = setLastCategoryPer(tc.createdInfo);
  tc.modifiedByInfo = setLastCategoryPerson(tc.modifiedByInfo);
  tc.createdByInfo = setLastCategoryPerson(tc.createdByInfo);
  
  //tc.categoryInfo = setLastCategoryPer(tc.categoryInfo);
  //if (!tc.categoryInfo.lastCategory) { tc.categoryInfo.lastCategory = pivotProps.setTab }
  tc.categoryInfo.lastCategory = pivotProps.setTab;

  return tc;
}


/***
 *    .d8888. d88888b d888888b       .o88b. db    db .d8888. d888888b      .d8888. d88888b  .d8b.  d8888b.  .o88b. db   db 
 *    88'  YP 88'     `~~88~~'      d8P  Y8 88    88 88'  YP `~~88~~'      88'  YP 88'     d8' `8b 88  `8D d8P  Y8 88   88 
 *    `8bo.   88ooooo    88         8P      88    88 `8bo.      88         `8bo.   88ooooo 88ooo88 88oobY' 8P      88ooo88 
 *      `Y8b. 88~~~~~    88         8b      88    88   `Y8b.    88           `Y8b. 88~~~~~ 88~~~88 88`8b   8b      88~~~88 
 *    db   8D 88.        88         Y8b  d8 88b  d88 db   8D    88         db   8D 88.     88   88 88 `88. Y8b  d8 88   88 
 *    `8888Y' Y88888P    YP          `Y88P' ~Y8888P' `8888Y'    YP         `8888Y' Y88888P YP   YP 88   YD  `Y88P' YP   YP 
 *                                                                                                                         
 *                                                                                                                         
 */

function setCustSearch( custCategories, theseProps, includePeople: boolean ) {

  let custSearch: any = {};
  custSearch.Title = true;
  custSearch.Desc = true;
  custSearch.Href = true;
  custSearch.Cate = true;
  custSearch.ModBy = true;
  custSearch.CreateBy = true;

  if ( custCategories.type !== 'tileCategory' ) {
    if ( custCategories.column && custCategories.column.length > 0 ) {
      if ( custCategories.column.indexOf( theseProps.colTitleText ) === -1 ) { custSearch.Title = false; }
      if ( custCategories.column.indexOf( theseProps.colHoverText ) === -1 ) { custSearch.Desc = false; }
      if ( custCategories.column.indexOf( theseProps.colGoToLink ) === -1 ) { custSearch.Href = false; }
      if ( custCategories.column.indexOf( theseProps.colCategory ) === -1 ) { custSearch.Cate = false; }
      if ( includePeople === true ) {
          if ( custCategories.column.indexOf( 'ModifiedBy/Title' ) === -1 ) { custSearch.ModBy = false; }
          if ( custCategories.column.indexOf( 'CreatedBy/Title' ) === -1 ) { custSearch.CreateBy = false; }
      }


    }
  }

  return custSearch;

}


function getStyleProp ( input: string[] , what: 'font' | 'background' | 'size' | 'top' | 'icon' ) {

  let availableStyles = input.join(';');
  let theseStyles = availableStyles.split(';');

  let resultStyle = '';
  if ( what === 'font' ) { resultStyle = 'darkgray'; }
  if ( what === 'background' ) { resultStyle = 'white'; }
  if ( what === 'size' ) { resultStyle = '65'; }
  if ( what === 'top' ) { resultStyle = '-10px'; }


  theseStyles.map( c => {
    let thisColor = c.split('=');
    if ( thisColor.length === 2 ) {
      if ( thisColor[0] === what) { resultStyle=thisColor[1] ; }
    }
  });

  return resultStyle;

}


function pushOtherTab ( type:  responseType, pivotProps: IPivotTilesProps ) {
  let result = true;

  if ( type === 'hubs' ) { 
    if ( pivotProps.fetchInfo.hubsOthers !== true ) { return false ; } }

  if ( type === 'subs' ) { 
    if ( pivotProps.fetchInfo.subsOthers !== true ) { return false ; } }

  if ( type === 'lists' ) { 
    if ( pivotProps.fetchInfo.listOthers !== true && pivotProps.fetchInfo.libsOthers !== true ) { return false ; } }

  if ( type === 'groups' ) { 
    if ( pivotProps.fetchInfo.groupsOthers !== true ) { return false ; } }

  if ( type === 'users' ) { 
    if ( pivotProps.fetchInfo.usersOthers !== true ) { return false ; } }
  
  return result;

}



/***
 *    d8888b. db    db d888888b db      d8888b.      d88888b d888888b d8b   db  .d8b.  db           d888888b d888888b db      d88888b       .o88b.  .d88b.  db      
 *    88  `8D 88    88   `88'   88      88  `8D      88'       `88'   888o  88 d8' `8b 88           `~~88~~'   `88'   88      88'          d8P  Y8 .8P  Y8. 88      
 *    88oooY' 88    88    88    88      88   88      88ooo      88    88V8o 88 88ooo88 88              88       88    88      88ooooo      8P      88    88 88      
 *    88~~~b. 88    88    88    88      88   88      88~~~      88    88 V8o88 88~~~88 88              88       88    88      88~~~~~      8b      88    88 88      
 *    88   8D 88b  d88   .88.   88booo. 88  .8D      88        .88.   88  V888 88   88 88booo.         88      .88.   88booo. 88.          Y8b  d8 `8b  d8' 88booo. 
 *    Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'      YP      Y888888P VP   V8P YP   YP Y88888P         YP    Y888888P Y88888P Y88888P       `Y88P'  `Y88P'  Y88888P 
 *                                                                                                                                                                  
 *                                                                                                                                                                  
 */

function buildFinalTileCollection ( response: any, type:  responseType, theseProps: any, custSearch, custCategories, pivotProps: IPivotTilesProps, includePeople: boolean, fixedURL, currentHero ) {
  
  let showOtherTab = false;
  let departmentId = '';
  let pushOther = pushOtherTab( type, pivotProps );

  console.log('buildFinalTileCollection - all response items:', response );
  let tileCollection: IPivotTileItemProps[] = response.map(item => {

    let hasLoadErrorIcon = item.category && item.category.indexOf(LoadErrorIcon) > -1 ? true : false;

    let itemPushOther = pushOther;

    let modifiedByTitle = null;
    let createdByTitle = null;
    if ( includePeople === true ) {
        modifiedByTitle = getColumnValue(pivotProps,item,'colModifiedByTitle');
        createdByTitle = getColumnValue(pivotProps,item,'colCreatedByTitle');
    }
    
    let title = getColumnValue(theseProps,item,'colTitleText');

    let description = getColumnValue(theseProps,item,'colHoverText');

    let href = null;
    if ( item.sourceType === pivotProps.fetchInfo.listCategory ) {
      let webUrl = item.ParentWebUrl;
      let EntityTypeName = encodeDecodeString( item.EntityTypeName, 'decode' );
      //For lists, you need to remove the string "List" from end of EntityTypeName property
      EntityTypeName = EntityTypeName.substr( 0, EntityTypeName.length - 4 );
      href = webUrl + '/lists/' + EntityTypeName;

      if ( itemPushOther === true && pivotProps.fetchInfo.listOthers !== true ) { itemPushOther = false; }

    } else if ( item.sourceType === pivotProps.fetchInfo.libsCategory ) {
      let webUrl = item.ParentWebUrl;
      let EntityTypeName = encodeDecodeString( item.EntityTypeName, 'decode' );
      href = webUrl + '/' + EntityTypeName;

      if ( itemPushOther === true && pivotProps.fetchInfo.libsOthers !== true ) { itemPushOther = false; }

    } else {
      href = getColumnValue(theseProps,item,'colGoToLink');

    }

    let category = getColumnValue(theseProps,item,'colCategory');
    if ( category === undefined || category === null ) { category = []; }
    
    let categoryCopy = JSON.stringify(category);

    //2020-11-16: Added this before Others tab is added
    let nonSubsiteCategories = category.length;

    //Need to resolve when category is undefined in case that webpart prop is empty
    let testCategory = category === undefined || category === null ? false : true;
    if ( testCategory === false || category.length === 0 ) { 
      if ( itemPushOther === true ) { category = [pivotProps.otherTab] ; }
    }

    //Can't do specific type here or it will break the multi-typed logic below
    let custCatLogi : any = custCategories.logic;
    let custBreak : boolean = custCategories.break;
    
    if ( custCategories.type === 'tileCategory' ) {

    } else if ( (custCategories.type === 'semiColon1' && custCatLogi.length > 0 ) ||
               ( custCategories.type === 'semiColon2' && custCatLogi.length > 0 ) ) {
      category = [];

      custCatLogi.map( custCat => {

        //These regex expressions work
        //let c = "E"
        //data2 = new RegExp( "\\b" + c + "\\b", 'i');
        //let data3 = new RegExp( "\\bl\\b", 'i');
        //let replaceMe2 = cat.replace(data3,'X')

        let att = 'i';
        let match = false;

        /**
         * 2020-11-25:  Added testHref so that if you define custom Category === 'SharePoint', it doesnt show everything in your tenant
         */
        let testHref = href + '';
        if ( href.toLowerCase().indexOf( pivotProps.tenant ) === 0 ) {
          testHref = href.substring( pivotProps.tenant.length );
        }

        var regex = new RegExp("\\b" + custCat + "\\b", att);
        if (  custSearch.Title && title.search(regex) > -1 ) {
          match = true;
        } else if (  custSearch.Desc && description.search(regex) > -1 ) {
          match = true;
        } else if (  custSearch.Href && testHref.search(regex) > -1 ) {
          match = true;
        } else if (  custSearch.Cate && categoryCopy.search(regex) > -1 ) {
          match = true;
        } else if ( includePeople === true ) {
          if (  custSearch.ModBy && modifiedByTitle.search(regex) > -1 ) {
              match = true;
            } else if (  custSearch.CreateBy && createdByTitle.search(regex) > -1 ) {
              match = true;
            }
        }

        let useBreak = custBreak === true || custCat.break === true ? true : false;
        if ( useBreak === true && nonSubsiteCategories > 0 ) { match = false; }

        let check4Tab = removeLeadingUnderScore(custCat);
        if ( match === true ) { category.push( check4Tab ) ; }

      });

      //2020-11-16: changed length check === 1 because it should always have subsites category
      if ( category.length === 0 ) {  if ( itemPushOther === true ) { category.push ( pivotProps.otherTab ) ;  }  }

    } else if ( custCategories.type === 'custom' && custCatLogi.length > 0 ) {
      /**
           * export interface ICustomLogic {

            category: string;
            regex?: string;
            att?: string; // regex attributes "g", "i", "m" - default if nothing here is "i"
            eval?: string; // Used in place of regex

          }
      */
        
        category = [];

      //Testing:
      //[   {     "category": "<20",     "eval": "item.modifiedTime.cats.age[0] <= 20"   },   {     "category": "<40",     "eval": "item.modifiedTime.cats.age[0] <= 40"   } ]
        custCatLogi.map( (custCat ) => {
          let match = false;

          if ( custCat.eval && custCat.eval.length > 0 ) {
            let eText = eval( custCat.eval ) ;
            if ( eText === true ) { match = true; }

          } else if ( custCat.regex && custCat.regex.length > 0 ) { 

            let att = custCat.att === undefined || custCat.att === null ? 'i' : custCat.att;
            var regex = new RegExp(custCat.regex, att);
            if (  custSearch.Title && title.search(regex) > -1 ) {
              match = true;
            } else if (  custSearch.Desc && description.search(regex) > -1 ) {
              match = true;
            } else if (  custSearch.Href && href.search(regex) > -1 ) {
              match = true;
            } else if (  custSearch.Cate && categoryCopy.search(regex) > -1 ) {
              match = true;

            } else if ( includePeople === true ) {
              if (  custSearch.ModBy && modifiedByTitle.search(regex) > -1 ) {
                  match = true;
                } else if (  custSearch.CreateBy && createdByTitle.search(regex) > -1 ) {
                  match = true;
                }
            }

          }

          let useBreak = custBreak === true || custCat.break === true ? true : false;
          if ( useBreak === true && nonSubsiteCategories > 0 ) { match = false; }

          let check4Tab = removeLeadingUnderScore(custCat.category);
          if ( match === true ) { category.push( check4Tab ) ; }

        });

        //2020-11-16: changed length check === 1 because it should always have subsites category
        if ( category.length === 0 ) {  if ( itemPushOther === true ) { category.push ( pivotProps.otherTab ) ;  }  }

    } else {

    }

    if ( pivotProps.otherTab && pivotProps.otherTab.length > 0 && category[0] == pivotProps.otherTab ) { 
      showOtherTab = true ;
    }

    let descriptionSuffix = '';
    if ( item.sourceType === pivotProps.fetchInfo.libsCategory || item.sourceType === pivotProps.fetchInfo.listCategory || item.sourceType === pivotProps.fetchInfo.subsitesCategory ) {
      descriptionSuffix =  [ item.sourceType, item.createdNote, item.modifiedNote ].join('; ');
    }

    if ( description ) { description += ' ; ' + descriptionSuffix ; } else { description = descriptionSuffix ; }


    let sourceType = item.sourceType;

    let color = ifNotExistsReturnNull( item[pivotProps.colColor] );
    let imageUrl = getColumnValue(theseProps, item,'colImageLink');

    let imageHeight = pivotProps.imageHeight;
    let defFabricSize = `;size=50;top=-${imageHeight/5}px;background=white;`;

    if ( hasLoadErrorIcon === true ) {
      color = 'font=darkred;' + defFabricSize ;
      imageUrl = LoadErrorIcon ;
      category[category.indexOf( pivotProps.otherTab )] = 'ErrorMessage';
    } else if ( sourceType === pivotProps.fetchInfo.libsCategory ) {
      if ( !color || color === '' ) { color = 'font=darkgray;' + defFabricSize + pivotProps.fetchInfo.libsIconStyles ; }
      if ( !imageUrl || imageUrl === '' ) { imageUrl = getStyleProp([ pivotProps.fetchInfo.libsIconStyles ], 'icon' ) ; }
      if ( !imageUrl || imageUrl === '' ) { imageUrl = 'FolderHorizontal' ; }   

    } else if ( sourceType === pivotProps.fetchInfo.listCategory ) {
      if ( !color || color === '' ) { color = 'font=darkslateblue;' + defFabricSize  + 'background=LightGoldenRodYellow;' + pivotProps.fetchInfo.listIconStyles ; }
      if ( !imageUrl || imageUrl === '' ) { imageUrl = getStyleProp([ pivotProps.fetchInfo.listIconStyles ], 'icon' ) ; }
      if ( !imageUrl || imageUrl === '' ) { imageUrl = 'BulletedList2' ; }   
      
    } else if ( sourceType === pivotProps.fetchInfo.subsitesCategory ) {
      if ( !color || color === '' ) { color = 'font=darkslateblue;' + defFabricSize; }
      if ( !imageUrl || imageUrl === '' ) { imageUrl = defaultWebIcon ; }

    } else if ( sourceType === pivotProps.fetchInfo.hubsCategory ) {
      departmentId = departmentId ? departmentId : item.departmentId;
      if ( !color || color === '' ) { color = 'font=red;' + defFabricSize; }
      if ( !imageUrl || imageUrl === '' ) { 
        imageUrl = departmentId === '{' + item.SiteId + '}' ? defaultHubIcon2 : defaultHubIcon ;
      }
    } else if ( sourceType === 'Files' ) {
      if ( !imageUrl || imageUrl === '' ) {
        if ( href.indexOf('.xls') > 0 ) {
          if ( !color || color === '' ) { color = 'font=darkgreen;' + defFabricSize; }
          if ( !imageUrl || imageUrl === '' ) { imageUrl = 'ExcelDocument' ; }
        } else if ( href.indexOf('.doc') > 0 ) {
          if ( !color || color === '' ) { color = 'font=rgb(43, 87, 154);' + defFabricSize; }
          if ( !imageUrl || imageUrl === '' ) { imageUrl = 'WordDocument' ; }
        } else if ( href.indexOf('.ppt') > 0 ) {
          if ( !color || color === '' ) { color = 'font=darkgreen;' + defFabricSize; }
          if ( !imageUrl || imageUrl === '' ) { imageUrl = 'PowerPointDocument' ; }
        }
      }
      //sourceType = "Files"
    } else if ( !imageUrl || imageUrl === '' ) {
      if ( href.toLowerCase().indexOf('github') > -1 ) { imageUrl = 'Github' ; color = 'background=white;' ; }
      else if ( href.toLowerCase().indexOf('.sharepoint.com') > -1 ) { 
        imageUrl = defaultSPOIcon ; 
        if ( !color || color === '' ) { color = 'font=rgb(0, 120, 215);' + defFabricSize ; }

      } else if ( href.toLowerCase().indexOf('teams') > -1 ) { 
        imageUrl = 'TeamsLogo' ; 
        if ( !color || color === '' ) { color = 'font=#464EB8;' + defFabricSize ; }

      } else if ( href.toLowerCase().indexOf('jira') > -1 ) { 
        imageUrl = jiraIcon ; 
        if ( !color || color === '' ) { color = 'font=black;' + defFabricSize ; }

      } else if ( href.toLowerCase().indexOf('powerbi') > -1 ) { 
        imageUrl = 'PowerBILogo' ; 
        if ( !color || color === '' ) { color = 'font=black;' + defFabricSize + ';background=yellow;' ; }

      } else if ( href.indexOf('.xls') > 0 ) {
        if ( !color || color === '' ) { color = 'font=darkgreen;' + defFabricSize; }
        if ( !imageUrl || imageUrl === '' ) { imageUrl = 'ExcelDocument' ; }

      } else if ( href.indexOf('.doc') > 0 ) {
        if ( !color || color === '' ) { color = 'font=rgb(43, 87, 154);' + defFabricSize; }
        if ( !imageUrl || imageUrl === '' ) { imageUrl = 'WordDocument' ; }

      } else if ( href.indexOf('.ppt') > 0 ) {
        if ( !color || color === '' ) { color = 'font=rgb(183, 71, 42);' + defFabricSize; }
        if ( !imageUrl || imageUrl === '' ) { imageUrl = 'PowerPointDocument' ; }

      } else if ( href.indexOf('powerapps') > 0 ) {
        if ( !color || color === '' ) { color = 'font=rgb(0, 119, 255);' + defFabricSize; }
        if ( !imageUrl || imageUrl === '' ) { imageUrl = 'PowerAppsLogo' ; }
        
      } else if ( href.indexOf('forms.office.com') > 0 ) {
        if ( !color || color === '' ) { color = 'font=darkgreen;' + defFabricSize; }
        if ( !imageUrl || imageUrl === '' ) { imageUrl = 'OfficeFormsLogo' ; }
        
      } else if ( href.indexOf('.microsoftstream.') > 0 ) {
        if ( !color || color === '' ) { color = 'font=rgb(195, 0, 82);' + defFabricSize; }
        if ( !imageUrl || imageUrl === '' ) { imageUrl = 'StreamLogo' ; }
        
      } else if ( href.indexOf('outlook.live') > 0 ) {
        if ( !color || color === '' ) { color = 'font=rgb(0, 120, 215);' + defFabricSize; }
        if ( !imageUrl || imageUrl === '' ) { imageUrl = 'OutlookLogo' ; }
        
      } else if ( href.indexOf('onenote.com') > 0 ) {
        if ( !color || color === '' ) { color = 'font=rgb(119, 25, 170);' + defFabricSize; }
        if ( !imageUrl || imageUrl === '' ) { imageUrl = 'OneNoteLogo' ; }
        
      } else if ( href.indexOf('yammer.com') > 0 ) {
        if ( !color || color === '' ) { color = 'font=rgb(0, 120, 215);' + defFabricSize; }
        if ( !imageUrl || imageUrl === '' ) { imageUrl = 'YammerLogo' ; }
        
      } else if ( href.indexOf('planner.com') > 0 ) {
        if ( !color || color === '' ) { color = 'font=rgb(49, 117, 47);' + defFabricSize; }
        if ( !imageUrl || imageUrl === '' ) { imageUrl = 'PlannerLogo' ; }
        
      }
      
    }

    
    /*
    if ( href.toLowerCase().indexOf( pivotProps.tenant ) === 0 ) {
      href = href.substring( pivotProps.tenant.length );
    }
    */

    //sortValue

    let sortValue = getColumnValue(theseProps,item,'colSort');
    if ( !sortValue ) { sortValue = '0'; }
    let newStringSort : string = '';
    if ( typeof sortValue === 'number' ) { newStringSort = sortValue.toString() ; } else { newStringSort = sortValue ; }

    //2020-12-04:  Errored here on Site Pages when "Category" was just a label with my name:  Author
    //2020-12-04: Added this for error when having SitePages library and Column based tile category...
    if ( typeof category === 'string' ) {
      //Caused error about not able to load tiles due to tile category.
      category = [ category ];
    }

    category.push(sourceType);

    let idProp = theseProps.id ? theseProps.id : 'Id';
    let itemId = item[ idProp ];

     return {

      sourceType: sourceType,
      sortValue: newStringSort,

      id: itemId,
      
      imageUrl: imageUrl,

      title: title,

      description: description,

      href: href,

      category: category,

      setTab: pivotProps.setTab,
      setSize: pivotProps.setSize,
      heroType: pivotProps.heroType,
      heroCategory: currentHero,

      Id: itemId,

      //ifNotExistsReturnNull
      options: ifNotExistsReturnNull( item[theseProps.colTileStyle] ),

      color: color,

      imgSize: ifNotExistsReturnNull( item[pivotProps.colSize] ),

      listWebURL: fixedURL.replace("ReplaceID",itemId),
      listTitle: pivotProps.listTitle,

      target:  ifNotExistsReturnNull( item[pivotProps.colOpenBehaviour] ),
      
      setRatio: pivotProps.setRatio,
      setImgFit: pivotProps.setImgFit,
      setImgCover: pivotProps.setImgCover,
      onHoverZoom: pivotProps.onHoverZoom,

      modified: item.modified,
      modifiedBy: item.modifiedBy,
      createdBy: item.createdBy,
      modifiedByID: getColumnValue(theseProps,item,'colModifiedById'),
      //2020-11-16: Not required for web ==>>  modifiedByTitle: modifiedByTitle,
      created: item.created,
      createdByID: getColumnValue(theseProps,item,'colCreatedById'),
      //2020-11-16: Not required for web ==>>  createdByTitle: createdByTitle,
      modifiedTime: item.modifiedTime,
      createdTime: item.createdTime,

      createdSimpleDate: item.createdSimpleDate,
      createdSimpleTime: item.createdSimpleTime,
      createdSimpleDateTime: item.createdSimpleDateTime,
      createdInitials: '', //2020-11-16: Not required for web ==>>  item.createdInitials,
      createdNote: item.createdNote,

      modifiedSimpleDate: item.modifiedSimpleDate,
      modifiedSimpleTime: item.modifiedSimpleTime,
      modifiedSimpleDateTime: item.modifiedSimpleDateTime,
      modifiedInitials: '', //2020-11-16: Not required for web ==>>  item.modifiedInitials,
      modifiedNote: item.modifiedNote,

    };

  });


  /**
   * Resort and put Hub first
   */
  let resort1 : IPivotTileItemProps[] = [];
  if ( type === 'hubs' ) {

    /**
     * 
    * Function to sort alphabetically an array of objects by some specific key.
    *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript#:~:text=%20How%20to%20sort%20alphabetically%20an%20array%20of,Finally%2C%20to%20sort%20an%20array%20of...%20More%20
    */
    tileCollection.sort((a,b) => a['sortValue'].localeCompare(b['sortValue']));

    tileCollection.map( item => {
      let anyItem: any = item;
      if ( departmentId === '{' + anyItem.id + '}' ) { resort1.push( item ) ; }
    });

    tileCollection.map( item => {
      let anyItem: any = item;
      if ( departmentId !== '{' + anyItem.id + '}' ) { resort1.push( item ) ; }
    });

  } else {
    resort1 = tileCollection;
  }

  let result = {
    tileCollection: resort1,
    showOtherTab: showOtherTab,
  };

  return result;

}




/**
 * This function determines if item is visible using the Title and Description string in "Filtering" webpart props.
 * This process was added as a check after the response was returned to simplify rest filter
 * @param item 
 * @param theseProps 
 * @param pivotProps 
 */
  function isVisibleItem( item , theseProps, pivotProps ) {

    let isVisible : boolean = true;

    let filterTitle = pivotProps.filterTitle ;
    let titleEquals = filterTitle.indexOf('<>') === 0 ? false : true;
    filterTitle = filterTitle.replace('<>','');

    let filterDescription = pivotProps.filterDescription;
    let descriptionEquals = filterDescription.indexOf('<>') === 0 ? false : true;
    filterDescription = filterDescription.replace('<>','');

    let title = ( item[ theseProps.colTitleText ] );
    let desc = ( item[ theseProps.colHoverText ] );


    if ( filterTitle && filterTitle.length > 0 ) {

      if ( titleEquals ) { //Check if title contains value.  if not return isVisible = false;
        if ( title === '' || title === null || title === undefined ) { isVisible = false; } 
        else if ( title.indexOf( filterTitle ) < 0 )  { isVisible = false ; }


      } else { //Check if title does NOT contain value.  if it does return isVisible = false;
        if ( title !== '' && title !== undefined && title !== null && title !== '' && title.indexOf( filterTitle ) > -1 ) { isVisible = false ; }

      }

    }

    if ( filterDescription && filterDescription.length > 0 ) {

      if ( descriptionEquals ) { //Check if title contains value.  if not return isVisible = false;

        if ( desc === '' || desc === null || desc === undefined ) { isVisible = false; } 
        else if ( desc.indexOf( filterDescription ) < 0 )  { isVisible = false ; }

      } else { //Check if title does NOT contain value.  if it does return isVisible = false;
        if ( desc !== '' && desc !== undefined && desc !== null && desc !== '' && desc.indexOf( filterDescription ) > -1 ) { isVisible = false ; }

      }
    }

    return isVisible;

  }


  function getTheseProps( type: responseType , pivotProps: IPivotTilesProps ) {
    let theseProps : any = null;

    if ( type === 'items') {
      return pivotProps;
    }

    theseProps = {

      colCreated: 'Created',
      colTitleText: 'Title',
      colHoverText: 'Description',
      colSort: 'Title',

      colCategory: null,
      colTileStyle: null,
      colColor: null,
      colSize: null,

    };

    if ( type === 'subs') {

      theseProps.colModified = 'LastItemUserModifiedDate';
      theseProps.colImageLink = 'SiteLogoUrl';
      theseProps.colGoToLink = 'ServerRelativeUrl';
      theseProps.id = 'Id';

    } else if ( type === 'hubs') {
      theseProps.colModified = 'LastModifiedTime';
      theseProps.colImageLink = 'SiteLogo', //'SiteLogoUrl';  2021-02-11:  Changed with new search query
      theseProps.colHoverText = 'SiteDescription', //'SiteDescription';  2021-02-11:  Changed with new search query
      theseProps.colGoToLink = 'SPSiteUrl';

      theseProps.colModifiedById = 'ModifiedById';
      theseProps.colModifiedByTitle = 'ModifiedBy';
      theseProps.colCreatedById = 'CreatedById';
      theseProps.colCreatedByTitle = 'CreatedBy';

      theseProps.id = 'SiteId';

    } else if ( type === 'lists') {
      theseProps.colModified = 'LastItemUserModifiedDate';
      theseProps.colImageLink = '';
      theseProps.colGoToLink = 'ParentWebUrl+EntityTypeName';
      theseProps.id = 'Id';

    } 

    return theseProps;

  }


  

/***
 *    d8888b. db    db d888888b db      d8888b.      d888888b d888888b db      d88888b       .o88b.  .d88b.  db      db           d88888b d8888b.      d8888b. d88888b .d8888. d8888b. 
 *    88  `8D 88    88   `88'   88      88  `8D      `~~88~~'   `88'   88      88'          d8P  Y8 .8P  Y8. 88      88           88'     88  `8D      88  `8D 88'     88'  YP 88  `8D 
 *    88oooY' 88    88    88    88      88   88         88       88    88      88ooooo      8P      88    88 88      88           88ooo   88oobY'      88oobY' 88ooooo `8bo.   88oodD' 
 *    88~~~b. 88    88    88    88      88   88         88       88    88      88~~~~~      8b      88    88 88      88           88~~~   88`8b        88`8b   88~~~~~   `Y8b. 88~~~   
 *    88   8D 88b  d88   .88.   88booo. 88  .8D         88      .88.   88booo. 88.          Y8b  d8 `8b  d8' 88booo. 88booo.      88      88 `88.      88 `88. 88.     db   8D 88      
 *    Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'         YP    Y888888P Y88888P Y88888P       `Y88P'  `Y88P'  Y88888P Y88888P      YP      88   YD      88   YD Y88888P `8888Y' 88      
 *                                                                                                                                                                                     
 *                                                                                                                                                                                     
 */

 export type responseType = 'subs' | 'hubs' | 'lists' | 'items' | 'groups' | 'users' ;

export function buildTileCollectionFromAllResponse( type:  responseType, response, pivotProps: IPivotTilesProps , custCategories: ICustomCategories, fixedURL, currentHero){

  //           let tileCollection = response.map(item=>new ClassTile(item));
  //          https://stackoverflow.com/questions/47755247/typescript-array-map-return-object

    // console.log( 'buildTileCollectionFromResponse pivotProps:', pivotProps );

    let includePeople =  type === 'items' ? true : false ;

    let tc = createBaselineModObject();

    let theseProps = getTheseProps( type, pivotProps ) ;

    let newResponse : any[] = [];
    let alwaysVisible : any = type === 'items' ? false : !pivotProps.filterEverything ;

    for (let item of response) {

      let isVisible = alwaysVisible === false ? isVisibleItem( item , theseProps, pivotProps ) : true ;

      if ( isVisible === true ) {

        let modResults = addModifiedInfoToItem( item, theseProps, tc, includePeople );
        tc = modResults.tc;
        item = modResults.item;
        newResponse.push( item );
      }

    }

    tc = setModifiedCats( tc, pivotProps );

    newResponse = setBestFormat( newResponse, tc, includePeople );

    tc = setLastCat( tc, pivotProps );

    let endTime = getTheCurrentTime();

    let custSearch: any = setCustSearch ( custCategories, theseProps, includePeople );

    let finalTileCollection = buildFinalTileCollection ( newResponse, type, theseProps, custSearch, custCategories, pivotProps, includePeople , fixedURL, currentHero );

    return {
      tileCollection: finalTileCollection.tileCollection,
      custCategories: custCategories,
      createdInfo: tc.createdInfo,
      modifiedInfo: tc.modifiedInfo,
      categoryInfo: tc.categoryInfo,
      createdByInfo: tc.createdByInfo,
      modifiedByInfo: tc.modifiedByInfo,

      modifiedByTitles: tc.modifiedByTitles.sort(),
      modifiedByIDs: tc.modifiedByIDs.sort(),
      createdByTitles: tc.createdByTitles.sort(),
      createdByIDs: tc.createdByIDs.sort(),
      showOtherTab: finalTileCollection.showOtherTab,

    };

  }  // END public static buildTileCollectionFromResponse(response, pivotProps, fixedURL, currentHero){
    
























  function isSameTimeBucket( timeCat : IDateInfo, theTime : ITheTime, compare: 'year' | 'date' | 'week' | 'month' | 'q') {
    //"item." + field + "Time.cats.wk[0] + item." + field + "Time.cats.year[0] === startTime.week + startTime.year"

    let isSameYear = timeCat.cats.yr[0] === theTime.year ? true : false ;
    if ( compare === 'year' ) { return isSameYear ; }

    let isSameQ = getQuarter(timeCat.cats.time[0]) === getQuarter(theTime.now) ? true : false ;
    if ( compare === 'q' ) { return isSameYear && isSameQ ? true : false ; }

    //timeCat.cats.mo[0] is 1 index ; theTime.month is zero index
    let isSameMo = timeCat.cats.mo[0] === theTime.month + 1 ? true : false ;
    if ( compare === 'month' ) { return isSameYear && isSameMo ? true : false ; }

    let isSameWk = ISO8601_week_no(timeCat.cats.time[0]) === ISO8601_week_no(theTime.now);
    if ( compare === 'week' ) { return isSameYear && isSameWk ? true : false ; }

    let isSameDate = timeCat.cats.date[0] === theTime.date ? true : false ;
    if ( compare === 'date' ) { return isSameYear && isSameMo && isSameDate ? true : false ; }

    console.log('Check BuildTileCollection.ts isSameTimeBucket Function!', compare, timeCat, theTime );
    return false;
 
  }






      /***
       *                                                                                                                                                       
       *    C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D  
       *                                                                                                                                                       
       *    C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D  
       *                                                                                                                                                       
       *                                                                                                                                                       
       *                                                                                                                                                       
       *                                                                                                                                                       
       */


      /***
       *    .d8888. db    db d8888b. d8888b.  .d88b.  d8888b. d888888b d888888b d8b   db  d888b       d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
       *    88'  YP 88    88 88  `8D 88  `8D .8P  Y8. 88  `8D `~~88~~'   `88'   888o  88 88' Y8b      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
       *    `8bo.   88    88 88oodD' 88oodD' 88    88 88oobY'    88       88    88V8o 88 88           88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
       *      `Y8b. 88    88 88~~~   88~~~   88    88 88`8b      88       88    88 V8o88 88  ooo      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
       *    db   8D 88b  d88 88      88      `8b  d8' 88 `88.    88      .88.   88  V888 88. ~8~      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
       *    `8888Y' ~Y8888P' 88      88       `Y88P'  88   YD    YP    Y888888P VP   V8P  Y888P       YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
       *                                                                                                                                                                            
       *                                                                                                                                                                            
       */


      /***
       *                                                                                                                                                       
       *    C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D  
       *                                                                                                                                                       
       *    C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D C8888D 
       *                                                                                                                                                       
       *                                                                                                                                                       
       *                                                                                                                                                       
       *                                                                                                                                                       
       */










      /***
       *    d888888b d88888b      db      d88888b db    db d888888b .d8888. d888888b .d8888.      d8888b. d88888b d888888b db    db d8888b. d8b   db      .o. .o. .o. .o.      d8b   db db    db db      db      
       *      `88'   88'          88      88'     `8b  d8'   `88'   88'  YP `~~88~~' 88'  YP      88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88      `8' `8' `8' `8'      888o  88 88    88 88      88      
       *       88    88ooo        YP      88ooooo  `8bd8'     88    `8bo.      88    `8bo.        88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88                           88V8o 88 88    88 88      88      
       *       88    88~~~                88~~~~~  .dPYb.     88      `Y8b.    88      `Y8b.      88`8b   88~~~~~    88    88    88 88`8b   88 V8o88                           88 V8o88 88    88 88      88      
       *      .88.   88           db      88.     .8P  Y8.   .88.   db   8D    88    db   8D      88 `88. 88.        88    88b  d88 88 `88. 88  V888                           88  V888 88b  d88 88booo. 88booo. 
       *    Y888888P YP           YP      Y88888P YP    YP Y888888P `8888Y'    YP    `8888Y'      88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P                           VP   V8P ~Y8888P' Y88888P Y88888P 
       *                                                                                                                                                                                                         
       *                                                                                                                                                                                                         
       */


      export function ifNotExistsReturnNull ( obj ) {
        let result = null;

        if ( !obj ) { 
          result = "";
        } else if ( obj.length > 0) {
          result = obj;
        }

        return result;
      }

      
        /***
         *    d88888b d888888b d8b   db d8888b.      d8888b. d88888b .d8888. d888888b      d8888b.  .d8b.  d888888b d88888b       .o88b.  .d8b.  d888888b d88888b  d888b   .d88b.  d8888b. db    db 
         *    88'       `88'   888o  88 88  `8D      88  `8D 88'     88'  YP `~~88~~'      88  `8D d8' `8b `~~88~~' 88'          d8P  Y8 d8' `8b `~~88~~' 88'     88' Y8b .8P  Y8. 88  `8D `8b  d8' 
         *    88ooo      88    88V8o 88 88   88      88oooY' 88ooooo `8bo.      88         88   88 88ooo88    88    88ooooo      8P      88ooo88    88    88ooooo 88      88    88 88oobY'  `8bd8'  
         *    88~~~      88    88 V8o88 88   88      88~~~b. 88~~~~~   `Y8b.    88         88   88 88~~~88    88    88~~~~~      8b      88~~~88    88    88~~~~~ 88  ooo 88    88 88`8b      88    
         *    88        .88.   88  V888 88  .8D      88   8D 88.     db   8D    88         88  .8D 88   88    88    88.          Y8b  d8 88   88    88    88.     88. ~8~ `8b  d8' 88 `88.    88    
         *    YP      Y888888P VP   V8P Y8888D'      Y8888P' Y88888P `8888Y'    YP         Y8888D' YP   YP    YP    Y88888P       `Y88P' YP   YP    YP    Y88888P  Y888P   `Y88P'  88   YD    YP    
         *                                                                                                                                                                                          
         *                                                                                                                                                                                          
         */
    
    
        function findBestDateCategory(cats: IDateCategoryArrays, maxPivotChars : number) {
          //const allKeys = Object.keys(newCats);
    
          let allDatesOnSameDay = (cats.locDate.length === 1 ) ? true : false;
          let allDatesInSameMonth = (cats.yrMo.length === 1 ) ? true : false;
          let allDatesInSameYear = (cats.yr.length === 1 ) ? true : false;    
          let allLocDatesFitOnPivot = (cats.locDate.join('     ').length < maxPivotChars) ? true : false;
          let allDatesFitOnPivot = (cats.date.join('     ').length < maxPivotChars) ? true : false;
          let allMonthsFitOnPivot = (cats.yrMo.join('     ').length < maxPivotChars) ? true : false;
          let allTimesFitOnPivot = (cats.locTime.join('     ').length < maxPivotChars) ? true : false;
          let allMoDatesFitOnPivot = (cats.moDay.join('     ').length < maxPivotChars) ? true : false;      
          let allHoursFitOnPivot = (cats.hr.join('     ').length < maxPivotChars) ? true : false;
    
          if ( allDatesOnSameDay && allTimesFitOnPivot ) { return 'locTime' ; }
          if ( allDatesOnSameDay && allHoursFitOnPivot ) { return 'hr' ; }
          if ( allLocDatesFitOnPivot ) { return 'locDate' ; }
          if ( allMoDatesFitOnPivot && allDatesInSameYear ) { return 'moDay' ; }
    
          if ( allDatesInSameMonth && allDatesFitOnPivot ) { return 'date' ; }
    
          if ( allMonthsFitOnPivot && allDatesInSameYear ) { return 'mo' ; }
          if ( allMonthsFitOnPivot ) { return 'yrMo' ; }
    
          return 'yr';
    
        }
    
        /***
         *    d88888b d888888b d8b   db d8888b.      d8888b. d88888b .d8888. d888888b      d8888b. d88888b d8888b. .d8888.  .d88b.  d8b   db       .o88b.  .d8b.  d888888b d88888b  d888b   .d88b.  d8888b. db    db 
         *    88'       `88'   888o  88 88  `8D      88  `8D 88'     88'  YP `~~88~~'      88  `8D 88'     88  `8D 88'  YP .8P  Y8. 888o  88      d8P  Y8 d8' `8b `~~88~~' 88'     88' Y8b .8P  Y8. 88  `8D `8b  d8' 
         *    88ooo      88    88V8o 88 88   88      88oooY' 88ooooo `8bo.      88         88oodD' 88ooooo 88oobY' `8bo.   88    88 88V8o 88      8P      88ooo88    88    88ooooo 88      88    88 88oobY'  `8bd8'  
         *    88~~~      88    88 V8o88 88   88      88~~~b. 88~~~~~   `Y8b.    88         88~~~   88~~~~~ 88`8b     `Y8b. 88    88 88 V8o88      8b      88~~~88    88    88~~~~~ 88  ooo 88    88 88`8b      88    
         *    88        .88.   88  V888 88  .8D      88   8D 88.     db   8D    88         88      88.     88 `88. db   8D `8b  d8' 88  V888      Y8b  d8 88   88    88    88.     88. ~8~ `8b  d8' 88 `88.    88    
         *    YP      Y888888P VP   V8P Y8888D'      Y8888P' Y88888P `8888Y'    YP         88      Y88888P 88   YD `8888Y'  `Y88P'  VP   V8P       `Y88P' YP   YP    YP    Y88888P  Y888P   `Y88P'  88   YD    YP    
         *                                                                                                                                                                                                           
         *                                                                                                                                                                                                           
         */
    
        function findBestPersonCategory(cats: IPersonCategoryArrays, maxPivotChars : number) {
          //const allKeys = Object.keys(newCats);
    
          let allFullNamesFitOnPivot = (cats.fullName.join('     ').length < maxPivotChars) ? true : false;      
          let allFirstNamesFitOnPivot = (cats.firstName.join('     ').length < maxPivotChars) ? true : false;
          let allLastNamesFitOnPivot = (cats.lastName.join('     ').length < maxPivotChars) ? true : false;
          let allInitialsFitOnPivot = (cats.initials.join('     ').length < maxPivotChars) ? true : false;
          let allIDsFitOnPivot = (cats.IDs.join('     ').length < maxPivotChars) ? true : false;
    
          if ( allFullNamesFitOnPivot ) { return 'fullName' ; }
          if ( allLastNamesFitOnPivot ) { return 'lastName' ; }
          if ( allInitialsFitOnPivot ) { return 'initials' ; }
    
    
          return 'initials';
          //These are not used but could be if needed.
    
          if ( allFirstNamesFitOnPivot ) { return 'firstName' ; }
          if ( allIDsFitOnPivot ) { return 'IDs' ; }
    
        }
      
        
        /***
         *     .d8b.  d8888b. d8888b.      d8888b. d88888b d8888b. .d8888.  .d88b.  d8b   db      db    db  .d8b.  d8888b. d888888b  .d8b.  d888888b d888888b  .d88b.  d8b   db .d8888. 
         *    d8' `8b 88  `8D 88  `8D      88  `8D 88'     88  `8D 88'  YP .8P  Y8. 888o  88      88    88 d8' `8b 88  `8D   `88'   d8' `8b `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
         *    88ooo88 88   88 88   88      88oodD' 88ooooo 88oobY' `8bo.   88    88 88V8o 88      Y8    8P 88ooo88 88oobY'    88    88ooo88    88       88    88    88 88V8o 88 `8bo.   
         *    88~~~88 88   88 88   88      88~~~   88~~~~~ 88`8b     `Y8b. 88    88 88 V8o88      `8b  d8' 88~~~88 88`8b      88    88~~~88    88       88    88    88 88 V8o88   `Y8b. 
         *    88   88 88  .8D 88  .8D      88      88.     88 `88. db   8D `8b  d8' 88  V888       `8bd8'  88   88 88 `88.   .88.   88   88    88      .88.   `8b  d8' 88  V888 db   8D 
         *    YP   YP Y8888D' Y8888D'      88      Y88888P 88   YD `8888Y'  `Y88P'  VP   V8P         YP    YP   YP 88   YD Y888888P YP   YP    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
         *                                                                                                                                                                              
         *                                                                                                                                                                              
         */
    
        function addPersonVariations(item,col){
    
          let actualCol = col === 'modifiedBy' ? 'modifiedBy' : col === 'createdBy' ? 'createdBy' : '';
          let newItem = item;
    
          let tilePerson = createIPersonCategoryArrays(col);
          /*
          item.modified = (getColumnValue(pivotProps,item,'colModified'));
          item.modifiedByID = (getColumnValue(pivotProps,item,'colModifiedById'));
          item.modifiedByTitle = (getColumnValue(pivotProps,item,'colModifiedByTitle'));
          */
          tilePerson.cats.fullName[0] = item[actualCol + 'Title'];
          tilePerson.cats.initials[0] = tilePerson.cats.fullName[0].split(" ").map((n)=>n[0]).join("");
          tilePerson.cats.IDs[0] = item[actualCol + 'ID'];      
    
          newItem[col] = tilePerson; 
    
          return newItem;
    
        }
    
    
        /***
         *    db       .d88b.   .o88b.  .d8b.  db      d888888b d88888D d88888b      d8888b.  .d8b.  d888888b d88888b      db    db  .d8b.  d8888b. d888888b  .d8b.  d888888b d888888b  .d88b.  d8b   db .d8888. 
         *    88      .8P  Y8. d8P  Y8 d8' `8b 88        `88'   YP  d8' 88'          88  `8D d8' `8b `~~88~~' 88'          88    88 d8' `8b 88  `8D   `88'   d8' `8b `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
         *    88      88    88 8P      88ooo88 88         88       d8'  88ooooo      88   88 88ooo88    88    88ooooo      Y8    8P 88ooo88 88oobY'    88    88ooo88    88       88    88    88 88V8o 88 `8bo.   
         *    88      88    88 8b      88~~~88 88         88      d8'   88~~~~~      88   88 88~~~88    88    88~~~~~      `8b  d8' 88~~~88 88`8b      88    88~~~88    88       88    88    88 88 V8o88   `Y8b. 
         *    88booo. `8b  d8' Y8b  d8 88   88 88booo.   .88.    d8' db 88.          88  .8D 88   88    88    88.           `8bd8'  88   88 88 `88.   .88.   88   88    88      .88.   `8b  d8' 88  V888 db   8D 
         *    Y88888P  `Y88P'   `Y88P' YP   YP Y88888P Y888888P d88888P Y88888P      Y8888D' YP   YP    YP    Y88888P         YP    YP   YP 88   YD Y888888P YP   YP    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
         *                                                                                                                                                                                                       
         *                                                                                                                                                                                                       
         */
    
        function localizeDateVariations(item, col){
          let newItem = item;
          let thisCol = col + 'Time';
      
          return newItem;
        }
    
    /***
     *    d8888b. db    db .d8888. db   db      d8888b.  .d8b.  d888888b .d8888.      d888888b  .d88b.        .o88b.  .d8b.  d888888b .d8888. 
     *    88  `8D 88    88 88'  YP 88   88      88  `8D d8' `8b `~~88~~' 88'  YP      `~~88~~' .8P  Y8.      d8P  Y8 d8' `8b `~~88~~' 88'  YP 
     *    88oodD' 88    88 `8bo.   88ooo88      88   88 88ooo88    88    `8bo.           88    88    88      8P      88ooo88    88    `8bo.   
     *    88~~~   88    88   `Y8b. 88~~~88      88   88 88~~~88    88      `Y8b.         88    88    88      8b      88~~~88    88      `Y8b. 
     *    88      88b  d88 db   8D 88   88      88  .8D 88   88    88    db   8D         88    `8b  d8'      Y8b  d8 88   88    88    db   8D 
     *    88      ~Y8888P' `8888Y' YP   YP      Y8888D' YP   YP    YP    `8888Y'         YP     `Y88P'        `Y88P' YP   YP    YP    `8888Y' 
     *                                                                                                                                        
     *                                                                                                                                        
     */
    
        function pushDatesToCategories(cats: IDateCategoryArrays, thisTime:IDateCategoryArrays ){
          //This updates the possible new categories for this date column
          let newCats = cats;
          const allKeys = Object.keys(newCats);
    
          //console.log('cats',cats);
          //console.log('allKeys',allKeys);
          for (let key of allKeys){
            if(newCats[key].indexOf(thisTime['cats'][key][0]) === -1) { newCats[key].push(thisTime['cats'][key][0]); }
          }
          return newCats;
    
        }
    /***
     *    .d8888.  .d88b.  d8888b. d888888b       .d8b.  db      db           d8888b.  .d8b.  d888888b d88888b       .o88b.  .d8b.  d888888b .d8888. 
     *    88'  YP .8P  Y8. 88  `8D `~~88~~'      d8' `8b 88      88           88  `8D d8' `8b `~~88~~' 88'          d8P  Y8 d8' `8b `~~88~~' 88'  YP 
     *    `8bo.   88    88 88oobY'    88         88ooo88 88      88           88   88 88ooo88    88    88ooooo      8P      88ooo88    88    `8bo.   
     *      `Y8b. 88    88 88`8b      88         88~~~88 88      88           88   88 88~~~88    88    88~~~~~      8b      88~~~88    88      `Y8b. 
     *    db   8D `8b  d8' 88 `88.    88         88   88 88booo. 88booo.      88  .8D 88   88    88    88.          Y8b  d8 88   88    88    db   8D 
     *    `8888Y'  `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P      Y8888D' YP   YP    YP    Y88888P       `Y88P' YP   YP    YP    `8888Y' 
     *                                                                                                                                               
     *                                                                                                                                               
     */
    
        function sortAllDateCategories(cats: IDateCategoryArrays ){
          //This updates the possible new categories for this date column
          let newCats = cats;
          const allKeys = Object.keys(newCats);
    
          //console.log('cats',cats);
          //console.log('allKeys',allKeys);
          for (let key of allKeys){
            if(newCats[key]) { newCats[key].sort(); }
          }
          return newCats;
    
        }
    
        /***
         *    d8888b. db    db .d8888. db   db      d8888b. d88888b d8888b. .d8888.      d888888b  .d88b.        .o88b.  .d8b.  d888888b 
         *    88  `8D 88    88 88'  YP 88   88      88  `8D 88'     88  `8D 88'  YP      `~~88~~' .8P  Y8.      d8P  Y8 d8' `8b `~~88~~' 
         *    88oodD' 88    88 `8bo.   88ooo88      88oodD' 88ooooo 88oobY' `8bo.           88    88    88      8P      88ooo88    88    
         *    88~~~   88    88   `Y8b. 88~~~88      88~~~   88~~~~~ 88`8b     `Y8b.         88    88    88      8b      88~~~88    88    
         *    88      88b  d88 db   8D 88   88      88      88.     88 `88. db   8D         88    `8b  d8'      Y8b  d8 88   88    88    
         *    88      ~Y8888P' `8888Y' YP   YP      88      Y88888P 88   YD `8888Y'         YP     `Y88P'        `Y88P' YP   YP    YP    
         *                                                                                                                               
         *                                                                                                                               
         */
    
        function pushPersonsToCategories(cats: IPersonCategoryArrays, thisPerson:IPersonCategoryArrays ){
          //This updates the possible new categories for this date column
          let newCats = cats;
          const allKeys = Object.keys(newCats);
    
          //console.log('cats',cats);
          //console.log('allKeys',allKeys);
          for (let key of allKeys){
            if(newCats[key].indexOf(thisPerson['cats'][key][0]) === -1) { newCats[key].push(thisPerson['cats'][key][0]); }
          }
          return newCats;
    
        }
    
        /***
         *    .d8888.  .d88b.  d8888b. d888888b       .d8b.  db      db           d8888b. d88888b d8888b. .d8888.       .o88b.  .d8b.  d888888b d88888b  d888b   .d88b.  d8888b. d888888b d88888b .d8888. 
         *    88'  YP .8P  Y8. 88  `8D `~~88~~'      d8' `8b 88      88           88  `8D 88'     88  `8D 88'  YP      d8P  Y8 d8' `8b `~~88~~' 88'     88' Y8b .8P  Y8. 88  `8D   `88'   88'     88'  YP 
         *    `8bo.   88    88 88oobY'    88         88ooo88 88      88           88oodD' 88ooooo 88oobY' `8bo.        8P      88ooo88    88    88ooooo 88      88    88 88oobY'    88    88ooooo `8bo.   
         *      `Y8b. 88    88 88`8b      88         88~~~88 88      88           88~~~   88~~~~~ 88`8b     `Y8b.      8b      88~~~88    88    88~~~~~ 88  ooo 88    88 88`8b      88    88~~~~~   `Y8b. 
         *    db   8D `8b  d8' 88 `88.    88         88   88 88booo. 88booo.      88      88.     88 `88. db   8D      Y8b  d8 88   88    88    88.     88. ~8~ `8b  d8' 88 `88.   .88.   88.     db   8D 
         *    `8888Y'  `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P      88      Y88888P 88   YD `8888Y'       `Y88P' YP   YP    YP    Y88888P  Y888P   `Y88P'  88   YD Y888888P Y88888P `8888Y' 
         *                                                                                                                                                                                                
         *                                                                                                                                                                                                
         */
    
        function sortAllPersonCategories(cats: IPersonCategoryArrays ){
          //This updates the possible new categories for this date column
          let newCats = cats;
          const allKeys = Object.keys(newCats);
    
          //console.log('cats',cats);
          //console.log('allKeys',allKeys);
          for (let key of allKeys){
            if(newCats[key]) { newCats[key].sort(); }
          }
          return newCats;
    
        }
    
    
        /***
         *    .d8888. d88888b d888888b      db       .d8b.  .d8888. d888888b       .o88b.  .d8b.  d888888b      d8888b. d88888b d8888b. d888888b  .d88b.  d8888b. 
         *    88'  YP 88'     `~~88~~'      88      d8' `8b 88'  YP `~~88~~'      d8P  Y8 d8' `8b `~~88~~'      88  `8D 88'     88  `8D   `88'   .8P  Y8. 88  `8D 
         *    `8bo.   88ooooo    88         88      88ooo88 `8bo.      88         8P      88ooo88    88         88oodD' 88ooooo 88oobY'    88    88    88 88   88 
         *      `Y8b. 88~~~~~    88         88      88~~~88   `Y8b.    88         8b      88~~~88    88         88~~~   88~~~~~ 88`8b      88    88    88 88   88 
         *    db   8D 88.        88         88booo. 88   88 db   8D    88         Y8b  d8 88   88    88         88      88.     88 `88.   .88.   `8b  d8' 88  .8D 
         *    `8888Y' Y88888P    YP         Y88888P YP   YP `8888Y'    YP          `Y88P' YP   YP    YP         88      Y88888P 88   YD Y888888P  `Y88P'  Y8888D' 
         *                                                                                                                                                        
         *                                                                                                                                                        
         */
    
        function setLastCategoryPer(dateInfo: IDateInfo){
          //This sets state.lastCategory as the first category in each one.
          let newDateInfo = dateInfo;
          let  bestFormat = newDateInfo.bestFormat;
          //Set last Category as the first tab in the best format.

          if (newDateInfo.cats[bestFormat]) { newDateInfo.lastCategory = newDateInfo.cats[bestFormat][0]; }
    
          return newDateInfo;
    
        }
    
    
        /***
         *    .d8888. d88888b d888888b      db       .d8b.  .d8888. d888888b       .o88b.  .d8b.  d888888b      d8888b. d88888b d8888b. .d8888.  .d88b.  d8b   db 
         *    88'  YP 88'     `~~88~~'      88      d8' `8b 88'  YP `~~88~~'      d8P  Y8 d8' `8b `~~88~~'      88  `8D 88'     88  `8D 88'  YP .8P  Y8. 888o  88 
         *    `8bo.   88ooooo    88         88      88ooo88 `8bo.      88         8P      88ooo88    88         88oodD' 88ooooo 88oobY' `8bo.   88    88 88V8o 88 
         *      `Y8b. 88~~~~~    88         88      88~~~88   `Y8b.    88         8b      88~~~88    88         88~~~   88~~~~~ 88`8b     `Y8b. 88    88 88 V8o88 
         *    db   8D 88.        88         88booo. 88   88 db   8D    88         Y8b  d8 88   88    88         88      88.     88 `88. db   8D `8b  d8' 88  V888 
         *    `8888Y' Y88888P    YP         Y88888P YP   YP `8888Y'    YP          `Y88P' YP   YP    YP         88      Y88888P 88   YD `8888Y'  `Y88P'  VP   V8P 
         *                                                                                                                                                        
         *                                                                                                                                                        
         */
        function setLastCategoryPerson(personInfo: IPersonInfo){
          //This sets state.lastCategory as the first category in each one.
          let nePersonInfo = personInfo;
          let  bestFormat = nePersonInfo.bestFormat;

          //Set last Category as the first tab in the best format.

          if (nePersonInfo.cats[bestFormat]) { nePersonInfo.lastCategory = nePersonInfo.cats[bestFormat][0]; }
    
          return nePersonInfo;
    
        }

              
        /**
         * This just gets all the possible date labels so we can determine best one for pivots
         * @param item 
         * @param col 
         */
    
         /***
         *     .d8b.  d8888b. d8888b.      d8888b.  .d8b.  d888888b d88888b      db    db  .d8b.  d8888b. d888888b  .d8b.  d888888b d888888b  .d88b.  d8b   db .d8888. 
         *    d8' `8b 88  `8D 88  `8D      88  `8D d8' `8b `~~88~~' 88'          88    88 d8' `8b 88  `8D   `88'   d8' `8b `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
         *    88ooo88 88   88 88   88      88   88 88ooo88    88    88ooooo      Y8    8P 88ooo88 88oobY'    88    88ooo88    88       88    88    88 88V8o 88 `8bo.   
         *    88~~~88 88   88 88   88      88   88 88~~~88    88    88~~~~~      `8b  d8' 88~~~88 88`8b      88    88~~~88    88       88    88    88 88 V8o88   `Y8b. 
         *    88   88 88  .8D 88  .8D      88  .8D 88   88    88    88.           `8bd8'  88   88 88 `88.   .88.   88   88    88      .88.   `8b  d8' 88  V888 db   8D 
         *    YP   YP Y8888D' Y8888D'      Y8888D' YP   YP    YP    Y88888P         YP    YP   YP 88   YD Y888888P YP   YP    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
         *                                                                                                                                                             
         *                                                                                                                                                             
         */
    
        function addDateVariations(item,col, startTime ){
          let newItem = item;
    
          let tileTimeDV = createIDateCategoryArrays(col);
          let thisTime = new Date(item[col]);

          let timeObject = makeSmallTimeObject(thisTime.toString());
    
          tileTimeDV.cats.time[0] = thisTime;
          tileTimeDV.cats.yr[0] = thisTime.getFullYear();
          tileTimeDV.cats.mo[0] = thisTime.getMonth() + 1;
          tileTimeDV.cats.date[0] = thisTime.getDate();
          tileTimeDV.cats.day[0] = thisTime.getDay() + 1;
          tileTimeDV.cats.hr[0] = thisTime.getHours();
          tileTimeDV.cats.wk[0] = timeObject.week;
          tileTimeDV.cats.locDate[0] = thisTime.toLocaleDateString();
          tileTimeDV.cats.locTime[0] = thisTime.toLocaleTimeString();
          tileTimeDV.cats.age[0] = ( startTime.now.valueOf() - thisTime.valueOf()) / ( one_day ) ;
          tileTimeDV.cats.dayYYYYMMDD[0] = timeObject.dayYYYYMMDD;
          let monthPrefix = (tileTimeDV.cats.mo[0] < 10 ? '0' : '');
          let datePrefix = (tileTimeDV.cats.date[0] < 10 ? '0' : '');
          tileTimeDV.cats.yrMo[0] = tileTimeDV.cats.yr + '-' + monthPrefix + tileTimeDV.cats.mo;
          tileTimeDV.cats.moDay[0] = monthPrefix + tileTimeDV.cats.mo + '-' +  datePrefix + tileTimeDV.cats.date;
          
          newItem[col + 'Time'] = tileTimeDV; 
    
          return newItem;
    
        }
      
/***
 *    d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *      `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *       88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *       88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *      .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                       
 *                                                                                       
 */



export interface IDateCategoryArrays {
    yr: number[];
    mo: number[];
    day: number[];
    date: number[];
    hr: number[];
    wk: number[];
    dayYYYYMMDD: any[];
  
    age: number[];
  
    yrMo: string[];
    moDay: string[];
  
    locDate: string[];
    locTime: string[];
  
    time: Date[];
  
    bestFormat: string[];
  
  }
  
  export interface IDateInfo {
      range?: number;
      note?: string;
      latest?: Date;
      earliest?: Date;
      bestAgeBucket?: string;
      bestFormat?: string;
      cats : IDateCategoryArrays;
      lastCategory?: string;
      name: string;
  
  }
  
  export interface IPersonCategoryArrays {
  
    fullName: string[];
    initials: string[];
    firstName: string[];
    lastName: string[];
    bestFormat: string[];
    IDs: number[];
  
  }
  
  export interface IPersonInfo {
  
      note?: string; // Copied from IDateInfo, keeping for consistancy
  
      bestFormat?: string; // Copied from IDateInfo, keeping for consistancy
      cats : IPersonCategoryArrays; // Copied from IDateInfo, keeping for consistancy
      lastCategory?: string;  // Copied from IDateInfo, keeping for consistancy
      name: string;  // Copied from IDateInfo, not sure if it is needed
  
  }
  
  type IInfo = IDateInfo | IPersonInfo;
  
  
  
  
    /***
     *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      d8888b. d88888b d8888b. .d8888.  .d88b.  d8b   db       .o88b.  .d8b.  d888888b       .d8b.  d8888b. d8888b.  .d8b.  db    db .d8888. 
     *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88  `8D 88'     88  `8D 88'  YP .8P  Y8. 888o  88      d8P  Y8 d8' `8b `~~88~~'      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 88'  YP 
     *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo      88oodD' 88ooooo 88oobY' `8bo.   88    88 88V8o 88      8P      88ooo88    88         88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  `8bo.   
     *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      88~~~   88~~~~~ 88`8b     `Y8b. 88    88 88 V8o88      8b      88~~~88    88         88~~~88 88`8b   88`8b   88~~~88    88      `Y8b. 
     *    Y8b  d8 88 `88. 88.     88   88    88    88.          88      88.     88 `88. db   8D `8b  d8' 88  V888      Y8b  d8 88   88    88         88   88 88 `88. 88 `88. 88   88    88    db   8D 
     *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P      88      Y88888P 88   YD `8888Y'  `Y88P'  VP   V8P       `Y88P' YP   YP    YP         YP   YP 88   YD 88   YD YP   YP    YP    `8888Y' 
     *                                                                                                                                                                                                
     *                                                                                                                                                                                                
     */
  
  
    export function createIPersonCategoryArrays(col) {
      let result = {} as IPersonInfo;
      let cats = {} as IPersonCategoryArrays;
  
      cats.fullName = [];
      cats.initials = [];
      cats.IDs = [];
      cats.firstName = [];
      cats.lastName = [];
      cats.bestFormat = [];
  
      result = {
        note: null,
        bestFormat: null,
        cats: cats,
        lastCategory: null,
        name: col,
  
      };
      
      return result;
  
  
    }
  
  /***
   *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      d8888b.  .d8b.  d888888b d88888b       .o88b.  .d8b.  d888888b       .d8b.  d8888b. d8888b.  .d8b.  db    db .d8888. 
   *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88  `8D d8' `8b `~~88~~' 88'          d8P  Y8 d8' `8b `~~88~~'      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 88'  YP 
   *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo      88   88 88ooo88    88    88ooooo      8P      88ooo88    88         88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  `8bo.   
   *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      88   88 88~~~88    88    88~~~~~      8b      88~~~88    88         88~~~88 88`8b   88`8b   88~~~88    88      `Y8b. 
   *    Y8b  d8 88 `88. 88.     88   88    88    88.          88  .8D 88   88    88    88.          Y8b  d8 88   88    88         88   88 88 `88. 88 `88. 88   88    88    db   8D 
   *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P      Y8888D' YP   YP    YP    Y88888P       `Y88P' YP   YP    YP         YP   YP 88   YD 88   YD YP   YP    YP    `8888Y' 
   *                                                                                                                                                                               
   *                                                                                                                                                                               
   */
  
  export function createIDateCategoryArrays(col) {
    let result = {} as IDateInfo;
    let cats = {} as IDateCategoryArrays;
    cats.yr = [];
    cats.mo = [];
    cats.day = [];  
    cats.date = [];
    cats.hr = [];
    cats.wk = [];
    cats.dayYYYYMMDD = [];
  
    cats.age = [];
  
    cats.yrMo = [];
    cats.moDay = [];
  
    cats.locDate = [];
    cats.locTime = [];
  
    cats.time = [];
  
    cats.bestFormat = [];
  
    result = {
      range: null,
      note: null,
      latest: null,
      earliest: null,
      bestAgeBucket: null,
      bestFormat: null,
      cats: cats,
      lastCategory: null,
      name: col,
  
    };
    
    return result;
  }

  
      /**
     * This gets the values of specified columns including if they are expanded.
     * @param pivotProps 
     * @param item 
     * @param getProp 
     */


     /***
     *     d888b  d88888b d888888b       .o88b.  .d88b.  db           db    db  .d8b.  db      db    db d88888b 
     *    88' Y8b 88'     `~~88~~'      d8P  Y8 .8P  Y8. 88           88    88 d8' `8b 88      88    88 88'     
     *    88      88ooooo    88         8P      88    88 88           Y8    8P 88ooo88 88      88    88 88ooooo 
     *    88  ooo 88~~~~~    88         8b      88    88 88           `8b  d8' 88~~~88 88      88    88 88~~~~~ 
     *    88. ~8~ 88.        88         Y8b  d8 `8b  d8' 88booo.       `8bd8'  88   88 88booo. 88b  d88 88.     
     *     Y888P  Y88888P    YP          `Y88P'  `Y88P'  Y88888P         YP    YP   YP Y88888P ~Y8888P' Y88888P 
     *                                                                                                          
     *                                                                                                          
     */

export function getColumnValue(pivotProps: IPivotTilesProps, item, getProp){

    if (getProp.toLowerCase() === "thumb" || getProp.toLowerCase() === "thumbnail") {
      getProp = "File/ServerRelativeUrl";
    }

    function convertValues(itemValc) {
      // Cleans up values into right syntax, no numbers and some must be arrays.
      itemValc = (getProp.indexOf('Link') > -1) ? convertLinks(pivotProps, itemValc) :itemValc;
      itemValc = (Array.isArray(itemValc)) ? itemValc.map(String) : itemValc;  //Convert number arrays (like Author/ID) to string arrays
      itemValc = (typeof(itemValc) === 'number') ? itemValc.toString() : itemValc;
      return itemValc;
    }


    let isWebPartColProp = (pivotProps[getProp]) ? true : false; 
    var itemVal :any ;


    if (!isWebPartColProp) {
      //the property is NOT a web part prop (but predefined one like Modified)
      //Therefore assume it is a Category and check if it's a date

      itemVal = item[getProp];

      let check4Date = Date.parse(itemVal);

      if (isNaN(check4Date)){
        //This is not a date, do nothing
      } else { //This is a date, convert it to a group of dates like year
        var d1 = new Date(itemVal);
        itemVal = d1.getFullYear();
      }

      return itemVal;

    } else if (pivotProps[getProp].indexOf("/") < 0 && pivotProps[getProp].indexOf(".") < 0 ) {
      //the property does not have a / so you do want to check for a date.

      if (item[pivotProps[getProp]]) {

        itemVal = item[pivotProps[getProp]];

        if (getProp === 'colCategory'){
          //Check for date value and then convert to bucket
          let check4Date = Date.parse(itemVal);
          //console.log('check4Date: ', check4Date);
          //console.log('check4Date type: ', typeof check4Date);
          //console.log('check4Date isNaN: ', isNaN(check4Date));   

          if (isNaN(check4Date)){
            //This is not a date, do nothing
          } else { //This is a date, convert it to a group of dates like year
            var d2 = new Date(itemVal);
            itemVal = d2.getFullYear();
          }

        }

        itemVal = convertValues(itemVal);
        return itemVal;
      } else { return ""; } 
    } else {
      //console.log('getColumnValue: ', getProp, pivotProps[getProp]);
      let parser = pivotProps[getProp].indexOf('/') > 0 ? '/' : '.';
      const leftSide = parseMe(pivotProps[getProp], parser,'left');
      const rightSide = parseMe(pivotProps[getProp], parser,'right');

      if (item[leftSide]) {
        itemVal = item[leftSide][rightSide];
        itemVal = convertValues(itemVal);
        return itemVal;
      } else { return ""; } 
    }
  }


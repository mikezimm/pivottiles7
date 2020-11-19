
import { IPivotTilesProps, ICustomCategories } from './IPivotTilesProps';
import { IPivotTilesState } from './IPivotTilesState';
import { IPivotTileItemProps,  } from './../TileItems/IPivotTileItemProps';

import { getTheCurrentTime,} from '../../../../services/createAnalytics';
import {tileTime} from '../TileItems/IPivotTileItemProps';
import { getLocalMonths, ISO8601_week_no, makeSmallTimeObject, ITheTime } from '../../../../services/dateServices';

import { removeLeadingUnderScore } from './BuildTileCategories';

import { convertLinks, parseMe } from './UtilsNew';

import { getQuarter } from './QuickBuckets';

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
  if ( what === 'icon' ) { resultStyle = 'darkgray'; }
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

function buildFinalTileCollection ( response: any, theseProps: any, custSearch, custCategories, pivotProps: IPivotTilesProps, includePeople: boolean, fixedURL, currentHero ) {
  
  let showOtherTab = false;

  let tileCollection: IPivotTileItemProps[] = response.map(item => {

    let modifiedByTitle = null;
    let createdByTitle = null;
    if ( includePeople === true ) {
        modifiedByTitle = getColumnValue(pivotProps,item,'colModifiedByTitle');
        createdByTitle = getColumnValue(pivotProps,item,'colCreatedByTitle');
    }

    
    let title = getColumnValue(theseProps,item,'colTitleText');

    let description = getColumnValue(theseProps,item,'colHoverText');

    let href = getColumnValue(theseProps,item,'colGoToLink');

    let category = getColumnValue(theseProps,item,'colCategory');
    if ( category === undefined || category === null ) { category = []; }
    let categoryCopy = JSON.stringify(category);

    //2020-11-16: Added this before Others tab is added
    let nonSubsiteCategories = category.length;

    //Need to resolve when category is undefined in case that webpart prop is empty
    let testCategory = category === undefined || category === null ? false : true;
    if ( testCategory === false || category.length === 0 ) { category = [pivotProps.otherTab] ; }

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

        var regex = new RegExp("\\b" + custCat + "\\b", att);
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

        let useBreak = custBreak === true || custCat.break === true ? true : false;
        if ( useBreak === true && nonSubsiteCategories > 0 ) { match = false; }

        let check4Tab = removeLeadingUnderScore(custCat);
        if ( match === true ) { category.push( check4Tab ) ; }

      });

      //2020-11-16: changed length check === 1 because it should always have subsites category
      if ( category.length === 0 ) { category.push ( pivotProps.otherTab ) ; }

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
        if ( category.length === 0 ) { category.push ( pivotProps.otherTab ) ; }

    } else {

    }


    if ( pivotProps.otherTab && pivotProps.otherTab.length > 0 && category[0] == pivotProps.otherTab ) { 
      showOtherTab = true ;
    }

    let descriptionSuffix = '';
    if ( item.sourceType === pivotProps.fetchLists.libsCategory || item.sourceType === pivotProps.fetchLists.listCategory || item.sourceType === pivotProps.subsitesCategory ) {
      descriptionSuffix =  [ item.sourceType, item.createdNote, item.modifiedNote ].join('; ');
    }

    if ( description ) { description += ' ; ' + descriptionSuffix ; } else { description = descriptionSuffix ; }


    let sourceType = item.sourceType;

    let color = ifNotExistsReturnNull( item[pivotProps.colColor] );
    let imageUrl = getColumnValue(theseProps, item,'colImageLink');

    let imageHeight = pivotProps.imageHeight;
    let defFabricSize = `;size=50;top=-${imageHeight/5}px;background=white;`;

    if ( sourceType === pivotProps.fetchLists.libsCategory ) {
      if ( !color || color === '' ) { color = 'font=darkgray;' + defFabricSize + pivotProps.fetchLists.libsIconStyles ; }
      if ( !imageUrl || imageUrl === '' ) { imageUrl = getStyleProp([ pivotProps.fetchLists.libsIconStyles ], 'icon' ) ; }
      if ( !imageUrl || imageUrl === '' ) { imageUrl = 'FolderHorizontal' ; }   

    } else if ( sourceType === pivotProps.fetchLists.listCategory ) {
      if ( !color || color === '' ) { color = 'font=darkslateblue;' + defFabricSize  + 'background=LightGoldenRodYellow;' + pivotProps.fetchLists.listIconStyles ; }
      if ( !imageUrl || imageUrl === '' ) { imageUrl = getStyleProp([ pivotProps.fetchLists.listIconStyles ], 'icon' ) ; }
      if ( !imageUrl || imageUrl === '' ) { imageUrl = 'BulletedList2' ; }   
      
    } else if ( sourceType === pivotProps.subsitesCategory ) {
      if ( !color || color === '' ) { color = 'font=darkslateblue;' + defFabricSize; }
      if ( !imageUrl || imageUrl === '' ) { imageUrl = 'SharepointLogo' ; }

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
        imageUrl = 'SharepointLogo' ; 
        if ( !color || color === '' ) { color = 'font=rgb(0, 120, 215);' + defFabricSize ; }

      } else if ( href.toLowerCase().indexOf('teams') > -1 ) { 
        imageUrl = 'TeamsLogo' ; 
        if ( !color || color === '' ) { color = 'font=#464EB8;' + defFabricSize ; }

      } else if ( href.toLowerCase().indexOf('jira') > -1 ) { 
        imageUrl = 'https://cdn.onlinewebfonts.com/svg/img_117214.png' ; 
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


    category.push(sourceType);


     return {

      sourceType: sourceType,

      imageUrl: imageUrl,

      title: title,

      description: description,

      href: href,

      category: category,

      setTab: pivotProps.setTab,
      setSize: pivotProps.setSize,
      heroType: pivotProps.heroType,
      heroCategory: currentHero,

      Id: item.Id,

      //ifNotExistsReturnNull
      options: ifNotExistsReturnNull( item[theseProps.colTileStyle] ),

      color: color,

      imgSize: ifNotExistsReturnNull( item[pivotProps.colSize] ),

      listWebURL: fixedURL.replace("ReplaceID",item.Id),
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

  let result = {
    tileCollection: tileCollection,
    showOtherTab: showOtherTab,
  };

  return result;

}



















/***
 *    d8888b. db    db d888888b db      d8888b.      db      d888888b d8888b. d8888b.  .d8b.  d8888b. db    db      d888888b d888888b db      d88888b .d8888. 
 *    88  `8D 88    88   `88'   88      88  `8D      88        `88'   88  `8D 88  `8D d8' `8b 88  `8D `8b  d8'      `~~88~~'   `88'   88      88'     88'  YP 
 *    88oooY' 88    88    88    88      88   88      88         88    88oooY' 88oobY' 88ooo88 88oobY'  `8bd8'          88       88    88      88ooooo `8bo.   
 *    88~~~b. 88    88    88    88      88   88      88         88    88~~~b. 88`8b   88~~~88 88`8b      88            88       88    88      88~~~~~   `Y8b. 
 *    88   8D 88b  d88   .88.   88booo. 88  .8D      88booo.   .88.   88   8D 88 `88. 88   88 88 `88.    88            88      .88.   88booo. 88.     db   8D 
 *    Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'      Y88888P Y888888P Y8888P' 88   YD YP   YP 88   YD    YP            YP    Y888888P Y88888P Y88888P `8888Y' 
 *                                                                                                                                                            
 *                                                                                                                                                            
 */




export function buildTileCollectionFromLists(response, pivotProps: IPivotTilesProps , custCategories: ICustomCategories, fixedURL, currentHero, ){

  //           let tileCollection = response.map(item=>new ClassTile(item));
  //          https://stackoverflow.com/questions/47755247/typescript-array-map-return-object

    let includePeople = false;

    console.log( 'buildTileCollectionFromWebs pivotProps:', pivotProps );

    let tc = createBaselineModObject();

    let theseProps : any = {
      colModified: 'LastItemModifiedDate',
      colCreated: 'Created',
      colTitleText: 'Title',
      colHoverText: 'Description',
      colImageLink: '',
      colGoToLink: 'ParentWebUrl',
      colCategory: null,
      colTileStyle: null,
      colColor: null,
      colSize: null,

    };

    for (let item of response) {

        let modResults = addModifiedInfoToItem( item, theseProps, tc, includePeople );
        tc = modResults.tc;
        item = modResults.item;
    }

    tc = setModifiedCats( tc, pivotProps );

    response = setBestFormat( response, tc, includePeople );

    tc = setLastCat( tc, pivotProps );

    let endTime = getTheCurrentTime();

    let custSearch: any = setCustSearch ( custCategories, theseProps, includePeople );

    let finalTileCollection = buildFinalTileCollection ( response, theseProps, custSearch, custCategories, pivotProps, includePeople , fixedURL, currentHero );

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
































/***
 *    d8888b. db    db d888888b db      d8888b.      db   d8b   db d88888b d8888b.      d888888b d888888b db      d88888b .d8888. 
 *    88  `8D 88    88   `88'   88      88  `8D      88   I8I   88 88'     88  `8D      `~~88~~'   `88'   88      88'     88'  YP 
 *    88oooY' 88    88    88    88      88   88      88   I8I   88 88ooooo 88oooY'         88       88    88      88ooooo `8bo.   
 *    88~~~b. 88    88    88    88      88   88      Y8   I8I   88 88~~~~~ 88~~~b.         88       88    88      88~~~~~   `Y8b. 
 *    88   8D 88b  d88   .88.   88booo. 88  .8D      `8b d8'8b d8' 88.     88   8D         88      .88.   88booo. 88.     db   8D 
 *    Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'       `8b8' `8d8'  Y88888P Y8888P'         YP    Y888888P Y88888P Y88888P `8888Y' 
 *                                                                                                                                
 *                                                                                                                                
 */

export function buildTileCollectionFromWebs(response, pivotProps: IPivotTilesProps , custCategories: ICustomCategories, fixedURL, currentHero){

  //           let tileCollection = response.map(item=>new ClassTile(item));
  //          https://stackoverflow.com/questions/47755247/typescript-array-map-return-object

     let includePeople = false;

     console.log( 'buildTileCollectionFromWebs pivotProps:', pivotProps );
 
     let tc = createBaselineModObject();
 
     let theseProps : any = {
      colModified: 'LastItemUserModifiedDate',
      colCreated: 'Created',
      colTitleText: 'Title',
      colHoverText: 'Description',
      colImageLink: 'SiteLogoUrl',
      colGoToLink: 'ServerRelativeUrl',
      colCategory: null,
      colTileStyle: null,
      colColor: null,
      colSize: null,
 
     };
 
     for (let item of response) {
 
         let modResults = addModifiedInfoToItem( item, theseProps, tc, includePeople );
         tc = modResults.tc;
         item = modResults.item;
     }
 
     tc = setModifiedCats( tc, pivotProps );
 
     response = setBestFormat( response, tc, includePeople );
 
     tc = setLastCat( tc, pivotProps );
 
     let endTime = getTheCurrentTime();
 
     let custSearch: any = setCustSearch ( custCategories, theseProps, includePeople );
 
     let finalTileCollection = buildFinalTileCollection ( response, theseProps, custSearch, custCategories, pivotProps, includePeople , fixedURL, currentHero );
 
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


  export function buildTileCollectionFromResponse(response, pivotProps: IPivotTilesProps , custCategories: ICustomCategories, fixedURL, currentHero){

  //           let tileCollection = response.map(item=>new ClassTile(item));
  //          https://stackoverflow.com/questions/47755247/typescript-array-map-return-object

    console.log( 'buildTileCollectionFromResponse pivotProps:', pivotProps );

    let includePeople = true;

    let tc = createBaselineModObject();

    let theseProps = pivotProps;

    for (let item of response) {

        let modResults = addModifiedInfoToItem( item, theseProps, tc, includePeople );
        tc = modResults.tc;
        item = modResults.item;
    }

    tc = setModifiedCats( tc, pivotProps );

    response = setBestFormat( response, tc, includePeople );

    tc = setLastCat( tc, pivotProps );

    let endTime = getTheCurrentTime();

    let custSearch: any = setCustSearch ( custCategories, theseProps, includePeople );

    let finalTileCollection = buildFinalTileCollection ( response, theseProps, custSearch, custCategories, pivotProps, includePeople , fixedURL, currentHero );

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


      function ifNotExistsReturnNull ( obj ) {
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


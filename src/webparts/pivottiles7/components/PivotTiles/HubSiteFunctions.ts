

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */
import { sp } from "@pnp/sp";

//https://sharepoint.stackexchange.com/questions/261222/spfx-and-pnp-sp-how-to-get-all-sites
//Just had to change SearchQuery to ISearchQuery.

import { ISearchQuery, SearchResults, ISearchResult } from "@pnp/sp/search";

import { IHubSiteWebData, IHubSiteInfo } from  "@pnp/sp/hubsites";
import "@pnp/sp/webs";
import "@pnp/sp/hubsites/web";

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */

import { jiraIcon, defaultHubIcon, defaultHubIcon2 } from '@mikezimm/npmfunctions/dist/Icons';

import { makeSmallTimeObject, makeTheTimeObject,ITheTime, getAge, getBestTimeDelta, isStringValidDate, monthStr3 } from '@mikezimm/npmfunctions/dist/dateServices';
import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist, sortKeysByOtherKey } from '@mikezimm/npmfunctions/dist/arrayServices';
import { getHelpfullError } from '@mikezimm/npmfunctions/dist/ErrorHandler';


/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      .d8888. d88888b d8888b. db    db d888888b  .o88b. d88888b .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88'  YP 88'     88  `8D 88    88   `88'   d8P  Y8 88'     88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         `8bo.   88ooooo 88oobY' Y8    8P    88    8P      88ooooo `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88           `Y8b. 88~~~~~ 88`8b   `8b  d8'    88    8b      88~~~~~   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         db   8D 88.     88 `88.  `8bd8'    .88.   Y8b  d8 88.     db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         `8888Y' Y88888P 88   YD    YP    Y888888P  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                 
 *                                                                                                                                 
 */


 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      db   db d88888b db      d8888b. d88888b d8888b. .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88   88 88'     88      88  `8D 88'     88  `8D 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88ooo88 88ooooo 88      88oodD' 88ooooo 88oobY' `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88~~~88 88~~~~~ 88      88~~~   88~~~~~ 88`8b     `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88   88 88.     88booo. 88      88.     88 `88. db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P 88      Y88888P 88   YD `8888Y' 
 *                                                                                                                       
 *                                                                                                                       
 */

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .o88b.  .d88b.  .88b  d88. d8888b.  .d88b.  d8b   db d88888b d8b   db d888888b 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D .8P  Y8. 888o  88 88'     888o  88 `~~88~~' 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         8P      88    88 88  88  88 88oodD' 88    88 88V8o 88 88ooooo 88V8o 88    88    
 *       88    88  88  88 88~~~   88    88 88`8b      88         8b      88    88 88  88  88 88~~~   88    88 88 V8o88 88~~~~~ 88 V8o88    88    
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         Y8b  d8 `8b  d8' 88  88  88 88      `8b  d8' 88  V888 88.     88  V888    88    
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  `Y88P'  YP  YP  YP 88       `Y88P'  VP   V8P Y88888P VP   V8P    YP    
 *                                                                                                                                               
 *                                                                                                                                               
 */


/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */





export async function getHubSiteData() {

    const webData: IHubSiteInfo = await sp.hubSites();
//    console.log('IHubSiteInfo:', webData );

}

export async function getHubSiteData2() {

    //IHubSiteWebData
    const webData: any = await sp.web.hubSiteData();
//   console.log('IHubSiteWebData:', webData );

}


/**
 * 
 * https://www.techmikael.com/2018/04/working-with-hub-sites-and-search-api.html
 * 
 * There are other options to work with subsites. The CSOM Site object contains a property named IsHubSite
 * you can check on, as does the tenant properties of a site.
 * The site object also has a HubSiteId property which corresponds to the search managed property DepartmentId.
 * 
 */

 
export interface MySearchResults extends ISearchResult {

}

export function getAssociatedSites(departmentId: string, callback: any, entireResponse: any , custCategories, hubsCategory, ascSort: boolean, newData ) {

    //var departmentId = departmentId;
    // do a null check of department id
    //366df2ee-6476-4b15-a4fd-018dfae71e48 <= SPHub

    //Sort ascending by default
    let sortDirection = ascSort === false ? 1 : 0;

    console.log('current department ID:', departmentId );

    /**
     *  Updated search query per pnpjs issue response:
     *  https://github.com/pnp/pnpjs/issues/1552#issuecomment-767837463
     * 
     */
    sp.search(<ISearchQuery>{
        Querytext: `contentclass:STS_Site AND departmentId:{${departmentId}}`,
          SelectProperties: ["*","Title", "SPSiteUrl", "WebTemplate","departmentId","SiteLogo","SiteDescription",
          "ContentModifiedTime","LastModifiedTime", "LastModifiedTimeForRetention","ModifiedBy","Created","Modified","CreatedBy","CreatedById","ModifiedById"],
          "RowLimit": 500,
//          "StartRow": 0,
          "ClientType": "ContentSearchRegular",
          TrimDuplicates: false, //This is needed in order to also get the hub itself.
        })
          .then( ( res: SearchResults) => {
    
            console.log('associated sites with URL/Desc', res);
            console.log(res.RowCount);
            console.log(res.PrimarySearchResults);
            entireResponse.hubs = res.PrimarySearchResults;

            entireResponse.hubs.map( h => {
                h.sourceType = hubsCategory;
            });
            callback( entireResponse, custCategories, newData );

    });

    return;

}


import { Web, IList, IItem } from "@pnp/sp/presets/all";



import { getExpandColumns, getKeysLike, getSelectColumns } from '../../../../services/getFunctions';

import { IUser } from '../../../../services/IReUsableInterfaces';


const allColumns = ['Title','Id','Created','Modified','Author/Title','Author/ID','Author/Name','Editor/Title','Editor/ID','Editor/Name',
    'Primary/Title', 'Primary/ID', 'Secondary/Title', 'Secondary/ID'];

export async function allAvailableHubWebs(  tileCollection: any,  hubsCategory, addTheseItemsToState: any, ) {

    let expColumns = getExpandColumns(allColumns);
    let selColumns = getSelectColumns(allColumns);

    let allItems : any[] = null;

//    let legacyPageContext = await currentPage.legacyPageContext()//.pageItemId;
//    console.log('UniqueId:', legacyPageContext.pageItemId);
//    newsService.pageID = legacyPageContext.pageItemId;

    let didThisAlreadyRun = false;
    let hasHubs : any = false;

    tileCollection.map( t => {
        if ( t.sourceType === hubsCategory ) { 
            hasHubs = true;
            if ( t.imageUrl.indexOf('data:image/png;base64,') !== 0 ) { didThisAlreadyRun = true; } 
//            console.log('allAvailableHubWebs: hubCheck', t.title , didThisAlreadyRun , t.imageUrl );
        }
    });

    if ( hasHubs === true && didThisAlreadyRun === false ) {
        let newTileCollection = JSON.parse(JSON.stringify( tileCollection )) ;

        for ( let i in newTileCollection ) {
            if ( newTileCollection[i].sourceType === hubsCategory && newTileCollection[i].imageUrl.indexOf('data:image/png;base64,') === 0 ) {
                let getThisWeb = newTileCollection[i].href;
                let thisListWeb = Web( getThisWeb );
                let errMessage = '';
                try {
        
                    let thisSite : any = await thisListWeb.get();
                    newTileCollection[i].imageUrl = thisSite.SiteLogoUrl ? thisSite.SiteLogoUrl : newTileCollection[i].imageUrl;
                    newTileCollection[i].description = thisSite.Description;
                    newTileCollection[i].created = thisSite.Created;
                    newTileCollection[i].modified = thisSite.LastItemModifiedDate;
        
                    console.log('thisSite: ', newTileCollection[i].title , newTileCollection[i].imageUrl.substring(0, 100) );
        
                } catch (e) {
                    errMessage = getHelpfullError(e, true, true);
        
                }
            }
    
        }
        addTheseItemsToState( newTileCollection );

    } else {
        console.log('NOT Updating Hub Logos... looks like we already loaded them');
    }

    //return allItems;

}
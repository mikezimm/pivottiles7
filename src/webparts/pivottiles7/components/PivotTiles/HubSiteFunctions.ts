import { sp } from "@pnp/sp";

//https://sharepoint.stackexchange.com/questions/261222/spfx-and-pnp-sp-how-to-get-all-sites
//Just had to change SearchQuery to ISearchQuery.

import { ISearchQuery, SearchResults, ISearchResult } from "@pnp/sp/search";

import { IHubSiteWebData, IHubSiteInfo } from  "@pnp/sp/hubsites";
import "@pnp/sp/webs";
import "@pnp/sp/hubsites/web";

import { defaultHubIcon , defaultHubIcon2 } from './BuildTileCollection';


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

export function getAssociatedSites(departmentId: string, callback: any, entireResponse: any , custCategories, hubsCategory, newData ) {

    //var departmentId = departmentId;
    // do a null check of department id
    //366df2ee-6476-4b15-a4fd-018dfae71e48 <= SPHub

    console.log('current department ID:', departmentId );
    sp.search(<ISearchQuery>{
        Querytext: `contentclass:STS_Site AND departmentId:{${departmentId}}`,
          SelectProperties: ["Title", "SPSiteUrl", "WebTemplate","departmentId","SiteLogoUrl"],
          RefinementFilters:[`departmentid:string("{*",linguistics=off)`],
          RowLimit: 500,
          TrimDuplicates: false})
          .then((r: SearchResults) => {
    
            console.log(r.RowCount);
            console.log(r.PrimarySearchResults);
            entireResponse.hubs = r.PrimarySearchResults;

            entireResponse.hubs.map( h => {
                h.sourceType = hubsCategory;
            });
            callback( entireResponse, custCategories, newData );
    
    });

}


import { Web, IList, IItem } from "@pnp/sp/presets/all";


import { makeSmallTimeObject, makeTheTimeObject,ITheTime, getAge, getBestTimeDelta, isStringValidDate, monthStr3} from '../../../../services/dateServices';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist, sortKeysByOtherKey } from '../../../../services/arrayServices';

import { getHelpfullError } from '../../../../services/ErrorHandler';

import { getExpandColumns, getKeysLike, getSelectColumns } from '../../../../services/getFunctions';

import { IUser } from '../IReUsableInterfaces';


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
        
                    console.log('thisSite: ', newTileCollection[i].title , newTileCollection[i].imageUrl );
        
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
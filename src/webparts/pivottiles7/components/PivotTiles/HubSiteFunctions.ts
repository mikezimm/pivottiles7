import { sp } from "@pnp/sp";

//https://sharepoint.stackexchange.com/questions/261222/spfx-and-pnp-sp-how-to-get-all-sites
//Just had to change SearchQuery to ISearchQuery.

import { ISearchQuery, SearchResults, ISearchResult } from "@pnp/sp/search";

import { IHubSiteWebData, IHubSiteInfo } from  "@pnp/sp/hubsites";
import "@pnp/sp/webs";
import "@pnp/sp/hubsites/web";


export async function getHubSiteData() {

    const webData: IHubSiteInfo = await sp.hubSites();

    console.log('IHubSiteInfo:', webData );

}

export async function getHubSiteData2() {

    //IHubSiteWebData
    const webData: any = await sp.web.hubSiteData();

    console.log('IHubSiteWebData:', webData );

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

export function getAssociatedSites(departmentId: string, callback: any ) {

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

            callback(r.PrimarySearchResults);
    
    });

}

export function getAssociatedSitesWorked(departmentId: string) {

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

            r.PrimarySearchResults.forEach((value) => {
               // do your stuff
          });
    });

}
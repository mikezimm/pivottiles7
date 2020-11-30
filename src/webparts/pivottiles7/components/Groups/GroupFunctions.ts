import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteGroupInfo, IPrincipalInfo, PrincipalType, PrincipalSource } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";

import { IMyGroups, ISingleGroup, IMyGroupsState } from './IMyGroupsState';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '../../../../services/arrayServices';

import { getHelpfullError } from '../../../../services/ErrorHandler';

import { mergeAriaAttributeValues } from "office-ui-fabric-react";

export function getPrincipalTypeString( type: PrincipalType ) {
    if ( type === 0 ) { return 'None'; }
    if ( type === 1 ) { return 'User'; }
    if ( type === 2 ) { return 'Distribution'; }
    if ( type === 4 ) { return 'Security'; }
    if ( type === 8 ) { return 'SharePoint'; }
    if ( type === 15 ) { return 'All'; }
}


//export async function provisionTestPage( makeThisPage:  IContentsGroupInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
    export async function allAvailableGroups( webURL: string, myGroups: IMyGroups, addTheseGroupsToState: any, setProgress: any, ) {

        let thisWebInstance = null;
        let thisGroupInfos = null;
    
        let newGroups : IMyGroups = myGroups;
        let allGroups : ISingleGroup[] = [];
        newGroups.counts = [];
        newGroups.titles = [];
        newGroups.isLoading = true;

        let errMessage = '';
        try {
            //` and Title ne \'Style Library\'`
            let groupAdder = "\' or Title eq \'";
            let groupFilter = "Title eq \'" + myGroups.propTitles.join( groupAdder ) + "\'";

            thisWebInstance = Web(webURL);
            allGroups = await thisWebInstance.siteGroups.filter( groupFilter ).get();
    
        } catch (e) {
            errMessage = getHelpfullError(e, true, true);
    
        }
    
        console.log('allAvailableGroups thisGroupInfos:' , allGroups);
    
        let indx = 0;
        let n = allGroups.length;
    
        for (let i in allGroups ) {
    
    //        allGroups[i].timeCreated = makeSmallTimeObject(allGroups[i].Created);
            let thisGroup = allGroups[i];
            let groupUsers : any = await getUsersFromGroup( webURL, 'Name', thisGroup.Title );

            if ( groupUsers.errMessage && groupUsers.errMessage.length > 0 ) {
                errMessage = errMessage.length > 0 ? errMessage += '\n' : errMessage;
                errMessage += groupUsers.errMessage;
                newGroups.counts.push( null );
                newGroups.titles.push( null );

            } else {
                allGroups[i].users = groupUsers.users;
                allGroups[i].uCount = groupUsers.users.length;
                newGroups.counts.push( groupUsers.users.length );
                newGroups.Ids.push(  allGroups[i].Id );
                newGroups.titles.push( allGroups[i].Title );
            }
        }
    
        if ( errMessage === '' && allGroups.length === 0 ) { 
            errMessage = 'This site/web does not have any subsites that you can see.';
        }

        if ( errMessage.length === 0 ) {
            newGroups.isLoading = false;
        }

        /**
         * resort titles back to original order
         */

        let sortedTitles = [];
        newGroups.propTitles.map( title => {
            if ( newGroups.titles.indexOf( title ) > -1 ) { sortedTitles.push(title) ; }
        });
        newGroups.titles = sortedTitles;
        
        newGroups.groups = allGroups;
        addTheseGroupsToState(newGroups,  errMessage);
        return { myGroups: newGroups, errMessage };
    
    }

    export async function getUsersFromGroup( webURL: string, titleOrId: 'Name' | 'Id' , thisGroup : string ) {

        let thisWebInstance = null;
        let users = [];
        let errMessage = '';
        try {
            thisWebInstance = Web(webURL);
            if ( titleOrId === 'Name' ) {
                users = await thisWebInstance.siteGroups.getByName( thisGroup ).users();
            } else {
                users = await thisWebInstance.siteGroups.getById( thisGroup ).users();
            }
        } catch (e) {
            errMessage = getHelpfullError(e, true, true);
        }
        return { users: users, errMessage: errMessage } ;

    }
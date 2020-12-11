import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteGroupInfo, IPrincipalInfo, PrincipalType, PrincipalSource } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PageContext } from '@microsoft/sp-page-context';

import { IMyGroups, ISingleGroup, IMyGroupsState, SiteAdminGroupName } from './IMyGroupsState';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '../../../../services/arrayServices';

import { getSiteAdmins } from '../../../../services/userServices';

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
        newGroups.Ids = [];
        newGroups.sortedIds = [];
        newGroups.sortedGroups = [];
        newGroups.isLoading = true;

        let errMessage = '';
        try {
            //` and Title ne \'Style Library\'`
            let groupAdder = "\' or Title eq \'";
            let groupFilter = "Title eq \'" + myGroups.propTitles.join( groupAdder ) + "\'";

            thisWebInstance = Web(webURL);
            allGroups = await thisWebInstance.siteGroups.filter( groupFilter ).get();
    
            if ( myGroups.propTitles.indexOf(SiteAdminGroupName) > -1 ) {
                //let siteAdmins = await getSiteAdmins( webURL, false);
                let adminGroup : ISingleGroup = {
                    users: [],
                    Title: SiteAdminGroupName,
                    Description: 'Have ultimate permissions',
                    AllowMembersEditMembership: false,
                    AllowRequestToJoinLeave: false,
                    AutoAcceptRequestToJoinLeave: false,
                    Id: -666,
                    IsHiddenInUI: false,
                    LoginName: null,
                    OnlyAllowMembersViewMembership: false,
                    OwnerTitle: SiteAdminGroupName,
                    PrincipalType: null,
                    RequestToJoinLeaveEmailSetting: null,
    
                    isLoading: null,
                    uCount: 0,
                    hasCurrentUser:  null,
                    groupProps:  null,
    
                };
    
                allGroups.push( adminGroup );

                /*
                newGroups.counts.push( adminGroup.users.length );
                newGroups.Ids.push(  adminGroup.Id );
                newGroups.titles.push( adminGroup.Title );
                */
            }

            
        } catch (e) {
            errMessage = getHelpfullError(e, true, true);
    
        }
    
        console.log('allAvailableGroups thisGroupInfos:' , allGroups);
    
        let indx = 0;
        let n = allGroups.length;
    
        for (let i in allGroups ) {
    
    //        allGroups[i].timeCreated = makeSmallTimeObject(allGroups[i].Created);
            let thisGroup = allGroups[i];
            let groupUsers : any = null;
            
            if ( thisGroup.Title === SiteAdminGroupName) {
                groupUsers = await getSiteAdmins( webURL, false);
            } else {
                groupUsers = await getUsersFromGroup( webURL, 'Name', thisGroup.Title );
            }

            if ( groupUsers.errMessage && groupUsers.errMessage.length > 0 ) {
                errMessage = errMessage.length > 0 ? errMessage += '\n' : errMessage;
                errMessage += groupUsers.errMessage;
                newGroups.counts.push( null );
                newGroups.titles.push( null );

            } else {
                let hasCurrentUser = false;

                groupUsers.users.map( user => { if ( user.Id === newGroups.userId ) { hasCurrentUser = true; } } ) ;
                let groupIndex : any = doesObjectExistInArray( newGroups.propProps, 'title', thisGroup.Title );

                thisGroup.users = groupUsers.users;
                thisGroup.uCount = groupUsers.users.length;
                thisGroup.hasCurrentUser = hasCurrentUser;
                thisGroup.groupProps = newGroups.propProps[ groupIndex ];
                newGroups.counts.push( groupUsers.users.length );
                newGroups.Ids.push(  thisGroup.Id );
                newGroups.titles.push( thisGroup.Title );
            }
        }


    
        if ( errMessage === '' && allGroups.length === 0 ) { 
            errMessage = 'This site/web does not have any subsites that you can see.';
        }

        if ( errMessage.length === 0 ) {
            newGroups.isLoading = false;
        }

        /**
         * resort titles back to original order because the response seems to be sorted by title if sort is not defined
         */

        let sortedTitles = [];
        newGroups.propTitles.map( title => {
            if ( newGroups.titles.indexOf( title ) > -1 ) { sortedTitles.push(title) ; }
        });

        // if ( myGroups.propTitles.indexOf( SiteAdminGroupName ) > -1 ) { sortedTitles.push( SiteAdminGroupName ) ; }
        
        sortedTitles.map( title => {
            allGroups.map( group => {
                if ( group.Title === title ) { 
                    newGroups.sortedIds.push ( group.Id ) ;
                    newGroups.sortedGroups.push ( group ) ;                
                }
            });
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
                try {
                    users = await thisWebInstance.siteGroups.getByName( thisGroup ).users();
                } catch (e) {
                    console.log('You may not have access to view members from this list: ', thisGroup );
                }
 
            } else {
                try {
                    users = await thisWebInstance.siteGroups.getById( thisGroup ).users();
                } catch (e) {
                    console.log('You may not have access to view members from this list: ', thisGroup );
                }
            }
        } catch (e) {
            errMessage = getHelpfullError(e, true, true);
        }
        return { users: users, errMessage: errMessage } ;

    }
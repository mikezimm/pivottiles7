import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteGroupInfo, IPrincipalInfo, PrincipalType, PrincipalSource } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PageContext } from '@microsoft/sp-page-context';
import { IGroupsProps } from './IMyGroupsProps';
import { IMyGroups, ISingleGroup, IMyGroupsState, SiteAdminGroupName, GuestsGroupName, GuestsIconName, SiteAdminIconName, } from './IMyGroupsState';
import { IUser } from '../../../../services/IReUsableInterfaces';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist, } from '../../../../services/arrayServices';

import { getSiteAdmins } from '../../../../services/userServices';

import { getHelpfullError } from '../../../../services/ErrorHandler';

import { mergeAriaAttributeValues, IconNames } from "office-ui-fabric-react";

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
        /**
         * get Group information based on Titles
         */
        try {
            //` and Title ne \'Style Library\'`
            let groupAdder = "\' or Title eq \'";
            let groupFilter = "Title eq \'" + myGroups.propTitles.join( groupAdder ) + "\'";

            thisWebInstance = Web(webURL);
            allGroups = await thisWebInstance.siteGroups.filter( groupFilter ).get();
    
            if ( myGroups.groupsShowAdmins === true && myGroups.propTitles.indexOf(SiteAdminGroupName) > -1 ) {
                //let siteAdmins = await getSiteAdmins( webURL, false);
                let adminGroup = createGroupObject( SiteAdminGroupName, 'Have ultimate permissions', -666, SiteAdminIconName );   
                allGroups.push( adminGroup );
            }

            
        } catch (e) {
            errMessage = getHelpfullError(e, true, true);
    
        }
    
        console.log('allAvailableGroups thisGroupInfos:' , allGroups);
    
        let indx = 0;
        let n = allGroups.length;
        let allUsers: IUser[] = [];
        let guestUsers: IUser[] = [];   
        /**
         * Fetch all users from groups
         */
        for (let i in allGroups ) {
    
    //        allGroups[i].timeCreated = makeSmallTimeObject(allGroups[i].Created);
            let thisGroup = allGroups[i];
            let groupUsers : any = null;
            
            if ( myGroups.groupsShowAdmins === true && thisGroup.Title === SiteAdminGroupName) {
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

                groupUsers.users.map( user => { 
                    if ( user.Id === newGroups.userId ) { hasCurrentUser = true; }
                    user.isGuest = false;
                    if ( user.IsEmailAuthenticationGuestUser === true || user.IsShareByEmailGuestUser === true || user.LoginName.indexOf('.external') > -1 ) {
                        user.isGuest = true;
                    }
                    let userIndex : any = doesObjectExistInArray( allUsers, 'Id', user.Id );
                    if ( userIndex === false ) { 
                        allUsers.push( user ) ;
                        if ( user.isGuest ) {
                            guestUsers.push( user ) ;
                        }
                    }
                } ) ;
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
        
        /**
         * Alphabetical sort user arrays
         */
        allUsers.sort((a,b) => a['Title'].localeCompare(b['Title']));
        guestUsers.sort((a,b) => a['Title'].localeCompare(b['Title']));

        /**
         * Add Guest Tab and users if there are any
         */
        if ( myGroups.groupsShowGuests === true && guestUsers.length > 0 ) {
            let guestGroup = createGroupObject( GuestsGroupName, 'External users in these groups', -999, GuestsIconName );
            guestGroup.uCount = guestUsers.length;
            guestGroup.users = guestUsers;
            guestGroup.OwnerTitle = 'See group owners';
            allGroups.push( guestGroup );
            newGroups.sortedIds.push ( guestGroup.Id ) ;
            newGroups.sortedGroups.push ( guestGroup ) ;
            newGroups.propTitles.push( GuestsGroupName ) ;
            newGroups.titles.push( GuestsGroupName ) ;
            newGroups.Ids.push( guestGroup.Id ) ; 
            newGroups.counts.push( guestGroup.uCount ) ; 
        }

        newGroups.groups = allGroups;
        newGroups.allUsers = allUsers;
        newGroups.guestUsers = guestUsers;

        console.log('allAvailableGroups newGroups:' , newGroups);

        addTheseGroupsToState(newGroups,  errMessage);
        return { myGroups: newGroups, errMessage };
    
    }

    function createGroupObject( title: string, desc: string, Id: number, iconName: string ) {

        let groupProps : IGroupsProps = {
            title: title,
            description: desc,
            styles: null,
            options: [],
            icon: iconName,
          };

        let thisGroup : ISingleGroup = {
            users: [],
            Title: title,
            Description: desc,
            AllowMembersEditMembership: false,
            AllowRequestToJoinLeave: false,
            AutoAcceptRequestToJoinLeave: false,
            Id: Id,
            IsHiddenInUI: false,
            LoginName: null,
            OnlyAllowMembersViewMembership: false,
            OwnerTitle: title,
            PrincipalType: null,
            RequestToJoinLeaveEmailSetting: null,

            isLoading: null,
            uCount: 0,
            hasCurrentUser:  null,
            groupProps:  groupProps,

        };

        return thisGroup;

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
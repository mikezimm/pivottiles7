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

import { IUser } from './IReUsableInterfaces';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";

import { getHelpfullError } from './ErrorHandler';

import { Web, IList, IItem, IItemAddResult, } from "@pnp/sp/presets/all";

import { doesObjectExistInArray } from './arrayServices';
import { isEqual } from '@microsoft/sp-lodash-subset';


export function checkIfUserExistsInArray( recentUsers : IUser[] , user: IUser ) {

    let remoteId : any = false;

    remoteId = doesObjectExistInArray(recentUsers, "Id", user.id, true );
    if ( remoteId === false ) { remoteId = doesObjectExistInArray(recentUsers, "email", user.email, true ); }
    if ( remoteId === false ) { remoteId = doesObjectExistInArray(recentUsers, "loginName", user.loginName, true ); }
    if ( remoteId === false ) { remoteId = doesObjectExistInArray(recentUsers, "email", user.email, true ); }
    if ( remoteId === false ) { remoteId = doesObjectExistInArray(recentUsers, "title", user.title, true ); }

    if ( remoteId === false ) {
        alert('Error addTheseFieldsToSaveObject:\n' +  JSON.stringify( user ));
    } else {
        remoteId = parseInt(remoteId, 10);
    }

    return remoteId;
}

//getEmailFromLoginName, checkForLoginName

/***
 *     d888b  d88888b d888888b      d88888b .88b  d88.  .d8b.  d888888b db      
 *    88' Y8b 88'     `~~88~~'      88'     88'YbdP`88 d8' `8b   `88'   88      
 *    88      88ooooo    88         88ooooo 88  88  88 88ooo88    88    88      
 *    88  ooo 88~~~~~    88         88~~~~~ 88  88  88 88~~~88    88    88      
 *    88. ~8~ 88.        88         88.     88  88  88 88   88   .88.   88booo. 
 *     Y888P  Y88888P    YP         Y88888P YP  YP  YP YP   YP Y888888P Y88888P 
 *                                                                              
 *                                                                              
 */


export function getEmailFromLoginName( uName: string ) {

let result = null;

if (uName.indexOf('|') > -1 && uName.indexOf('@') > 0 ) {
    //This is an ID structure from reading in from the list:  "i:0#.f|membership|clicky.mcclickster@mcclickster.onmicrosoft.com"
    let uProps = uName.split('|');
    let expectedEmailIndex = 2;
    if (uProps.length === 3 && uProps[expectedEmailIndex].indexOf('@') > -1) {
        result = uProps[expectedEmailIndex];
    } else {
        alert('Not able to find email from this user name: ' + uName );
    }
}

return result;

}

/***
 *     d888b  d88888b d888888b      db       .d88b.   d888b  d888888b d8b   db      d8b   db  .d8b.  .88b  d88. d88888b 
 *    88' Y8b 88'     `~~88~~'      88      .8P  Y8. 88' Y8b   `88'   888o  88      888o  88 d8' `8b 88'YbdP`88 88'     
 *    88      88ooooo    88         88      88    88 88         88    88V8o 88      88V8o 88 88ooo88 88  88  88 88ooooo 
 *    88  ooo 88~~~~~    88         88      88    88 88  ooo    88    88 V8o88      88 V8o88 88~~~88 88  88  88 88~~~~~ 
 *    88. ~8~ 88.        88         88booo. `8b  d8' 88. ~8~   .88.   88  V888      88  V888 88   88 88  88  88 88.     
 *     Y888P  Y88888P    YP         Y88888P  `Y88P'   Y888P  Y888888P VP   V8P      VP   V8P YP   YP YP  YP  YP Y88888P 
 *                                                                                                                      
 *                                                                                                                      
 */

export function checkForLoginName( u : IUser ) {

  let results = undefined;

  if ( u.Name ) {
      results = u.Name;

  } else if ( u.loginName ) {
      results = u.loginName;

  } else if ( u.LoginName ) {
      results = u.LoginName;

  } else if ( u.email ) {
      results = u.email;
  }

  return results;

}

/***
 *    d88888b d8b   db .d8888. db    db d8888b. d88888b      db    db .d8888. d88888b d8888b.      db   db d88888b d8888b. d88888b 
 *    88'     888o  88 88'  YP 88    88 88  `8D 88'          88    88 88'  YP 88'     88  `8D      88   88 88'     88  `8D 88'     
 *    88ooooo 88V8o 88 `8bo.   88    88 88oobY' 88ooooo      88    88 `8bo.   88ooooo 88oobY'      88ooo88 88ooooo 88oobY' 88ooooo 
 *    88~~~~~ 88 V8o88   `Y8b. 88    88 88`8b   88~~~~~      88    88   `Y8b. 88~~~~~ 88`8b        88~~~88 88~~~~~ 88`8b   88~~~~~ 
 *    88.     88  V888 db   8D 88b  d88 88 `88. 88.          88b  d88 db   8D 88.     88 `88.      88   88 88.     88 `88. 88.     
 *    Y88888P VP   V8P `8888Y' ~Y8888P' 88   YD Y88888P      ~Y8888P' `8888Y' Y88888P 88   YD      YP   YP Y88888P 88   YD Y88888P 
 *                                                                                                                                 
 *                                                                                                                                 
 */

export async function ensureUserHere( loginName: string, webUrl: string, supressSaveConflict: boolean ) {
    
    let thisListWeb = Web(webUrl);

    let errMessage = null;

    try {
        const user = await thisListWeb.ensureUser(loginName);
        const users = thisListWeb.siteUsers;
        await users.add(user.data.LoginName);
        console.log('ensureUserHere: user', user );
        console.log('ensureUserHere: users', users );
        return user ;

    } catch (e) {
        errMessage = getHelpfullError(e, true, true);
        let saveMessage =  'Ensure Failed!\n' + loginName + "\n" + webUrl + "\n" + errMessage;

        if ( supressSaveConflict === true && errMessage.indexOf('Save Conflict') === 0 ) {
          //Do nothting
        } else {
          alert( saveMessage );
        }

        console.log( saveMessage );
    }




}

/***
 *    d88888b d8b   db .d8888. db    db d8888b. d88888b      d888888b db   db d88888b .d8888. d88888b      db    db .d8888. d88888b d8888b. .d8888. 
 *    88'     888o  88 88'  YP 88    88 88  `8D 88'          `~~88~~' 88   88 88'     88'  YP 88'          88    88 88'  YP 88'     88  `8D 88'  YP 
 *    88ooooo 88V8o 88 `8bo.   88    88 88oobY' 88ooooo         88    88ooo88 88ooooo `8bo.   88ooooo      88    88 `8bo.   88ooooo 88oobY' `8bo.   
 *    88~~~~~ 88 V8o88   `Y8b. 88    88 88`8b   88~~~~~         88    88~~~88 88~~~~~   `Y8b. 88~~~~~      88    88   `Y8b. 88~~~~~ 88`8b     `Y8b. 
 *    88.     88  V888 db   8D 88b  d88 88 `88. 88.             88    88   88 88.     db   8D 88.          88b  d88 db   8D 88.     88 `88. db   8D 
 *    Y88888P VP   V8P `8888Y' ~Y8888P' 88   YD Y88888P         YP    YP   YP Y88888P `8888Y' Y88888P      ~Y8888P' `8888Y' Y88888P 88   YD `8888Y' 
 *                                                                                                                                                  
 *                                                                                                                                                  
 */

export async function ensureTheseUsers ( theseUsers: IUser[], checkTheseUsers: IUser[] , webUrl: string ) {

    let updateState: boolean = null;

    console.log('ensureTheseUsers', theseUsers);
    let recentUsers : IUser[] = checkTheseUsers;
    let ensureLogin : IUser[] = [];

    //Get each user and check if they are in stateUsers:  getEmailFromLoginName, checkForLoginName
    if ( theseUsers.length > 0 ) {
      theseUsers.map( ensureUser => {
        let loginName = checkForLoginName( ensureUser );
        if ( loginName ) {
  
          let isAlreadyInState = false;
  
          //Check if loginName of new user is already in state
          recentUsers.map( existingUser => {
            if ( existingUser.loginName === loginName ) { isAlreadyInState = true ; }
          });
  
          if ( isAlreadyInState === false ) {
            console.log('NEED TO ENSURE LOGIN: ', loginName );
            updateState = true;
            ensureUser.loginName = loginName;
            ensureLogin.push(ensureUser);
          }
        }
      });
    }

    if ( ensureLogin.length > 0 ) {
      for (let i = 0; i < ensureLogin.length; i++) {
        let user = await ensureUserHere( ensureLogin[i].loginName, webUrl, false );
        let localId = ensureLogin[i].id ? ensureLogin[i].id : ensureLogin[i].Id;
        recentUsers.push({
          id: localId,
          Id: localId,
          remoteID: user.data.Id,
          title: user.data.Title,
          Title: user.data.Title,
          loginName: user.data.LoginName,
          email: user.data.Email,
          PrincipalType: user.data.PrincipalType,
        });
      }
      console.log('updated state recentUsers: ', recentUsers );

    }

    return recentUsers;

  }


  /**
   * Updated function from https://github.com/pnp/pnpjs/issues/1480#issuecomment-745203843
   * 
  */
  import { PermissionKind } from '@pnp/sp/presets/all';

  export async function getUserPermissions( webUrl: string , supressError: boolean ) {
    let thisWeb = Web(webUrl);
    let errMessage = null;

    try {
        const userPerm = await thisWeb.getCurrentUserEffectivePermissions();
       
        console.log({
          'PermissionKind.ViewListItems': sp.web.hasPermissions(userPerm, PermissionKind.ViewListItems),
          'PermissionKind.AddListItems': sp.web.hasPermissions(userPerm, PermissionKind.AddListItems),
          'PermissionKind.ManageWeb': sp.web.hasPermissions(userPerm, PermissionKind.ManageWeb),
          'PermissionKind.FullMask': sp.web.hasPermissions(userPerm, PermissionKind.FullMask),
        });

        return { permissions: userPerm, errMessage: errMessage } ;

      } catch (e) {

        errMessage = getHelpfullError(e, true, true);
        if ( supressError === true && errMessage.indexOf('Save Conflict') === 0 ) {
          alert( errMessage );
        }
        console.log( 'getUserPermissions', errMessage ) ;
        return { users: [], errMessage: errMessage } ;

    }

  }

  export async function getSiteAdmins( webUrl: string , supressError: boolean ) {
    let thisWeb = Web(webUrl);

    let errMessage = null;
    //let adminFilter = "IsSiteAdmin eq true"; //This did not work....
    let adminFilter = "IsSiteAdmin eq 1";  //Updated per @koltyakov: https://github.com/pnp/pnpjs/issues/1480

    try {
 
      const siteAdmins = await thisWeb.siteUserInfoList.items.filter( adminFilter ).get();

      /**
       * This was added because loginName is not retured but is in other functions so it just copies it to make it easier to resuse.
       */
      siteAdmins.map( user => {
        if ( !user.loginName && user.Name ) { user.loginName = user.Name ; }
        if ( !user.Email && user.EMail ) { user.Email = user.EMail ; }
      });

      return { users: siteAdmins, errMessage: errMessage }  ;

    } catch (e) {

      errMessage = getHelpfullError(e, true, true);
      if ( supressError !== true ) {
        alert( errMessage );
      }
      console.log( 'getSiteAdmins', errMessage );

      return { users: [], errMessage: errMessage }  ;
  }
}


  export async function getSiteAdminsOrigMustBeSiteAdmin( webUrl: string , supressError: boolean ) {
    
    let thisWeb = Web(webUrl);

    let errMessage = null;
    let adminFilter = "IsSiteAdmin eq true";
    //This works in React PnpJS Tester:  sp.web.siteUsers.filter("IsSiteAdmin eq true")
    try {
        const users = thisWeb.siteUsers;
        let returnUsers = await users.filter(adminFilter).get();
        console.log('getSiteAdmins: users', returnUsers );

        return { users: returnUsers, errMessage: errMessage }  ;

    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

        if ( supressError === true && errMessage.indexOf('Save Conflict') === 0 ) {
          //Do nothting
        } else {
          alert( errMessage );
        }

        console.log( 'getSiteAdmins', errMessage );

        return { users: [], errMessage: errMessage }  ;
    }

}
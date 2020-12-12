
//Format for getting user photo
//https://mcclickster.sharepoint.com/sites/Templates/PowerShell/_layouts/15/userphoto.aspx?size=M&accountname=bb@mcclickster.onmicrosoft.com

import * as React from 'react';
import styles from "./MyGroups.module.scss";


import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons, IStackProps, PersonaSize, GroupedList } from 'office-ui-fabric-react';
import { PersonaCard } from "../Directory/PersonaCard/PersonaCard";
import { spservices } from "../../../../SPServices/spservices";
import * as strings from "Pivottiles7WebPartStrings";
import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  SearchBox,
  Icon,
  Label,
  Pivot,
  PivotItem,
  IPivotItemProps,
  PivotLinkFormat,
  PivotLinkSize,
  Dropdown,
  IDropdownOption
} from "office-ui-fabric-react";

import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { ISPServices } from "../../../../SPServices/ISPServices";
import stylesI from '../HelpInfo/InfoPane.module.scss';

import { IMyGroupsState, IMyGroups, SiteAdminGroupName, SiteAdminIconName, GuestsGroupName, GuestsIconName } from './IMyGroupsState';
import { IMyGroupsProps } from './IMyGroupsProps';

import { allAvailableGroups } from './GroupFunctions';


const orderOptions: IDropdownOption[] = [
    { key: "FirstName", text: "First Name" },
    { key: "LastName", text: "Last Name" },
    { key: "Department", text: "Department" },
    { key: "Location", text: "Location" },
    { key: "JobTitle", text: "Job Title" }
  ];

  const groupTitles = [
    'Title1' ,
    'Title2' ,
    'Title3' ,
    'Title4' ,   
  ];

export default class MyGroups extends React.Component<IMyGroupsProps, IMyGroupsState> {

    private _services: ISPServices = null;

/***
 *          .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
 *         d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
 *         8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
 *         8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
 *         Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
 *          `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
 *                                                                                                       
 *                                                                                                       
 */

private setMyGroups() {

    let myGroups: IMyGroups =  {
        groups:  [],
        sortedGroups: [],
        sortedIds: [],
        titles: this.props.groups,
        propTitles: JSON.parse(JSON.stringify( this.props.groups )), 
        propProps: this.props.groupsProps,
        Ids: [],
        isLoading: true,
        counts: [],
        userId: this.props.userId,
        allUsers: [],
        guestUsers: [],
        groupsShowAdmins: this.props.groupsShowAdmins,
        groupsShowGuests: this.props.groupsShowGuests,
    };

    return myGroups;



}

public constructor(props:IMyGroupsProps){
    super(props);
    this.state = { 
        myGroups: this.setMyGroups(),
        isLoading: true,
        errorMessage: "",
        hasError: false,
        indexSelectedKey: this.props.groups[0],
        selectedGroupId: null,
        selectedGroup: null,
        searchString: "LastName",
        searchText: ""
    };

        // Register event handlers
        this._searchUsers = this._searchUsers.bind(this);

    // because our event handler needs access to the component, bind 
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    // this.onLinkClick = this.onLinkClick.bind(this);

    
  }


  public componentDidMount() {
    console.log('componentDidMount MyGroups:', this.props.groups);
    this.fetchUsers( this.setMyGroups() );
  }


  /***
 *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
 *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
 *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
 *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
 *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
 *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
 *                                                                                         
 *                                                                                         
 */

  public componentDidUpdate(prevProps){

    let rebuildTiles = false;
    let reload = false;
    if (prevProps.width !== this.props.width ) { rebuildTiles = true ; }
    if (prevProps.groupsShowGuests !== this.props.groupsShowGuests ) { rebuildTiles = true ; }
    if (prevProps.groupsShowAdmins !== this.props.groupsShowAdmins ) { rebuildTiles = true ; }
    if ( prevProps.groups !== this.props.groups ) { reload = true ; }

    if ( reload === true ) {
      console.log('componentDidUpdate reloading MyGroups:', this.props.groups);
      this.fetchUsers( this.setMyGroups() );

    } else if (rebuildTiles === true) {
      console.log('componentDidUpdate rebuilding MyGroups:', this.props.groups);
      this._updateStateOnPropsChange();
    }
        /*
    */

  }

/***
 *         d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *         88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *         88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *         88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *         88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *         88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                          
 *                                                          
 */

    public render(): React.ReactElement<IMyGroupsProps> {
        const color = this.props.context.microsoftTeams ? "white" : "";

        let isLoaded = this.state.myGroups.isLoading === false ? true : false; 

        let webpartTitle = <div><WebPartTitle
            displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateProperty}
          /></div>;

        let searchBox = <div><SearchBox
          placeholder={strings.SearchPlaceHolder}
          styles={{
            root: {
              minWidth: 180,
              maxWidth: 300,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 25
            }
          }}
          onSearch={this._searchUsers}
          onClear={() => {
            this._searchUsers("A");
          }}
          value={this.state.searchText}
          onChange={this._searchBoxChanged}
        /></div>;

        let groupPivot = <div><Pivot
            styles={{
              root: {
                paddingLeft: 10,
                paddingRight: 10,
                whiteSpace: "normal",
                textAlign: "center"
              }
            }}
            linkFormat={PivotLinkFormat.tabs}
            selectedKey={this.state.indexSelectedKey}
            onLinkClick={this._selectedIndex.bind(this)}
            linkSize={PivotLinkSize.large}
          >
            { this.state.myGroups.sortedGroups.map(( thisGroup ) => { //_renderAdminsIcon
                return (<PivotItem headerText={thisGroup.Title} itemKey={thisGroup.Title} key={thisGroup.Title} itemIcon={ thisGroup.groupProps.icon } /> );
            })}
          </Pivot></div>;

          let selectedGroup = this.state.selectedGroup;

          let showNoUsers = isLoaded === false ? false : !selectedGroup.users || selectedGroup.users.length == 0 ? true : false;
          
          let DirectoryMessage = [];

          if ( isLoaded === true && selectedGroup.uCount === 0 ) {
            DirectoryMessage.push ( 
              <div><span style={{ marginLeft: 5, fontSize: "26px", color: color }}> { 'No users found in group' } </span></div> );
  
            if ( selectedGroup.OnlyAllowMembersViewMembership === true ) {
              DirectoryMessage.push ( 
                <div><span style={{ marginLeft: 5, fontSize: "12px", color: 'red' }}> { 'Only members of this group or the owners ( ' + selectedGroup.OwnerTitle + ' ) will see group members here.' } </span></div> );
            }
          }


          let noUsers = <div className={styles.noUsers}>
              <Icon
                iconName={"ProfileSearch"}
                style={{ fontSize: "54px", color: color }}
              />
              { DirectoryMessage }
            </div>;

            let errorBar = this.state.hasError ? <div><MessageBar messageBarType={MessageBarType.error}>
              {this.state.errorMessage}
            </MessageBar></div> : null ;


        let searchSpinner = showNoUsers !== true && this.state.isLoading ? <Spinner size={SpinnerSize.large} label={"searching ..."} /> : null ;
        let size : PersonaSize = PersonaSize.size72;
        let iconSize = 20;
        let iconTextSize = 16;

        if ( isLoaded !== true || !selectedGroup ) {
          //Do nothing if there are no groups
        } else if ( selectedGroup.users.length > 20 ) {
          size = PersonaSize.size28;
          iconSize = 14;
          iconTextSize = 12;
        } else if ( selectedGroup.users.length > 6 ) {
          size = PersonaSize.size32;  
          iconSize = 16;
          iconTextSize = 12;       
        }

        let loadGrid = isLoaded === true && selectedGroup &&
            selectedGroup.users && 
            selectedGroup.users.length > 0 ? true : false;

        let AllowMembersEditMembership = isLoaded === true && selectedGroup && selectedGroup.AllowMembersEditMembership === true  ? 
          <Icon 
            style={{ fontSize: 'large', fontWeight: 600 }}
            iconName={ "EditContact"}
            title={ "Group Members can edit membership"}            
          /> : null;

        let OnlyAllowMembersViewMembership = isLoaded === true && selectedGroup ? 
          <Icon  
            style={{ fontSize: 'large', fontWeight: 600, color: selectedGroup.OnlyAllowMembersViewMembership === true ? 'red' : 'black'  }}
            iconName={ selectedGroup.OnlyAllowMembersViewMembership === true ? "Hide3" : "View"}
            title={ selectedGroup.OnlyAllowMembersViewMembership === true ? "Members Hidden" : "Everyone can see members"}            
          /> : null;
        
        let IsHiddenInUI = isLoaded === true && selectedGroup && selectedGroup.IsHiddenInUI === true ? 
          <Icon  
            style={{ fontSize: 'large', fontWeight: 600 }}
            iconName={ "Hide"}
            title={ "Group hidden in UI"}            
          />: null;

        let RequestToJoinLeaveEmailSetting = isLoaded === true && selectedGroup && selectedGroup.RequestToJoinLeaveEmailSetting && selectedGroup.RequestToJoinLeaveEmailSetting.length > 0 ? 
        <Icon  
          style={{ fontSize: 'large', fontWeight: 600 }}
          iconName={ "Mail"}
          title={ "Email owner: " + selectedGroup.RequestToJoinLeaveEmailSetting }            
        />: null;

                
        let AutoAcceptRequestToJoinLeave = isLoaded === true && selectedGroup && selectedGroup.AutoAcceptRequestToJoinLeave === true ? 
          <Icon 
            style={{ fontSize: 'large', fontWeight: 600 }}
            iconName={ "UserFollowed"}
            title={ "You can join this group by CTRL-Clicking Group Title"}            
          />: null;

        let HasCurrentUser = isLoaded === true && selectedGroup && selectedGroup.hasCurrentUser === true ? 
        <Icon 
          style={{ fontSize: 'large', fontWeight: 600, color: 'darkgreen' }}
          iconName={ "ContactHeart"}
          title={ "You are in this group"}            
        />: null;

        //For some reason Description isn't getting returned
        let groupDescription = null;
        let Description = null;
        if ( isLoaded === true && selectedGroup ) {
          if ( selectedGroup.groupProps.description.length > 0 ) {
            groupDescription = selectedGroup.groupProps.description;
          } else { groupDescription = selectedGroup.Description && selectedGroup.Description.length > 0 ? selectedGroup.Description : ''; }

          Description = groupDescription.length > 0 ?
          <p style={{ whiteSpace: 'nowrap' }}><b>Description:</b> { groupDescription.substr(0,30) }</p> : null;
        }

        let groupElements = isLoaded === true && selectedGroup ? [ 
              <p style={{ whiteSpace: 'nowrap' }}><b>Id:</b> { selectedGroup.Id < 0 ? '-na-' : selectedGroup.Id  }</p>,
              Description,
              <p style={{ whiteSpace: 'nowrap' }} title={ 'People in ' + selectedGroup.OwnerTitle + ' can update this group'}><b>Owner:</b> { selectedGroup.OwnerTitle }</p>,
              <p style={{ whiteSpace: 'nowrap' }}><b>Users:</b> { selectedGroup.uCount }</p>,
              HasCurrentUser,
              OnlyAllowMembersViewMembership ,
              AllowMembersEditMembership ,
              IsHiddenInUI ,
              AutoAcceptRequestToJoinLeave ,
              RequestToJoinLeaveEmailSetting ,
            ] : [];

        let groupInfoTokens = { childrenGap: 20 };
        const groupInfo = isLoaded === true && selectedGroup
        ?  <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={groupInfoTokens} >{/* Stack for Buttons and Webs */}
              { groupElements }
          </Stack> : [];

        const diretoryGrid = loadGrid === true
            ? selectedGroup.users.map((user: any) => {
              return (
                <PersonaCard
                  context={this.props.context}
                  size = { size }
                  iconSize = { iconSize }
                  iconTextSize = { iconTextSize }     
                  profileProperties={{
                    isGuest: user.isGuest,
                    isSiteAdmin: user.IsSiteAdmin,
                    DisplayName: user.Title,
                    Title: '',
                    PictureUrl: this.props.webURL + '/_layouts/15/userphoto.aspx?size=M&accountname=' + user.Email ,
                    Email: user.Email,
                    Department: '',
                    WorkPhone: '',
                    Location: user.OfficeNumber
                      ? user.OfficeNumber
                      : user.BaseOfficeLocation
/*
                      DisplayName: user.PreferredName,
                      Title: user.JobTitle,
                      PictureUrl: user.PictureURL,
                      Email: user.WorkEmail,
                      Department: user.Department,
                      WorkPhone: user.WorkPhone,
                      Location: user.OfficeNumber
                        ? user.OfficeNumber
                        : user.BaseOfficeLocation
*/

                  }}
                />
              );
            })
            : [];

            let stackCardsTokens = { childrenGap: 10 };
            let sortDropdown = <div style={{ width: '100%', paddingTop: 10, paddingBottom: 10 }}>
              <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={stackCardsTokens} >{/* Stack for Buttons and Webs */}
                  {diretoryGrid}
              </Stack>
              </div>; //
            
            /*
            let sortDropdown = <div className={styles.dropDownSortBy}>
                <Dropdown
                  placeholder={strings.DropDownPlaceHolderMessage}
                  label={strings.DropDownPlaceLabelMessage}
                  options={orderOptions}
                  selectedKey={this.state.searchString}
                  onChange={(ev: any, value: IDropdownOption) => {
                    this._sortPeople(value.key.toString());
                  }}
                  styles={{ dropdown: { width: 200 } }}
                />
                <div>{diretoryGrid}</div>
            </div>;
            */
    
/***
 *              d888888b db   db d888888b .d8888.      d8888b.  .d8b.   d888b  d88888b 
 *              `~~88~~' 88   88   `88'   88'  YP      88  `8D d8' `8b 88' Y8b 88'     
 *                 88    88ooo88    88    `8bo.        88oodD' 88ooo88 88      88ooooo 
 *                 88    88~~~88    88      `Y8b.      88~~~   88~~~88 88  ooo 88~~~~~ 
 *                 88    88   88   .88.   db   8D      88      88   88 88. ~8~ 88.     
 *                 YP    YP   YP Y888888P `8888Y'      88      YP   YP  Y888P  Y88888P 
 *                                                                                     
 *                                                                                     
 */



/***
 *              d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *              88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *              88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *              88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
 *              88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *              88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *                                                                 
 *                                                                 
 */
        let stackSettingTokens = { childrenGap: 20, width: '100%' };

        //If you set the width here, it drives the overall width of the part.
        //For some reason it is shown as 1204 in the actual page... not the full width of the page.
        return (
          <div className={styles.directory} style={{ width: this.props.width }}>
            { webpartTitle }
            <Stack horizontal={false} wrap={false} horizontalAlign={"center"} tokens={stackSettingTokens}>{/* Stack for Buttons and Webs */}

                {/*
                    <div className={styles.searchBox}>
                      { searchBox } 
                    </div>
                    */
                }

                <div>
                  { groupPivot } 
                </div>

                <div>
                  { groupInfo } 
                </div>  

                { showNoUsers === true ? 
                      noUsers 

                  : this.state.isLoading ? 
                      searchSpinner
                
                  : this.state.hasError ? 
                      errorBar 

                  : 
                      sortDropdown 
                }

             </Stack>
          </div>
        );
      }

      private _renderAdminsIcon(link: IPivotItemProps, defaultRenderer: (link: IPivotItemProps) => JSX.Element): JSX.Element {
        return (
          <span>
            {defaultRenderer(link)}
            <Icon iconName= { SiteAdminIconName } style={{ fontWeight: 'bold', fontSize: 'larger', color: 'black' }} />
          </span>
        );
      }

      private _updateStateOnPropsChange() {
        this.setState({ 
        });
      }
      private fetchUsers( myGroups: IMyGroups ) {

        allAvailableGroups( this.props.webURL , myGroups, this.addTheseGroupsToState.bind(this), null );

      }

      private addTheseGroupsToState( myGroups: IMyGroups, errorMessage: string ) {

        console.log('addTheseGroupsToState', errorMessage );
        console.log('THE GROUPS', myGroups );

        this.setState({ 
            myGroups: myGroups,
            indexSelectedKey: myGroups.titles[0],
            isLoading: myGroups.isLoading,
            errorMessage: errorMessage,
            selectedGroupId: myGroups.sortedIds[0],
            selectedGroup: myGroups.sortedGroups[0],
        });
      }


  /**
   * Gets image base64
   * @param pictureUrl
   * @returns
   */
  private getImageBase64(pictureUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.addEventListener("load", () => {
        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = image.width,
          tempCanvas.height = image.height,
          tempCanvas.getContext("2d").drawImage(image, 0, 0);
        let base64Str;
        try {
          base64Str = tempCanvas.toDataURL("image/png");
        } catch (e) {
          return "";
        }

        resolve(base64Str);
      });
      image.src = pictureUrl;
    });
  }

  private _searchBoxChanged(newvalue: string): void {
    this.setState({ searchText: newvalue }, () => this._searchUsers(newvalue));
  }

  private async _searchUsers(searchText: string) {
    searchText = searchText.trim().length > 0 ? searchText : "A";
    this.setState({
      isLoading: true,
      indexSelectedKey: searchText.substring(0, 1).toLocaleUpperCase(),
      searchString: "LastName"
    });

    try {
      const users = await this._services.searchUsers(
        searchText,
        this.props.searchFirstName
      );
debugger;
      if (users && users.PrimarySearchResults.length > 0) {
        for (let index = 0; index < users.PrimarySearchResults.length; index++) {
          let user: any = users.PrimarySearchResults[index];
          if (user.PictureURL) {
            user = { ...user, PictureURL: await this.getImageBase64(`/_layouts/15/userphoto.aspx?size=M&accountname=${user.WorkEmail}`) };
            users.PrimarySearchResults[index] = user;
          }
        }
      }

      this.setState({
/*        users:
          users && users.PrimarySearchResults
            ? users.PrimarySearchResults
            : null,
            */
        isLoading: false,
        errorMessage: "",
        hasError: false
      });
    } catch (error) {
      this.setState({ errorMessage: error.message, hasError: true });
    }
  }

    /**
   *
   *
   * @private
   * @param {string} sortField
   * @memberof Directory
   */
  private async _sortPeople(sortField: string) {
    let _users = this.state.myGroups.groups[0].users;
    _users = _users.sort((a: any, b: any) => {
      switch (sortField) {
        // Sorte by FirstName
        case "FirstName":
          const aFirstName = a.FirstName ? a.FirstName : "";
          const bFirstName = b.FirstName ? b.FirstName : "";
          if (aFirstName.toUpperCase() < bFirstName.toUpperCase()) {
            return -1;
          }
          if (aFirstName.toUpperCase() > bFirstName.toUpperCase()) {
            return 1;
          }
          return 0;
          break;
        // Sort by LastName
        case "LastName":
          const aLastName = a.LastName ? a.LastName : "";
          const bLastName = b.LastName ? b.LastName : "";
          if (aLastName.toUpperCase() < bLastName.toUpperCase()) {
            return -1;
          }
          if (aLastName.toUpperCase() > bLastName.toUpperCase()) {
            return 1;
          }
          return 0;
          break;
        // Sort by Location
        case "Location":
          const aBaseOfficeLocation = a.BaseOfficeLocation
            ? a.BaseOfficeLocation
            : "";
          const bBaseOfficeLocation = b.BaseOfficeLocation
            ? b.BaseOfficeLocation
            : "";
          if (
            aBaseOfficeLocation.toUpperCase() <
            bBaseOfficeLocation.toUpperCase()
          ) {
            return -1;
          }
          if (
            aBaseOfficeLocation.toUpperCase() >
            bBaseOfficeLocation.toUpperCase()
          ) {
            return 1;
          }
          return 0;
          break;
        // Sort by JobTitle
        case "JobTitle":
          const aJobTitle = a.JobTitle ? a.JobTitle : "";
          const bJobTitle = b.JobTitle ? b.JobTitle : "";
          if (aJobTitle.toUpperCase() < bJobTitle.toUpperCase()) {
            return -1;
          }
          if (aJobTitle.toUpperCase() > bJobTitle.toUpperCase()) {
            return 1;
          }
          return 0;
          break;
        // Sort by Department
        case "Department":
          const aDepartment = a.Department ? a.Department : "";
          const bDepartment = b.Department ? b.Department : "";
          if (aDepartment.toUpperCase() < bDepartment.toUpperCase()) {
            return -1;
          }
          if (aDepartment.toUpperCase() > bDepartment.toUpperCase()) {
            return 1;
          }
          return 0;
          break;
        default:
          break;
      }
    });
    this.setState({ 

        //users: _users,

        searchString: sortField });
  }
  /**
   *
   *
   * @private
   * @param {PivotItem} [item]
   * @param {React.MouseEvent<HTMLElement>} [ev]
   * @memberof Directory
   */
  private _selectedIndex(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
    //this.setState({ searchText: "" }, () => this._searchUsers(item.props.itemKey));

    let clickedGroup = item.props.itemKey;

    let thisGroupIndex = this.state.myGroups.titles.indexOf( clickedGroup );
    let thisGroupId = this.state.myGroups.sortedIds[thisGroupIndex];

    if (ev.ctrlKey) {
      //Set clicked pivot as the hero pivot
//      alert('CTRL was clicked!');
      window.open( this.props.webURL + '/_layouts/15/people.aspx?MembershipGroupId=' + thisGroupId, '_blank');


    } else if (ev.altKey) {
      //Enable-disable ChangePivots options
//      alert('Alt was clicked!');
      window.open( this.props.webURL + '/_layouts/15/editgrp.aspx?Group=' + clickedGroup, '_blank');

    }
    ///_layouts/15/people.aspx?MembershipGroupId=6

    this.setState({ 
      searchText: "",
      indexSelectedKey: clickedGroup,
      selectedGroupId: thisGroupId,
      selectedGroup: this.state.myGroups.sortedGroups[thisGroupIndex],
     });

  }

}
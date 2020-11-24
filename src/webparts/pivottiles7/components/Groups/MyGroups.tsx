
//Format for getting user photo
//https://mcclickster.sharepoint.com/sites/Templates/PowerShell/_layouts/15/userphoto.aspx?size=M&accountname=bb@mcclickster.onmicrosoft.com

import * as React from 'react';
import styles from "./MyGroups.module.scss";


import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
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
  PivotLinkFormat,
  PivotLinkSize,
  Dropdown,
  IDropdownOption
} from "office-ui-fabric-react";

import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { ISPServices } from "../../../../SPServices/ISPServices";
import stylesI from '../HelpInfo/InfoPane.module.scss';

import { IMyGroupsState, IMyGroups } from './IMyGroupsState';
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
        titles: this.props.groups,
        Ids: [],
        isLoading: true,
        counts: [],
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
        indexSelectedKey: "PivotTiles Visitors",
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
    this.fetchUsers();
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
    /*
    if (rebuildTiles === true) {
      this._updateStateOnPropsChange({});
    }
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

        let selectedGroupIndex = this.props.groups.indexOf(this.state.indexSelectedKey);

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
            linkSize={PivotLinkSize.normal}
          >
            { this.props.groups.map((index: string) => {
              return (
                <PivotItem headerText={index} itemKey={index} key={index} />
              );
            })}
          </Pivot></div>;

          let showNoUsers = isLoaded === false || !this.state.myGroups.groups[0].users || this.state.myGroups.groups[0].users.length == 0 ? true : false;

          let noUsers = <div className={styles.noUsers}>
              <Icon
                iconName={"ProfileSearch"}
                style={{ fontSize: "54px", color: color }}
              />
              <Label>
                <span style={{ marginLeft: 5, fontSize: "26px", color: color }}>
                  {strings.DirectoryMessage}
                </span>
              </Label>
            </div>;

            let errorBar = this.state.hasError ? <div><MessageBar messageBarType={MessageBarType.error}>
              {this.state.errorMessage}
            </MessageBar></div> : null ;


        let searchSpinner = showNoUsers !== true && this.state.isLoading ? <Spinner size={SpinnerSize.large} label={"searching ..."} /> : null ;

        const diretoryGrid =
            isLoaded === true && this.state.myGroups.groups[ selectedGroupIndex ].users && this.state.myGroups.groups[ selectedGroupIndex ].users.length > 0
            ? this.state.myGroups.groups[ selectedGroupIndex ].users.map((user: any) => {
              return (
                <PersonaCard
                  context={this.props.context}
                  profileProperties={{
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

            
            let sortDropdown = <div style={{ width: '100%' }}>{diretoryGrid}</div>; //
            
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
        let stackSettingTokens = { childrenGap: 20 };

        return (
          <div className={styles.directory}>
            { webpartTitle }
            <Stack horizontal={false} wrap={false} horizontalAlign={"center"} tokens={stackSettingTokens}>{/* Stack for Buttons and Webs */}
 
                <div className={styles.searchBox}>
                  { searchBox } 
                </div>

                <div>
                  { groupPivot } 
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

      
      private fetchUsers() {

        allAvailableGroups( this.props.webURL , this.state.myGroups, this.addTheseGroupsToState.bind(this), null );

      }

      private addTheseGroupsToState( myGroups: IMyGroups, errorMessage: string ) {

        console.log('addTheseGroupsToState', errorMessage );
        console.log('THE GROUPS', myGroups );

        this.setState({ 
            myGroups: myGroups,
            isLoading: myGroups.isLoading,
            errorMessage: errorMessage,
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

    this.setState({ 
      searchText: "",
      indexSelectedKey: item.props.itemKey,
     });

  }

}
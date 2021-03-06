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

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';



import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme
} from '@microsoft/sp-component-base';

// npm install @pnp/logging @pnp/common @pnp/odata @pnp/sp --save
import { sp } from '@pnp/sp';
import { Web } from '@pnp/sp/presets/all';

import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";

import { trimEnd } from '@microsoft/sp-lodash-subset';
import { resultContent } from 'office-ui-fabric-react/lib/components/FloatingPicker/PeoplePicker/PeoplePicker.scss';
import { PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';

import { string, any } from 'prop-types';

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
import { propertyPaneBuilder } from '../../services/propPane/PropPaneBuilder';

import { pivotOptionsGroup, } from '../../services/propPane';

import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../services/createAnalytics';

require('../../services/propPane/GrayPropPaneAccordions.css');


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

import Pivottiles7 from './components/OriginalPivotTiles7/Pivottiles7';
import PivotTiles from './components/PivotTiles/PivotTiles';
import { IPivotTilesProps, IFetchInfoSettings, ICustomCategories, ICustomLogic, IPropChangeTypes, } from './components/PivotTiles/IPivotTilesProps';

import { IGroupsProps } from './components/Groups/IMyGroupsProps';
import { SiteAdminGroupName, SiteAdminIconName } from './components/Groups/IMyGroupsState';

import { IPivotTileItemProps,  } from './components/TileItems/IPivotTileItemProps';

import { availableListMapping } from './AvailableListMapping';

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

import * as strings from 'Pivottiles7WebPartStrings';


import { IPivottiles7WebPartProps,
  changeHubs, changeSubs, changeGroups, changeLists, changeFormats, changeItems, changeCats, changeFilters
  } from './IPivottiles7WebPartProps';

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

export default class Pivottiles7WebPart extends BaseClientSideWebPart<IPivottiles7WebPartProps> {

  //https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/supporting-section-backgrounds
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  
  //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
  public onInit():Promise<void> {

        // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    this.properties.lastPropChange = 'init';
    //IPropChangeTypes =  'hubs' | 'subs' | 'group' | 'lists' | 'format' | 'items' | 'other'; //lastPropChange

    return super.onInit().then(_ => {
      // other init code may be present

        //https://stackoverflow.com/questions/52010321/sharepoint-online-full-width-page
        console.log('location',window.location.href);
        if ( window.location.href && 
           window.location.href.indexOf("layouts/15/workbench.aspx") > 0  ) {
            
          if (document.getElementById("workbenchPageContent")) {
            document.getElementById("workbenchPageContent").style.maxWidth = "1300px";
          }
        } 
        
      sp.setup({
        spfxContext: this.context
      });

      //this.checkGroups();
      this.getAssociatedGroups();
      this.pushMissingDefaultsThatCauseIssues();
    });
  }

  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  public getUrlVars(): {} {
    var vars = {};
    vars = location.search
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((obj, pair) => {
      const [key, value] = pair.map(decodeURIComponent);
      return ({ ...obj, [key]: value });
    }, {});
    return vars;
  }

  private buildGroupProps( gName : string, description = '', styles = '', options = '' ) {
    let optionsArray : string[] = options !== '' ? JSON.parse(options) : null;
    let icon = null;
    if ( gName === SiteAdminGroupName && options === '' ) {
      optionsArray = [];
      icon = SiteAdminIconName;
    }
    if ( options.indexOf('iconName') > -1 ) {
      optionsArray.map( optObj => {
        if (optObj.indexOf('iconName=') === 0 ) { icon = optObj.substring( 9 ) ; }
      });
    }
    let result : IGroupsProps = {
      title: gName,
      description: description,
      styles: styles,
      options: optionsArray,
      icon: icon,
    };
    return result;
  }

  public getObjectFromString(message: string, str: string ) {

    let result : ICustomLogic[] = [];
    
    if ( str === null || str === undefined ) { return result; }
    try {
      result = JSON.parse(str);

    } catch(e) {
      console.error(message + ' is not a valid JSON object.  Please fix it and re-run');

    }
    
    return result;

  }

  public render(): void {

    let urlVars : any = this.getUrlVars();

    if ( urlVars.scenario && urlVars.scenario.toLowerCase() === 'dev' ) {  this.properties.scenario = 'DEV';  }

    this.pushMissingDefaultsThatCauseIssues();

    //Added for https://github.com/mikezimm/pivottiles7/issues/2
    if ( urlVars.category ) {  this.properties.setTab = urlVars.category;  }

    //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';

    let custCatLogi : ICustomLogic[] | string[] = null;
    let custCatCols  = [];
    let allTabs = [];

    if ( this.properties.custCatCols && this.properties.custCatCols.length > 0 ) {
      custCatCols = this.properties.custCatCols.split(';');
    } 

    if ( this.properties.custCatType === 'tileCategory' ) {

    } else if ( this.properties.custCatType === 'semiColon1' ) {
      custCatLogi = this.properties.custCatLogi.split(';');
      if ( custCatLogi.length === 0 ) { console.log( "custCatType === 'semiColon1' but custCatLogi IS EMPTY - No Categories will be shown!"); }
      else { 
        custCatLogi = custCatLogi.map(s => s.trim());
        allTabs = JSON.parse(JSON.stringify(custCatLogi)) ;
       } //Make copy of original tabs for sorting actual tabs later

    } else if ( this.properties.custCatType === 'semiColon2' ) {
      custCatLogi = this.properties.custCatLogi.split(';=');
      custCatLogi = custCatLogi.map(s => s.trim());
      if ( custCatLogi.length === 0 ) { console.log( "custCatType === 'semiColon2' but custCatLogi IS EMPTY - No Categories will be shown!"); }
      else { allTabs = JSON.parse(JSON.stringify(custCatLogi)) ; } //Make copy of original tabs for sorting actual tabs later

    } else if ( this.properties.custCatType === 'custom' ) {
      custCatLogi = this.getObjectFromString("Custom Category Logic", this.properties.custCatLogi );
      if ( custCatLogi.length === 0 ) { console.log( "custCatType === 'custom' but custCatLogi IS EMPTY - No Categories will be shown!"); }
      else {
        custCatLogi.map ( logic => {
          if ( logic.category.length > 0 ) { allTabs.push ( logic.category + '' ); } 
        });
      }
      allTabs = JSON.parse(JSON.stringify( allTabs ));
    }

    let custCategories : ICustomCategories = {
      type: this.properties.custCatType ,
      column: this.properties.custCatCols,
      logic: custCatLogi,
      break: this.properties.custCatBrak,
      allTabs: allTabs,
    };

    custCategories = JSON.parse(JSON.stringify(custCategories));

    let groupsList = [];
    let groupsProps : IGroupsProps[] = [];

    let groupString = this.properties.groupsList;
    if ( !groupString || groupString === '' ) { groupsList = [] ; } 
    else if ( groupString.indexOf('[') === 0 ) {
      //This is complex object
      try { 
        let groupsObject : IGroupsProps[] = JSON.parse(this.properties.groupsList);
        groupsObject.map ( group => {
          groupsList.push( group.title ) ;
        });
        groupsProps = groupsObject ;

      } catch (e) {
        let errMessage = getHelpfullError(e) ;
        alert( errMessage );
      }

    }
    else { //Assume semicolon based names
      groupString.split(';').map( g => { 
        let gName = g.trim();
        if ( gName.length > 0 ) { 
          groupsList.push( gName ) ;
          groupsProps.push ( this.buildGroupProps(gName) ) ;
        }
      } ) ;
    }

    let groupsShowAdmins = this.properties.groupsShowAdmins;
    let groupsShowGuests = this.properties.groupsShowGuests;

    if ( groupsShowAdmins === null || groupsShowAdmins === undefined || groupsShowAdmins === true ) {
      groupsProps.push( this.buildGroupProps(SiteAdminGroupName) );
      groupsList.push( SiteAdminGroupName ) ;
    }

    let fetchInfo : IFetchInfoSettings = {

      hubsInclude: this.properties.hubsInclude ,
      hubsCategory: this.properties.hubsCategory ,
      hubsLazy: this.properties.hubsLazy ,
      hubsOthers: this.properties.hubsOthers ,

      groupsInclude: this.properties.groupsInclude ,
      groupsCategory: this.properties.groupsCategory ,
      groupsLazy: this.properties.groupsLazy ,
      groupsList: groupsList ,
      groupsProps: groupsProps ,
      groupsOthers: this.properties.groupsOthers ,
      groupsShowAdmins: groupsShowAdmins === null || groupsShowAdmins === undefined ? true : groupsShowAdmins ,
      groupsShowGuests: groupsShowGuests === null || groupsShowGuests === undefined ? true : groupsShowGuests ,

      usersInclude: this.properties.usersInclude ,
      usersCategory: this.properties.usersCategory ,
      usersLazy: this.properties.usersLazy ,
      usersOthers: this.properties.usersOthers ,

      subsitesInclude: this.properties.subsitesInclude ,
      subsitesCategory: this.properties.subsitesCategory ,
      ignoreList: this.properties.ignoreList ,
      subsOthers: this.properties.subsOthers ,

      listsInclude: this.properties.listsInclude ,
      listIconStyles: this.properties.listIconStyles ,
      listFilter: this.properties.listFilter ,
      listCategory: 'Lists',
      listOthers: this.properties.listOthers ,

      libsInclude: this.properties.libsInclude ,
      libsIconStyles: this.properties.libsIconStyles ,
      libsFilter: this.properties.libsFilter ,
      libsCategory: 'Libraries',
      libsOthers: this.properties.libsOthers ,

      listHideSystem: this.properties.listHideSystem ,
      listLibCat: this.properties.listLibCat ,
    };

    let imageHeight = this.properties.imageHeight;
    let setSize = this.properties.setSize;
    if ( setSize === '150' || setSize === '100' || setSize === '300') {
      imageHeight = parseInt(setSize, 10);

    }

    let userId = this.context.pageContext.legacyPageContext.userId;
    let tenant = this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl,"");

    const element: React.ReactElement<IPivotTilesProps > = React.createElement(
      PivotTiles,
      {
        themeVariant: this._themeVariant,

          //IPropChangeTypes =  'hubs' | 'subs' | 'group' | 'lists' | 'format' | 'items' | 'other'; //lastPropChange
        lastPropChange: this.properties.lastPropChange,
        lastPropDetailChange: this.properties.lastPropDetailChange,

        context: this.context,

        //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
        WebpartElement: this.domElement,

        startTime: getTheCurrentTime(),
        scenario: this.properties.scenario,
        description: this.properties.description,
        listDefinition: this.properties.listDefinition,
        listWebURL: this.properties.listWebURL,
        listTitle: this.properties.listTitle,
        getAll: this.properties.getAll,

        pageContext: this.context.pageContext,
        heroType: this.properties.heroType,
        heroCategory: this.properties.heroCategory,
        heroRatio: this.properties.heroRatio,
        showHero: this.properties.showHero,
        setHeroFit: this.properties.setHeroFit,
        setHeroCover: this.properties.setHeroCover,
        onHoverEffect: this.properties.onHoverEffect,

        onHoverZoom: this.properties.onHoverZoom,
        setSize: this.properties.setSize,
        setRatio: this.properties.setRatio,
        setImgFit: this.properties.setImgFit,
        setImgCover: this.properties.setImgCover,
        target: this.properties.target,
        setFilter: this.properties.setFilter,

        filterTitle: this.properties.filterTitle ? this.properties.filterTitle : '',
        filterDescription: this.properties.filterDescription ? this.properties.filterDescription : '',
        filterEverything: this.properties.filterEverything === true ? true : false,

        propURLQuery: this.properties.propURLQuery,
        setTab: this.properties.setTab,
        otherTab: this.properties.otherTab,
        enableChangePivots: this.properties.enableChangePivots,
        maxPivotChars: 30,

        setPivSize: pivotOptionsGroup.getPivSize(this.properties.setPivSize),
        setPivFormat: pivotOptionsGroup.getPivFormat(this.properties.setPivFormat),
        setPivOptions: this.properties.setPivOptions,

        colTitleText: this.properties.colTitleText,
        colHoverText: this.properties.colHoverText,
        colCategory: this.properties.colCategory,
        colColor: this.properties.colColor,
        colSize: this.properties.colSize,
        colGoToLink: this.properties.colGoToLink,
        colOpenBehaviour: this.properties.colOpenBehaviour,
        colImageLink: this.properties.colImageLink,
        colSort: this.properties.colSort,
        colTileStyle: this.properties.colTileStyle,

        custCategories: custCategories,

        loadListItems: this.loadListItems,

        imageWidth: this.properties.imageWidth,
        imageHeight: imageHeight,
        textPadding: this.properties.textPadding,

        analyticsList: strings.analyticsList,
        analyticsWeb: tenant + strings.analyticsWeb,
        tenant: this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl,""),
        urlVars: this.getUrlVars(),

        //List column mapping - always available columns
        colModified: "Modified",
        colModifiedById: "Editor/ID",
        colModifiedByTitle: "Editor/Title",
        colCreated: "Created",
        colCreatedById: "Author/ID",
        colCreatedByTitle: "Author/Title",

        ignoreList: this.properties.ignoreList ,

        fetchInfo: fetchInfo,

      }
    );

    ReactDom.render(element, this.domElement);
  }

  private async loadListItems(): Promise<IPivotTileItemProps[]> {

    let useTileList: string = strings.DefaultTileList;
    
    //This line is causing an error in debugger mode:
    //unCaught Promise, can not read list Title of undefined.
    if ( this.properties.listTitle ) {
        useTileList = this.properties.listTitle;
    }

    let restFilter: string = "";
    if ( this.properties.setFilter ) {
      restFilter = this.properties.setFilter;
    }

    let restSort: string = "Title";
    if ( this.properties.colSort ) {
      restSort = this.properties.colSort;
    }

    let selectCols: string = "*";

    if ( this.properties.listWebURL.length > 0 ){
      let web = Web(this.properties.listWebURL);
      const result:IPivotTileItemProps[] = await web.lists.getByTitle(useTileList).items
        .select(selectCols).filter(restFilter).orderBy(restSort,true).getAll();
      return(result);

    } else {
      const result:IPivotTileItemProps[] = await sp.web.lists.getByTitle(useTileList).items
        .select(selectCols).filter(restFilter).orderBy(restSort,true).getAll();
      return(result);

    }

    //Handle error?
  
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return propertyPaneBuilder.getPropertyPaneConfiguration(this.properties);
  }

  //Added this per AC Facebook post...
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {

    if (propertyPath === 'listDefinition' && newValue !== oldValue) {
      //alert("Hey! " +propertyPath +" new value is " + newValue);
      //this.properties.listTitle = "TitleChanged!";
      //this.properties.colTitleText = "TitleTextChanged!";

      let newMap : any = {};
      if (this.properties.scenario === 'DEV' ) {
        newMap = availableListMapping.getListColumns(newValue);

      } else if (this.properties.scenario === 'TEAM') {
        newMap = availableListMapping.getListColumns(newValue);  

      } else if (this.properties.scenario === 'CORP') {
        newMap = availableListMapping.getListColumns(newValue); 

      }

      const hasValues = Object.keys(newMap).length;

      if (hasValues !== 0) {
        
        this.properties.listTitle = newMap.listDisplay;
        this.properties.colTitleText = newMap.listMapping.colTitleText;
        this.properties.colHoverText = newMap.listMapping.colHoverText;
        this.properties.colCategory = newMap.listMapping.colCategory;
        this.properties.colColor = newMap.listMapping.colColor;
        this.properties.colSize = newMap.listMapping.colSize;
        this.properties.colGoToLink = newMap.listMapping.colGoToLink;
        this.properties.colOpenBehaviour = newMap.listMapping.colOpenBehaviour;
        this.properties.colImageLink = newMap.listMapping.colImageLink;
        this.properties.colSort = newMap.listMapping.colSort;
        this.properties.colTileStyle = newMap.listMapping.colTileStyle;
        this.properties.listWebURL = newMap.testSite;
        this.properties.setFilter = newMap.setFilter;
        this.properties.setTab = newMap.setTab;
        
        this.properties.custCatType = newMap.custCatType;
        this.properties.custCatLogi = newMap.custCatLogi;
        
      } else {
        console.log('Did NOT List Defintion... updating column name props');

      }

      this.context.propertyPane.refresh();
    }

    //If the the list is somewhere else (not on this site, auto-disable subsites due to complexity)
    if (propertyPath === 'groupsInclude' ) {
      if ( !this.properties.groupsList || this.properties.groupsList === '' ) {
        let defaultGroupList : any = Promise.resolve(this.getAssociatedGroups());
        this.properties.groupsList = defaultGroupList ;
      }
    }

    //If the the list is somewhere else (not on this site, auto-disable subsites due to complexity)
    if (propertyPath === 'listWebURL' && newValue === '' ) {
      this.properties.subsitesInclude = false;
    } else { 

    }

    let updateOnThese = [];
    updateOnThese.push( ...changeHubs );
    updateOnThese.push( ...changeSubs );
    updateOnThese.push( ...changeGroups );
    updateOnThese.push( ...changeLists );
    updateOnThese.push( ...changeFormats );
    updateOnThese.push( ...changeItems );
    updateOnThese.push( ...changeCats );
    updateOnThese.push( ...changeFilters );

    //export type IPropChangeTypes =  'hubs' | 'subs' | 'group' | 'lists' | 'format' | 'items' | 'other' | 'cats' | 'filters' | 'init' ; //lastPropChange
    let previousChange = this.properties.lastPropChange + '';
    if ( changeHubs.indexOf( propertyPath ) > - 1 ) { this.properties.lastPropChange = 'hubs' ; } 
    else if ( changeSubs.indexOf( propertyPath ) > - 1 ) { this.properties.lastPropChange = 'subs' ; } 
    else if ( changeGroups.indexOf( propertyPath ) > - 1 ) { this.properties.lastPropChange = 'groups' ; } 
    else if ( changeLists.indexOf( propertyPath ) > - 1 ) { this.properties.lastPropChange = 'lists' ; } 
    else if ( changeFormats.indexOf( propertyPath ) > - 1 ) { this.properties.lastPropChange = 'format' ; } 
    else if ( changeItems.indexOf( propertyPath ) > - 1 ) { this.properties.lastPropChange = 'items' ; } 
    else if ( changeCats.indexOf( propertyPath ) > - 1 ) { this.properties.lastPropChange = 'cats' ; } 
    else if ( changeFilters.indexOf( propertyPath ) > - 1 ) { this.properties.lastPropChange = 'filters' ; } 
    else { this.properties.lastPropChange = 'other' ; }

    if (updateOnThese.indexOf(propertyPath) > -1 || previousChange !== this.properties.lastPropChange ) {
      this.properties[propertyPath] = newValue;   
      this.properties.lastPropDetailChange = propertyPath;
      this.context.propertyPane.refresh();

    } else { //This can be removed if it works
     
      if (propertyPath === 'heroType') {
        this.properties.heroType = newValue;

        if (newValue === 'header' || newValue === 'inLine' || newValue === 'footer') {
          this.properties.setHeroCover = 'portrait';
          this.properties.setHeroFit = 'centerCover';

        } else if (newValue === 'left' || newValue === 'right') {
          this.properties.setHeroCover = 'portrait';
          this.properties.setHeroFit = 'centerContain';
        }

        this.context.propertyPane.refresh();
      }

    }
    this.render();
  }

  private checkGroups() {

    if ( this.properties.groupsList && this.properties.groupsList.length > 0 ) {
      let test = null;
      let groupList2 = this.getAssociatedGroups().then( result => {
        test = result;
      });
      console.log('Groups:' , groupList2 );

    }

  }

  private async pushMissingDefaultsThatCauseIssues() {
    let madeUpdate = false;
    if ( !this.properties.hubsCategory ) { this.properties.hubsCategory = 'Hub'; madeUpdate = true; console.log('Autoset hubsCategory property'); }
    if ( !this.properties.subsitesCategory ) { this.properties.subsitesCategory = 'Subsites'; madeUpdate = true; console.log('Autoset subsitesCategory property'); }
    if ( !this.properties.groupsCategory ) { this.properties.groupsCategory = 'Groups'; madeUpdate = true; console.log('Autoset groupsCategory property'); }
    if ( !this.properties.colSort ) { this.properties.colSort = 'Title'; madeUpdate = true; console.log('Autoset colSort property'); }
    if ( this.properties.custCatType === 'semiColon1' || this.properties.custCatType ===  'semiColon2' ) {
      if ( !this.properties.custCatLogi ) { this.properties.custCatLogi = "Set;Categories;Here;Now"; madeUpdate = true; console.log('Autoset custCatLogi property'); }
    }

    if ( madeUpdate === true ) {
      this.context.propertyPane.refresh();
      this.render();
    }

  }

  private async getAssociatedGroups()  {

    if ( this.properties.groupsList && this.properties.groupsList.length > 0 ) {
      return;

    } else {
      let results : IGroupsProps[] = [];
      let list : string[] = [];
      // Gets the associated owners group of a web
      const ownerGroup = await sp.web.associatedOwnerGroup();
      if ( ownerGroup ) { 
        results.push( this.buildGroupProps( ownerGroup.Title , 'Current OWNER Group') ) ; 
        //list.push( ownerGroup.Title );
      }
  
      // Gets the associated members group of a web
      const memberGroup = await sp.web.associatedMemberGroup();
      if ( memberGroup ) { 
        results.push( this.buildGroupProps( memberGroup.Title , 'Current MEMBER Group' ) ) ; 
        //list.push( memberGroup.Title ); 
      }
  
      // Gets the associated visitors group of a web
      const visitorGroup = await sp.web.associatedVisitorGroup();
      if ( visitorGroup ) { 
        results.push( this.buildGroupProps( visitorGroup.Title , 'Current VISITOR Group' ) ) ;
        //list.push( visitorGroup.Title );
     }
      
      let resultsString = JSON.stringify( results );
      this.properties.groupsList = resultsString;

      this.context.propertyPane.refresh();
  
      return ;
    }

  }
}

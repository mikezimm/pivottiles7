import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'Pivottiles7WebPartStrings';
import Pivottiles7 from './components/OriginalPivotTiles7/Pivottiles7';

import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme
} from '@microsoft/sp-component-base';

// npm install @pnp/logging @pnp/common @pnp/odata @pnp/sp --save
import { sp } from '@pnp/sp';
import { Web } from '@pnp/sp/presets/all';

import { IPivottiles7WebPartProps } from './IPivottiles7WebPartProps';
import PivotTiles from './components/PivotTiles/PivotTiles';
import { IPivotTilesProps, IFetchInfoSettings, ICustomCategories, ICustomLogic } from './components/PivotTiles/IPivotTilesProps';
import { IPivotTileItemProps } from './components/TileItems/IPivotTileItemProps';
import { string, any } from 'prop-types';
import { propertyPaneBuilder } from '../../services/propPane/PropPaneBuilder';
import { availableListMapping } from './AvailableListMapping';


import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../services/createAnalytics';

require('../../services/propPane/GrayPropPaneAccordions.css');

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

    let fetchInfo : IFetchInfoSettings = {

      hubsInclude: this.properties.hubsInclude ,
      hubsCategory: this.properties.hubsCategory ,
      hubsLazy: this.properties.hubsLazy ,
    
      groupsInclude: this.properties.groupsInclude ,
      groupsSetting: this.properties.groupsSetting ,
      groupsLazy: this.properties.groupsLazy ,

      usersInclude: this.properties.usersInclude ,
      usersSetting: this.properties.usersSetting ,
      usersLazy: this.properties.usersLazy ,

      subsitesInclude: this.properties.subsitesInclude ,
      subsitesCategory: this.properties.subsitesCategory ,
      ignoreList: this.properties.ignoreList ,

      listsInclude: this.properties.listsInclude ,
      listIconStyles: this.properties.listIconStyles ,
      listFilter: this.properties.listFilter ,
      listCategory: 'Lists',

      libsInclude: this.properties.libsInclude ,
      libsIconStyles: this.properties.libsIconStyles ,
      libsFilter: this.properties.libsFilter ,
      libsCategory: 'Libraries',
      listHideSystem: this.properties.listHideSystem ,

      listLibCat: this.properties.listLibCat ,
    };

    let imageHeight = this.properties.imageHeight;
    let setSize = this.properties.setSize;
    if ( setSize === '150' || setSize === '100' || setSize === '300') {
      imageHeight = parseInt(setSize, 10);

    }
    const element: React.ReactElement<IPivotTilesProps > = React.createElement(
      PivotTiles,
      {
        themeVariant: this._themeVariant,

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
        filterOnlyList: this.properties.filterOnlyList === true ? true : false,

        propURLQuery: this.properties.propURLQuery,
        setTab: this.properties.setTab,
        otherTab: this.properties.otherTab,
        enableChangePivots: this.properties.enableChangePivots,
        maxPivotChars: 30,

        setPivSize: this.properties.setPivSize,
        setPivFormat: this.properties.setPivFormat,
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
        analyticsWeb: strings.analyticsWeb,
        tenant: this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl,""),
        urlVars: this.getUrlVars(),

        //List column mapping - always available columns
        colModified: "Modified",
        colModifiedById: "Editor/ID",
        colModifiedByTitle: "Editor/Title",
        colCreated: "Created",
        colCreatedById: "Author/ID",
        colCreatedByTitle: "Author/Title",

        subsitesInclude: this.properties.subsitesInclude ,
        subsitesCategory: this.properties.subsitesCategory ,
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
        
      } else {
        console.log('Did NOT List Defintion... updating column name props');

      }

      this.context.propertyPane.refresh();
    }

    //If the the list is somewhere else (not on this site, auto-disable subsites due to complexity)
    if (propertyPath === 'listWebURL' && newValue === '' ) {
      this.properties.subsitesInclude = false;
    } else { 

    }

    let updateOnThese = [
      'setSize','setTab','otherTab','setPivSize','heroCategory','heroRatio','showHero','setPivFormat','setImgFit','setImgCover','target',
      'imageWidth','imageHeight','textPadding','setHeroFit','setHeroCover','onHoverZoom', 'enableChangePivots', 'definitionToggle',
      'custCatType', 'custCatCols', 'custCatLogi', 'custCatBrak',
      'subsitesCategory', 'ignoreList', 'ignoreList', 

      'listsInclude', 'listIconStyles', 'listFilter', 'listLibCat', 
      'libsInclude', 'libsIconStyles', 'libsFilter', 'listHideSystem', 
      'hubsInclude', 'hubsCategory',
      'setFilter', 'filterTitle', 'filterDescription', 'filterOnlyList', 


    ];

    if (updateOnThese.indexOf(propertyPath) > -1 ) {
      this.properties[propertyPath] = newValue;   
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
}

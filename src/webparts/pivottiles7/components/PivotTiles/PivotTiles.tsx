
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


import { IReadonlyTheme } from '@microsoft/sp-component-base';

import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { escape } from '@microsoft/sp-lodash-subset';

import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { DefaultButton, autobind } from 'office-ui-fabric-react';
//https://pnp.github.io/pnpjs/documentation/polyfill/ -- Needed to select/extend pnpJs in IE11
//import "@pnp/polyfill-ie11"; //Removed in Pviottiles7 -- going only modern browser
import { sp } from '@pnp/sp';

import { Web,  } from '@pnp/sp/presets/all';
import { IWebInfo  } from '@pnp/sp/webs';

 
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import { ISearchQuery, SearchResults, ISearchResult } from "@pnp/sp/search";

import { IHubSiteWebData, IHubSiteInfo } from  "@pnp/sp/hubsites";

import "@pnp/sp/webs";
import "@pnp/sp/hubsites/web";
import { WebPartContext } from '@microsoft/sp-webpart-base';

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

import { SystemLists, TempSysLists, TempContLists, entityMaps, EntityMapsNames } from '@mikezimm/npmfunctions/dist/Constants';

import { jiraIcon, defaultHubIcon, defaultHubIcon2 } from '@mikezimm/npmfunctions/dist/Icons';

import { doesObjectExistInArray } from '@mikezimm/npmfunctions/dist/arrayServices';
import { getHelpfullError } from '@mikezimm/npmfunctions/dist/ErrorHandler';

import { encodeDecodeString } from '@mikezimm/npmfunctions/dist/stringServices';


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

import { pivotOptionsGroup, } from '../../../../services/propPane';

import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../../../services/createAnalytics';


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

import tUtils from './../TileItems/utilTiles';
import InfoPage from '../HelpInfo/infoPages';
import  EarlyAccess from '../HelpInfo/EarlyAccess';

import * as links from '../HelpInfo/AllLinks';
import MyCommandBar from '../CommandBar/CommandBar';

import { convertCategoryToIndex, fixURLs } from './UtilsNew';

import { buildTileCategoriesFromResponse } from './BuildTileCategories';

import {  buildTileCollectionFromAllResponse, ifNotExistsReturnNull } from './BuildTileCollection';

import { CustTime , custTimeOption, } from './QuickBuckets';

import { getAssociatedSites , getHubSiteData, getHubSiteData2, allAvailableHubWebs } from './HubSiteFunctions';

import { createIconButton , defCommandIconStyles} from "../createButtons/IconButton";

//import DirectoryHook from '../Directory/DirectoryHook';

import MyGroups from '../Groups/MyGroups';

import * as myErrors from './ErrorMessages';
import * as tileBuilders from './TileBuilder';

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


import { changeHubs, changeSubs, changeGroups, changeLists, changeFormats, changeItems, changeCats, changeFilters
} from '../../IPivottiles7WebPartProps';

import { IPivotTilesProps, ICustomCategories, ICustomLogic } from './IPivotTilesProps';
import { IPivotTilesState } from './IPivotTilesState';
import { IPivotTileItemProps } from './../TileItems/IPivotTileItemProps';
import PivotTileItem from './../TileItems/PivotTileItem';

import * as strings from 'Pivottiles7WebPartStrings';

import tileStyles from './../TileItems/PivotTileItem.module.scss';

import styles from './PivotTiles.module.scss';

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



/*
                title: this.properties.title,
                context: this.context,
                searchFirstName: this.properties.searchFirstName,
                displayMode: this.displayMode,
                updateProperty: (value: string) => {
                    this.properties.title = value;
                },
                searchProps: this.properties.searchProps,
                clearTextSearchProps: this.properties.clearTextSearchProps,
                pageSize: this.properties.pageSize
*/


export const LoadErrorIcon = 'ErrorBadge';

export default class PivotTiles extends React.Component<IPivotTilesProps, IPivotTilesState> {

   
  private currentPageUrl = this.props.pageContext.web.absoluteUrl + this.props.pageContext.site.serverRequestPath;

  /***
 *     .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
 *    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
 *    8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
 *    8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
 *    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
 *     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
 *                                                                                                  
 *                                                                                                  
 */

  //https://www.youtube.com/watch?v=4nsGhYjfRsw 9:01-ish talks about setting constructor
//  public constructor(props:IPivotTilesProps){
  public constructor(props:IPivotTilesProps){
    super(props);

    var departmentId = this.props.pageContext.legacyPageContext.departmentId;
    let custCategories = JSON.parse(JSON.stringify(this.props.custCategories)) ;
    getHubSiteData();
    getHubSiteData2();
//    let hubInfo = getAssociatedSites( departmentId, null ) ;
 //   console.log('hubInfo', hubInfo ) ;

    let urlVars : any = this.props.urlVars;
    let debugMode = urlVars.debug === 'true' ? true : false;
    let isWorkbench = this.currentPageUrl.indexOf('_workbench.aspx') > 0 ? true : false;

    let showDevHeader = debugMode === true || isWorkbench === true ? true : false;

    console.log('devHeader:', urlVars, debugMode, isWorkbench, showDevHeader );

    this.state = { 

      //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
      WebpartHeight: this.props.WebpartElement.getBoundingClientRect().height ,
      WebpartWidth:  this.props.WebpartElement.getBoundingClientRect().width ,

      lastStateChange: 'constructor',

      allTiles:[],
      filteredTiles:[],
      lastFilteredTiles:[],
      heroTiles:[],
      pivtTitles:[],
      showAllTiles: false,
      filteredCategory: this.props.setTab,
      resortCat: this.props.setTab,
      pivotDefSelKey:"",
      loadStatus:"Loading",
      showTips: "none",
      loadError: "",
      lookupColumns: [],
      showOtherTab: false,
      heroCategory: this.props.heroCategory,
      searchShow: true,
      shuffleShow: true,
      searchCount: 0,
      searchWhere: '',
      sortAsc: true,
      searchType: '',
      listStaticName: this.props.listTitle,
      heroCategoryError: false,
      listError: false,
      itemsError: false,
      heroError: false,
      setLayout: this.props.setSize,
      colCategory: this.props.colCategory,
      thisCatColumn: 'category',
      changePivotCats: false,
      custCategories: custCategories,
      originalListItems: [],
      originalWebs: [],
      originalLists: [],
      originalHubs: [],
      departmentId: departmentId,
      showDevHeader: showDevHeader,
    };

    console.log('PivotTiles.tsx Constructor: this.props', this.props);

    // because our event handler needs access to the component, bind 
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    this.onLinkClick = this.onLinkClick.bind(this);
    this.toggleTips = this.toggleTips.bind(this);
    this.minimizeTiles = this.minimizeTiles.bind(this);
    this.searchMe = this.searchMe.bind(this);
    this.showAll = this.showAll.bind(this);
    this.toggleLayout = this.toggleLayout.bind(this);
    this.onChangePivotClick = this.onChangePivotClick.bind(this);
    
  }

  /***
   *     .o88b.  .d88b.  .88b  d88. d8888b.      d8888b. d888888b d8888b.      .88b  d88.  .d88b.  db    db d8b   db d888888b 
   *    d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D      88  `8D   `88'   88  `8D      88'YbdP`88 .8P  Y8. 88    88 888o  88 `~~88~~' 
   *    8P      88    88 88  88  88 88oodD'      88   88    88    88   88      88  88  88 88    88 88    88 88V8o 88    88    
   *    8b      88    88 88  88  88 88~~~        88   88    88    88   88      88  88  88 88    88 88    88 88 V8o88    88    
   *    Y8b  d8 `8b  d8' 88  88  88 88           88  .8D   .88.   88  .8D      88  88  88 `8b  d8' 88b  d88 88  V888    88    
   *     `Y88P'  `Y88P'  YP  YP  YP 88           Y8888D' Y888888P Y8888D'      YP  YP  YP  `Y88P'  ~Y8888P' VP   V8P    YP    
   *                                                                                                                          
   *                                                                                                                          
   */


  public componentDidMount() {
    //Not using this function because it just did not want to work.
    //this._loadListItems();
    this._getListItems( this.props.custCategories );
    //alert('this.props.heroCategory.length');
    //alert(this.props);
  }
  
  /***
   *     .o88b.  .d88b.  .88b  d88. d8888b.      d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
   *    d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D      88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
   *    8P      88    88 88  88  88 88oodD'      88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
   *    8b      88    88 88  88  88 88~~~        88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
   *    Y8b  d8 `8b  d8' 88  88  88 88           88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
   *     `Y88P'  `Y88P'  YP  YP  YP 88           Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
   *                                                                                                                             
   *                                                                                                                             
   */

  public componentDidUpdate(prevProps){

    //alert('componentDidUpdate 1');

    console.log( 'CDU:  LAST-STATE-CHANGE:', this.props.lastPropDetailChange, this.state.lastStateChange );

    let rebuildTiles : boolean = false;

    let reloadData : boolean = false;

    let theTrigger : any = null;

    if ( prevProps.lastPropChange === this.props.lastPropChange ) { 
      //Then check individual props
      if (this.props.setFilter !== prevProps.setFilter) {  reloadData = true ; theTrigger = 'setFilter'; }  
      else if (this.props.filterTitle !== prevProps.filterTitle) {  reloadData = true ; theTrigger = 'filterTitle'; }  
      else if (this.props.filterDescription !== prevProps.filterDescription) {  reloadData = true ; theTrigger = 'filterDescription'; }  
      else if (this.props.filterEverything !== prevProps.filterEverything) {  reloadData = true ; theTrigger = 'filterEverything'; }  
      else if (this.props.listDefinition !== prevProps.listDefinition) {  reloadData = true ; theTrigger = 'listDefinition'; }  
      else if (this.props.listWebURL !== prevProps.listWebURL) {  reloadData = true ; theTrigger = 'listWebURL'; }  
      else if (this.props.listTitle !== prevProps.listTitle) {  reloadData = true ; theTrigger = 'listTitle'; }  
      else if ( JSON.stringify(this.props.custCategories) !== JSON.stringify(prevProps.custCategories)) {  reloadData = true ; theTrigger = 'custCategories'; }    
      else if (this.props.ignoreList !== prevProps.ignoreList) {  reloadData = true ; theTrigger = 'ignoreList'; }    
      else if ( JSON.stringify(this.props.fetchInfo) !== JSON.stringify(prevProps.fetchInfo) ) {  reloadData = true ; theTrigger = 'fetchInfo'; }

      console.log( 'CDU: theTrigger section 1:', theTrigger );

      if (this.props.setTab !== prevProps.setTab) {  rebuildTiles = true ; }
      else if (this.props.setSize !== prevProps.setSize) {  rebuildTiles = true ; theTrigger = 'setSize'; }
      else if (this.props.showHero !== prevProps.showHero) {  rebuildTiles = true ; theTrigger = 'showHero'; }
      else if (this.props.heroType !== prevProps.heroType) {  rebuildTiles = true ; theTrigger = 'heroType'; }
      else if (this.props.setRatio !== prevProps.setRatio) {  rebuildTiles = true ; theTrigger = 'setRatio'; }
      else if (this.props.setImgFit !== prevProps.setImgFit) {  rebuildTiles = true ; theTrigger = 'setImgFit'; }
      else if (this.props.setImgCover !== prevProps.setImgCover) {  rebuildTiles = true ; theTrigger = 'setImgCover'; }
      else if (this.props.heroCategory !== prevProps.heroCategory) {  rebuildTiles = true ; theTrigger = 'heroCategory'; }
      else if (this.props.heroRatio !== prevProps.heroRatio) {  rebuildTiles = true ; theTrigger = 'heroRatio'; }
      else if (this.props.heroRatio !== prevProps.heroRatio) {  rebuildTiles = true ; theTrigger = 'heroRatio'; }

      console.log( 'CDU: theTrigger section 2:', theTrigger );

    } else if ( prevProps.lastPropChange !== this.props.lastPropChange ) {
      if ( this.props.lastPropChange === 'cats' ) { reloadData = true ; theTrigger = 'cats'; } 
      else if ( this.props.lastPropChange === 'filters' ) { reloadData = true ; theTrigger = 'filters'; } 
      else if ( this.props.lastPropChange === 'groups' ) { reloadData = true ; theTrigger = 'groups'; } 
      else if ( this.props.lastPropChange === 'hubs' ) { reloadData = true ; theTrigger = 'hubs'; } 
      else if ( this.props.lastPropChange === 'items' ) { reloadData = true ; theTrigger = 'items'; } 
      else if ( this.props.lastPropChange === 'lists' ) { reloadData = true ; theTrigger = 'lists'; } 
  
      else if ( this.props.lastPropChange === 'subs' ) { reloadData = true ; theTrigger = 'subs'; } 
      else if ( this.props.lastPropChange === 'format' ) { rebuildTiles = true ; theTrigger = 'format'; } 
      else if ( this.props.lastPropChange === 'init' ) { rebuildTiles = true ; theTrigger = 'init'; } 
      else if ( this.props.lastPropChange === 'other' ) { rebuildTiles = true ; theTrigger = 'other'; } 
      console.log( 'CDU: theTrigger section 3:', theTrigger );
    }

    /* 
    */

    // if (this.props.fetchInfo !== prevProps.fetchInfo) {  reloadData = true ; }

    /**
     * hubs changing are the only complicated situation because Hubs require secondary call to fetch all site icons
     */
    let wasHubChange : any = false;
    if (this.props.fetchInfo !== prevProps.fetchInfo) {
      Object.keys(this.props.fetchInfo).map( key => {
        if ( JSON.stringify(this.props.fetchInfo[key]) !== JSON.stringify(prevProps.fetchInfo[key]) ) { console.log('thisFetchInfoProp Changed: ' + key, this.props.fetchInfo[key] ) ; }
      });

      changeHubs.map( change => {
        if ( this.props.fetchInfo[change] !== prevProps.fetchInfo[change] ) { wasHubChange = true ; }
      }) ;
    }

    if ( wasHubChange === true || this.state.lastStateChange !== 'updateStateHubs' ) {
      if ( reloadData === true ) {
        console.log('CDU reloadData: ', wasHubChange, wasHubChange, this.state.lastStateChange, theTrigger );
        this._getListItems( this.props.custCategories );
  
      } else if (rebuildTiles === true) {
        console.log('CDU rebuildTiles: ', wasHubChange, rebuildTiles, this.state.lastStateChange, theTrigger );
        this._updateStateOnPropsChange({});
      }
    }
  }


  /***
   *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b       .o88b.  .d8b.  d8888b.  .d88b.  db    db .d8888. d88888b db      .d8888. 
   *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          d8P  Y8 d8' `8b 88  `8D .8P  Y8. 88    88 88'  YP 88'     88      88'  YP 
   *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo      8P      88ooo88 88oobY' 88    88 88    88 `8bo.   88ooooo 88      `8bo.   
   *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      8b      88~~~88 88`8b   88    88 88    88   `Y8b. 88~~~~~ 88        `Y8b. 
   *    Y8b  d8 88 `88. 88.     88   88    88    88.          Y8b  d8 88   88 88 `88. `8b  d8' 88b  d88 db   8D 88.     88booo. db   8D 
   *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P       `Y88P' YP   YP 88   YD  `Y88P'  ~Y8888P' `8888Y' Y88888P Y88888P `8888Y' 
   *                                                                                                                                    
   *                                                                                                                                    
   */


  public createCarousels(thisState){
    let elemnts = [];
    if (thisState.heroTiles[0]){
      elemnts = thisState.heroTiles.map(newTile => (
        <div>
          {newTile.title}
        </div>
        ));
    }

    return (
      elemnts
    );
  }

  /***
   *    d8888b. db    db d8888b. db      d888888b  .o88b.      d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
   *    88  `8D 88    88 88  `8D 88        `88'   d8P  Y8      88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
   *    88oodD' 88    88 88oooY' 88         88    8P           88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
   *    88~~~   88    88 88~~~b. 88         88    8b           88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
   *    88      88b  d88 88   8D 88booo.   .88.   Y8b  d8      88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
   *    88      ~Y8888P' Y8888P' Y88888P Y888888P  `Y88P'      88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
   *                                                                                                            
   *                                                                                                            
   */


  public render(): React.ReactElement<IPivotTilesProps> {

    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    let heroFullLineBuild : any = "";

    if (this.props.showHero === true && this.state.heroCategory) {
      if (this.state.loadStatus === "Ready" &&  this.state.heroStatus === "Ready") {
        heroFullLineBuild = tileBuilders.heroBuilder(this.props,this.state);
      }
    }

    // This will just put title text per createCarousels.
    //let carouselElements: JSX.Element[] = this.createCarousels(this.state) ;
    // This will put formatted tiles in place.  When width = 1 it looks great.
    
    let carouselBuilder = (this.state.heroTiles[0]) ? tileBuilders.carouselBuilder(this.props,this.state) : "";

    let carouselLayout = (this.state.heroTiles[0]) ? tileBuilders.carouselLayout(this.props,this.state,this.state.heroTiles, this.state.heroCategory) : "";

    const infoPage = <div>
      <InfoPage 
          allLoaded={ true }
          showInfo={ true }
          parentListName={ this.props.listWebURL } 
          parentListURL={ this.props.listTitle }
          parentProps= { this.props }
          parentState= { this.state }
      ></InfoPage>
    </div>;

    let gridLayout = (this.state.heroTiles[0]) ? tileBuilders.gridLayout(this.props,this.state,this.state.heroTiles, this.state.heroCategory) : "";
        
    let tileBuild;

    if (this.state.setLayout === "Card") {
      tileBuild = tileBuilders.gridLayout(this.props,this.state,this.state.filteredTiles, this.state.heroCategory);
    } else if (this.state.setLayout === "List") {
      tileBuild = tileBuilders.listViewBuilder(this.props,this.state,this.state.filteredTiles, this.state.heroCategory);
    } else {
      tileBuild = tileBuilders.tileBuilder(this.props,this.state);
    }
    
    let noListFound = myErrors.NoListFound(this.props,this.state);

    let noItemsFound = myErrors.NoItemsFound(this.props,this.state);

    let loadingSpinner = myErrors.LoadingSpinner(this.state);

    const defIndex = (this.state.pivotDefSelKey === '') ? convertCategoryToIndex(this.props.setTab) : convertCategoryToIndex(this.state.pivotDefSelKey);

    console.log('render(): this.state', this.state);
//    console.log('render(): this.props.setTab', this.props.setTab);
//    console.log('render(): this.state.pivotDefSelKey', this.state.pivotDefSelKey);
//    console.log('render(): defIndex', defIndex);

    let tipError = false;
    if (this.state.itemsError || this.state.listError || this.state.heroError){ tipError = true; }

    let changePivots = this.props.enableChangePivots !== true ? null :
        <div className={[styles.floatLeft,styles.padLeft20,( this.state.shuffleShow ? styles.showSearch: styles.hideSearch )].join(' ')} >
          <div className={styles.quickTabsGroup}>

            <div className={styles.quickTabsLable}>
              { 'Change Pivots' }
            </div>
            { /* New Pivot for dynamic categories */ }
            <Pivot 
              style={{ flexGrow: 1, paddingLeft: '10px' }}
              //linkSize= { pivotOptionsGroup.getPivSize(this.props.setPivSize) }
              //linkFormat= { pivotOptionsGroup.getPivFormat(this.props.setPivFormat) }
              onLinkClick= { this.onChangePivotClick.bind(this) }  //{this.specialClick.bind(this)}
              defaultSelectedKey={ this.props.colCategory }
              headersOnly={true}>

                <PivotItem headerText={this.props.colCategory} itemKey={'category'}/>
                <PivotItem headerText={'Modified'} itemKey={'modified'}/>
                <PivotItem headerText={'Created'} itemKey={'created'}/>
                <PivotItem headerText={'Modified By'} itemKey={'modifiedByTitle'}/>
                <PivotItem headerText={'Created By'} itemKey={'createdByTitle'}/>
            </Pivot>

            { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
          </div>
        </div>;

      let earlyAccess = 
      <div style={{ paddingBottom: 10 }}>
        <EarlyAccess 
            image = { "https://autoliv.sharepoint.com/sites/crs/PublishingImages/Early%20Access%20Image.png" }
            messages = { [ <div><span><b>Welcome to ALV Webpart Early Access!!!</b></span></div>, "Get more info here -->"] }
            links = { [ links.gitRepoPivotTiles.wiki, links.gitRepoPivotTiles.issues ]}
            email = { 'mailto:General - WebPart Dev <0313a49d.Autoliv.onmicrosoft.com@amer.teams.ms>?subject=Pivot Tiles Webpart Feedback&body=Enter your message here :)  \nScreenshots help!' }
            farRightIcons = { [ ] }
        ></EarlyAccess>
      </div>
      ;

      let userId = this.props.context.pageContext.legacyPageContext.userId;

      let directory = defIndex !== this.props.fetchInfo.groupsCategory || this.props.fetchInfo.groupsInclude !== true ? null : <MyGroups
        groupsShowAdmins= { this.props.fetchInfo.groupsShowAdmins }
        groupsShowGuests= { this.props.fetchInfo.groupsShowGuests }
        userId= { userId }
        title={ 'Key site groups'}
        width= { this.state.WebpartWidth }
        setPivSize = { this.props.setPivSize }
        setPivFormat = { PivotLinkFormat.tabs }
        groups={ this.props.fetchInfo.groupsList } //["PivotTiles Owners", "PivotTiles Members", "PivotTiles Visitors"]
        groupsProps={ this.props.fetchInfo.groupsProps } //["PivotTiles Owners", "PivotTiles Members", "PivotTiles Visitors"]
        webURL={ this.props.pageContext.web.absoluteUrl }
        context={ this.props.context }
        searchFirstName={ true }
        displayMode={ 1 }
        updateProperty={
          (value: string) => {
            // this.properties.title = value; //This is for updating Title Props from webpart
        }
        }
        searchProps={ 'Mike' }
        clearTextSearchProps={ ''}
        pageSize={ 5 }
      ></MyGroups>;

      defCommandIconStyles.icon.fontWeight = '600' ;
  
      //className={ /*farLinkHover*/ }
      let sortedLabel = this.state.sortAsc === false ? 'Sorted Larger to Smaller' : 'Sorted Smaller to Larger';
      let sortButton = <div title={ "Sort" } className={  ''/*[styles.floatLeft,styles.padLeft20].join(' ')*/ } style={{background: 'white', opacity: .7, borderRadius: '10px', cursor: 'pointer', marginRight: '20px', position: 'absolute', left: '350px' }}>
      { createIconButton(this.state.sortAsc === false ? 'Down' : 'Up', sortedLabel ,this._sortTiles.bind(this), null, defCommandIconStyles, false ) } </div>;

    /***
     *    d8888b. d88888b d888888b db    db d8888b. d8b   db      
     *    88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88      
     *    88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88      
     *    88`8b   88~~~~~    88    88    88 88`8b   88 V8o88      
     *    88 `88. 88.        88    88b  d88 88 `88. 88  V888      
     *    88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P      
     *                                                            
     *                                                            
     */

    let searchBoxStyles = this.state.changePivotCats !== true ? { root: { maxWidth: 300 } } :  { root: { maxWidth: 300, background: 'yellow' } } ;
    let devHeader = this.state.showDevHeader === true ? <div><b>Props: </b> { this.props.lastPropChange + ', ' + this.props.lastPropDetailChange } - <b>State: lastStateChange: </b> { this.state.lastStateChange  } </div> : null ;

    return (
      
      <div>
        { devHeader }
        { earlyAccess }
        { ( (this.props.showHero === true && this.props.heroType === "header" &&  this.state.heroStatus === "Ready") ? ( heroFullLineBuild ) : ""  ) }

      <div className={styles.pivotTiles}>

        <div className={styles.container}>
          
          {/*( gridLayout  )*/}

          {/*//https://developer.microsoft.com/en-us/fabric#/controls/web/pivot*/}

            <div className={styles.floatLeft}>
              <Pivot 
                style={{ flexGrow: 1, paddingLeft: '10px' }}
                linkSize= { pivotOptionsGroup.getPivSize(this.props.setPivSize) }
                linkFormat= { pivotOptionsGroup.getPivFormat(this.props.setPivFormat) }
                onLinkClick= { this.onLinkClick.bind(this) }  //{this.specialClick.bind(this)}
                defaultSelectedKey={ defIndex }
                headersOnly={true}>
                  {this.createPivots(this.state,this.props)}
              </Pivot>
              <MyCommandBar
                toggleTips= { this.toggleTips }
                minimizeTiles= { this.minimizeTiles.bind(this) }
                searchMe= { this.searchMe.bind(this) }
                showAll= { this.showAll.bind(this) }
                toggleLayout= { this.toggleLayout.bind(this) }
                commandClass = {(tipError ? 'warnTips' : '') }
                setLayout = { this.state.setLayout }
                
              />
            </div>
          <div>
          </div>
          <br/>

          { changePivots }


          { ( this.state.showTips === "yes" ? ( infoPage ) : "" ) }

          {/*https://developer.microsoft.com/en-us/fabric#/controls/web/searchbox*/}
          <div className={[styles.floatLeft,styles.padLeft20,( this.state.searchShow ? styles.showSearch: styles.hideSearch )].join(' ')} >

            <SearchBox
              className={ styles.searchBox }
              styles={ searchBoxStyles }
              placeholder="Search"
              onSearch={ this.searchForItems.bind(this) }
              onBlur={ this._changeSearchOnBlur.bind(this) }
              onChange={ this.searchForItems.bind(this) }
              onClick={ this._changeSearchOnFocus.bind(this) }
            />

            { sortButton }
            
            <div className={styles.searchStatus}>
              { 'Searching about ' + this.state.searchCount + ' items' + this.state.searchWhere }
              { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
            </div>
          </div>

          { ( this.props.showHero === true && this.props.heroType === "left" ? ( heroFullLineBuild ) : ""  ) }
          { ( this.props.showHero === true && this.props.heroType === "right" ? ( heroFullLineBuild ) : ""  ) }
          { ( (this.props.showHero === true && this.props.heroType === "carouselLayout" &&  this.state.heroStatus === "Ready") ? ( carouselLayout ) : ""  ) }

          { ( (this.props.showHero === true && this.props.heroType === "carousel" &&  this.state.heroStatus === "Ready") ? ( carouselBuilder ) : ""  ) }
          { ( ( this.props.showHero === true && this.props.heroType === "inLine"  &&  this.state.heroStatus === "Ready") ? ( heroFullLineBuild ) : ""  ) }

            { ( tileBuild ) }
            { /* Originally instead of this:  ( tileBuild ) */ }           

            <div className={styles.tableRow}>
            { ( loadingSpinner ) }
            { ( noListFound )}
            { ( noItemsFound )}
            { directory /*  */  }
            </div>


        </div>
        { ( (this.props.showHero === true && this.props.heroType === "footer"  &&  this.state.heroStatus === "Ready") ? ( heroFullLineBuild ) :""  ) }
      </div>
      </div>
    );
  }

  private _changeSearchOnFocus = (item: PivotItem): void => {
    let e: any = event;
    console.log(e);
    if (e.ctrlKey) { 
      console.log('CTRL was clicked... _changeSearchFunction');
      this.setState({
        changePivotCats: true,
        lastStateChange: '_changeSearchOnFocus',
      });
    }
  }

  private _changeSearchOnBlur = (item: PivotItem): void => {
    let e: any = event;
    console.log(e);
    console.log('... _changeSearchOnBlur');
    if ( this.state.changePivotCats !== false ) {
      this.setState({
        changePivotCats: false,
        lastStateChange: '_changeSearchOnBlur',
      });
    }
  }



  private _handleSettingsIconClick = (item: PivotItem): void => {
    alert('Hi!');
  }


  /***
   *    .d8888. d88888b  .d8b.  d8888b.  .o88b. db   db      .88b  d88. d88888b 
   *    88'  YP 88'     d8' `8b 88  `8D d8P  Y8 88   88      88'YbdP`88 88'     
   *    `8bo.   88ooooo 88ooo88 88oobY' 8P      88ooo88      88  88  88 88ooooo 
   *      `Y8b. 88~~~~~ 88~~~88 88`8b   8b      88~~~88      88  88  88 88~~~~~ 
   *    db   8D 88.     88   88 88 `88. Y8b  d8 88   88      88  88  88 88.     
   *    `8888Y' Y88888P YP   YP 88   YD  `Y88P' YP   YP      YP  YP  YP Y88888P 
   *                                                                            
   *                                                                            
   */


  private searchMe = (item: PivotItem): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    console.log(e);
    let searchType = "";
    let newSearchShow =  e.altKey === true ? true : !this.state.searchShow;
    let searchCount = this.state.lastFilteredTiles.length;
    let searchWhere = this.state.searchWhere;
    if (e.altKey) { 
      searchType = "all";
      newSearchShow = true;
      searchCount = this.state.allTiles.length;
      searchWhere = ' in all categories';
    }
    
    console.log('newSearchShow: ', newSearchShow, searchType);
    this.setState({
      searchType: searchType,
      searchShow: ( e.altKey === true ? true : !this.state.searchShow ),
      lastFilteredTiles: (searchType === 'all' ? this.state.allTiles : this.state.lastFilteredTiles ),
      searchCount: searchCount,
      searchWhere: searchWhere,
      lastStateChange: 'searchMe',
    });

    
  } //End searchMe


  /***
 *    .d8888. d88888b  .d8b.  d8888b.  .o88b. db   db      d88888b  .d88b.  d8888b.      d888888b d888888b d88888b .88b  d88. .d8888. 
 *    88'  YP 88'     d8' `8b 88  `8D d8P  Y8 88   88      88'     .8P  Y8. 88  `8D        `88'   `~~88~~' 88'     88'YbdP`88 88'  YP 
 *    `8bo.   88ooooo 88ooo88 88oobY' 8P      88ooo88      88ooo   88    88 88oobY'         88       88    88ooooo 88  88  88 `8bo.   
 *      `Y8b. 88~~~~~ 88~~~88 88`8b   8b      88~~~88      88~~~   88    88 88`8b           88       88    88~~~~~ 88  88  88   `Y8b. 
 *    db   8D 88.     88   88 88 `88. Y8b  d8 88   88      88      `8b  d8' 88 `88.        .88.      88    88.     88  88  88 db   8D 
 *    `8888Y' Y88888P YP   YP 88   YD  `Y88P' YP   YP      YP       `Y88P'  88   YD      Y888888P    YP    Y88888P YP  YP  YP `8888Y' 
 *                                                                                                                                    
 *                                                                                                                                    
 */

  private _sortTiles = (item) : void => {

    let entireResponse = {
      webs: this.state.originalWebs,
      lists: this.state.originalLists,
      items: this.state.originalListItems,
      hubs: this.state.originalHubs,
    };

    this.processResponse( entireResponse, this.state.custCategories, false, true );

  }

  public searchForItems = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
 
    console.log('searchForItems: e',e);

      console.log('searchForItems: item', item);
      console.log('searchForItems: this', this);
          /*
    */

    if ( this.state.changePivotCats === true ) {
      let custCategories : ICustomCategories = null;

      if ( e.key === "Enter" ) {
        //Reset  custCategories
        if ( item.toLowerCase() === 'reset' ) {
          custCategories = JSON.parse(JSON.stringify( this.props.custCategories ));

          //functionCustCats
    
        } else if ( item.toLowerCase() === 'created' || item.toLowerCase() === 'modified'
                  || item.toLowerCase() === 'created<' || item.toLowerCase() === 'modified<'
                 // || item.toLowerCase() === 'created>' || item.toLowerCase() === 'modified>'  //These options are not valid since created and modified are always in the past
        ) {
          //https://stackoverflow.com/a/281335  -- remove empty elements from array

            custCategories = CustTime( item.toLowerCase() );

        } else {
          let itemSplit = item.split(';');
          //https://stackoverflow.com/a/281335  -- remove empty elements from array
          let newItemSplit = itemSplit.filter( el => { return el != ""; });
          let allTabs = JSON.parse(JSON.stringify( newItemSplit ));

          custCategories = {
            type: 'semiColon1',
            column: '',
            logic: newItemSplit,
            allTabs: allTabs,
          };

        }

        let entireResponse = {
          webs: this.state.originalWebs,
          lists: this.state.originalLists,
          items: this.state.originalListItems,
          hubs: this.state.originalHubs,
        };
        this.processResponse( entireResponse, custCategories, false, false );

      }


    } else {

      let searchItems = [];
      if (this.state.searchType === 'all'){
        searchItems =this.state.allTiles;
      } else {
        searchItems =this.state.lastFilteredTiles;
      }
      let searchCount = searchItems.length;
      let newFilteredTiles = [];
      for (let thisTile of searchItems) {
        let fileName = thisTile.href.substring(thisTile.href.lastIndexOf('/'));
  
        let searchString = 'title:' + thisTile.title.toLowerCase() + 'tescription:' + thisTile.description.toLowerCase() + 'href:' + fileName;
        if(searchString.indexOf(item.toLowerCase()) > -1) {
          //console.log('fileName', fileName);
          newFilteredTiles.push(thisTile);
        }
      }
  
      searchCount = newFilteredTiles.length;
  
      this.setState({
        filteredTiles: newFilteredTiles,
        searchCount: searchCount,
        lastStateChange: 'searchForItems',
      });
  
      return ;

    }
 
  } //End searchForItems


  /***
   *     .d88b.  d8b   db      db      d888888b d8b   db db   dD       .o88b. db      d888888b  .o88b. db   dD 
   *    .8P  Y8. 888o  88      88        `88'   888o  88 88 ,8P'      d8P  Y8 88        `88'   d8P  Y8 88 ,8P' 
   *    88    88 88V8o 88      88         88    88V8o 88 88,8P        8P      88         88    8P      88,8P   
   *    88    88 88 V8o88      88         88    88 V8o88 88`8b        8b      88         88    8b      88`8b   
   *    `8b  d8' 88  V888      88booo.   .88.   88  V888 88 `88.      Y8b  d8 88booo.   .88.   Y8b  d8 88 `88. 
   *     `Y88P'  VP   V8P      Y88888P Y888888P VP   V8P YP   YD       `Y88P' Y88888P Y888888P  `Y88P' YP   YD 
   *                                                                                                           
   *                                                                                                           
   */


  public onLinkClick = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;

    if (e.ctrlKey) {
      //Set clicked pivot as the hero pivot
      this._updateStateOnPropsChange({heroCategory: item.props.headerText});

    } else if (e.altKey) {
      //Enable-disable ChangePivots options
      this.setState({
        shuffleShow: !this.state.shuffleShow,
        lastStateChange: 'onLinkClick - 1',
      });

    } else {
            //Filter tiles per clicked category

      const defaultSelectedIndex = this.state.pivtTitles.indexOf(item.props.headerText);
      let defaultSelectedKey = defaultSelectedIndex.toString();
      defaultSelectedKey = item.props.headerText.toString();  // Added this because I think this needs to be the header text, not the index.
      defaultSelectedKey = convertCategoryToIndex(defaultSelectedKey);

      let categoryInfo = this.state.categoryInfo;
      let createdInfo = this.state.createdInfo;
      let modifiedInfo = this.state.modifiedInfo;
      let modifiedByInfo = this.state.modifiedByInfo;
      let createdByInfo = this.state.createdByInfo;

      let newFilteredTiles = [];
      let pivotProps = this.props;
      let pivotState = this.state;

//      newFiltered = this.getOnClickFilteredTiles(pivotProps, pivotState, newCollection, heroIds, newHeros, thisCatColumn, lastCategory)
      let showSearch = true;

      if ( item.props.headerText === '' ) {
        //You clicked on empty category... show no tiles
      } else if ( item.props.headerText !== this.props.fetchInfo.groupsCategory 
        && item.props.headerText !== this.props.fetchInfo.usersCategory ) { //Skip finding tiles if you click Groups or Users
        newFilteredTiles = this.getOnClickFilteredTiles(this.state.allTiles, this.state.heroIds, this.state.heroTiles, this.state.thisCatColumn, item.props.headerText);

      } else {
        showSearch = false; //Hide this bar when you are showing groups
      }

      
      //Modified this stackexchange to move item to front of array:  https://stackoverflow.com/a/23921775
      //objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); '
      if ( item.props.headerText === this.props.fetchInfo.hubsCategory ) {
        //Resort items so that the Hubsite link is always first when you are in the Hubs category
        newFilteredTiles.sort((a,b) => a.id == this.state.departmentId ? -1 : b.id == this.state.departmentId ? 1 : 0 ); 
      }

      //Save back the last pivot/tile clicked.
      let thisCatColumn = this.state.thisCatColumn;
      if (thisCatColumn === 'modified'){ modifiedInfo.lastCategory = item.props.headerText; }
      else if (thisCatColumn === 'created'){ createdInfo.lastCategory = item.props.headerText; }
      else if (thisCatColumn === 'category'){ categoryInfo.lastCategory = item.props.headerText; }
      else if (thisCatColumn === 'createdBy'){ createdByInfo.lastCategory = item.props.headerText; }
      else if (thisCatColumn === 'modifiedBy'){ modifiedByInfo.lastCategory = item.props.headerText; }

//      console.log('onLinkClick: this.state', this.state);
//      console.log('onLinkClick: item.props.headerText', item.props.headerText);
//      console.log('onLinkClick: defaultSelectedIndex', defaultSelectedIndex);
//      console.log('onLinkClick: defaultSelectedKey', defaultSelectedKey);

this.setState({
        filteredCategory: item.props.headerText,
        filteredTiles: newFilteredTiles,
        lastFilteredTiles: newFilteredTiles,
        searchCount: newFilteredTiles.length,
        searchType: '',
        searchWhere: ' in ' + item.props.headerText,
        categoryInfo: categoryInfo,
        modifiedInfo: modifiedInfo,
        modifiedByInfo: modifiedByInfo,
        createdByInfo: createdByInfo,
        createdInfo: createdInfo,
        pivotDefSelKey: defaultSelectedKey,
        searchShow: showSearch,
        lastStateChange: 'onLinkClick - 2',
      });

    }

  } //End onClick


  /***
   *     .d88b.  d8b   db       .o88b. db   db  .d8b.  d8b   db  d888b  d88888b      d8888b. d888888b db    db  .d88b.  d888888b       .o88b. db      d888888b  .o88b. db   dD 
   *    .8P  Y8. 888o  88      d8P  Y8 88   88 d8' `8b 888o  88 88' Y8b 88'          88  `8D   `88'   88    88 .8P  Y8. `~~88~~'      d8P  Y8 88        `88'   d8P  Y8 88 ,8P' 
   *    88    88 88V8o 88      8P      88ooo88 88ooo88 88V8o 88 88      88ooooo      88oodD'    88    Y8    8P 88    88    88         8P      88         88    8P      88,8P   
   *    88    88 88 V8o88      8b      88~~~88 88~~~88 88 V8o88 88  ooo 88~~~~~      88~~~      88    `8b  d8' 88    88    88         8b      88         88    8b      88`8b   
   *    `8b  d8' 88  V888      Y8b  d8 88   88 88   88 88  V888 88. ~8~ 88.          88        .88.    `8bd8'  `8b  d8'    88         Y8b  d8 88booo.   .88.   Y8b  d8 88 `88. 
   *     `Y88P'  VP   V8P       `Y88P' YP   YP YP   YP VP   V8P  Y888P  Y88888P      88      Y888888P    YP     `Y88P'     YP          `Y88P' Y88888P Y888888P  `Y88P' YP   YD 
   *                                                                                                                                                                           
   *                                                                                                                                                                           
   */


  public onChangePivotClick = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;

    this._updateStateOnPropsChange({
      heroCategory: 'randDomTextIsNotACategory',
      newCatColumn: item.props.itemKey,
    });

  } //End onClick


  /***
   *    .d8888. db   db  .d88b.  db   d8b   db       .d8b.  db      db      
   *    88'  YP 88   88 .8P  Y8. 88   I8I   88      d8' `8b 88      88      
   *    `8bo.   88ooo88 88    88 88   I8I   88      88ooo88 88      88      
   *      `Y8b. 88~~~88 88    88 Y8   I8I   88      88~~~88 88      88      
   *    db   8D 88   88 `8b  d8' `8b d8'8b d8'      88   88 88booo. 88booo. 
   *    `8888Y' YP   YP  `Y88P'   `8b8' `8d8'       YP   YP Y88888P Y88888P 
   *                                                                        
   *                                                                        
   */


  private showAll = (item: PivotItem): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    if (e.altKey && e.shiftKey && !e.ctrlKey) { 

    } else if (e.ctrlKey) { 

    } else {
      let newFilteredTiles = [];
      for (let thisTile of this.state.allTiles) {
          let showThisTile = true;
          if (this.props.heroType !== 'none') {
            showThisTile = this.state.heroIds.indexOf(thisTile.Id.toString()) > -1 ? false : true;
          }
          if (showThisTile === true) {newFilteredTiles.push(thisTile) ; }
      }
      this.setState({
        filteredTiles: newFilteredTiles,
        lastFilteredTiles: this.state.allTiles,
        searchCount: this.state.allTiles.length,
        pivotDefSelKey: "-100",
        searchWhere: ' in all categories',
        lastStateChange: 'showAll',
      });
    }
    
  }

  private minimizeTiles = (item: PivotItem): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    console.log(e);
    if (e.altKey && e.shiftKey && !e.ctrlKey) { 

      if (strings.analyticsWeb.indexOf(this.props.tenant) === 0 ) {
        let openThisWindow = strings.analyticsWeb + '/lists/' + strings.analyticsList;
        window.open(openThisWindow, '_blank');
        event.preventDefault();
      } else {

        console.log('the analyticsWeb is not in the same tenant...',strings.analyticsWeb,this.props.tenant);

      }
    } else if (e.ctrlKey) { 

      if (strings.minClickWeb.indexOf(this.props.tenant) === 0 ) {
        let openThisWindow = strings.minClickWeb + this.props.pageContext.web.absoluteUrl;
        window.open(openThisWindow, '_blank');
        event.preventDefault();
      } else {

        console.log('the minClickWeb is not in the same tenant...',strings.minClickWeb,this.props.tenant);

      }
    } else {
      let newFilteredTiles = [];

      this.setState({
        filteredTiles: newFilteredTiles,
        lastFilteredTiles: this.state.allTiles,
        searchCount: this.state.allTiles.length,
        pivotDefSelKey: "-100",
        searchWhere: ' in all categories',
        lastStateChange: 'minimizeTiles',
      });
    }
    


  } //End onClick


  /***
   *    d888888b  .d88b.   d888b   d888b  db      d88888b      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
   *    `~~88~~' .8P  Y8. 88' Y8b 88' Y8b 88      88'          88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
   *       88    88    88 88      88      88      88ooooo      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
   *       88    88    88 88  ooo 88  ooo 88      88~~~~~      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
   *       88    `8b  d8' 88. ~8~ 88. ~8~ 88booo. 88.          88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
   *       YP     `Y88P'   Y888P   Y888P  Y88888P Y88888P      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
   *                                                                                                                                         
   *                                                                                                                                         
   */


  public toggleLayout = (item: any): void => {
    //This sends back the correct pivot category which matches the category on the tile.

    let setLayout = this.state.setLayout;

    if (setLayout === "Card") {
      setLayout = this.props.setSize;
    } else if (setLayout === "List") {
      setLayout = "Card";
    } else {       setLayout = "List"; }

    this.setState({
      setLayout: setLayout,
      lastStateChange: 'toggleLayout',
    });

  } //End toggleTips  

  public toggleTips = (item: any): void => {
    //This sends back the correct pivot category which matches the category on the tile.

    let newshowTips = this.state.showTips === 'none' ? 'yes' : 'none';

    this.setState({
      showTips: newshowTips,
      lastStateChange: 'toggleTips',
    });

  } //End toggleTips  


  /***
   *    d8888b. d888888b db    db  .d88b.  d888888b      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
   *    88  `8D   `88'   88    88 .8P  Y8. `~~88~~'      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
   *    88oodD'    88    Y8    8P 88    88    88         88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
   *    88~~~      88    `8b  d8' 88    88    88         88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
   *    88        .88.    `8bd8'  `8b  d8'    88         88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
   *    88      Y888888P    YP     `Y88P'     YP         YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
   *                                                                                                                                   
   *                                                                                                                                   
   */

  //http://react.tips/how-to-create-reactjs-components-dynamically/ - based on createImage
  public createPivot(pivT) {
//    console.log('createPivot: ', pivT);
    const thisItemKey :string = convertCategoryToIndex(pivT);
      return (
        <PivotItem headerText={pivT} itemKey={thisItemKey}/>
      );
  }

  public createPivots(thisState,thisProps){

    let tempPivotTitles = JSON.parse(JSON.stringify(thisState.pivtTitles));

    if ( thisState.loadStatus !== "Loading" ) {
      if (thisState.showOtherTab && tempPivotTitles.indexOf(thisProps.otherTab) === -1) {
        tempPivotTitles.push(thisProps.otherTab);
      }
      if ( this.props.fetchInfo.groupsInclude === true ) { 
        tempPivotTitles.push( thisProps.fetchInfo.groupsCategory ) ; }
    }

    let piv = tempPivotTitles.map(this.createPivot);
//    console.log('createPivots: ', piv);
    return (
      piv
    );
  }



  //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
  @autobind 
  private async _loadListItems(): Promise<void> {
    //This invokes the loadListItems function on the parent webpart.ts
    const listItems: IPivotTileItemProps[] = await this.props.loadListItems();

    //https://www.youtube.com/watch?v=4nsGhYjfRsw 9:01-ish talks about this line to update props
    this.setState({allTiles:listItems});

  }

  /***
   *            db    db d8888b. d8888b.  .d8b.  d888888b d88888b      .d8888. d888888b  .d8b.  d888888b d88888b       .d88b.  d8b   db      d8888b. d8888b.  .d88b.  d8888b. .d8888.       .o88b. db   db  .d8b.  d8b   db  d888b  d88888b 
   *            88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'          88'  YP `~~88~~' d8' `8b `~~88~~' 88'          .8P  Y8. 888o  88      88  `8D 88  `8D .8P  Y8. 88  `8D 88'  YP      d8P  Y8 88   88 d8' `8b 888o  88 88' Y8b 88'     
   *            88    88 88oodD' 88   88 88ooo88    88    88ooooo      `8bo.      88    88ooo88    88    88ooooo      88    88 88V8o 88      88oodD' 88oobY' 88    88 88oodD' `8bo.        8P      88ooo88 88ooo88 88V8o 88 88      88ooooo 
   *            88    88 88~~~   88   88 88~~~88    88    88~~~~~        `Y8b.    88    88~~~88    88    88~~~~~      88    88 88 V8o88      88~~~   88`8b   88    88 88~~~     `Y8b.      8b      88~~~88 88~~~88 88 V8o88 88  ooo 88~~~~~ 
   *            88b  d88 88      88  .8D 88   88    88    88.          db   8D    88    88   88    88    88.          `8b  d8' 88  V888      88      88 `88. `8b  d8' 88      db   8D      Y8b  d8 88   88 88   88 88  V888 88. ~8~ 88.     
   *    C88888D ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P      `8888Y'    YP    YP   YP    YP    Y88888P       `Y88P'  VP   V8P      88      88   YD  `Y88P'  88      `8888Y'       `Y88P' YP   YP YP   YP VP   V8P  Y888P  Y88888P 
   *                                                                                                                                                                                                                                        
   *                                                                                                                                                                                                                                        
   */

  private _updateStateOnPropsChange(params: any ): void {

    console.log('_updateStateOnPropsChange params: heroCategory', params);
    let thisCatColumn = params.newCatColumn ? params.newCatColumn : 'category';
    let currentHero = (params.heroCategory) ? params.heroCategory : this.props.heroCategory;

    console.log('_updateStateOnPropsChange params: currentHero', currentHero);
    console.log('_updateStateOnPropsChange params: state', this.state);

    let newCollection : IPivotTileItemProps[] = this.state.allTiles;
    let pivotProps = this.props;
    let pivotState = this.state;
    let newHeros = this.getHeroTiles(pivotProps, pivotState, newCollection, currentHero);
    let heroIds = this.getHeroIds(newHeros);
    let newFiltered = [];
    let custCategories = pivotProps.custCategories;
    let tileCategories = buildTileCategoriesFromResponse(pivotProps, pivotState, custCategories, newCollection, currentHero, thisCatColumn);

    let filteredCategory = '';
    let lastCategory = null;

    if (thisCatColumn === 'category'){
      filteredCategory = this.state.filteredCategory;

    } else if (thisCatColumn === 'modified' || thisCatColumn === 'created' || thisCatColumn === 'modifiedByTitile' || thisCatColumn === 'createdByTitle' ){
      filteredCategory = tileCategories[0];

    }

    if (thisCatColumn === 'category' && this.state.categoryInfo ){ lastCategory = this.state.categoryInfo.lastCategory; }
    else if (thisCatColumn === 'modified'){ lastCategory = this.state.modifiedInfo.lastCategory; }
    else if (thisCatColumn === 'created'){ lastCategory = this.state.createdInfo.lastCategory; }
    else if (thisCatColumn === 'modifiedByTitile'){ lastCategory = null; }
    else if (thisCatColumn === 'createdByTitle'){ lastCategory = null; }

    newFiltered = this.getOnClickFilteredTiles(newCollection, heroIds, newHeros, thisCatColumn, lastCategory);

    console.log('_updateStateOnPropsChange thisCatColumn', thisCatColumn);

    console.log('_updateStateOnPropsChange tileCategories', tileCategories);
    console.log('_updateStateOnPropsChange newFiltered', newFiltered);
    console.log('_updateStateOnPropsChange lastCategory', lastCategory);

    //const defaultSelectedIndex = tileCategories.indexOf(this.props.setTab);
    const defaultSelectedIndex = tileCategories.indexOf(lastCategory);
    let defaultSelectedKey = defaultSelectedIndex.toString();
    defaultSelectedKey = lastCategory === null || lastCategory === undefined ? '' : lastCategory.toString();  // Added this because I think this needs to be the header text, not the index.
    defaultSelectedKey = convertCategoryToIndex(defaultSelectedKey);
    console.log('_updateStateOnPropsChange defaultSelectedKey', defaultSelectedKey);
    defaultSelectedKey = lastCategory;
    if ( params.newCatColumn === undefined ) { defaultSelectedKey = tileCategories[0] ; }

    for (let thisTile of newCollection) {
      thisTile.setTab = (thisCatColumn === 'category' ? this.props.setTab : 'newDefaultTab');
      thisTile.setSize = this.props.setSize;
      thisTile.heroType = this.props.heroType;
      thisTile.setRatio = this.props.setRatio;
      thisTile.setImgFit = this.props.setImgFit;
      thisTile.setImgCover = this.props.setImgCover;
    }

    for (let thisTile of newFiltered) {
      thisTile.setTab = (thisCatColumn === 'category' ? this.props.setTab : 'newDefaultTab');
      thisTile.setSize = this.props.setSize;
      thisTile.heroType = this.props.heroType;
      thisTile.setRatio = this.props.setRatio;
      thisTile.setImgFit = this.props.setImgFit;
      thisTile.setImgCover = this.props.setImgCover;
    }

    let heroSize = this.props.setSize;
    let heroFit = this.props.setImgFit;
    let heroRatio = this.props.setRatio;
    let heroCover =  this.props.setImgCover;

    if (this.props.heroType === "header" || this.props.heroType === "footer") {
        heroSize = "100";
        heroRatio = "1x1";
        heroFit = heroFit;
        heroCover = "portrait";

    } else if (this.props.heroType === "inLine") {
        heroSize = "300";
        heroRatio = "1x1";
        heroFit = heroFit;
        heroCover = "portrait";

    } else if (this.props.heroType === "left" || this.props.heroType === "right") {
        heroSize = "300"; // Force 300 high for left and right
        heroRatio = heroRatio; //Keep the same for left and right
        heroFit = heroFit;  //Cover, centerCover etc.
        heroCover = "portrait";

    } else {

    }

    if (newHeros[0]) {
      for (let thisTile of newHeros) {
        thisTile.setTab = (thisCatColumn === 'category' ? this.props.setTab : 'newDefaultTab');
        thisTile.setSize = heroSize;
        thisTile.heroType = this.props.heroType;
        thisTile.setRatio = heroRatio;
        thisTile.setImgFit = heroFit;
        thisTile.setImgCover = heroCover;
      }
    }

    console.log('_updateStateOnPropsChange: tileCategories', tileCategories);
    console.log('_updateStateOnPropsChange: lastCategory', lastCategory);
    console.log('_updateStateOnPropsChange: defaultSelectedIndex', defaultSelectedIndex);
    console.log('_updateStateOnPropsChange: defaultSelectedKey', defaultSelectedKey);

    this.setState({
      allTiles:newCollection,
      pivtTitles: tileCategories,
      pivotDefSelKey: defaultSelectedKey,
      filteredTiles: newFiltered,
      lastFilteredTiles: newFiltered,
      loadStatus:"Ready",
      heroTiles : newHeros,
      heroIds: heroIds,
      heroStatus: newHeros[0] ? "Ready" : "none",
//      heroCategoryError: (this.props.showHero === true && this.props.heroType !== "none" && this.state.heroStatus === "none") ? true : false,
      heroCategoryError: (this.props.showHero === true && this.props.heroType !== "none" && !newHeros[0]) ? true : false,
      heroError: (this.props.showHero === true && this.props.heroType !== "none" && !newHeros[0]) ? true : false,
      heroCategory: currentHero,
      searchType: '',
      searchCount: newFiltered.length,
      searchWhere: ' in ' + lastCategory,
      filteredCategory: lastCategory,
      thisCatColumn: thisCatColumn,
      changePivotCats: false,
      lastStateChange: '_updateStateOnPropsChange',
    });
  }


  /***
 *             d888b  d88888b d888888b      db      d888888b .d8888. d888888b      d888888b d888888b d88888b .88b  d88. .d8888. 
 *            88' Y8b 88'     `~~88~~'      88        `88'   88'  YP `~~88~~'        `88'   `~~88~~' 88'     88'YbdP`88 88'  YP 
 *            88      88ooooo    88         88         88    `8bo.      88            88       88    88ooooo 88  88  88 `8bo.   
 *            88  ooo 88~~~~~    88         88         88      `Y8b.    88            88       88    88~~~~~ 88  88  88   `Y8b. 
 *            88. ~8~ 88.        88         88booo.   .88.   db   8D    88           .88.      88    88.     88  88  88 db   8D 
 *    C88888D  Y888P  Y88888P    YP         Y88888P Y888888P `8888Y'    YP         Y888888P    YP    Y88888P YP  YP  YP `8888Y' 
 *                                                                                                                              
 *                                                                                                                              
 */

  //    private async loadListItems(): Promise<IPivotTileItemProps[]> {
    private _getListItems( custCategories: ICustomCategories ): void {

      let useTileList: string = strings.DefaultTileList;
      
      if ( this.props.listTitle ) {
          useTileList = this.props.listTitle;
      }
  
      let restFilter: string = "";
      if ( this.props.setFilter ) {
        restFilter = this.props.setFilter;
      }
  
      let restSort: string = "Title";
      if ( this.props.colSort ) {
        restSort = this.props.colSort;
      }
  
      let selectCols: string = "*";
      let expandThese = "";
  
      let allColumns = this.getKeysLike(this.props,"col","Begins");
      let expColumns = this.getExpandColumns(allColumns);
      let selColumns = this.getSelectColumns(allColumns);
  
      selColumns.length > 0 ? selectCols += "," + selColumns.join(",") : selectCols = selectCols;
      if (expColumns.length > 0) { expandThese = expColumns.join(","); }
  
      let listWeb = this.props.listWebURL && this.props.listWebURL !== '' ? this.props.listWebURL : this.props.pageContext.web.absoluteUrl;

      let web = Web(listWeb);

      this._getSubsites( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, true );

  }

  private async _getSubsites( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData ) {
    let entireResponse: any = {};
    let loadThisData = this.props.lastPropChange === 'init' ||  this.props.lastPropChange === 'filters' || this.props.lastPropChange === 'subs' ? true : false ;
    if ( loadThisData === true && this.props.fetchInfo.subsitesInclude === true ) {
        try {
            let websResponse = [];
            let gotWebs = false;

            //This first tries to get webs using .webs() so you get SiteLogoUrls... but this only works if you have above Read permissions.
            try {
              websResponse = await web.webs();
              gotWebs = true;

              //If you only have read permissions, it will fetch webs a different way.
            } catch (e) {
              let errMessage = getHelpfullError(e, true, true);
              if ( errMessage.toLowerCase().indexOf( 'access denied') > -1 ) { 
                websResponse = await web.getSubwebsFilteredForCurrentUser(-1, -1).get();
                gotWebs = true;
                
              } else {
                entireResponse.webs = [ this.createErrorTile(this.props.fetchInfo.subsitesCategory, 'Unable to fetch Subsites', errMessage) ];
                this._getListsLibs( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse );
              }
            }

            if ( gotWebs === true ) {
              websResponse.map( w => { w.sourceType = this.props.fetchInfo.subsitesCategory ; });
              //.orderBy('Title', this.state.sortAsc )
              //    tileCollection.sort((a,b) => a['title'].localeCompare(b['title']));
              if ( this.state.sortAsc === true ) {
                websResponse.sort((a,b) => a['Title'].localeCompare(b['Title']));
              } else { websResponse.sort((a,b) => b['Title'].localeCompare(a['Title'])); }
  
              entireResponse.webs = websResponse;
              this._getListsLibs( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse );
            }

        } catch (e) {
            let errMessage = getHelpfullError(e, true, true);

            if ( errMessage.toLowerCase().indexOf( 'access denied') > -1 ) { errMessage = 'For some reason you do not have access to do this :(' ; }
            //this.processCatch(errMessage, 'Unable to fetch Subsites');
            entireResponse.webs = [ this.createErrorTile(this.props.fetchInfo.subsitesCategory, 'Unable to fetch Subsites', errMessage) ];
            this._getListsLibs( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse );
        }
      } else {
        entireResponse.webs = this.props.fetchInfo.subsitesInclude === true ? this.state.originalWebs : [];
        this._getListsLibs( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse );
      }

    }
  
    private _getListsLibs( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData , entireResponse ){

      let loadThisData = this.props.lastPropChange === 'init' ||  this.props.lastPropChange === 'filters' || this.props.lastPropChange === 'lists' ? true : false ;
      if ( loadThisData === true && ( this.props.fetchInfo.libsInclude === true || this.props.fetchInfo.listsInclude === true ) ) {

        let listFilter = 'Hidden eq false';

        if ( this.props.fetchInfo.libsInclude === false ) {
          listFilter += ' and BaseType eq 0';
        } else if ( this.props.fetchInfo.listsInclude === false ) {
          listFilter += ' and BaseType eq 1';
        } 

        /**
         // 2021-03-01: This section was added due to SystemLists was to large for rest filter :(
         */

        let ignoreTheseSystemLists :string[] = [];

        if ( this.props.fetchInfo.listHideSystem === true ) {
          SystemLists.map( entityName => {
            //Had to add this list when adding Crow Canyon lists because it caused PivotTiles to stop working possibly because rest filter was to long.
            if ( listFilter.length < 1300 ) {
              listFilter += ` and EntityTypeName ne \'${entityName}\'`;
            } else {
              ignoreTheseSystemLists.push( entityName.toLowerCase() );
            }
          });
          ignoreTheseSystemLists.push( 'Content and Structure Reports'.toLowerCase() );
          ignoreTheseSystemLists.push( 'Apps for SharePoint'.toLowerCase() );
          ignoreTheseSystemLists.push( 'AppCatalog'.toLowerCase() );
          listFilter += ` and Title ne \'Style Library\'`; //For some reason had to hard-code filter this one out
        }
        console.log('Need to ignore these lists in the response:', ignoreTheseSystemLists );
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


        let defaultType = this.props.fetchInfo.listCategory;
        web.lists.filter(listFilter).orderBy('Title',this.state.sortAsc).get()
        .then((listLibResponse) => {

          let finalListLibResponse = [];
            listLibResponse.map( L => { 
              L.sourceType = L.BaseType === 0 ? this.props.fetchInfo.listCategory : this.props.fetchInfo.libsCategory;
              L.system = SystemLists.indexOf( L.EntityTypeName ) > -1 ? 'System' : '';

              /**
               // 2021-03-01: This section was added due to SystemLists was to large for rest filter :(
               */
              let thisListTrimmedEntityTypeName = L.EntityTypeName.toLowerCase();
              let thisListTrimmedTitle = L.Title.toLowerCase();

              if ( L.BaseTemplate === 100 ) { 
                let lastFour = thisListTrimmedTitle.substr(thisListTrimmedTitle.length - 4);
                if ( lastFour === 'list' ) {
                  thisListTrimmedTitle = thisListTrimmedTitle.substr( 0, thisListTrimmedTitle.length - 4 );
                }
              }
              if ( ignoreTheseSystemLists.indexOf( L.EntityTypeName.toLowerCase() ) > - 1 ) {
                //Skip this list since it should have not been returned in the first place but was due to rest string length max.
              } else if ( ignoreTheseSystemLists.indexOf( encodeDecodeString( L.EntityTypeName.toLowerCase(), 'encode') ) > - 1 ) {  //Sometimes this comes encoded
                //Skip this list since it should have not been returned in the first place but was due to rest string length max.
              } else if ( ignoreTheseSystemLists.indexOf( L.Title.toLowerCase() ) > - 1 ) {
                //Skip this list since it should have not been returned in the first place but was due to rest string length max.
              } else if ( ignoreTheseSystemLists.indexOf( encodeDecodeString( L.Title.toLowerCase(), 'encode') ) > - 1 ) {  //Sometimes this comes encoded
                //Skip this list since it should have not been returned in the first place but was due to rest string length max.
              } else if ( ignoreTheseSystemLists.indexOf( thisListTrimmedTitle.toLowerCase() ) > - 1 ) {
                //Skip this list since it should have not been returned in the first place but was due to rest string length max.
              } else if ( ignoreTheseSystemLists.indexOf( encodeDecodeString( thisListTrimmedTitle.toLowerCase(), 'encode') ) > - 1 ) {  //Sometimes this comes encoded
                //Skip this list since it should have not been returned in the first place but was due to rest string length max.

              } else { finalListLibResponse.push( L ) ; }

              // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

            });

            entireResponse.lists = finalListLibResponse;
            this._getTileList( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse );
        }).catch((e) => {
            let errMessage = getHelpfullError(e, true, true);
            //this.processCatch(e, 'Unable to fetch Lists & Libraries');
            //Note in this case, items could be both Lists and Libraries but I'm just passing in 1 label for error tile.
            entireResponse.lists = [ this.createErrorTile( defaultType, 'Unable to fetch Lists & Libraries', errMessage ) ];
            this._getTileList( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse );
        });

      } else {
        entireResponse.lists =  this.props.fetchInfo.libsInclude === true || this.props.fetchInfo.listsInclude === true ? this.state.originalLists : [];
        this._getTileList( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse );
      }

    }

    private _getTileList( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse  ){

      let loadThisData = this.props.lastPropChange === 'init' ||  this.props.lastPropChange === 'filters' || this.props.lastPropChange === 'items' ? true : false ;
      if ( loadThisData === true &&  this.props.ignoreList !== true ) {

        let defaultType = '';
        if ( this.props.listDefinition.toLowerCase().indexOf('library') > -1 ) { defaultType = "Files"; }
        else if ( this.props.listDefinition.toLowerCase().indexOf('news') > -1 ) { defaultType = "News"; }
        else if ( this.props.listDefinition.toLowerCase().indexOf('page') > -1 ) { defaultType = "Pages"; }
        else { defaultType = ''; }

        // 2020-12-03:  Changed from getAll() to just get() so orderBy actually works
        web.lists.getByTitle(useTileList).items
        .select(selectCols).expand(expandThese).filter(restFilter).orderBy(restSort,this.state.sortAsc).get()
        .then((listResponse) => {
            listResponse.map( I => { 
              if ( I.BaseType === 1 ) { I.sourceType = "Files"; } 
              else if ( defaultType ) { I.sourceType = defaultType; }
              else { I.sourceType = "" ; }              
            });
            entireResponse.items = listResponse;
            this._getHubsites( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse );
        }).catch((e) => {
            let errMessage = getHelpfullError(e, true, true);
            //this.processCatch(e, 'Unable to fetch Tile list');
            entireResponse.items = [ this.createErrorTile(defaultType, 'Unable to fetch Tile list', errMessage ) ];
            this._getHubsites( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse );
        });

      } else {
        entireResponse.items =  this.props.fetchInfo.ignoreList !== true ? this.state.originalListItems : [];
        this._getHubsites( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse );
      }

    }

    //getAssociatedSites
    
    private _getHubsites( web, useTileList, selectCols, expandThese, restFilter, restSort, custCategories, newData, entireResponse  ){

      let hubResponse = [];
      let loadThisData = this.props.lastPropChange === 'init' ||  this.props.lastPropChange === 'filters' || this.props.lastPropChange === 'hubs' ? true : false ;
      if ( loadThisData === true &&  this.props.fetchInfo.hubsInclude === true ) {
        getAssociatedSites( this.state.departmentId, this.finalCall.bind(this) , entireResponse, custCategories, this.props.fetchInfo.hubsCategory, this.state.sortAsc, newData );
      } else {
        entireResponse.hubs =  this.props.fetchInfo.hubsInclude === true ? this.state.originalHubs : [];
        this.finalCall ( entireResponse, custCategories, newData);
      }

    }

    private finalCall ( entireResponse : any, custCategories, newData) {
      this.processResponse( entireResponse, custCategories, newData, false );

    }


/***
 *    d8888b. d8888b.  .d88b.   .o88b. d88888b .d8888. .d8888.       .o88b.  .d8b.  d888888b  .o88b. db   db 
 *    88  `8D 88  `8D .8P  Y8. d8P  Y8 88'     88'  YP 88'  YP      d8P  Y8 d8' `8b `~~88~~' d8P  Y8 88   88 
 *    88oodD' 88oobY' 88    88 8P      88ooooo `8bo.   `8bo.        8P      88ooo88    88    8P      88ooo88 
 *    88~~~   88`8b   88    88 8b      88~~~~~   `Y8b.   `Y8b.      8b      88~~~88    88    8b      88~~~88 
 *    88      88 `88. `8b  d8' Y8b  d8 88.     db   8D db   8D      Y8b  d8 88   88    88    Y8b  d8 88   88 
 *    88      88   YD  `Y88P'   `Y88P' Y88888P `8888Y' `8888Y'       `Y88P' YP   YP    YP     `Y88P' YP   YP 
 *                                                                                                           
 *                                                                                                           
 */

    private processCatch(e, loadStatus) {
      console.log("Can't load data");
      //var m = e.status === 404 ? "Tile List not found: " + useTileList : "Other message";
      //alert(m);
      console.log(e);
      let frieldlyErr = getHelpfullError( e );
      console.log(e.status);
      console.log(e.message);
      let sendMessage = frieldlyErr + '\n' + e.status + " - " + e.message;
      this.setState({  
        loadStatus: loadStatus, 
        loadError: e.message ? e.message : e, 
        listError: true, 
        lastStateChange: 'processCatch',
      });
  
      saveAnalytics(this.props,this.state);

    }

    private createErrorTile( sourceType, errTitle, errDetails ) {

      let tile : any = {

        system: '',
        themeVariant: this.props.themeVariant,
        editor: '',
        author: '',

          //Custom image properties
        imageWidth: this.props.imageWidth,
        imageHeight: this.props.imageHeight,
        textPadding: this.props.textPadding,

        sourceType: sourceType,
        sortValue: '',
  
        id: '666',
         
        title: errTitle,
        Title: errTitle,
        description: errDetails,
        Description: errDetails,

        href: null,
  
        category: [sourceType, 'LoadError', LoadErrorIcon ],
  
        setTab: this.props.setTab,
        setSize: this.props.setSize,
        heroType: this.props.heroType,
        heroCategory: 'currentHero',
  
        Id: '666',
  
        //ifNotExistsReturnNull
        options: ifNotExistsReturnNull( this.props.colTileStyle ),
  
        color: 'yellow',
  
        imgSize: ifNotExistsReturnNull( this.props.colSize ),
  
        listWebURL: '',
        listTitle: '',
  
        target:  '_none',
        
        setRatio: this.props.setRatio,
        setImgFit: this.props.setImgFit,
        setImgCover: this.props.setImgCover,
        onHoverZoom: this.props.onHoverZoom,
  
        modified: '',
        //modifiedBy: null,
        //createdBy: 'Hmmmmm',
        //modifiedByID: '',
        //2020-11-16: Not required for web ==>>  modifiedByTitle: modifiedByTitle,
        created: '',
        //createdByID: '',
        //2020-11-16: Not required for web ==>>  createdByTitle: createdByTitle,
        modifiedTime: null,
        createdTime: null,
  
        //createdSimpleDate: null,
        //createdSimpleTime: null,
        //createdSimpleDateTime: null,
        //createdInitials: '', //2020-11-16: Not required for web ==>>  item.createdInitials,
        //createdNote: null,
  
        //modifiedSimpleDate: null,
        //modifiedSimpleTime: null,
        //modifiedSimpleDateTime: null,
        //modifiedInitials: '', //2020-11-16: Not required for web ==>>  item.modifiedInitials,
        //modifiedNote: null,
  
      };

      tile.SiteLogoUrl = LoadErrorIcon;

      return tile;

    }
  
/***
 *    d8888b. d8888b.  .d88b.   .o88b. d88888b .d8888. .d8888.      d8888b. d88888b .d8888. d8888b.  .d88b.  d8b   db .d8888. d88888b 
 *    88  `8D 88  `8D .8P  Y8. d8P  Y8 88'     88'  YP 88'  YP      88  `8D 88'     88'  YP 88  `8D .8P  Y8. 888o  88 88'  YP 88'     
 *    88oodD' 88oobY' 88    88 8P      88ooooo `8bo.   `8bo.        88oobY' 88ooooo `8bo.   88oodD' 88    88 88V8o 88 `8bo.   88ooooo 
 *    88~~~   88`8b   88    88 8b      88~~~~~   `Y8b.   `Y8b.      88`8b   88~~~~~   `Y8b. 88~~~   88    88 88 V8o88   `Y8b. 88~~~~~ 
 *    88      88 `88. `8b  d8' Y8b  d8 88.     db   8D db   8D      88 `88. 88.     db   8D 88      `8b  d8' 88  V888 db   8D 88.     
 *    88      88   YD  `Y88P'   `Y88P' Y88888P `8888Y' `8888Y'      88   YD Y88888P `8888Y' 88       `Y88P'  VP   V8P `8888Y' Y88888P 
 *                                                                                                                                    
 *                                                                                                                                    
 */

    private processResponse(entireResponse: any, custCategories: ICustomCategories, newData: boolean, toggleSort ){
      
      console.log('entireResponse', entireResponse );
      let subsites = entireResponse.webs;
      let listResponse = entireResponse.lists;
      let itemsResponse = entireResponse.items;
      let hubResponse = entireResponse.hubs;

      if (subsites.length === 0 && listResponse === 0 && itemsResponse.length === 0 && hubResponse === 0 ){
        this.setState({  loadStatus: "NoItemsFound", itemsError: true, lastStateChange: 'processResponse - 0', });
        return ;
      }
      
      let originalWebs = [];
      let originalLists = [];
      let originalListItems = [];
      let originalHubs = [];

      if ( newData === true ) {

        originalWebs = JSON.parse(JSON.stringify(subsites));
        originalLists = JSON.parse(JSON.stringify(listResponse));
        originalListItems = JSON.parse(JSON.stringify(itemsResponse));
        originalHubs = JSON.parse(JSON.stringify(hubResponse));

      } else { 

        originalWebs = this.state.originalWebs;
        originalLists = this.state.originalLists;
        originalListItems = this.state.originalListItems;
        originalHubs = this.state.originalHubs;
      }

      const fixedURL = fixURLs(this.props.listWebURL, this.props.pageContext);

      let listStaticName = this.props.listTitle;

      if (this.props.listDefinition.toLowerCase().indexOf('library') > -1) {
        listStaticName = itemsResponse[0].File.ServerRelativeUrl.replace(this.props.pageContext.web.serverRelativeUrl,"");
        listStaticName = listStaticName.substring(1,listStaticName.indexOf('/',1));
      }

      const listURL = fixedURL + ( this.props.listDefinition.indexOf("Library") < 0 ? "lists/" : "" ) + listStaticName;

      const editItemURL = listURL + (listURL.indexOf('/lists/') > -1 ? '' : '/Forms') + "/DispForm.aspx?ID=" + "ReplaceID" + "&Source=" + this.currentPageUrl;
      //console.log('editItemURL',editItemURL);

      let pivotProps = this.props;
      let pivotState = this.state;


      let tileCollectionResults = buildTileCollectionFromAllResponse( 'items', itemsResponse, pivotProps, custCategories, editItemURL, pivotProps.heroCategory);
      let tileCollectionWebs = buildTileCollectionFromAllResponse( 'subs', subsites, pivotProps, custCategories, editItemURL, pivotProps.heroCategory);
      let tileCollectionLists = buildTileCollectionFromAllResponse( 'lists', listResponse, pivotProps, custCategories, editItemURL, pivotProps.heroCategory);
      let tileCollectionHubs = buildTileCollectionFromAllResponse( 'hubs', hubResponse, pivotProps, custCategories, editItemURL, pivotProps.heroCategory);
      
      console.log('tileCollectionWebs: ', tileCollectionWebs);
      console.log('tileCollectionLists: ', tileCollectionLists);
      console.log('tileCollectionResults: ', tileCollectionResults);
      console.log('tileCollectionHubs: ', tileCollectionHubs);
      
      let tileCollection : IPivotTileItemProps[] = tileCollectionResults.tileCollection;

      if ( tileCollectionWebs.tileCollection.length > 0 ) {
        tileCollectionWebs.tileCollection.map( w => {
          tileCollection.push( w );
        });
      }

      if ( tileCollectionLists.tileCollection.length > 0 ) {
        tileCollectionLists.tileCollection.map( w => {
          tileCollection.push( w );
        });
      }
      if ( tileCollectionHubs.tileCollection.length > 0 ) {
        tileCollectionHubs.tileCollection.map( w => {
          tileCollection.push( w );
        });
      }

      
      /*
      https://stackoverflow.com/a/1129270
      objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); 

        let restSort: string = "Title";
        if ( this.props.colSort ) {
          restSort = this.props.colSort;
        }

        if ( this.state.sortAsc === true ) {
          tileCollection.sort((a,b) => (a.sortValue > b.sortValue) ? 1 : ((b.sortValue > a.sortValue) ? -1 : 0));
        } else { 
          tileCollection.sort((a,b) => (b.sortValue > a.sortValue) ? 1 : ((a.sortValue > b.sortValue) ? -1 : 0));
        }
      */

      
      let newSort = toggleSort === false ? this.state.sortAsc : !this.state.sortAsc;

      if ( newSort === true ) {
        tileCollection.sort((a,b) => a['sortValue'].localeCompare(b['sortValue']));
      } else { 
        tileCollection.sort((a,b) => b['sortValue'].localeCompare(a['sortValue']));
      }

      let tileCategories = buildTileCategoriesFromResponse(pivotProps, pivotState, custCategories, tileCollection, pivotProps.heroCategory, 'category');
      
      const defaultSelectedIndex = tileCategories.indexOf( newData === true ? this.props.setTab : this.state.filteredCategory );
      let defaultSelectedKey = defaultSelectedIndex.toString();
      defaultSelectedKey = this.props.setTab.toString();  // Added this because I think this needs to be the header text, not the index.
      defaultSelectedKey = convertCategoryToIndex(defaultSelectedKey);
      if ( newData === false ) { defaultSelectedKey = toggleSort !== true ? this.props.setTab : this.state.filteredCategory ; }
      
      tileCollectionResults.categoryInfo.lastCategory = tileCategories[0];

      let heroTiles : IPivotTileItemProps[] = this.getHeroTiles(pivotProps, pivotState, tileCollection, pivotProps.heroCategory);
  
      let heroIds = this.getHeroIds(heroTiles);
  
      let newFilteredTiles : IPivotTileItemProps[] = [];
      
      if ( newData === true ) { 
        newFilteredTiles = this.getNewFilteredTiles(pivotProps, pivotState, tileCollection, heroIds, heroTiles, 'category');
      } else {
        newFilteredTiles = this.getOnClickFilteredTiles(tileCollection, heroIds, heroTiles, 'category', defaultSelectedKey );
      }

      //Modified this stackexchange to move item to front of array:  https://stackoverflow.com/a/23921775
      //objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); '
      if ( this.state.filteredCategory === this.props.fetchInfo.hubsCategory ) {
        //Resort items so that the Hubsite link is always first when you are in the Hubs category
        newFilteredTiles.sort((a,b) => a.id == this.state.departmentId ? -1 : b.id == this.state.departmentId ? 1 : 0 ); 
      }

      /*
      console.log('processResponse: tileCategories', tileCategories);
      console.log('processResponse: this.props.setTab', this.props.setTab);   
      console.log('processResponse: defaultSelectedIndex', defaultSelectedIndex);
      console.log('processResponse: defaultSelectedKey', defaultSelectedKey);
*/
      let showOtherTab = false;
      if ( tileCollectionResults.showOtherTab === true ) { showOtherTab = true ; }
      else if ( tileCollectionWebs.showOtherTab === true ) { showOtherTab = true ; }
      else if ( tileCollectionHubs.showOtherTab === true ) { showOtherTab = true ; }
      else if ( tileCollectionLists.showOtherTab === true ) { showOtherTab = true ; }

      let useThisTileCollection = this.props.ignoreList || tileCollectionResults.tileCollection.length ===  0 ? tileCollectionWebs : tileCollectionResults ;

      this.setState({
        allTiles: tileCollection,
        pivtTitles: tileCategories,
        filteredTiles: newFilteredTiles,
        lastFilteredTiles: newFilteredTiles,
        pivotDefSelKey: defaultSelectedKey,
        filteredCategory: defaultSelectedKey,
        sortAsc: newSort,
        resortCat: defaultSelectedKey,
        loadStatus:"Ready",
        heroStatus: heroTiles[0] ? "Ready" : "none",
//      heroCategoryError: (this.props.showHero === true && this.props.heroType !== "none" && this.state.heroStatus === "none") ? true : false,
        heroCategoryError: (this.props.showHero === true && this.props.heroType !== "none" && !heroTiles[0]) ? true : false,
        heroError: (this.props.showHero === true && this.props.heroType !== "none" && !heroTiles[0]) ? true : false,
        heroTiles : heroTiles,
        heroIds: heroIds,
        loadError: "",
        endTime: this.state.endTime ? this.state.endTime : getTheCurrentTime(),
        heroCategory: this.props.heroCategory,
        searchCount: newFilteredTiles.length,
        searchWhere: ' in ' + defaultSelectedKey,
        listStaticName: listStaticName,

        showOtherTab: showOtherTab,
        custCategories: useThisTileCollection.custCategories,

        originalWebs: originalWebs,
        originalLists: originalLists,
        originalListItems: originalListItems,
        originalHubs: originalHubs,

        createdInfo: useThisTileCollection.createdInfo,
        modifiedInfo: useThisTileCollection.modifiedInfo,
        categoryInfo: useThisTileCollection.categoryInfo,
        modifiedByInfo: useThisTileCollection.modifiedByInfo,
        createdByInfo: useThisTileCollection.createdByInfo,

        modifiedByTitles: useThisTileCollection.modifiedByTitles,
        modifiedByIDs: useThisTileCollection.modifiedByIDs,
        createdByTitles: useThisTileCollection.createdByTitles,
        createdByIDs: useThisTileCollection.createdByIDs,

        changePivotCats: false,
        lastStateChange: 'processResponse - 1',
      });

      if ( newData === true ) { saveAnalytics(this.props,this.state); }

      return true;
      
      let reloadHubImages = this.props.lastPropChange === 'init' ||  this.props.lastPropChange === 'filters' || this.props.lastPropChange === 'hubs' ? true : false ;

      if ( reloadHubImages === true ) {
        if ( tileCollection !== null && tileCollection.length > 0 && originalHubs.length > 0 ) {

          let didThisAlreadyRun : any = false;
          let hasHubs : any = false;
  
          tileCollection.map( t => {
              if ( t.sourceType === this.props.fetchInfo.hubsCategory ) { 
                  hasHubs = true;
                  if ( t.imageUrl.indexOf('data:image/png;base64,') !== 0 ) { didThisAlreadyRun = true; } 
//                  console.log('allAvailableHubWebs: hubCheck', t.title , didThisAlreadyRun , t.imageUrl );
              }
          });

          if ( hasHubs === true && didThisAlreadyRun !== true ) {
            allAvailableHubWebs( tileCollection, this.props.fetchInfo.hubsCategory, this.updateStateHubs.bind(this) );
          }

        }
      }

      
      return true;
  
    }

    private updateStateHubs( tileCollection ) {

      console.log('state received originalHubs', this.state.lastStateChange, tileCollection, );

      let originalHubs = this.state.originalHubs;
      let allTiles = this.state.allTiles;

      originalHubs.map( hub => {

        //Update originalHubs values with newly fetched props and save back to state.
        let original = doesObjectExistInArray( tileCollection, 'id', hub.SiteId , true );
        if ( original || original !== false ) { 
          hub.SiteLogoUrl = tileCollection[ original ].imageUrl;
          hub.Title = tileCollection[ original ].title;
          hub.Description = tileCollection[ original ].description;
          hub.Created = tileCollection[ original ].created;
          hub.LastItemUserModifiedDate = tileCollection[ original ].modified;
          hub.SPSiteUrl = tileCollection[ original ].href;    
                      
          console.log('updateStateHubs: orginal', hub.Title , hub.SiteLogoUrl.substring(0, 100) );

        }

      });

      this.setState({
        allTiles: tileCollection,
        originalHubs: originalHubs,
        lastStateChange: 'updateStateHubs',
      });

    }

    /***
     *     d888b  d88888b d888888b      d8b   db d88888b db   d8b   db d88888b d888888b db      d888888b d88888b d8888b. d88888b d8888b.      d888888b d888888b db      d88888b .d8888. 
     *    88' Y8b 88'     `~~88~~'      888o  88 88'     88   I8I   88 88'       `88'   88      `~~88~~' 88'     88  `8D 88'     88  `8D      `~~88~~'   `88'   88      88'     88'  YP 
     *    88      88ooooo    88         88V8o 88 88ooooo 88   I8I   88 88ooo      88    88         88    88ooooo 88oobY' 88ooooo 88   88         88       88    88      88ooooo `8bo.   
     *    88  ooo 88~~~~~    88         88 V8o88 88~~~~~ Y8   I8I   88 88~~~      88    88         88    88~~~~~ 88`8b   88~~~~~ 88   88         88       88    88      88~~~~~   `Y8b. 
     *    88. ~8~ 88.        88         88  V888 88.     `8b d8'8b d8' 88        .88.   88booo.    88    88.     88 `88. 88.     88  .8D         88      .88.   88booo. 88.     db   8D 
     *     Y888P  Y88888P    YP         VP   V8P Y88888P  `8b8' `8d8'  YP      Y888888P Y88888P    YP    Y88888P 88   YD Y88888P Y8888D'         YP    Y888888P Y88888P Y88888P `8888Y' 
     *                                                                                                                                                                                  
     *                                                                                                                                                                                  
     */

  /**
   * This function gets the array of tiles that should be visible by removing the items that are in the heroTiles array
   * @param thisProps 
   * @param tileCollection 
   * @param heroIds 
   * @param heroTiles 
   */
  private getNewFilteredTiles(thisProps, thisState, tileCollection : IPivotTileItemProps[], heroIds, heroTiles, thisCatColumn) {
/*
    console.log('getNewFilteredTiles: thisProps',thisProps);
    console.log('getNewFilteredTiles: tileCollection',tileCollection);
    console.log('getNewFilteredTiles: heroIds',heroIds);
    console.log('getNewFilteredTiles: heroTiles',heroTiles);
    console.log('getNewFilteredTiles: thisCatColumn',thisCatColumn);
*/
    let newFilteredTiles : IPivotTileItemProps[] = [];
    let usingDefinedCategoryColumn = thisCatColumn === 'category' ? true : false ;
    for (let thisTile of tileCollection) {
      const isNumber = typeof(thisTile.category);
      //console.log('isNumber',isNumber);
      if (isNumber === 'number'){

      } else if ( !usingDefinedCategoryColumn ) {

        newFilteredTiles.push(thisTile);

      } else if(thisTile.category.indexOf(thisProps.setTab) > -1) {  //This first if checks if it's the selected tab.

        let showThisTile = true;
        if (heroIds.length > 0 && thisProps.heroType !== 'none' && heroTiles[0]) {
          showThisTile = heroIds.indexOf(thisTile.Id.toString()) > -1 ? false : true;
        }
        if (showThisTile === true) {newFilteredTiles.push(thisTile);}
      }
    }

    return newFilteredTiles;
  }

  
  /***
   *     d888b  d88888b d888888b       .d88b.  d8b   db  .o88b. db      d888888b  .o88b. db   dD      d88888b d888888b db      d888888b d88888b d8888b. d88888b d8888b.      d888888b d888888b db      d88888b .d8888. 
   *    88' Y8b 88'     `~~88~~'      .8P  Y8. 888o  88 d8P  Y8 88        `88'   d8P  Y8 88 ,8P'      88'       `88'   88      `~~88~~' 88'     88  `8D 88'     88  `8D      `~~88~~'   `88'   88      88'     88'  YP 
   *    88      88ooooo    88         88    88 88V8o 88 8P      88         88    8P      88,8P        88ooo      88    88         88    88ooooo 88oobY' 88ooooo 88   88         88       88    88      88ooooo `8bo.   
   *    88  ooo 88~~~~~    88         88    88 88 V8o88 8b      88         88    8b      88`8b        88~~~      88    88         88    88~~~~~ 88`8b   88~~~~~ 88   88         88       88    88      88~~~~~   `Y8b. 
   *    88. ~8~ 88.        88         `8b  d8' 88  V888 Y8b  d8 88booo.   .88.   Y8b  d8 88 `88.      88        .88.   88booo.    88    88.     88 `88. 88.     88  .8D         88      .88.   88booo. 88.     db   8D 
   *     Y888P  Y88888P    YP          `Y88P'  VP   V8P  `Y88P' Y88888P Y888888P  `Y88P' YP   YD      YP      Y888888P Y88888P    YP    Y88888P 88   YD Y88888P Y8888D'         YP    Y888888P Y88888P Y88888P `8888Y' 
   *                                                                                                                                                                                                                   
   *                                                                                                                                                                                                                   
   */

  /**
   * This function gets the array of tiles that should be visible by removing the items that are in the heroTiles array
   * @param thisProps 
   * @param tileCollection 
   * @param heroIds 
   * @param heroTiles 
   */
  private getOnClickFilteredTiles( tileCollection, heroIds, heroTiles, thisCatColumn, setTab) {
    /*
    console.log('getDateFilteredTiles: thisProps',thisProps);
    console.log('getDateFilteredTiles: tileCollection',tileCollection);
    console.log('getDateFilteredTiles: heroIds',heroIds);
    console.log('getDateFilteredTiles: heroTiles',heroTiles);
    console.log('getDateFilteredTiles: thisCatColumn',thisCatColumn);
*/
    // This code originally copied from onLinkClick and adjusted for multiple uses
    let newFilteredTiles = [];
    let checkThisProp = 'category';
    let propType = 'category';
    if (thisCatColumn === 'modified' || thisCatColumn === 'created'){
      checkThisProp = thisCatColumn + 'Time';
      propType = 'time';

    } else if (thisCatColumn === 'modifiedByTitle' || thisCatColumn === 'createdByTitle') {
      checkThisProp = thisCatColumn;
      propType = 'title';     
      
    }

    for (let thisTile of tileCollection ) {
      let tileCats = [];
      if (propType === 'category'){
        tileCats = thisTile[checkThisProp];

      } else if ( propType === 'time' ) {
        let bestFormat = thisTile[checkThisProp].cats.bestFormat[0];
        tileCats = thisTile[checkThisProp].cats[bestFormat];

      } else if ( propType === 'title' ) {
        tileCats = thisTile[checkThisProp];
      }

      if(tileCats.indexOf(setTab) > -1) {

        let showThisTile = true;
        if (this.props.heroType !== 'none') {
          showThisTile = this.state.heroIds.indexOf(thisTile.Id.toString()) > -1 ? false : true;
        }
        if (showThisTile === true) {newFilteredTiles.push(thisTile) ; }
      }
    }

    return newFilteredTiles;
  }

/***
 *     d888b  d88888b d888888b      db   db d88888b d8888b.  .d88b.       d888888b d888888b db      d88888b .d8888. 
 *    88' Y8b 88'     `~~88~~'      88   88 88'     88  `8D .8P  Y8.      `~~88~~'   `88'   88      88'     88'  YP 
 *    88      88ooooo    88         88ooo88 88ooooo 88oobY' 88    88         88       88    88      88ooooo `8bo.   
 *    88  ooo 88~~~~~    88         88~~~88 88~~~~~ 88`8b   88    88         88       88    88      88~~~~~   `Y8b. 
 *    88. ~8~ 88.        88         88   88 88.     88 `88. `8b  d8'         88      .88.   88booo. 88.     db   8D 
 *     Y888P  Y88888P    YP         YP   YP Y88888P 88   YD  `Y88P'          YP    Y888888P Y88888P Y88888P `8888Y' 
 *                                                                                                                  
 *                                                                                                                  
 */

  /**
   * This function will get all tiles where the category matches theseHeros
   * @param thisProps 
   * @param thisState 
   * @param tileCollection 
   * @param theseHeros 
   */
  private getHeroTiles(thisProps, thisState, tileCollection : IPivotTileItemProps[], theseHeros) {

    let heroTiles = [];
            
    if (thisProps.showHero === true && theseHeros) {
      for (let thisTile of tileCollection) {
        if(thisTile.category.indexOf(theseHeros) > -1) {
          heroTiles.push(thisTile);
        }
      }
    }

    if (this.props.heroType !== 'carouselLayout') {
      //If it's not a slider, then only show one random tile.  Else show all
      var randomItem = heroTiles[Math.floor(Math.random()*heroTiles.length)];
      heroTiles = [randomItem];
    }
    return heroTiles;

  }

  /***
   *     d888b  d88888b d888888b      db   db d88888b d8888b.  .d88b.       d888888b d8888b. .d8888. 
   *    88' Y8b 88'     `~~88~~'      88   88 88'     88  `8D .8P  Y8.        `88'   88  `8D 88'  YP 
   *    88      88ooooo    88         88ooo88 88ooooo 88oobY' 88    88         88    88   88 `8bo.   
   *    88  ooo 88~~~~~    88         88~~~88 88~~~~~ 88`8b   88    88         88    88   88   `Y8b. 
   *    88. ~8~ 88.        88         88   88 88.     88 `88. `8b  d8'        .88.   88  .8D db   8D 
   *     Y888P  Y88888P    YP         YP   YP Y88888P 88   YD  `Y88P'       Y888888P Y8888D' `8888Y' 
   *                                                                                                 
   *                                                                                                 
   */

    /**
   * This function gets an array of the hero id's based on the array of heroTiles passed in
   * @param heroTiles 
   */
  private getHeroIds(heroTiles){
    let heroIds = [];
    if (heroTiles.length > 0){
      if (heroTiles[0]) {
        for (let thisTile of heroTiles) {
          heroIds.push(thisTile.Id.toString());
        }     
      }  
    }
    return heroIds;
  }


  /***
   *     d888b  d88888b d888888b      db   dD d88888b db    db .d8888.      db      d888888b db   dD d88888b 
   *    88' Y8b 88'     `~~88~~'      88 ,8P' 88'     `8b  d8' 88'  YP      88        `88'   88 ,8P' 88'     
   *    88      88ooooo    88         88,8P   88ooooo  `8bd8'  `8bo.        88         88    88,8P   88ooooo 
   *    88  ooo 88~~~~~    88         88`8b   88~~~~~    88      `Y8b.      88         88    88`8b   88~~~~~ 
   *    88. ~8~ 88.        88         88 `88. 88.        88    db   8D      88booo.   .88.   88 `88. 88.     
   *     Y888P  Y88888P    YP         YP   YD Y88888P    YP    `8888Y'      Y88888P Y888888P YP   YD Y88888P 
   *                                                                                                         
   *                                                                                                         
   */

  private getKeysLike(thisProps,findMe,findOp){
    //Sample call:  getKeysLike(this.props,"col","begins")
    //console.log('FoundProps that ' + findOp + ' with ' + findMe);
    //console.log(thisProps);
    const allKeys = Object.keys(thisProps);
    let foundKeys = [];
    const lFind = findMe.length;

    findMe = findMe.toLowerCase();
    findOp = findOp.toLowerCase();

    if (findOp==="begins") {
      foundKeys = allKeys.filter(k => k.toLowerCase().indexOf(findMe) === 0);
    } else if (findOp === "ends") {
      foundKeys = allKeys.filter(k => k.toLowerCase().indexOf(findMe) === ( k.length - lFind));
    } else {
      foundKeys = allKeys.filter(k => k.toLowerCase().indexOf(findMe) > -1);
    }

    let foundProps = [];
    for (let thisProp of foundKeys) {
      if (thisProp && thisProp !== "" ) { foundProps.push(thisProps[thisProp]) ; }
    }

    return foundProps;
  }


  /***
   *     d888b  d88888b d888888b      .d8888. d88888b db      d88888b  .o88b. d888888b       .o88b.  .d88b.  db      db    db .88b  d88. d8b   db .d8888. 
   *    88' Y8b 88'     `~~88~~'      88'  YP 88'     88      88'     d8P  Y8 `~~88~~'      d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88 88'  YP 
   *    88      88ooooo    88         `8bo.   88ooooo 88      88ooooo 8P         88         8P      88    88 88      88    88 88  88  88 88V8o 88 `8bo.   
   *    88  ooo 88~~~~~    88           `Y8b. 88~~~~~ 88      88~~~~~ 8b         88         8b      88    88 88      88    88 88  88  88 88 V8o88   `Y8b. 
   *    88. ~8~ 88.        88         db   8D 88.     88booo. 88.     Y8b  d8    88         Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888 db   8D 
   *     Y888P  Y88888P    YP         `8888Y' Y88888P Y88888P Y88888P  `Y88P'    YP          `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P `8888Y' 
   *                                                                                                                                                      
   *                                                                                                                                                      
   */


  private getSelectColumns(lookupColumns){

    let baseSelectColumns = [];

    for (let thisColumn of lookupColumns) {
      // Only look at columns with / in the name
      if (thisColumn && thisColumn.indexOf("/") > -1 ) {
        let isLookup = thisColumn.indexOf("/");
        if(isLookup) {
          baseSelectColumns.push(thisColumn);
        }
      }
    }
    return baseSelectColumns;
  }



  /***
   *     d888b  d88888b d888888b      d88888b db    db d8888b.  .d8b.  d8b   db d8888b.       .o88b.  .d88b.  db      db    db .88b  d88. d8b   db .d8888. 
   *    88' Y8b 88'     `~~88~~'      88'     `8b  d8' 88  `8D d8' `8b 888o  88 88  `8D      d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88 88'  YP 
   *    88      88ooooo    88         88ooooo  `8bd8'  88oodD' 88ooo88 88V8o 88 88   88      8P      88    88 88      88    88 88  88  88 88V8o 88 `8bo.   
   *    88  ooo 88~~~~~    88         88~~~~~  .dPYb.  88~~~   88~~~88 88 V8o88 88   88      8b      88    88 88      88    88 88  88  88 88 V8o88   `Y8b. 
   *    88. ~8~ 88.        88         88.     .8P  Y8. 88      88   88 88  V888 88  .8D      Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888 db   8D 
   *     Y888P  Y88888P    YP         Y88888P YP    YP 88      YP   YP VP   V8P Y8888D'       `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P `8888Y' 
   *                                                                                                                                                       
   *                                                                                                                                                       
   */


  private getExpandColumns(lookupColumns){

    let baseExpandColumns = [];

    for (let thisColumn of lookupColumns) {
      // Only look at columns with / in the name
      if (thisColumn && thisColumn.indexOf("/") > -1 ) {
        let splitCol = thisColumn.split("/");
        let leftSide = splitCol[0];
        if(baseExpandColumns.indexOf(leftSide) < 0) {
          baseExpandColumns.push(leftSide);
        }
      }
    }
    return baseExpandColumns;
  }

}


import { IPivotTileItemProps } from './components/TileItems/IPivotTileItemProps';
import { IPropChangeTypes } from './components/PivotTiles/IPivotTilesProps';
import { ICustomTypes } from './components/PivotTiles/IPivotTilesProps';

import { PageContext } from '@microsoft/sp-page-context';

// changes = changeHubs, changeSubs, changeGroups, changeLists, changeFormats, changeItems, changeCats, changeFilters
export const changeHubs = [ 'hubsLazy', 'hubsInclude', 'hubsCategory','hubsOthers', ];
export const changeSubs = [ 'subsitesInclude', 'subsitesCategory', 'subsOthers',  ];
export const changeGroups = [ 'groupsInclude', 'groupsCategory', 'groupsLazy', 'groupsList' , 'groupsOthers', 'groupsShowGuests', 'groupsShowAdmins' ];
export const changeLists = [ 'listsInclude', 'listIconStyles', 'listFilter', 'listLibCat', 'listCategory',
  'libsInclude', 'libsIconStyles', 'libsFilter', 'listHideSystem', 'listOthers', 'libsCategory', 'libsOthers', ];

export const changeFormats = [ 'setSize','setTab','otherTab','setPivSize','heroCategory','heroRatio','showHero','setPivFormat','setImgFit','setImgCover','target',
  'imageWidth','imageHeight','textPadding','setHeroFit','setHeroCover','onHoverZoom', 'enableChangePivots',];

export const changeItems = [ 'ignoreList', 'definitionToggle', 'listDefinition', 'listTitle', 'listWebURL' ];
export const changeCats = [ 'custCatType', 'custCatCols', 'custCatLogi', 'custCatBrak', ];

export const changeFilters = [  'setFilter', 'filterTitle', 'filterDescription', 'filterEverything', ];


export interface IPivottiles7WebPartProps {

  //Main webpart properties
  scenario: string;
  description: string;
  pageContext: PageContext;

  lastPropChange: IPropChangeTypes; //IPropChangeTypes =  'hubs' | 'subs' | 'group' | 'lists' | 'format' | 'items' | 'other'; //lastPropChange
  lastPropDetailChange: string;

  //Hero tile properties
  showHero: boolean;
  heroType: string;
  heroCategory: string;
  heroRatio: number;
  setHeroFit: string;
  setHeroCover: string;

  //Image & main tile properties
  onHoverZoom: string;
  onHoverEffect: string;
  setSize: string;
  setRatio: string;
  setImgFit: string;
  setImgCover: string;
  target: string;

  //Custom image properties
  imageWidth: number;
  imageHeight: number;
  textPadding: number;

  //Pivot Tab properties
  setTab: string;
  setPivSize: string;
  setPivFormat: string;
  setPivOptions: string[];
  otherTab: string;
  enableChangePivots: boolean;
  
  //List primary settings
  definitionToggle: boolean;
  listDefinition: string;
  listWebURL: string;
  listTitle: string;
  setFilter: string;
  filterEverything: boolean;
  filterTitle: string;
  filterDescription: string;
  propURLQuery: boolean;
  getAll: boolean;

  //List column mapping
  colTitleText: string;
  colHoverText: string;
  colCategory: string;
  colColor: string;
  colSize: string;
  colGoToLink: string;
  colOpenBehaviour: string;
  colImageLink: string;
  colSort: string;
  colTileStyle: string;

  custCatType: ICustomTypes;
  custCatCols: string;
  custCatLogi: string;
  custCatBrak: boolean;
  
  hubsInclude: boolean ;
  hubsCategory: string ;
  hubsLazy: boolean ;
  hubsOthers: boolean ;

  groupsInclude: boolean ;
  groupsCategory: string ;
  groupsLazy: boolean ;
  groupsList: string ;
  groupsOthers: boolean ;
  groupsShowAdmins: boolean ;
  groupsShowGuests: boolean ;

  usersInclude: boolean ;
  usersCategory: string ;
  usersLazy: boolean ;
  usersOthers: boolean ;

  subsitesInclude: boolean;
  subsitesCategory: string;
  subsOthers: boolean ;

  ignoreList: boolean;
  
  listsInclude: boolean;
  listIconStyles: string;
  listFilter: string;
  listOthers: boolean ;

  libsInclude: boolean;
  libsIconStyles: string;
  libsFilter: string;
  listHideSystem: boolean;
  libsOthers: boolean ;

  listLibCat: string;
          // listsInclude, libsInclude, listLibCat, listIconStyles, libsIconStyles

  //List based analytics properties
  analyticsList: string;
  analyticsWeb: string;


  }
import { IPivotTileItemProps } from './components/TileItems/IPivotTileItemProps';
import { ICustomTypes } from './components/PivotTiles/IPivotTilesProps';

import { PageContext } from '@microsoft/sp-page-context';

export interface IPivottiles7WebPartProps {

  //Main webpart properties
  scenario: string;
  description: string;
  pageContext: PageContext;

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
  filterOnlyList: boolean;
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

  groupsInclude: boolean ;
  groupsCategory: string ;
  groupsLazy: boolean ;
  groupsList: string ;

  usersInclude: boolean ;
  usersCategory: string ;
  usersLazy: boolean ;

  subsitesInclude: boolean;
  subsitesCategory: string;

  ignoreList: boolean;
  
  listsInclude: boolean;
  listIconStyles: string;
  listFilter: string;
  libsInclude: boolean;
  libsIconStyles: string;
  libsFilter: string;
  listHideSystem: boolean;

  listLibCat: string;
          // listsInclude, libsInclude, listLibCat, listIconStyles, libsIconStyles

  //List based analytics properties
  analyticsList: string;
  analyticsWeb: string;


  }
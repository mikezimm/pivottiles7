import {IPivotTileItemProps} from './../TileItems/IPivotTileItemProps';
import { PageContext } from '@microsoft/sp-page-context';

import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface theTime {
  now: Date;
  theTime : string;
  milliseconds : number;
}

export interface ICustomLogic {

  category: string;
  regex?: string;
  att?: string; // regex attributes "g", "i", "m" - default if nothing here is "i"
  eval?: string; // Used in place of regex
  break?: boolean; // If this one is true, then don't do any more.  Good for bucketing dates.  Default = false so items can show in multiple categories

}

export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';

export interface ICustomCategories {

  type: ICustomTypes;
  column: string;
  logic: ICustomLogic[] | string[];
  break?: boolean; // If this one is true, then only show in first category in array check.  Default = false so items can show in multiple categories
  allTabs?: string[];
}

export interface IFetchListsSettings {
  listsInclude: boolean;
  listIconStyles: string;
  listFilter: string;
  listCategory: string;

  libsInclude: boolean;
  libsIconStyles: string;
  libsFilter: string;
  libsCategory: string;

  listHideSystem: boolean;

  listLibCat: string;
}

export interface IPivotTilesProps {

  themeVariant: IReadonlyTheme | undefined;
  
  //Main webpart properties
  scenario: string;
  description: string;
  pageContext: PageContext;
  tenant: string;
  urlVars: {};

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
  maxPivotChars: number;
  
  //List primary settings
  listDefinition: string;
  listWebURL: string;
  listTitle: string;
  setFilter: string;
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

  custCategories: ICustomCategories;

  //List column mapping - always available columns
  colModified: string;
  colModifiedById: string;
  colModifiedByTitle: string;
  colCreated: string;
  colCreatedById: string;
  colCreatedByTitle: string;

  
  //List based analytics properties
  analyticsList: string;
  analyticsWeb: string;

  subsitesInclude: boolean;
  subsitesCategory: string;
  subsitesOnly: boolean;

  fetchLists: IFetchListsSettings;
  
  //Properties NOT in main webpart properties
  
  startTime: theTime;

  loadListItems?: () => Promise<IPivotTileItemProps[]>;
  convertCategoryToIndex?(cat:string) : string;

}

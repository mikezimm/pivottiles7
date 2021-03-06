import {IPivotTileItemProps} from './../TileItems/IPivotTileItemProps';
import { PageContext } from '@microsoft/sp-page-context';
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { IReadonlyTheme } from '@microsoft/sp-component-base';

import { Pivot, IPivotStyles, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';

import { IGroupsProps } from '../Groups/IMyGroupsProps';

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

export interface IFetchInfoSettings {

  hubsInclude: boolean ;
  hubsCategory: string ;
  hubsLazy: boolean ;
  hubsOthers: boolean ;

  groupsInclude: boolean ;
  groupsCategory: string ;
  groupsLazy: boolean ;
  groupsList: string[] ;
  groupsProps: IGroupsProps[] ;
  groupsOthers: boolean ;
  groupsShowAdmins: boolean ;
  groupsShowGuests: boolean ;
  
  usersInclude: boolean ;
  usersCategory: string ;
  usersLazy: boolean ;
  usersOthers: boolean ;

  subsitesInclude: boolean ;
  subsitesCategory: string ;
  ignoreList: boolean ;
  subsOthers: boolean ;

  listsInclude: boolean;
  listIconStyles: string;
  listFilter: string;
  listCategory: string;
  listOthers: boolean ;

  libsInclude: boolean;
  libsIconStyles: string;
  libsFilter: string;
  libsCategory: string;
  libsOthers: boolean ;

  listHideSystem: boolean;

  listLibCat: string;
}

export type IPropChangeTypes =  'hubs' | 'subs' | 'groups' | 'lists' | 'format' | 'items' | 'other' | 'cats' | 'filters' | 'init' ; //lastPropChange

export interface IPivotTilesProps {

  themeVariant: IReadonlyTheme | undefined;
  
  //Main webpart properties
  scenario: string;
  description: string;
  pageContext: PageContext;
  context: WebPartContext;
  tenant: string;
  urlVars: {};

  lastPropChange: IPropChangeTypes;
  lastPropDetailChange: string;

  WebpartElement: HTMLElement;   //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

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
  setPivSize: PivotLinkSize;
  setPivFormat: PivotLinkFormat;
  setPivOptions: string[];
  otherTab: string;
  enableChangePivots: boolean;
  maxPivotChars: number;
  
  //List primary settings
  listDefinition: string;
  listWebURL: string;
  listTitle: string;
  setFilter: string;
  filterTitle: string;
  filterDescription: string;
  filterEverything: boolean;
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

  ignoreList: boolean;

  fetchInfo: IFetchInfoSettings;
  
  //Properties NOT in main webpart properties
  
  startTime: theTime;

  loadListItems?: () => Promise<IPivotTileItemProps[]>;
  convertCategoryToIndex?(cat:string) : string;

}

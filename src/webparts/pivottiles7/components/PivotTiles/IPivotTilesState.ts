import {IPivotTileItemProps, } from './../TileItems/IPivotTileItemProps';
import { theTime,ICustomCategories } from './IPivotTilesProps';
import { IDateInfo, IPersonInfo } from './BuildTileCollection';


export interface IPivotTilesState {

  WebpartHeight?:  number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
  WebpartWidth?:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

  lastStateChange: string;
  showDevHeader: boolean;
  
  heroTiles?: IPivotTileItemProps[];
  heroIds?: string[];
  heroCategory: string;
  resortCat: string; // Used to filter items when resorting.

  allTiles?:IPivotTileItemProps[];
  filteredTiles?: IPivotTileItemProps[];
  lastFilteredTiles?: IPivotTileItemProps[];
  pivtTitles?:string[];
  filteredCategory?: string;
  showAllTiles?: boolean;
  pivotDefSelKey?: string;
  loadListItems?: () => Promise<IPivotTileItemProps[]>;
  loadStatus?: string;
  heroStatus?: string;
  showTips?: string;
  loadError?: string;
  lookupColumns?: string[];
  showOtherTab?: boolean;
  heroCategoryError?: boolean;
  listError?: boolean;
  itemsError?: boolean;
  heroError?: boolean;

  searchType?: string;
  searchShow?: boolean;
  searchCount?: number;
  searchWhere?: string;

  sortAsc: boolean;

  changePivotCats: boolean;
  custCategories: ICustomCategories;

  originalLists:any[];
  originalListItems:any[];
  originalWebs:any[];
  originalHubs:any[];

  departmentId: string;

  shuffleShow?: boolean;

  endTime?: theTime;

  items?:any[];

  listStaticName: string;

  setLayout?: string;
  
  colCategory: string;

  thisCatColumn: string;
  
  createdInfo?: IDateInfo;
  modifiedInfo?: IDateInfo;
  categoryInfo?: IDateInfo;

  modifiedByInfo?: IPersonInfo;
  createdByInfo?: IPersonInfo;

  modifiedByTitles?: any[];
  modifiedByIDs?: any[];
  createdByTitles?: any[];
  createdByIDs?: any[];

}

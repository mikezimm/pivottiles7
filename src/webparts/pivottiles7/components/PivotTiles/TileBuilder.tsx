import {  } from '@microsoft/sp-webpart-base';

import * as React from 'react';
import styles from './PivotTiles.module.scss';
import { Link } from 'office-ui-fabric-react/lib/Link';

import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import PivotTileItem from './../TileItems/PivotTileItem';


import { Carousel, CarouselButtonsLocation, CarouselButtonsDisplay } from "@pnp/spfx-controls-react/lib/Carousel";
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

//From https://tahoeninjas.blog/2019/08/07/sharepoint-framework-design-series-layout-patterns-part-iii/
import { CarouselLayout, ICarouselItem } from '../../components/carouselLayout';

import Grid from './../../components/gridComponent/Grid';
import { IGridProps, IGridItem } from './../../components/gridComponent/Grid.types';

import { IPivotTilesProps } from './IPivotTilesProps';
import { IPivotTilesState } from './IPivotTilesState';

//export default class NoListFound extends React.Component<IPivotTilesProps, IPivotTilesState> {



/***
 *    d888888b d888888b db      d88888b      d8888b. db    db d888888b db      d8888b. d88888b d8888b. 
 *    `~~88~~'   `88'   88      88'          88  `8D 88    88   `88'   88      88  `8D 88'     88  `8D 
 *       88       88    88      88ooooo      88oooY' 88    88    88    88      88   88 88ooooo 88oobY' 
 *       88       88    88      88~~~~~      88~~~b. 88    88    88    88      88   88 88~~~~~ 88`8b   
 *       88      .88.   88booo. 88.          88   8D 88b  d88   .88.   88booo. 88  .8D 88.     88 `88. 
 *       YP    Y888888P Y88888P Y88888P      Y8888P' ~Y8888P' Y888888P Y88888P Y8888D' Y88888P 88   YD 
 *                                                                                                     
 *                                                                                                     
 */

/**
 * 
 * @param parentProps 
 * @param parentState 
 */

export function tileBuilder(parentProps,parentState){
  console.log('tileBuilder',parentProps,parentState);
  const tileBuild = parentState.filteredTiles.map(newTile => (
      oneTileBuilder(parentProps,parentState, 'normal', newTile )
  ));
    //      setImgFit={newTile.setRatio = '1x1'? 'portrait' : newTile.setImgFit}

  return tileBuild;
}


/***
 *    db      d888888b .d8888. d888888b      db    db d888888b d88888b db   d8b   db      d8888b. db    db d888888b db      d8888b. d88888b d8888b. 
 *    88        `88'   88'  YP `~~88~~'      88    88   `88'   88'     88   I8I   88      88  `8D 88    88   `88'   88      88  `8D 88'     88  `8D 
 *    88         88    `8bo.      88         Y8    8P    88    88ooooo 88   I8I   88      88oooY' 88    88    88    88      88   88 88ooooo 88oobY' 
 *    88         88      `Y8b.    88         `8b  d8'    88    88~~~~~ Y8   I8I   88      88~~~b. 88    88    88    88      88   88 88~~~~~ 88`8b   
 *    88booo.   .88.   db   8D    88          `8bd8'    .88.   88.     `8b d8'8b d8'      88   8D 88b  d88   .88.   88booo. 88  .8D 88.     88 `88. 
 *    Y88888P Y888888P `8888Y'    YP            YP    Y888888P Y88888P  `8b8' `8d8'       Y8888P' ~Y8888P' Y888888P Y88888P Y8888D' Y88888P 88   YD 
 *                                                                                                                                                  
 *                                                                                                                                                  
 */

export function listViewBuilder(parentProps,parentState, theseAreItems, thisCategory){
  // Carousel option from https://github.com/hugoabernier/WebPartDesignSeries
  console.log('listViewBuilder',parentProps,parentState,theseAreItems);
  let items = [];

  for (let item of theseAreItems){
    const isArray = typeof(item.category);
    //console.log(isArray);

    if (isArray === 'string') {
      item.txtCategory = item.category;
    } else if (isArray === 'object' && item.category.length === 1) {
      item.txtCategory = item.category[0];
    } else if (isArray === 'object' && item.category.length > 1) {
      item.txtCategory = item.category.join(", ");
    }

    items.push(item);
  }

  //remap props to correct ones for HGcarouselLayout
  const viewFields: IViewField[]=[
    {
      name: "Id",
      displayName: "Id",
      isResizable: false,
      sorting: true,
      minWidth: 20,
      maxWidth: 30
    },{   
      name: "modifiedNote",
      displayName: "Modified",
      isResizable: true,
      sorting: true,
      minWidth: 30,
      maxWidth: 140
    },{   
      name: "createdNote",
      displayName: "Created",
      isResizable: true,
      sorting: true,
      minWidth: 30,
      maxWidth: 140
    },{   
      name: "txtCategory",
      displayName: "Category",
      isResizable: true,
      sorting: true,
      minWidth: 30,
      maxWidth: 120
    },{    
      name: "title",
      displayName: "Title",
      linkPropertyName: "href",
      isResizable: true,
      sorting: true,
      minWidth: 50,
      maxWidth: 200
    },{
      name: "description",
      displayName: "Description",
      //linkPropertyName: "c",
      isResizable: true,
      sorting: true,
      minWidth: 30,
      maxWidth: 200
    },
  ];
  

  /**
    name: string;
    displayName?: string;
    linkPropertyName?: string;
    sorting?: boolean;
    minWidth?: number;
    maxWidth?: number;
    isResizable?: boolean;
  */


  let listView = 
    <ListView
      items={items}
      viewFields={viewFields}
      iconFieldName="href"
      compact={false}
      selectionMode={SelectionMode.single}
      //selection={this._getSelection}
      showFilter={false}
      //defaultFilter="John"
      filterPlaceHolder="Search..."
      //groupByFields={groupByFields}
       />;

  return listView;

}


/***
 *     .o88b.  .d8b.  d8888b.  .d88b.  db    db .d8888. d88888b db           d8888b. db    db d888888b db      d8888b. d88888b d8888b. 
 *    d8P  Y8 d8' `8b 88  `8D .8P  Y8. 88    88 88'  YP 88'     88           88  `8D 88    88   `88'   88      88  `8D 88'     88  `8D 
 *    8P      88ooo88 88oobY' 88    88 88    88 `8bo.   88ooooo 88           88oooY' 88    88    88    88      88   88 88ooooo 88oobY' 
 *    8b      88~~~88 88`8b   88    88 88    88   `Y8b. 88~~~~~ 88           88~~~b. 88    88    88    88      88   88 88~~~~~ 88`8b   
 *    Y8b  d8 88   88 88 `88. `8b  d8' 88b  d88 db   8D 88.     88booo.      88   8D 88b  d88   .88.   88booo. 88  .8D 88.     88 `88. 
 *     `Y88P' YP   YP 88   YD  `Y88P'  ~Y8888P' `8888Y' Y88888P Y88888P      Y8888P' ~Y8888P' Y888888P Y88888P Y8888D' Y88888P 88   YD 
 *                                                                                                                                     
 *                                                                                                                                     
 */


/**
 * 
 * @param parentProps 
 * @param parentState 
 */

export function carouselBuilder(parentProps,parentState){
  console.log('carouselBuilder',parentProps,parentState);
  let carouselFullLineBuild: any;

  if (parentState.heroTiles[0]) {

   const carouselElements = parentState.heroTiles.map(newTile => (
        oneTileBuilder(parentProps,parentState, 'hero', newTile )
    ));

    carouselFullLineBuild = 
    <Carousel
      buttonsLocation={CarouselButtonsLocation.top}
      buttonsDisplay={CarouselButtonsDisplay.block}
      isInfinite={true}
      element={carouselElements}
      onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
      onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
    />
      ;
  } else { carouselFullLineBuild = ""; }

  return carouselFullLineBuild;
}


/***
 *    db   db d88888b d8888b.  .d88b.       d8888b. db    db d888888b db      d8888b. d88888b d8888b. 
 *    88   88 88'     88  `8D .8P  Y8.      88  `8D 88    88   `88'   88      88  `8D 88'     88  `8D 
 *    88ooo88 88ooooo 88oobY' 88    88      88oooY' 88    88    88    88      88   88 88ooooo 88oobY' 
 *    88~~~88 88~~~~~ 88`8b   88    88      88~~~b. 88    88    88    88      88   88 88~~~~~ 88`8b   
 *    88   88 88.     88 `88. `8b  d8'      88   8D 88b  d88   .88.   88booo. 88  .8D 88.     88 `88. 
 *    YP   YP Y88888P 88   YD  `Y88P'       Y8888P' ~Y8888P' Y888888P Y88888P Y8888D' Y88888P 88   YD 
 *                                                                                                    
 *                                                                                                    
 */

/**
 * 
 * @param parentProps 
 * @param parentState 
 */
export function heroBuilder(parentProps,parentState){
  console.log('heroBuilder',parentProps,parentState);
    let heroFullLineBuild : any;
    if (parentState.heroTiles) {
      heroFullLineBuild = parentState.heroTiles.map(newTile => (
        oneTileBuilder(parentProps,parentState, 'hero', newTile )
      ));
    } else { heroFullLineBuild = ""; }

    return heroFullLineBuild;
}


/***
 *     .d88b.  d8b   db d88888b      d888888b d888888b db      d88888b      d8888b. db    db d888888b db      d8888b. d88888b d8888b. 
 *    .8P  Y8. 888o  88 88'          `~~88~~'   `88'   88      88'          88  `8D 88    88   `88'   88      88  `8D 88'     88  `8D 
 *    88    88 88V8o 88 88ooooo         88       88    88      88ooooo      88oooY' 88    88    88    88      88   88 88ooooo 88oobY' 
 *    88    88 88 V8o88 88~~~~~         88       88    88      88~~~~~      88~~~b. 88    88    88    88      88   88 88~~~~~ 88`8b   
 *    `8b  d8' 88  V888 88.             88      .88.   88booo. 88.          88   8D 88b  d88   .88.   88booo. 88  .8D 88.     88 `88. 
 *     `Y88P'  VP   V8P Y88888P         YP    Y888888P Y88888P Y88888P      Y8888P' ~Y8888P' Y888888P Y88888P Y8888D' Y88888P 88   YD 
 *                                                                                                                                    
 *                                                                                                                                    
 */

/**
 * 
 * @param parentProps 
 * @param parentState 
 * @param tType 
 */
export function oneTileBuilder(parentProps : IPivotTilesProps,parentState, tType, newTile ){
  //console.log('oneTileBuilder',parentProps,parentState);

  const thisTile = 
    <PivotTileItem
      sourceType = { newTile.sourceType }
      system = { newTile.system }
      parentCat = {parentState.filteredCategory}
      imageUrl={newTile.imageUrl}
      title={newTile.title}
      description={newTile.description}
      href={newTile.href}
      category={newTile.category}
      setTab={newTile.setTab}
      Id={newTile.Id}
      options={newTile.options}
      color={newTile.color}
      imgSize={newTile.imgSize}
      listWebURL={newTile.listWebURL}
      listTitle={newTile.listTitle}
      setRatio={newTile.setRatio}
      setSize={newTile.setSize}

      themeVariant={parentProps.themeVariant}

      setImgFit={ tType === 'normal' ? newTile.setImgFit : parentProps.setHeroFit }
      setImgCover={ tType === 'normal' ? newTile.setImgCover : parentProps.setHeroCover }

      target={newTile.target}
      onHoverZoom={parentProps.onHoverZoom}

      heroType={ tType === 'normal' ? 'none' : newTile.heroType }
      heroCategory={ tType === 'normal' ? 'none' : parentProps.heroCategory }

      imageWidth = {parentProps.imageWidth}
      imageHeight = {parentProps.imageHeight}
      textPadding = {parentProps.textPadding}

      created = {newTile.created}
      modified = {newTile.modified}
      modifiedTime = {newTile.modifiedTime}
      createdTime = {newTile.createdTime}
      editor = {newTile.editor}
      author = {newTile.Author}

      />;

    //      setImgFit={newTile.setRatio = '1x1'? 'portrait' : newTile.setImgFit}
  return thisTile;

}

/***
 *     .o88b.  .d8b.  d8888b.  .d88b.  db    db .d8888. d88888b db           db       .d8b.  db    db  .d88b.  db    db d888888b 
 *    d8P  Y8 d8' `8b 88  `8D .8P  Y8. 88    88 88'  YP 88'     88           88      d8' `8b `8b  d8' .8P  Y8. 88    88 `~~88~~' 
 *    8P      88ooo88 88oobY' 88    88 88    88 `8bo.   88ooooo 88           88      88ooo88  `8bd8'  88    88 88    88    88    
 *    8b      88~~~88 88`8b   88    88 88    88   `Y8b. 88~~~~~ 88           88      88~~~88    88    88    88 88    88    88    
 *    Y8b  d8 88   88 88 `88. `8b  d8' 88b  d88 db   8D 88.     88booo.      88booo. 88   88    88    `8b  d8' 88b  d88    88    
 *     `Y88P' YP   YP 88   YD  `Y88P'  ~Y8888P' `8888Y' Y88888P Y88888P      Y88888P YP   YP    YP     `Y88P'  ~Y8888P'    YP    
 *                                                                                                                               
 *                                                                                                                               
 */

export function carouselLayout(parentProps,parentState, theseAreItems, thisCategory){
  // Carousel option from https://github.com/hugoabernier/WebPartDesignSeries

  console.log('carouselLayout',parentProps,parentState, theseAreItems, thisCategory);

  //remap props to correct ones for HGcarouselLayout
  let items = theseAreItems.map(item => ({

    imageSrc: item.imageUrl,
    title: item.title,
    location: item.description,
    href: item.href,
    target: item.target,

  }));

  let carousel = 
    <CarouselLayout
      pagingTemplate={'{0} of {1} in ' + thisCategory}
      ariaLabel={'Use right and left arrow keys to navigate between images in the carousel. Use up and down arrow keys to access the edit and remove buttons for any image.'}
      items={items}
      onSlideClick={(currentSlide) => { alert(`You clicked on slide ${currentSlide+1}`); }}
      heroRatio={parentProps.heroRatio}
    >
    </CarouselLayout>;

  return carousel;

}


/***
 *     d888b  d8888b. d888888b d8888b.      db       .d8b.  db    db  .d88b.  db    db d888888b 
 *    88' Y8b 88  `8D   `88'   88  `8D      88      d8' `8b `8b  d8' .8P  Y8. 88    88 `~~88~~' 
 *    88      88oobY'    88    88   88      88      88ooo88  `8bd8'  88    88 88    88    88    
 *    88  ooo 88`8b      88    88   88      88      88~~~88    88    88    88 88    88    88    
 *    88. ~8~ 88 `88.   .88.   88  .8D      88booo. 88   88    88    `8b  d8' 88b  d88    88    
 *     Y888P  88   YD Y888888P Y8888D'      Y88888P YP   YP    YP     `Y88P'  ~Y8888P'    YP    
 *                                                                                              
 *                                                                                              
 */

export function gridLayout(parentProps,parentState, theseAreItems, thisCategory){
  // Carousel option from https://github.com/hugoabernier/WebPartDesignSeries
  console.log('gridLayout',parentProps,parentState, theseAreItems, thisCategory);
  let items = theseAreItems.map(item => ({

    thumbnail: item.imageUrl,
    title: item.title,
    name: item.description,
    profileImageSrc: "",
    location: item.category.join('; '),
    activity: "",
    href: item.href,
    target: item.target,
    listWebURL:item.listWebURL,

  }));


  let grid: React.ReactElement<IGridProps> = React.createElement(
    Grid,
    { items: items,
    }
  );

  return grid;

}

import * as React from 'react';
import { Image, ImageFit, } from 'office-ui-fabric-react/lib/Image';

import { css, IImageProps, sizeToPixels, } from 'office-ui-fabric-react';

import { IReadonlyTheme } from '@microsoft/sp-component-base';

import styles from './PivotTileItem.module.scss';
import tUtils from './utilTiles';

import { IPivotTileItemProps } from './IPivotTileItemProps';
import { IPivotTileItemState } from './IPivotTileItemState';

import { imageOptionsGroup, } from '../../../../services/propPane';

import { createIconButton } from '../createButtons/IconButton';

export default class PivotTileItem extends React.Component<IPivotTileItemProps, IPivotTileItemState> {

  public iHoverZoomStyle = tUtils.getOnHoverStyle(this.props.onHoverZoom);

  public thisHeight = `${this.props.imageHeight}px`;
  public thisWidth = `${this.props.imageWidth}px`;

  constructor(props: IPivotTileItemProps, state: IPivotTileItemState) {
    super(props);

    this.state = {
      hovering: 10,
      visible:10
    };
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

    let rebuildTile : boolean = false;

    if ( this.props.imageUrl !== prevProps.imageUrl ) { rebuildTile = true ; }
    if ( this.props.Id !== prevProps.Id ) { rebuildTile = true ; }
    if ( this.props.href !== prevProps.href ) { rebuildTile = true ; }

    if (rebuildTile === true) {
      this._updateStateOnPropsChange();
    }

  }

  public mouseOver(event): void {
    this.setState({ hovering: true });
  }

  public mouseOut(event): void {
    this.setState({ hovering: false });
  }

  public specialClick(event): void {

    if (event.shiftKey) {
      if (event.altKey) {
        if (event.ctrlKey) {      
          window.open(this.props.listWebURL, '_blank');
          event.preventDefault();
          return ;
        }
      }
    }
  }

  public render(): React.ReactElement<IPivotTileItemProps> {
    
    let isFabricIcon : boolean = this.props.imageUrl && this.props.imageUrl.length < 20 && this.props.imageUrl.indexOf('/') === -1 ? true : false;

    let thisTop = `${this.props.imageHeight * .6 }px`;

    let thisFit = this.props.setImgFit.indexOf('cover') ?  'cover' : 'contain';
    //let imgURL = (item[this.props.backgroundImageField]) ? item[this.props.backgroundImageField].Url : this.props.fallbackImageUrl;
    //let thisTarget = (item[this.props.newTabField]) ? "_blank" : "";
    //let thisHref = (item[this.props.linkField]) ? item[this.props.linkField].Url : "#";
    let thisPadding = `${this.props.textPadding}px`;
    let iStyles = null;
    
    if (this.props.heroType === "none" || this.props.heroType === "") {
        iStyles= tUtils.getTheseStyles(this.props.setSize,this.props.setRatio);
    } else {
        iStyles= tUtils.getHeroStyles(this.props.setSize,this.props.setRatio, this.props.heroType);
    }

    //var iHoverZoomStyle = tUtils.getOnHoverStyle(this.props.onHoverZoom);

    if (this.props.heroType === "none" && this.props.setSize === "Custom"){
      return (
        <div>
          <a href={this.props.href} 
            className={styles.pivotTiles}
            style={ {width: this.thisWidth, height: this.thisHeight }  }
            target={imageOptionsGroup.getTarget(this.props.target)}
            role="listitem" 
            onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}
            onClick={this.specialClick.bind(this)}
            >
            <div className={ [styles.pTileItemWrapper, styles.pTileItemWrapperExpanded].join(" ")}
              style={ { width: this.thisWidth, height: this.thisHeight , textAlign : isFabricIcon === true ? 'center' : null } } 
              >

              { this.getImageOrIcon() }
  
              <div className={[styles.pTileItemHoverPanel, 
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator#Conditional_chains
                this.state.hovering === true  ? styles.pTileItemHoverPanelExpanded
                : this.state.hovering === false  ? styles.pTileItemHoverPanelNotExpanded
                : styles.pTileItemHoverPanelNotExpanded
                ].join(" ")}
                style={{ width: this.thisWidth, height: this.thisHeight, top: ( this.state.hovering === true ? 0 : thisTop ), padding: thisPadding }} 
                >
                <div className={styles.pTileItemTitle}>{this.props.title}</div>
                <div className={styles.pTileItemDesc}>{this.props.description}</div>
              </div>
            </div>
          </a>
        </div>
  
      );
    } else {
      return (
        <div>
          <a href={this.props.href} 
            className={styles.pivotTiles}
            target={imageOptionsGroup.getTarget(this.props.target)}
            role="listitem" 
            onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}
            onClick={this.specialClick.bind(this)}
            >
            <div className={ [iStyles.iWrap, iStyles.iWrapExp].join(" ")} style={{ textAlign : isFabricIcon === true ? 'center' : null }}>
  
              { this.getImageOrIcon() }
  
              <div className={[iStyles.iHovPan, 
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator#Conditional_chains
                this.state.hovering === true  ? iStyles.iHovPanExp
                : this.state.hovering === false  ? iStyles.iHovPanNot
                : iStyles.iHovPanNot
                ].join(" ")}
                >
                <div className={iStyles.iTitle}>{this.props.title}</div>
                <div className={styles.pTileItemDesc}>{this.props.description}</div>
              </div>
            </div>
          </a>
        </div>
  
      );
    }

  }

  private getThisStyle ( what: 'font' | 'background' | 'size' | 'top' | 'icon' ) {

    let { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    let colors = this.props.color && this.props.color.length > 0 ? this.props.color : '';
    let sizes = this.props.imgSize && this.props.imgSize.length > 0 ? this.props.imgSize : '';

    let availableStyles = [ colors , sizes ].join(';');
    let theseStyles = availableStyles.split(';');

    let resultStyle = '';
    if ( what === 'font' ) { resultStyle = 'darkgray'; }
    if ( what === 'background' ) { resultStyle = semanticColors.bodyBackground; }
    if ( what === 'size' ) { resultStyle = '65'; }
    if ( what === 'top' ) { resultStyle = '-10px'; }


    theseStyles.map( c => {
      let thisColor = c.split('=');
      if ( thisColor.length === 2 ) {
        if ( thisColor[0] === what) { resultStyle=thisColor[1] ; }
      }
    });

    return resultStyle;

  }
  private getImageOrIcon ( ) {

    let result = null;
    let isFabricIcon : boolean = this.props.imageUrl && this.props.imageUrl.length < 20 && this.props.imageUrl.indexOf('/') === -1 ? true : false;
//    console.log('isFabricIcon', isFabricIcon );
    if ( isFabricIcon === true ) {
      
      let size = parseInt(this.getThisStyle('size')) / 100;
      let top = this.getThisStyle('top');
      let iconHeight = parseInt(this.thisHeight, 10) * size;


      let defCommandIconStyles = {
        root: {padding:'10px !important', height: this.thisHeight, width: this.thisWidth, top: top },//color: 'green' works here
        icon: { 
          fontSize: iconHeight,
          fontWeight: "normal",
          margin: '0px 2px',
          color: this.getThisStyle('font'), //This will set icon color  this.getThisStyle('font')
       },
      };
      
      let backgrond = this.getThisStyle('background');

      let thisIcon = null;
      if ( this.props.imageUrl === 'Github' ) {
        thisIcon = <svg className="octicon octicon-mark-github v-align-middle" style={{ marginTop: 15, fill: 'dimgray' }} height={iconHeight.toFixed()} viewBox="0 0 16 16" version="1.1" width={iconHeight.toFixed()} aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>;

      } else {
        thisIcon = createIconButton( this.props.imageUrl, '', null, '', defCommandIconStyles, true );

      }
      result = <div
      style={{ background: backgrond }}
      className={[
        styles.pTileItemImageCustom, styles.themeBackground,
        ( this.state.hovering === true  ? this.iHoverZoomStyle : styles.imgHoverZoom )
      ].join(" ")} >
      { thisIcon }
    </div>;

    } else {

      result = <Image 
        className={[
          styles.pTileItemImageCustom, styles.themeBackground,
          ( this.state.hovering === true  ? this.iHoverZoomStyle : styles.imgHoverZoom )
        ].join(" ")} 
        src={this.props.imageUrl} 
        shouldFadeIn={true} 
        imageFit={imageOptionsGroup.getImgFit(this.props.setImgFit)}
        coverStyle={imageOptionsGroup.getImgCover(this.props.setImgCover)}      
      />;

    }

    return result;

  }

  private _updateStateOnPropsChange() {
    this.setState({});
  }
}

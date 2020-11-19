import styles from './PivotTileItem.module.scss';

//Utils Concept from:  https://stackoverflow.com/questions/32790311/how-to-structure-utility-class

export default class StyleUtils {

  public static getTheseStyles(height,width) {

    var tileFit = ["", height, 'by', width].join("");
    var iWrap = styles.pTileItemWrapper;
    var iWrapExp = styles.pTileItemWrapperExpanded;
    var iHovPan = styles.pTileItemHoverPanel;
    var iHovPanExp = styles.pTileItemHoverPanelExpanded;
    var iHovPanNot = styles.pTileItemHoverPanelNotExpanded;
    var iItemImage = styles.pTileItemImage;
    var iTitle = styles.pTileItemTitle;

    if (tileFit === '100by1xy') {
      iWrap = styles.pTileItemWrapper100by1xy;
      iWrapExp = styles.pTileItemWrapperExpanded100by1xy;

    } else if (tileFit === '100by4x1') {
      iWrap = styles.pTileItemWrapper100by4x1;
      iWrapExp = styles.pTileItemWrapperExpanded100by4x1;

    } else if (tileFit === '100by3x1') {
      iWrap = styles.pTileItemWrapper100by3x1;
      iWrapExp = styles.pTileItemWrapperExpanded100by3x1;

    } else if (tileFit === '100by2x1') {
      iWrap = styles.pTileItemWrapper100by2x1;
      iWrapExp = styles.pTileItemWrapperExpanded100by2x1;

    } else if (tileFit === '100by1x1') {
      iWrap = styles.pTileItemWrapper100by1x1;
      iWrapExp = styles.pTileItemWrapperExpanded100by1x1;

    } else if (tileFit === '150by1xy') {
      iWrap = styles.pTileItemWrapper150by1xy;
      iWrapExp = styles.pTileItemWrapperExpanded150by1xy;

    } else if (tileFit === '150by4x1') {
      iWrap = styles.pTileItemWrapper150by4x1;
      iWrapExp = styles.pTileItemWrapperExpanded150by4x1;

    } else if (tileFit === '150by3x1') {
      iWrap = styles.pTileItemWrapper150by3x1;
      iWrapExp = styles.pTileItemWrapperExpanded150by3x1;

    } else if (tileFit === '150by2x1') {
      iWrap = styles.pTileItemWrapper150by2x1;
      iWrapExp = styles.pTileItemWrapperExpanded150by2x1;

    } else if (tileFit === '150by1x1') {
      iWrap = styles.pTileItemWrapper150by1x1;
      iWrapExp = styles.pTileItemWrapperExpanded150by1x1;

    } else if (tileFit === '300by1xy') {
      iWrap = styles.pTileItemWrapper300by1xy;
      iWrapExp = styles.pTileItemWrapperExpanded300by1xy;

    } else if (tileFit === '300by4x1') {
      iWrap = styles.pTileItemWrapper300by4x1;
      iWrapExp = styles.pTileItemWrapperExpanded300by4x1;

    } else if (tileFit === '300by3x1') {
      iWrap = styles.pTileItemWrapper300by3x1;
      iWrapExp = styles.pTileItemWrapperExpanded300by3x1;

    } else if (tileFit === '300by2x1') {
      iWrap = styles.pTileItemWrapper300by2x1;
      iWrapExp = styles.pTileItemWrapperExpanded300by2x1;

    } else if (tileFit === '300by1x1') {
      iWrap = styles.pTileItemWrapper300by1x1;
      iWrapExp = styles.pTileItemWrapperExpanded300by1x1;
    
    }
    


    //Get styles dependant on height only
    if (height === '100') {
        iItemImage = styles.pTileItemImage100;
        iHovPan = styles.pTileItemHoverPanel100;
        iTitle = styles.pTileItemTitle100;
        iHovPanExp = styles.pTileItemHoverPanelExpanded100;
        iHovPanNot = styles.pTileItemHoverPanelNotExpanded100;

    } else if (height === '150') {
        iItemImage = styles.pTileItemImage150;
        iHovPan = styles.pTileItemHoverPanel150;
        iTitle = styles.pTileItemTitle150;
        iHovPanExp = styles.pTileItemHoverPanelExpanded150;
        iHovPanNot = styles.pTileItemHoverPanelNotExpanded150;

    } else if (height === '300') {
        iItemImage = styles.pTileItemImage300;
        iHovPan = styles.pTileItemHoverPanel300;
        iTitle = styles.pTileItemTitle300;
        iHovPanExp = styles.pTileItemHoverPanelExpanded300;
        iHovPanNot = styles.pTileItemHoverPanelNotExpanded300;

    }

    var thisStyle = {
        "iWrap": iWrap,
        "iWrapExp": iWrapExp,
        "iHovPan": iHovPan,
        "iHovPanExp": iHovPanExp,
        "iHovPanNot": iHovPanNot,
        "iItemImage": iItemImage,
        "iTitle": iTitle,
    };

    /*
    console.log("getTheseStyles: tileFit =" + tileFit);
    console.log("getTheseStyles: thisStyle =" + thisStyle);
    console.log(thisStyle);    
    */

    return thisStyle;

  }

  public static getHeroStyles(height,width, heroType) {
    var tileFit = "";
    var iWrap = styles.pTileItemWrapper;
    var iWrapExp = styles.pTileItemWrapperExpanded;
    var iHovPan = styles.pTileItemHoverPanel;
    var iHovPanExp = styles.pTileItemHoverPanelExpanded;
    var iHovPanNot = styles.pTileItemHoverPanelNotExpanded;
    var iItemImage = styles.pTileItemImage;
    var iTitle = styles.pTileItemTitle;


    if (heroType === "header" || heroType === "footer") {
      tileFit = "100by1x1";
      iWrap = styles.pTileItemWrapper100by1x1;
      iWrapExp = styles.pTileItemWrapperExpanded100by1x1;

    } else if (heroType === "inLine" || heroType === "carousel" || heroType === "carouselLayout") {
      tileFit = "300by1x1";
      iWrap = styles.pTileItemWrapper300by1x1;
      iWrapExp = styles.pTileItemWrapperExpanded300by1x1;

    } else if (heroType === "left" || heroType === "right") {
      tileFit = ["300", 'by', width].join("");

    } else {

    }

    if (tileFit === '300by4x1') {
      iWrap = styles.pTileItemWrapper300by4x1;
      iWrapExp = styles.pTileItemWrapperExpanded300by4x1;

    } else if (tileFit === '300by3x1') {
      iWrap = styles.pTileItemWrapper300by3x1;
      iWrapExp = styles.pTileItemWrapperExpanded300by3x1;

    } else if (tileFit === '300by2x1') {
      iWrap = styles.pTileItemWrapper300by2x1;
      iWrapExp = styles.pTileItemWrapperExpanded300by2x1;
    
    }



    //Get styles dependant on height only
    // for header and footer, height = 100 else it's 300
    if (heroType === "header" || heroType === "footer") {
        iItemImage = styles.pTileItemImage100;
        iHovPan = styles.pTileItemHoverPanel100;
        iTitle = styles.pTileItemTitle100;
        iHovPanExp = styles.pTileItemHoverPanelExpanded100;
        iHovPanNot = styles.pTileItemHoverPanelNotExpanded100;

    } else {
        iItemImage = styles.pTileItemImage300;
        iHovPan = styles.pTileItemHoverPanel300;
        iTitle = styles.pTileItemTitle300;
        iHovPanExp = styles.pTileItemHoverPanelExpanded300;
        iHovPanNot = styles.pTileItemHoverPanelNotExpanded300;

    } 

    var heroStyle = {
        "iWrap": iWrap,
        "iWrapExp": iWrapExp,
        "iHovPan": iHovPan,
        "iHovPanExp": iHovPanExp,
        "iHovPanNot": iHovPanNot,
        "iItemImage": iItemImage,
        "iTitle": iTitle,
    };

    return heroStyle;
  }

  public static getOnHoverStyle(scale) {

    var iOnZoomStyle = styles.pTileItemWrapper;

    if ( scale === '1.0' ) {
      iOnZoomStyle = styles.imgHoverZoomHover10;
    } else     if ( scale === '1.1' ) {
      iOnZoomStyle = styles.imgHoverZoomHover11;
    } else     if ( scale === '1.2' ) {
      iOnZoomStyle = styles.imgHoverZoomHover12;
    } else {
      iOnZoomStyle = styles.imgHoverZoomHover10;
    }
    return iOnZoomStyle;  

  }

}
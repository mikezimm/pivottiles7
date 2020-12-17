/***
 *    .d888b.  .d88b.  .d888b.  .d88b.          db .d888b.         db   j88D                     
 *    VP  `8D .8P  88. VP  `8D .8P  88.        o88 VP  `8D        o88  j8~88                     
 *       odD' 88  d'88    odD' 88  d'88         88    odD'         88 j8' 88                     
 *     .88'   88 d' 88  .88'   88 d' 88 C8888D  88  .88'   C8888D  88 V88888D                    
 *    j88.    `88  d8' j88.    `88  d8'         88 j88.            88     88                     
 *    888888D  `Y88P'  888888D  `Y88P'          VP 888888D         VP     VP                     
 *                                                                                               
 *                                                                                               
 *    d8888b. d888888b db    db  .d88b.  d888888b      d888888b d888888b db      d88888b .d8888. 
 *    88  `8D   `88'   88    88 .8P  Y8. `~~88~~'      `~~88~~'   `88'   88      88'     88'  YP 
 *    88oodD'    88    Y8    8P 88    88    88            88       88    88      88ooooo `8bo.   
 *    88~~~      88    `8b  d8' 88    88    88            88       88    88      88~~~~~   `Y8b. 
 *    88        .88.    `8bd8'  `8b  d8'    88            88      .88.   88booo. 88.     db   8D 
 *    88      Y888888P    YP     `Y88P'     YP            YP    Y888888P Y88888P Y88888P `8888Y' 
 *                                                                                               
 *                                                                                               
 */

import * as React from 'react';

import { Image, ImageFit, ImageCoverStyle} from 'office-ui-fabric-react/lib/Image';

import { ColoredLine } from './drawServices';
/**
 * 
 * @param title Title string if required, can contain <above> or <below> anywhere to target location.
 * @param styles Styles should be this limited structure:  { color: 'htmlColor', height: 2 }
 */
export function MyDivider ( title: string, styles: any ) {

  let color = styles.color ? styles.color : 'gray';
  let height = styles.height ? styles.height : 1;

  let dividerElements = [];
  let divider = <div><ColoredLine color={ color } height= { height } /></div>;
  let isAbove = title.toLowerCase().indexOf('<above>') > -1 ? true : false ;
  let isBelow = isAbove === false || title.toLowerCase().indexOf('<below>') > -1 ? true : false ;
  let titleElement = title != '' ? <span style={{ fontSize: 28 }}> { title.replace(/\<above\>/gi,'').replace(/\<below\>/gi,'') } </span> : null;

  if ( isAbove && titleElement != null ) { dividerElements.push( titleElement ); }
  dividerElements.push( divider );
  if ( isBelow && titleElement != null ) { dividerElements.push( titleElement ); }

  let thisDivider = <div style={{ width: '100%'}}> { dividerElements.map( e => { return e; }) }</div>;

  return thisDivider;

}

export type IMyTextElementTypes = 'h1'  | 'h2' |  'h3' | 'p' | 'span';

export function MyText ( type:  IMyTextElementTypes , title: string, styles? : any ) {

  let myStyles = {};

  if ( styles && typeof styles === 'string' ) {
    try {
      myStyles = JSON.parse( styles );
    } catch (e) {
      alert('Unable to parse JSON styles in MyText\n' + styles );
    }
   } else if ( styles ) {
    myStyles = styles;
   }

  if ( type === 'h1' ) { return <h1 style={ myStyles }> { title } </h1> ; }
  if ( type === 'h2' ) { return <h2 style={ myStyles }> { title } </h2> ; }
  if ( type === 'h3' ) { return <h3 style={ myStyles }> { title } </h3> ; }
  if ( type === 'p' ) { return <p style={ myStyles }> { title } </p> ; }
  if ( type === 'span' ) { return <span style={ myStyles }> { title } </span> ; }

  alert('If you are seeing this, there is a problem creating element:  "MyText" \n' + title );
  return null;
}
/**
 * 
 * @param title 
 * @param src 
 * @param styles usable styles
 * styles = {
 *  padding: 20,                          // padding is around entire image
 *  ImageFit:  0 | 1 | 2 | 3 | 4 | 5,     // These would be the ImageFit types
 *  ImageCoverStyle: 0 | 1,               // These would be the ImageCoverStyle types (landscape and portrait)
 *  height: 20,
 *  width: 20,
 *  
 * }
 */
export function MyImage ( title: string, src: string, styles?: any, href?: any) {

  let thisImage = null;
    thisImage = <div style={{ 
      padding: styles.padding ? styles.padding : null,  
      width: styles.width ? styles.width : null,
      height: styles.height ? styles.height : null,
    
    }}><a href={ href } target= { '_blank'}>
      <Image 
      title={ title }
      src={ src } 
      shouldFadeIn={true} 
      imageFit={ styles.ImageFit ? styles.ImageFit : ImageFit.centerContain }
      coverStyle={ styles.ImageCoverStyle ? styles.ImageCoverStyle : ImageCoverStyle.landscape }      
      width={ styles.width ? styles.width : null } height={ styles.height ? styles.height : null }
    /></a>
    </div>;

  return thisImage;
}

export function convertTextToListItems ( value: string, delim: string, leftPad: number, type: 'ul' | 'ol', otherSettings = null ) {

    let result : any = value;
  
    if ( value !== null && value !== undefined && value.length > 0 ) {
      let lines = value.split(delim);
      if ( lines.length > 0  ) {
        result = lines.map( line => { return <li style={{paddingLeft:0}}>{ line }</li>; } );
        if (type==='ul') {
          result = <div style={{padding: 0}}><ul style={{paddingLeft: leftPad, margin: 0 }}>{ result } </ul></div>;
        } else if ( type === 'ol' ) {
          result = <div style={{padding: 0}}><ol style={{paddingLeft: leftPad, margin: 0 }}>{ result } </ol></div>;
        }
      }
    }
  
    return result;
  
  }

  export function findParentElementPropLikeThis( e: any, prop: string, value: string, maxHops: number, search: 'begins' | 'ends' | 'contains' | 'exact' ) {

    let result : any = null;
    let checkElement: any = e['parentElement'];
    let found = false;


    for (let i = 0; i < maxHops ; i++) {

      if ( found === false ) {

        if ( checkElement[prop] ) {
          
          console.log('findParentElementPropLikeThis -- ' + i , checkElement[prop] );

          let parentProp = checkElement[prop];

          if ( parentProp ) {

            if ( search === 'begins' ) {
              if ( checkElement[prop].indexOf(value) === 0  ) { result = checkElement[prop]; found = true; }

            } else if ( search === 'ends' ) {
              alert('findParentElementPropLikeThis:  Error - feature not yet avaialble!');

            } else if ( search === 'contains' ) {
              if ( checkElement[prop].indexOf(value) > -1  ) { result = checkElement[prop]; found = true; }

            } else if ( search === 'exact' ) {
              if ( checkElement[prop] === value  ) { result = checkElement[prop]; found = true; }

            }

          }

        }

        if ( found === false ) { checkElement = checkElement['parentElement'] ; }

      }

    }

    if ( found === false ) {
      alert('findParentElementPropLikeThis:  Could not find parent element - see console.');
      console.log('findParentElementPropLikeThis: Did not find: prop', prop, );
      console.log('findParentElementPropLikeThis: Did not find: value', value );
      console.log('findParentElementPropLikeThis: Did not find: maxHops', maxHops );
      console.log('findParentElementPropLikeThis: Did not find: search', search );
    }

  return result;

  }
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

    export function buildMLineDiv ( indent: number, element: string | JSX.Element ) {
        let spaces4 = indent > 0 ? '\u00a0' + '\u00a0' + '\u00a0' + '\u00a0' : null;
        let spaces = '';

        if ( indent >= 1 ) { spaces += spaces4; }
        if ( indent >= 2 ) { spaces += spaces4; }
        if ( indent >= 3 ) { spaces += spaces4; }
        if ( indent >= 4 ) { spaces += spaces4; }
        if ( indent >= 5 ) { spaces += spaces4; }

        let newDiv = <div> 
            { spaces }
            { element }
        </div>;
        return newDiv;

    }

    export function getArrayOfXMLElements ( thisXMLString ) {

      console.log( 'getWebXML thisXMLString:', thisXMLString );

      let sample = thisXMLString ;
      let xmlArray = [];

      let regex = /[\"] [A-Z]/g;

      do {
        let loc = sample.search(regex);
        if (xmlArray.length === 0 ) {
          //Do this to split the xml tag out
          let firstSlice = sample.slice(0, loc + 1 );
          let loc2 = firstSlice.indexOf(' ');
          let tag = firstSlice.slice(0, loc2 );
          let prop = firstSlice.slice(loc2 + 1 );
          xmlArray.push( this.buildMLineDiv(0,tag) );
          xmlArray.push( this.buildMLineDiv(2,prop) );

        } else {
          xmlArray.push( this.buildMLineDiv(2, sample.slice(0, loc + 1 ) ) );

        }

        sample = sample.slice( loc + 2 );

      } while ( sample.search(regex) > 0 );

      xmlArray.push( this.buildMLineDiv(2, sample ) );

      console.log( 'getWebXML:', sample, xmlArray);

      /*
      let x = sample.search(regex);

      function testMe(str, index, replacement) {
          return str.substr(0, index + 1) + replacement + str.substr(index + 2);
      }

      let newV = testMe(sample,x,'---');

      console.log(newV);
      */

      return xmlArray;

    }
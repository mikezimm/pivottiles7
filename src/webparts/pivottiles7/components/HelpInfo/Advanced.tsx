import * as React from 'react';

import { Link, ILinkProps } from 'office-ui-fabric-react';

import * as links from './AllLinks';   //              { links.gitRepoTrackMyTime.issues }

import { CompoundButton, Stack, IStackTokens, elementContains } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

import styles from './InfoPane.module.scss';

export interface IAdvancedProps {
    showInfo: boolean;
    allLoaded: boolean;

}

export interface IAdvancedState {
    selectedChoice: string;
    lastChoice: string;
}

export default class Advanced extends React.Component<IAdvancedProps, IAdvancedState> {


/***
 *          .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
 *         d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
 *         8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
 *         8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
 *         Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
 *          `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
 *                                                                                                       
 *                                                                                                       
 */

public constructor(props:IAdvancedProps){
    super(props);
    this.state = { 
        selectedChoice: 'snapShot',
        lastChoice: '',

    };

    // because our event handler needs access to the component, bind 
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    // this.onLinkClick = this.onLinkClick.bind(this);

    
  }


  public componentDidMount() {
    
  }


  /***
 *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
 *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
 *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
 *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
 *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
 *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
 *                                                                                         
 *                                                                                         
 */

  public componentDidUpdate(prevProps){

    let rebuildTiles = false;
    /*
    if (rebuildTiles === true) {
      this._updateStateOnPropsChange({});
    }
    */

  }

/***
 *         d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *         88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *         88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *         88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *         88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *         88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                          
 *                                                          
 */

    public render(): React.ReactElement<IAdvancedProps> {

        if ( this.props.allLoaded && this.props.showInfo ) {
            console.log('infoPages.tsx', this.props, this.state);

/***
 *              d888888b db   db d888888b .d8888.      d8888b.  .d8b.   d888b  d88888b 
 *              `~~88~~' 88   88   `88'   88'  YP      88  `8D d8' `8b 88' Y8b 88'     
 *                 88    88ooo88    88    `8bo.        88oodD' 88ooo88 88      88ooooo 
 *                 88    88~~~88    88      `Y8b.      88~~~   88~~~88 88  ooo 88~~~~~ 
 *                 88    88   88   .88.   db   8D      88      88   88 88. ~8~ 88.     
 *                 YP    YP   YP Y888888P `8888Y'      88      YP   YP  Y888P  Y88888P 
 *                                                                                     
 *                                                                                     
 */

            let messageRows = [];

            messageRows.push( <tr><td>CTRL-Click on <b>Search Box</b></td><td><mark>Word1;Word2;Word3</mark></td><td>Type <b>; separated Keywords</b> and <b>ENTER</b> rebuild Tile Categories</td></tr> );
            messageRows.push( <tr><td>Search Box SHOULD turn <mark>Yellow</mark></td><td><mark>reset</mark></td><td>Type <b>'reset'</b> and <b>Enter</b> to reset Tile Categories</td></tr> );

            /*
            //Commented these out because they no longer work at least as of v1.2.2.3... 
            //I think it stopped working when I added custom categories.
            //See around line 703 in BildTileCollection
            messageRows.push( <tr><td></td><td><mark>modified</mark></td><td>Type <b>'modified'</b> and <b>Enter</b> to group in labels</td></tr> );
            messageRows.push( <tr><td></td><td><mark>modified&lt;</mark></td><td>Type <b>'modified&lt;'</b> and <b>Enter</b> to group in recent buckets</td></tr> );

            messageRows.push( <tr><td></td><td><mark>created</mark></td><td>Type <b>'created'</b> and <b>Enter</b> to group in labels</td></tr> );
            messageRows.push( <tr><td></td><td><mark>created&lt;</mark></td><td>Type <b>'created&lt;'</b> and <b>Enter</b> to group in recent buckets</td></tr> );
            */
            //

            let customCatWiki = <a href="https://github.com/mikezimm/pivottiles7/wiki/Custom-Category---basic" target="_blank">Github Wiki</a>;

            messageRows.push( <tr><td>Custom Categories</td><td></td><td>See { customCatWiki } for examples</td></tr> );


            messageRows.push( <tr><td>Fabric UI {links.devDocsIcon}</td><td></td><td>Set your ImageUrl column value to a valid Fabric UI Icon name - {links.devDocsIcon}</td></tr> );
            messageRows.push( <tr><td>Valid Icon Examples</td><td></td><td>Cat Auto Edit etc.... must be exact leter casing.</td></tr> );
            messageRows.push( <tr><td>Colored Icons</td><td></td><td>Set Icon colors in your designated Color column.  Example:  font=green;background=yellow</td></tr> );

            messageRows.push( <tr><td>Adjust Size and Top of Icon</td><td></td><td>Set Icon size(% tile height)/top in your designated Color column.  Example:  size=50;top=-20px</td></tr> );           
            messageRows.push( <tr><td></td><td></td><td>If you can't see correct styles, be sure all values are separated by ; and have =</td></tr> );   
            messageRows.push( <tr><td>Full example of Icon styles</td><td></td><td>background=black;font=hotpink;size=50;top=-20px</td></tr> );   
            let thisPage = <div>
                <h2></h2>
                <table className={styles.infoTable} style={{ width: '100%' }}>
                    <tr><th>Info</th><th>Example</th><th>Details</th></tr>
                    { messageRows }
                </table>
            </div>;

/***
 *              d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *              88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *              88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *              88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
 *              88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *              88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *                                                                 
 *                                                                 
 */

            return (
                <div className={ styles.infoPane }>
                    { thisPage }
                </div>
            );
            
        } else {
            console.log('infoPages.tsx return null');
            return ( null );
        }

    }   //End Public Render



}
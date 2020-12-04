import * as React from 'react';

import { Link, ILinkProps } from 'office-ui-fabric-react';

import * as links from './AllLinks';   //              { links.gitRepoTrackMyTime.issues }

import { CompoundButton, Stack, IStackTokens, elementContains } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

import styles from './InfoPane.module.scss';

export interface IErrorsProps {
    showInfo: boolean;
    allLoaded: boolean;

}

export interface IErrorsState {
    selectedChoice: string;
    lastChoice: string;
}

export default class Errors extends React.Component<IErrorsProps, IErrorsState> {


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

public constructor(props:IErrorsProps){
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

    public render(): React.ReactElement<IErrorsProps> {

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

            let thisPage = null;
            let messageRows = [];

            //let underScoreIssue = JSON.parse( JSON.stringify(links.gitRepoPivotTiles.issuesLink).replace(/issueNumber/g, '30') );
            let underScoreIssue = <a href="https://github.com/mikezimm/Pivot-Tiles/issues/29" target="_blank">Issue #29</a>;

            messageRows.push( <tr><td>Do not add _UnderScore to Default Tab</td><td> { underScoreIssue } </td><td>Webpart does not display correctly with Microsoft Forms or Pictures below it</td></tr> );
            messageRows.push( <tr><td>Tiles show up in only 1 Category</td><td></td><td>Check if Custom Categories property pane Toggle on</td></tr> );
            messageRows.push( <tr><td>Custom <b>JSON Logic</b> does not work</td><td></td><td><b>Test your JSON Object in JSON Beautifier</b> first</td></tr> );
            messageRows.push( <tr><td><b>Common</b> errors</td><td></td><td><b>Missing comma</b> after an attribute</td></tr> );
            messageRows.push( <tr><td><b>Regex</b> errors</td><td></td><td>Be sure to <b>escape characters</b>.... ie "regex": "\\bTMT\\b"</td></tr> );
            messageRows.push( <tr><td><b>eval</b> errors</td><td></td><td>eval is not <b>correct syntax</b>.  Only object references at that point in code work.</td></tr> );

            messageRows.push( <tr><td><b>Title/Desc contains</b> filter not working</td><td></td><td>This is case sensitive filter.  If you use both Title and Desc, both filters must be true to be visible.</td></tr> );
            messageRows.push( <tr><td><b>Gap in Pivots</b></td><td></td><td>If you are using semicolon separated categories but have not custom logic, you may see a blank tab.</td></tr> );
            messageRows.push( <tr><td><b>Gap in Pivots</b></td><td></td><td>In order to add a blank tile for a wider gap inbetween tiles, you need to add an extra semicolon inbetween your custom categories. Example of no blank tile categories: word;word2;word3.  Example of blank tile categories: word;;word2;word3. Between "word" and "word2" tiles there will be a blank tile due to the extra semicolon added.</td></tr> );
            thisPage = <div>
                <h2></h2>
                <table className={styles.infoTable} style={{ width: '100%' }}>
                    <tr><th style={{ minWidth: '200px' }}>Issue</th><th>Links</th><th>Notes</th></tr>
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
import * as React from 'react';

import * as links from './AllLinks';

import { Link, ILinkProps } from 'office-ui-fabric-react';
import { CompoundButton, Stack, IStackTokens, elementContains } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

import WebPartLinks from './WebPartLinks';
import { IWebPartLinksProps, IWebPartLinksState } from './WebPartLinks';

import styles from './InfoPane.module.scss';

export interface IInfoAboutMeProps {
    showInfo: boolean;
    allLoaded: boolean;
    parentListURL: string;
    parentListName: string;

}

export interface IInfoAboutMeState {
    selectedChoice: string;
    lastChoice: string;
}

export default class InfoAboutMe extends React.Component<IInfoAboutMeProps, IInfoAboutMeState> {


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

public constructor(props:IInfoAboutMeProps){
    super(props);
    this.state = { 
        selectedChoice: 'About',
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

    public render(): React.ReactElement<IInfoAboutMeProps> {

        if ( this.props.allLoaded && this.props.showInfo ) {
            console.log('About.tsx', this.props, this.state);

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
            
            const stackTokensBody: IStackTokens = { childrenGap: 20 };

            let thisPage = null;

            let underScoreIssue = <a href="https://github.com/mikezimm/Pivot-Tiles/issues/30" target="_blank">Issue #30</a>;
            
            let noWrap : React.CSSProperties = { whiteSpace: 'nowrap' };

            thisPage = <div>
                <WebPartLinks
                    parentListURL={ this.props.parentListURL }
                    parentListName={ this.props.parentListName }

                ></WebPartLinks>

                <h2>Version History</h2>
                {/* 3 files to update version number:  package-solution.json, package-lock.json, package.json*/}
                <table className={styles.infoTable} style={{ width: '100%' }}>
                    <tr><th>Date</th><th>Version</th><th>Focus</th><th>Notes</th></tr>
                    <tr><td style={ noWrap }>2020-12-11</td><td>{'1.2.2.9'}</td><td>Add Site Admins tab in Groups</td></tr>
                    <tr><td style={ noWrap }>2020-12-10</td><td>{'1.2.2.6'}</td><td>Fix Subsites for visitors crash</td></tr>
                    <tr><td style={ noWrap }>2020-12-04</td><td>{'1.2.2.5'}</td><td>Fix fetch users in groups with OnlyAllowMembersViewMembership === true crash, pushMissingDefaultsThatCauseIssues</td></tr>
                    <tr><td style={ noWrap }>2020-12-04</td><td>{'1.2.2.4'}</td><td>Add quick-sort button, remove support for 'modified' type quick custom categories</td></tr>
                    <tr><td style={ noWrap }>2020-12-03</td><td>{'1.2.2.3'}</td><td>Auto add Associated Groups to settings when opening property pane, complex group styles and options</td></tr>
                    <tr><td style={ noWrap }>2020-12-02</td><td>{'1.2.2.2'}</td><td>Small bug fixes with groups, categories, properties</td></tr>
                    <tr><td style={ noWrap }>2020-12-01</td><td>{'1.2.2.1'}</td><td>Add CTRL-Click Group Name to add members, improve GroupInfo, Allow "Hub" as hubCategory</td></tr>
                    <tr><td style={ noWrap }>2020-11-24</td><td>{'1.2.2.0'}</td><td>Add Hubsites and Groups tabs</td></tr>
                    <tr><td style={ noWrap }>2020-11-19</td><td>{'1.2.1.0'}</td><td>Add filtering based on the Title/Description properties</td></tr>
                    <tr><td style={ noWrap }>2020-11-19</td><td>{'1.2.0.0'}</td><td>Complete Rebuild of solution to PivotTiles7</td></tr>

                    <tr><td style={ noWrap }>2020-11-17</td><td>{'1.1.3.1'}</td><td>Use Fabric {links.devDocsIcon} as Tiles</td><td>{links.devDocsIcon}</td></tr>
                    <tr><td style={ noWrap }>2020-11-16</td><td>{'1.1.3.0'}</td><td>Add option to show Subsites as tiles</td><td>{ underScoreIssue }</td></tr>
                    <tr><td style={ noWrap }>2020-10-23</td><td>{'1.1.2.0'}</td><td>Custom Categories with _UnderScore , List and Doc Card view updates</td><td>{ underScoreIssue }</td></tr>
                    <tr><td style={ noWrap }>2020-10-20</td><td>{'1.1.1.4'}</td><td>Add special custom Categories:  created, modified</td><td></td></tr>
                    <tr><td style={ noWrap }>2020-10-20</td><td>{'1.1.1.3'}</td><td>For Dynamic Categories, Tabs now in same order as you type in.</td><td>Pad Title, Desc in hover pane</td></tr>
                    <tr><td style={ noWrap }>2020-10-19</td><td>{'1.1.1.2'}</td><td>Add Basics Info, Dynamic Categoris (CTRL-Click Search box)</td><td></td></tr>
                    <tr><td style={ noWrap }>2020-10-19</td><td>{'1.1.1.1'}</td><td>Fix Custom Category when missing catergory column</td><td></td></tr>
                    <tr><td style={ noWrap }>2020-10-14</td><td>{'1.1.1.0'}</td><td>Add Early Access, Custom Category Logic</td><td></td></tr>
                    <tr><td style={ noWrap }>2020-10-14</td><td>{'1.1.0.2'}</td><td>Add Site News BannerImageUrl.Url for Image</td><td></td></tr>

                </table>
            </div>;

/*
                    <tr><td>2020-09-14</td><td>{'1.x.x.x'}</td><td></td><td></td></tr>
                    <tr><td>2020-09-14</td><td>{'1.x.x.x'}</td><td></td><td></td></tr>
*/

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

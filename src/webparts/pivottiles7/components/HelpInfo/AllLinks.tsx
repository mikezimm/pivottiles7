import * as React from 'react';

import { Link, ILinkProps } from 'office-ui-fabric-react';


export const baseDevDocs = 'https://developer.microsoft.com/en-us/fabric#/controls/web/';

/**
 *  Fabric UI Controls on DevDocs
 */

export const devDocsWeb = createLink( baseDevDocs,'_blank', 'Fabric UI' );
export const devDocsButton = createLink( baseDevDocs + 'button','_blank', 'Button' );
export const devDocsStack = createLink( baseDevDocs + 'stack','_blank', 'Stack' );
export const devDocsSlider = createLink( baseDevDocs + 'slider','_blank', 'Slider' );
export const devDocsToggle = createLink( baseDevDocs + 'toggle','_blank', 'Toggle' );
export const devDocsChoice = createLink( baseDevDocs + 'choicegroup','_blank', 'Choice' );
export const devDocsList = createLink( baseDevDocs + 'detailslist','_blank', 'List' );
export const devDocsDate = createLink( baseDevDocs + 'datepicker','_blank', 'DatePicker' );
export const devDocsPivo = createLink( baseDevDocs + 'pivot','_blank', 'Pivot' );
export const devDocsText = createLink( baseDevDocs + 'textfield','_blank', 'TextField' );
export const devDocsLink = createLink( baseDevDocs + 'link','_blank', 'Link' );
export const devDocsIcon = createLink( 'https://developer.microsoft.com/en-us/fabric#/styles/web/icons#available-icons','_blank', 'Icons' );

export const devDocsReGr = createLink( baseDevDocs + 'resizegroup','_blank', 'ResizeGroup' );

export const chartJSSamples = createLink( 'https://www.chartjs.org/samples/latest/','_blank', 'Chart.js samples' );
export const chartJSDocs = createLink( 'https://www.chartjs.org/docs/latest/','_blank', 'Chart.js Docs' );
export const chartJSLine = createLink( 'https://www.chartjs.org/docs/latest/charts/line.html','_blank', 'Chart.js Line' );
export const chartJSArea = createLink( 'https://www.chartjs.org/docs/latest/charts/area.html','_blank', 'Chart.js Area' );
export const chartJSDonut = createLink( 'https://www.chartjs.org/docs/latest/charts/doughnut.html','_blank', 'Chart.js Donut' );
export const chartJSBar = createLink( 'https://www.chartjs.org/docs/latest/charts/bar.html','_blank', 'Chart.js Donut' );




/**
 *  Github Repos
 */
export const baseGitContReact = 'https://github.com/SharePoint/sp-dev-fx-controls-react/';
export const gitRepoSPFxContReact = createLink( baseGitContReact,'_blank', 'controls-react' );
export const devDocsPnpJSsp = createLink( 'https://pnp.github.io/pnpjs/sp/','_blank', 'PnpJS' );
export const gitRepoPnpJSsp = createLink( 'https://github.com/pnp/pnpjs/','_blank', '@PnpJS' );


/**
 *  My repos
 */
export const baseMyRepos = 'https://github.com/mikezimm/';
export const gitRepoTrackMyTime = createRepoLinks( baseMyRepos + 'TrackMyTime7', '_blank', 'TrackMyTime7' );
export const gitRepoPivotTiles = createRepoLinks( baseMyRepos + 'Pivottiles7','_blank', 'Pivot-Tiles-7' );
export const gitRepoSocialiis = createRepoLinks( baseMyRepos + 'Social-iis-7','_blank', 'Social-iis-7' );
export const gitRepoInfoIisWebpart = createRepoLinks( baseMyRepos + 'InfoIis','_blank', 'Info-iis' );
export const gitRepoGenericWebpart = createRepoLinks( baseMyRepos + 'generic-solution','_blank', 'GenericWebPart' );

export const gitRepoDrilldown7WebPart = createRepoLinks( baseMyRepos + 'drilldown7','_blank', 'DrillDown' );


/**
 * Track My Time links
 */

export const gitTMTActivityTypeWiki = createLink( baseMyRepos + 'TrackMyTime7/wiki/ActivityURL%5E-calculated-column-example' , '_blank', 'ActivityType examples' );
export const gitTMTActivityURLWiki = createLink( baseMyRepos + 'TrackMyTime7/wiki/ActivityURL%5E-calculated-column-example' , '_blank', 'ActivityURL^ Formula examples' );
export const gitTMTOptionsWiki = createLink( baseMyRepos + 'TrackMyTime7/wiki/Options%5E-calculated-column-example' , '_blank', 'Options^ Formula examples' );


/**
 * Info-iis links
 */



/**
 *  Github Samples
 */

export const baseGetSPFxContReactSrc = 'https://github.com/SharePoint/sp-dev-fx-controls-react/tree/master/src/controls/';
//let gitHubButton = createLink( baseDevDocs + 'stack','_blank', 'Stack' );
//let gitHubSlider = createLink( baseDevDocs + 'slider','_blank', 'Slider' );
//let gitHubToggle = createLink( baseDevDocs + 'toggle','_blank', 'Toggle' );
//let gitHubChoice = createLink( baseDevDocs + 'choicegroup','_blank', 'Choice' );
export const gitSampleReactList = createLink( baseGetSPFxContReactSrc + 'listView','_blank', 'List View' );
export const gitSampleReactDate = createLink( baseGetSPFxContReactSrc + 'dateTimePicker','_blank', 'Date-Time' );


/**
 *  Blogs
 */
export const blogSPTimeZone = createLink( 'https://sharepointmaven.com/sharepoint-time-zone/','_blank', 'Set your SharePoint Time-Zone' );

export function createRepoLinks(href: string, target: string, linkDesc: string){
    return {
        repo: createLink( href, target, linkDesc + ' on Github' ),
        issues: createLink( href + '/issues', target, linkDesc + " Issues" ),
        wiki: createLink( href + '/wiki', target, linkDesc + " Wiki" ),
        href: href,
        target: target,
        desc: linkDesc,
        issuesLink: createLink( href + '/issues/issueNumber', target, linkDesc + " Issues issueNumber" ),
        wikiLink: createLink( href + '/wiki/wikiName', target, linkDesc + " Wiki wikiName" ),
    };
}

export function createLink(href: string, target: string, linkDesc: string){
    return (
        <Link href={href} target={ target }>{ linkDesc }</Link>
    );
}
import {  } from '@microsoft/sp-webpart-base';

import * as React from 'react';
import styles from './PivotTiles.module.scss';
import { Link } from 'office-ui-fabric-react/lib/Link';

import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

//export default class NoListFound extends React.Component<IPivotTilesProps, IPivotTilesState> {


  import { fixURLs } from './UtilsNew';
  

export function buildTips(parentProps,parentState){

  let theseTips = null;

  if ( parentState.showTips !== 'yes' ) {

  } else {

    
    const currentPageUrl = parentProps.pageContext.web.absoluteUrl + parentProps.pageContext.site.serverRequestPath;
    const fixedURL = fixURLs(parentProps.listWebURL, parentProps.pageContext);
    const listExt = parentProps.listDefinition.indexOf("Library") === -1 ? "lists/" : "" ;
    const listURL = fixedURL + listExt + parentState.listStaticName;
    const newItemURL = listURL + (listExt === "" ? "" : "/newform.aspx") + "?Source=" + currentPageUrl;
    
    let delta : any;
    let statsMessage : string = 'Could not determine load time.';
    let startTime = parentProps.startTime;

    if (parentState.endTime) {
      let endTime = parentState.endTime;
      delta = endTime.now - startTime.now;
      statsMessage = parentState.allTiles.length.toString() + ' items found in ' + delta + ' milliseconds ';
    }
   
  //          <div className={(parentProps.showHero === true && parentProps.heroType !== "none" && parentState.heroStatus === "none") ? styles.showErrorMessageNoPad : styles.hideMe }>
  
  
    theseTips = 
    <div className={styles.rowNoPad}>
        <div className={parentState.showTips === "yes" ? styles.showErrorMessage : styles.hideMe } >
  
            <div style={{backgroundColor: '#ffc0b9', width: '100%', padding: 20 }} className={(parentState.heroCategoryError) ? styles.showErrorMessageNoPad : styles.hideMe }>
              <h3>There may be a problem with your webpart settings for <mark>Hero Category</mark></h3>
              <p>Property pane setting for Hero Type is: <mark><b>{parentProps.heroType }</b></mark></p>
              <p>Property pane setting for Hero Category is:  <mark><b>{parentProps.heroCategory !== "" ?parentProps.heroCategory : "<It's Empty>"}</b></mark></p>
              <p>I can't seem to find any tiles in that category....</p>
              <p>Double check by verifying the spelling and then refreshing the page. If all is good this message will go away.</p>
              <p></p>
            </div>
  
            <h3>{statsMessage} from list called: {parentProps.listTitle}</h3>
            <p><Link href={listURL} 
                target="_blank">
                {listURL}
              </Link></p>
            <h3>To edit a specific tile that is visible</h3>
            <b>CTRL-ALT-SHFT-Click</b> on the tile to go directly to it.
            <h3>To create a new tile:</h3>
            <p><Link href={newItemURL} 
                target="">
                Click Me to add a new Tile!
              </Link></p>
            <h3>If the webpart loads, but you are missing something (like Title or Images)</h3>
            <p>Check to make sure your columns are based on Static Names in the web part properties.</p>
            <p></p>
  
        </div>
    </div>;
  }

  return theseTips;

}


export function LoadingSpinner(parentState){
  const loadingSpinner = 
  <div className={styles.rowNoPad}>
  <div className={parentState.loadStatus === "Loading" ? styles.showErrorMessage : styles.hideMe }>
    <Spinner size={SpinnerSize.small} />
  </div>
  </div>;

  return loadingSpinner;
}

export function NoListFound (parentProps,parentState) {
//  console.log('NoListFound');
//  console.log(parentProps);
  let noListFound = null;

  if ( parentState.loadStatus !== "ListNotFound" ) {

  } else {

    const fixedURL = fixURLs(parentProps.listWebURL, parentProps.pageContext);

    const errMessage = SanitizeErrorMessage(parentState.loadError);

    const listExt = parentProps.listDefinition.indexOf("Library") === -1 ? "lists/" : "" ;

    noListFound = 
    <div className={styles.rowNoPad}>
      <div className={parentState.loadStatus === "ListNotFound" ? styles.showErrorMessage : styles.hideMe }>
          <h1>We had a problem getting your data: {parentProps.listTitle}</h1>
          {errMessage}
          Check your site contents for list:  <Link href={fixedURL + "_layouts/15/viewlsts.aspx"} target="_blank">{fixedURL}</Link>

          <h2>Other common causes for this message</h2>
          <h3>You do not have a Tile Category set for a visible tile:</h3>
          <p><Link href={fixedURL + listExt + parentProps.listTitle} 
              target="_blank">
              {fixedURL + listExt + parentProps.listTitle}
            </Link></p>
          <h3>You do not have permissions to the list :(</h3>
          <p>Please contact your site admin for assistance!</p>
      </div>
    </div>;

  }

  return noListFound;

}

export function NoItemsFound (parentProps,parentState) {
//  console.log('NoListFound');
//  console.log(parentProps);

let noItemsFound = null;

if ( parentState.loadStatus !== "ListNotFound" ) {

} else {

    const fixedURL = fixURLs(parentProps.listWebURL, parentProps.pageContext);

    const errMessage = SanitizeErrorMessage(parentState.loadError);
    
    const listExt = parentProps.listDefinition.indexOf("Library") === -1 ? "lists/" : "" ;

    noItemsFound = 
    <div className={styles.rowNoPad}>
      <div className={parentState.loadStatus === "NoItemsFound" ? styles.showErrorMessage : styles.hideMe }>
        <p>{parentState.loadError}</p>
        <h1>No items were found in your tile list: {parentProps.listTitle}</h1>
        {errMessage}
        <p>This is the filter we are using: <b>{parentProps.setFilter}</b></p>
        <p>Looking here:</p>
        <p><Link href={fixedURL + listExt + parentProps.listTitle} 
            target="_blank">
            {fixedURL + listExt + parentProps.listTitle}
          </Link></p>
        <p>You can also get this message if you do not have permissions to the list.</p>
      </div>
    </div>;
  }
  
  return noItemsFound;
}

export function SanitizeErrorMessage(errIn) {

  let err = JSON.stringify(errIn);
  if (errIn === "") {
    return "";
  }

  let errType = "";
  if (err.indexOf("[400]") > 0 ) {
    errType = "[400] Bad Request?";

  } else if  (err.indexOf("[403]") > 0 ) {
    errType = "[403] Insufficient Permissions?";

  } else if  (err.indexOf("[500]") > 0 ) {
    errType = "[500] Internal Server Error?";

  } else if  (err.indexOf("[503]") > 0 ) {
    errType = "[503] Server Busy?";

  } 

  let messStart = err.indexOf('message');
  let errValue = "";
  if (messStart > 0 ) {
    let valueStart = err.indexOf('value',messStart);
    if (err.indexOf('value',valueStart) > 0 ) {
      errValue = err.slice(valueStart + 9, valueStart + 1000);
      errValue = errValue.replace(/[}]/g,'').replace(/[\/]/g,'').replace(/[\"\\]/g,'');
    } else {
      errValue = err;
    }
  }

  const thisError = 
    <div>
      <h2>{errType}</h2>
      <p><mark>{errValue}</mark></p>
      <p></p>
    </div>;

    return thisError;

}
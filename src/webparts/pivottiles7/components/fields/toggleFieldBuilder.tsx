import * as React from 'react';

import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { Stack, IStackTokens, Alignment } from 'office-ui-fabric-react/lib/Stack';

export interface IToggleItem {
    label?: any;
    key: string;
    _onChange: any;
    checked: boolean;
    onText: string;
    offText: string;
    className?: any;
    styles?: any;
}
export interface IContentsToggles {
    toggles: IToggleItem[];
    className?: any;
    style?: any;
    rootStyle?: any; //default style for each toggle like root: { width: 160, paddingTop: makeTheseToggles.togPadTop, paddingLeft: 20, }
    vertical: boolean;
    vAlign: Alignment;
    hAlign: Alignment;
    childGap: number;

}

export function makeToggles( makeTheseToggles: IContentsToggles ){

    if ( makeTheseToggles.toggles.length === 0 ) {
        return null;
    } else {
        
        let defStyles = makeTheseToggles.rootStyle ? { root:  makeTheseToggles.rootStyle }:
            { root: { width: 160, } };

        let toggleResult = makeTheseToggles.toggles.map( toggle => {
    
            //  Basically, if you leave it as '', you will get the default:  either 'On' or 'Off'
            //  If you pass in '-', it will be blank
            //  Else it will be the value

            let onText = toggle.onText != '' ? toggle.onText != '-' ? toggle.onText : '' : 'On';
            let offText = toggle.offText != '' ? toggle.offText != '-' ? toggle.offText : '' : 'Off';

            let thisToggle = <Toggle label={ toggle.label ? toggle.label : '' } 
                onText={ onText } 
                offText={ offText } 
                onChange={ toggle._onChange } 
                checked={ toggle.checked }
                styles={ toggle.styles ? toggle.styles : defStyles }
            />;
            return thisToggle;
        });

        if ( toggleResult.length === 1 ) {
            return toggleResult[0];

        } else {
            const stackButtonTokensBody: IStackTokens = { childrenGap: makeTheseToggles.childGap };
            return <Stack padding={ 0 } horizontal={ !makeTheseToggles.vertical } horizontalAlign={ makeTheseToggles.hAlign} verticalAlign={ makeTheseToggles.vAlign} tokens={stackButtonTokensBody}> {/* Stack for Projects and body */}
                { toggleResult }
            </Stack>;

        }
    }


  }
  
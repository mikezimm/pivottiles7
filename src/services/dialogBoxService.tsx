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

import { Dialog, DialogType, DialogFooter, IDialogProps,  } 	from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton, Button, ButtonType, } 			from 'office-ui-fabric-react/lib/Button';
import { Label } 			from 'office-ui-fabric-react/lib/Label';

import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export interface IMyDialogProps {
    title: string;
    dialogMessage: string;
    showDialog: boolean;
    confirmButton: string;
    _confirmDialog: any;
    _closeDialog: any;
}

export function buildConfirmDialog ( thisDialog : IMyDialogProps ) {

    //let highlightKeys = ["Title","Email","IsSiteAdmin","LoginName", "Id"];
    //let specialKeys = highlightKeys.concat("meta","searchString");

    const iconClassInfo = mergeStyles({
        fontSize: 18,
        margin: '5px',
        verticalAlign: 'bottom',
        padding: '0px !important',
      });

    let iconStyles: any = { root: {
        //color: h.color ? h.color : "blue",
      }};

    let buildDialog = <div>
          <Dialog
            hidden={!thisDialog.showDialog}
            type={DialogType.normal}
            onDismiss={thisDialog._closeDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: thisDialog.title,
              subText: thisDialog.dialogMessage
            }}
            modalProps={{
              isBlocking: true,
              containerClassName: 'ms-dialogMainOverride'
            }} >
            <DialogFooter>
              <div style={{ marginBottom: 7 }}>
                    <DefaultButton onClick={thisDialog._closeDialog}>{ 'Cancel'}</DefaultButton>
                    <PrimaryButton onClick={thisDialog._confirmDialog}>{ thisDialog.confirmButton }</PrimaryButton>
              </div>
            </DialogFooter>
          </Dialog>
    </div>;

    return buildDialog;

}


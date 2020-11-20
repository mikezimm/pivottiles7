
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


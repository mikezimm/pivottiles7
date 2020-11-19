
import {
    IPropertyPanePage,
    PropertyPaneLabel,
    IPropertyPaneLabelProps,
    PropertyPaneHorizontalRule,
    PropertyPaneTextField, IPropertyPaneTextFieldProps,
    PropertyPaneLink, IPropertyPaneLinkProps,
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    IPropertyPaneDropdownOption
  } from '@microsoft/sp-webpart-base';

  import { Pivot, IPivotStyles, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
  import { Image, ImageFit, ImageCoverStyle,IImageProps,IImageState } from 'office-ui-fabric-react/lib/Image';

  import * as strings from 'Pivottiles7WebPartStrings';
//webparts/pivottiles7/components/PivotTiles/IPivotTilesProps
  import { IPivotTilesProps, ICustomCategories, ICustomLogic, ICustomTypes } from '../../webparts/pivottiles7/components/PivotTiles/IPivotTilesProps';


  export class OtherOptionsGroup {
  
    public custCategoryChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        {   index: 0,   key: 'tileCategory', text: "Build from TileCategory column"  },
        {   index: 1,   key: 'semiColon1', text: "SemiColon ; separated words"  },     
        {   index: 2,   key: 'semiColon2', text: "SemiColon= ;= separated words"  },
        {   index: 3,   key: 'custom', text: "Advanced Custom logic (JSON)"  },
    ]; 

    public getCustCatChoice (findMe) {
        if (findMe === 'tileCategory') {
            return "tileCategory";
        } else if (findMe === 'semiColon1') {
            return "semiColon1";
        } else if (findMe === 'semiColon2') {
            return "semiColon2";
        } else if (findMe === 'custom') {
            return "custom";
        }
    } 

}

export let otherOptionsGroup = new OtherOptionsGroup();

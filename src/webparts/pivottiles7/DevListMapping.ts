  
  import * as strings from 'Pivottiles7WebPartStrings';
  import {
    IPropertyPaneDropdownOption
  } from '@microsoft/sp-webpart-base';

  import { availableListMapping } from './AvailableListMapping';
  
  export class ListMapping {
    
    public listChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        availableListMapping.choiceOurTiles,
        availableListMapping.choiceAETiles,
        availableListMapping.choicePromoted,
        availableListMapping.choiceQuick,
        availableListMapping.choiceMedia,
        availableListMapping.choiceDocument,
        availableListMapping.choiceIcons,
        availableListMapping.choiceTestImages,
        availableListMapping.choiceUnk,
        availableListMapping.choiceSiteNews,
        availableListMapping.choiceSitePages,
        availableListMapping.choiceTestDateCat,

    ];

  }

  export let devListMapping = new ListMapping();


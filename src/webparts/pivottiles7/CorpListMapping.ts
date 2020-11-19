  
  import * as strings from 'Pivottiles7WebPartStrings';
  import {
    IPropertyPaneDropdownOption
  } from '@microsoft/sp-webpart-base';

  import { availableListMapping } from './AvailableListMapping';

  export class ListMapping {
        
    /**
     * Get choices from public options at top of devListMapping... should be the single source
     * Pick the options you want visible in this scenario
     */

    public listChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        availableListMapping.choicePolicy,
        availableListMapping.choiceStandards,
        availableListMapping.choiceOurTiles,
        availableListMapping.choiceMedia,
        availableListMapping.choiceDocument,
        availableListMapping.choiceSiteNews,
        availableListMapping.choiceSitePages,
        availableListMapping.choiceUnk,
    ];

}

  export let corpListMapping = new ListMapping();


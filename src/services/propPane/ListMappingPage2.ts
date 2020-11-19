import {
    IPropertyPanePage,
    PropertyPaneLabel,
    IPropertyPaneLabelProps,
    PropertyPaneHorizontalRule,
    PropertyPaneTextField, IPropertyPaneTextFieldProps,
    PropertyPaneLink, IPropertyPaneLinkProps,
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    IPropertyPaneDropdownOption, PropertyPaneToggle,
  } from '@microsoft/sp-webpart-base';
  
  import * as strings from 'Pivottiles7WebPartStrings';

  export class ListMappingPage2 {
    /*
            header: {
                description: strings.PropertyPaneColumnsDescription2
            },
    */

    public getPropertyPanePage(webPartProps): IPropertyPanePage {
        return <IPropertyPanePage>        { // <page3>
            header: {
                //description: strings.PropertyPaneColumnsDescription2
            },
            displayGroupsAsAccordion: true,
             groups: [
            {
                groupName: 'Dev',
                isCollapsed: true ,
                groupFields: [
                PropertyPaneToggle('enableChangePivots', {
                    disabled: webPartProps.scenario !== "DEV" ? true : false,
                    label: 'Enable Change Pivots option',
                    offText: 'No',
                    onText: 'Yes = function not finished',
                }),
              ]
            },




          ]
        }; // <page3>
      } // getPropertyPanePage()
  }


  export let listMappingPage2 = new ListMappingPage2();
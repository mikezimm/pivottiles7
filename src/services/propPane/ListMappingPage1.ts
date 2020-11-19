import {
    IPropertyPanePage,
    PropertyPaneLabel,
    IPropertyPaneLabelProps,
    PropertyPaneHorizontalRule,
    PropertyPaneTextField, IPropertyPaneTextFieldProps,
    PropertyPaneLink, IPropertyPaneLinkProps,
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    IPropertyPaneDropdownOption,
    PropertyPaneToggle
  } from '@microsoft/sp-webpart-base';
  
  import * as strings from 'Pivottiles7WebPartStrings';
  import { devListMapping } from './../../webparts/pivottiles7/DevListMapping';
  import { corpListMapping } from './../../webparts/pivottiles7/CorpListMapping';
  import { teamListMapping } from './../../webparts/pivottiles7/TeamListMapping';

  export class ListMappingPage1 {

    public getPropertyPanePage(webPartProps): IPropertyPanePage {
        /*  Removed Header from above groups in return statement... formatting was not bold.
            header: {
                description: strings.PropertyPaneColumnsDescription1
            },
            */

        let theListChoices : IPropertyPaneDropdownOption[] = devListMapping.listChoices;

        if (webPartProps.scenario === "DEV"){
            theListChoices = devListMapping.listChoices;

        } else if (webPartProps.scenario === "CORP"){
            theListChoices = corpListMapping.listChoices;

        } else if (webPartProps.scenario === "TEAM"){
            theListChoices = teamListMapping.listChoices;
        }
        //console.log('theListChoices: ', theListChoices);
        /*
*/
        return <IPropertyPanePage>        { // <page3>
            header: {
                description: 'List Column settings',
            },
            displayGroupsAsAccordion: true,
            groups: [
            {
                groupName: strings.PropertyPaneColumnsDescription1,
                isCollapsed: true ,
                groupFields: [

                PropertyPaneToggle('definitionToggle', {
                    label: 'Lock List Type - prevents accidently reseting props with List Type dropdown!',
                    offText: 'Off',
                    onText: 'On',
                }),

                PropertyPaneDropdown('listDefinition', <IPropertyPaneDropdownProps>{
                    label: strings.listDefinition,
                    options: theListChoices,
                    disabled: webPartProps.definitionToggle,
                }),

                PropertyPaneTextField('listTitle', {
                    label: strings.listTitle
                }),
                
                PropertyPaneToggle('getAll', {
                    label: strings.Property_getAll_Label,
                    offText: strings.Property_ShowHero_OffText,
                    onText: strings.Property_ShowHero_OnText
                  }),

                PropertyPaneTextField('colTitleText', {
                    label: strings.colTitleText
                }),
                PropertyPaneTextField('colHoverText', {
                    label: strings.colHoverText
                }),
                PropertyPaneTextField('colCategory', {
                    label: strings.colCategory
                }),
                PropertyPaneTextField('colGoToLink', {
                    label: strings.colGoToLink
                }),
                PropertyPaneTextField('colImageLink', {
                    label: strings.colImageLink
                }),
                PropertyPaneTextField('colSort', {
                    label: strings.colSort
                }),

              ]
            },
            {
                groupName: strings.PropertyPaneColumnsDescription2,
                isCollapsed: true ,
                groupFields: [

                PropertyPaneTextField('colColor', {
                    description: 'Column defining tile background color, not yet available.',
                    label: strings.colColor,
                    disabled: true,                    
                }),

                PropertyPaneTextField('colSize', {
                    label: strings.colSize
                }),

                PropertyPaneTextField('colOpenBehaviour', {
                    label: strings.colOpenBehaviour
                }),

                PropertyPaneTextField('colTileStyle', {
                    label: strings.colTileStyle
                }),
              ]
            },
          ]
        }; // <page3>
      } // getPropertyPanePage()
  }


  export let listMappingPage1 = new ListMappingPage1();
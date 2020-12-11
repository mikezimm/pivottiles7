import {
  IPropertyPanePage,
  PropertyPaneLabel,
  IPropertyPaneLabelProps,
  PropertyPaneHorizontalRule,
  PropertyPaneTextField, IPropertyPaneTextFieldProps,
  PropertyPaneLink, IPropertyPaneLinkProps,
  PropertyPaneDropdown, IPropertyPaneDropdownProps,
  IPropertyPaneDropdownOption,PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'Pivottiles7WebPartStrings';
import { imageOptionsGroup } from './index';
import { pivotOptionsGroup} from './index';
import { otherOptionsGroup} from './index';

import { devListMapping } from './../../webparts/pivottiles7/DevListMapping';
import { corpListMapping } from './../../webparts/pivottiles7/CorpListMapping';
import { teamListMapping } from './../../webparts/pivottiles7/TeamListMapping';



export class IntroPage {
  public getPropertyPanePage(webPartProps): IPropertyPanePage {

    const JSONLink = PropertyPaneLink('JSON Link' , {
      text: 'Use this site to more easily work on JSON',
      href: 'https://codebeautify.org/jsonviewer',
      target: '_blank',
      disabled: webPartProps.custCatType === 'tileCategory' ? true : false,
    });

    let theListChoices : IPropertyPaneDropdownOption[] = devListMapping.listChoices;

    let supressTileList = 'Ignore Tile list... go with auto-tiles :)';

    let addToOthers = 'Add uncategorized xxx to ' + webPartProps.otherTab + ' tab.';

    if (webPartProps.scenario === "DEV"){
        theListChoices = devListMapping.listChoices;

    } else if (webPartProps.scenario === "CORP"){
        theListChoices = corpListMapping.listChoices;

    } else if (webPartProps.scenario === "TEAM"){
        theListChoices = teamListMapping.listChoices;
    }

    let custCatChoices : IPropertyPaneDropdownOption[] = otherOptionsGroup.custCategoryChoices;

    return <IPropertyPanePage>
    { // <page1>
      header: {
        //description: strings.PropertyPaneAbout
      },
      displayGroupsAsAccordion: true,
      groups: [
        { groupName: 'Basic webpart info',
        
          groupFields: [
            PropertyPaneLabel('About Text', {
              text: 'This webpart gets tile defintion from a list in SharePoint :).'
            }),

            PropertyPaneLink('About Link' , {
              text: 'Github Repo:  Pivot-Tiles',
              href: 'https://github.com/mikezimm/Pivot-Tiles',
            }),
          ]
        },
        { groupName: 'List setup',
        isCollapsed: true ,
        groupFields: [
          
          PropertyPaneToggle('ignoreList', {
              label: supressTileList,
              offText: 'Off',
              onText: 'On',
          }),

          PropertyPaneTextField('listWebURL', {
              label: strings.listWebURL,
              disabled: webPartProps.ignoreList === true ? true : false,
          }),
          PropertyPaneTextField('setTab', {
            label: strings.setTab,
          }),
          PropertyPaneTextField('otherTab', {
            label: strings.otherTab,
          }),
        ]}, // this group


        {
          groupName: strings.PropertyPaneColumnsDescription1,
          isCollapsed: true ,
          groupFields: [

            PropertyPaneToggle('definitionToggle', {
                label: 'Lock List Type - prevents accidently reseting props with List Type dropdown!',
                offText: 'Off',
                onText: 'On',
                disabled: webPartProps.ignoreList === true ? true : false,
            }),

            PropertyPaneDropdown('listDefinition', <IPropertyPaneDropdownProps>{
                label: strings.listDefinition,
                options: theListChoices,
                disabled: webPartProps.ignoreList === true ? true : webPartProps.definitionToggle,
            }),

            PropertyPaneTextField('listTitle', {
                label: strings.listTitle,
                disabled: webPartProps.ignoreList === true ? true : false,
            }),
            
            PropertyPaneToggle('getAll', {
                label: strings.Property_getAll_Label,
                offText: strings.Property_ShowHero_OffText,
                onText: strings.Property_ShowHero_OnText,
                disabled: webPartProps.ignoreList === true ? true : false,
              }),

            PropertyPaneTextField('colTitleText', {
                label: strings.colTitleText,
                disabled: webPartProps.ignoreList === true ? true : false,
            }),
            PropertyPaneTextField('colHoverText', {
                label: strings.colHoverText,
                disabled: webPartProps.ignoreList === true ? true : false,
            }),
            PropertyPaneTextField('colCategory', {
                label: strings.colCategory,
                disabled: webPartProps.ignoreList === true ? true : false,
            }),
            PropertyPaneTextField('colGoToLink', {
                label: strings.colGoToLink,
                disabled: webPartProps.ignoreList === true ? true : false,
            }),
            PropertyPaneTextField('colImageLink', {
                label: strings.colImageLink,
                disabled: webPartProps.ignoreList === true ? true : false,
            }),
            PropertyPaneTextField('colSort', {
                label: strings.colSort,
                disabled: webPartProps.ignoreList === true ? true : false,
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
              label: strings.colSize,
              disabled: webPartProps.ignoreList === true ? true : false,
          }),

          PropertyPaneTextField('colOpenBehaviour', {
              label: strings.colOpenBehaviour,
              disabled: webPartProps.ignoreList === true ? true : false,
          }),

          PropertyPaneTextField('colTileStyle', {
              label: strings.colTileStyle,
              disabled: webPartProps.ignoreList === true ? true : false,
          }),
        ]
      },

        {
          groupName: 'Custom Categories',
          isCollapsed: true ,
          groupFields: [

            PropertyPaneDropdown('custCatType', <IPropertyPaneDropdownProps>{
                label: 'How to build Categories',
                options: custCatChoices,
            }),

            PropertyPaneTextField('custCatCols', {
                label: 'Custom Category ColumnNames (; separated)',
                disabled: webPartProps.custCatType === 'tileCategory' ? true : false,
            }),

            JSONLink,

            PropertyPaneTextField('custCatLogi', {
              label: 'Custom Logic (see wiki), use link above to help edit JSON',
              disabled: webPartProps.custCatType === 'tileCategory' ? true : false,
            }),

            PropertyPaneToggle('custCatBrak', {
              label: 'Only show tile in First Custom Category found',
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.custCatType === 'tileCategory' ? true : false,
            }),

          ]
        },



        { groupName: 'Filtering',
        isCollapsed: true ,
        groupFields: [
          PropertyPaneTextField('setFilter', {
              label: strings.setFilter,
              description: webPartProps.ignoreList === true ? 'Only applies to Tile list.' : '',
              disabled: webPartProps.ignoreList === true ? true : false,
          }),

          PropertyPaneTextField('filterTitle', {
              label: 'Title contains (Case sensitive)',
              description: 'begin with <> to show items that do not contain text',
          }),

          PropertyPaneTextField('filterDescription', {
              label: 'Description contains (Case sensitive)',
              description: 'begin with <> to show items that do not contain text',
          }),

          PropertyPaneToggle('filterEverything', {
              label: 'Title/Desc filter applies to',
              offText: 'Only main list items',
              onText: 'Everything including Subsites etc...',
              disabled: webPartProps.filterTitle || webPartProps.filterDescription ? false : true,
          }),

          PropertyPaneTextField('propURLQuery', {
            disabled: true,
              label: strings.propURLQuery
          }),
        ]}, // this group



        { groupName: 'Hubsites',
        isCollapsed: true ,
        groupFields: [
          PropertyPaneToggle('hubsInclude', {
              label: 'Show Hubsites',
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.listWebURL !== '' ? true : false,
          }),

          PropertyPaneTextField('hubsCategory', {
              label: 'Hubsite Category',
              disabled: webPartProps.hubsInclude === true ? false : true,
          }),

          PropertyPaneToggle('hubsLazy', {
            label: 'Lazy Load Hubs:  do not load until you click tab',
            offText: 'Off',
            onText: 'On',
            disabled: true,
          }),

          PropertyPaneToggle('hubsOthers', {
              label: addToOthers.replace('xxx', webPartProps.hubsCategory ),
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.hubsInclude === true ? false : true,
//              disabled: webPartProps.custCatType === 'tileCategory' || webPartProps.hubsInclude !== true ? true : false,
          }),

        ]}, // this group




        { groupName: 'Subsites',
        isCollapsed: true ,
        groupFields: [
          PropertyPaneToggle('subsitesInclude', {
              label: 'Show Subsites',
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.listWebURL !== '' ? true : false,
          }),

          PropertyPaneTextField('subsitesCategory', {
              label: 'Subsite Category,',
              disabled: webPartProps.subsitesInclude === true ? false : true,
          }),

          PropertyPaneToggle('subsOthers', {
              label: addToOthers.replace('xxx', webPartProps.subsitesCategory ),
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.subsitesInclude === true ? false : true,
//              disabled: webPartProps.custCatType === 'tileCategory' || webPartProps.subsitesInclude !== true ? true : false,
          }),

        ]}, // this group

        
        { groupName: 'Lists',
        isCollapsed: true ,
        groupFields: [
          PropertyPaneToggle('listsInclude', {
              label: 'Show all Lists',
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.listWebURL !== '' ? true : false,
          }),

          PropertyPaneTextField('listIconStyles', {
            label: 'List Icon Style (similar to tile icons)',
            disabled: webPartProps.listsInclude === true ? false : true,
          }),


          //listHideSystem
          PropertyPaneToggle('listHideSystem', {
              label: 'Hide System lists',
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.listsInclude === true || webPartProps.libsInclude === true ? false : true,
          }),

/*
          PropertyPaneTextField('listLibCat', {
              label: 'Combined category label (if blank, you will get Lists and Libraries',
//              disabled: webPartProps.listsInclude === true || webPartProps.libsInclude === true? false : true,
              disabled: true,
          }),

          PropertyPaneTextField('listFilter', {
            label: 'Filter to apply to lists',
            disabled: true , //webPartProps.listsInclude === true ? false : true,
          }),
*/
          PropertyPaneToggle('listOthers', {
            label: addToOthers.replace('xxx', 'Lists' ),
            offText: 'Off',
            onText: 'On',
            disabled: webPartProps.listsInclude === true ? false : true,
//            disabled: webPartProps.custCatType === 'tileCategory' || webPartProps.libsInclude !== true ? true : false,
        }),

        ]}, // this group

        { groupName: 'Libraries',
        isCollapsed: true ,
        groupFields: [
          PropertyPaneToggle('libsInclude', {
              label: 'Show all Libraries',
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.listWebURL !== '' ? true : false,
          }),

          PropertyPaneTextField('libsIconStyles', {
            label: 'Library Icon Style (similar to tile icons)',
            disabled: webPartProps.libsInclude === true ? false : true,
          }),

            //listHideSystem
            PropertyPaneToggle('listHideSystem', {
              label: 'Hide System lists',
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.listsInclude === true || webPartProps.libsInclude === true? false : true,
          }),

/*
          PropertyPaneTextField('listLibCat', {
              label: 'Combined category label (if blank, you will get Lists and Libraries',
//              disabled: webPartProps.listsInclude === true || webPartProps.libsInclude === true? false : true,
              disabled: true,
          }),

          PropertyPaneTextField('libsFilter', {
            label: 'Filter to apply to lists',
            disabled: true , //webPartProps.libsInclude === true ? false : true,
          }),
*/
          PropertyPaneToggle('ignoreList', {
              label: 'Only show Lists and Libraries, Ignore your List settings',
              offText: 'Off',
              onText: 'On',
              //disabled: webPartProps.listsInclude === true || webPartProps.libsInclude === true? false : true,
              disabled: true,
          }),

          PropertyPaneToggle('libsOthers', {
              label: addToOthers.replace('xxx', 'Libraries' ),
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.libsInclude === true ? false : true,
//              disabled: webPartProps.custCatType === 'tileCategory'  || webPartProps.libsInclude !== true ? true : false,
          }),

        ]}, // this group
  
  
        { groupName: 'Groups',
        isCollapsed: true ,
        groupFields: [
          PropertyPaneToggle('groupsInclude', {
              label: 'Show Groups automatically',
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.listWebURL !== '' ? true : false,
          }),


          PropertyPaneTextField('groupsList', {
              label: 'List of group names - separated by ;',
              description: 'For complex settings, use the link below to edit as JSON Object',
              disabled: webPartProps.groupsInclude === true ? false : true,
              multiline: true,
          }),
          
          JSONLink,

          PropertyPaneTextField('groupsCategory', {
              label: 'Groups Category',
              disabled: webPartProps.groupsInclude === true ? false : true,
          }),

          PropertyPaneToggle('groupsShowAdmins', {
            label: 'Show Site Admins',
            offText: 'No',
            onText: 'Yes',
            disabled: webPartProps.groupsInclude === true ? false : true,
          }),

          PropertyPaneToggle('groupsShowGuests', {
            label: 'Show Guests',
            offText: 'No',
            onText: 'Yes',
            disabled: webPartProps.groupsInclude === true ? false : true,
          }),
          
          PropertyPaneToggle('groupsLazy', {
            label: 'Lazy Load Groups:  do not load until you click tab',
            offText: 'Off',
            onText: 'On',
//            disabled: webPartProps.groupsInclude === true ? false : true,
            disabled: true,
          }),
/*
          PropertyPaneToggle('groupsOthers', {
              label: webPartProps.custCatType === 'tileCategory' ? 'Feature disabled' : addToOthers.replace('xxx', webPartProps.groupsCategory ),
              offText: 'Off',
              onText: 'On',
//              disabled: webPartProps.custCatType === 'tileCategory' || webPartProps.groupsInclude !== true ? true : false,
              disabled: true,
          }),
*/
        ]}, // this group
/*
        { groupName: 'Users',
        isCollapsed: true ,
        groupFields: [
          PropertyPaneToggle('usersInclude', {
              label: 'Show Users automatically',
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.listWebURL !== '' ? true : false,
          }),

          PropertyPaneTextField('usersCategory', {
              label: 'User Tile settings',
              disabled: webPartProps.usersInclude === true ? false : true,
          }),

          PropertyPaneToggle('usersLazy', {
            label: 'Lazy Load Users:  do not load until you click tab',
            offText: 'Off',
            onText: 'On',
            disabled: webPartProps.usersInclude === true ? false : true,
          }),
          PropertyPaneToggle('groupsOthers', {
              label: webPartProps.custCatType === 'tileCategory' ? 'Feature disabled' : addToOthers.replace('xxx', webPartProps.usersCategory ),
              offText: 'Off',
              onText: 'On',
              disabled: webPartProps.custCatType === 'tileCategory' ? true : false,
          }),

        ]}, 
        */
        // this group


    ]}; // Groups
  } // getPropertyPanePage()
}

export let introPage = new IntroPage();
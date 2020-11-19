import {
    IPropertyPanePage,
    PropertyPaneLabel,
    IPropertyPaneLabelProps,
    PropertyPaneHorizontalRule,
    PropertyPaneTextField, IPropertyPaneTextFieldProps,
    PropertyPaneLink, IPropertyPaneLinkProps,
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    IPropertyPaneDropdownOption,
    PropertyPaneSlider,
    PropertyPaneToggle
  } from '@microsoft/sp-webpart-base';
  
  import * as strings from 'Pivottiles7WebPartStrings';
  import { pivotOptionsGroup, imageOptionsGroup } from './index';
  
  export class WebPartSettingsPage {

    private setSize: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
      {        index: 0,        key: '100',        text: '100px high'      },
      {        index: 1,        key: '150',        text: '150px high'      },
      {        index: 2,        key: '300',        text: '300px high'      },
      {        index: 4,        key: 'Card',        text: 'Document Card'      },
      {        index: 5,        key: 'List',        text: 'List View'      },      
      {        index: 3,        key: 'Custom',        text: 'Custom'      },      
    ];

    private setRatio: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
      {        index: 0,        key: '1xy',        text: 'Square Tile'      },
      {        index: 1,        key: '4x1',        text: 'Fit 4 Tiles wide'      },
      {        index: 2,        key: '3x1',        text: 'Fit 3 Tiles wide'      },
      {        index: 3,        key: '2x1',        text: 'Fit 2 Tiles wide'      },
      {        index: 4,        key: '1x1',        text: 'Fit 1 Tiles wide'      }
    ];

    public getPropertyPanePage(webPartProps): IPropertyPanePage {
      return <IPropertyPanePage>        { // <page2>
        header: {
          description: strings.PropertyPaneMainDescription
        },
        displayGroupsAsAccordion: true,
        groups: [

          { groupName: 'Image settings',
          isCollapsed: true ,
          groupFields: [
            
            PropertyPaneDropdown('onHoverZoom', <IPropertyPaneDropdownProps>{
              label: strings.onHoverZoom,
              options: imageOptionsGroup.hoverZoomChoices,
            }),

            PropertyPaneDropdown('onHoverEffect', <IPropertyPaneDropdownProps>{
              label: strings.onHoverEffect,
              options: imageOptionsGroup.hoverEffectChoices,
            }),
            

            PropertyPaneDropdown('setImgFit', <IPropertyPaneDropdownProps>{
              label: strings.setImgFit,
              options: imageOptionsGroup.imgFitChoices,
            }),
            PropertyPaneDropdown('setImgCover', <IPropertyPaneDropdownProps>{
              label: strings.setImgCover,
              options: imageOptionsGroup.imgCoverChoices,
            }),

          ]}, // this group

          // Group of props for standard sizes
          {  groupName: 'Tile settings',
          isCollapsed: true ,
          groupFields: [

            PropertyPaneDropdown('setSize', <IPropertyPaneDropdownProps>{
              label: strings.setSize,
              options: this.setSize,
            }),
            
            PropertyPaneDropdown('setRatio', <IPropertyPaneDropdownProps>{
              disabled: webPartProps.setSize === "Custom" ? true : false ,
              label: strings.setRatio,
              options: this.setRatio,
            }),

              PropertyPaneSlider('imageWidth', {
                label: strings.Property_ImageWidth_Label,
                disabled: webPartProps.setSize === "Custom" ? false : true ,
                min: 50,
                max: 300,
                step: 25,
              }),
              PropertyPaneSlider('imageHeight', {
                label: strings.Property_ImageHeight_Label,
                disabled: webPartProps.setSize === "Custom" ? false : true ,
                min: 50,
                max: 300,
                step: 25,
              }),
              PropertyPaneSlider('textPadding', {
                label: strings.Property_TextPadding_Label,
                disabled: webPartProps.setSize === "Custom" ? false : true ,
                min: 2,
                max: 20
              }),

          ]}, // this group
          
          { groupName: 'Hero Panel settings',
            isCollapsed: true,
            groupFields: [

              PropertyPaneToggle('showHero', {
                label: strings.Property_ShowHero_Label,
                offText: strings.Property_ShowHero_OffText,
                onText: strings.Property_ShowHero_OnText
              }),

              PropertyPaneLabel('HeroPanelSettings', {
                text: 'Hero Panel Settings'
              }),

              PropertyPaneDropdown('heroType', <IPropertyPaneDropdownProps>{
                label: strings.heroChoices,
                options: imageOptionsGroup.heroChoices,
              }),
              
              PropertyPaneTextField('heroCategory', {
                label: strings.heroCategory
              }),

              PropertyPaneSlider('heroRatio', {
                label: strings.heroRatio,
                min: 3,
                max: 24,
                step: 1,
              }),
              
              PropertyPaneDropdown('setHeroFit', <IPropertyPaneDropdownProps>{
                label: strings.setImgFit,
                options: imageOptionsGroup.imgFitChoices,
              }),

              PropertyPaneDropdown('setHeroCover', <IPropertyPaneDropdownProps>{
                label: strings.setImgCover,
                options: imageOptionsGroup.imgCoverChoices,
              }),

            ]}, // this group

            { groupName: 'Pivot Styles',
            isCollapsed: true ,
              groupFields: [
                PropertyPaneDropdown('setPivSize', <IPropertyPaneDropdownProps>{
                  label: strings.setPivSize,
                  options: pivotOptionsGroup.pivSizeChoices,
                }),
                PropertyPaneDropdown('setPivFormat', <IPropertyPaneDropdownProps>{
                  label: strings.setPivFormat,
                  options: pivotOptionsGroup.pivFormatChoices,
                }),
                PropertyPaneDropdown('setPivOptions', <IPropertyPaneDropdownProps>{
                  label: strings.setPivOptions,
                  options: pivotOptionsGroup.pivOptionsChoices,
                  disabled: true,
                }),
              ]}, // this group

        { groupName: 'Behavior',
        isCollapsed: true ,
          groupFields: [
            PropertyPaneDropdown('target', <IPropertyPaneDropdownProps>{
              label: 'On-Click Behavior',
              options: imageOptionsGroup.imgTargetChoices,
            }),
          ]}, // this group


          ]}; // Groups
    } // getPropertyPanePage()

  } // WebPartSettingsPage
  
  export let webPartSettingsPage = new WebPartSettingsPage();
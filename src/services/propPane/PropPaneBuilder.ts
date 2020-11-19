import {
  IPropertyPaneConfiguration,
} from '@microsoft/sp-webpart-base';

import {
  introPage,
  webPartSettingsPage,
  listMappingPage1,
  listMappingPage2,
} from './index';

/*
        IntroPage.getPropertyPanePage(),
        WebPartSettingsPage.getPropertyPanePage(),
        ListMappingPage.getPropertyPanePage(),
*/

export class PropertyPaneBuilder {
  public getPropertyPaneConfiguration(webPartProps): IPropertyPaneConfiguration {
    return <IPropertyPaneConfiguration>{
      pages: [
        introPage.getPropertyPanePage(webPartProps),
        webPartSettingsPage.getPropertyPanePage(webPartProps),
        //listMappingPage1.getPropertyPanePage(webPartProps),
        listMappingPage2.getPropertyPanePage(webPartProps),
      ]
    };
  } // getPropertyPaneConfiguration()

}

export let propertyPaneBuilder = new PropertyPaneBuilder();
  
  import * as strings from 'Pivottiles7WebPartStrings';
  import {
    IPropertyPaneDropdownOption
  } from '@microsoft/sp-webpart-base';

  export class ListMapping {
    public choiceOurTiles: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
    {   index: 0,   key: 'OurTiles', text: "OurTiles"  };

    public choiceAETiles: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
        {   index: 1,   key: 'AEInspiredTiles', text: "AEInspiredTiles"  };

    public choicePromoted: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
        {   index: 2,   key: 'PromotedLinks', text: "PromotedLinks"  };

    public choiceQuick: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
        {   index: 3,   key: 'QuickLinks', text: "QuickLinks"  };

    public choiceMedia: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
        {   index: 4,   key: 'MediaLibrary', text: "Media Library"  };

    public choiceDocument: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
        {   index: 5,   key: 'DocumentLibrary', text: "Document Library"  };

    public choiceIcons: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
        {   index: 6,   key: 'IconsLibrary', text: "Icons Library"  };

    public choiceTestImages: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
        {   index: 7,   key: 'TestImagesLibrary', text: "TestImages Library"  };

    public choicePolicy: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
    {   index: 8,   key: 'PolicyLibrary', text: "Policy Library"  };

    public choiceStandards: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
    {   index: 10,   key: 'StandardsLibrary', text: "Standards Library"  };

    public choiceUnk: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
        {   index: 9,   key: 'none', text: "Unknown"  };

    public choiceTestDateCat: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
    {   index: 12,   key: 'TestDateCatLibrary', text: "TestImages Date Category"  };

    public choiceSitePages: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
    {   index: 10,   key: 'SitePages', text: "Site Pages"  };

    public choiceSiteNews: IPropertyPaneDropdownOption = <IPropertyPaneDropdownOption>
    {   index: 11,   key: 'SiteNews', text: "Site Pages News"  };

    public getListColumns (findMe) :any {
        let listMap = {};

    //NOTE:
    //This should be the default list structure for the webpart.
    // Be sure these values match the default set in the webpart.manifest.json - needs to be done by hand.
    if (findMe === 'OurTiles') {
        listMap = {
            "testSite" : "",
            "listDef" : "OurTiles",
            "listDisplay" : "OurTiles",
            "listName" : "OurTiles",
            "tabDefault" : true,
            "listMapping" : {
                "colTitleText" : strings.defColTitleText,
                "colHoverText" : strings.defColHoverText,
                "colCategory" : strings.defColCategory,
                "colColor" : strings.defColdefColor,
                "colSize" : strings.defColSize,
                "colGoToLink" : strings.defColGoToLink,
                "colOpenBehaviour" : strings.defColOpenBehaviour,
                "colImageLink" : strings.defColImageLink,
                "colSort" : strings.defColSort,
            },
            "setFilter": "zzzShowAll eq 'Yes'",
            "setTab": "Main Menu",
            "custCatType": "tileCategory",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "", 
        };

    } else if (findMe === 'AEInspiredTiles') {
        listMap = {
            "testSite" : "",
            "listDef" : "AEInspiredTiles",
            "listDisplay" : "AE Inspired Tiles",
            "listName" : "AEInspiredTilesItems",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "Title",
                "colHoverText" : "TileDescription",
                "colCategory" : "TileCategory",
                "colColor" : "TileBgColorClass",
                "colSize" : "TileBgImageSize",
                "colGoToLink" : "TileHrefLink",
                "colOpenBehaviour" : "",
                "colImageLink" : "TileBgImageUrl",
                "colSort" : "Order1"
            },
            "setFilter": "",
            "setTab": "Main Menu",
            "custCatType": "tileCategory",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "", 
        };
        
    } else if (findMe === 'PromotedLinks') {
        listMap = {
            "testSite" : "",
            "listDef" : "PromotedLinks",
            "listDisplay" : "Promoted Links",
            "listName" : "PromotedLinks",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "Title",
                "colHoverText" : "",
                "colCategory" : "",
                "colColor" : "",
                "colSize" : "",
                "colGoToLink" : "LinkLocation",
                "colOpenBehaviour" : "LaunchBehavior",
                "colImageLink" : "BackgroundImageLocation",
                "colSort" : "TileOrder"
            },
            "setFilter": "",
            "setTab": "Main Menu",
            "custCatType": "semiColon1",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "Title;Testing;Add New Category Here", 
        };
        
    } else if (findMe === 'MediaLibrary') {
        listMap = {
            "testSite" : "",
            "listDef" : "MediaLibrary",
            "listDisplay" : "Media Library",
            "listName" : "Media Library",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "File/Name",
                "colHoverText" : "Editor/Title",
                "colCategory" : "Author/ID",
                "colColor" : "",
                "colSize" : "",
                "colGoToLink" : "File/ServerRelativeUrl",
                "colOpenBehaviour" : "",
                "colImageLink" : "File/ServerRelativeUrl",
                "colSort" : "Title"
            },
            // This should remove folders:  ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'
            "setFilter": "ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'",
            "setTab": "Main Menu",
            "custCatType": "tileCategory",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "",
        };
        
    } else if (findMe === 'SitePages') {
        listMap = {
            "testSite" : "",
            "listDef" : "SitePages",
            "listDisplay" : "Site Pages",
            "listName" : "Site Pages",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "Title",
                "colHoverText" : "Description",
                "colCategory" : "Author/Title",
                "colColor" : "",
                "colSize" : "",
                "colGoToLink" : "File/ServerRelativeUrl",
                "colOpenBehaviour" : "",
                "colImageLink" : "BannerImageUrl.Url",
                "colSort" : "Title"
            },
            //  This setFilter will remove Item with Id = X... replace with Page Template items for instance
            // This should remove folders:  ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'
            "setFilter": "Id ne 'X' and ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159' and Title ne 'Home'",
            "setTab": "Main Menu",
            "custCatType": "semiColon1",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "News",
        };
        
    } else if (findMe === 'SiteNews') {
        listMap = {
            "testSite" : "",
            "listDef" : "SiteNews",
            "listDisplay" : "Site Pages",
            "listName" : "SitePages",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "Title",
                "colHoverText" : "Description",
                "colCategory" : "Author/Title",
                "colColor" : "",
                "colSize" : "",
                "colGoToLink" : "File/ServerRelativeUrl",
                "colOpenBehaviour" : "",
                "colImageLink" : "BannerImageUrl.Url",
                "colSort" : "Title"
            },
            //  This setFilter will remove Item with Id = X... replace with Page Template items for instance
            // This should remove folders:  ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'
            "setFilter": "Id ne 'X' and ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159' and Title ne 'Home'",
            "setTab": "Main Menu",
            "custCatType": "semiColon1",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "News",
        };
        
    } else if (findMe === 'DocumentLibrary') {
        listMap = {
            "testSite" : "",
            "listDef" : "DocumentLibrary",
            "listDisplay" : "Document Library",
            "listName" : "Documents",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "File/Name",
                "colHoverText" : "Editor/Title",
                "colCategory" : "Author/ID",
                "colColor" : "",
                "colSize" : "",
                "colGoToLink" : "File/ServerRelativeUrl",
                "colOpenBehaviour" : "",
                "colImageLink" : "",
                "colSort" : "Title"
            },
            // This should remove folders:  ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'
            "setFilter": "ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'",
            "setTab": "Main Menu",
            "custCatType": "tileCategory",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "",
        };
        
    } else if (findMe === 'IconsLibrary') {
        listMap = {
            "testSite" : "https://mcclickster.sharepoint.com/sites/Templates/Icons/",
            "listDef" : "IconsLibrary",
            "listDisplay" : "Icons",
            "listName" : "Icons",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "File/Name",
                "colHoverText" : "Editor/Title",
                "colCategory" : "zzzTileCategory",
                "colColor" : "",
                "colSize" : "",
                "colGoToLink" : "File/ServerRelativeUrl",
                "colOpenBehaviour" : "",
                "colImageLink" : "File/ServerRelativeUrl",
                "colSort" : "Title"
            },
            // This should remove folders:  ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'
            "setFilter": "ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'",
            "setTab": "Steps",
            "custCatType": "tileCategory",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "",
        };
          
    } else if (findMe === 'TestImagesLibrary') {
        listMap = {
            "testSite" : "",
            "listDef" : "TestImagesLibrary",
            "listDisplay" : "TestImages",
            "listName" : "TestImages",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "File/Name",
                "colHoverText" : "Editor/Title",
                "colCategory" : "User1/Title",
                "colColor" : "",
                "colSize" : "",
                "colGoToLink" : "File/ServerRelativeUrl",
                "colOpenBehaviour" : "",
                "colImageLink" : "File/ServerRelativeUrl",
                "colSort" : ""
            },
            // This should remove folders:  ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'
            "setFilter": "ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'",
            "setTab": "Mike zimmerman",
            "custCatType": "tileCategory",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "",
        };

    } else if (findMe === 'TestDateCatLibrary') {
        listMap = {
            "testSite" : "",
            "listDef" : "TestDateCatLibrary",
            "listDisplay" : "TestImages",
            "listName" : "TestImages",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "File/Name",
                "colHoverText" : "Editor/Title",
                "colCategory" : "DateCol",
                "colColor" : "",
                "colSize" : "",
                "colGoToLink" : "File/ServerRelativeUrl",
                "colOpenBehaviour" : "",
                "colImageLink" : "File/ServerRelativeUrl",
                "colSort" : ""
            },
            // This should remove folders:  ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'
            "setFilter": "ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'",
            "setTab": "2020",
            "custCatType": "tileCategory",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "",
        };
    } else if (findMe === 'PolicyLibrary') {
        listMap = {
            "testSite" : "https://mcclickster.sharepoint.com/sites/Templates/CorpIntra/",
            "listDef" : "PolicyLibrary",
            "listDisplay" : "Policy",
            "listName" : "Policy",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "File/Name",
                "colHoverText" : "Location",
                "colCategory" : "Function",
                "colColor" : "",
                "colSize" : "",
                "colGoToLink" : "File/ServerRelativeUrl",
                "colOpenBehaviour" : "",
                "colImageLink" : "File/ServerRelativeUrl",
                "colSort" : "Title"
            },
            // This should remove folders:  ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'
            "setFilter": "ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'",
            "setTab": "Quality",
            "custCatType": "tileCategory",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "",
        };
    } else if (findMe === 'StandardsLibrary') {
        listMap = {
            "testSite" : "https://mcclickster.sharepoint.com/sites/Templates/CorpIntra/",
            "listDef" : "StandardsLibrary",
            "listDisplay" : "Standards",
            "listName" : "Standards",
            "tabDefault" : false,
            "listMapping" : {
                "colTitleText" : "File/Name",
                "colHoverText" : "Function",
                "colCategory" : "Location",
                "colColor" : "",
                "colSize" : "",
                "colGoToLink" : "File/ServerRelativeUrl",
                "colOpenBehaviour" : "",
                "colImageLink" : "File/ServerRelativeUrl",
                "colSort" : "Title"
            },
            // This should remove folders:  ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'
            "setFilter": "ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'",
            "setTab": "EU",
            "custCatType": "tileCategory",  //export type ICustomTypes = 'tileCategory' | 'semiColon1' | 'semiColon2' | 'custom';
            "custCatLogi": "",
        };
    }
    console.log('List Mapping for: ' + findMe );
    console.log( listMap );        
    return listMap;

    }   

  }

  export let availableListMapping = new ListMapping();


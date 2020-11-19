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

  export class ImageOptionsGroup {

    public imgFitChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        {   index: 0,   key: 'center', text: 'Center'  },
        {   index: 1,   key: 'contain', text: 'Contain'  },
        {   index: 2,   key: 'cover', text: 'Cover'  },
        {   index: 3,   key: 'none', text: 'None'  },
        {   index: 4,   key: 'centerCover', text: 'CenterCover'  },
        {   index: 5,   key: 'centerContain', text: 'CenterContain'  },
    ];

    public getImgFit (findMe) {
        if (findMe === 'center') {
            return ImageFit.center;
        } else if (findMe === 'contain') {
            return ImageFit.contain;
        } else if (findMe === 'cover') {
            return ImageFit.cover;
        } else if (findMe === 'none') {
            return ImageFit.none;
        } else if (findMe === 'centerContain') {
            return ImageFit.centerContain;
        } else if (findMe === 'centerCover') {
            return ImageFit.centerCover;
        } else {
            return ImageFit.centerCover;
        }
    }  

    public imgCoverChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        {   index: 0,   key: 'landscape', text: "Landscape ^ stretch full height v"  },
        {   index: 1,   key: 'portrait', text: "Portrait < stretch full width >"  },
    ];
    
    public getImgCover (findMe) {
        if (findMe === 'landscape') {
            return ImageCoverStyle.landscape;
        } else {
            return ImageCoverStyle.portrait;
        }
    }

    public imgTargetChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        {   index: 0,   key: 'top', text: "Full Body (_top)"  },
        {   index: 1,   key: 'blank', text: "New Window (_blank)"  },

    ];
    /*  These do not seem to  work.
        {   index: 2,   key: 'self', text: "Same Frame (_self)"  },
        {   index: 3,   key: 'parent', text: "Parent Frameset (_parent)"  },
    */

    public getTarget (findMe) {
        if (findMe === 'blank') {
            return "_blank";
        } else if (findMe === 'self') {
            return "_self";
        } else if (findMe === 'parent') {
            return "_parent";
        } else if (findMe === 'top') {
            return "_top";
        } else {
            return "_top";
        }
    } 

    public heroChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        {   index: 0,   key: 'inLine', text: "Single In Line (below pivot)"  },
        {   index: 8,   key: 'carouselLayout', text: "Carousel Layout (below pivot)"  },     
        {   index: 3,   key: 'header', text: "Above"  },
        {   index: 4,   key: 'footer', text: "Below"  },  
        {   index: 1,   key: 'left', text: "Left side"  },
        {   index: 2,   key: 'right', text: "Right side"  },
        {   index: 9,   key: 'none', text: "None"  },
    ];
    /*  These do not seem to  work.
        {   index: 2,   key: 'self', text: "Same Frame (_self)"  },
        {   index: 3,   key: 'parent', text: "Parent Frameset (_parent)"  },
    */

    public getHeroChoice (findMe) {
        if (findMe === 'left') {
            return "left";
        } else if (findMe === 'right') {
            return "right";
        } else if (findMe === 'header') {
            return "header";
        } else if (findMe === 'footer') {
            return "footer";
        } else if (findMe === 'none') {
            return "none";
        } else {
            return "left";
        }
    } 

    //onHoverZoom

    public hoverZoomChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        {   index: 0,   key: '1.1', text: "1.1 x"  },
        {   index: 1,   key: '1.2', text: "1.2 x"  },
        {   index: 9,   key: '1.0', text: "1.0 - no zoom animation"  },
    ];
    /*  These do not seem to  work.
        {   index: 2,   key: 'self', text: "Same Frame (_self)"  },
        {   index: 3,   key: 'parent', text: "Parent Frameset (_parent)"  },
    */

    public getHoverZoom (findMe) {
        if (findMe === '1.0') {
            return 1;
        } else if (findMe === '1.1') {
            return 1.1;
        } else if (findMe === '1.2') {
            return 1.2;
        } else {
            return 0;
        }
    } 

    //hoverEffectChoices
    public hoverEffectChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        {   index: 0,   key: 'slideUp', text: "Slide panel up"  },
        {   index: 1,   key: 'fadeUp', text: "Fade panel"  },
        {   index: 9,   key: 'none', text: "None"  },
    ];
    /*  These do not seem to  work.
        {   index: 2,   key: 'self', text: "Same Frame (_self)"  },
        {   index: 3,   key: 'parent', text: "Parent Frameset (_parent)"  },
    */

    /**
     * Currently just place holder in case needed.
     * @param findMe 
     */
    public getHoverEffect (findMe) {
        if (findMe === '1.0') {
            return 1;
        } else if (findMe === '1.1') {
            return 1.1;
        } else if (findMe === '1.2') {
            return 1.2;
        } else {
            return 0;
        }
    } 

  }

  export let imageOptionsGroup = new ImageOptionsGroup();
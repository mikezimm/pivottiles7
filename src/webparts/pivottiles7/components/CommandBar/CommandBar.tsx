import * as React from 'react';

import { CommandBar,  } from "office-ui-fabric-react/lib/CommandBar";
import {CommandBarButton, IButtonProps} from "office-ui-fabric-react/lib/Button";

import styles from './CommandBar.module.scss';
//import tUtils from './utilTiles'


import { ICommandBarProps } from './ICommandBarProps';
import { ICommandBarState } from './ICommandBarState';
import { Utils } from './utils';

export default class MyCommandBar extends React.Component<ICommandBarProps, ICommandBarState> {

    constructor(props: ICommandBarProps, state: ICommandBarState) {
        super(props);
    
        this.state = {
          hovering: 10,
          visible:10
        };
        /*
                console.log('Constructor: MyCommandBar');
                console.log(this.props);
                console.log(this.state);
        */
        console.log(this.props);
        console.log(this.state);
      }


    public render(): JSX.Element {

      const customButton = (props: IButtonProps) => {
        //Got this const from:  https://developer.microsoft.com/en-us/fabric/#/controls/web/commandbar
        // icon: { color: '#E20000' }, does change color of icon
        // textContainer: { fontSize: 48 }, does NOT change size of icon
        /*  These impact icons but not the container
              icon: { color: '#E20000',
              color: 'black',
                fontSize: 48,
                ####  This is where you can set the color for the icons
                backgroundColor: 'white',
             },
            flexContainer is the larger box around just the icon but this removes onhover highlight
            flexContainer: {backgroundColor: 'white'},
            rootExpanded: does NOT seem to impact color of bar
            rootExpanded: {backgroundColor: 'white'},
            NOTE:  forcing padding: 0px around root element seems to hide gray area in dev window
            rootFocused : does NOT do anything either
            rootFocused : {backgroundColor: 'white',padding:'0px !important'},
            putting padding on role="menubar" class="ms-FocusZone css-50 ms-CommandBar root-47" does do it.
        */
       //console.log(this.props);
       //console.log(this.state);
        return (
          <CommandBarButton
            {...props}
            styles={{
              ...props.styles,
              root: {backgroundColor: 'white'  ,padding:'0px !important'},
              textContainer: { fontSize: 12 },
              icon: { 
                fontSize: 18,
                fontWeight: "bolder",
                margin: '0px 2px',

             },
            }}
          />
        );
      };

//      const _utils = new Utils();
//      let ttips = new this.props.toggleTips();
//      let farItems = _utils.getFarItems(ttips);
      let farItems = Utils.getFarItems(this.props, this.state, this.props.toggleTips, this.props.minimizeTiles, this.props.searchMe, this.props.showAll, this.props.toggleLayout);

        return (
          <div className={ styles.container }>
            <CommandBar 
              buttonAs={customButton}
              items={ Utils.getMainItems() }
              farItems={ farItems }
              styles={{
                root: {padding:'0px !important'},
                
              }}
            />
          </div>
        );
      }

      private getFarItems() {
        return [
          { key: 'mini',    name: '',    ariaLabel: 'Minimize',    iconProps: { iconName: 'ChromeMinimize' },
            onClick: () => this.props.minimizeTiles()
          },
          { key: 'tips',    name: '',     ariaLabel: 'Tips',        iconProps: { iconName: 'Help' },
            onClick: () => this.props.toggleTips()
          },
        ];
      }



      private getItems = () => {
          return [];
      }

      private getOverlflowItems = () => {
          return [];
      }
      private getItemsExample = () => {
        return [
          {
            key: 'newItem',
            name: 'New',
            cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
            iconProps: {
              iconName: 'Add'
            },
            ariaLabel: 'New',
            subMenuProps: {
              items: [
                {
                  key: 'emailMessage',
                  name: 'Email message',
                  iconProps: {
                    iconName: 'Mail'
                  },
                  ['data-automation-id']: 'newEmailButton'
                },
                {
                  key: 'calendarEvent',
                  name: 'Calendar event',
                  iconProps: {
                    iconName: 'Calendar'
                  }
                }
              ]
            }
          },
          {
            key: 'upload',
            name: 'Upload',
            iconProps: {
              iconName: 'Upload'
            },
            href: 'https://dev.office.com/fabric',
            ['data-automation-id']: 'uploadButton'
          },
          {
            key: 'share',
            name: 'Share',
            iconProps: {
              iconName: 'Share'
            },
            onClick: () => console.log('Share')
          },
          {
            key: 'download',
            name: 'Download',
            iconProps: {
              iconName: 'Download'
            },
            onClick: () => console.log('Download')
          }
        ];
      }
    
      private getOverlflowItemsExample = () => {
        return [
          {
            key: 'move',
            name: 'Move to...',
            onClick: () => console.log('Move to'),
            iconProps: {
              iconName: 'MoveToFolder'
            }
          },
          {
            key: 'copy',
            name: 'Copy to...',
            onClick: () => console.log('Copy to'),
            iconProps: {
              iconName: 'Copy'
            }
          },
          {
            key: 'rename',
            name: 'Rename...',
            onClick: () => console.log('Rename'),
            iconProps: {
              iconName: 'Edit'
            }
          }
        ];
      }
    
      private getFarItemsExample = () => {
        return [
          {
            key: 'sort',
            name: 'Sort',
            ariaLabel: 'Sort',
            iconProps: {
              iconName: 'SortLines'
            },
            onClick: () => console.log('Sort')
          },
          {
            key: 'tile',
            name: 'Grid view',
            ariaLabel: 'Grid view',
            iconProps: {
              iconName: 'Tiles'
            },
            iconOnly: true,
            onClick: () => console.log('Tiles')
          },
          {
            key: 'info',
            name: 'Info',
            ariaLabel: 'Info',
            iconProps: {
              iconName: 'Info'
            },
            iconOnly: true,
            onClick: () => console.log('Info')
          }
        ];
      }
  }
  
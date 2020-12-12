import * as React from 'react';
import styles from './PersonaCard.module.scss';
import { IPersonaCardProps } from './IPersonaCardProps';
import { IPersonaCardState } from './IPersonaCardState';
import {
  Log, Environment, EnvironmentType,
} from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';

import {
  Persona,
  PersonaSize,
  DocumentCard,
  DocumentCardType,
  Icon,
} from 'office-ui-fabric-react';

import { SiteAdminGroupName, GuestsGroupName, GuestsIconName, SiteAdminIconName, } from '../../Groups/IMyGroupsState';

const EXP_SOURCE: string = 'SPFxDirectory';
const LIVE_PERSONA_COMPONENT_ID: string =
  '914330ee-2df2-4f6e-a858-30c23a812408';

export class PersonaCard extends React.Component<
  IPersonaCardProps,
  IPersonaCardState
  > {
  constructor(props: IPersonaCardProps) {
    super(props);

    this.state = { livePersonaCard: undefined, pictureUrl: undefined };
  }
  /**
   *
   *
   * @memberof PersonaCard
   */
  public async componentDidMount() {
    if (Environment.type !== EnvironmentType.Local) {
      const sharedLibrary = await this._loadSPComponentById(
        LIVE_PERSONA_COMPONENT_ID
      );
      const livePersonaCard: any = sharedLibrary.LivePersonaCard;
      this.setState({ livePersonaCard: livePersonaCard });
    }
  }

  /**
   *
   *
   * @param {IPersonaCardProps} prevProps
   * @param {IPersonaCardState} prevState
   * @memberof PersonaCard
   */
  public componentDidUpdate(
    prevProps: IPersonaCardProps,
    prevState: IPersonaCardState
  ): void { }

  /**
   *
   *
   * @private
   * @returns
   * @memberof PersonaCard
   */
  private _LivePersonaCard() {
    return React.createElement(
      this.state.livePersonaCard,
      {
        serviceScope: this.props.context.serviceScope,
        upn: this.props.profileProperties.Email,
        onCardOpen: () => {
          console.log('LivePersonaCard Open');
        },
        onCardClose: () => {
          console.log('LivePersonaCard Close');
        },
      },
      this._PersonaCard()
    );
  }

  //2020-11-24:  Added for adjusting card size
  private getCardHeight(  ) {
    let size = this.props.size ;
    if ( size === PersonaSize.size72 ) {
      return '120px';
    } else if ( size === PersonaSize.size48 ) {
      return '80px';
    } else if ( size === PersonaSize.size32 ) {
      return '60px';
    }
  }

  //2020-11-24:  Added for adjusting card size
  private getCardWidth(  ) {
    let size = this.props.size ;
    if ( size === PersonaSize.size72 ) {
      return '300px';
    } else if ( size === PersonaSize.size48 ) {
      return '210px';
    } else if ( size === PersonaSize.size32 ) {
      return '200px';
    }
  }

  /**
   *
   *
   * @private
   * @returns {JSX.Element}
   * @memberof PersonaCard
   */
  private _PersonaCard(): JSX.Element {

    let docCardClass = styles.documentCardDefault;
    if ( this.props.profileProperties.isSiteAdmin === true ) {  docCardClass = styles.documentCardAdmin ; }
    else if ( this.props.profileProperties.isGuest === true ) { docCardClass = styles.documentCardGuest ; } 
    let iconSize = this.props.iconSize;
    let iconTextSize = this.props.iconTextSize;

    let AdminIcon = this.props.profileProperties.isSiteAdmin !== true ? false :
              <div style={{ fontSize: iconSize , color: 'darkgreen' , paddingRight: 10, whiteSpace: 'nowrap' }} >
                <Icon iconName={ SiteAdminIconName } title={'Site Admin'} />
                <span style={{ fontSize: iconTextSize }}>Admin</span>
              </div>;
    let GuestIcon = this.props.profileProperties.isGuest !== true ? false :
              <div style={{ fontSize: iconSize , color: 'saddlebrown' , paddingRight: 4, whiteSpace: 'nowrap' }} >
                <Icon iconName={ GuestsIconName } title={'Guest User'} />
                <span style={{ fontSize: iconTextSize }}>Guest</span>
              </div>;

    return (
      <DocumentCard
        className={ docCardClass }
        type={DocumentCardType.normal}

        //2020-11-24:  Added for adjusting card size
        style={{ height: this.getCardHeight(), minWidth: this.getCardWidth(), maxWidth: this.getCardWidth() } }
      >
        <div className={ styles.persona }>
          <Persona
            text={this.props.profileProperties.DisplayName}
            secondaryText={this.props.profileProperties.Title}
            tertiaryText={this.props.profileProperties.Department}
            imageUrl={this.props.profileProperties.PictureUrl}
            size={ this.props.size }
            imageShouldFadeIn={true}
            imageShouldStartVisible={true}
          >  <div className={ styles.inlineFlex }> { AdminIcon } { GuestIcon } </div>
            {this.props.profileProperties.WorkPhone ? (
              <div>
                <Icon iconName="Phone" style={{ fontSize: '12px' }} />
                <span style={{ marginLeft: 5, fontSize: '12px' }}>
                  {' '}
                  {this.props.profileProperties.WorkPhone}
                </span>
              </div>
            ) : (
                ''
              )}
            {this.props.profileProperties.Location ? (
              <div className={styles.textOverflow}>
                <Icon iconName="Poi" style={{ fontSize: '12px' }} />
                <span style={{ marginLeft: 5, fontSize: '12px' }}>
                  {' '}
                  {this.props.profileProperties.Location}
                </span>
              </div>
            ) : (
                ''
              )}
          </Persona>
        </div>
      </DocumentCard>
    );
  }
  /**
   * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
   * @param componentId - componentId, guid of the component library
   */
  private async _loadSPComponentById(componentId: string): Promise<any> {
    try {
      const component: any = await SPComponentLoader.loadComponentById(
        componentId
      );
      return component;
    } catch (error) {
      Promise.reject(error);
      Log.error(EXP_SOURCE, error, this.props.context.serviceScope);
    }
  }

  /**
   *
   *
   * @returns {React.ReactElement<IPersonaCardProps>}
   * @memberof PersonaCard
   */
  public render(): React.ReactElement<IPersonaCardProps> {

    return (
      //2020-11-24:  Added for adjusting card size
      <div className={styles.personaContainer} style={{ minWidth: this.getCardWidth(), maxWidth: this.getCardWidth() }}>
        {this.state.livePersonaCard
          ? this._LivePersonaCard()
          : this._PersonaCard()}
      </div>
    );
  }
}

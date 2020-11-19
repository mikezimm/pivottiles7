import * as React from 'react';
import styles from './Grid.module.scss';
import { IGridProps, IGridState } from './Grid.types';
import { ISize } from 'office-ui-fabric-react/lib/Utilities';

// Used to render document cards
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardLocation,
  DocumentCardType
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';

import { GridLayout } from './../gridLayout/index';

export default class Grid extends React.Component<IGridProps, IGridState> {
  constructor(props: IGridProps) {
    super(props);

    this.state = {
      items:  []
    };
  }

  public render(): React.ReactElement<IGridProps> {
    return (
      <div className={styles.grid}>
        <GridLayout
          items={this.props.items}
          onRenderGridItem={(item: any, finalSize: ISize, isCompact: boolean) => this._onRenderGridItem(item, finalSize, isCompact)}
        />
      </div>
    );
  }

  private _onRenderGridItem = (item: any, finalSize: ISize, isCompact: boolean): JSX.Element => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: item.thumbnail,
          imageFit: ImageFit.cover,
          height: 130,
          linkProps: {href: item.thumbnail}
        }
      ]
    };

    return <div
      className={styles.documentTile}
      data-is-focusable={true}
      role="listitem"
      aria-label={item.title}
    >
      {/* onClick={(ev: React.SyntheticEvent<HTMLElement>) => alert(ev)} */}
      <DocumentCard
        type={isCompact ? DocumentCardType.compact : DocumentCardType.normal}
        onClick={(ev: React.SyntheticEvent<HTMLElement>) => this.onLinkClick(item)}
      >
        <DocumentCardPreview {...previewProps} />
        {!isCompact && <DocumentCardLocation location={item.location} />}
        <DocumentCardDetails>
          <DocumentCardTitle
            title={item.title}
            shouldTruncate={true}
          />
          <DocumentCardActivity
            activity={item.activity}
            people={[{ name: item.name, profileImageSrc: item.profileImageSrc }]}
          />
        </DocumentCardDetails>
      </DocumentCard>
    </div>;
  }
/*
onLinkClick= { this.onLinkClick.bind(this) }

*/

  public onLinkClick(item): void {
    let e: any = event;
    console.log('onLinkClickX');
    console.log('this', item);
    console.log('event', e);   
    if (e.shiftKey) {
      if (e.altKey) {
        if (e.ctrlKey) {      
          window.open(item.listWebURL, '_blank');
          event.preventDefault();
          return ;
        }
      }
    }

    if (item.href){
      window.open(item.href, item.target);
      event.preventDefault();
    }

    return ;

/*
    if (event.ctrlKey) {      
      window.open(item.href, item.props.target);
      event.preventDefault();
      return
    }

    if (event.shiftKey) {
      if (event.altKey) {
        if (event.ctrlKey) {      
          window.open(this.props.listWebURL, '_blank');
          event.preventDefault();
          return ;
        }
      }
    }
    */
  }

}

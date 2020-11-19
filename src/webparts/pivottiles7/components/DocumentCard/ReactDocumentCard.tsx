import * as React from 'react';
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
//import { TestImages } from '@uifabric/example-data';

export class DocumentCardBasicExample extends React.PureComponent {
    

  public render(): JSX.Element {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
          linkProps: {
            href: 'http://bing.com',
            target: '_blank'
          },
//          previewImageSrc: TestImages.documentPreview,
 //         iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        }
      ]
    };

    return ;   }


}


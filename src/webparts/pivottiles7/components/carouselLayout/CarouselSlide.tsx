import * as React from 'react';
import styles from './CarouselSlide.module.scss';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { ICarouselSlideProps, ICarouselSlideState } from './CarouselSlide.types';

export class CarouselSlide extends React.Component<ICarouselSlideProps, ICarouselSlideState> {

  public constructor(props:ICarouselSlideProps){
    super(props);

  }

  private onLinkClick = (item: ICarouselSlideProps): void => {
    if (this.props.href){
      window.open(this.props.href, '_blank');
      event.preventDefault();
    }
    return ;
  } //End onClick

  public render(): React.ReactElement<ICarouselSlideProps> {
    const { imageSrc, title, location, height, width, onClick, href, target } = this.props;
    return (
      <div className={styles.carouselSlideWrapper}>
        {/*<span role="button" onClick={(_event) => { onClick(); }}>*/}
        <span role="button"  onClick={this.onLinkClick.bind(this)}>
          <div className={styles.carouselSlide} role="link" data-is-draggable="false" data-is-focusable="true" data-selection-invoke="true"
            style={{ width: '100%', minHeight: `${height}px` }}
          >
            <div className={styles.carouselSlideContent}>
              <div className={styles.carouselSlideFileContainer}>
                <div className={styles.carouselSlideThumbnail}>

                  {/*//Added this as a function to accomodate handling item links*/}
                  {buildLink(this.props)}

                  {/*<Image src={imageSrc} width={width} height={height} imageFit={ImageFit.centerCover} />*/}
                </div>
                <div className={styles.carouselSlideNamePlate}>
                  <div className={styles.carouselSlideName}>
                    {title}
                  </div>
                  <div className={styles.carouselSlideSubText}>
                    {location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    );
  }

}


/*//Added this as a function to accomodate handling item links*/
export function  buildLink(thisProps){

  const { imageSrc, height, width, target, href } = thisProps;

  let link: any;

  if (href) {
    link=
      <a href={href}
      target={target}
      >
        <Image src={imageSrc} width={width} height={height} imageFit={ImageFit.centerCover} />
      </a>;
  } else {
    link=
      <Image src={imageSrc} width={width} height={height} imageFit={ImageFit.centerCover} />;
  }

  return link;

}





export interface ICarouselLayoutProps {
  ariaLabel?: string;
  pagingTemplate?: string;
  items: ICarouselItem[];
  heroRatio: number;
  onSlideClick?: (currentIndex: number) => void;
  onBeforeChange?: (currentIndex: number) => void;
  onAfterChange?: (currentIndex: number) => void;
 }

export interface ICarouselLayoutState {
  currentSlide: number;
  width: number;
  height: number;
 }

 export interface ICarouselItem {
  imageSrc: string;
  title: string;
  location: string;
  //Added to make it easier for opening based on parent item link
  href?: string;
  target?: string;
 }

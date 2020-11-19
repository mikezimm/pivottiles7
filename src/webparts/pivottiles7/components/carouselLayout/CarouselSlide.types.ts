export interface ICarouselSlideProps {
  imageSrc: string;
  title: string;
  location: string;
  height: number;
  width: number;
  href?: string;
  target?: string;
  onClick?: () => void;
}

export interface ICarouselSlideState { }

import 'framer-motion';
import type { MotionProps } from 'framer-motion';

declare module 'framer-motion' {
  export type HTMLMotionUlProps = React.HTMLAttributes<HTMLUListElement> & MotionProps;
  export type HTMLMotionAsideProps = React.HTMLAttributes<HTMLElement> & MotionProps;
  export type HTMLMotionDivProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;
  export type HTMLMotionSvgProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;
}

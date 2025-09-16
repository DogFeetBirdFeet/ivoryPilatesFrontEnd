import 'framer-motion';
import type { MotionProps } from 'framer-motion';

declare module 'framer-motion' {
  export type HTMLMotionUlProps = React.HTMLAttributes<HTMLUListElement> & MotionProps;
}

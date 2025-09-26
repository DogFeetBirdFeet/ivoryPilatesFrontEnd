import { useOutletContext as useRouterOutletContext } from 'react-router-dom';

interface LayoutContextType {
  setHeaderTitle: (title: string) => void;
  setHeaderIcon: (icon: string) => void;
}

export function useLayoutContext() {
  return useRouterOutletContext<LayoutContextType>();
}

export type { LayoutContextType };

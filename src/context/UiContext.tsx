import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface UiContextValue {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const UiContext = createContext<UiContextValue | null>(null);

interface UiProviderProps {
  children: ReactNode;
}

export function UiProvider({ children }: UiProviderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback((): void => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback((): void => setIsDrawerOpen(false), []);

  const value = useMemo<UiContextValue>(
    () => ({ isDrawerOpen, openDrawer, closeDrawer }),
    [isDrawerOpen, openDrawer, closeDrawer],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi(): UiContextValue {
  const context = useContext(UiContext);

  if (!context) {
    throw new Error('useUi must be used inside UiProvider');
  }

  return context;
}

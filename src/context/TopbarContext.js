import { createContext } from 'react';

export const TopbarContext = createContext({
  title: '',
  subtitle: '',
  setTitle: () => {},
  setSubtitle: () => {},
});

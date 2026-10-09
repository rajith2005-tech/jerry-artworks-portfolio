import React, { useState, createContext, useContext, ReactNode } from 'react';
import { CursorState } from '../types';

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  cursorLabel: string;
  setCursorLabel: (label: string) => void;
  setCursorContext: (state: CursorState, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorState: 'default',
  setCursorState: () => {},
  cursorLabel: '',
  setCursorLabel: () => {},
  setCursorContext: () => {},
  resetCursor: () => {},
});

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');

  const setCursorContext = (state: CursorState, label = '') => {
    setCursorState(state);
    setCursorLabel(label);
  };

  const resetCursor = () => {
    setCursorState('default');
    setCursorLabel('');
  };

  return (
    <CursorContext.Provider
      value={{
        cursorState,
        setCursorState,
        cursorLabel,
        setCursorLabel,
        setCursorContext,
        resetCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export function useCursor(): CursorContextType {
  return useContext(CursorContext);
}

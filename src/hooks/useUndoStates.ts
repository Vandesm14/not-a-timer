import React from 'react';

export type UndoStatesHook<T> = {
  undo: (setState: (state: T) => void) => boolean;
  redo: (setState: (state: T) => void) => boolean;
  canUndo: boolean;
  canRedo: boolean;
  clear: () => void;
  addState: (state: T) => void;
  currentState: T;
};

const useUndoStates = <T>(): UndoStatesHook<T> => {
  const [undoStates, setUndoStates] = React.useState<T[]>([]);
  const [undoIndex, setUndoIndex] = React.useState(0);

  const canUndo = React.useMemo(() => undoIndex > 0, [undoIndex]);
  const canRedo = React.useMemo(
    () => undoIndex < undoStates.length,
    [undoIndex, undoStates]
  );

  const undo = React.useCallback(
    (setState: (state: T) => void) => {
      console.log({
        undoIndex,
        undoStates,
      });
      if (undoIndex > 0) {
        setUndoIndex(undoIndex - 1);
        setState(undoStates[undoIndex - 1]);

        return true;
      }

      return false;
    },
    [undoIndex, undoStates, setUndoIndex]
  );

  const redo = React.useCallback(
    (setState: (state: T) => void) => {
      if (undoIndex < undoStates.length) {
        setUndoIndex(undoIndex + 1);
        setState(undoStates[undoIndex]);

        return true;
      }

      return false;
    },
    [undoIndex, undoStates, setUndoIndex]
  );

  const clear = React.useCallback(() => {
    setUndoStates([]);
    setUndoIndex(0);
  }, [setUndoStates, setUndoIndex]);

  const addState = React.useCallback(
    (state: T) => {
      console.log('addState', state, undoIndex, undoStates);
      setUndoStates((undoStates) => [...undoStates.slice(0, undoIndex), state]);
      setUndoIndex(undoIndex + 1);
    },
    [undoStates, undoIndex, setUndoStates, setUndoIndex]
  );

  const currentState = React.useMemo(
    () => undoStates[undoIndex],
    [undoStates, undoIndex]
  );

  return {
    undo,
    redo,
    canUndo,
    canRedo,
    clear,
    addState,
    currentState,
  };
};

export default useUndoStates;

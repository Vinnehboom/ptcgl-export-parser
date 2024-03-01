import { createContext, Dispatch, SetStateAction } from "react";

export type replayContextType = {
  ptcgImport: string | undefined;
  playerName: string | undefined;
  setPtcgImport: Dispatch<SetStateAction<string>>;
  setPlayerName: Dispatch<SetStateAction<string>>;
};

const defaultReplayContextValue: replayContextType = {
  ptcgImport: undefined,
  playerName: undefined,
  setPtcgImport: () => {
     throw {
      name: 'NotImplementedError',
      message:
        'setPtcgImport should be overridden by a useState setter or similar in the component that uses the ReplayContext Provider.'
    }
  },
  setPlayerName: () => {
    throw {
        name: 'NotImplementedError',
        message:
          'setPlayerName should be overridden by a useState setter or similar in the component that uses the ReplayContext Provider.'
      }
  },
};
export const ReplayContext = createContext<replayContextType>(
  defaultReplayContextValue,
);

import React from "react";

const context = {
  isAmp: false,
  setIsAmp(isAmp) {
    this.isAmp = Boolean(isAmp);
  },
};

export const AmpContext = React.createContext(context);

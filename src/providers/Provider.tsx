import React, { createContext, useContext } from 'react';

export function GenericProvider<Params, T>(
  initializer: (params: Params) => T,
  initial: T
): [React.FC<Params>, () => typeof initial] {
  const genericContext = createContext<T>(initial);

  const Provider: React.FC<Params> = (props) => {
    const value = initializer(props);
    return <genericContext.Provider value={value}>{props.children}</genericContext.Provider>;
  };

  const hook = () => useContext(genericContext);
  return [Provider, hook];
}

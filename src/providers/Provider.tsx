import React, { createContext, useContext, useMemo } from 'react';

export function ProviderBase<T, Params>(
  initializer: (params: Params) => T,
  initial: T
): [React.FC<Params>, () => T] {
  const analitycsContext = createContext<T>(initial);

  const Provider: React.FC<Params> = (props) => {
    const value = useMemo(() => initializer(props), []);
    return <analitycsContext.Provider value={value}>{props.children}</analitycsContext.Provider>;
  };

  const hook = () => useContext(analitycsContext);
  return [Provider, hook];
}

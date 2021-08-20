import React, {useEffect, useState} from 'react';
import {EmitterSubscription, Keyboard, Platform} from 'react-native';

interface iContextoTeclado {
  tecladoVisivel: boolean;
}

export const ContextoTeclado = React.createContext({} as iContextoTeclado);

type iContextoTecladoProvider = {
  children: React.ReactNode;
};

const ContextoTecladoProvider: React.FC<iContextoTecladoProvider> = ({
  children,
}) => {
  const [tecladoVisivel, setTecladoVisivel] = useState(true);

  useEffect(() => {
    let listenerEventosTeclado: EmitterSubscription[] = [];

    if (Platform.OS === 'android') {
      listenerEventosTeclado = [
        Keyboard.addListener('keyboardDidShow', () => setTecladoVisivel(false)),
        Keyboard.addListener('keyboardDidHide', () => setTecladoVisivel(true)),
      ];
    }

    return () => {
      if (Platform.OS === 'android') {
        listenerEventosTeclado &&
          listenerEventosTeclado.forEach(eventListener =>
            eventListener.remove(),
          );
      }
    };
  }, []);

  return (
    <ContextoTeclado.Provider
      value={{
        tecladoVisivel,
      }}>
      {children}
    </ContextoTeclado.Provider>
  );
};

export default ContextoTecladoProvider;

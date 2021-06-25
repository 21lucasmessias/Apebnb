import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { Rotas } from './src/rotas';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Rotas);

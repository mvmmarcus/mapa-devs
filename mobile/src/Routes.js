import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import 'react-native-gesture-handler';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main, //sempre tem que ter o msm nome
            navigationOptions: { // se der um ctrl+space aqui dentro, vc consegue ver todas as opções
                title: 'DevRadar',
                headerTitleAlign: 'center',
            }
        },
        Profile: {
            screen: Profile, //sempre tem que ter o msm nome
            navigationOptions: { // se der um ctrl+space aqui dentro, vc consegue ver todas as opções
                title: 'Perfil do Github'
            }
        },
    }, {
        defaultNavigationOptions: { //opções aplicadas a todas a telas
            headerStyle: { //Aqui ele aceita todas as estilizações do CSS - Essa é a estilização do container Header (ou seja, não da para fazer alterações em textos por exemplo)
                backgroundColor: '#7D40E7',

            },
        },
    })
);

export default Routes;
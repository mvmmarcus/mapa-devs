import MapView, { Marker, Callout } from 'react-native-maps';
// Callout: Responsavel por tudo que aparece no Marker
import React, { useEffect, useState } from 'react';
import { StyleSheet, PermissionsAndroid, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';

import api from '../services/api';

// navigation: resposável pela navegação das pagins do app
function Main({ navigation }) {  
  const [devs, setDevs] = useState([]); // Array vazio pq serao varios devs
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    position => {     
                      setCurrentRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004,
                      });
                    },
                    error => {
                      console.log(error.code, error.message);
                    },
                    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
                  );
            }
          } catch (err) {
            console.warn(err);
          }
        }
    console.log(currentRegion);
    loadInitialPosition();
  }, []);
  
  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', { //'search' pq la no insominia foi essa a rota que usamos para buscar os devs 
      params: {
        latitude,
        longitude,
        techs
      }
    })
      
    setDevs(response.data.devs); // pega todos os dados que vierem atraves da resposta de api
  }

  function handleRegionChange(region) {
    // identificar quando o user mexer no mapa
   // toda vez que mexer no mapa, me dará as novas coordenadas
    setCurrentRegion(region);
  }

  return (
    <>
      <MapView
      zoomControlEnabled={true}
      onRegionChangeComplete={handleRegionChange} 
      initialRegion={currentRegion} 
      style={styles.map}
      >
        {devs.map(dev => (      
          <Marker
            key={dev._id} //toda vez que usa o map tem que ter essa key - funciona como um identificador unico 
            coordinate={{ 
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1], 
            }}
          >
            <Image 
              style={styles.avatar} 
              source={{ uri: dev.avatar_url }}
            /> 
            <Callout onPress={() => {
              // A air function será responsável pela navegação das rotas
              navigation.navigate('Profile', { github_username: dev.github_username });
            }}>
              <View style={styles.callout} >
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ') /* demos um join pq o dev pode ter varias techs */}</Text> 
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {/* Como o input onde buscaremos os devs ficara em cima do mapa, nao é legal criar esse input na MapView */}
      <View style={styles.searchForm}>
        <TextInput 
        style={styles.searchInput}
        placeholder="Buscar devs por techs..." //ao deixar o mouse em cima
        placeholderTextColor="#999"
        autoCapitalize="words" //Deixará a primeira letra de cada palavra em caixa alta
        autoCorrect={false}
        value={techs}
        onChangeText={setTechs}
        />

        <TouchableOpacity onPress={loadDevs} style={styles.loadButton} >
          <Icon name="my-location" size={20} color="#fff" />
        </TouchableOpacity>             
      </View> 
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius:50,
    borderWidth: 4,
    borderColor: '#f00'
  },
  devName: {
    fontWeight: 'bold', //Negrito
    fontSize: 16,
  },
  callout: {
    width: 260
  },
  devBio: {
    color: '#666',
    marginTop: 5, // Distancia do texto de cima
  },
  devTechs: {
    marginTop: 5
  },
  searchForm: {
    position: 'absolute', // ser 'absoluto' na linha (flutuar na tela)
    top: 20, // bottom: 20, distancia de 20px do final da tela 
//  bottom: 20, distancia de 20px do final da tela  (m)
    left: 20, 
    right: 20,
    zIndex: 5, // forçar que fique por cima do mapa
    flexDirection: 'row', // similar a latitude e longitude - ocupa metade da tela
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    elevation: 3 // efeito de sombra
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    justifyContent: 'center', // Justify e align juntos fazem o buttom ficar totalmente no centro
    alignItems: 'center',
    marginLeft: 15 // Distancia do input
  }
});

export default Main;
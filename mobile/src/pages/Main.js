import MapView from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';

import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
});

function Main() {  
    const [currentRegion, setCurrentRegion] = useState(null);

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
  
  return (
    <MapView initialRegion={currentRegion} style={styles.map}>

    </MapView>
  );
}

export default Main;

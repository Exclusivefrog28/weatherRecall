import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Portal, FAB, Dialog, Button, TextInput, IconButton, Searchbar, Divider, List } from 'react-native-paper';
import { LocationContext } from '../context/LocationContext';
import GetLocation from 'react-native-get-location';
import axios from 'axios';

const Settings = () => {

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [locVisible, setLocVisible] = useState(false);
  const showLocDialog = () => setLocVisible(true);
  const hideLocDialog = () => setLocVisible(false);

  const { location, setLocation } = useContext(LocationContext);

  const [cities, setCities] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false);

  const renderItem = ({ item }) => (
    <CityItem item={item}/>
  );

  const CityItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.country}
      left={props => <List.Icon {...props} icon="earth"/>}
      onPress={() => setLocation({lat: item.latitude.toFixed(2), long:item.longitude.toFixed(2)})}
    />
  );

  const search = query => {
    setSearchLoading(true);
    axios.get('https://geocoding-api.open-meteo.com/v1/search?name=' + query + '&count=3').then(
      (response) => {
        setCities(response.data.results);
        setSearchLoading(false);
      }
    );
  };

  return (
    <>
      <FAB.Group
        open={open}
        visible
        variant="secondary"
        icon="cog"
        actions={[
          { icon: 'map-marker-outline', label: 'Location', onPress: showLocDialog },
        ]}
        onStateChange={onStateChange} />
      <Portal>
        <Dialog visible={locVisible} onDismiss={hideLocDialog}>
          <Dialog.Title>Location Settings</Dialog.Title>
          <Dialog.Content >
            <View style={styles.coordinates}>
              <TextInput label="Latitude" mode="outlined" value={location.lat}
                onChangeText={text => setLocation({ lat: text, long: location.long })} style={styles.textInput} />
              <TextInput label="Longitude" mode="outlined" value={location.long}
                onChangeText={text => setLocation({ lat: location.lat, long: text })} style={styles.textInput} />
              <IconButton mode="contained" icon="crosshairs-gps" size={28} style={styles.locationButton} labelStyle={styles.locationIcon}
                onPress={() => {
                  GetLocation.getCurrentPosition({ enableHighAccuracy: false, timeout: 15000 })
                  .then(newLocation => { setLocation({ lat: parseFloat(newLocation.latitude).toFixed(4), long: parseFloat(newLocation.longitude).toFixed(4) }); console.log(newLocation); })
                  .catch(error => { console.warn(error); });
                }} />
            </View>
            <Divider />
            <View style={styles.placename}>
              <Searchbar placeholder="Search by city name" onChangeText={search} loading={searchLoading} />
              <FlatList
                data={cities}
                extraData={cities}
                renderItem={renderItem} />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideLocDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = new StyleSheet.create({
  coordinates: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 10 },
  textInput: { flex: 3, marginHorizontal: 5 },
  locationButton: { flex: 1 },
  city: {},
});

export default Settings;

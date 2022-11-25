import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Dialog, Button, TextInput, IconButton, Searchbar, Divider, List } from 'react-native-paper';
import { LocationContext } from '../../context/LocationContext';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LocationDialog = ({ isVisible, hide }) => {

    const { location, setLocation } = useContext(LocationContext);
    const [locCandidate, setLocCandidate] = useState(location);
    const [cities, setCities] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        setLocCandidate(location);
    }, [location]);

    const renderItem = ({ item }) => (
        <CityItem item={item} />
    );

    const CityItem = ({ item }) => (
        <List.Item
            title={item.name}
            description={item.country}
            left={props => <List.Icon {...props} icon="earth" />}
            onPress={() => setLocCandidate({ lat: item.latitude.toFixed(2), long: item.longitude.toFixed(2) })}
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

    const save = () => {
        if (location !== locCandidate) {
            setLocation(locCandidate);
            AsyncStorage.setItem('location', JSON.stringify(locCandidate));
            SplashScreen.show();
        }
        hide();
    };

    return (
        <Dialog visible={isVisible} onDismiss={hide} dismissable={false}>
            <Dialog.Title>Location Settings</Dialog.Title>
            <Dialog.Content >
                <View style={styles.coordinates}>
                    <TextInput label="Latitude" mode="outlined" value={locCandidate.lat}
                        onChangeText={text => setLocation({ lat: text, long: locCandidate.long })} style={styles.textInput} />
                    <TextInput label="Longitude" mode="outlined" value={locCandidate.long}
                        onChangeText={text => setLocation({ lat: locCandidate.lat, long: text })} style={styles.textInput} />
                    <IconButton mode="contained" icon="crosshairs-gps" size={28} style={styles.locationButton} labelStyle={styles.locationIcon}
                        onPress={() => {
                            GetLocation.getCurrentPosition({ enableHighAccuracy: false, timeout: 15000 })
                                .then(newLocation => { setLocCandidate({ lat: parseFloat(newLocation.latitude).toFixed(4), long: parseFloat(newLocation.longitude).toFixed(4) }); console.log(newLocation); })
                                .catch(error => { console.warn(error); });
                        }} />
                </View>
                <Divider />
                <View style={styles.placename}>
                    <Searchbar placeholder="Search by city name" onChangeText={search} loading={searchLoading} />
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        data={cities}
                        extraData={cities}
                        renderItem={renderItem} />
                </View>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hide}>Cancel</Button>
                <Button onPress={save}>Save</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

const styles = new StyleSheet.create({
    coordinates: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 10 },
    textInput: { flex: 3, marginHorizontal: 5 },
    locationButton: { flex: 1 },
    city: {},
});

export default LocationDialog;

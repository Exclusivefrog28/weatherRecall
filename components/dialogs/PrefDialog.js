import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Button, Text, SegmentedButtons, TextInput, HelperText } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrefContext } from '../../context/PrefContext';


const PrefDialog = ({ isVisible, hide }) => {

    const { preferences, setPreferences } = useContext(PrefContext);
    const [localPref, setLocalPref] = useState(preferences);

    useEffect(() => {
        setLocalPref(preferences);
    }, [preferences]);

    const save = () => {
        if (!textHasErrors()) {
            if (preferences !== localPref) {
                if (preferences.numOfYears !== localPref.numOfYears) { SplashScreen.show(); }
                setPreferences(localPref);
                AsyncStorage.setItem('preferences', JSON.stringify(localPref));
            }
            hide();
        }
    };

    const textHasErrors = () => {
        let num = parseInt(localPref.numOfYears, 10);
        if (isNaN(localPref.numOfYears) || isNaN(num)) { return true; }
        return (num < 1 || num > 60);
    };

    return (
        <Dialog visible={isVisible} onDismiss={hide} dismissable={false}>
            <Dialog.Title>Preferences</Dialog.Title>
            <Dialog.Content >
                <Text style={styles.text}>Temperature units:</Text>
                <SegmentedButtons
                    value={localPref.tempUnit}
                    onValueChange={(value) => setLocalPref({ ...localPref, tempUnit: value })}
                    style={styles.buttons}
                    density="small"
                    buttons={[
                        {
                            value: '°C',
                            icon: 'temperature-celsius',
                        },
                        {
                            value: '°F',
                            icon: 'temperature-fahrenheit',
                        },
                        {
                            value: ' K',
                            icon: 'temperature-kelvin',
                        },
                    ]}
                />
                <Text style={styles.text}>Precipitation units:</Text>
                <SegmentedButtons
                    value={localPref.precipUnit}
                    onValueChange={(value) => setLocalPref({ ...localPref, precipUnit: value })}
                    style={styles.buttons}
                    density="small"
                    buttons={[
                        {
                            value: 'mm',
                            label: 'Millimeters',
                        },
                        {
                            value: 'inch',
                            label: 'Inches',
                        },
                    ]}
                />
                <Text style={styles.text}>Number of previous years:</Text>
                <TextInput style={styles.input}
                    mode="outlined"
                    value={localPref.numOfYears}
                    onChangeText={text => setLocalPref({ ...localPref, numOfYears: text })} />
                <HelperText
                    style={styles.input}
                    type="error"
                    visible={textHasErrors()}>
                    Invalid value.
                </HelperText>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hide}>Cancel</Button>
                <Button onPress={save}>Save</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

const styles = new StyleSheet.create({
    text: {},
    buttons: { padding: 10, alignSelf: 'center' },
    locationButton: { flex: 1 },
    input: { width: '30%', alignSelf: 'center' },
});

export default PrefDialog;

import React, { useState } from 'react';
import { StyleSheet, FlatList, Linking } from 'react-native';
import { Dialog, Button, Text, List, Portal, useTheme } from 'react-native-paper';
import LicenseDialog from './LicenseDialog';
import licenses from './licenses.json';

const Item = ({ item }) => {
    const [licenseVisible, setLicenseVisible] = useState(false);
    return (<>
        <List.Item title={item.name} onPress={() => { setLicenseVisible(true); }} style={styles.item} />
        <Portal>
            <LicenseDialog isVisible={licenseVisible} hide={() => { setLicenseVisible(false); }} name={item.name} body={item.body} />
        </Portal>
    </>);
};

const AboutDialog = ({ isVisible, hide }) => {

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return (
        <Dialog visible={isVisible} onDismiss={hide}>
            <Dialog.Icon icon="information-outline" />
            <Dialog.Title style={styles.title}>About</Dialog.Title>
            <Dialog.Content >
                <Text style={styles.text1} variant="labelLarge">© 2022 Copyright WeatherRecall</Text>
                <Text style={{...styles.text1, color: useTheme().colors.primary}} variant="labelLarge"
                    onPress={()=>Linking.openURL('https://open-meteo.com')}>
                    Weather data by Open-Meteo.com</Text>
                <Text style={styles.text2} variant="labelLarge">Open source licenses: </Text>
                <FlatList
                    style={styles.list}
                    data={licenses}
                    renderItem={renderItem} />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hide}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

const styles = new StyleSheet.create({
    title: { textAlign: 'center' },
    text1: { alignSelf: 'center', fontSize: 14, marginBottom: 24 },
    text2: { alignSelf: 'center', fontSize: 14 },
    list: { height: 300 },
    item: { borderBottomColor: '#00000010', borderBottomWidth: 2 },
});

export default AboutDialog;

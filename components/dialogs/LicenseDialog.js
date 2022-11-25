import React from 'react';
import {  StyleSheet, ScrollView } from 'react-native';
import { Dialog, Button, Text} from 'react-native-paper';

const AboutDialog = ({ isVisible, hide, name, body}) => {

    return (
        <Dialog visible={isVisible} onDismiss={hide}>
            <Dialog.Title style={styles.title}>{name}</Dialog.Title>
            <Dialog.ScrollArea>
          <ScrollView style={styles.list} contentContainerStyle={styles.container}>
            <Text style={styles.text}>{body}</Text>
          </ScrollView>
        </Dialog.ScrollArea>
            <Dialog.Actions>
                <Button onPress={hide}>Close</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

const styles = new StyleSheet.create({
    title: { textAlign: 'center'},
    list: {height: 400},
    container: {padding: 10},
    text: {fontSize: 14, textAlign: 'justify'},
});

export default AboutDialog;

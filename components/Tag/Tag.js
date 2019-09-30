import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'; 

const Tag = ({name, onPress}) => (
    <TouchableHighlight style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{name}</Text>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 3
    },
    text: {
        color: '#34B9A0',
        padding: 8,
        
    }
})

export default Tag;
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'; 
import Moment from 'moment';

const ListItem = ({data}) => (
    <View style={styles.container}>
        <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{uri: data.image}}/>
            <View style={styles.textContainer}>
                <Text style={styles.goods}>{data.goods}</Text>
                <Text style={styles.contnet}>{data.winner}님이 {data.price}원 사용</Text>
                <Text style={styles.date}>{Moment(Date(data.date)).format('YYYY.MM.DD')}</Text>
            </View>
        </View>
    </View>
)

const styles = StyleSheet.create({
    thumb: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    goods: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5
    },
    contnet: {
        fontSize: 10,
        fontWeight: '500',
        color: '#ffffff',
        marginBottom: 5
    },
    date: {
        fontSize: 8,
        fontWeight: '300',
        color: '#ffffff'
    },
    rowContainer: {
        flexDirection: 'row',
        paddingTop: 10,
    }
})

export default ListItem;
import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableHighlight, ScrollView, StatusBar, Modal } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { ListItem, Tag } from '../../components' 
import firebase from '../../firebase';

export default class ListScreen extends React.Component {
    state = {
        data: [],
        isLoading: false,
        isModalVisible: false,
        keyword: '',
        name: '',
        goods: '',
        image: '',
        participant: '',
        price: '',
        winner: ''
    }

    componentDidMount(){
        this.getFirebaseData();
    }

    getFirebaseData(){
        const db = firebase.firestore();
        let listRef = db.collection("List");

        this.setState({
            isLoading: true
        })
        
        if(this.state.name != ''){
            listRef.where('winner', '==', this.state.name).orderBy('date', 'desc').get().then(QuerySnapshot => {
                let dataSet = QuerySnapshot.docs.map(doc => doc.data());
    
                this.setState({
                    data: dataSet
                });
            })
        }else{
            listRef.get().then(QuerySnapshot => {
                let dataSet = QuerySnapshot.docs.map(doc => doc.data());
    
                this.setState({
                    data: dataSet
                });
            })
        }

        this.setState({
            isLoading: false
        })
    }

    setFirebaseData(){
        const db = firebase.firestore();
        let listRef = db.collection("List");

        listRef.doc().set({
            goods: this.state.goods,
            image: this.state.image,
            participant: this.state.participant,
            price: this.state.price,
            winner: this.state.winner,
            date: Date.now(),
        })

        this.setModalVisible(!this.state.isModalVisible);
    }

    setTag(name){
        this.setState({
            name: name
        });
        this.getFirebaseData();
    }

    setModalVisible(visible) {
        this.setState({ isModalVisible: visible });
      }

    render(){
        const { data, isLoading } = this.state;
        const mapToList = (data) => {
            data = data.filter(
                (data) => {
                    return data.winner.indexOf(this.state.keyword) > -1;
                }
            );

            return data.map((data, index) => {
                return <ListItem
                key={index}
                data={data}/>
            })
        }
        
        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Gamble Guide</Text>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isModalVisible}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.searchBar}>
                            <TextInput 
                                style={styles.input}
                                placeholder="내기 품목"
                                placeholderTextColor="#34B9A5"
                                onChangeText={(goods) => this.setState({goods})}
                                value={this.state.goods}/>
                        </View>
                        <View style={styles.searchBar}>
                            <TextInput 
                                style={styles.input}
                                placeholder="참가자수"
                                placeholderTextColor="#34B9A5"
                                onChangeText={(participant) => this.setState({participant})}
                                value={this.state.participant}/>
                        </View>
                        <View style={styles.searchBar}>
                            <TextInput 
                                style={styles.input}
                                placeholder="당첨자"
                                placeholderTextColor="#34B9A5"
                                onChangeText={(winner) => this.setState({winner})}
                                value={this.state.winner}/>
                        </View>
                        <View style={styles.searchBar}>
                            <TextInput 
                                style={styles.input}
                                placeholder="금액"
                                placeholderTextColor="#34B9A5"
                                onChangeText={(price) => this.setState({price})}
                                value={this.state.price}/>
                        </View>
                        <View style={styles.searchBar}>
                            <TextInput 
                                style={styles.input}
                                placeholder="이미지 링크"
                                placeholderTextColor="#34B9A5"
                                onChangeText={(image) => this.setState({image})}
                                value={this.state.image}/>
                        </View>
                        <TouchableHighlight style={styles.button} onPress={() => { this.setFirebaseData() } }>
                            <Text style={styles.buttonText}>전송</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button} onPress={() => { this.setModalVisible(!this.state.isModalVisible) } }>
                            <Text style={styles.cancelText}>취소</Text>
                        </TouchableHighlight>
                    </SafeAreaView>
                </Modal>

                <View style={styles.rowContainer}>
                    <Tag name="우영기" onPress={() => this.setTag("우영기")}/>
                    <Tag name="이인호" onPress={() => this.setTag("이인호")}/>
                    <Tag name="이학성" onPress={() => this.setTag("이학성")}/>
                    <Tag name="김민지" onPress={() => this.setTag("김민지")}/>
                    <Tag name="감다경" onPress={() => this.setTag("감다경")}/>
                    <Tag name="❌" onPress={() => this.setTag("")}/>
                </View>
                <ScrollView style={styles.scroll}>
                    {isLoading ? (<Text>Loading...</Text>) : (mapToList(data))}
                </ScrollView>
                <TouchableHighlight style={styles.write} onPress={() => {this.setModalVisible(!this.state.isModalVisible);}}>
                    <Octicons
                        name='pencil'
                        color='#34B9A5'
                        size={20}
                    />
                </TouchableHighlight>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34B9A5',
        marginTop: StatusBar.currentHeight
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    scroll: {
        flex: 1,
        width: '100%',
        marginLeft: 10,
    },
    input: {
        width: '100%', 
        height: 30,
        color: '#000000',
        margin: 5,
        fontSize: 12
    },
    searchBar: {
        width: '90%', 
        marginTop: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
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
        marginTop: 15,
        width: '90%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#34B9A5',
    },
    cancelText: {
        color: '#e74c3c'
    },
    write: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        width: 40, 
        height: 40,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 40/2, 
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
    
})
import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    ToastAndroid
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {getAllPlayers} from '../Controller/PlayerController';
import {Picker} from '@react-native-community/picker';

export default class SearchPlayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            realm: getAllPlayers(),
            refreshing: false,
            searchTxt: null,
            temp: [],
            platform: '',
        };
    }

    handleRefresh = () => {

        this.setState({
            // refreshing: true,
        }, () => {
            getAllPlayers();
        });
    };

    updateSearch = (searchTxt) => {

        fetch('https://r6.apitab.com/search/uplay/jameskitt616')
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch', responseJson);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        dataSource: responseJson,
                    });
                }, 10000);

            })
            .catch(error => ToastAndroid.show(error));

        // this.setState({searchTxt}, () => {
        //     if ('' === searchTxt) {
        //         this.setState({
        //             realm: getAllPlayers(),
        //         });
        //     } else {
        //         this.setState({
        //             realm: this.state.temp.filter(function (user) {
        //                 if (user.name.toLowerCase().includes(searchTxt.toLowerCase())) {
        //                     return user.name;
        //                 }
        //             }).map(function (users) {
        //                 return users;
        //             }),
        //         });
        //     }
        // });
    };

    updatePlatform = (platform) => {

        //TODO: on change update search
        this.setState({
            platform: platform,
        });
    };

    renderListHeader = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <SearchBar round editable={true} value={this.state.searchTxt} onChangeText={this.updateSearch}
                           placeholder='Search for player'/>
                <View>
                    <Picker
                        selectedValue={this.state.platform}
                        style={{height: 50, width: '100%', margin: 5}}
                        onValueChange={(itemValue, itemIndex) => this.updatePlatform(itemValue)}
                    >
                        <Picker.Item label="PC" value="windows"/>
                        <Picker.Item label="PlayStation" value="playstation"/>
                        <Picker.Item label="Xbox" value="xbox"/>
                    </Picker>
                </View>
            </View>
        </View>;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <FlatList style={{flex: 1, width: '100%'}}
                                      data={this.state.realm}
                                      refreshing={this.state.refreshing}
                                      onRefresh={this.handleRefresh}
                                      ListHeaderComponent={this.renderListHeader}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={({item}) => (
                                          <View style={{backgroundColor: 'white', padding: 20}}>
                                              <Text>Name: {item.name}</Text>
                                              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                  <TouchableOpacity
                                                      style={{alignItems: 'flex-start', marginTop: 5, marginLeft: 10}}
                                                      onPress={() => this.props.navigation.navigate('Edit User', {
                                                          userId: item.id,
                                                      })}>
                                                      <FontAwesomeIcon icon={faPen}/>
                                                  </TouchableOpacity>
                                              </View>
                                          </View>
                                      )}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
});

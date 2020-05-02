import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faPen, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {getAllPlayers} from '../Controller/PlayerController';

export default class SearchPlayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            realm: getAllPlayers(),
            refreshing: false,
            searchTxt: null,
            temp: [],
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
        this.setState({searchTxt}, () => {
            if ('' === searchTxt) {
                this.setState({
                    realm: getAllPlayers(),
                });
            } else {
                this.setState({
                    realm: this.state.temp.filter(function (user) {
                        if (user.name.toLowerCase().includes(searchTxt.toLowerCase())) {
                            return user.name;
                        }
                    }).map(function (users) {
                        return users;
                    }),
                });
            }
        });
    };

    renderListHeader = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <SearchBar round editable={true} value={this.state.searchTxt} onChangeText={this.updateSearch}
                           placeholder='Search Player'/>
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

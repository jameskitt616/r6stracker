import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import {getAllPlayers, deletePlayer} from '../Controller/PlayerController';
import { SearchBar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimesCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default class Players extends Component {

    constructor(props) {
        super(props);

        this.state = {
            realm: getAllPlayers(),
            refreshing: false,
            searchTxt: null,
            temp: [],
        };
    }

    componentDidMount() {

        this.setState({temp: getAllPlayers()});
    }

    handleRefresh = () => {

        this.setState({
            // refreshing: true,
        }, () => {
            getAllPlayers();
        });
    };

    removeUser = (user) => {

        // let realm = this.state.realm;
        // this.setState({
        //     realm: realm.slice().filter(realm => realm.id !== user.id),
        // });

        deletePlayer(user);

        this.setState({
            realm: getAllPlayers(),
            temp: getAllPlayers(),
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
                           placeholder='Search players'/>
                <View>
                    <TouchableOpacity style={{backgroundColor: '#232321', padding: 10, margin: 5, borderRadius: 5, alignItems: 'center'}}
                                      onPress={() => this.props.navigation.navigate('Search Player')}>
                        <FontAwesomeIcon icon={faUserPlus} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#3d3c3b'}}>
                            <FlatList style={{flex: 1, width: '100%'}}
                                      data={this.state.realm}
                                      refreshing={this.state.refreshing}
                                      onRefresh={this.handleRefresh}
                                      ListHeaderComponent={this.renderListHeader}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={({item}) => (
                                          <View style={{padding: 20}}>
                                              <Text>Name: {item.name}</Text>
                                              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                  <TouchableOpacity
                                                      style={{alignItems: 'flex-start', marginTop: 5, marginLeft: 10}}
                                                      onPress={() => Alert.alert(
                                                          'Warning',
                                                          `Would you like to remove player: ${item.name} ?`,
                                                          [
                                                              {
                                                                  text: 'Cancel',
                                                                  style: 'cancel',
                                                              },
                                                              {
                                                                  text: 'Yes',
                                                                  onPress: () => this.removeUser(item),
                                                              },
                                                          ],
                                                      )}>
                                                      <FontAwesomeIcon icon={ faTimesCircle } color={"red"}/>
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

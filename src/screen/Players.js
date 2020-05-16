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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle, faUserPlus, faBars } from '@fortawesome/free-solid-svg-icons';

export default class Players extends Component {

    constructor(props) {
        super(props);

        this.state = {
            realm: getAllPlayers(),
            refreshing: false,
        };
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
        });
    };

    renderListHeader = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <View>
                    <TouchableOpacity style={{backgroundColor: '#222222', padding: 10, marginTop: 10, marginLeft: 5, marginRight: 5, borderRadius: 5, alignItems: 'center'}}
                                      onPress={() => this.props.navigation.navigate('Search Player')}>
                        <FontAwesomeIcon icon={faUserPlus} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>;
    };

    noContent = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <View style={{backgroundColor: '#222222', padding: 10, marginTop: 10, marginLeft: 5, marginRight: 5, borderRadius: 5, alignItems: 'center'}}>
                    <Text>No Players added</Text>
                </View>
            </View>
        </View>;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', backgroundColor: '#757575'}}>
                        <TouchableOpacity style={{marginTop: 7, marginBottom: 5, marginLeft: 10}}
                                          onPress={this.props.navigation.openDrawer}>
                            <FontAwesomeIcon icon={ faBars } size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#3d3c3b'}}>
                            <FlatList style={{flex: 1, width: '100%'}}
                                      data={this.state.realm}
                                      refreshing={this.state.refreshing}
                                      onRefresh={this.handleRefresh}
                                      ListEmptyComponent={this.noContent}
                                      ListHeaderComponent={this.renderListHeader}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={({item}) => (
                                          <View style={{padding: 30, backgroundColor: '#222222'}}>
                                              <Text>Name: {item.p_name}</Text>
                                              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                  <TouchableOpacity
                                                      style={{alignItems: 'flex-start', marginTop: 5, marginLeft: 10}}
                                                      onPress={() => Alert.alert(
                                                          'Warning',
                                                          `Would you like to remove player: ${item.p_name} ?`,
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
        backgroundColor: '#3d3c3b',
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
});

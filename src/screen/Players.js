import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert, Image,
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
    componentDidMount(): void {

        //TODO: grab new player stats
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
                    <TouchableOpacity style={{backgroundColor: '#222222', padding: 10, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 5, alignItems: 'center'}}
                                      onPress={() => this.props.navigation.navigate('Search Player')}>
                        <FontAwesomeIcon icon={faUserPlus} size={30} color={'white'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>;
    };

    noContent = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <View style={{backgroundColor: '#222222', padding: 10, marginTop: 10, marginLeft: 10, marginRight: 10, borderRadius: 5, alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>No Players added</Text>
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
                                          <TouchableOpacity style={styles.playerList} onPress={() => this.props.navigation.navigate('Player', {
                                              playerId: item.id,
                                          })}>
                                              <View style={{width: '80%', fontWeight: 'bold'}}>
                                                  <View style={{flexDirection: 'row',}}>
                                                      <View style={{width: '15%'}}>
                                                          {/*TODO: add mapping table for ranks*/}
                                                        <Image source={require('../../android/app/src/main/assets/RANK_500x500Platinum_01.png')} style={{ width: 30, height: 40 }} />
                                                      </View>
                                                      <View style={{width: '85%'}}>
                                                          <Text style={{
                                                              fontSize: 18,
                                                              color: 'white',
                                                              fontWeight: 'bold'
                                                          }}>{JSON.parse(item.player)['p_name']}</Text>
                                                          <Text>
                                                              <Text style={{color: '#757575'}}>lvl: </Text><Text style={{color: 'white'}}>{JSON.parse(item.stats)['level']} </Text>
                                                              <Text style={{color: '#757575'}}>mmr: </Text><Text style={{color: 'white'}}>{JSON.parse(item.ranked)['EU_actualmmr']} </Text>
                                                              <Text style={{color: '#757575'}}>K/D: </Text><Text style={{color: 'white'}}>{JSON.parse(item.ranked)['kd']}</Text>
                                                          </Text>
                                                      </View>
                                                  </View>
                                              </View>
                                              <View style={{width: '20%', alignItems: 'flex-end'}}>
                                                  <TouchableOpacity
                                                      style={{alignItems: 'flex-start', marginTop: 12, marginLeft: 10}}
                                                      onPress={() => Alert.alert(
                                                          'Warning',
                                                          `Would you like to remove player: ${JSON.parse(item.player)['p_name']} ?`,
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
                                                      <FontAwesomeIcon icon={ faTimesCircle } size={20} color={"red"}/>
                                                  </TouchableOpacity>
                                              </View>
                                          </TouchableOpacity>
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
    playerList: {
        flexDirection: 'row',
        padding: 10,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#222222'
    },
});

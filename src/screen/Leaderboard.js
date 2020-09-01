import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert, ToastAndroid,
} from 'react-native';
import {mapPlayerRank} from '../Controller/PlayerController';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle, faUserPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import {bgGrayHard, bgGrayMid, bgGrayLight, grayLight} from '../Enum/colors'
import {API_KEY} from "react-native-dotenv";
import Player from "../Entity/Player";
import {createPlayer} from "../Repository/PlayerRepository";
import {ButtonGroup} from "react-native-elements";

export default class Leaderboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            players: null,
            refreshing: false,
            platform: 'windows',
            region: 'europe',
            selectedIndex: 0,
        };
        this.updateIndex = this.updateIndex.bind(this);
    }

    componentDidMount(): void {

        this.getPlayer();
    }

    handleRefresh = () => {

        this.setState({
            // refreshing: true,
        }, () => {
            this.getPlayer();
        });
    };

    getPlayer = () => {

        fetch(`https://r6.apitab.com/leaderboards/${this.state.platform}/${this.state.region}/?cid=${API_KEY}&u=${this.getCurrentTime}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {


                console.log(responseJson);
                //TODO: foreach op

                // var p = responseJson;
                // var player = new Player(
                //     p['player'].p_id,
                //     JSON.stringify(p['player']),
                //     JSON.stringify(p['custom']),
                //     JSON.stringify(p['refresh']),
                //     JSON.stringify(p['aliases']),
                //     JSON.stringify(p['stats']),
                //     JSON.stringify(p['ranked']),
                //     JSON.stringify(p['social']),
                //     JSON.stringify(p['operators']),
                //     JSON.stringify(p['overlay']),
                //     JSON.stringify(p['history']),
                //     JSON.stringify(p['seasons']),
                //     JSON.stringify(p['op_main']),
                // );

                // this.setState({
                //     players: players,
                // });
            })
            .catch(error => ToastAndroid.show(error));
    };

    updateIndex (selectedIndex) {
        this.setState({selectedIndex});

        //TODO: on change update search
        if (selectedIndex === 0) {
            this.setState({
                platform: 'uplay',
            });
        }
        if (selectedIndex === 1) {
            this.setState({
                platform: 'psn',
            });
        }
        if (selectedIndex === 2) {
            this.setState({
                platform: 'xbl',
            });
        }

        this.fetchSearch();
    }


    renderListHeader = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <View>
                    <TouchableOpacity style={{backgroundColor: bgGrayHard, padding: 10, marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 5, alignItems: 'center'}}
                                      onPress={() => this.props.navigation.navigate('Search player')}>
                        <FontAwesomeIcon icon={faUserPlus} size={30} color={'white'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>;
    };

    noContent = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <View style={{backgroundColor: bgGrayHard, padding: 15, marginTop: 10, marginLeft: 10, marginRight: 10, borderRadius: 5, alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>No players added</Text>
                </View>
            </View>
        </View>;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', backgroundColor: bgGrayLight}}>
                        <TouchableOpacity style={{marginTop: 7, marginBottom: 5, marginLeft: 10}}
                                          onPress={this.props.navigation.openDrawer}>
                            <FontAwesomeIcon icon={ faBars } size={25} />
                        </TouchableOpacity>
                    </View>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={this.state.selectedIndex}
                        buttons={['PC', 'PlayStation', 'Xbox']}
                        textStyle={{color: 'white'}}
                        selectedTextStyle={{color: 'black'}}
                        selectedButtonStyle={{backgroundColor: '#E1FF00'}}
                        containerStyle={{backgroundColor: bgGrayHard, borderColor: bgGrayHard, borderRadius: 5}}
                    />
                    {/*<View style={{flex: 1}}>*/}
                    {/*    <View style={{flex: 1, alignItems: 'center', backgroundColor: bgGrayMid}}>*/}
                    {/*        <FlatList style={{flex: 1, width: '100%'}}*/}
                    {/*                  data={this.state.players}*/}
                    {/*                  refreshing={this.state.refreshing}*/}
                    {/*                  onRefresh={this.handleRefresh}*/}
                    {/*                  ListEmptyComponent={this.noContent}*/}
                    {/*                  ListHeaderComponent={this.renderListHeader}*/}
                    {/*                  keyExtractor={(item, index) => index.toString()}*/}
                    {/*                  renderItem={({item}) => (*/}
                    {/*                      <TouchableOpacity style={styles.playerList} onPress={() => this.props.navigation.navigate('Player', {*/}
                    {/*                          playerId: item.id,*/}
                    {/*                      })}>*/}
                    {/*                          <View style={{width: '80%', fontWeight: 'bold'}}>*/}
                    {/*                              <View style={{flexDirection: 'row',}}>*/}
                    {/*                                  <View style={{width: '15%'}}>*/}
                    {/*                                      {mapPlayerRank(JSON.parse(item.ranked)['mmr'])}*/}
                    {/*                                  </View>*/}
                    {/*                                  <View style={{width: '85%'}}>*/}
                    {/*                                      <Text style={{*/}
                    {/*                                          fontSize: 18,*/}
                    {/*                                          color: 'white',*/}
                    {/*                                          fontWeight: 'bold'*/}
                    {/*                                      }}>{JSON.parse(item.player)['p_name']}</Text>*/}
                    {/*                                      <Text>*/}
                    {/*                                          <Text style={{color: grayLight}}>lvl: </Text><Text style={{color: 'white'}}>{JSON.parse(item.stats)['level']} </Text>*/}
                    {/*                                          <Text style={{color: grayLight}}>mmr: </Text><Text style={{color: 'white'}}>{JSON.parse(item.ranked)['mmr']} </Text>*/}
                    {/*                                          <Text style={{color: grayLight}}>K/D: </Text><Text style={{color: 'white'}}>{JSON.parse(item.ranked)['kd']}</Text>*/}
                    {/*                                      </Text>*/}
                    {/*                                  </View>*/}
                    {/*                              </View>*/}
                    {/*                          </View>*/}
                    {/*                          PlayerList.js<View style={{width: '20%', alignItems: 'flex-end'}}>*/}
                    {/*                              <TouchableOpacity*/}
                    {/*                                  style={{alignItems: 'flex-start', marginTop: 12, marginLeft: 10}}*/}
                    {/*                                  onPress={() => Alert.alert(*/}
                    {/*                                      'Warning',*/}
                    {/*                                      `Would you like to remove "${JSON.parse(item.player)['p_name']}" from your favourites?`,*/}
                    {/*                                      [*/}
                    {/*                                          {*/}
                    {/*                                              text: 'No',*/}
                    {/*                                              style: 'cancel',*/}
                    {/*                                          },*/}
                    {/*                                          {*/}
                    {/*                                              text: 'Yes',*/}
                    {/*                                              onPress: () => this.removeUser(item),*/}
                    {/*                                          },*/}
                    {/*                                      ],*/}
                    {/*                                  )}>*/}
                    {/*                                  <FontAwesomeIcon icon={ faTimesCircle } size={20} color={"red"}/>*/}
                    {/*                              </TouchableOpacity>*/}
                    {/*                          </View>*/}
                    {/*                      </TouchableOpacity>*/}
                    {/*                  )}*/}
                    {/*        />*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bgGrayMid,
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
        backgroundColor: bgGrayHard
    },
});

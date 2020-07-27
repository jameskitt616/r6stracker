import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {ButtonGroup, SearchBar} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {createPlayer, mapPlayerRank} from '../Controller/PlayerController';
import {Picker} from '@react-native-community/picker';
import {API_KEY} from 'react-native-dotenv';
import Player from '../Entity/Player';
import {bgGrayHard, bgGrayLight, bgGrayMid, grayLight} from '../Enum/colors';

export default class SearchPlayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            searchTxt: null,
            result: [],
            platform: 'uplay',
            selectedIndex: 0,
        };
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})

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

    fetchSearch = () => {

        if (this.state.searchTxt) {

            fetch(`https://r6.apitab.com/search/${this.state.platform}/${this.state.searchTxt}?cid=${API_KEY}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then((responseJson) => {

                    var playersJson = responseJson.players;
                    var players = [];

                    Object.keys(playersJson).forEach(function (key) {
                        var responsePlayer = playersJson[key];
                        players.push(responsePlayer);
                    });

                    this.setState({
                        result: players,
                    });

                })
                .catch(error => ToastAndroid.show(error));
        } else {

            this.setState({
                result: [],
            });
        }
    };

    updateSearchUserName = (searchTxt) => {

        this.setState({
            searchTxt: searchTxt,
        });
    };

    addPlayer = (id) => {

        //TODO: check if player already in DB -> ToastAndroid.show('Something went wrong', 3);
        fetch(`https://r6.apitab.com/player/${id}?cid=${API_KEY}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {

                var p = responseJson;
                var player = new Player(
                    p['player'].p_id,
                    JSON.stringify(p['player']),
                    JSON.stringify(p['custom']),
                    JSON.stringify(p['refresh']),
                    JSON.stringify(p['aliases']),
                    JSON.stringify(p['stats']),
                    JSON.stringify(p['ranked']),
                    JSON.stringify(p['social']),
                    JSON.stringify(p['operators']),
                    JSON.stringify(p['overlay']),
                    JSON.stringify(p['history']),
                    JSON.stringify(p['seasons']),
                    JSON.stringify(p['op_main']),
                );

                createPlayer(player);
            })
            .catch(error => ToastAndroid.show(error));
    };

    renderListHeader = () => {

        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', backgroundColor: bgGrayLight}}>
                    <TouchableOpacity style={{paddingTop: 15, marginLeft: 20, marginRight: 20, alignSelf: 'flex-start'}}
                                      onPress={() => this.props.navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={20} color={'white'}/>
                    </TouchableOpacity>
                    <View style={{width: '93%'}}>
                        <SearchBar inputContainerStyle={{backgroundColor: bgGrayHard}}
                                   containerStyle={{
                                       backgroundColor: bgGrayLight, width: '90%',
                                       paddingTop: 0, paddingBottom: 5, paddingLeft: 0, paddingRight: 0,
                                       borderBottomWidth: 0, borderTopWidth: 0,
                                   }}
                                   round editable={true} value={this.state.searchTxt}
                                   onSubmitEditing={this.fetchSearch}
                                   onChangeText={this.updateSearchUserName}
                                   placeholder='Search'/>
                    </View>
                </View>
                <View style={{marginBottom: 15}}>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={this.state.selectedIndex}
                        buttons={['PC', 'PlayStation', 'Xbox']}
                        // selectedButtonStyle={{backgroundColor: '#E1FF00'}}
                        selectedButtonStyle={{backgroundColor: '#ffa100',}}
                        containerStyle={{backgroundColor: bgGrayHard, borderColor: bgGrayHard, borderRadius: 5}}
                    />
                </View>
            </View>
        </View>;
    };

    noContent = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <View style={{backgroundColor: bgGrayHard, padding: 15, marginTop: 10, marginLeft: 10, marginRight: 10, borderRadius: 5, alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>No players found</Text>
                </View>
            </View>
        </View>;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, alignItems: 'center', backgroundColor: bgGrayMid}}>
                        <FlatList style={{flex: 1, width: '100%'}}
                                  data={this.state.result}
                                  refreshing={this.state.refreshing}
                                  ListEmptyComponent={this.noContent}
                                  ListHeaderComponent={this.renderListHeader}
                                  keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item}) => (
                                      <View style={styles.playerList}>
                                          <View style={{width: '80%', fontWeight: 'bold'}}>
                                              <View style={{flexDirection: 'row'}}>
                                                  <View style={{width: '15%'}}>
                                                      {mapPlayerRank(item.ranked.mmr)}
                                                  </View>
                                                  <View style={{width: '85%'}}>
                                                      <Text style={{
                                                          fontSize: 18,
                                                          color: 'white',
                                                          fontWeight: 'bold',
                                                      }}>{item.profile.p_name}</Text>
                                                      <Text>
                                                          <Text style={{color: grayLight}}>lvl: </Text><Text
                                                          style={{color: 'white'}}>{item.stats.level} </Text>
                                                          <Text style={{color: grayLight}}>mmr: </Text><Text
                                                          style={{color: 'white'}}>{item.ranked.mmr} </Text>
                                                          <Text style={{color: grayLight}}>K/D: </Text><Text
                                                          style={{color: 'white'}}>{item.ranked.kd}</Text>
                                                      </Text>
                                                  </View>
                                              </View>
                                          </View>
                                          <View style={{width: '20%', alignItems: 'flex-end'}}>
                                              <TouchableOpacity
                                                  style={{
                                                      alignItems: 'flex-start',
                                                      marginTop: 5,
                                                      marginLeft: 10,
                                                  }}
                                                  onPress={() => this.addPlayer(item.profile.p_id)}>
                                                  <FontAwesomeIcon icon={faUserPlus} size={35}
                                                                   color={grayLight}/>
                                              </TouchableOpacity>
                                          </View>
                                      </View>
                                  )}
                        />
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
    playerList: {
        flexDirection: 'row',
        padding: 10,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: bgGrayHard,
    },
});

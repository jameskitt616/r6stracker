import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid, FlatList,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {bgGrayHard, bgGrayMid, bgGrayLight, grayLight} from '../Enum/colors'
import {API_KEY} from "react-native-dotenv";
import {ButtonGroup} from "react-native-elements";
import {mapPlayerRank} from "../Controller/PlayerController";

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

    getPlayer = () => {

        fetch(`https://r6.apitab.com/leaderboards/${this.state.platform}/${this.state.region}/?cid=${API_KEY}&u=${this.getCurrentTime}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {

                let playersJson = responseJson.players;
                let players = [];

                Object.keys(playersJson).forEach(function (key) {
                    let responsePlayer = playersJson[key];
                    players.push(responsePlayer);
                });

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

                this.setState({
                    players: players,
                });
            })
            .catch(error => ToastAndroid.show(error));
    };

    updateIndex(selectedIndex) {
        this.setState({selectedIndex});

        let plattform = this.state.platform;

        switch (selectedIndex) {
            case 0:
                this.setState({
                    platform: 'uplay',
                });
                plattform = 'uplay';
                break;
            case 1:
                this.setState({
                    platform: 'psn',
                });
                plattform = 'psn';
                break;
            case 2:
                this.setState({
                    platform: 'xbl',
                });
                plattform = 'xbl';
                break;
        }

        fetch(`https://r6.apitab.com/leaderboards/${this.state.platform}/${this.state.region}/?cid=${API_KEY}&u=${this.getCurrentTime}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((responseJson) => {

                let playersJson = responseJson.players;
                let players = [];

                Object.keys(playersJson).forEach(function (key) {
                    let responsePlayer = playersJson[key];
                    players.push(responsePlayer);
                });

                this.setState({
                    result: players,
                });

            })
            .catch(error => ToastAndroid.show(error));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', backgroundColor: bgGrayLight}}>
                        <TouchableOpacity style={{marginTop: 7, marginBottom: 5, marginLeft: 10}}
                                          onPress={this.props.navigation.openDrawer}>
                            <FontAwesomeIcon icon={faBars} size={25}/>
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
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, alignItems: 'center', backgroundColor: bgGrayMid}}>
                            <FlatList style={{flex: 1, width: '100%'}}
                                      data={this.state.players}
                                      refreshing={this.state.refreshing}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={({item}) => (
                                          <View style={styles.playerList}>
                                              <View style={{width: '100%', fontWeight: 'bold'}}>
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

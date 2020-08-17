import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {getPlayerById} from '../Repository/PlayerRepository';
import {mapPlayerRank} from '../Controller/PlayerController';
import Player from "../Entity/Player";
import {faAngleDoubleUp, faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {bgGrayHard, bgGrayMid, grayLight} from "../Enum/colors";
import SwipeableViews from "react-swipeable-views-native/lib";
import {ButtonGroup} from "react-native-elements";

export default class PlayerOverview extends Component {

    constructor(props) {
        super(props);

        let playerId = props.route.params.playerId;
        let p = getPlayerById(playerId);

        this.state = {
            userId: playerId,
            selectedIndex: 0,
            operators: [],
            player: new Player(
                p.id,
                JSON.parse(p['player']),
                JSON.parse(p['custom']),
                JSON.parse(p['refresh']),
                JSON.parse(p['aliases']),
                JSON.parse(p['stats']),
                JSON.parse(p['ranked']),
                JSON.parse(p['social']),
                JSON.parse(p['operators']),
                JSON.parse(p['overlay']),
                JSON.parse(p['history']),
                JSON.parse(p['seasons']),
                JSON.parse(p['op_main']),
            ),
        };
        this.updateIndex = this.updateIndex.bind(this);
    };

    componentDidMount(): void {

        // TODO: make this shit prettier
        let seasons = [];
        let currentSeasons = this.state.player.seasons;
        Object.keys(currentSeasons).forEach(function (key) {
            let season = currentSeasons[key];
            seasons.push(season);
        });
        seasons.reverse();


        let operators = [];
        let ops = this.state.player.operators;
        Object.keys(ops).forEach(function (key) {
            let operator = ops[key];
            // console.log(ops);
            // operators.push(ops);
            operators.push(operator);
        });

        this.setState(prevState => ({
            player: {
                ...prevState.player,
                seasons,
            }
        }));

        this.setState({
            operators: operators,
        });
    }

    calcPlaytime = (time) => {

        let nonShortedTime = time / 60 / 60;
        return nonShortedTime.toFixed(1);
    };

    updateIndex(selectedIndex) {
        this.setState({selectedIndex});

        this.setState({
            selectedIndex: selectedIndex,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={{marginBottom: 15}}>
                            <ButtonGroup
                                onPress={this.updateIndex}
                                selectedIndex={this.state.selectedIndex}
                                buttons={['General', 'Operators', 'Seasons']}
                                textStyle={{color: 'white'}}
                                selectedTextStyle={{color: 'black'}}
                                selectedButtonStyle={{backgroundColor: '#E1FF00'}}
                                containerStyle={{backgroundColor: bgGrayHard, borderColor: bgGrayHard, borderRadius: 5}}
                            />
                        </View>

                        <SwipeableViews index={this.state.selectedIndex} onChangeIndex={this.updateIndex}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <View style={{
                                    borderRadius: 6,
                                    backgroundColor: bgGrayHard,
                                    margin: 10,
                                    padding: 10,
                                }}>
                                    <View style={{alignItems: 'center'}}>
                                        {mapPlayerRank(this.state.player.ranked.mmr)}
                                    </View>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 25,
                                        textAlign: 'center'
                                    }}>{this.state.player.player.p_name}</Text>
                                    <View style={{alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <FontAwesomeIcon icon={faAngleDoubleUp} size={20}
                                                             color={grayLight}/>
                                            <Text style={styles.text}>
                                                {this.state.player.stats.level}</Text>
                                            <FontAwesomeIcon icon={faAngleDoubleUp} size={20}
                                                             color={grayLight}/>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <FontAwesomeIcon icon={faEye} size={20}
                                                             color={grayLight}/>
                                            <Text style={styles.text}>Profile
                                                Visitors: {this.state.player.custom.visitors}</Text>
                                        </View>
                                        {/*TODO: show current unranked mmr if unranked*/}
                                        <Text style={styles.text}>Current
                                            MMR: {this.state.player.ranked.EU_actualmmr}</Text>
                                        <Text style={styles.text}>Overall
                                            Playtime: {this.calcPlaytime(this.state.player.stats.generalpvp_timeplayed)}H</Text>
                                    </View>

                                    <View style={{flexDirection: 'row', padding: 5}}>
                                        <View style={{width: '50%'}}>
                                            <Text
                                                style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Casual</Text>
                                            <Text style={styles.text}>K/D: {this.state.player.stats.casualpvp_kd}</Text>
                                            <Text style={styles.text}>W/L: {this.state.player.stats.casualpvp_wl}</Text>
                                        </View>

                                        <View style={{width: '50%', alignItems: 'flex-end'}}>
                                            <Text
                                                style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Ranked</Text>
                                            <Text style={styles.text}>K/D: {this.state.player.stats.rankedpvp_kd}</Text>
                                            <Text style={styles.text}>W/L: {this.state.player.stats.rankedpvp_wl}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>


                            <View style={{flex: 1, alignItems: 'center'}}>
                                <View style={{
                                    borderRadius: 6,
                                    backgroundColor: bgGrayHard,
                                    margin: 10,
                                    padding: 10,
                                }}>
                                    {/*<Text>{this.state.operators.Smoke}</Text>*/}
                                    {console.log(this.state.operators.Zofia)}
                                    {/*<FlatList data={this.state.player.operators}*/}
                                    {/*          renderItem={({item}) => (*/}
                                    {/*              <View style={styles.seasonList}>*/}
                                    {/*                  <View style={{width: '70%', fontWeight: 'bold'}}>*/}
                                    {/*                      <View style={{flexDirection: 'row'}}>*/}
                                    {/*                          <View style={{width: '15%'}}>*/}
                                    {/*                              {mapPlayerRank(item.maxmmr)}*/}
                                    {/*                          </View>*/}
                                    {/*                          <View style={{width: '85%'}}>*/}
                                    {/*                              <Text style={{*/}
                                    {/*                                  fontSize: 18,*/}
                                    {/*                                  color: 'white',*/}
                                    {/*                                  fontWeight: 'bold',*/}
                                    {/*                                  paddingTop: 10*/}
                                    {/*                              }}>{item.}</Text>*/}
                                    {/*                          </View>*/}
                                    {/*                      </View>*/}
                                    {/*                  </View>*/}
                                    {/*                  <View style={{width: '30%', alignItems: 'flex-end'}}>*/}
                                    {/*                      <View style={{flexDirection: 'row'}}>*/}
                                    {/*                          <View style={{width: '50%'}}>*/}
                                    {/*                              <Text style={{*/}
                                    {/*                                  color: 'white',*/}
                                    {/*                                  paddingTop: 10*/}
                                    {/*                              }}>{item.maxmmr}</Text>*/}
                                    {/*                          </View>*/}
                                    {/*                      </View>*/}
                                    {/*                  </View>*/}
                                    {/*              </View>*/}
                                    {/*          )}*/}
                                    {/*/>*/}
                                </View>
                            </View>


                            <View style={{flex: 1, alignItems: 'center'}}>
                                <View style={{
                                    borderRadius: 6,
                                    backgroundColor: bgGrayHard,
                                    margin: 10,
                                    padding: 10,
                                }}>
                                    <FlatList data={this.state.player.seasons}
                                              renderItem={({item}) => (
                                                  <View style={styles.seasonList}>
                                                      <View style={{width: '70%', fontWeight: 'bold'}}>
                                                          <View style={{flexDirection: 'row'}}>
                                                              <View style={{width: '15%'}}>
                                                                  {mapPlayerRank(item.maxmmr)}
                                                              </View>
                                                              <View style={{width: '85%'}}>
                                                                  <Text style={{
                                                                      fontSize: 18,
                                                                      color: 'white',
                                                                      fontWeight: 'bold',
                                                                      paddingTop: 10
                                                                  }}>{item.seasonname}</Text>
                                                              </View>
                                                          </View>
                                                      </View>
                                                      <View style={{width: '30%', alignItems: 'flex-end'}}>
                                                          <View style={{flexDirection: 'row'}}>
                                                              <View style={{width: '50%'}}>
                                                                  <Text style={{
                                                                      color: 'white',
                                                                      paddingTop: 10
                                                                  }}>{item.maxmmr}</Text>
                                                              </View>
                                                          </View>
                                                      </View>
                                                  </View>
                                              )}
                                    />
                                </View>
                            </View>
                        </SwipeableViews>
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
        color: 'white',
        fontSize: 15,
    },
    seasonList: {
        flexDirection: 'row',
        padding: 10,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: bgGrayHard,
        borderColor: 'white',
        borderWidth: 1
    },
});

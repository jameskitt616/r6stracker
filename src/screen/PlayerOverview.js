import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,} from 'react-native';
import {getPlayerById, mapPlayerRank} from '../Controller/PlayerController';
import Player from "../Entity/Player";
import {faAngleDoubleUp, faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {bgGrayHard, bgGrayMid, grayLight} from "../Enum/colors";

export default class PlayerOverview extends Component {

    constructor(props) {
        super(props);

        let playerId = props.route.params.playerId;
        let p = getPlayerById(playerId);

        this.state = {
            userId: playerId,
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
    }

    calcPlaytime = (time) => {

        let nonShortedTime = time / 60 / 60;
        return nonShortedTime.toFixed(1);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={{
                                borderRadius: 6,
                                backgroundColor: bgGrayHard,
                                margin: 10,
                                padding: 10,
                            }}>
                                {mapPlayerRank(this.state.player.ranked.mmr)}
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
                                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Casual</Text>
                                        <Text style={styles.text}>K/D: {this.state.player.stats.casualpvp_kd}</Text>
                                        <Text style={styles.text}>W/L: {this.state.player.stats.casualpvp_wl}</Text>
                                    </View>

                                    <View style={{width: '50%', alignItems: 'flex-end'}}>
                                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Ranked</Text>
                                        <Text style={styles.text}>K/D: {this.state.player.stats.rankedpvp_kd}</Text>
                                        <Text style={styles.text}>W/L: {this.state.player.stats.rankedpvp_wl}</Text>
                                    </View>
                                </View>
                            </View>
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
        color: 'white',
        fontSize: 15,
    },
});

import React, {Component} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import {getPlayerById} from '../Controller/PlayerController';
import Player from "../Entity/Player";

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

    componentDidMount(): void {
        console.log(this.state.player);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text>{this.state.player.id}</Text>
                            <Text>{this.state.player.player.p_platform}</Text>
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

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
import {getPlayerById} from '../Controller/PlayerController';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default class Player extends Component {

    constructor(props) {
        super(props);

        let playerId = props.route.params.playerId;
        let currentPlayer = getPlayerById(playerId);

        this.state = {
            player: currentPlayer,
            userId: playerId,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <FlatList style={{flex: 1, width: '100%'}}
                                      data={this.state.player}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={({item}) => (
                                          <View style={{backgroundColor: 'white', padding: 20}}>
                                              <Text>Name: {JSON.parse(item.stats)['level']}</Text>
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

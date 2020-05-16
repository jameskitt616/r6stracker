import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    ToastAndroid
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faUserPlus, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {getAllPlayers} from '../Controller/PlayerController';
import {Picker} from '@react-native-community/picker';
import {API_KEY} from 'react-native-dotenv'

export default class SearchPlayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            searchTxt: null,
            result: [],
            platform: 'uplay',
        };
    }

    handleRefresh = () => {

        this.setState({
            // refreshing: true,
        }, () => {
            getAllPlayers();
        });
    };

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

    updatePlatform = (platform) => {

        //TODO: on change update search
        this.setState({
            platform: platform,
        });
        this.fetchSearch();
        console.log(this.state.result);
    };

    renderListHeader = () => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <SearchBar round editable={true} value={this.state.searchTxt} onSubmitEditing={this.fetchSearch}
                           onChangeText={this.updateSearchUserName}
                           placeholder='Search for player'/>
                <View>
                    <Picker
                        selectedValue={this.state.platform}
                        style={{height: 50, width: '100%', margin: 5}}
                        onValueChange={(itemValue, itemIndex) => this.updatePlatform(itemValue)}
                    >
                        <Picker.Item label="PC" value="uplay"/>
                        <Picker.Item label="PlayStation" value="psn"/>
                        <Picker.Item label="Xbox" value="xbl"/>
                    </Picker>
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
                            <FontAwesomeIcon icon={faBars} size={25}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#3d3c3b'}}>
                            <FlatList style={{flex: 1, width: '100%'}}
                                      data={this.state.result}
                                      refreshing={this.state.refreshing}
                                      onRefresh={this.handleRefresh}
                                      ListHeaderComponent={this.renderListHeader}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={({item}) => (
                                          <View style={{
                                              flexDirection: 'row',
                                              padding: 10,
                                              marginRight: 10,
                                              marginLeft: 10,
                                              marginBottom: 10,
                                              borderRadius: 5,
                                              backgroundColor: '#222222'
                                          }}>
                                              <View style={{width: '50%', fontWeight: 'bold'}}>
                                                  <Text style={{
                                                      fontSize: 18,
                                                      color: 'white',
                                                      fontWeight: 'bold'
                                                  }}>{item.profile.p_name}</Text>
                                                  <Text style={{color: '#757575'}}>lvl: {item.stats.level} |
                                                      mmr: {item.ranked.mmr}</Text>
                                              </View>
                                              <View style={{width: '50%', alignItems: 'flex-end'}}>
                                                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                      <TouchableOpacity
                                                          style={{
                                                              alignItems: 'flex-start',
                                                              marginTop: 5,
                                                              marginLeft: 10
                                                          }}
                                                          onPress={() => console.log('add')}>
                                                          <FontAwesomeIcon icon={faUserPlus} size={35}
                                                                           color={'#757575'}/>
                                                      </TouchableOpacity>
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
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
});

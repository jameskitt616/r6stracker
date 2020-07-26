import Realm from 'realm';
import Player from '../Entity/Player';
import {Image, ToastAndroid, View} from 'react-native';
import React from "react";

let realm = new Realm({schema: [Player.schema]});
// let realm = new Realm({schema: [Player.schema], schemaVersion: 1});
// let realm = new Realm({
//     schema: [Player.updatedSchema],
//     schemaVersion: 1,
//     migration: (oldRealm, newRealm) => {
//         // only apply this change if upgrading to schemaVersion 1
//         if (oldRealm.schemaVersion < 1) {
//             const oldObjects = oldRealm.objects('user');
//             const newObjects = newRealm.objects('user');
//
//             // loop through all objects and set the name property in the new schema
//             for (let i = 0; i < oldObjects.length; i++) {
//                 newObjects[i].birthday = new Date();
//             }
//         }
//     },
// });

// realm.close();

export const getAllPlayers = () => {

    return realm.objects('player');
};

export const createPlayer = (Player) => {

    if (Player) {
        realm.write(() => {
            realm.create('player', Player.getData());
            ToastAndroid.show('Player has been added', 3);
        });
    } else {
        ToastAndroid.show('Something went wrong', 3);
    }
};

export const savePlayer = (updatedPlayer) => {

    let currentPlayer = getPlayerById(updatedPlayer.id);

    realm.write(() => {

        currentPlayer.name = updatedPlayer.name;
        ToastAndroid.show('Player has been updated', 3);
    });
};

export const getPlayerById = (userId) => {

    return realm.objectForPrimaryKey('player', userId);

    // let users = getAllUsers();
    // let filteredUsers = users.filtered("id = $0", userId);
    // let user = null;
    // if (filteredUsers.length === 0) {
    //     ToastAndroid.show('No Player(s) found', 3);
    // } else {
    //     user = filteredUsers[0];
    // }
    //
    // return user;
};

export const deletePlayer = (Player) => {

    realm.write(() => {
        realm.delete(Player);
        ToastAndroid.show('Player has been deleted', 3);
    });
};

export const mapPlayerRank = (mmr) => {

    //TODO: add images for iOS
    if (mmr === 0 || mmr === '') {
        return <Image source={require('../../android/app/src/main/assets/RANK_Unranked.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr <= 1199) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Copper_05.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 1200 && mmr <= 1299) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Copper_04.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 1300 && mmr <= 1399) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Copper_03.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 1400 && mmr <= 1499) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Copper_02.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 1500 && mmr <= 1599) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Copper_01.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 1600 && mmr <= 1699) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Bronze_05.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 1700 && mmr <= 1799) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Bronze_04.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 1800 && mmr <= 1899) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Bronze_03.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 1900 && mmr <= 1999) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Bronze_02.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 2000 && mmr <= 2099) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Bronze_01.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 2100 && mmr <= 2199) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Silver_05.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 2200 && mmr <= 2299) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Silver_04.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 2300 && mmr <= 2399) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Silver_03.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 2400 && mmr <= 2499) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Silver_02.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 2500 && mmr <= 2599) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Silver_01.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 2600 && mmr <= 2699) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500GOLD_04.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 2700 && mmr <= 2799) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500GOLD_03.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 2800 && mmr <= 2999) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500GOLD_02.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 3000 && mmr <= 3199) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500GOLD_01.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 3200 && mmr <= 3599) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Platinum_03.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 3600 && mmr <= 3999) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Platinum_02.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 4000 && mmr <= 4399) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Platinum_01.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr >= 4400 && mmr <= 4999) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Diamond_01.png')} style={{ width: 30, height: 40 }} />
    }
    if (mmr <= 5000) {
        return <Image source={require('../../android/app/src/main/assets/RANK_500x500Champions_01.png')} style={{ width: 30, height: 40 }} />
    }
};

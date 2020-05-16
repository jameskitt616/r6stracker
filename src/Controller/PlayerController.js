import Realm from 'realm';
import Player from '../Entity/Player';
import {ToastAndroid} from 'react-native';

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

import Realm from 'realm';
import User from '../Entity/User';
import {ToastAndroid} from 'react-native';

let realm = new Realm({schema: [User.schema]});
// let realm = new Realm({schema: [User.schema], schemaVersion: 1});
// let realm = new Realm({
//     schema: [User.updatedSchema],
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

    return realm.objects('user');
};

export const createPlayer = (User) => {

    if (User) {
        realm.write(() => {
            realm.create('user', User.getData());
            ToastAndroid.show('User has been added', 3);
        });
    } else {
        ToastAndroid.show('Something went wrong', 3);
    }
};

export const savePlayer = (updatedUser) => {

    let currentUser = getPlayerById(updatedUser.id);

    realm.write(() => {

        currentUser.name = updatedUser.name;
        ToastAndroid.show('User has been updated', 3);
    });
};

export const getPlayerById = (userId) => {

    return realm.objectForPrimaryKey('user', userId);

    // let users = getAllUsers();
    // let filteredUsers = users.filtered("id = $0", userId);
    // let user = null;
    // if (filteredUsers.length === 0) {
    //     ToastAndroid.show('No User(s) found', 3);
    // } else {
    //     user = filteredUsers[0];
    // }
    //
    // return user;
};

export const deletePlayer = (User) => {

    realm.write(() => {
        realm.delete(User);
        ToastAndroid.show('User has been deleted', 3);
    });
};

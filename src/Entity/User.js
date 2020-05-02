import uuid from 'react-native-uuid'

export default class User {

    constructor(name) {
        this.id = uuid.v4();
        this.name = name;
    }

    getData() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}

User.schema = {
    name: 'user',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
    },
};

// User.updatedSchema = {
//     name: 'user',
//     primaryKey: 'id',
//     properties: {
//         id: 'string',
//         name: 'string',
//     },
// };

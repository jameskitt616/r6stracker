export default class Player {

    constructor(id, name, level, platform, visitors, banned, stats, ranked, operators, seasons, mainOps) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.platform = platform;
        this.visitors = visitors;
        this.banned = banned;
        this.stats = stats;
        this.ranked = ranked;
        this.operators = operators;
        this.seasons = seasons;
        this.mainOps = mainOps;
    }

    getData() {
        return {
            id: this.id,
            name: this.name,
            level: this.level,
            platform: this.platform,
            visitors: this.visitors,
            banned: this.banned,
            stats: this.stats,
            ranked: this.ranked,
            operators: this.operators,
            seasons: this.seasons,
            mainOps: this.mainOps,
        };
    }
}

Player.schema = {
    name: 'player',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        level: 'int',
        platform: 'string',
        visitors: 'int',
        banned: 'bool',
        stats: 'string',
        ranked: 'string',
        operators: 'string',
        seasons: 'string',
        mainOps: 'string',
    },
};

// Player.updatedSchema = {
//     name: 'player',
//     primaryKey: 'id',
//     properties: {
//         id: 'string',
//         name: 'string',
//     },
// };

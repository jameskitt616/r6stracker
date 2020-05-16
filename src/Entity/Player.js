export default class Player {

    constructor(id, player, custom, refresh, aliases, stats, ranked, social, operators, overlay, history, seasons, op_main) {
        this.id = id;
        this.player = player;
        this.custom = custom;
        this.refresh = refresh;
        this.aliases = aliases;
        this.stats = stats;
        this.ranked = ranked;
        this.social = social;
        this.operators = operators;
        this.overlay = overlay;
        this.history = history;
        this.seasons = seasons;
        this.op_main = op_main;
    }

    getData() {
        return {
            id: this.id,
            player: this.player,
            custom: this.custom,
            refresh: this.refresh,
            aliases: this.aliases,
            stats: this.stats,
            ranked: this.ranked,
            social: this.social,
            operators: this.operators,
            overlay: this.overlay,
            history: this.history,
            seasons: this.seasons,
        };
    }
}

Player.schema = {
    name: 'player',
    primaryKey: 'id',
    properties: {
        id: 'string',
        player: 'string',
        custom: 'string',
        refresh: 'string',
        aliases: 'string',
        stats: 'string',
        ranked: 'string',
        social: 'string',
        operators: 'string',
        overlay: 'string',
        history: 'string',
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

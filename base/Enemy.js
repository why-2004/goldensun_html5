import { SpriteBase } from "./SpriteBase.js";
import { Player, fighter_types } from "./Player.js";
import { enemies_list } from "../initializers/enemies.js";
import { ordered_elements } from "../utils.js";

export class Enemy extends Player {
    constructor(enemy_data, name) {
        super(enemy_data.key_name, name ? name : enemy_data.name);
        this.level = enemy_data.level;
        this.turns = enemy_data.turns;
        this.max_hp = enemy_data.max_hp;
        this.max_pp = enemy_data.max_pp;
        this.hp_recovery = enemy_data.hp_recovery;
        this.pp_recovery = enemy_data.pp_recovery;
        this.atk = enemy_data.atk;
        this.def = enemy_data.def;
        this.agi = enemy_data.agi;
        this.luk = enemy_data.luk;
        this.items = enemy_data.items;
        this.abilities = enemy_data.abilities;
        this.coins_reward = enemy_data.coins_reward;
        this.item_reward = enemy_data.item_reward;
        this.item_reward_chance = enemy_data.item_reward_chance;
        this.exp_reward = enemy_data.exp_reward;
        this.venus_level = enemy_data.venus_level;
        this.mercury_level = enemy_data.mercury_level;
        this.mars_level = enemy_data.mars_level;
        this.jupiter_level = enemy_data.jupiter_level;
        this.venus_power = enemy_data.venus_power;
        this.mercury_power = enemy_data.mercury_power;
        this.mars_power = enemy_data.mars_power;
        this.jupiter_power = enemy_data.jupiter_power;
        this.venus_resist = enemy_data.venus_resist;
        this.mercury_resist = enemy_data.mercury_resist;
        this.mars_resist = enemy_data.mars_resist;
        this.jupiter_resist = enemy_data.jupiter_resist;
        this.battle_animations_variations = Object.assign({}, enemy_data.battle_animations_variations);
        this.fighter_type = fighter_types.ENEMY;
        this.class = {
            name: "No Class",
            vulnerabilities: enemy_data.vulnerabilities === undefined ? [] : enemy_data.vulnerabilities
        };
        this.current_exp = -1;
        this.effects = [];
        this.set_base_attributes();
    }

    set_base_attributes() {
        this.current_hp = this.max_hp;
        this.current_pp = this.max_pp;
        this.current_hp_recovery = this.hp_recovery;
        this.current_pp_recovery = this.pp_recovery;
        this.current_atk = this.atk;
        this.current_def = this.def;
        this.current_agi = this.agi;
        this.current_luk = this.luk;
        this.venus_level_current = this.venus_level;
        this.mercury_level_current = this.mercury_level;
        this.mars_level_current = this.mars_level;
        this.jupiter_level_current = this.jupiter_level;
        this.venus_power_current = this.venus_power;
        this.mercury_power_current = this.mercury_power;
        this.mars_power_current = this.mars_power;
        this.jupiter_power_current = this.jupiter_power;
        this.venus_resist_current = this.venus_resist;
        this.mercury_resist_current = this.mercury_resist;
        this.mars_resist_current = this.mars_resist;
        this.jupiter_resist_current = this.jupiter_resist;
    }

    update_all() {
        this.set_base_attributes();
        this.effects.forEach(effect => {
            switch (effect.type) {
                case effect_types.POWER:
                case effect_types.RESIST:
                case effect_types.MAX_HP:
                case effect_types.MAX_PP:
                case effect_types.ATTACK:
                case effect_types.DEFENSE:
                case effect_types.AGILITY:
                case effect_types.LUCK:
                    effect.apply_effect();
                    break;
            }
        });
        for (let i = 0; i < ordered_elements.length; ++i) {
            const element = ordered_elements[i];
            const power_key = element + "_power_current";
            const resist_key = element + "_resist_current";
            this[power_key] = _.clamp(this[power_key], ELEM_ATTR_MIN, ELEM_ATTR_MAX);
            this[resist_key] = _.clamp(this[resist_key], ELEM_ATTR_MIN, ELEM_ATTR_MAX);
        }
    }
}

export class EnemyBase extends SpriteBase {
    constructor(
        key_name,
        battle_scale,
        data
    ) {
        super(key_name, ["battle"]);
        this.key_name = key_name;
        this.battle_scale = battle_scale;
        this.data = data;
    }
}

export function get_enemy_instance(key_name, suffix) {
    return new Enemy(enemies_list[key_name].data, enemies_list[key_name].data.name + suffix);
}
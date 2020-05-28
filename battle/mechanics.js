import { MainChar } from '../base/MainChar.js';
import { Enemy } from '../base/battle/Enemy.js';
import { Ability } from '../base/Ability.js';
import { Item } from '../base/Item.js';


const ELEMENT_MODIFIER =400;
const ELEMENT_HALF_MODIFIER =200;

/* ----------- numbers --------------- */
export function general_random_number(){
  return Math.floor(Math.random() * 10000 );
}
export function battle_random_number(){
  return Math.floor(Math.random() * 65536 );
}
export function random_number(){ // (used in battle)
  return Math.floor(Math.random() * 4 );
}

/* ----------- dammage formualas --------------- */
export function calculate_base_damage(attacker_data, defender_data) {
  var relative_attack= attacker_data.atk - defender_data.def;
  return Math.floor(relative_attack / 2);
}

// this is for djiin OR unleash as they are Elemental Physical Attacks
// dmg_mult often to 1 (but flint-> 1.6) // extra_dmg depends of the weapons
export function calculate_physical_damage(attacker_data, defender_data, weapon_data) {
  var prop1= attacker_data.element_afinity + "_power_current";
  var prop2= resist_current.element_afinity + "_resist_current";
  // missing: "weapon_data.dmg_mult" and "weapon_data.extra_dmg"
  return Math.floor ( (calculate_base_damage(attacker_data, defender_data) * weapon_data.dmg_mult + weapon_data.extra_dmg)* (1+(prop1-prop2)/ELEMENT_MODIFIER) ) + random_number();
}

// not to be confused with unleash
//  In battle, Criticals are represented by the camera zooming in on the target, followed by a slightly delayed attack from the user.
/* CrtRate = 1.25x base, but some weapons have different modifiers set for this.
Sol Blade = 3x
Excalibur = 1.25x or 3x
Tisiphone Edge = 1.25, 2x, or 3x*/
export function calculate_critical_damage(attacker_data, defender_data, weapon_data) {
  var extra_dmg= defender_data.level / 5 + 6;
  return Math.floor ( (calculate_physical_damage(attacker_data, defender_data, weapon_data) * weapon_data.unleash_rate + extra_dmg) + random_number();
}

export function apply_dammage(target_data){
  // loop check array length
  //target.current_hp -= *the corresponding number*;
}

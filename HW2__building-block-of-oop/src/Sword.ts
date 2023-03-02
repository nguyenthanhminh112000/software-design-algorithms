import { Item } from "./Item";
import { Weapon } from "./Weapon";

export class Sword extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("sword", value, weight, baseDamage, baseDurability);
  }
  public polish() {
    const newDamageModifier = Weapon.MODIFIER_CHANGE_RATE + this.damageModifier;
    const maximumBaseDamage = (this.baseDamage / 100) * 25;
    if (newDamageModifier <= maximumBaseDamage) this.damageModifier = newDamageModifier;
  }
}

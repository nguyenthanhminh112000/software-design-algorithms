import { Item } from "./Item";

export abstract class Weapon extends Item {
  static readonly MODIFIER_CHANGE_RATE: number = 0.05;
  protected baseDamage: number;
  protected damageModifier: number = 0;
  private baseDurability: number;
  protected durabilityModifier: number = 0;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
  }

  public getEffectiveDamage(): number {
    return this.baseDamage + this.damageModifier;
  }

  public getEffectiveDurability(): number;
  public getEffectiveDurability(durabilityModifier: number): number;
  public getEffectiveDurability(durabilityModifier?: number): number {
    if (durabilityModifier) {
      return durabilityModifier + this.baseDurability;
    } else {
      return this.durabilityModifier + this.baseDurability;
    }
  }
  public toString() {
    return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(
      2
    )}, Damage: ${this.getEffectiveDamage().toFixed(2)}, Durability: ${(this.getEffectiveDurability() * 100).toFixed(
      2
    )}%`;
  }
  public use(): string {
    if (this.baseDurability + this.durabilityModifier > 0) {
      this.durabilityModifier -= Weapon.MODIFIER_CHANGE_RATE;
      let finalNotification = `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.`;
      if (this.baseDurability + this.durabilityModifier <= 0) {
        finalNotification += `\nThe ${this.name} breaks.`;
      }

      return finalNotification;
    } else return `You can't use the ${this.name}, it is broken.`;
  }
}

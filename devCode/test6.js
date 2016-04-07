function Wizard() {
  this.thunder = 'thunder'; // 固有スキル
}

Wizard.prototype.fireball = 'fireball'; // 継承スキル

function HiWizard() {
  this.thunderStorm = 'thunderStorm'; // 固有スキル
}
HiWizard.prototype.volcano = 'volcano'; // 継承スキル
Object.setPrototypeOf(HiWizard.prototype, Wizard.prototype); // 職業ツリーを定義する

var wiz = new Wizard();
console.log(wiz.thunder);
console.log(wiz.fireball);

var hiWiz = new HiWizard();
console.log(hiWiz.thunder); // undefined Wizardの固有スキル
console.log(hiWiz.fireball); // undefined Wizardの継承スキル
console.log(hiWiz.thunderStorm); // HiWizardの固有スキル
console.log(hiWiz.volcano); // HiWizardの継承スキル

console.log(hiWiz.__proto__); // HiWizard { volcano: 'volcano' }
console.log(hiWiz.__proto__.__proto__); // Wizard { fireball: 'fireball' }
console.log(hiWiz.__proto__.__proto__.__proto__); // {}
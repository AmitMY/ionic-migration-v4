const replace = require('replace');
const ncp = require('ncp').ncp;

console.log('-'.repeat(20));
console.log('This automatic migration disregards any code styling, Including but not limited to:');
console.log('- Indentations');
console.log('- Spaces');
console.log('And you probably want to run your IDE code reformatting after it.');
console.log('-'.repeat(20));
console.log('');

// Copy folder
ncp.limit = 16;
ncp('v3', 'v4', function (err) {
  if (err) {
    return console.error(err);
  }

  // Need delay for some reason
  setTimeout(() => {
    // Replace
    const rules = [
      {
        name: "Button (ion-button)",
        regex: /<button([\s\S]*?) ion-button([\s\S]*?)<\/button>/g,
        replacement: '<ion-button$1$2</ion-button>'
      }, {
        name: "A (ion-button)",
        regex: /<a(.*?) ion-button([\s\S]*?)<\/a>/g,
        replacement: '<ion-button$1$2<\ion-button>'
      }, {
        name: "Button (ion-item)",
        regex: /<button([\s\S]*?) ion-item([\s\S]*?)<\/button>/g,
        replacement: '<ion-item$1$2</ion-item>'
      }, {
        name: "A (ion-item)",
        regex: /<a(.*?) ion-item([\s\S]*?)<\/a>/g,
        replacement: '<ion-item$1$2<\ion-item>'
      }, {
        name: "Chip",
        regex: /<ion-chip>([\s\S]*?)<ion-button([\s\S]*?)<\/ion-button>([\s\S]*?)<\/ion-chip>/g,
        replacement: '<ion-chip>$1<ion-chip-button$2</ion-chip-button>$3</ion-chip>'
      }, {
        name: "Fab",
        regex: /<button([\s\S]*?) ion-fab([\s\S]*?)<\/button>/g,
        replacement: '<ion-fab-button$1$2</ion-fab-button>'
      }, {
        name: "Icon Slot (left|start)",
        regex: /(icon-start|icon-left)/g,
        replacement: 'slot="start"'
      }, {
        name: "Icon Slot (right|end)",
        regex: /(icon-end|icon-right)/g,
        replacement: 'slot="end"'
      }, {
        name: "Item Slot (left|start)",
        regex: /(item-start|item-left)/g,
        replacement: 'slot="start"'
      }, {
        name: "Item Slot (right|end)",
        regex: /(item-end|item-right)/g,
        replacement: 'slot="end"'
      }, {
        name: "Select Option (ion-option)",
        regex: /<ion-option([\s\S]*?)<\/ion-option>/g,
        replacement: '<ion-select-option$1</ion-select-option>'
      }, {
        name: "Radio group attribute [radio-group]",
        regex: /<(.*?) ([\s\S]*?)radio-group([\s\S]*?)>([\s\S]*?)<\/\1>/g,
        replacement: '<$1 $2$3>\n<ion-radio-group>$4<ion-radio-group>\n</$1>'
      }, {
        name: "Ion-Buttons (start)",
        regex: /<ion-buttons([\s\S]*?) start([\s\S]*?)<\/ion-buttons>/g,
        replacement: '<ion-buttons$1 slot="mode-start"$2</ion-buttons>'
      }, {
        name: "Ion-Buttons (end)",
        regex: /<ion-buttons([\s\S]*?) end([\s\S]*?)<\/ion-buttons>/g,
        replacement: '<ion-buttons$1 slot="mode-end"$2</ion-buttons>'
      }, {
        name: "Ion-Buttons (left)",
        regex: /<ion-buttons([\s\S]*?) left([\s\S]*?)<\/ion-buttons>/g,
        replacement: '<ion-buttons$1 slot="start"$2</ion-buttons>'
      }, {
        name: "Ion-Buttons (right)",
        regex: /<ion-buttons([\s\S]*?) right([\s\S]*?)<\/ion-buttons>/g,
        replacement: '<ion-buttons$1 slot="end"$2</ion-buttons>'
      }
    ];


    rules.forEach(rule => {
      console.log("Fixing", rule.name);
      replace({
        regex: rule.regex, // any amount of (../) followed by `packages`
        replacement: rule.replacement,
        paths: ['v4/'],
        recursive: true,
        silent: false
      });
      console.log('-'.repeat(10));
    });

    console.log('-'.repeat(20));
    // TODO
    console.warn("Need to add ion-label in items", "https://github.com/ionic-team/ionic/blob/core/packages/ionic-angular/BREAKING.md#label-required");
    console.warn("Need to add radio slot", "https://github.com/ionic-team/ionic/blob/core/packages/ionic-angular/BREAKING.md#slot-required");
    // Can't do
    console.error("Could not move fabs to fixed content", "https://github.com/ionic-team/ionic/blob/core/packages/ionic-angular/BREAKING.md#fixed-content");
    console.error("Could not change icon color CSS", "https://github.com/ionic-team/ionic/blob/core/packages/ionic-angular/BREAKING.md#icon");
    console.error("Change 'Option' to 'SelectOption' in TS", "https://github.com/ionic-team/ionic/blob/core/packages/ionic-angular/BREAKING.md#class-changed");
    console.error("Many SCSS variables are deprecated", "https://github.com/ionic-team/ionic/blob/core/packages/ionic-angular/BREAKING.md#sass");
    console.log('-'.repeat(20));
  }, 1000);
});
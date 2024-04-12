export class spellcount {
  static init() {
    Hooks.on("renderActorSheet5eCharacter2", spellcount._preparedSpells);
  };

  static _preparedSpells(app, [html]) {
    if (!app.constructor.name === 'ActorSheet5eCharacter2') return;
    if (!app.document.testUserPermission(game.user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER)) return;
    const prep = app.document.items.reduce((acc, i) => {
      if (i.type === 'spell' && i.system.preparation.mode === "prepared" && i.system.preparation.prepared && i.system.level !== 0) {
        acc.push(i.name);
      }
      return acc;
    }, []).length;
    const headers = html.querySelectorAll('div[data-type="spell"]');
    for (const header of headers) {
      const type = header.querySelector('h3[class="item-name spell-header"]').textContent;
      if (app._mode === 1 && !type.includes('Innate') && !type.includes('At-Will') && !type.includes('Cantrip') && !type.includes('Pact')) {
        const controls = header.querySelector('div[class="item-header item-controls"]');
        controls.textContent = `${prep}`;
        controls.setAttribute("data-tooltip", "Total Prepared Spells");
        controls.setAttribute("style", "color: white;");
      };
    };
  };
};
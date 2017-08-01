const { remote } = require('electron');
const { MenuItem } = remote;
const { SpellCheckHandler, ContextMenuListener, ContextMenuBuilder } = require('electron-spellchecker');

class SpellCheckHelper {

    constructor() {
        this.spellCheckHandler = new SpellCheckHandler();
    }

    /**
     * Method to initialize spell checker
     */
    initializeSpellChecker() {
        this.spellCheckHandler.attachToInput();

        const contextMenuBuilder = new ContextMenuBuilder(this.spellCheckHandler, null, false, SpellCheckHelper.processMenu);
        this.contextMenuListener = new ContextMenuListener((info) => {
            contextMenuBuilder.showPopupMenu(info);
        });
    }

    /**
     * Method to add default menu items to the
     * menu that was generated by ContextMenuBuilder
     *
     * This method will be invoked by electron-spellchecker
     * before showing the context menu
     *
     * @param menu
     * @returns menu
     */
    static processMenu(menu) {
        menu.append(new MenuItem({ type: 'separator' }));
        menu.append(new MenuItem({
            role: 'reload',
            accelerator: 'CmdOrCtrl+R',
            label: 'Reload'
        }));
        return menu;
    }

}

module.exports = {
    SpellCheckHelper: SpellCheckHelper
};
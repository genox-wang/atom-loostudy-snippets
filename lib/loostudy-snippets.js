'use babel';

import LoostudySnippetsView from './loostudy-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  loostudySnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.loostudySnippetsView = new LoostudySnippetsView(state.loostudySnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.loostudySnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'loostudy-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.loostudySnippetsView.destroy();
  },

  serialize() {
    return {
      loostudySnippetsViewState: this.loostudySnippetsView.serialize()
    };
  },

  toggle() {
    console.log('LoostudySnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

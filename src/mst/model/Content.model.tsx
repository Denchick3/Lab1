import { getParent, getParentOfType, types } from 'mobx-state-tree';
import RootStore from '../store/RootStore';

export const ContentModel = types
  .model('ContentModel', {
    id: types.identifier,
    title: '',
    description: '',
    seen: false,
    notes: '',
  })
  .views((self) => ({
    get isSeen() {
      return self.seen;
    },

    findInTitle(param: string) {
      return self.title.includes(param);
    },
  }))
  .actions((self) => ({
    changeNotes(value: string) {
      self.notes = value;
      const rootStore = getParentOfType(self, RootStore);
      rootStore.setDataToLocalStorage(rootStore);
    },

    changeSeen(state: boolean) {
      console.log('>>state', state);
      self.seen = state;
      const rootStore = getParentOfType(self, RootStore);
      rootStore.setDataToLocalStorage(rootStore);
    },

    addNote() {
      const rootStore = getParentOfType(self, RootStore);
      rootStore.addNote(self);
      rootStore.setDataToLocalStorage(rootStore);
    },

    removeNote() {
      const rootStore = getParentOfType(self, RootStore);
      rootStore.removeNote(self.id);
      rootStore.setDataToLocalStorage(rootStore);
    },
  })); 
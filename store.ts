import create from 'zustand'
import { EditedComment, EditedNote } from './types/types'

type State = {
  editedComment: EditedComment
  editedNote: EditedNote
  updateEditedComment: (payload: EditedComment) => void
  updateEditedNote: (payload: EditedNote) => void
  resetEditedComment: () => void
  resetEditedNote: () => void
}
const useStore = create<State>((set, _) => ({
  editedNote: { id: '', title: '', content: '' },
  editedComment: { id: '', content: '' },
  updateEditedNote: (payload) =>
    set({
      //editedNoteの状態を変更するだけ。ここではsupabaseに更新の処理をしているわけではない
      editedNote: {
        id: payload.id,
        title: payload.title,
        content: payload.content,
      },
    }),
  resetEditedNote: () =>
    set({ editedNote: { id: '', title: '', content: '' } }), //editedNoteの状態を変更するだけ。ここではsupabaseに削除の処理をしているわけではない
  updateEditedComment: (payload) =>
    set({
      editedComment: { id: payload.id, content: payload.content },
    }),
  resetEditedComment: () => set({ editedComment: { id: '', content: '' } }),
}))
export default useStore

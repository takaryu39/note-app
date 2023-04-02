import { FC, FormEvent, useState } from 'react'
import { useMutateNote } from '../hooks/useMutateNote'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spinner'

export const NoteForm: FC = () => {
  const { editedNote } = useStore()
  const update = useStore((state) => state.updateEditedNote)
  const { createNoteMutation, updateNoteMutation } = useMutateNote()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNote.id === '')
      createNoteMutation.mutate({
        //新規作成はeditedNoteに値がセットされていないからこちらが処理される
        //ここで初めてsupabaseに値を送信する。
        title: editedNote.title,
        content: editedNote.content,
        user_id: supabase.auth.user()?.id,
      })
    else {
      updateNoteMutation.mutate({
        //更新の場合はupdate関数が走ってidに値がセットされるからこちらが、処理される
        //ここで初めてsupabaseに値を送信する。
        id: editedNote.id,
        title: editedNote.title,
        content: editedNote.content,
      })
    }
  }
  if (updateNoteMutation.isLoading || createNoteMutation.isLoading) {
    return <Spinner />
  }
  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="title"
          value={editedNote.title}
          onChange={(e) => update({ ...editedNote, title: e.target.value })}
        />
      </div>
      <div>
        <textarea
          cols={50}
          rows={10}
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="content"
          value={editedNote.content}
          onChange={(e) => update({ ...editedNote, content: e.target.value })}
        />
      </div>
      <div className="my-2 flex justify-center">
        <button
          type="submit"
          className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {editedNote.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

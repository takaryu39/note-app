import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { FC, useEffect, useState } from 'react'
import { useMutateComment } from '../hooks/useMutateComment'
import useStore from '../store'
import { Comment } from '../types/types'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spinner'

export const CommentItem: FC<Omit<Comment, 'created_at' | 'note_id'>> = ({
  id,
  content,
  user_id,
}) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedComment)
  const { deleteCommentMutation } = useMutateComment()
  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])
  if (deleteCommentMutation.isLoading) {
    return <Spinner />
  }
  return (
    <li className="my-3">
      <span>{content}</span>
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilAltIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                content: content,
              })
            }}
          />
          <TrashIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteCommentMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}

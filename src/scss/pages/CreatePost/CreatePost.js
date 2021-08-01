import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { createPost } from '../../../redux/actions'

const CreatePost = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [postText, setPostText] = useState('')
    const handeChange = (e) => {
        setPostText(e.target.value)
    }
    const onCreatePost = () => {
        dispatch(createPost({text: postText}))

        setPostText('')
        history.push('/')
    }

    return (
        <section className="createPost">
            <h1>Create post</h1>
            <div>
                <input type="text" value={postText} onChange={(e) => handeChange(e)} />
                <button onClick={() => onCreatePost()}>Create</button>
            </div>
        </section>
    )
}

export default CreatePost

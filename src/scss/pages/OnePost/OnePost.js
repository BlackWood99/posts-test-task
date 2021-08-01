import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router"
import Comment from "../../../components/Comment"
import { deletePost, editPost, getCurrPost } from "../../../redux/actions"

const OnePost = (props) => {
	const history = useHistory()
	const [currId, setCurrId] = useState(+props.match.params.id)
	useEffect(() => {
		setCurrId(+props.match.params.id)
	}, [props.match])

	useEffect(() => {
		props.getCurrPost(currId)
	}, [props.match, currId])

	const [isEditmode, setIsEditmode] = useState(false)
	const onOpenEditmode = () => {
		setIsEditmode(true)
	}
	const onSaveChanges = () => {
		props.editPost(currId, postText)
		setIsEditmode(false)
	}

	const [postText, setPostText] = useState(props.post.text)
	useEffect(() => {
		setPostText(props.post.text)
	}, [props.post])
	const handleChange = (e) => {
		setPostText(e.target.value)
	}

	const onDeletePost = () => {
		const confirmDelete = window.confirm("Are you sure about deleting?")
		if (confirmDelete) props.deletePost(props.post.id)
		history.push('/')
	}

	if (props.isLoading) return <h1>Loading...</h1>

	return (
		<section className='onePost'>
			<div className='post'>
				{isEditmode ? (
					<div className='post-editBlock'>
						<textarea
							className='post-textarea'
							value={postText}
							onChange={(e) => handleChange(e)}
						/>
						<button className='btn-save' onClick={() => onSaveChanges()}>
							Save
						</button>
					</div>
				) : (
					<>
						<p className='post-text'>{postText}</p>
						{props.token && (props.post.user_id === props.userId) ? (
							<div className='post-actions'>
								<button onClick={() => onOpenEditmode()}>Edit</button>
								<button onClick={() => onDeletePost()}>Delete</button>
							</div>
						) : null}
					</>
				)}
			</div>
			<div className='comments'>
				<h2>Comments:</h2>
				<div className='comment-list'>
					{props.post.comments?.map((comment) => (
						<Comment key={comment.id} comment={comment} />
					))}
				</div>
				
			</div>
		</section>
	)
}

const mapStateToProps = (state) => {
	return {
		post: state.currPost.currPost,
		isLoading: state.currPost.isLoading,
		token: state.auth.token,
		userId: state.auth.userId,
	}
}

const mapDispatchToProps = { getCurrPost, editPost, deletePost }

export default connect(mapStateToProps, mapDispatchToProps)(OnePost)

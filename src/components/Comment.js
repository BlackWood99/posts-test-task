import React from "react"

const Comment = ({comment}) => {
	return (
		<div className='comment-list_item'>
			<div className='comment-header'>
				<h3>Username</h3>
			</div>
			<p className='comment-text'>
				{comment.text}
			</p>
		</div>
	)
}

export default Comment

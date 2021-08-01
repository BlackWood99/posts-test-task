import React from "react"
import { NavLink } from "react-router-dom"

const Post = ({ post }) => {
	return (
		<div className="post-item">
			<NavLink to={`/posts/${post.id}`} className="post-link">
				<p>{post.text}</p>
			</NavLink>
		</div>
	)
}

export default Post

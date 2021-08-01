import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import Post from "../../components/Post"

const AllPosts = (props) => {

	const [posts, setPosts] = useState(props.posts)
	useEffect(() => {
		setPosts(props.posts)
	}, [props.posts])

	//if (props.isLoading) return <h1>Loading...</h1>

	return (
		<section className='allPosts'>
			<div className='posts-list'>
				{posts.map((post) => (
					<Post key={post.id} post={post} />
				))}
			</div>
		</section>
	)
}

const mapStateToProps = (state) => {
	return {
		posts: state.postsPage.posts,
		isLoading: state.postsPage.isLoading
	}
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)

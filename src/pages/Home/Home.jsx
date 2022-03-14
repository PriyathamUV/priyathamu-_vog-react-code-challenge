import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../store/posts"

const Home = () => {
	const dispatch = useDispatch()
	const data = useSelector((store) => store)

	useEffect(() => {
		dispatch(getPosts())
	}, [dispatch])

	console.log(data)
	return <div>Home Page</div>
}

export default Home
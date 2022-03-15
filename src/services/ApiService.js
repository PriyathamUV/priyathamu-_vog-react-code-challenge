import axios from "axios"

export const getUniversities = async (country) => {
	try {
		const response = await axios.get(
			`http://universities.hipolabs.com/search?country=${country}`
		)
		return response.data
	} catch (error) {
		throw error
	}
}

export const getPosts = async () => {
	try {
		const response = await axios.get(
			"https://jsonplaceholder.typicode.com/posts"
		)
		return response.data
	} catch (error) {
		throw error
	}
}


export const addPost = async (payload) => {
	try {
		const response = await axios.post(
			"https://jsonplaceholder.typicode.com/posts",
			payload
		)
		return response.data
	} catch (error) {
		throw error
	}
}

export const editPost = async (payload) => {
	const { id } = payload
	try {
		const response = await axios.put(
			`https://jsonplaceholder.typicode.com/posts/${id}`,
			payload
		)
		return response.data
	} catch (error) {
		throw error
	}
}

export const removePost = async (id) => {
	try {
		const response = await axios.delete(
			`https://jsonplaceholder.typicode.com/posts/${id}`
		)
		return response.data
	} catch (error) {
		throw error
	}
}

export const getAreaDetails = async (code) => {
	try {
		const response = await axios.get(`https://api.zippopotam.us/us/${code}`)
		return response.data
	} catch (error) {
		throw error
	}
}
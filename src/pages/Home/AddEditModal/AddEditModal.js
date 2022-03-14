import React, { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { useDispatch, useSelector } from "react-redux"
import { addPost, editPost } from "../../../store/posts"

const AddEditModal = ({ open, setOpen, postId }) => {
	const dispatch = useDispatch()
	const isEdit = !!postId
	const [inputs, setInputs] = useState({
		title: "",
		body: "",
		userId: 1,
	})

	const handleClose = () => setOpen(false)

	const posts = useSelector((store) => store.posts.posts)

	useEffect(() => {
		if (isEdit) {
			const { id, ...post } = posts.find((item) => item.id === postId)
			setInputs({ ...post })
		}
	}, [isEdit, postId, posts])

	const handleInputs = (e) => {
		const name = e.target.name
		const value = e.target.value
		setInputs((inputs) => ({
			...inputs,
			[name]: value,
		}))
	}

	const handleAction = () => {
		if (isEdit) dispatch(editPost({ ...inputs, id: postId }))
		else dispatch(addPost(inputs))
		handleClose()
	}

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<DialogTitle>{isEdit ? "Edit" : "Add"} Post</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="title"
					name="title"
					label="Title"
					fullWidth
					variant="standard"
					value={inputs.title}
					onChange={handleInputs}
				/>
				<TextField
					rows={5}
					multiline
					margin="dense"
					id="body"
					name="body"
					label="Body"
					fullWidth
					variant="standard"
					value={inputs.body}
					onChange={handleInputs}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleAction} variant="contained">
					{isEdit ? "Update" : "Add"}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddEditModal
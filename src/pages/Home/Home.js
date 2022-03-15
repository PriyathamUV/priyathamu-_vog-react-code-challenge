import React, { useState, useEffect, useMemo } from "react"
import { makeStyles } from "@mui/styles"
import { useDispatch, useSelector } from "react-redux"
import { getPosts, removePost } from "../../store/posts"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import AddEditModal from "./AddEditModal/AddEditModal"

const useStyles = makeStyles(() => ({
	root: {
		padding: "1rem",
	},
	posts: {
		padding: "1rem",
	},
	actions: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: "1rem",
		paddingRight: "1rem",
	},
}))

const Home = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const data = useSelector((store) => store.posts)

	const [open, setOpen] = useState(false)
	const [postId, setPostId] = useState(0)
	const [userId, setUserId] = useState("")

	useEffect(() => {
		dispatch(getPosts())
	}, [dispatch])

	const handleAdd = () => {
		setOpen(true)
		setPostId(0)
	}

	const handleEdit = (id) => {
		setOpen(true)
		setPostId(id)
	}

	const handleDelete = (id) => {
		dispatch(removePost(id))
	}

	const filteredData = useMemo(
		() =>
			!!userId
				? data.posts.filter((record) => record.userId == userId)
				: data.posts,
		[data, userId]
	)

	return (
		<div className={classes.root}>
			{data.isLoading ? (
				<Backdrop
					sx={{
						color: "#fff",
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={data.isLoading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : (
				<div>
					<Typography variant="h4" component="div">
						Posts
					</Typography>
					<div className={classes.actions}>
						<Paper
							component="form"
							sx={{
								p: "2px 4px",
								display: "flex",
								alignItems: "center",
								width: 400,
							}}
						>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder="Search"
								inputProps={{ "aria-label": "search" }}
								value={userId}
								onChange={(e) => setUserId(e.target.value)}
							/>
							
						</Paper>
						<Button
							size="small"
							variant="contained"
							color="primary"
							onClick={handleAdd}
						>
							Add Post
						</Button>
					</div>
					{filteredData.map((item) => (
						<div className={classes.posts}>
							<Card>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
									>
										{item.title}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										{item.body}
									</Typography>
									<Typography variant="h6">
										User Id: {item.userId}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										size="small"
										color="primary"
										onClick={() => handleEdit(item.id)}
									>
										Edit
									</Button>
									<Button
										size="small"
										color="warning"
										onClick={() => handleDelete(item.id)}
									>
										Delete
									</Button>
								</CardActions>
							</Card>
						</div>
					))}
				</div>
			)}
			{open && (
				<AddEditModal open={open} setOpen={setOpen} postId={postId} />
			)}
		</div>
	)
}

export default Home
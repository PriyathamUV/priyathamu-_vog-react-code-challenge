import React from "react"
import { makeStyles } from "@mui/styles"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
		button: {
			color: "white",
		},
	},
	title: {
		display: "flex",
		flexGrow: 1,
	},
	headerOptions: {
		display: "flex",
		// flexBasis: "row",
		a: {
			textDecoration: "none !important",
		},
	},
	link: {
		color: "white",
		marginLeft: "2rem !important",
	},
}))

const Header = () => {
	const classes = useStyles()

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h4"
						component="div"
						className={classes.title}
					>
						React Code Challenge
					</Typography>
					<div className={classes.headerOptions}>
						<Link to="/">
							<Typography className={classes.link} variant="h6">
								HOME
							</Typography>
						</Link>

						<Link to="/universities">
							<Typography className={classes.link} variant="h6">
								UNIVERSITIES
							</Typography>
						</Link>

						<Link to="/postal-lookup">
							<Typography className={classes.link} variant="h6">
								POSTAL LOOKUP
							</Typography>
						</Link>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header
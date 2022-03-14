import React, { useState, useEffect } from "react"
import { makeStyles } from "@mui/styles"
import { useDispatch, useSelector } from "react-redux"
import { getUniversities } from "../../store/universities"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

const useStyles = makeStyles(() => ({
	root: {
		padding: "1rem",
	},
}))

const Universities = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const data = useSelector((store) => store.universities)

	const [country, setCountry] = useState("Canada")

	useEffect(() => {
		dispatch(getUniversities(country))
	}, [dispatch, country])

	const handleChange = (e) => {
		setCountry(e.target.value)
	}

	// Countries api is not working
	const countries = [
		"United Kingdom",
		"Canada",
		"United States",
		"Jordan",
		"Kuwait",
		"Turkey",
	]

	return (
		<>
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
				<div className={classes.root}>
					<Typography variant="h4" component="div">
						Universities
					</Typography>
					<div>
						<Paper
							component="form"
							sx={{
								p: "2px 4px",
								display: "flex",
								alignItems: "center",
								width: 400,
							}}
						>
							<Select
								id="country-select"
								value={country}
								label="Age"
								onChange={handleChange}
							>
								{countries.map((name) => (
									<MenuItem key={name} value={name}>
										{name}
									</MenuItem>
								))}
							</Select>
						</Paper>
					</div>
					<TableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							size="small"
							aria-label="a dense table"
						>
							<TableHead>
								<TableRow>
									<TableCell>
										<b>University Name</b>
									</TableCell>
									<TableCell>Alpha Two Code</TableCell>
									{/* <TableCell>State Province</TableCell> */}
									<TableCell>Country</TableCell>
									<TableCell>Domains</TableCell>
									<TableCell>Websites</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.universities.map((row, i) => (
									<TableRow
										key={row.name + i}
										sx={{
											"&:last-child td, &:last-child th":
												{
													border: 0,
												},
										}}
									>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell>
											{row.alpha_two_code}
										</TableCell>
										{/* <TableCell>{row.state-province}</TableCell> */}
										<TableCell>{row.country}</TableCell>
										<TableCell>{row.domains}</TableCell>
										<TableCell>{row.web_pages}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			)}
		</>
	)
}

export default Universities
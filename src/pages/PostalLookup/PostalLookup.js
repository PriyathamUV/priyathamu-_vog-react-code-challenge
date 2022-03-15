import React, { useEffect, useState } from "react"
import { makeStyles } from "@mui/styles"
import { getAreaDetails } from "../../store/postalLookup"
import { useDispatch, useSelector } from "react-redux"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"

const useStyles = makeStyles(() => ({
	root: {
		padding: "1rem",
	},
}))

const PostalLookup = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const data = useSelector((store) => store.postalLookup)
	const [code, setCode] = useState("")

	const handleChange = (e) => {
		setCode(e.target.value)
	}

	const onSearch = (pCode) => {
		if (pCode && pCode !== "")
			dispatch(getAreaDetails(pCode))
	}

	data.areaDetails = JSON.parse(JSON.stringify(data.areaDetails).replace(/\s(?=\w+":)/g, ""))
	console.log(data)

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
			) :
				(
					<div className={classes.root}>
						<Typography variant="h4" component="div">
							PostalLookup
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
									value={code.value}
									onChange={handleChange}
									onSubmit={e => e.preventDefault()}
								/>
								<IconButton
									sx={{ p: "10px" }}
									aria-label="search"
									onClick={() => onSearch(code)}
								>
									<SearchIcon />
								</IconButton>
							</Paper>
						</div>
						{
							Object.keys(data.areaDetails).length ?(
								<TableContainer>
									<Table>
										<TableBody>
											<TableRow>
												<TableCell>
													<b>Country</b>
												</TableCell>
												<TableCell>
													{data.areaDetails.country}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<b>Country Abbreviaition</b>
												</TableCell>
												<TableCell>
													{data.areaDetails.countryabbreviation}
												</TableCell>
											</TableRow>
											{
												data.areaDetails.places.map(
													(post) => (
														<>
															<TableRow>
																<TableCell><b>Latitude</b></TableCell>
																<TableCell>{post.latitude}</TableCell>
															</TableRow>
															<TableRow>
																<TableCell><b>Longitude</b></TableCell>
																<TableCell>{post.longitude}</TableCell>
															</TableRow>
															<TableRow>
																<TableCell><b>Place Name</b></TableCell>
																<TableCell>{post.placename}</TableCell>
															</TableRow>
															<TableRow>
																<TableCell><b>State</b></TableCell>
																<TableCell>{post.state}</TableCell>
															</TableRow>
															<TableRow>
																<TableCell><b>State Abbreviation</b></TableCell>
																<TableCell>{post.stateabbreviation}</TableCell>
															</TableRow>
														</>

													)
												)

											}

											<TableRow>
												<TableCell>
													<b>Postcode</b>
												</TableCell>
												<TableCell>
													{data.areaDetails.postcode}
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>

							) :
								(
									<div>No data</div>

								)
						}

					</div>
				)
			}
		</>
	)
}

export default PostalLookup
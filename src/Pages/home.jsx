import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import bg from "../Assets/bg-cafe.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import ratingEmpty from "../Assets/Star.svg";
import ratingFilled from "../Assets/Star_fill.svg";
import vector from '../Assets/vector.svg'

export default function Home() {
  document.title = "Coffee List";

  const [active, setActive] = useState("all");
  const [apiData, setApiData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  async function fetchData() {
    try {
      const dataTemp = await axios.get(
        "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json"
      );
      const data = dataTemp.data;
      setApiData(data);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const filteredData = (active) => {
    if (active === "availNow"){
      const availData = apiData.filter((item) => item.available === true);
      setFilterData(availData);
    }else if (active === "all"){
      setFilterData(apiData);
    }
  }

  const filterAll = () =>{
    setActive("all");
  }

  const filterAvail = () =>{
    setActive("availNow");
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filteredData(active);
  }, [active, apiData]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1B1D1F",
        minHeight: "100vh",
        width: "100%",
        backgroundSize: "100% 40%",
        boxSizing: "border-box",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          padding: 10,
          zIndex: 99,
          backgroundColor: "#111315",
          borderRadius: "20px",
          margin: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={vector} alt="img1" style={{position:"absolute", right: "35%", top:"20%"}}/>
          <Typography color="white" fontSize={"2rem"} zIndex={999}>
            Our Collection
          </Typography>
          <Typography
            color="#6F757C"
            textAlign="center"
            paragraph
            fontSize={"1rem"}
            zIndex={999}
          >
            Introducing our Coffee Collection, a selection of unique coffees
            <br />
            from different roast types and origins, expertly roasted in small
            <br />
            batches and shipped fresh weekly.
          </Typography>
          <Box display="flex" gap={1}>
            <Button
              onClick={filterAll}
              size="medium"
              sx={{
                backgroundColor: active === "all" ? "#6F757C" : "",
                color: "white",
                textTransform: "initial",
                fontSize: "0.875rem",
                borderRadius: "8px",
              }}
            >
              All Products
            </Button>
            <Button
              onClick={filterAvail}
              size="medium"
              sx={{
                backgroundColor: active === "availNow" ? "#6F757C" : "",
                color: "white",
                textTransform: "initial",
                fontSize: "0.875rem",
                borderRadius: "8px",
              }}
            >
              Available Now
            </Button>
          </Box>
        </Box>
        <Box mt={4}>
          <Grid container spacing={3}>
            {filterData.map((item, index) => (
              <Grid item lg={4} md={6} xs={12} key={index}>
                <Card sx={{ backgroundColor: "inherit", color: "white" }}>
                  <CardActionArea>
                    {item.popular && (
                      <Chip
                        label="Popular"
                        size="medium"
                        sx={{
                          position: "absolute",
                          zIndex: 1,
                          margin: 1,
                          backgroundColor: "#F6C768",
                          padding: 1,
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ borderRadius: "25px" }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography component="div" fontSize={"1rem"}>
                          {item.name}
                        </Typography>
                        <Chip
                          label={`${item.price.replace("$", "₹ ")}`}
                          size="small"
                          sx={{ backgroundColor: "#a8e6cf", color: "black" }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {item.rating ? (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                              src={ratingFilled}
                              alt="img"
                              style={{ marginRight: "4px", width: "20px" }}
                            />
                            <Typography fontSize={"0.75rem"}>
                              {item.rating} ({item.votes} votes)
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                              src={ratingEmpty}
                              alt="img"
                              sx={{ marginRight: "4px", width: "20px" }}
                            />
                            <Typography fontSize={"0.75rem"} color="#6F757C">
                              No ratings
                            </Typography>
                          </Box>
                        )}
                        {item.available === false && (
                        <Typography fontSize={"0.75rem"} color="#ED735D">
                          Sold out
                        </Typography>
                      )}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import { CardHeader } from "@mui/material";

import Avatar from "@mui/material/Avatar";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment";
import StickyHeadroom from "@integreat-app/react-sticky-headroom";

const CartScreen = ({ cartData, search }) => {
  const [newCartData, setNewCartData] = useState([]);
  const [sortCartDataByDate, setSortCartDataByDate] = useState([]);

  const fetchData = () => {
    let arrayCardData = cartData;
    arrayCardData.sort(function (x, y) {
      return new Date(x.date).getTime() - new Date(y.date).getTime();
    });
    arrayCardData = arrayCardData.filter((f) => f.title.includes(search));
    const uniqueDate = [...new Set(arrayCardData.map((obj) => obj.date))];
    setSortCartDataByDate(uniqueDate);
    setNewCartData(arrayCardData);
  };

  useEffect(() => {
    fetchData();
    return;
  }, [search]);

  const firstDateFormat = (date) => {
    let objectDate = new Date(date);
    return `${moment(objectDate.getTime()).format("DD.MM.YYYY HH:mm:ss")}`;
  };

  const SecondDateFormat = (date) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let objectDate = new Date(date);
    return `${days[objectDate.getDay()]} ${
      months[objectDate.getMonth()]
    } ${objectDate.getFullYear()}`;
  };

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
        }}
      >
        <Container>
          <Typography
            component="h1"
            variant="h2"
            align="left"
            color="text.primary"
          >
            Cart
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 2 }}>
        {sortCartDataByDate.map((i) => (
          <div key={i}>
            <StickyHeadroom>
              <div style={{ backgroundColor: "#ffffffd1" }}>
                <Typography
                  component="h1"
                  variant="h5"
                  align="left"
                  sx={{
                    color: "#3f93e5",
                    pt: 2,
                    fontWeight: 600,
                  }}
                  gutterBottom
                >
                  {SecondDateFormat(i)}
                </Typography>
              </div>
            </StickyHeadroom>

            <Grid container spacing={4}>
              {newCartData.map(
                (item) =>
                  i === item.date && (
                    <Grid item key={item._id} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardHeader
                          sx={{ height: "100px" }}
                          avatar={
                            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                              E
                            </Avatar>
                          }
                          title={item.title}
                        />
                        <CardMedia
                          component="div"
                          sx={{
                            pt: "100%",
                          }}
                          image={item.flyerFront}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Grid>
                            <LocationOnIcon
                              sx={{ color: "#3f93e5", marginBottom: "-5px" }}
                            />
                            <Link
                              href={item.venue.direction}
                              rel="noopener"
                              underline="none"
                              target="_blank"
                              sx={{
                                fontSize: "15px",
                                color: "black",
                              }}
                            >
                              {item.venue.name}
                            </Link>
                          </Grid>
                          <Typography>
                            | Starts: {firstDateFormat(item.startTime)}
                          </Typography>
                          <Typography>
                            | Ends: {firstDateFormat(item.endTime)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
              )}
            </Grid>
          </div>
        ))}
      </Container>
    </main>
  );
};
export default CartScreen;

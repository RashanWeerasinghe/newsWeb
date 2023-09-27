import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { articles } from "./data";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function App() {
  const [data, setData] = useState(null);

  const baseUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
    import.meta.env.API_KEY
  }`;
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((result) => {
        const sorted = result.data.articles.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        setData(sorted);
      })
      .catch((err) => console.log(err));

    // const sorted = articles.sort(
    //   (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    // );
    // console.log(sorted);
    // setData(sorted);
  }, [baseUrl, data]);

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          m: 1,
          p: 1,
          gridTemplateRows: "auto",
        }}
      >
        <Grid container spacing={2}>
          {data == null
            ? null
            : data.map((res) => {
                return res.source.id == null ? null : (
                  <Grid item xs={12} sm={6} md={4} key={res.url} spacing={5}>
                    <Card>
                      <CardActionArea>
                        <a style={{ textDecoration: "none" }} href={res.url}>
                          <CardHeader
                            title={res.title}
                            subheader={`by ${res.author} - ${res.source.name} `}
                            titleTypographyProps={{ align: "left" }}
                            subheaderTypographyProps={{ align: "left" }}
                          />
                        </a>
                        <CardContent>
                          <Typography
                            align="left"
                            variant="body2"
                            color="text.secondary"
                          >
                            {new Date(res.publishedAt).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <img
                            src={res.urlToImage}
                            style={{ width: 150, height: 150, padding: 10 }}
                            alt="example"
                          />

                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              {res.content}
                              <a
                                style={{ textDecoration: "none" }}
                                href={res.url}
                              >
                                <Button size="small">Read More</Button>
                              </a>
                            </Typography>
                          </CardContent>
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
      </Box>
    </div>
  );
}

export default App;

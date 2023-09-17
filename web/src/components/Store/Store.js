import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const mockData = [
  {
    id: 1,
    title: "Item 1",
    image: "https://as2.ftcdn.net/v2/jpg/04/41/42/21/1000_F_441422101_P8d4FYIGtVhh9OCSRBWxoK0MkJXWRpBO.jpg",
    price: '5.0',
    description: "Price: 5.0 GTCLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    title: "Item 2",
    price: '6.0',
    image: "https://as2.ftcdn.net/v2/jpg/04/41/42/21/1000_F_441422101_P8d4FYIGtVhh9OCSRBWxoK0MkJXWRpBO.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    title: "Item 3",
    price: '6.0',
    image: "https://as2.ftcdn.net/v2/jpg/04/41/42/21/1000_F_441422101_P8d4FYIGtVhh9OCSRBWxoK0MkJXWRpBO.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    title: "Item 4",
    price: '6.0',
    image: "https://as2.ftcdn.net/v2/jpg/04/41/42/21/1000_F_441422101_P8d4FYIGtVhh9OCSRBWxoK0MkJXWRpBO.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    title: "Item 5",
    price: '6.0',
    image: "https://as2.ftcdn.net/v2/jpg/04/41/42/21/1000_F_441422101_P8d4FYIGtVhh9OCSRBWxoK0MkJXWRpBO.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 6,
    title: "Item 6",
    price: '6.0',
    image: "https://as2.ftcdn.net/v2/jpg/04/41/42/21/1000_F_441422101_P8d4FYIGtVhh9OCSRBWxoK0MkJXWRpBO.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 7,
    title: "Item 7",
    price: '6.0',
    image: "https://as2.ftcdn.net/v2/jpg/04/41/42/21/1000_F_441422101_P8d4FYIGtVhh9OCSRBWxoK0MkJXWRpBO.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 8,
    title: "Item 8",
    price: '6.0',
    image: "https://as2.ftcdn.net/v2/jpg/04/41/42/21/1000_F_441422101_P8d4FYIGtVhh9OCSRBWxoK0MkJXWRpBO.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  // ... add more items with descriptions if needed
];

const customTheme = createTheme({
  palette: {
    secondary: {
      main: "#FF0000",
    },
  },
});

const Store = () => {
  const [openDesc, setOpenDesc] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");

  const handleOpenDesc = (description) => {
    setCurrentDescription(description);
    setOpenDesc(true);
  };

  const handleCloseDesc = () => setOpenDesc(false);
  const handleOpenPurchase = () => setOpenPurchase(true);
  const handleClosePurchase = () => setOpenPurchase(false);

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          //justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "background.main",
          overflowY: "auto",
          padding: 4,
        }}
      >
        <Typography varient="h4" sx={{fontSize: '40px', fontFamily: 'Abril Fatface', color: "black", paddingBottom: 4}}>
        Game<span className="highlighted-text-nav">Stoppr</span> Marketplace
    </Typography>
        <Grid container spacing={4}>
          {mockData.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card sx={{ display: 'flex', boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="180"
                  width="50%"
                  image={item.image}
                  alt={item.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography gutterBottom component="div">
                      Price: {item.price} GTC
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => handleOpenDesc(item.description)}
                    >
                      Description
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      sx={{ marginLeft: 1 }}
                      onClick={handleOpenPurchase}
                    >
                      Purchase
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog open={openDesc} onClose={handleCloseDesc}>
          <DialogTitle>Description</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{currentDescription}</Typography>
          </DialogContent>
        </Dialog>
        <Dialog open={openPurchase} onClose={handleClosePurchase}>
          <DialogTitle>Purchase</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Purchase information goes here.</Typography>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Store;

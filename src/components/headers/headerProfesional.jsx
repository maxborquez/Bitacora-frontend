import { Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logoubb from "../../assets/logoubb.png";
import { useNavigate } from "react-router-dom";

const HeaderProfesional = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
  
    navigate(-1); 
  };

  return (
    <Grid container sx={{ zIndex: 10 }}>
      <Grid
        item
        sx={{
          width: "100%",
          display: "flex",
          backgroundColor: "#326FA6",
          height: "80px",
          alignItems: "center",
          justifyContent: "space-between", 
          padding: "0 20px", 
        }}
      >
        <img
          style={{
            display: "block",
            marginLeft: "60px",
            width: "130px",
          }}
          src={logoubb}
          alt="Logo"
        />
     
        <IconButton
          onClick={handleGoBack}
          color="inherit"
          sx={{ backgroundColor: "white",
          borderRadius: 0, 
          padding: 1
        }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default HeaderProfesional;


import { Grid} from "@mui/material";
import logoubb from "../../assets/logoubb.png";

const HeaderAlumno = () => {
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
         
        </Grid>
      </Grid>
    );
  };
  
  export default HeaderAlumno;
  
import { DropzoneArea } from "material-ui-dropzone";
import ImageUploaderCss from "./ImageUploaderCss";
import { Grid, Button, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { postData } from "../NodeServices/Services";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';

export default function ImageUploader() {
  const classes = ImageUploaderCss();
  var location = useLocation();
var k =location.state.res.email


  //console.log("hhhhhh", location.state.res.fullname);
  const navigate=useNavigate()

  const [Picture, setPicture] = useState({ bytes: " ", Url: "/photo.jpg" });
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState(k);
  const [btnStatus,setBtnStatus] = useState(false);

  const handleChange = (event) => {
    setPicture({
      bytes: event.target.files[0],
      Url: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleReset = () => {
    setPicture({ bytes: "", Url: "/photo.jpg" });
  };


  const handelLogin=()=>{
    navigate('/login')
  }

  const handleNavigation=()=>{
  navigate('/displayimage',{state:{res:k}})
  }
  const handleSubmit = async () => {
    //   alert(JSON.stringify(Picture.bytes))
    // var body = { name: Name, email: Email, picture: Picture.bytes };
    var formData = new FormData();
    formData.append("name", Name);
    formData.append("email", Email);
    formData.append("picture", Picture.bytes);
    var response = await postData("insert/insertimages", formData);
 

    if (response.status) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      setBtnStatus(true)

     } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Unable to Upload Image ! failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.root}>
        <Grid container spacing={2}>
        <Grid
            item
            xs={2}
            style={{ fontSize: 18, textAlign: "center", fontWeight: "bold",flexDirection:"column"}}
          >
           <LockIcon onClick={handelLogin}/>
         <div  cursor="pointer">logout</div>
          </Grid>
          <Grid
            item
            xs={8}
            style={{ fontSize: 24, textAlign: "center", fontWeight: "bold" }}
          >
            UPLOAD YOUR IMAGE
          </Grid>
          <Grid
            item
            xs={2}
            style={{ fontSize: 24, textAlign: "center", fontWeight: "bold" }}
        
          >
            <CropOriginalIcon     cursor='pointer' onClick={handleNavigation}/>
              <div style={{fontSize:15,}}>view/search</div>
           
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <img src={Picture.Url} width="30%" />
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <TextField
              fullWidth
              label=" Name"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <TextField
              fullWidth
              label=" Email"
              onChange={(event) => setEmail(event.target.value)}
              required
              value={k}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              component="label"
              style={{ background: "black" }}
              disabled={btnStatus}
            >
              Upload your Image
              <input
                onChange={handleChange}
                hidden
                accept="image/*"
                multiple
                type="file"
                required
              />
            </Button>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="success"
              disabled={btnStatus}
             
            >
              <span style={{ fontWeight: "bold" }}>Submit Your Image</span>
            </Button>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Button
              onClick={handleReset}
              fullWidth
              variant="contained"
              color="error"
              disabled={btnStatus}
             >
              <span style={{ fontWeight: "bold" }}>Reset Your Image</span>
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

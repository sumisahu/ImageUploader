import { Grid, Button, TextField } from "@mui/material";
import { useState } from "react";
import { postData } from "../NodeServices/Services";
import SignUpCss from "./SignUpCss";
import Swal from "sweetalert2";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const classes = SignUpCss();
  var navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [data1, setData1] = useState([]);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    var body = { email: Email, password: password };

    var response = await postData("signup/userlogin", body);
    setData1(response.data);

    if (response.status) {
      navigate("/imageuploader", {state:{res:response.data} });
     
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You Successfully Signed up",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "unable to signup !",
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
            xs={12}
            style={{
              marginBottom: 10,
              fontWeight: 800,
              fontSize: 20,
              textAlign: "center",
              color: "blue",
              letterSpacing: 1,
            }}
            required
          >
            LOGIN
          </Grid>
          <Grid item xs={12} style={{ padding: 10 }}>
            <TextField
              onChange={(event) => setEmail(event.target.value)}
              label="Enter Email Address"
              placeholder="example@gmail.com"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} style={{ padding: 10 }}>
            <TextField
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              label="Password"
              placeholder="numeric values only"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} style={{ padding: 20 }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleSubmit}
            >
              Login <LoginIcon />
            </Button>
            <div style={{ marginTop: 20, textAlign: "center", fontSize: 12 }}>
              Enter Email and Password You have Entered at signup time
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

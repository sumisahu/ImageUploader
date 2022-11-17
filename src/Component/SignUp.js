import { Grid, Button, TextField } from "@mui/material";
import { useState } from "react";
import { postData } from "../NodeServices/Services";
import SignUpCss from "./SignUpCss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const classes = SignUpCss();
  var navigate=useNavigate()

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleNavigate=()=>{
  navigate('/login')
}

  const handleSubmit = async () => {
    var body = { fullname: Name, email: Email, password: password };
  
    var response = await postData("signup/usersignup", body);
       if(response.status)
       {

        navigate('/login')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You Successfully Signed up',
          showConfirmButton: false,
          timer: 1500
        })
       }
       else
       {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'unable to signup !',
          showConfirmButton: false,
          timer: 1500
        })
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
          >
            SIGNUP
          </Grid>
          <Grid item xs={12} style={{ padding: 10 }}>
            <TextField
              onChange={(event) => setName(event.target.value)}
              label="Enter Full Name"
              fullWidth
              required
            />
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
              Get Your Self Singed
            </Button>
          </Grid>
          <Grid item xs={12} style={{ textAlign:'center' }}>
            Already have account?< Button onClick={handleNavigate} cursor="pointer" style={{color:'blue'}}>Login</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

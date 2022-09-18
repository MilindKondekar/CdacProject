import React, { useState } from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../Footer/Copyright';
import {studentLogin} from '../../Services/user-service'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function StudentLogin() {

  const [user,setUser]=useState({
    username:'',
    password:'',
  })

 const navigate = useNavigate()
  //const dispatch= useDispatch()

  const handleChange=(e)=>{
    setUser((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(user.username.trim()==='' || user.password.trim()===''){
      toast.warning('Field must not be null !');
    return;
    }

    studentLogin(user).then((response)=>{
      console.log(response);
      toast.success("user login successfully");
      navigate("/StudentDashboard")
    }).catch((error)=>{
      console.log(error);
      toast.error("Please input valid credentials");
      console.log('Error Log');
    })

  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height:600,
    bgcolor: "rgb(255, 250, 231)",
    borderRadius:2,
    p: 2,
    flex: 1,
    flexDirection: "center",
  };

  return (
    <Box sx={style}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Student
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container textAlign={"center"}>
              <Grid item xs>
              <Link href="/ForgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </ThemeProvider>
    </Box>
  );
}
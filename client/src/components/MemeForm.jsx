import { makeStyles, TextField, Button } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Memeform() {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    axios.post("https:///memes", data).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className={classes.root}>
      <p className={classes.title}>Enter your meme here</p>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formData}>
        <TextField
          label="Meme Owner"
          className={classes.text}
          name="name"
          inputRef={register}
          required
          variant="outlined"
          placeholder="Enter your full name"
        />
        <TextField
          label="Caption"
          className={classes.text}
          name="caption"
          inputRef={register}
          multiline
          required
          variant="outlined"
          placeholder="Be creative with your caption"
        />
        <TextField
          label="Meme URL"
          className={classes.text}
          name="url"
          inputRef={register}
          required
          variant="outlined"
          placeholder="Enter URL of your meme here"
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          className={classes.Button}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  formData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    margin: 10,
    width: "90%",
  },
  Button: {
    width: "20%",
  },
  title: {
    fontSize: "1.5rem",
    margin: 20,
  },
  root: {
    textAlign: "center",
  },
}));
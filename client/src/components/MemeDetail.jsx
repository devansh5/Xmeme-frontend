import { Card, makeStyles, TextField, Button, Modal } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Memedetail() {
  const classes = useStyles();
  const [showUpdate, setShowUpdate] = useState(false);
  const [meme, setMeme] = useState([]);
  const [id, setId] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const updatePost = (id) => {
    setShowUpdate(true);
    setId(id);
    console.log(id);
  };

  const handleClose = () => {
    setShowUpdate(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    setShowUpdate(false);
    axios
      .patch(`https://x-maymay.herokuapp.com/memes/${id}`, data)
      .then((res) => {
        console.log(res);
      });
    setId(null);
  };

  useEffect(() => {
    axios
      .get("https://tranquil-cove-10539.herokuapp.com/memes")
      .then((res) => setMeme(res.data));
  }, []);

  console.log(meme);

  return (
    <div className={classes.Memedetail}>
      <span className={classes.title}>Enjoy all memes here</span>
      <div className={classes.memeCard}>
        {meme.map((meme) => {
          return (
            <Card key={meme.id} className={classes.memeData}>
              <span className={classes.name}>{meme?.name}</span>
              <span className={classes.caption}>{meme?.caption}</span>
              <img className={classes.image} src={meme.url} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => updatePost(meme.id)}
              >
                Edit
              </Button>
            </Card>
          );
        })}
      </div>
      <Modal open={showUpdate} className={classes.modal} onClose={handleClose}>
        <div className={classes.paper}>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.formData} >
            <TextField
              label="Caption"
              defaultValue={meme[meme.length - id]?.caption}
              name="caption"
              inputRef={register}
              multiline
              required
              variant="outlined"
              placeholder="Be creative with your caption"
            />
            <TextField
              label="Meme URL"
              name="url"
              defaultValue={meme[meme.length - id]?.url}
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
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  Memedetail: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  memeCard: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  memeData: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 345,
    margin: 20,
  },
  image: {
    padding: 10,
  },
  title: {
    fontSize: "1.5rem",
    margin: 25,
    textAlign: "center",
  },
  name: {
    alignSelf: "flex-start",
    padding: 10,
  },
  caption: {
    alignSelf: "flex-start",
    padding: 10,
  },
  Button: {
    width: "20%",
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '40%',
    left: '30%'
  },
  formData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
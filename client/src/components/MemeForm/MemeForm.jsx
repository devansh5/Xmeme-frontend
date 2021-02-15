import React from "react";
import { useForm } from "react-hook-form";
import  "./meme.module.css";
import axios from 'axios'


function Meme() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios.post('https://memecriobackend.herokuapp.com/memes',data)
    .then(res=>{
        console.log(res)
        window.location.reload();
    })
    
  
  }; // form submit function which will invoke after successful validation


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <input name="name" placeholder="Author Name" ref={register} />
      <input name="url" placeholder="enter url" ref={register} />
      <input
        name="caption" placeholder="Enter Caption"
        ref={register({ required: true})}
      />
      
      {errors.exampleRequired && <p>This field is required</p>}
      <input type="submit" />
    </form>
  );
}
export default Meme;
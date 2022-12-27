import React,{useState, useEffect} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";

import './Login.css';


export default function FormValidation() {
    // const [country,setCountry] = useState([]);
    
    // useEffect(() =>{
    //     const getcountry = async()=>{
    //         const rescountry =await fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json');
    //         const rescon = await rescountry.json();
    //         setCountry(await rescon);
    //     }
    //     getcountry();
    // },[]);

    document.addEventListener('DOMContentLoaded', () => {

        const countrySelect = document.querySelector('#countries');
        const stateSelect = document.querySelector('#state');
        let allCountries = []
        let curentCountry
        const populateState = () => {
          let output
          curentCountry.states.forEach(state => {
            output += `<option value="${state.name}">${state.name}</option>`
          })
          stateSelect.innerHTML = output
        }
        fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json').then(res => {
          return res.json();
        }).then(data => {
          allCountries = data;
          let output = "";
          data.forEach(country => {
            output += `
            <option value="${country.name}">${country.name}</option>`;
          })
      
          countrySelect.innerHTML = output;
        }).catch(err => {
          console.log(err);
        })
          countrySelect?.addEventListener('change', (event) => {
          curentCountry = allCountries.find(country => country.name === event.target.value)
          populateState()
          
        })
      });
      
    

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className="container">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <h4>Can you please provide your personal <br></br>details?</h4>
                <br></br>
                <Form.Field>
                    <label>Name</label>
                    <input
                        placeholder=''
                        type="text"
                        id='abc'
                        {...register("Name", { required: true, minLength:4 ,maxLength: 10 })}
                    />
                </Form.Field>
                {errors.Name && <p>Length should be between 4-10 characters.</p>}
                
                <br></br>
                <Form.Field>
                    <label>date of birth</label>
                    <input
                        placeholder=''
                        type="date"
                        id='abc'
                        {...register("DOB", { required: true, })}
                    />
                </Form.Field>
                {errors.DOB && <p>This Field should not be empty </p>}

                <br></br>
                <Form.Field>
                    <label>Contact Number</label>
                    <input
                        placeholder=''
                        type="text"
                        id='abc'
                        {...register("CN", { required: true, maxLength: 10 })}
                    />
                </Form.Field>
                {errors.CN && <p>mobile number should be of 10 digits.</p>}

                <br></br>
                <Form.Field>
                    <label>Country</label>
                    <select
                        placeholder=''
                        type=""
                        id='abc'
                        {...register("Country", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                        })}
                    />
                </Form.Field>
                {errors.Country && <p>Country is mandatory field.</p>}
                <br></br>
                <Form.Field>
                    <label >State</label>
                    <select
                        placeholder=''
                        type=""
                        id='abc'
                    />
                </Form.Field>
                <br></br>
                <Form.Field>
                    <label>Email</label>
                    <input
                        placeholder='Email'
                        type="email"
                        id='abc'
                        {...register("email",
                            {
                                required: true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                    />
                </Form.Field>
                {errors.email && <p>should only support valid email address</p>}

                <Button type='submit' className='btn'>Submit</Button>
            </Form>
        </div>
    )
}
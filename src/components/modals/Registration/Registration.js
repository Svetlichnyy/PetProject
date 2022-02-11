import React from 'react';
import {useForm} from "react-hook-form";
import '../../UI/Form/Form.scss'

const Registration = ({page, formData, setFormData, setOpenForm, setOpenLogin}) => {

    const {
        register,
        formState:{
            errors,
        },
        handleSubmit,
    } = useForm({
        mode: 'onBlur'
    });

    const onSubmit = () =>{
        page((currPage) => currPage + 1);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} action="#">
            <div>
                <div className='form-message'>
                    Already a member? {''}
                    <span
                    onClick={() => {
                        setOpenForm(false)
                        setOpenLogin(true)
                    }}
                        style={{cursor:'pointer'}}>
                    Log in
                </span>
                </div>
                <label className='form-email'>
                    <input
                        {...register('email', {
                            required: true,
                            pattern: /^\w[A-Z0-9._%+-]+@[A-Z]+\.[A-Z]{2,5}$/i
                        })}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className='form-email-input'
                        type='text'
                        placeholder='Enter your e-mail'
                    />
                    <span className='form-email-label'>E-mail</span>
                </label>
                <div className='error'>
                    {errors.email?.type === "required" && <span>Email is required</span>}
                    {errors.email?.type === "pattern" && <span>Enter a valid email</span>}
                </div>
                <div>
                    <button  className='main-button button-form' type='submit'>
                        Next     ></button>
                </div>
            </div>
        </form>
    );
};

export default Registration;
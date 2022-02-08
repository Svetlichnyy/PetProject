import React from 'react';
import {useForm} from "react-hook-form";
import '../../UI/Form/Form.css'
import DropImage from "../../UI/DropImage/DropImage";

const OneLastStep = ({page, formData, setFormData, setOpenForm, setOpenLogin,registerProfile}) => {

    const {register, formState:{errors,}, handleSubmit} = useForm({mode: 'onBlur'});
    const onSubmit = () =>{
        console.log(formData)
        registerProfile()
        setOpenForm(false)
        setOpenLogin(true)
    }

    return(

        <form onSubmit={handleSubmit(onSubmit)} action="#">
            <div>
                <label className='form-email'>
                    <input
                        {...register('firstName',{
                            required: true,
                            pattern:/^[A-Za-z]+$/i,
                            minLength: 2})}
                        placeholder="Enter your first name"
                        className='form-email-input'
                        type='text'
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    />
                    <span className='form-email-label'>First Name</span>
                </label>
                <div className='error'>
                    {errors.firstName?.type === "required" && <span>This field is required</span>}
                    {errors.firstName?.type === "minLength" && <span>Minimal length is 2</span>}
                    {errors.firstName?.type === "pattern" && <span> Only English letters</span>}
                </div>
                <label className='form-email'>
                    <input
                        {...register('lastName',{
                            required: true,
                            pattern:/^[A-Za-z]+$/i,
                            minLength: 2})}
                        placeholder="Enter your last name"
                        className='form-email-input'
                        type='text'
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    />
                    <span className='form-email-label'>Last Name</span>
                </label>
                <div className='error'>
                    {errors.lastName?.type === "required" && <span>This field is required</span>}
                    {errors.lastName?.type === "minLength" && <span>Minimal length is 2</span>}
                    {errors.lastName?.type === "pattern" && <span> Only English letters</span>}
                </div>

                <div>

                    <div>
                        <DropImage formData={formData} />
                    </div>

                </div>


                <div className='footer'>
                    <button className='main-button form-prev'
                            onClick={() => {
                                page((currPage) => currPage - 1);
                            }}
                    >
                        Prev
                    </button>
                    <button className='main-button form-next'>
                        Start
                    </button>
                </div>
            </div>
        </form>
    );
};

export default OneLastStep;
import React from 'react';
import {useForm} from "react-hook-form";


const AlmostDone = ({page, formData, setFormData}) => {
    const {register, formState:{errors}, handleSubmit} = useForm({mode: 'onBlur'});
    const onSubmit = () =>{
        page((currPage) => currPage + 1);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} action="#">
            <div className="password-container">

                <label className='form-email'>
                    <input
                        {...register('password', {
                            pattern:/[A-Z{2,}](?=.*[0-9])(?=.*[^0-9a-zA-Z])/g,
                            required: true, minLength: 8
                        })}
                        value={formData.password}
                        placeholder="Enter your password"
                        className='form-email-input'
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />

                    <span className='form-email-label'>Password</span>
                </label>
                <div className="tooltip">
                    - at least 8 characters <br/>
                    - at least 2 capital letters<br/>
                    - at least 1 special character (!, @, etc)<br/>
                    - at least 1 digit<br/>
                    - spaces and line breaks must<br/>
                    be absent
                </div>
                <div className='error'>
                    {errors.password?.type === "required" && <span>Password is required</span>}
                    {errors.password?.type === "pattern" && <span>Enter a valid password</span>}
                    {errors.password?.type === "minLength" && <span>Enter a valid password 8</span>}
                </div>
                <label htmlFor="confirm_password" className='form-email'>
                    <input
                        {...register("confirm_password", {
                            validate: value => value === formData.password
                        })}
                        placeholder="Enter your password"
                        className='form-email-input'
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                    <span className='form-email-label'>Confirm password</span>
                </label>
                <div className='error'>
                    {errors.confirm_password && <span>Your passwords do not match</span>}
                </div>
                <div className='footer'>
                    <button className='main-button form-prev'
                            onClick={() => {
                                page((currPage) => currPage - 1);
                            }}>
                    </button>
                    <button className='main-button form-next'>
                        Next
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AlmostDone;
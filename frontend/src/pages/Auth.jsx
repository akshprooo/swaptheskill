import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import endpoints from '../api/endpoints';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserProvider';

const Auth = () => {
    const [form, setForm] = useState("register");
    const [skillsOptions, setSkillsOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const {setIsLoggedIn} = useUser();

    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        skills: [],
        toLearn: [],
        otherSkill: "",
        otherToLearn: ""
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const getSkillsOptions = async () => {
        try {
            const res = await axios.get(endpoints.getSkills);
            setSkillsOptions(res.data.skills || []);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    useEffect(() => {
        getSkillsOptions();
    }, []);

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillToggle = (skill, type) => {
        setRegisterData(prev => {
            const array = prev[type];
            if (array.includes(skill)) {
                return {
                    ...prev,
                    [type]: array.filter(s => s !== skill)
                };
            } else {
                return {
                    ...prev,
                    [type]: [...array, skill]
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (form === "register") {
                const finalSkills = [...registerData.skills];
                const finalToLearn = [...registerData.toLearn];

                if (registerData.skills.includes("Other") && registerData.otherSkill.trim()) {
                    finalSkills.push(registerData.otherSkill.trim());
                }
                if (registerData.toLearn.includes("Other") && registerData.otherToLearn.trim()) {
                    finalToLearn.push(registerData.otherToLearn.trim());
                }

                const dataToSend = {
                    username: registerData.username,
                    email: registerData.email,
                    password: registerData.password,
                    skills: finalSkills.filter(s => s !== "Other"),
                    toLearn: finalToLearn.filter(s => s !== "Other")
                };

                const res = await axios.post(endpoints.register, dataToSend);
                console.log("Registration successful:", res.data);
                localStorage.setItem('token', res.data.token);
                setIsLoggedIn(true);
                navigate('/');
            } else {
                const res = await axios.post(endpoints.login, loginData);
                console.log("Login successful:", res.data);
                localStorage.setItem('token', res.data.token);
                setIsLoggedIn(true);
                navigate('/');
                
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth min-h-screen max-w-screen flex items-center justify-center bg-zinc-900 p-4'>
            <form onSubmit={handleSubmit} className='w-full max-w-2xl'>
                <h1 className='text-white text-4xl mb-6 text-center'>
                    {form === "login" ? "Login" : "Register"}
                </h1>

                {form === "register" && (
                    <div className='mb-4'>
                        <label htmlFor="username" className='block text-white mb-2 text-xl'>
                            Username
                        </label>
                        <input
                            type="text"
                            id='username'
                            name='username'
                            value={registerData.username}
                            onChange={handleRegisterChange}
                            className='w-full p-2 rounded bg-zinc-800 text-white'
                            required
                        />

                        <label htmlFor="register-email" className='block text-white mb-2 text-xl mt-4'>
                            Email
                        </label>
                        <input
                            type="email"
                            id='register-email'
                            name='email'
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            className='w-full p-2 rounded bg-zinc-800 text-white'
                            required
                        />

                        <label htmlFor="register-password" className='block text-white mb-2 text-xl mt-4'>
                            Password
                        </label>
                        <input
                            type="password"
                            id='register-password'
                            name='password'
                            value={registerData.password}
                            onChange={handleRegisterChange}
                            className='w-full p-2 rounded bg-zinc-800 text-white'
                            required
                        />

                        {/* Skills Selection */}
                        <label className='block text-white mb-2 text-xl mt-6'>
                            Your Skills
                        </label>
                        <div className='bg-zinc-800 p-4 rounded max-h-60 overflow-y-auto'>
                            <div className='grid grid-cols-2 gap-2'>
                                {skillsOptions.map((skill) => (
                                    <label key={skill} className='flex items-center text-white cursor-pointer'>
                                        <input
                                            type="checkbox"
                                            checked={registerData.skills.includes(skill)}
                                            onChange={() => handleSkillToggle(skill, 'skills')}
                                            className='mr-2'
                                        />
                                        {skill}
                                    </label>
                                ))}
                                <label className='flex items-center text-white cursor-pointer'>
                                    <input
                                        type="checkbox"
                                        checked={registerData.skills.includes("Other")}
                                        onChange={() => handleSkillToggle("Other", 'skills')}
                                        className='mr-2'
                                    />
                                    Other
                                </label>
                            </div>
                        </div>

                        {registerData.skills.includes("Other") && (
                            <input
                                type="text"
                                name="otherSkill"
                                value={registerData.otherSkill}
                                onChange={handleRegisterChange}
                                placeholder="Specify other skill"
                                className='w-full p-2 rounded bg-zinc-800 text-white mt-2'
                            />
                        )}

                        {/* To Learn Selection */}
                        <label className='block text-white mb-2 text-xl mt-6'>
                            Skills to Learn
                        </label>
                        <div className='bg-zinc-800 p-4 rounded max-h-60 overflow-y-auto'>
                            <div className='grid grid-cols-2 gap-2'>
                                {skillsOptions.map((skill) => (
                                    <label key={skill} className='flex items-center text-white cursor-pointer'>
                                        <input
                                            type="checkbox"
                                            checked={registerData.toLearn.includes(skill)}
                                            onChange={() => handleSkillToggle(skill, 'toLearn')}
                                            className='mr-2'
                                        />
                                        {skill}
                                    </label>
                                ))}
                                <label className='flex items-center text-white cursor-pointer'>
                                    <input
                                        type="checkbox"
                                        checked={registerData.toLearn.includes("Other")}
                                        onChange={() => handleSkillToggle("Other", 'toLearn')}
                                        className='mr-2'
                                    />
                                    Other
                                </label>
                            </div>
                        </div>

                        {registerData.toLearn.includes("Other") && (
                            <input
                                type="text"
                                name="otherToLearn"
                                value={registerData.otherToLearn}
                                onChange={handleRegisterChange}
                                placeholder="Specify other skill to learn"
                                className='w-full p-2 rounded bg-zinc-800 text-white mt-2'
                            />
                        )}
                    </div>
                )}

                {form === "login" && (
                    <div className='mb-4'>
                        <label htmlFor="login-email" className='block text-white mb-2 text-xl'>
                            Email
                        </label>
                        <input
                            type="email"
                            id='login-email'
                            name='email'
                            value={loginData.email}
                            onChange={handleLoginChange}
                            className='w-full p-2 rounded bg-zinc-800 text-white'
                            required
                        />

                        <label htmlFor="login-password" className='block text-white mb-2 text-xl mt-4'>
                            Password
                        </label>
                        <input
                            type="password"
                            id='login-password'
                            name='password'
                            value={loginData.password}
                            onChange={handleLoginChange}
                            className='w-full p-2 rounded bg-zinc-800 text-white'
                            required
                        />
                    </div>
                )}

                <button
                    type='submit'
                    disabled={loading}
                    className='w-full p-2 rounded bg-blue-600 text-white mb-4 hover:bg-blue-700 disabled:bg-blue-400'
                >
                    {loading ? 'Loading...' : (form === "login" ? "Login" : "Register")}
                </button>

                {form === "login" ? (
                    <div className='text-white text-center'>
                        Don't have an account?{' '}
                        <button
                            type='button'
                            className='text-blue-400 underline hover:text-blue-300'
                            onClick={() => setForm("register")}
                        >
                            Register here
                        </button>
                    </div>
                ) : (
                    <div className='text-white text-center'>
                        Already have an account?{' '}
                        <button
                            type='button'
                            className='text-blue-400 underline hover:text-blue-300'
                            onClick={() => setForm("login")}
                        >
                            Login here
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Auth
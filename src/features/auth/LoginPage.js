import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {useLoginMutation} from "./authApiSlice";
import {setTokens} from "./authSlice";
import Header from "../../components/Header";
import {useForm} from "react-hook-form";

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login] = useLoginMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { access: accessToken, refresh: refreshToken } = await login(data).unwrap()
        dispatch(setTokens({ accessToken, refreshToken }))
        navigate('/')
        console.log(accessToken)
        console.log(refreshToken)
    }

    return (
        <>
            <Header pageName="Login" />

            <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Type username"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 6,
                                    message: "Username should be at-least 6 characters"
                                }
                            })}
                        />
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Type password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password should be at-least 6 characters"
                                }
                            })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                <button>Sign In</button>

                <Link to="/registration">Sign Up</Link>
            </form>
        </>
    )

}

export default LoginPage
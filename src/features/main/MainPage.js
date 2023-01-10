import {useDispatch} from "react-redux";

import {logout} from "../auth/authSlice";
import {useCheckCoordinatesMutation, useGetResultsQuery} from "./mainApiSlice";
import ReactChartView from "./ReactChartView";
import Header from "../../components/Header";
import {useForm} from "react-hook-form";

const MainPage = () => {
    const dispatch = useDispatch()

    const {
        data: results,
        isLoading,
        isSuccess,
        isError,
        refetch: refetchResults
    } = useGetResultsQuery()

    const [checkCoordinates] = useCheckCoordinatesMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // X coordinate
        let xs = [];
        if (data.x_minus2) xs.push(-2.0)
        if (data.x_minus1_5) xs.push(-1.5)
        if (data.x_minus1) xs.push(-1.0)
        if (data.x_minus0_5) xs.push(-0.5)
        if (data.x_0) xs.push(0.0)
        if (data.x_0_5) xs.push(0.5)
        if (data.x_1) xs.push(1.0)
        if (data.x_1_5) xs.push(1.5)
        if (data.x_2) xs.push(2.0)

        // Y coordinate
        const y = data.y

        // R coordinate
        let rs = [];
        // if (data.r_minus2) rs.push(-2.0)
        // if (data.r_minus1_5) rs.push(-1.5)
        // if (data.r_minus1) rs.push(-1.0)
        // if (data.r_minus0_5) rs.push(-0.5)
        if (data.r_0) rs.push(0.0)
        if (data.r_0_5) rs.push(0.5)
        if (data.r_1) rs.push(1.0)
        if (data.r_1_5) rs.push(1.5)
        if (data.r_2) rs.push(2.0)

        if (xs.length === 0) {
            alert("X must be selected")
            return
        }

        if (rs.length === 0) {
            alert("R must be selected")
            return
        }

        console.log({xs, y, rs})

        for (let i = 0; i < rs.length; i++) {
            for (let j = 0; j < xs.length; j++) {
                await checkCoordinates({x: xs[j], y, r: rs[i]})
            }
        }

        refetchResults()
    }

    const handleLogoutButtonTap = (e) => {
        dispatch(logout())
    }

    const handleClickChart = async (coordinate) => {
    }
    
    return (
        <>
            <Header pageName="Main page"/>

            <div>
                <button onClick={handleLogoutButtonTap}>Log Out</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="x_minus2">X = -2</label>
                    <input type="checkbox" name="x_minus2" {...register("x_minus2")}/>
                </div>

                <div>
                    <label htmlFor="x_minus1_5">X = -1.5</label>
                    <input type="checkbox" name="x_minus1_5" {...register("x_minus1_5")}/>
                </div>

                <div>
                    <label htmlFor="x_minus1">X = -1</label>
                    <input type="checkbox" name="x_minus1" {...register("x_minus1")}/>
                </div>

                <div>
                    <label htmlFor="x_minus0_5">X = -0.5</label>
                    <input type="checkbox" name="x_minus0_5" {...register("x_minus0_5")}/>
                </div>

                <div>
                    <label htmlFor="x_0">X = 0</label>
                    <input type="checkbox" name="x_0" {...register("x_0")}/>
                </div>

                <div>
                    <label htmlFor="x_0_5">X = 0.5</label>
                    <input type="checkbox" name="x_0_5" {...register("x_0_5")}/>
                </div>

                <div>
                    <label htmlFor="x_1">X = 1</label>
                    <input type="checkbox" name="x_1" {...register("x_1")}/>
                </div>

                <div>
                    <label htmlFor="x_1_5">X = 1.5</label>
                    <input type="checkbox" name="x_1_5" {...register("x_1_5")}/>
                </div>

                <div>
                    <label htmlFor="x_2">X = 2</label>
                    <input type="checkbox" name="x_2" {...register("x_2")}/>
                </div>

                <div>
                    <label htmlFor="y">Y</label>
                    <input
                        type="number"
                        name="y"
                        placeholder="Type y coordinate"
                        {...register("y", {
                            required: "Y is required",
                            valueAsNumber: "Y must be a number",
                            validate: (value) => {
                                if (value < -5) return "Y must be greater than -5"
                                if (value > 3) return "Y must be less than 3"
                                return true
                            }
                        })}
                    />
                    {errors.y && <p>{errors.y.message}</p>}
                </div>

                {/* Radius should be positive */}
                {/*<div>*/}
                {/*    <label htmlFor="r_minus2">R = -2</label>*/}
                {/*    <input type="checkbox" name="r_minus2" {...register("r_minus2")}/>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <label htmlFor="r_minus1_5">R = -1.5</label>*/}
                {/*    <input type="checkbox" name="r_minus1_5" {...register("r_minus1_5")}/>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <label htmlFor="r_minus1">R = -1</label>*/}
                {/*    <input type="checkbox" name="r_minus1" {...register("r_minus1")}/>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <label htmlFor="r_minus0_5">R = -0.5</label>*/}
                {/*    <input type="checkbox" name="r_minus0_5" {...register("r_minus0_5")}/>*/}
                {/*</div>*/}

                <div>
                    <label htmlFor="r_0">R = 0</label>
                    <input type="checkbox" name="r_0" {...register("r_0")}/>
                </div>

                <div>
                    <label htmlFor="r_0_5">R = 0.5</label>
                    <input type="checkbox" name="r_0_5" {...register("r_0_5")}/>
                </div>

                <div>
                    <label htmlFor="r_1">R = 1</label>
                    <input type="checkbox" name="r_1" {...register("r_1")}/>
                </div>

                <div>
                    <label htmlFor="r_1_5">R = 1.5</label>
                    <input type="checkbox" name="r_1_5" {...register("r_1_5")}/>
                </div>

                <div>
                    <label htmlFor="r_2">R = 2</label>
                    <input type="checkbox" name="r_2" {...register("r_2")}/>
                </div>

                <button>Check</button>

            </form>

            <div>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Something went wrong...</p>}
                {isSuccess && <>
                    <ReactChartView
                        data={{radius: 3, items: results}}
                        onClickChart={handleClickChart}
                    />

                    <table>
                        <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Success</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map((result, i) => {
                            return <tr key={result.id}>
                                <td>{result.x}</td>
                                <td>{result.y}</td>
                                <td>{result.r}</td>
                                <td>{result.success ? "success" : "failure"}</td>
                                <td>{result.timestamp}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </>}
            </div>
        </>
    )
}

export default MainPage
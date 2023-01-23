import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

import {logout} from "../auth/authSlice";
import {useCheckCoordinatesMutation, useGetResultsQuery} from "./mainApiSlice";
import Header from "../../components/header/Header";
import "../../css/theme.css";
import "./main.css";
import "./main-responsive.css";
import ChartView from "./ChartView";
import {useEffect, useState} from "react";
import {apiSlice} from "../../app/api/apiSlice";

const MainPage = () => {
    const dispatch = useDispatch()

    const [selectedR, setSelectedR] = useState(0.0)

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
        formState: {errors},
        getValues
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

        for (let i = 0; i < rs.length; i++) {
            for (let j = 0; j < xs.length; j++) {
                await checkCoordinates({x: xs[j], y, r: rs[i]})
            }
        }

        refetchResults()
    }

    const getR = () => {
        if (getValues("r_2")) return 2.0
        if (getValues("r_1_5")) return 1.5
        if (getValues("r_1")) return 1.0
        if (getValues("r_0_5")) return 0.5
        return 0.0
    }

    const handleRChanged = () => {
        setSelectedR(getR())
    }

    const handleLogoutButtonTap = (e) => {
        dispatch(logout())
        dispatch(apiSlice.util.resetApiState())
    }

    const handleClickChart = async (coordinate) => {
        await checkCoordinates({...coordinate, r: selectedR})
        refetchResults()
    }

    return <>
        <Header pageName="Main page"/>

        <div className="content">
            <div className="logout-button-container">
                <button onClick={handleLogoutButtonTap}>Logout</button>
            </div>

            <div className="chart-and-form-container">
                <div className="chart-container">
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>Something went wrong...</p>}
                    {isSuccess && <ChartView
                        width={400} height={400}
                        minX={-6} maxX={6}
                        minY={-6} maxY={6}
                        radius={selectedR}
                        items={
                            results
                                .filter(result => {return result.r === selectedR})
                                .map(res => {return {x: res.x, y: res.y, color: res.success ? "green" : "red"}})
                        }
                        onClickChart={handleClickChart}
                    />}
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-inputs">
                            <div className="x-coord">
                                <div>
                                    <input type="checkbox" name="x_minus2" {...register("x_minus2")}/>
                                    <label htmlFor="x_minus2">X = -2</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="x_minus1_5" {...register("x_minus1_5")}/>
                                    <label htmlFor="x_minus1_5">X = -1.5</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="x_minus1" {...register("x_minus1")}/>
                                    <label htmlFor="x_minus1">X = -1</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="x_minus0_5" {...register("x_minus0_5")}/>
                                    <label htmlFor="x_minus0_5">X = -0.5</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="x_0" {...register("x_0")}/>
                                    <label htmlFor="x_0">X = 0</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="x_0_5" {...register("x_0_5")}/>
                                    <label htmlFor="x_0_5">X = 0.5</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="x_1" {...register("x_1")}/>
                                    <label htmlFor="x_1">X = 1</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="x_1_5" {...register("x_1_5")}/>
                                    <label htmlFor="x_1_5">X = 1.5</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="x_2" {...register("x_2")}/>
                                    <label htmlFor="x_2">X = 2</label>
                                </div>
                            </div>

                            <div className="y-coord">
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

                            <div className="r-coord">
                                <div>
                                    <input type="checkbox" name="r_0" {...register("r_0", {onChange: handleRChanged})}/>
                                    <label htmlFor="r_0">R = 0</label>
                                </div>

                                <div>
                                    <input type="checkbox"
                                           name="r_0_5" {...register("r_0_5", {onChange: handleRChanged})}/>
                                    <label htmlFor="r_0_5">R = 0.5</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="r_1" {...register("r_1", {onChange: handleRChanged})}/>
                                    <label htmlFor="r_1">R = 1</label>
                                </div>

                                <div>
                                    <input type="checkbox"
                                           name="r_1_5" {...register("r_1_5", {onChange: handleRChanged})}/>
                                    <label htmlFor="r_1_5">R = 1.5</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="r_2" {...register("r_2", {onChange: handleRChanged})}/>
                                    <label htmlFor="r_2">R = 2</label>
                                </div>
                            </div>
                        </div>

                        <div className="check-button-container">
                            <button>Check</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="results-table-container">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Something went wrong...</p>}
                {isSuccess && <table>
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
                            <td>{result.x.toFixed(3)}</td>
                            <td>{result.y.toFixed(3)}</td>
                            <td>{result.r.toFixed(3)}</td>
                            <td>{result.success ? "success" : "failure"}</td>
                            <td>{result.timestamp}</td>
                        </tr>
                    })}
                    </tbody>
                </table>}
            </div>
        </div>
    </>
}

export default MainPage
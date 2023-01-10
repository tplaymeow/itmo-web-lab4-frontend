import {useEffect, useRef} from "react";
import {ChartView} from "./ChartView";

const ReactChartView = ({data, onClickChart}) => {
    const canvasRef = useRef(null)
    const chartView = useRef(null)

    useEffect(() => {
        if (chartView.current != null) return;
        const canvas = canvasRef.current
        chartView.current = new ChartView(canvas, -6, 6, -6, 6)
    }, [])

    useEffect(() => {
        if (chartView.current == null) return;
        chartView.current.render(data)
    }, [data]);

    useEffect(() => {
        if (chartView.current == null) return;
        chartView.current.onClickChart = onClickChart
    }, [onClickChart]);

    return <canvas
        width="600px"
        height="600px"
        ref={canvasRef}
    />
}

export default ReactChartView
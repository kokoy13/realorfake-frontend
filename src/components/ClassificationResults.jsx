import { useEffect, useState } from "react"
import Predict from "./Predict"

export default function ClassificationResults({chart, matrix, total, accuracy, reports}) {    

    const [title, setTitle] = useState("")

    useEffect(() => {
        if (accuracy < 0.5) {
            setTitle("Oh noooo, FAKE");
        } else {
            setTitle("Yeahhhh, It's Real");
        }
    }, [accuracy, setTitle]);

    return (
        <div className="space-y-8">
            <div className="flex justify-center mb-12">
                <h1 className="text-4xl text-gray-900">{title}</h1>
            </div>
            <div className="flex justify-center gap-24">
                {/* Total Records */}
                <div className="bg-card rounded-lg border border-border p-6 w-1/4">
                    <p className="text-muted-foreground text-sm">Total Records</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{total}</p>
                </div>
                
                <div className="bg-card rounded-lg border border-border p-6 w-1/4">
                    <p className="text-muted-foreground text-sm">Accuracy</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{(accuracy * 100).toFixed(1)}%</p>
                </div>
            </div>

            {/* Chart dan Matriks */}
            <div className="flex justify-between gap-20">
                <img
                    alt="accuracy chart"
                    src={`data:image/png;base64,${chart}`}
                    className="max-w-[600px]"
                />
                <img
                    alt="confusion matrix"
                    src={`data:image/png;base64,${matrix}`}
                    className="max-w-[600px]"
                />
            </div>

            <div>
                <table className="min-w-full border rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold">Label</th>
                            <th className="px-4 py-2 text-left font-semibold">Precision</th>
                            <th className="px-4 py-2 text-left font-semibold">Recall</th>
                            <th className="px-4 py-2 text-left font-semibold">F1-Score</th>
                            <th className="px-4 py-2 text-left font-semibold">Support</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(reports).map(([label, data]) => (
                        <tr key={label} className="border-t">
                            <td className="px-4 py-2 font-medium">{label}</td>

                                <td className="px-4 py-2 truncate max-w-xs">{data["precision"]?.toFixed(4)}</td>
                                <td className="px-4 py-2 truncate max-w-xs">{data["recall"]?.toFixed(4)}</td>
                                <td className="px-4 py-2 truncate max-w-xs">{data["f1-score"]?.toFixed(4)}</td>
                                <td className="px-4 py-2 truncate max-w-xs">{data["support"]}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Predict/>
        </div>
    )
}

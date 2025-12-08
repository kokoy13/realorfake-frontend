import { useState } from "react"

export default function DatasetPreview({ dataset, onSelectionChange}) {
    const [textColumn, setTextColumn] = useState(dataset.columns[1])
    const [labelColumn, setLabelColumn] = useState(dataset.columns[2])

    const handleTextChange = (e) => {
        const value = e.target.value
        setTextColumn(value)
        onSelectionChange?.({ textColumn: value, labelColumn })
    }

    const handleLabelChange = (e) => {
        const value = e.target.value
        setLabelColumn(value)
        onSelectionChange?.({ textColumn, labelColumn: value })
    }
    
    return (
        <>
        <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-4 ">
                <h3 className="font-semibold text-foreground">Dataset Preview</h3>
                <p className="text-sm text-muted-foreground">Showing first {dataset.preview.length} records</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                <thead className="">
                    {/* Menampilkan header table */}
                    <tr className="border-t">
                        {dataset.columns.map((column) =>(
                            <th key={column} className="px-4 py-2 text-left text-foreground font-semibold">{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Menampilkan isi dari table */}
                    {dataset.preview.map((data) => (
                    <tr key={data.No} className="border-t hover:bg-muted/50">
                        <td className="px-4 py-2">
                            {data["No"] }
                        </td>
                        <td className="px-4 py-2 truncate max-w-xs">
                            {data["Komentar Bersih"] || "-"}
                        </td>
                        <td className="px-4 py-2 truncate max-w-xs">
                            {data["Label"] || "-"}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>

        {/* Select Columns */}
        <div className="bg-card rounded-lg border border-border p-4 space-y-4">
            <h3 className="font-semibold text-foreground">Select Columns</h3>
            <div className="flex justify-between gap-5">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-sm font-medium text-foreground">Text Column</label>
                    <select
                        value={textColumn}
                        onChange={handleTextChange}
                        required
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Choose text column...</option>
                        {dataset.columns.map((column) => (
                            <option key={column} value={column}>
                                {column}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-sm font-medium text-foreground">Label Column</label>
                    <select
                        value={labelColumn}
                        onChange={handleLabelChange}
                        required
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="">Choose label column...</option>
                        {dataset.columns.map((column) => (
                            <option key={column} value={column}>
                                {column}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        </>
    )
}

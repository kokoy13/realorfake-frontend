import { useState } from "react"
import FileUpload from "../components/FileUpload"
import DatasetPreview from "../components/DatasetPreview"
import ClassificationResults from "../components/ClassificationResults"
import Header from "../components/Header"

export default function HomeUI() {
    const [dataset, setDataset] = useState(null)
    const [filename, setFileName] = useState(null)
    const [fileData, setFileData] = useState(null)
    const [results, setResults] = useState(false)
    const [count, setCount] = useState(null)
    const [columnSelection, setColumnSelection] = useState({ textColumn: "", labelColumn: "" })
    const [loading, setLoading] = useState(false)
    const [chart, setChart] = useState(null)
    const [matrix, setMatrix] = useState(null)
    const [accuracy, setAccuracy] = useState(null)
    const [reports, setReports] = useState(null)

    //Fungsi yang dijalankan setelah upload file dataset
    const handleFileUpload = async (file) => {
        if (!file){
            alert("File tidak dapat ditemukan")
            return;
        }
        
        const form = new FormData();
        form.append("file", file);

        try {
            const res = await fetch("http://localhost:8000/upload_columns",{
                method: "POST",
                body: form
            });
            
            const data = await res.json()
            setDataset(data)
            setFileData(file)
            setResults(null)
            setColumnSelection({ textColumn: data.columns[1] || "", labelColumn: data.columns[2] || "" })
            setFileName(file.name)
            setCount(data.count)
        } catch (err) {
            alert("Gagal upload file: " + (err?.response?.data?.error || err.message));
        }
    }

    const handleSelectionChange = (selection) => {
        setColumnSelection(selection)
    }

    const handleClassify = async () => {
        if (!dataset){
            alert("Gagal melakukan klasifikasi, coba lagi nanti")
            return
        }
        
        setLoading(true)
        
        const text = columnSelection.textColumn
        const label = columnSelection.labelColumn

        const formData = new FormData();
        formData.append("file", fileData);
        formData.append("text_col", text)
        formData.append("label_col", label)


        try {
            const res = await fetch("http://localhost:8000/train",{
                method: "POST",
                body: formData
            });
            
            const data = await res.json()
            setChart(data.accuracy_chart)
            setMatrix(data.confusion_matrix)
            setAccuracy(data.accuracy)
            setReports(data.report)

            setResults(true)
        } catch (err) {
            alert("Gagal upload file: " + (err?.response?.data?.error || err.message));
        }finally{
            setLoading(false)
        }
    }

    //Fungsi untuk memilih dataset yang lain, atau reset setelah dataset dipilih
    const handleReset = () => {
        setDataset(null)
        setResults(false)
    }

    return (
        <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
            {!dataset ? (
                // Kondisi jika dataset kosong atau belum diupload
                <FileUpload onFileUpload={handleFileUpload} />
            ) : (
                //Kondisi jika dataset true atau telah diupload
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Dataset Loaded</h2>
                        <p className="text-muted-foreground">
                        {filename} • {count} records
                        </p>
                    </div>
                    {/* Tombol untuk reset dataset */}
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 cursor-pointer text-sm bg-gray-900 text-white font-semibold hover:bg-gray-950 rounded-lg transition-colors"
                    >
                        ... Load different dataset
                    </button>
                    </div>

                    {!results && (
                        <>
                            {/* Table Preview Dataset */}
                            <DatasetPreview 
                                dataset={dataset} 
                                onSelectionChange={handleSelectionChange}
                            />

                            <div className="flex gap-4">
                                <button
                                    onClick={handleClassify}
                                    disabled={loading}
                                    className="px-6 py-3 bg-blue-600 cursor-pointer font-semibold hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition"
                                >
                                    {loading ? "Classifying..." : "Classify Dataset"}
                                </button>
                            </div>
                        </>
                    )}

                    {results && <ClassificationResults 
                        chart={chart} 
                        matrix={matrix} 
                        total={count} 
                        accuracy={accuracy} 
                        reports={reports}/>
                    }
                </div>
            )}
        </main>
        </div>
    )
}

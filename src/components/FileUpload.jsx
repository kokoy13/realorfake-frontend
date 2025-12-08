import { useRef, useState } from "react"

export default function FileUpload({ onFileUpload }) {
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file?.name.endsWith(".xlsx")) {
            onFileUpload(file)
        } else {
            alert("Please upload a XLSX file")
        }
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file?.name.endsWith(".xlsx")) {
            onFileUpload(file)
        } else {
            alert("Please upload a XLSX file")
        }
    }

    return (
        <div className="flex gap-12 items-center">
            <div className="w-full pt-24">
                <div className="space-y-4 mb-5">
                    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground leading-tight">
                    Do you Think your <span className="font-medium">Data</span> is <span className="text-blue-600">Real?</span>
                    </h2>
                    <p className="text-base indent-5 sm:text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
                        Upload your <strong>XLSX</strong> file and <strong>let's put it to the test</strong>and shows whether the information <strong>is fact or just gossip</strong>. <br /> The results? <strong>Instant and surprising!</strong>
                    </p>
                </div>
                <ul className="grid grid-cols-2">
                    <li className="flex items-center gap-3 text-foreground">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Fast Processing
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Chart Accuracy
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Easy to Understand
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Detailed Analytics
                    </li>
                </ul>
            </div>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 mt-32 w-full border-dashed rounded-xl p-12 text-center transition cursor-pointer ${
                isDragging ? "border-blue-600 bg-blue-600/10" : "border-border hover:border-blue-600 hover:bg-blue-600/5"
                }`}
            >
                <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-600/10 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <div>
                    <p className="text-foreground font-semibold">Drag and drop your XLSX here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition inline-block"
                >
                    Browse Files
                </button>
                <input ref={fileInputRef} type="file" accept=".xlsx" onChange={handleFileSelect} className="hidden" />
                </div>
            </div>
        </div>
    )
}

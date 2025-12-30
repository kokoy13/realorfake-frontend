import axios from "axios";
import { useState } from "react";

export default function Predict() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null);

    const handlePredict = async () => {
        if (!text.trim()) 
            return alert("Masukkan teks.");
        setLoading(true)
        const form = new FormData();
        form.append("text", text);
        try {
            const res = await axios.post("https://transnetsumbar.my.id/predict", form);
            setResult(res.data);
        } catch (err) {
            alert("Gagal prediksi: " + (err?.response?.data?.error || err.message));
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between">
                <h2 className="font-bold text-lg">Predict New Title</h2>
                <p><strong>Prediksi:</strong> 
                    {result && (
                        <span>{result.prediction}</span>
                    )}
                </p>
            </div>
            <textarea className="border rounded-lg px-4 py-2" rows={4} cols={100} value={text} onChange={(e) => setText(e.target.value)} />
            <div className="flex justify-center">
                <button className="bg-blue-500 gap-3 flex items-center justify-center max-w-96 w-full transition-colors hover:bg-blue-700 cursor-pointer font-semibold px-3 py-1 rounded-lg text-white text-lg" onClick={handlePredict} disabled={loading}>
                    {loading ? (
                            <>
                                <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Predicting...</span>
                            </>
                        ) : (
                            <>
                                <span>Predict</span>
                            </>
                        )}
                </button>

                
            </div>
        </div>
    );
}

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
            const res = await axios.post("http://localhost:8000/predict", form);
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
                <h2 className="font-bold text-lg">Predict New Comment</h2>
                <p><strong>Prediksi:</strong> 
                    {result && (
                        <span>{result.prediction}</span>
                    )}
                </p>
            </div>
            <textarea className="border rounded-lg px-4 py-2" rows={4} cols={100} value={text} onChange={(e) => setText(e.target.value)} />
            <div className="flex justify-center">
                <button className="bg-blue-500 max-w-96 w-full transition-colors hover:bg-blue-700 cursor-pointer font-semibold px-3 py-1 rounded-lg text-white text-lg" onClick={handlePredict} disabled={loading}>
                    Prediksi
                    {loading&&
                        (
                            <div className="animate-spin"></div>
                        )
                    }
                </button>
            </div>
        </div>
    );
}

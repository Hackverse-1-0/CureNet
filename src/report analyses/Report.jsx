import React, { useState, useEffect } from 'react';

export default function App() {
    const [file, setFile] = useState(null);
    const [fileInfo, setFileInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [sources, setSources] = useState([]);
    const [libsLoaded, setLibsLoaded] = useState(false);

    // Effect to dynamically load external libraries (Tailwind, Mammoth.js and PDF.js)
    useEffect(() => {
        // Add Tailwind CSS
        const tailwindScriptId = 'tailwind-css-cdn';
        if (!document.getElementById(tailwindScriptId)) {
            const script = document.createElement('script');
            script.id = tailwindScriptId;
            script.src = "https://cdn.tailwindcss.com";
            document.head.appendChild(script);
        }

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Script load error for ${src}`));
                document.body.appendChild(script);
            });
        };

        const loadLibraries = async () => {
            try {
                if (window.mammoth && window.pdfjsLib) {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js`;
                    setLibsLoaded(true);
                    return;
                }

                await Promise.all([
                    loadScript("https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.18/mammoth.browser.min.js"),
                    loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js")
                ]);

                let attempts = 0;
                const interval = setInterval(() => {
                    if (window.mammoth && window.pdfjsLib) {
                        clearInterval(interval);
                        window.pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js`;
                        setLibsLoaded(true);
                    } else if (attempts > 50) {
                        clearInterval(interval);
                        throw new Error("Failed to initialize external libraries even after loading scripts.");
                    }
                    attempts++;
                }, 100);

            } catch (error) {
                setError("Could not load required libraries (Mammoth.js or PDF.js). File processing will not work.");
                console.error(error);
            }
        };

        loadLibraries();
    }, []);


    // --- API Configuration ---
    const API_KEY = ""; // Kept as an empty string, will be handled by the environment.
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileInfo(selectedFile ? `Selected: ${selectedFile.name}` : '');
        setError('');
        setAnalysis('');
        setSources([]);
    };

    const extractTextFromFile = async (fileToProcess) => {
        const fileExtension = fileToProcess.name.split('.').pop().toLowerCase();
        try {
            if (fileExtension === 'txt') {
                return await fileToProcess.text();
            } else if (fileExtension === 'docx') {
                const arrayBuffer = await fileToProcess.arrayBuffer();
                const result = await window.mammoth.extractRawText({ arrayBuffer });
                return result.value;
            } else if (fileExtension === 'pdf') {
                const arrayBuffer = await fileToProcess.arrayBuffer();
                const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    fullText += textContent.items.map(item => item.str).join(' ') + '\n';
                }
                return fullText;
            } else {
                throw new Error(`Unsupported file type: .${fileExtension}. Please upload a .txt, .pdf, or .docx file.`);
            }
        } catch (err) {
            console.error('Error processing file:', err);
            throw new Error(`Failed to read content from ${fileToProcess.name}. The file might be corrupted or in an unsupported format.`);
        }
    };
    
    const fetchWithBackoff = async (url, options, retries = 3, backoff = 500) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    const errorBody = await response.json().catch(() => ({ error: { message: response.statusText } }));
                    throw new Error(`API request failed with status ${response.status}: ${errorBody.error.message}`);
                }
                return await response.json();
            } catch (err) {
                if (i === retries - 1) throw err;
                await new Promise(resolve => setTimeout(resolve, backoff * Math.pow(2, i)));
            }
        }
    };

    const handleAnalysis = async () => {
        if (!libsLoaded) {
            setError("Libraries are not ready. Please try again in a moment.");
            return;
        }
        if (!file) {
            setError("Please upload a report file to analyze.");
            return;
        }

        setIsLoading(true);
        setError('');
        setAnalysis('');
        setSources([]);

        try {
            const reportText = await extractTextFromFile(file);
            
            const userQuery = "Provide a comprehensive summary of the key findings, main points, and any actionable conclusions from this report.";
            const systemPrompt = "You are an expert business and data analyst. Your task is to analyze the provided report based on the user's request. Provide a clear, concise, and well-structured analysis, formatted nicely. Do not mention that you are an AI. Ground your analysis in the provided text and use external knowledge only to enrich the context when necessary.";
            const fullPrompt = `Based on the following report, please perform this analysis: "${userQuery}"\n\n--- REPORT START ---\n${reportText}\n--- REPORT END ---`;

            const payload = {
                contents: [{ parts: [{ text: fullPrompt }] }],
                tools: [{ "google_search": {} }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            };

            const result = await fetchWithBackoff(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const candidate = result.candidates?.[0];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                const text = candidate.content.parts[0].text;
                setAnalysis(text.replace(/\n/g, '<br>'));

                const groundingMetadata = candidate.groundingMetadata;
                if (groundingMetadata && groundingMetadata.groundingAttributions) {
                    const extractedSources = groundingMetadata.groundingAttributions
                        .map(attr => ({ uri: attr.web?.uri, title: attr.web?.title }))
                        .filter(source => source.uri && source.title);

                    if (extractedSources.length > 0) {
                        setSources(extractedSources);
                    }
                }
            } else {
                 console.error("Unexpected API response structure:", result);
                setError("Received an invalid response from the analysis service.");
            }

        } catch (err) {
            console.error('Analysis failed:', err);
            setError(`An error occurred during analysis: ${err.message}.`);
        } finally {
            setIsLoading(false);
        }
    };

    const Styles = () => (
        <style>{`
            .loader {
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3b82f6;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .fade-in {
                animation: fadeIn 0.5s ease-in-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `}</style>
    );

    return (
        <>
            <Styles />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 antialiased text-slate-800 font-sans">
                <div className="w-full max-w-6xl mx-auto">
                    
                    <header className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">AI Report Analyzer</h1>
                        <p className="mt-3 text-lg text-gray-600">Upload your report and get instant AI-powered insights.</p>
                    </header>

                    <main className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            <div className="flex flex-col space-y-6">
                                <div>
                                    <label htmlFor="report-file" className="block text-lg font-semibold text-gray-700 mb-2">1. Upload Your Report</label>
                                    <input 
                                        type="file" 
                                        id="report-file" 
                                        className="w-full text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:bg-blue-600 file:text-white file:font-bold file:border-none file:py-3 file:px-5 file:mr-4 hover:file:bg-blue-700" 
                                        accept=".txt,.pdf,.docx"
                                        onChange={handleFileChange}
                                    />
                                    <p className="text-sm text-gray-500 mt-2 h-5">{fileInfo}</p>
                                </div>
                                <button 
                                    onClick={handleAnalysis}
                                    disabled={isLoading || !libsLoaded}
                                    className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Analyzing...' : (libsLoaded ? 'Analyze Report' : 'Loading Libraries...')}
                                </button>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 min-h-[400px] flex flex-col">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Analysis Results</h2>
                                <div className="flex-grow relative">
                                    {isLoading && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 bg-opacity-80 z-10">
                                            <div className="loader"></div>
                                            <p className="mt-4 text-gray-600">Analyzing report, please wait...</p>
                                        </div>
                                    )}
                                    {error && (
                                        <div className="p-4 bg-red-100 text-red-700 rounded-lg fade-in">
                                            {error}
                                        </div>
                                    )}
                                    
                                    {!isLoading && !error && !analysis && (
                                         <div className="text-center text-gray-500 flex items-center justify-center h-full">
                                            <p>Your analysis will appear here.</p>
                                        </div>
                                    )}

                                    {analysis && (
                                        <div className="space-y-6 fade-in">
                                            <div 
                                                className="text-gray-700 whitespace-pre-wrap"
                                                dangerouslySetInnerHTML={{ __html: analysis }}
                                            />
                                            {sources.length > 0 && (
                                                <div className="fade-in">
                                                    <h3 className="text-md font-semibold text-gray-600 border-t pt-4">Sources</h3>
                                                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                                                         {sources.map((source, index) => (
                                                            <li key={index}>
                                                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                                    {source.title}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </main>
                    
                    <footer className="text-center mt-8 text-gray-500 text-sm">
                      
                    </footer>
                </div>
            </div>
        </>
    );
}


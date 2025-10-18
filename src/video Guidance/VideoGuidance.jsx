import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- SVG Icons (replaces lucide-react dependency) ---
const SearchIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);
const FilmIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
        <line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line>
        <line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line>
        <line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line>
        <line x1="17" y1="7" x2="22" y2="7"></line>
    </svg>
);
const HeartIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);
const Share2Icon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);
const DownloadIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);
const BookmarkIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
    </svg>
);
const MoreHorizontalIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle>
    </svg>
);


// --- Mock Data for Videos ---
const allVideos = [
    { id: 1, title: "CPR for Adults: A Step-by-Step Guide", category: "First Aid", duration: "8:45", thumbnail: "https://placehold.co/600x400/ef4444/ffffff?text=CPR+Guide", description: "Learn the essential steps of performing CPR on an adult to save a life." },
    { id: 2, title: "How to Handle a Burn Injury", category: "First Aid", duration: "5:30", thumbnail: "https://placehold.co/600x400/f97316/ffffff?text=Burn+Injury", description: "Quick and effective first aid for minor to moderate burns at home." },
    { id: 3, title: "Recognizing Stroke Symptoms (FAST)", category: "First Aid", duration: "4:15", thumbnail: "https://placehold.co/600x400/eab308/ffffff?text=Stroke+FAST", description: "Learn the F.A.S.T. acronym to quickly identify stroke symptoms." },
    { id: 4, title: "10 Tips for a Healthier Diet", category: "Health Tips", duration: "12:20", thumbnail: "https://placehold.co/600x400/22c55e/ffffff?text=Healthy+Diet", description: "Simple, actionable tips to improve your nutrition and overall health." },
    { id: 5, title: "Benefits of Daily Exercise", category: "Health Tips", duration: "10:55", thumbnail: "https://placehold.co/600x400/14b8a6/ffffff?text=Daily+Exercise", description: "Discover the wide-ranging benefits of incorporating daily exercise into your routine." },
    { id: 6, title: "Improving Your Sleep Quality", category: "Health Tips", duration: "7:40", thumbnail: "https://placehold.co/600x400/3b82f6/ffffff?text=Sleep+Quality", description: "Techniques and habits to help you get a better night's sleep." },
    { id: 7, title: "Understanding Your Blood Pressure", category: "Doctor Advice", duration: "9:00", thumbnail: "https://placehold.co/600x400/8b5cf6/ffffff?text=Blood+Pressure", description: "A doctor explains what blood pressure numbers mean and how to manage them." },
    { id: 8, title: "When to See a Doctor for a Cold", category: "Doctor Advice", duration: "6:10", thumbnail: "https://placehold.co/600x400/a855f7/ffffff?text=Doctor+Visit", description: "Learn the key symptoms that indicate your cold might be something more serious." },
    { id: 9, "title": "The Importance of Regular Check-ups", "category": "Doctor Advice", "duration": "11:30", "thumbnail": "https://placehold.co/600x400/d946ef/ffffff?text=Check-ups", "description": "Why preventive care and regular doctor visits are crucial for long-term health." },
    { id: 10, title: "Managing Choking Emergencies", category: "First Aid", duration: "7:05", thumbnail: "https://placehold.co/600x400/dc2626/ffffff?text=Choking", description: "Learn the Heimlich maneuver and other critical steps for choking." },
    { id: 11, title: "Mindfulness and Stress Reduction", category: "Health Tips", duration: "15:00", thumbnail: "https://placehold.co/600x400/10b981/ffffff?text=Mindfulness", description: "Guided techniques for mindfulness meditation to help reduce daily stress." },
    { id: 12, title: "Decoding Your Cholesterol Levels", category: "Doctor Advice", duration: "8:25", thumbnail: "https://placehold.co/600x400/6366f1/ffffff?text=Cholesterol", description: "A medical expert breaks down LDL, HDL, and triglycerides." },
];

const categories = ["All", "First Aid", "Health Tips", "Doctor Advice"];

// --- Video Card Component ---
const VideoCard = ({ video }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col">
            <div className="relative">
                <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-1 rounded-full">{video.duration}</span>
                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-1.5 rounded-full text-white bg-black bg-opacity-60 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                        >
                            <MoreHorizontalIcon className="w-5 h-5" />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-20 py-1">
                                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <HeartIcon className="w-5 h-5 text-gray-500"/> Like
                                </a>
                                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <BookmarkIcon className="w-5 h-5 text-gray-500"/> Bookmark
                                </a>
                                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <Share2Icon className="w-5 h-5 text-gray-500"/> Share
                                </a>
                                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <DownloadIcon className="w-5 h-5 text-gray-500"/> Download
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">{video.title}</h3>
                <p className="text-gray-600 text-sm flex-grow mb-4">{video.description}</p>
                <div className="mt-auto">
                    <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all flex items-center justify-center">
                        <FilmIcon className="w-5 h-5 mr-2" /> Play Video
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function VideoGuidancePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Add Tailwind CSS to the page
    useEffect(() => {
        const tailwindScriptId = 'tailwind-css-cdn';
        if (!document.getElementById(tailwindScriptId)) {
            const script = document.createElement('script');
            script.id = tailwindScriptId;
            script.src = "https://cdn.tailwindcss.com";
            document.head.appendChild(script);
        }
    }, []);

    const filteredVideos = useMemo(() => {
        return allVideos.filter(video => {
            const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
            const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, activeCategory]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
            <div className="container mx-auto px-4 py-8 md:py-12">
                
                {/* --- Header --- */}
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Video Guidance Library</h1>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                        Your trusted source for instructional videos on first aid, health, and expert medical advice.
                    </p>
                </header>

                {/* --- Search and Filter Controls --- */}
                <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm pt-4 pb-6 mb-8">
                    <div className="max-w-3xl mx-auto">
                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search for a video..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-300 rounded-full focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all"
                            />
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                        </div>

                        {/* Category Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2 font-bold rounded-full transition-all text-sm md:text-base ${
                                        activeCategory === category
                                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                                            : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Video Library Grid --- */}
                <main>
                    {filteredVideos.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredVideos.map(video => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-bold text-gray-700">No Videos Found</h2>
                            <p className="text-gray-500 mt-2">Try adjusting your search or selecting a different category.</p>
                        </div>
                    )}
                </main>

                {/* --- Footer --- */}
                <footer className="text-center mt-16 text-gray-500 text-sm">
                    <p>Powered by an intelligent recommendation engine.</p>
                </footer>
            </div>
        </div>
    );
}


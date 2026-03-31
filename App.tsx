import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MemberProfile from './pages/MemberProfile';
import SpeakerProfile from './pages/SpeakerProfile';
import { ContentProvider } from './contexts/ContentContext';
import { AdminProvider } from './contexts/AdminContext';

const App: React.FC = () => {
    return (
        <ContentProvider>
            <AdminProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/committee/:id" element={<MemberProfile />} />
                        <Route path="/speaker/:id" element={<SpeakerProfile />} />
                    </Routes>
                </Router>
            </AdminProvider>
        </ContentProvider>
    );
};

export default App;
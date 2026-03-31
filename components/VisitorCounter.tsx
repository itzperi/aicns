
import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export const VisitorCounter: React.FC<{ className?: string }> = ({ className = "" }) => {
    const BASE_COUNT = 1000; // Baseline — cumulative all-time counter starts at 1,000
    const STORAGE_KEY = 'aicns_visitor_count_alltime';
    const SESSION_KEY = 'aicns_session_active_alltime';

    const [count, setCount] = useState<number>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? parseInt(stored, 10) : BASE_COUNT;
    });

    useEffect(() => {
        // Namespace and Key for CountAPI
        // Using a specific key to ensure persistence across sessions for all users
        const NAMESPACE = 'aicns-all-time-visits-2026'; // Changed namespace to ensure fresh start
        const KEY = 'visits';

        const fetchGlobalCount = async () => {
            try {
                const hasSession = sessionStorage.getItem(SESSION_KEY);
                // If no session, we want to HIT (increment). If session exists, we just GET (view).
                const action = hasSession ? 'get' : 'hit';

                // Add simple timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 seconds timeout

                // Using countapi.xyz
                // Note: If this API is blocked by adblockers, it will throw.
                const response = await fetch(`https://api.countapi.xyz/${action}/${NAMESPACE}/${KEY}`, {
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                const data = await response.json();

                if (data && typeof data.value === 'number') {
                    const newCount = BASE_COUNT + data.value;
                    setCount(newCount);
                    if (!hasSession) {
                        sessionStorage.setItem(SESSION_KEY, 'true');
                    }
                    // Sync local storage as backup
                    localStorage.setItem(STORAGE_KEY, newCount.toString());
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (error) {
                console.warn("Visitor API failed or blocked, using local fallback", error);
                // Determine if we need to increment locally (only if no session active)
                if (!sessionStorage.getItem(SESSION_KEY)) {
                    setCount(prev => {
                        const newCount = prev + 1;
                        localStorage.setItem(STORAGE_KEY, newCount.toString());
                        return newCount;
                    });
                    sessionStorage.setItem(SESSION_KEY, 'true');
                }
            }
        };

        fetchGlobalCount();
    }, []);

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-black/20 rounded-full text-xs font-mono ${className}`}>
            <Users size={12} className="text-green-400" />
            <span className="text-white">
                Total Visitors: <span className="text-green-400 font-bold">{count.toLocaleString()}</span>
            </span>
        </div>
    );
};

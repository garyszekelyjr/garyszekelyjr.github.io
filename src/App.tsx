import { useCallback, useState } from 'react';

import Desktop from './components/Desktop.component';
import Taskbar from './components/Taskbar.component';


function App() {
    const [windows, setWindows] = useState<string[]>([]);
    const [tabs, setTabs] = useState<string[]>([]);

    const openApplication = useCallback((name: string) => {
        setWindows((windows) => [...windows, name]);
        setTabs((tabs) => [...tabs, name]);
    }, []);

    const closeApplication = useCallback((name: string) => {
        setWindows((windows) => windows.filter((window) => window !== name));
        setTabs((tabs) => tabs.filter((tab) => tab !== name));
    }, [])

    return (
        <>
            <Desktop windows={windows} openApplication={openApplication} closeApplication={closeApplication} />
            <Taskbar tabs={tabs} setTabs={setTabs} />
        </>
    );
}

export default App;

import { createRoot } from 'react-dom/client';
import App from './App';

import { UserProvider } from './context/userProvider';
import { DatasetsProvider } from './context/datasetProvider';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <UserProvider>
        <DatasetsProvider>
            <App />
        </DatasetsProvider>
    </UserProvider>
);
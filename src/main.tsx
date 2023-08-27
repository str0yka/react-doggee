import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import './styles/global.scss';
import './styles/zero.scss';

const root = createRoot(document.getElementById('root')!);

root.render(<App />);

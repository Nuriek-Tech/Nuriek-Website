import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Solutions from './pages/Solutions.jsx';
import Industries from './pages/Industries.jsx';
import Approach from './pages/Approach.jsx';
import AiLab from './pages/AiLab.jsx';
import Insights from './pages/Insights.jsx';
import Article from './pages/Article.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/ai-lab" element={<AiLab />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<Article />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

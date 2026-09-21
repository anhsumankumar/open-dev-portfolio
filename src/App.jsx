import React, { useEffect } from 'react';
import './styles/animations.css';
import './styles/terminal.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import TerminalIndex from './components/TerminalIndex';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminDomains from './pages/AdminDomains';
import ProjectEditor from './pages/ProjectEditor';
import Resume from './pages/Resume';
import AdminResume from './pages/AdminResume';

import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const observeNewElements = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        intersectionObserver.observe(el);
      });
    };

    observeNewElements();

    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <ThemeProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <TerminalIndex />
            <Navbar />
            <Hero />
            <ProjectGrid />
            <About />
            <Experience />
            <Skills />
            <Contact />
          </>
        } />
        
        <Route path="/projects/:slug" element={
          <>
            <Navbar />
            <ProjectDetail />
          </>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/domains" element={<AdminDomains />} />
        <Route path="/admin/resume" element={<AdminResume />} />
            <Route path="/resume" element={<><Navbar /><Resume /></>} />
        <Route path="/admin/projects/new" element={<ProjectEditor />} />
        <Route path="/admin/projects/:id/edit" element={<ProjectEditor />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;

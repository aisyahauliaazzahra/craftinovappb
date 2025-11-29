
import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { supabaseService } from './services/supabaseService';

// Import all pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesPage from './pages/ArticlesPage';
import ProductsPage from './pages/ProductsPage';
import AdminPanel from './pages/AdminPanel';
import Gallery from './pages/Gallery';
import ProfilePage from './pages/ProfilePage'; // ⬅⬅⬅ TAMBAHAN PENTING

// Import quiz components
import Quiz from './components/Quiz';
import VideoTutorial from './components/VideoTutorial';
import PostTest from './components/PostTest';
import Result from './components/Result';

// Import modals
import PasswordModal from './components/PasswordModal';
import ArticleDetailModal from './components/ArticleDetailModal';
import UserInfoModal from './components/UserInfoModal';

// Import data
import {
  companyInfo,
  articles,
  products,
  initialQuestions,
  postTestQuestions
} from './data/appData';

const StressLevelWebsite = () => {

  // ============================
  // STATE MANAGEMENT
  // ============================
  const [currentView, setCurrentView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [postTestAnswers, setPostTestAnswers] = useState([]);
  const [stressLevel, setStressLevel] = useState(null);
  const [currentPostTestIndex, setCurrentPostTestIndex] = useState(0);

  // Admin state
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // ============================
  // STRESS LEVEL LOGIC
  // ============================
  const calculateStressLevel = (answers) => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = postTestQuestions.length * 4;
    const percentage = (total / maxScore) * 100;

    if (percentage >= 75) {
      return {
        level: "Sangat Membantu",
        color: "text-green-600",
        description: "Craftinova sangat membantu mengurangi stress Anda.",
        result: "Sangat Membantu",
      };
    } else if (percentage >= 50) {
      return {
        level: "Cukup Membantu",
        color: "text-yellow-600",
        description: "Craftinova cukup membantu mengurangi stress Anda.",
        result: "Cukup Membantu",
      };
    } else if (percentage >= 25) {
      return {
        level: "Tidak Membantu",
        color: "text-orange-600",
        description: "Craftinova tidak membantu mengurangi stress Anda.",
        result: "Tidak Membantu",
      };
    } else {
      return {
        level: "Tidak Membantu",
        color: "text-red-600",
        description: "Craftinova tidak membantu mengurangi stress Anda.",
        result: "Tidak Membantu",
      };
    }
  };

  // ============================
  // ADMIN LOGIN
  // ============================
  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setCurrentView('admin');
      setShowPasswordModal(false);
      setAdminPassword('');
    } else {
      alert('Password salah!');
    }
  };

  // ============================
  // CUSTOMER JOURNEY
  // ============================
  const handleScan = () => {
    setShowUserInfoModal(true);
  };

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
    setShowUserInfoModal(false);
    setCurrentView('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...answers, answerIndex + 1];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowVideo(true);
      setCurrentView('video');
    }
  };

  const handleVideoComplete = () => {
    setCurrentView('posttest');
    setCurrentPostTestIndex(0);
    setPostTestAnswers([]);
  };

  const handlePostTestAnswer = async (answerIndex) => {
    const newAnswers = [...postTestAnswers, answerIndex + 1];
    setPostTestAnswers(newAnswers);

    if (currentPostTestIndex < postTestQuestions.length - 1) {
      setCurrentPostTestIndex(currentPostTestIndex + 1);
    } else {
      const result = calculateStressLevel(newAnswers);
      setStressLevel(result);
      setCurrentView('result');

      const userData = {
        user_info: userInfo,
        pre_test_answers: answers,
        post_test_answers: newAnswers,
        stress_level: result,
        timestamp: new Date().toISOString()
      };

      try {
        const connectionTest = await supabaseService.testConnection();
        if (!connectionTest) throw new Error("Cannot connect to Supabase");

        await supabaseService.saveUserAnswers(userData);
      } catch (err) {
        alert("Gagal menyimpan ke server, tersimpan lokal");
        const local = JSON.parse(localStorage.getItem("userAnswers") || "[]");
        local.push(userData);
        localStorage.setItem("userAnswers", JSON.stringify(local));
      }
    }
  };

  const resetCustomerJourney = () => {
    setCurrentView('home');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowVideo(false);
    setPostTestAnswers([]);
    setStressLevel(null);
    setCurrentPostTestIndex(0);
    setUserInfo(null);
  };

  // ============================
  // RENDERING
  // ============================
  const commonProps = {
    setCurrentView,
    setShowPasswordModal,
    companyInfo,
    handleScan
  };

  return (
    <div>
      {currentView === 'home' && <HomePage {...commonProps} />}
      {currentView === 'about' && <AboutPage {...commonProps} />}
      {currentView === 'articles' && <ArticlesPage {...commonProps} articles={articles} setSelectedArticle={setSelectedArticle} />}
      {currentView === 'products' && <ProductsPage {...commonProps} products={products} />}
      {currentView === 'quiz' && <Quiz questions={questions} currentQuestionIndex={currentQuestionIndex} handleQuizAnswer={handleQuizAnswer} />}
      {currentView === 'gallery' && <Gallery {...commonProps} />}
            {currentView === 'profil' && <ProfilePage {...commonProps} />}


      {/* ⬅⬅⬅ TAMBAHKAN HALAMAN PROFIL */}
      {currentView === 'profile' && <ProfilePage />}

      {currentView === 'video' && <VideoTutorial handleVideoComplete={handleVideoComplete} />}
      {currentView === 'posttest' && <PostTest postTestQuestions={postTestQuestions} currentPostTestIndex={currentPostTestIndex} handlePostTestAnswer={handlePostTestAnswer} />}
      {currentView === 'result' && <Result stressLevel={stressLevel} resetCustomerJourney={resetCustomerJourney} />}
      {currentView === 'admin' && (
        <AdminPanel
          questions={questions}
          setQuestions={setQuestions}
          setIsAdmin={setIsAdmin}
          setCurrentView={setCurrentView}
        />
      )}

      {showPasswordModal && (
        <PasswordModal
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          handleAdminLogin={handleAdminLogin}
          setShowPasswordModal={setShowPasswordModal}
        />
      )}

      {showUserInfoModal && (
        <UserInfoModal
          show={showUserInfoModal}
          onClose={() => setShowUserInfoModal(false)}
          onSave={handleUserInfoSubmit}
        />
      )}

      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default StressLevelWebsite;

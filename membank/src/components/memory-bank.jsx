import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, Camera, User, Plus, Settings, LogOut, Menu, X } from 'lucide-react';

// Sample memory data with beautiful, diverse images
const initialMemories = [
  {
    id: 1,
    date: '2024-01-15',
    title: 'Beach Sunset',
    description: 'Watched the most beautiful sunset at the beach. The colors were absolutely breathtaking, painting the sky in shades of pink and orange.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
    favorite: false,
    snippets: [
      { image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop&q=80', caption: 'Golden hour glow on the waves' },
      { image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=400&fit=crop&q=80', caption: 'Peaceful shoreline' },
      { image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=400&fit=crop&q=80', caption: 'Sunset silhouettes' }
    ]
  },
  {
    id: 2,
    date: '2023-12-20',
    title: 'Mountain Adventure',
    description: 'Hiked to the peak and felt on top of the world. The journey was challenging but so rewarding. Fresh mountain air and endless views.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
    favorite: false,
    snippets: [
      { image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&q=80', caption: 'Mountain summit views' },
      { image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&h=400&fit=crop&q=80', caption: 'Trail through the peaks' },
      { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80', caption: 'Alpine landscape' }
    ]
  },
  {
    id: 3,
    date: '2023-11-10',
    title: 'Cozy Coffee Morning',
    description: 'Perfect autumn morning with a warm cup of coffee and good company. The aroma filled the air as we talked for hours.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80',
    favorite: true,
    snippets: [
      { image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&q=80', caption: 'Morning brew perfection' },
      { image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop&q=80', caption: 'Coffee shop vibes' },
      { image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop&q=80', caption: 'Latte art love' }
    ]
  },
  {
    id: 4,
    date: '2023-10-05',
    title: 'City Lights',
    description: 'Evening walk through the city, watching lights come alive as the sun sets. The urban energy was magical and inspiring.',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop&q=80',
    favorite: false,
    snippets: [
      { image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop&q=80', caption: 'Urban glow at dusk' },
      { image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop&q=80', caption: 'City streets alive' },
      { image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80', caption: 'Downtown reflections' }
    ]
  },
  {
    id: 5,
    date: '2023-09-18',
    title: 'Garden Blooms',
    description: 'Spring flowers in full bloom, nature showing off its most beautiful colors. Every corner revealed a new wonder.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop&q=80',
    favorite: false,
    snippets: [
      { image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=600&h=400&fit=crop&q=80', caption: 'Wildflower meadow' },
      { image: 'https://images.unsplash.com/photo-1464347744102-11db6282f854?w=600&h=400&fit=crop&q=80', caption: 'Garden sanctuary' },
      { image: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&h=400&fit=crop&q=80', caption: 'Tulip fields' }
    ]
  },
  {
    id: 6,
    date: '2023-08-22',
    title: 'Rainy Day Comfort',
    description: 'Sometimes the best memories are made on rainy days, watching droplets race down windows while staying warm inside.',
    image: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=800&h=600&fit=crop&q=80',
    favorite: true,
    snippets: [
      { image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&h=400&fit=crop&q=80', caption: 'Puddle reflections' },
      { image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop&q=80', caption: 'Rainy window view' },
      { image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&h=400&fit=crop&q=80', caption: 'Cozy rain day' }
    ]
  },
  {
    id: 7,
    date: '2023-07-14',
    title: 'Summer Picnic',
    description: 'Lazy summer afternoon in the park with friends, laughter, and endless sunshine. Simple moments that mean everything.',
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&h=600&fit=crop&q=80',
    favorite: false,
    snippets: [
      { image: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=600&h=400&fit=crop&q=80', caption: 'Park gathering' },
      { image: 'https://images.unsplash.com/photo-1529543544-b9ac33a3ec83?w=600&h=400&fit=crop&q=80', caption: 'Summer spread' },
      { image: 'https://images.unsplash.com/photo-1527427337751-fdca2f128ce5?w=600&h=400&fit=crop&q=80', caption: 'Sunshine moments' }
    ]
  },
  {
    id: 8,
    date: '2023-06-08',
    title: 'Birthday Celebration',
    description: 'Surrounded by loved ones, laughter, and joy. The cake was almost too pretty to eat, but we managed!',
    image: 'https://images.unsplash.com/photo-1464347744102-11db6282f854?w=600&h=400&fit=crop&q=80',
    favorite: true,
    snippets: [
      { image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&h=400&fit=crop&q=80', caption: 'Birthday cake magic' },
      { image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&q=80', caption: 'Celebration balloons' },
      { image: 'https://images.unsplash.com/photo-1464347744102-11db6282f854?w=600&h=400&fit=crop&q=80', caption: 'Happy moments' }
    ]
  },
  {
    id: 9,
    date: '2023-05-20',
    title: 'Forest Wandering',
    description: 'Lost track of time wandering through the forest. The peace and quiet was exactly what I needed.',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop&q=80',
    favorite: false,
    snippets: [
      { image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&h=400&fit=crop&q=80', caption: 'Forest path' },
      { image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&h=400&fit=crop&q=80', caption: 'Sunlight through trees' },
      { image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop&q=80', caption: 'Nature trail' }
    ]
  }
];

const MemoryBank = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [memoryList, setMemoryList] = useState(initialMemories);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Form state for adding new memory
  const [newMemory, setNewMemory] = useState({
    title: '',
    date: '',
    description: '',
    image: null,
    imagePreview: '',
    snippets: []
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (memoryId) => {
    setMemoryList(prevList => {
      const updatedList = prevList.map(mem => 
        mem.id === memoryId ? { ...mem, favorite: !mem.favorite } : mem
      );
      
      // If this is the currently selected memory, update it too
      if (selectedMemory && selectedMemory.id === memoryId) {
        const updatedMemory = updatedList.find(mem => mem.id === memoryId);
        setSelectedMemory(updatedMemory);
      }
      
      return updatedList;
    });
  };

  const handleImageUpload = (e, isSnippet = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isSnippet) {
          setNewMemory(prev => ({
            ...prev,
            snippets: [...prev.snippets, { image: reader.result, caption: '' }]
          }));
        } else {
          setNewMemory(prev => ({
            ...prev,
            image: file,
            imagePreview: reader.result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitMemory = () => {
    if (newMemory.title && newMemory.date && newMemory.imagePreview) {
      const memory = {
        id: memoryList.length + 1,
        title: newMemory.title,
        date: newMemory.date,
        description: newMemory.description,
        image: newMemory.imagePreview,
        favorite: false,
        snippets: newMemory.snippets.length > 0 ? newMemory.snippets : [
          { image: newMemory.imagePreview, caption: 'Main photo' }
        ]
      };
      
      setMemoryList([memory, ...memoryList]);
      setShowAddModal(false);
      setNewMemory({
        title: '',
        date: '',
        description: '',
        image: null,
        imagePreview: '',
        snippets: []
      });
    }
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children, width = '600px' }) => {
    if (!isOpen) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }} onClick={onClose}>
        <div style={{
          background: 'linear-gradient(145deg, #f5deb3, #f4e4c1)',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: width,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          border: '6px solid #8b6f47',
          position: 'relative'
        }} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'linear-gradient(135deg, #d4a574, #c19a6b)',
              border: '2px solid #8b6f47',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '24px',
              color: '#3d2817',
              fontWeight: 'bold'
            }}
          >
            ×
          </button>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#3d2817',
            marginBottom: '30px',
            fontFamily: '"Crimson Pro", serif'
          }}>
            {title}
          </h2>
          {children}
        </div>
      </div>
    );
  };

  const navigateSnippet = (direction) => {
    if (!selectedMemory) return;
    const newIndex = currentSnippet + direction;
    if (newIndex >= 0 && newIndex < selectedMemory.snippets.length) {
      setCurrentSnippet(newIndex);
    }
  };

  if (showWelcome) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5e6d3 0%, #d4a574 50%, #8b7355 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: '"Crimson Pro", serif',
        position: 'relative'
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=Quicksand:wght@400;500;600&display=swap');
          
          @keyframes filmRollSlide {
            0% { transform: translateX(-100%) rotate(-5deg); opacity: 0; }
            50% { transform: translateX(0) rotate(0deg); opacity: 1; }
            100% { transform: translateX(0) rotate(0deg); opacity: 1; }
          }
          
          @keyframes textFadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes sprocketSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes flickerEffect {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.95; }
          }

          .film-roll {
            animation: filmRollSlide 2s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .welcome-text {
            animation: textFadeIn 1s ease-out 1.5s both;
          }
          
          .sprocket {
            animation: sprocketSpin 3s linear infinite;
          }

          .retro-vignette {
            animation: flickerEffect 2s ease-in-out infinite;
          }
        `}</style>

        {/* Retro vignette overlay */}
        <div className="retro-vignette" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.3) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Vintage Film Roll */}
          <div className="film-roll" style={{
            background: 'linear-gradient(to bottom, #2a1810 0%, #1a0f08 100%)',
            borderRadius: '16px',
            padding: '30px 60px',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
            border: '6px solid #8b6f47'
          }}>
            {/* Sprocket holes - vintage style */}
            <div style={{ 
              position: 'absolute', 
              top: '15px', 
              left: '15px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '18px' 
            }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="sprocket" style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '3px',
                  background: '#000',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
                  border: '1px solid #3d2817'
                }} />
              ))}
            </div>
            <div style={{ 
              position: 'absolute', 
              top: '15px', 
              right: '15px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '18px' 
            }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="sprocket" style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '3px',
                  background: '#000',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
                  border: '1px solid #3d2817'
                }} />
              ))}
            </div>
            
            {/* Film frames with vintage look */}
            <div style={{ display: 'flex', gap: '20px' }}>
              {[1, 2, 3].map((frame) => (
                <div key={frame} style={{
                  width: '120px',
                  height: '90px',
                  background: 'linear-gradient(135deg, #f5deb3, #d4a574)',
                  borderRadius: '6px',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                  border: '3px solid #8b6f47',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Vintage photo effect overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                      repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0,0,0,0.03) 2px,
                        rgba(0,0,0,0.03) 4px
                      )
                    `,
                    pointerEvents: 'none'
                  }} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Welcome text with retro styling */}
          <h1 className="welcome-text" style={{
            marginTop: '50px',
            fontSize: '52px',
            fontWeight: '400',
            color: '#3d2817',
            letterSpacing: '3px',
            fontFamily: '"Crimson Pro", serif',
            textShadow: '3px 3px 6px rgba(0,0,0,0.3), 0 0 20px rgba(245, 222, 179, 0.5)',
            textTransform: 'lowercase'
          }}>
            let's go back in time
          </h1>
        </div>
      </div>
    );
  }

  if (selectedMemory) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5e6d3 0%, #d4a574 50%, #8b7355 100%)',
        paddingTop: '100px',
        paddingBottom: '60px',
        paddingLeft: '20px',
        paddingRight: '20px',
        fontFamily: '"Quicksand", sans-serif'
      }}>
        <style>{`
          @keyframes cameraOpen {
            0% { transform: scale(0.8) rotateY(90deg); opacity: 0; }
            100% { transform: scale(1) rotateY(0deg); opacity: 1; }
          }
          
          .camera-view {
            animation: cameraOpen 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .snippet-img {
            transition: all 0.3s ease;
          }
          
          .snippet-img:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          }

          .nav-item {
            transition: all 0.3s ease;
          }

          .nav-item:hover {
            transform: translateY(-2px);
          }
        `}</style>

        {/* Navigation Bar */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to right, #3d2817, #5c4033, #3d2817)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          zIndex: 1000,
          padding: '15px 30px',
          borderBottom: '3px solid #8b6f47'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #d4a574, #c19a6b)',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
                border: '2px solid #8b6f47'
              }}>
                <Camera size={24} color="#3d2817" />
              </div>
              <span style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#f5deb3',
                fontFamily: '"Crimson Pro", serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>
                Memory Bank
              </span>
            </div>

            {/* Desktop Navigation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <button
                className="nav-item"
                onClick={() => setShowAddModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #d4a574, #c19a6b)',
                  border: '2px solid #8b6f47',
                  borderRadius: '8px',
                  color: '#3d2817',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
                  fontFamily: '"Quicksand", sans-serif'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Plus size={18} />
                <span>Add Memory</span>
              </button>

              <button
                className="nav-item"
                onClick={() => setShowSettingsModal(true)}
                style={{
                  padding: '10px',
                  background: 'rgba(212, 165, 116, 0.2)',
                  border: '2px solid #8b6f47',
                  borderRadius: '8px',
                  color: '#f5deb3',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 165, 116, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 165, 116, 0.2)';
                }}
              >
                <Settings size={22} />
              </button>

              <button
                className="nav-item"
                onClick={() => setShowProfileModal(true)}
                style={{
                  padding: '10px',
                  background: 'linear-gradient(135deg, #d4a574, #c19a6b)',
                  border: '2px solid #8b6f47',
                  borderRadius: '8px',
                  color: '#3d2817',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255,255,255,0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)';
                }}
              >
                <User size={22} />
              </button>

              <button
                className="nav-item"
                onClick={() => alert('Logout feature coming soon!')}
                style={{
                  padding: '10px',
                  background: 'rgba(212, 165, 116, 0.2)',
                  border: '2px solid #8b6f47',
                  borderRadius: '8px',
                  color: '#d4a574',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 165, 116, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 165, 116, 0.2)';
                }}
              >
                <LogOut size={22} />
              </button>
            </div>
          </div>
        </nav>
        
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Back button */}
          <button
            onClick={() => {
              setSelectedMemory(null);
              setCurrentSnippet(0);
            }}
            style={{
              marginBottom: '30px',
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #d4a574, #c19a6b)',
              border: '2px solid #8b6f47',
              borderRadius: '8px',
              color: '#3d2817',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              fontFamily: '"Quicksand", sans-serif'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255,255,255,0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)';
            }}
          >
            ← Back to Timeline
          </button>
          
          {/* Camera view */}
          <div className="camera-view" style={{
            background: 'linear-gradient(145deg, #f5deb3 0%, #f4e4c1 100%)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.5)',
            border: '8px solid #8b6f47',
            position: 'relative'
          }}>
            {/* Camera icon decoration */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #3d2817, #2a1810)',
              padding: '15px',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255,255,255,0.1)',
              border: '3px solid #8b6f47'
            }}>
              <Camera size={32} color="#d4a574" />
            </div>
            
            {/* Main memory image */}
            <div style={{
              width: '100%',
              height: '500px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '30px',
              position: 'relative',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.4)',
              border: '4px solid #8b6f47'
            }}>
              <img 
                src={selectedMemory.image} 
                alt={selectedMemory.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'sepia(0.2) contrast(1.1) brightness(0.95)'
                }}
              />
              {/* Vignette overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none'
              }} />
              
              {/* Favorite button */}
              <button
                onClick={() => toggleFavorite(selectedMemory.id)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: selectedMemory.favorite 
                    ? 'linear-gradient(135deg, #8b4513, #654321)' 
                    : 'rgba(245, 222, 179, 0.95)',
                  border: '3px solid #8b6f47',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Heart 
                  size={28} 
                  fill={selectedMemory.favorite ? '#d4a574' : 'none'} 
                  color={selectedMemory.favorite ? '#d4a574' : '#8b4513'}
                />
              </button>
            </div>
            
            {/* Memory details */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{ 
                fontSize: '14px', 
                color: '#8b6f47', 
                marginBottom: '8px',
                fontWeight: '600',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}>
                {new Date(selectedMemory.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '600',
                color: '#3d2817',
                marginBottom: '15px',
                fontFamily: '"Crimson Pro", serif'
              }}>
                {selectedMemory.title}
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#5c4033',
                lineHeight: '1.8',
                fontWeight: '400'
              }}>
                {selectedMemory.description}
              </p>
            </div>
            
            {/* Snippets section */}
            <div>
              <h3 style={{
                fontSize: '20px',
                color: '#3d2817',
                marginBottom: '20px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  width: '40px',
                  height: '3px',
                  background: 'linear-gradient(to right, #8b6f47, transparent)'
                }}></span>
                More from this day
              </h3>
              
              <div style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Previous button */}
                <button
                  onClick={() => navigateSnippet(-1)}
                  disabled={currentSnippet === 0}
                  style={{
                    background: currentSnippet === 0 
                      ? 'rgba(139, 111, 71, 0.3)' 
                      : 'linear-gradient(135deg, #3d2817, #2a1810)',
                    border: '2px solid #8b6f47',
                    borderRadius: '8px',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: currentSnippet === 0 ? 'not-allowed' : 'pointer',
                    boxShadow: currentSnippet === 0 ? 'none' : '0 4px 15px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (currentSnippet !== 0) {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <ChevronLeft size={24} color={currentSnippet === 0 ? '#8b6f47' : '#d4a574'} />
                </button>
                
                {/* Current snippet */}
                <div style={{
                  flex: '1',
                  maxWidth: '600px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '15px',
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.2), 0 8px 25px rgba(0,0,0,0.3)',
                    border: '4px solid #8b6f47',
                    position: 'relative'
                  }}>
                    <img 
                      className="snippet-img"
                      src={selectedMemory.snippets[currentSnippet].image} 
                      alt={selectedMemory.snippets[currentSnippet].caption}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'sepia(0.2) contrast(1.1) brightness(0.95)'
                      }}
                    />
                    {/* Vignette overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.4) 100%)',
                      pointerEvents: 'none'
                    }} />
                  </div>
                  <p style={{
                    fontSize: '16px',
                    color: '#5c4033',
                    fontWeight: '600'
                  }}>
                    {selectedMemory.snippets[currentSnippet].caption}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#8b6f47',
                    marginTop: '5px'
                  }}>
                    {currentSnippet + 1} / {selectedMemory.snippets.length}
                  </p>
                </div>
                
                {/* Next button */}
                <button
                  onClick={() => navigateSnippet(1)}
                  disabled={currentSnippet === selectedMemory.snippets.length - 1}
                  style={{
                    background: currentSnippet === selectedMemory.snippets.length - 1 
                      ? 'rgba(139, 111, 71, 0.3)' 
                      : 'linear-gradient(135deg, #3d2817, #2a1810)',
                    border: '2px solid #8b6f47',
                    borderRadius: '8px',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: currentSnippet === selectedMemory.snippets.length - 1 ? 'not-allowed' : 'pointer',
                    boxShadow: currentSnippet === selectedMemory.snippets.length - 1 ? 'none' : '0 4px 15px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (currentSnippet !== selectedMemory.snippets.length - 1) {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <ChevronRight size={24} color={currentSnippet === selectedMemory.snippets.length - 1 ? '#8b6f47' : '#d4a574'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5e6d3 0%, #d4a574 50%, #8b7355 100%)',
      padding: '80px 20px',
      fontFamily: '"Quicksand", sans-serif'
    }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes filmFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .memory-frame {
          animation: fadeInUp 0.5s ease-out;
          transition: all 0.3s ease;
        }
        
        .memory-frame:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .nav-item {
          transition: all 0.3s ease;
        }

        .nav-item:hover {
          transform: translateY(-2px);
        }

        .film-grain {
          position: relative;
        }

        .film-grain::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          border-radius: inherit;
        }
      `}</style>

      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to right, #3d2817, #5c4033, #3d2817)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        zIndex: 1000,
        padding: '15px 30px',
        borderBottom: '3px solid #8b6f47'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #d4a574, #c19a6b)',
              padding: '10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
              border: '2px solid #8b6f47'
            }}>
              <Camera size={24} color="#3d2817" />
            </div>
            <span style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#f5deb3',
              fontFamily: '"Crimson Pro", serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Memory Bank
            </span>
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <button
              className="nav-item"
              onClick={() => setShowAddModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #d4a574, #c19a6b)',
                border: '2px solid #8b6f47',
                borderRadius: '8px',
                color: '#3d2817',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
                fontFamily: '"Quicksand", sans-serif'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255,255,255,0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Plus size={18} />
              <span style={{ display: window.innerWidth < 768 ? 'none' : 'inline' }}>Add Memory</span>
            </button>

            <button
              className="nav-item"
              onClick={() => setShowSettingsModal(true)}
              style={{
                padding: '10px',
                background: 'rgba(212, 165, 116, 0.2)',
                border: '2px solid #8b6f47',
                borderRadius: '8px',
                color: '#f5deb3',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(212, 165, 116, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(212, 165, 116, 0.2)';
              }}
            >
              <Settings size={22} />
            </button>

            <button
              className="nav-item"
              onClick={() => setShowProfileModal(true)}
              style={{
                padding: '10px',
                background: 'linear-gradient(135deg, #d4a574, #c19a6b)',
                border: '2px solid #8b6f47',
                borderRadius: '8px',
                color: '#3d2817',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255,255,255,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)';
              }}
            >
              <User size={22} />
            </button>

            <button
              className="nav-item"
              onClick={() => alert('Logout feature coming soon!')}
              style={{
                padding: '10px',
                background: 'rgba(212, 165, 116, 0.2)',
                border: '2px solid #8b6f47',
                borderRadius: '8px',
                color: '#d4a574',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(212, 165, 116, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(212, 165, 116, 0.2)';
              }}
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </nav>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px', marginTop: '40px' }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '600',
            color: '#3d2817',
            marginBottom: '15px',
            fontFamily: '"Crimson Pro", serif',
            letterSpacing: '2px',
            textShadow: '3px 3px 6px rgba(0,0,0,0.2)'
          }}>
            Memory Bank
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#5c4033',
            fontWeight: '400',
            letterSpacing: '1px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            Unroll the timeline to revisit your cherished moments
          </p>
        </div>
        
        {/* Film roll timeline */}
        <div style={{
          position: 'relative',
          padding: '40px 0'
        }}>
          {/* Memory frames */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            position: 'relative',
            zIndex: 1
          }}>
            {memoryList.map((memory, index) => (
              <div
                key={memory.id}
                className="memory-frame film-grain"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedMemory(memory)}
              >
                {/* Film frame container */}
                <div style={{
                  background: 'linear-gradient(145deg, #2a1810, #1a0f08)',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255,255,255,0.1)',
                  border: '4px solid #8b6f47',
                  position: 'relative'
                }}>
                  {/* Sprocket holes - retro style */}
                  <div style={{
                    position: 'absolute',
                    left: '6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '2px',
                        background: '#000',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
                        border: '1px solid #3d2817'
                      }} />
                    ))}
                  </div>
                  <div style={{
                    position: 'absolute',
                    right: '6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '2px',
                        background: '#000',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
                        border: '1px solid #3d2817'
                      }} />
                    ))}
                  </div>
                  
                  {/* Image with retro vignette effect */}
                  <div style={{
                    width: '100%',
                    height: '240px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '15px',
                    position: 'relative',
                    boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3), 0 4px 15px rgba(0,0,0,0.3)',
                    border: '3px solid #f5deb3'
                  }}>
                    <img 
                      src={memory.image} 
                      alt={memory.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'sepia(0.2) contrast(1.1) brightness(0.95)'
                      }}
                    />
                    {/* Vignette overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.4) 100%)',
                      pointerEvents: 'none'
                    }} />
                    {memory.favorite && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(139, 69, 19, 0.9)',
                        borderRadius: '50%',
                        padding: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                        border: '2px solid #d4a574'
                      }}>
                        <Heart size={18} fill="#d4a574" color="#d4a574" />
                      </div>
                    )}
                  </div>
                  
                  {/* Memory info with vintage paper look */}
                  <div style={{
                    background: 'linear-gradient(to bottom, #f5deb3, #f4e4c1)',
                    padding: '15px',
                    borderRadius: '6px',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                    border: '2px solid #d4a574'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#8b6f47',
                      marginBottom: '5px',
                      fontWeight: '600',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      {new Date(memory.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: '600',
                      color: '#3d2817',
                      marginBottom: '8px',
                      fontFamily: '"Crimson Pro", serif'
                    }}>
                      {memory.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#5c4033',
                      lineHeight: '1.6',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {memory.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <footer style={{
          marginTop: '80px',
          padding: '60px 0 30px',
          background: 'linear-gradient(to bottom, transparent, rgba(61, 40, 23, 0.3))',
          borderTop: '2px solid #8b6f47'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* About Section */}
            <div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#3d2817',
                marginBottom: '15px',
                fontFamily: '"Crimson Pro", serif'
              }}>
                About Memory Bank
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#5c4033',
                lineHeight: '1.8'
              }}>
                Preserving your precious moments in a beautiful, timeless format. Memory Bank helps you cherish and relive your favorite memories with style.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#3d2817',
                marginBottom: '15px',
                fontFamily: '"Crimson Pro", serif'
              }}>
                Quick Links
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['Home', 'My Memories', 'Favorites', 'Timeline'].map((link) => (
                  <li key={link} style={{ marginBottom: '10px' }}>
                    <a href="#" style={{
                      color: '#8b6f47',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#3d2817'}
                    onMouseOut={(e) => e.target.style.color = '#8b6f47'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#3d2817',
                marginBottom: '15px',
                fontFamily: '"Crimson Pro", serif'
              }}>
                Support
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((link) => (
                  <li key={link} style={{ marginBottom: '10px' }}>
                    <a href="#" style={{
                      color: '#8b6f47',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#3d2817'}
                    onMouseOut={(e) => e.target.style.color = '#8b6f47'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#3d2817',
                marginBottom: '15px',
                fontFamily: '"Crimson Pro", serif'
              }}>
                Connect
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#5c4033',
                marginBottom: '10px'
              }}>
                info@memorybank.com
              </p>
              <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                  <a key={social} href="#" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(139, 111, 71, 0.2)',
                    border: '2px solid #8b6f47',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8b6f47',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#8b6f47';
                    e.currentTarget.style.color = '#f5deb3';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 111, 71, 0.2)';
                    e.currentTarget.style.color = '#8b6f47';
                  }}
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div style={{
            textAlign: 'center',
            paddingTop: '30px',
            borderTop: '1px solid #d4a574',
            color: '#8b6f47',
            fontSize: '14px'
          }}>
            © 2026 Memory Bank. All rights reserved. Made with ❤️ for your memories.
          </div>
        </footer>
      </div>
    </div>

    {/* Add Memory Modal */}
    <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Memory" width="700px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Title Input */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#3d2817' }}>
            Memory Title *
          </label>
          <input
            type="text"
            value={newMemory.title}
            onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
            placeholder="e.g., Beach Sunset, Birthday Party"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #8b6f47',
              fontSize: '16px',
              fontFamily: '"Quicksand", sans-serif',
              background: 'rgba(255, 255, 255, 0.8)'
            }}
          />
        </div>

        {/* Date Input */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#3d2817' }}>
            Date *
          </label>
          <input
            type="date"
            value={newMemory.date}
            onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #8b6f47',
              fontSize: '16px',
              fontFamily: '"Quicksand", sans-serif',
              background: 'rgba(255, 255, 255, 0.8)'
            }}
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#3d2817' }}>
            Description
          </label>
          <textarea
            value={newMemory.description}
            onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
            placeholder="Tell the story of this memory..."
            rows="4"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #8b6f47',
              fontSize: '16px',
              fontFamily: '"Quicksand", sans-serif',
              background: 'rgba(255, 255, 255, 0.8)',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Main Image Upload */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#3d2817' }}>
            Main Photo *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, false)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #8b6f47',
              fontSize: '14px',
              fontFamily: '"Quicksand", sans-serif',
              background: 'rgba(255, 255, 255, 0.8)'
            }}
          />
          {newMemory.imagePreview && (
            <img
              src={newMemory.imagePreview}
              alt="Preview"
              style={{
                marginTop: '15px',
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '3px solid #8b6f47'
              }}
            />
          )}
        </div>

        {/* Additional Snippets */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#3d2817' }}>
            Additional Photos (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, true)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #8b6f47',
              fontSize: '14px',
              fontFamily: '"Quicksand", sans-serif',
              background: 'rgba(255, 255, 255, 0.8)'
            }}
          />
          {newMemory.snippets.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
              {newMemory.snippets.map((snippet, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <img
                    src={snippet.image}
                    alt={`Snippet ${idx + 1}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '2px solid #8b6f47'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Caption"
                    value={snippet.caption}
                    onChange={(e) => {
                      const updatedSnippets = [...newMemory.snippets];
                      updatedSnippets[idx].caption = e.target.value;
                      setNewMemory({ ...newMemory, snippets: updatedSnippets });
                    }}
                    style={{
                      width: '100px',
                      marginTop: '5px',
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid #8b6f47',
                      fontSize: '12px'
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitMemory}
          style={{
            padding: '15px',
            background: 'linear-gradient(135deg, #d4a574, #c19a6b)',
            border: '2px solid #8b6f47',
            borderRadius: '8px',
            color: '#3d2817',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            fontFamily: '"Quicksand", sans-serif'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
          }}
        >
          Save Memory
        </button>
      </div>
    </Modal>

    {/* Profile Modal */}
    <Modal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} title="My Profile" width="800px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* User Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '20px',
          background: 'rgba(139, 111, 71, 0.1)',
          borderRadius: '12px',
          border: '2px solid #8b6f47'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4a574, #c19a6b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            color: '#3d2817',
            fontWeight: '600',
            border: '3px solid #8b6f47'
          }}>
            JD
          </div>
          <div>
            <h3 style={{ fontSize: '24px', color: '#3d2817', marginBottom: '5px', fontFamily: '"Crimson Pro", serif' }}>
              John Doe
            </h3>
            <p style={{ color: '#8b6f47', fontSize: '14px' }}>john.doe@memorybank.com</p>
            <p style={{ color: '#5c4033', fontSize: '14px', marginTop: '5px' }}>
              Member since January 2024
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          {[
            { label: 'Total Memories', value: memoryList.length },
            { label: 'Favorites', value: memoryList.filter(m => m.favorite).length },
            { label: 'This Year', value: memoryList.filter(m => new Date(m.date).getFullYear() === 2024).length }
          ].map((stat, idx) => (
            <div key={idx} style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '12px',
              border: '2px solid #8b6f47',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '600', color: '#3d2817', marginBottom: '5px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '14px', color: '#8b6f47' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Memory Calendar (simplified) */}
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#3d2817', marginBottom: '15px' }}>
            Memory Activity
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '8px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            border: '2px solid #8b6f47'
          }}>
            {[...Array(52)].map((_, i) => {
              const hasMemory = Math.random() > 0.7;
              return (
                <div key={i} style={{
                  width: '100%',
                  paddingTop: '100%',
                  background: hasMemory ? '#8b6f47' : 'rgba(139, 111, 71, 0.2)',
                  borderRadius: '3px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  if (hasMemory) e.currentTarget.style.background = '#3d2817';
                }}
                onMouseOut={(e) => {
                  if (hasMemory) e.currentTarget.style.background = '#8b6f47';
                }}
                />
              );
            })}
          </div>
          <p style={{ fontSize: '12px', color: '#8b6f47', marginTop: '10px', textAlign: 'center' }}>
            Darker squares = more memories that week
          </p>
        </div>

        {/* Places Visited */}
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#3d2817', marginBottom: '15px' }}>
            Places Visited ✓
          </h4>
          <div style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            border: '2px solid #8b6f47'
          }}>
            {['Paris, France', 'Tokyo, Japan', 'New York, USA', 'Bali, Indonesia', 'Rome, Italy'].map((place) => (
              <div key={place} style={{
                padding: '12px',
                marginBottom: '10px',
                background: 'rgba(139, 111, 71, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#3d2817'
              }}>
                <span style={{ color: '#8b6f47', fontSize: '18px' }}>✓</span>
                {place}
              </div>
            ))}
          </div>
        </div>

        {/* Bucket List */}
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#3d2817', marginBottom: '15px' }}>
            Places to Visit 📍
          </h4>
          <div style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            border: '2px solid #8b6f47'
          }}>
            {['Santorini, Greece', 'Machu Picchu, Peru', 'Iceland', 'Maldives', 'Switzerland'].map((place) => (
              <div key={place} style={{
                padding: '12px',
                marginBottom: '10px',
                background: 'rgba(139, 111, 71, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#5c4033'
              }}>
                <span style={{ color: '#d4a574', fontSize: '18px' }}>◯</span>
                {place}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>

    {/* Settings Modal */}
    <Modal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} title="Settings" width="600px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {/* Account Settings */}
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#3d2817', marginBottom: '15px' }}>
            Account Settings
          </h4>
          <div style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            border: '2px solid #8b6f47',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#3d2817', fontWeight: '500' }}>Email Notifications</span>
              <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '30px' }}>
                <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: '#8b6f47',
                  transition: '0.4s',
                  borderRadius: '30px'
                }} />
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#3d2817', fontWeight: '500' }}>Private Profile</span>
              <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '30px' }}>
                <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(139, 111, 71, 0.3)',
                  transition: '0.4s',
                  borderRadius: '30px'
                }} />
              </label>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#3d2817', marginBottom: '15px' }}>
            Display Settings
          </h4>
          <div style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            border: '2px solid #8b6f47',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#3d2817', fontWeight: '500' }}>
                Memories per page
              </label>
              <select style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '2px solid #8b6f47',
                background: 'rgba(255, 255, 255, 0.8)',
                fontSize: '16px',
                color: '#3d2817'
              }}>
                <option>6</option>
                <option>9</option>
                <option>12</option>
                <option>18</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#3d2817', fontWeight: '500' }}>
                Default Sort
              </label>
              <select style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '2px solid #8b6f47',
                background: 'rgba(255, 255, 255, 0.8)',
                fontSize: '16px',
                color: '#3d2817'
              }}>
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Favorites</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy & Data */}
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#3d2817', marginBottom: '15px' }}>
            Privacy & Data
          </h4>
          <div style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            border: '2px solid #8b6f47',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <button style={{
              padding: '12px',
              background: 'transparent',
              border: '2px solid #8b6f47',
              borderRadius: '8px',
              color: '#3d2817',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(139, 111, 71, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Download My Data
            </button>
            <button style={{
              padding: '12px',
              background: 'transparent',
              border: '2px solid #8b4513',
              borderRadius: '8px',
              color: '#8b4513',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(139, 69, 19, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </Modal>
    </>
  );
};

export default MemoryBank;

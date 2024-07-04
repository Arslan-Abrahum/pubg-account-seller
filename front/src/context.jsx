import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [selectedCard, setSelectedCard] = useState(
    JSON.parse(localStorage.getItem('selectedCard')) || null
  );
  const [editMode, setEditMode] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [PostId, setPostId] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCard', JSON.stringify(selectedCard));
  }, [selectedCard]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const form = e.target;
    const formData = new FormData(form);
    const newCard = {
      image: imageDataUrl,
      accountTitle: formData.get('accountTitle'),
      accountNumber: formData.get('accountNumber'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    const res = await axios.post('http://localhost:5000/api/posts', newCard, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setPosts([...posts, res.data]);
    toggleModal();
  };

  const viewDetails = (id, card) => {
    setSelectedCard(card);
    setPostId(id);
    setEditMode(false);
  };

  const closeDetails = () => {
    setSelectedCard(null);
    setEditMode(false);
    setPostId('');
  };

  const deletePost = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/posts/${PostId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(posts.filter((post) => post._id !== PostId));
      setSelectedCard(null);
      setPostId('');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  const handleInp = (e) => {
    const { name, value } = e.target;
    setSelectedCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.put(`http://localhost:5000/api/posts/${PostId}`, selectedCard, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(posts.map((post) => (post._id === PostId ? res.data : post)));
        setEditMode(false);
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
};

const toggleDropdown = () => {
  setIsOpen(!isOpen);
};

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        posts,
        selectedCard,
        editMode,
        passwordVisible,
        isOpen,
        setIsOpen,
        setLoading,
        setSelectedCard,
        toggleModal,
        toggleDropdown,
        handleImageUpload,
        handleAddAccount,
        viewDetails,
        closeDetails,
        handleInp,
        handleEditSave,
        deletePost,
        togglePasswordVisibility
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

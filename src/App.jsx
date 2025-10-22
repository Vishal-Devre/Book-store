// src/App.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Sample Data
const sampleBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    status: "Available",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    category: "Fiction",
    pages: 304,
    rating: 4.2
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 27.99,
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    status: "For Sale",
    description: "Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    category: "Self-Help",
    pages: 320,
    rating: 4.8
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 29.99,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    status: "Available",
    description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian.",
    category: "Science Fiction",
    pages: 476,
    rating: 4.6
  },
  {
    id: 4,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 26.99,
    coverImage: "https://images.unsplash.com/photo-1554757380-2fb69b9b2c8e?w=400&h=600&fit=crop",
    status: "For Sale",
    description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas.",
    category: "Thriller",
    pages: 325,
    rating: 4.5
  }
]

// Contexts
const ThemeContext = createContext()
const CartContext = createContext()

// Header Component
const Header = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext)
  const { getCartCount } = useContext(CartContext)

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              BookStore
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/add-book" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Add Book
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Cart Icon */}
            <div className="relative">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-gentle">
                    {getCartCount()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// Book Card Component
const BookCard = ({ book }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(book)
  }

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in">
      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          book.status === 'Available' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {book.status}
        </span>
      </div>

      {/* Book Cover */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {book.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          Author: <span className="font-medium">{book.author}</span>
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${book.price}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
        </div>

        {/* View Details Link */}
        <Link
          to={`/book/${book.id}`}
          className="block text-center mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}

// Home Page Component
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('title')

  const categories = ['All', ...new Set(sampleBooks.map(book => book.category))]

  const filteredBooks = sampleBooks
    .filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(book => selectedCategory === 'All' || book.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating - a.rating
        case 'title':
        default: return a.title.localeCompare(b.title)
      }
    })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-slide-in">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Discover Your Next
          <span className="text-blue-600 dark:text-blue-400"> Favorite Book</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore our curated collection of books across all genres. Find your next adventure today!
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Books
            </label>
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            >
              <option value="title">Title A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book, index) => (
          <div 
            key={book.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No books found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}

// Book Details Page Component
const BookDetails = () => {
  const { id } = window.location.pathname.split('/').pop()
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()
  
  const book = sampleBooks.find(b => b.id === parseInt(id))

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Book Not Found
        </h2>
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(book)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            to="/" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
          >
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-400">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
          {/* Book Cover */}
          <div className="flex justify-center">
            <div className="relative group">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full max-w-md rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300"
              />
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  book.status === 'Available' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {book.status}
                </span>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                by <span className="font-semibold">{book.author}</span>
              </p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.floor(book.rating))}
                  {'☆'.repeat(5 - Math.floor(book.rating))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {book.rating}/5.0
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ${book.price}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                <p className="font-medium text-gray-800 dark:text-white">{book.category}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Pages</span>
                <p className="font-medium text-gray-800 dark:text-white">{book.pages}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Add to Cart
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add Book Page Component
const AddBook = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    coverImage: '',
    status: 'Available',
    description: '',
    category: '',
    pages: '',
    rating: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('New book data:', formData)
    alert('Book added successfully!')
    navigate('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-slide-in">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Add New Book
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fill in the details to add a new book to our collection
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder="Enter book title"
              />
            </div>

            {/* Author */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Author *
              </label>
              <input
                type="text"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder="Enter author name"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder="0.00"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <select
                name="status"
                required
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              >
                <option value="Available">Available</option>
                <option value="For Sale">For Sale</option>
              </select>
            </div>

            {/* Cover Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image URL *
              </label>
              <input
                type="url"
                name="coverImage"
                required
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
                placeholder="Enter book description"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [cart, setCart] = useState([])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark))
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  const addToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...book, quantity: 1 }]
    })
  }

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const themeValue = { isDark, toggleTheme }
  const cartValue = { addToCart, getCartCount }

  return (
    <ThemeContext.Provider value={themeValue}>
      <CartContext.Provider value={cartValue}>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/add-book" element={<AddBook />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
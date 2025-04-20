/**
 * Main JavaScript file for Launchbid
 * This file contains functionality that is common across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeNavigation();
    initializeCards();
    initializeTooltips();
    initializeCountdowns();
    initializeDatabaseMessages();
    
    // Check if user is logged in
    checkUserAuthentication();
  });
  
  /**
   * Navigation functionality
   */
  function initializeNavigation() {
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html') ||
          (currentPage !== 'index.html' && linkHref !== 'index.html' && currentPage.includes(linkHref.split('.')[0]))) {
        link.classList.add('text-black', 'font-medium');
        link.classList.remove('opacity-70');
      }
    });
    
    // Mobile menu toggle functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  }
  
  /**
   * Card hover effects
   */
  function initializeCards() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('shadow-lg');
        card.style.transform = 'translateY(-4px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('shadow-lg');
        card.style.transform = 'translateY(0)';
      });
    });
  }
  
  /**
   * Initialize tooltips
   */
  function initializeTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', (e) => {
        const tooltipText = trigger.getAttribute('data-tooltip');
        
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip', 'absolute', 'bg-black', 'text-white', 'text-xs', 'rounded', 'py-1', 'px-2', 'z-50');
        tooltip.style.bottom = '100%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
        tooltip.textContent = tooltipText;
        
        trigger.style.position = 'relative';
        trigger.appendChild(tooltip);
      });
      
      trigger.addEventListener('mouseleave', () => {
        const tooltip = trigger.querySelector('.tooltip');
        if (tooltip) {
          tooltip.remove();
        }
      });
    });
  }
  
  /**
   * Initialize countdown timers
   */
  function initializeCountdowns() {
    const countdowns = document.querySelectorAll('[data-countdown]');
    
    countdowns.forEach(countdown => {
      const targetTime = new Date(countdown.getAttribute('data-countdown')).getTime();
      
      const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        if (distance <= 0) {
          countdown.textContent = 'Ended';
          return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (days > 0) {
          countdown.textContent = `${days}d ${hours}h ${minutes}m`;
        } else {
          countdown.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
      };
      
      updateCountdown();
      setInterval(updateCountdown, 1000);
    });
  }
  
  /**
   * Check user authentication
   */
  function checkUserAuthentication() {
    // This is a placeholder for actual authentication logic
    // In a real application, you would check if the user has a valid session
    const isLoggedIn = localStorage.getItem('user') !== null;
    
    const authElements = document.querySelectorAll('[data-auth-required]');
    const nonAuthElements = document.querySelectorAll('[data-non-auth]');
    
    if (isLoggedIn) {
      // Show elements that require authentication
      authElements.forEach(el => {
        el.classList.remove('hidden');
      });
      
      // Hide elements for non-authenticated users
      nonAuthElements.forEach(el => {
        el.classList.add('hidden');
      });
      
      // Update user-specific UI
      const userData = JSON.parse(localStorage.getItem('user'));
      const userNameElements = document.querySelectorAll('.user-name');
      userNameElements.forEach(el => {
        el.textContent = userData.name;
      });
    } else {
      // Hide elements that require authentication
      authElements.forEach(el => {
        el.classList.add('hidden');
      });
      
      // Show elements for non-authenticated users
      nonAuthElements.forEach(el => {
        el.classList.remove('hidden');
      });
    }
  }
  
  /**
   * Format currency function
   * @param {number} amount - The amount to format
   * @param {string} currency - Currency code (default: USD)
   * @returns {string} - Formatted currency string
   */
  function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }
  
  /**
   * Format percentage function
   * @param {number} value - The value to format as percentage
   * @param {number} decimals - Number of decimal places
   * @returns {string} - Formatted percentage string
   */
  function formatPercentage(value, decimals = 2) {
    return `${value.toFixed(decimals)}%`;
  }
  
  /**
   * Show notification function
   * @param {string} message - The notification message
   * @param {string} type - The notification type (success, error, info)
   */
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.classList.add(
      'fixed', 'top-4', 'right-4', 'px-4', 'py-2', 'rounded',
      'shadow-lg', 'z-50', 'flex', 'items-center'
    );
    
    let bgColor = 'bg-blue-500';
    let icon = 'info';
    
    if (type === 'success') {
      bgColor = 'bg-green-500';
      icon = 'check_circle';
    } else if (type === 'error') {
      bgColor = 'bg-red-500';
      icon = 'error';
    }
    
    notification.classList.add(bgColor, 'text-white');
    
    notification.innerHTML = `
      <i class="material-icons mr-2">${icon}</i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  /**
   * Initialize Database Messages functionality
   */
  function initializeDatabaseMessages() {
    // Only initialize if we're on a page with the message components
    const messageContainer = document.getElementById('messageContainer');
    const senderInput = document.getElementById('senderInput');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const connectionStatus = document.getElementById('connectionStatus');
    
    if (!messageContainer || !senderInput || !messageInput || !sendButton) {
      return; // Not on a page with database messaging
    }
    
    // Initialize Socket.io connection for real-time updates
    const socket = io();
    
    // Handle socket connection events
    socket.on('connect', () => {
      updateConnectionStatus(true);
      fetchMessages();
    });
    
    socket.on('disconnect', () => {
      updateConnectionStatus(false);
    });
    
    // Listen for new messages
    socket.on('newMessage', (message) => {
      addMessageToUI(message);
    });
    
    // Add click event for send button
    sendButton.addEventListener('click', () => {
      sendMessage();
    });
    
    // Allow pressing Enter to send message
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Function to send a message
    function sendMessage() {
      const sender = senderInput.value.trim();
      const message = messageInput.value.trim();
      
      if (!sender) {
        showNotification('Please enter your name', 'error');
        return;
      }
      
      if (!message) {
        showNotification('Please enter a message', 'error');
        return;
      }
      
      // Send message to server
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sender, message })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          messageInput.value = ''; // Clear message input
          showNotification('Message sent', 'success');
        } else {
          showNotification('Error: ' + data.error, 'error');
        }
      })
      .catch(error => {
        showNotification('Error sending message: ' + error, 'error');
      });
    }
    
    // Function to fetch messages from the server
    function fetchMessages() {
      messageContainer.innerHTML = '<div class="text-center text-gray-500 py-4">Loading messages...</div>';
      
      fetch('/api/messages')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            messageContainer.innerHTML = '';
            
            if (data.messages.length === 0) {
              messageContainer.innerHTML = '<div class="text-center text-gray-500 py-4">No messages yet. Be the first to send one!</div>';
              return;
            }
            
            // Add messages to UI
            data.messages.forEach(message => {
              addMessageToUI(message);
            });
          } else {
            messageContainer.innerHTML = '<div class="text-center text-red-500 py-4">Error loading messages</div>';
          }
        })
        .catch(error => {
          messageContainer.innerHTML = '<div class="text-center text-red-500 py-4">Error connecting to server</div>';
        });
    }
    
    // Function to add a message to the UI
    function addMessageToUI(message) {
      // Create message element
      const messageElement = document.createElement('div');
      messageElement.className = 'bg-white p-3 rounded-lg mb-2 shadow-sm border border-gray-100';
      
      // Format the timestamp
      const date = new Date(message.created_at);
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedDate = date.toLocaleDateString();
      
      // Set the message content
      messageElement.innerHTML = `
        <div class="flex justify-between">
          <span class="font-medium text-primary">${escapeHTML(message.sender)}</span>
          <span class="text-xs text-gray-500">${formattedDate} ${formattedTime}</span>
        </div>
        <p class="text-black mt-1">${escapeHTML(message.message)}</p>
      `;
      
      // Add the message to the container (at the beginning for newest first)
      messageContainer.insertBefore(messageElement, messageContainer.firstChild);
    }
    
    // Update connection status indicator
    function updateConnectionStatus(connected) {
      if (connected) {
        connectionStatus.innerHTML = '<span class="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span> Connected';
        connectionStatus.classList.remove('text-red-500');
        connectionStatus.classList.add('text-primary');
      } else {
        connectionStatus.innerHTML = '<span class="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span> Disconnected';
        connectionStatus.classList.remove('text-primary');
        connectionStatus.classList.add('text-red-500');
      }
    }
    
    // Helper function to escape HTML to prevent XSS
    function escapeHTML(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }
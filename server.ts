import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
// Import dependencies
import { Pool } from 'pg';

// Load environment variables (if using dotenv for local dev)
require('dotenv').config(); 

// Initialize database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Required for Render's PostgreSQL:
  ssl: { 
    rejectUnauthorized: false 
  }
});

// Test the connection (add this to your startup code)
async function testConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
}
testConnection();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { origin: '*' },
  // Add reconnection settings to improve reliability
  connectionStateRecovery: {
    maxDisconnectionDuration: 30000
  }
});
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Serve static files from the React app in production
// In development, React app is served by webpack-dev-server on a different port
app.use(express.static(path.join(__dirname, 'public')));

// Serve React app for all routes except API routes
app.get('*', (req: Request, res: Response) => {
  // If it's an API request, let it pass through to the API routes
  if (req.path.startsWith('/api')) {
    return;
  }
  
  // Otherwise serve the React app
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// In-memory auction state
interface AuctionState {
  currentBid: number;
  bidCount: number;
  timeRemaining: number;
  lastBidder: string | null;
  isActive: boolean;
}

// For now, just track a single auction - could be expanded to multiple auctions
const auction: AuctionState = {
  currentBid: 5.00, // initial bid in USDT
  bidCount: 1,
  timeRemaining: 20, // universal timer in seconds
  lastBidder: null,
  isActive: true
};

// Universal timer logic on the server
const timerInterval = setInterval(() => {
  if (!auction.isActive) {
    clearInterval(timerInterval);
    return;
  }

  if (auction.timeRemaining <= 0) {
    auction.timeRemaining = 10
    // auction.isActive = false;
    // clearInterval(timerInterval);
    // io.emit('auctionEnded', { 
    //   winner: auction.lastBidder || "No bids"
    // });
    // console.log(`Auction ended. Winner: ${auction.lastBidder || "No bids"}`);

  } else {
    auction.timeRemaining--;
    io.emit('timerUpdate', { timeRemaining: auction.timeRemaining });
  }
}, 1000);

// When a new bid is placed, add extra time
function addExtraTime(seconds: number): void {
  if (auction.isActive) {
    auction.timeRemaining += seconds;
    console.log(`Added ${seconds}s to timer. New time remaining: ${auction.timeRemaining}s`);
  }
}

const placeBidHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if auction is still active
    if (!auction.isActive) {
      res.status(400).json({ 
        success: false, 
        error: 'Auction has ended' 
      });
      return;
    }

    const { bidderWallet, txHash } = req.body;
    
    // Validate required fields
    if (!bidderWallet || !txHash) {
      res.status(400).json({ 
        success: false, 
        error: 'Missing required bid data' 
      });
      return;
    }
    
    const increment = 0.01; // Fixed increment in USDT
    auction.currentBid += increment;
    auction.bidCount++;
    auction.lastBidder = bidderWallet;
    
    // Add extra time when a bid is placed
    addExtraTime(5);
    
    // Broadcast new bid data
    io.emit('newBid', { 
      newBidPrice: auction.currentBid, 
      txHash, 
      bidderWallet, 
      bidCount: auction.bidCount 
    });
    
    console.log(`New bid: $${auction.currentBid.toFixed(2)} by ${bidderWallet}`);
    
    res.json({ 
      success: true, 
      newBidPrice: auction.currentBid, 
      txHash, 
      bidCount: auction.bidCount 
    });
  } catch (error: any) {
    console.error('Error processing bid:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || String(error) 
    });
  }
};

// Handle bid placement via API
app.post('/api/placeBid', placeBidHandler);

// Authentication middleware
const authenticateJWT: RequestHandler = (req: any, res: Response, next: any) => {
  // For development purposes, we'll allow all requests without authentication
  // In production, you should implement proper JWT authentication
  next();
};

// Get all auctions
app.get('/api/auctions', async (req: Request, res: Response) => {
  try {
    // For now, just return the single auction we have in memory
    // In a real app, you would query the database
    const auctionResponse = {
      id: 1,
      title: 'Echo Smart Speaker Pro',
      description: 'A smart speaker with voice control and premium sound',
      imageUrl: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'TECH',
      retailPrice: 199.00,
      currentBid: auction.currentBid,
      bidCount: auction.bidCount,
      timeRemaining: auction.timeRemaining,
      lastBidder: auction.lastBidder,
      isActive: auction.isActive
    };
    
    res.json({ 
      success: true, 
      auctions: [auctionResponse]
    });
  } catch (error: any) {
    console.error('Error fetching auctions:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || String(error) 
    });
  }
});

// ADMIN API ENDPOINTS
// Create a new auction
app.post('/api/admin/auctions', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { title, description, startingPrice, retailPrice, category, timeRemaining, imageUrl } = req.body;
    
    if (!title || !startingPrice || !retailPrice) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required auction data' 
      });
    }
    
    // Log the data (in a real app, you would save to database)
    console.log('Creating new auction:', { 
      title, description, startingPrice, retailPrice, category, timeRemaining, imageUrl 
    });
    
    // Create a mock auction response
    const newAuction = {
      id: Math.floor(Math.random() * 1000) + 2, // Random ID (not 1, which is our in-memory auction)
      title,
      description,
      imageUrl,
      category,
      retailPrice,
      currentBid: startingPrice,
      bidCount: 0,
      timeRemaining,
      lastBidder: null,
      isActive: true
    };
    
    res.json({ 
      success: true, 
      auction: newAuction
    });
  } catch (error: any) {
    console.error('Error creating auction:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || String(error) 
    });
  }
});

// Delete an auction
app.delete('/api/admin/auctions/:id', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    // Log the delete request (in a real app, you would delete from database)
    console.log(`Deleting auction with ID: ${id}`);
    
    // Simulate successful deletion
    res.json({ 
      success: true, 
      message: `Auction ${id} deleted successfully`
    });
  } catch (error: any) {
    console.error('Error deleting auction:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || String(error) 
    });
  }
});

// When a new client connects, send them the current auction state
io.on('connection', (socket) => {
  console.log('Client connected');
  
  // Send current auction state to newly connected client
  socket.emit('timerUpdate', { timeRemaining: auction.timeRemaining });
  
  // If auction has already ended, send that info too
  if (!auction.isActive) {
    socket.emit('auctionEnded', { 
      winner: auction.lastBidder || "No bids" 
    });
  }
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Error handling for the Express server
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Server shutting down');
  io.close();
  server.close();
  process.exit(0);
});

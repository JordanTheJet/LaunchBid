const connectBtn = document.getElementById("connectBtn");
const walletAddress = document.getElementById("walletAddress");

connectBtn.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request access to MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const address = await signer.getAddress();
      walletAddress.textContent = `Connected: ${address}`;
      
      // Shorten address for display
      const shortenedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
      walletAddress.textContent = `Connected: ${shortenedAddress}`;
      
      // Update button text
      connectBtn.textContent = "Connected";
      connectBtn.classList.remove("bg-primary");
      connectBtn.classList.add("bg-green-500");
    } catch (err) {
      console.error("User rejected connection:", err);
      walletAddress.textContent = "Connection failed";
    }
  } else {
    alert("MetaMask is not installed. Please install it to use this dApp!");
  }
});

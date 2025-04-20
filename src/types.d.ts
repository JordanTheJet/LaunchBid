// Type declarations for global window object
interface Window {
  ethereum: any;
  currentWallet: string | null;
}

// Type declarations for ethers.js
declare module 'ethers' {
  export namespace providers {
    class Web3Provider {
      constructor(provider: any);
      getSigner(): any;
    }
  }
  
  export namespace utils {
    function parseEther(value: string): any;
  }
}

import Web3 from "web3";
import BigInt from "big-int";

import constants from "./constants.json";
import { useState } from "react";

function App() {
  const [address, setAddress] = useState(constants.sender);
  const [info, setInfo] = useState("");

  const busdAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
  // const holderAddress = "0x8894e0a0c962cb723c1976a4421c95949be2d4e3";

  // just the `balanceOf()` is sufficient in this case
  const abiJson = [
    {
      constant: true,
      inputs: [{ name: "who", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  const web3 = new Web3("https://bsc-dataseed1.binance.org:443"); // This is Binance Smart Chain's mainnet URL.

  const contract = new web3.eth.Contract(abiJson, busdAddress);

  const getBalance = () => {
    console.log("contract", contract);
    try {
      contract.methods
        .balanceOf(address)
        .call()
        .then((balance) => {
          const bigNumber = BigInt(balance);
          const actualValue = Number(bigNumber) / 10 ** 18;

          setInfo(`balance of ${address} : $${actualValue}`);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <h1>Bep20</h1>
      <input
        className="form-control"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></input>
      <br />
      <p style={{ color: "red" }}>{info}</p>
      <br />
      <button className="btn btn-success" onClick={getBalance}>
        Get Balance
      </button>
    </div>
  );
}

export default App;

import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';

const ENS_REVERSE_REGISTRAR_ADDRESS = '0x084b1c3C81545d370f3634392De611CaaBFf8148';
const ENS_REVERSE_REGISTRAR_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "setName",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "node",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  }
];

export const useENSReverseRegistrar = () => {
  const { config } = usePrepareContractWrite({
    address: ENS_REVERSE_REGISTRAR_ADDRESS,
    abi: ENS_REVERSE_REGISTRAR_ABI,
    functionName: 'setName',
  });

  const { write: setName, isLoading, isError, error } = useContractWrite(config);

  const { data: node } = useContractRead({
    address: ENS_REVERSE_REGISTRAR_ADDRESS,
    abi: ENS_REVERSE_REGISTRAR_ABI,
    functionName: 'node',
  });

  return {
    setName,
    isLoading,
    isError,
    error,
    node
  };
}; 
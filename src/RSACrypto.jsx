import { useState } from 'react'

const RSACrypto = () => {
  const p = 53 // Bilangan prima pertama
  const q = 61 // Bilangan prima kedua
  const e = 17 // public key
  const d = 2753 // private key

  const [plaintext, setPlaintext] = useState('')
  const [ciphertext, setCiphertext] = useState('')
  const [decryptertext, setDecryptertext] = useState('')

  const gcd = (a, b) => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const modInverse = (a, m) => {
    a = ((a % m) + m) % m
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x
      }
    }
    return 1
  }

  const modPow = (base, exponent, modulus) => {
    if (modulus === 1) return 0
    let result = 1
    base = base % modulus
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus
      }
      exponent = Math.floor(exponent / 2)
      base = (base * base) % modulus
    }
    return result
  }

  const handleEncrypt = () => {
    const n = p * q
    const phi = (p - 1) * (q - 1)

    if (gcd(e, phi) !== 1) {
      alert('Public exponent (e) is not valid. Please choose another value.')
      return
    }

    const encrypted = plaintext.split('').map((char) => 
        modPow(char.charCodeAt(0), e, n)
      ).join(' ')
    
    setCiphertext(encrypted)
  }

  const handleDecrypt = () => {
    const n = p * q
    const phi = (p - 1) * (q - 1)
  
    console.log('publicKey: '+e+', '+n);
    const privateKey = modInverse(e, phi);
    console.log('privateKey: '+privateKey)
    const encryptedValues = ciphertext.split(' ')
  
    const decrypted = encryptedValues.map((block) => 
        String.fromCharCode(modPow(parseInt(block, 10), privateKey, n))
      ).join('')
  
    setDecryptertext(decrypted)
  }
  

  return (
    <div className="col-sm-6">
      <h2 className="mb-4">RSA Crypto App</h2>

      <div className="row mb-3">
        <div className="col">
          <label>Prime Number (p):</label>
          <div className="form-control">{p}</div>
        </div>

        <div className="col">
          <label>Prime Number (q):</label>
          <div className="form-control">{q}</div>
        </div>
        
        <div className="col">
          <label>Public Key:</label>
          <div className="form-control">{e}</div>
        </div>

        <div className="col">
          <label>Private Key:</label>
          <div className="form-control">{d}</div>
        </div>
      </div>

      <div className="mb-3">
        <label>Plaintext:</label>
        <input type="text" className="form-control" value={plaintext} onChange={(e) => setPlaintext(e.target.value)} />
      </div>

      <button className="btn btn-primary" onClick={handleEncrypt}>
        Encrypt
      </button>

      <div className="mt-3 mb-3">
        <label>Chipertext:</label>
        <input type="text" className="form-control" value={ciphertext} onChange={(e) => setCiphertext(e.target.value)} />
      </div>

      <button className="btn btn-primary" onClick={handleDecrypt}>
        Decrypt
      </button>

      <div className="mt-3">
        <label>Decrypted Text:</label>
        <div className="form-control">{decryptertext}</div>
      </div>
    </div>
  )
}

export default RSACrypto

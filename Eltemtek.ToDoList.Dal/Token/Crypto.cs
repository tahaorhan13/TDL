using System;
using System.Security.Cryptography;

namespace Eltemtek.ToDoList.Dal.Account
{
    /// <summary>
    /// Şifreleme işlevleirni yapar
    /// </summary>
    public class Crypto
    {
        #region Globals

        TripleDESCryptoServiceProvider TripleDes = new TripleDESCryptoServiceProvider();
        public static string secretKey = "645F89134BA24DEFAT6F252B985CAD7E";

        #endregion

        #region Constructor

        /// <summary>
        /// Şifreleme işlevleirni yapar
        /// </summary>
        /// <param name="key"></param>
        public Crypto(string key)
        {
            if (key.isEmpty())
                key = secretKey;

            TripleDes.Key = TruncateHash(key, TripleDes.KeySize / 8);
            TripleDes.IV = TruncateHash("", TripleDes.BlockSize / 8);
        }

        /// <summary>
        /// Şifreleme işlevleirni yapar
        /// </summary>
        public Crypto()
            : this(null)
        {
            //
        }

        #endregion

        #region Functions

        /// <summary>
        /// Anahtar kırpma işlemini yapar
        /// </summary>
        /// <param name="key">Şifre anahtarı</param>
        /// <param name="len">Uzunluk</param>
        /// <returns>Kırpılmış veri dizisini döndürür</returns>
        private byte[] TruncateHash(string key, int len)
        {
            SHA1CryptoServiceProvider sha1 = new SHA1CryptoServiceProvider();
            byte[] keyBytes = System.Text.Encoding.Unicode.GetBytes(key);
            byte[] hash = sha1.ComputeHash(keyBytes);
            Array.Resize(ref hash, len);

            return hash;
        }

        /// <summary>
        /// Şifreleme işlemini yapar
        /// </summary>
        /// <param name="val">Şifrelenecek metin</param>
        /// <returns>Şifrelenmiş metni döndürür</returns>
        public string Encrypt(string val)
        {
            try
            {
                byte[] plaintextBytes = System.Text.Encoding.Unicode.GetBytes(val);

                System.IO.MemoryStream ms = new System.IO.MemoryStream();

                CryptoStream encStream = new CryptoStream(ms, TripleDes.CreateEncryptor(), System.Security.Cryptography.CryptoStreamMode.Write);
                encStream.Write(plaintextBytes, 0, plaintextBytes.Length);
                encStream.FlushFinalBlock();

                return Convert.ToBase64String(ms.ToArray());
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Şifre çözme işlemini yapar
        /// </summary>
        /// <param name="val">Şifrelenmiş metin</param>
        /// <returns>Şifresi çözülmüş metni döndürür</returns>
        public string Decrypt(string val)
        {
            try
            {
                byte[] encryptedBytes = Convert.FromBase64String(val);
                System.IO.MemoryStream ms = new System.IO.MemoryStream();

                CryptoStream decStream = new CryptoStream(ms, TripleDes.CreateDecryptor(), System.Security.Cryptography.CryptoStreamMode.Write);
                decStream.Write(encryptedBytes, 0, encryptedBytes.Length);
                decStream.FlushFinalBlock();

                return System.Text.Encoding.Unicode.GetString(ms.ToArray());
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Şifrelemeyi dener
        /// </summary>
        /// <param name="val">Şifrelenecek metin</param>
        /// <returns>Şifreleyebilirse şifrelenmiş metni, şifreleyemez ise şifrelenecek metni döndürür</returns>
        public string TryEncrypt(string val)
        {
            string result = Encrypt(val);

            return result.isEmpty() ? val : result;
        }

        /// <summary>
        /// Şifreyi çözmeyi dener
        /// </summary>
        /// <param name="val">Şifrelenmiş metin</param>
        /// <returns>Şifresini çözebilirse çözülmüş metni, çözemez ise şifresi çözülecek metni döndürür</returns>
        public string TryDecrypt(string val)
        {
            string result = Decrypt(val);

            return result.isEmpty() ? val : result;
        }

        #endregion
    }
}

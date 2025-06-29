# Auth Rest Api
Bu proje, JWT tabanlı kullanıcı kimlik doğrulama sistemi sunan bir REST API'dir. Node.js, Express.js ve MySQL kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Kullanıcı Kaydı**: Yeni kullanıcı hesabı oluşturma
- **Kullanıcı Girişi**: JWT token ile güvenli giriş
- **Şifre Şifreleme**: bcryptjs ile güvenli şifre hashleme
- **MySQL Veritabanı**: MySQL2 ile veritabanı bağlantısı
- **ES6 Modules**: Modern JavaScript modül sistemi
- **Environment Variables**: Güvenli yapılandırma yönetimi

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- MySQL Server
- npm

## 🛠️ Kurulum

1. **Projeyi klonlayın:**

```bash
git clone https://github.com/your-username/auth.rest-api.git
cd auth-rest-api
```

2. **Bağımlılıkları yükleyin:**

```bash
npm install
```

3. **Çevre değişkenlerini ayarlayın:**
   `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key_here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=auth
```

4. **MySQL veritabanını hazırlayın:**

```sql
CREATE DATABASE library;
USE library;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    auth INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🏃‍♂️ Çalıştırma

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

## 📚 API Endpoints

### 1. Ana Sayfa

- **GET** `/`
- **Açıklama**: API'nin çalışıp çalışmadığını kontrol eder
- **Yanıt**:

```json
{
  "message": "Welcome to the API!"
}
```

### 2. Kullanıcı Kaydı

- **POST** `/auth/register`
- **Content-Type**: `application/json`
- **Body**:

```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

- **Başarılı Yanıt**:

```json
{
  "insertCmd": "...",
  "result": "...",
  "token": "jwt_token_here"
}
```

### 3. Kullanıcı Girişi

- **POST** `/auth/login`
- **Content-Type**: `application/json`
- **Body**:

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

- **Başarılı Yanıt**:

```json
{
  "message": "Data fetched successfully",
  "data": [...]
}
```

## 🔧 Proje Yapısı

```
auth.murselsen.com/
├── controllers/
│   └── authControllers.js    # Authentication işlemleri
├── models/
│   ├── db.js                # MySQL veritabanı bağlantısı
│   └── user.js              # User model sınıfı
├── index.js                 # Ana uygulama dosyası
├── package.json             # Proje bağımlılıkları
└── README.md                # Bu dosya
```

## 📦 Kullanılan Teknolojiler

- **Express.js** - Web framework
- **MySQL2** - MySQL veritabanı driver
- **bcryptjs** - Şifre şifreleme
- **jsonwebtoken** - JWT token işlemleri
- **nanoid** - Benzersiz ID üretimi
- **dotenv** - Environment variables yönetimi
- **nodemon** - Development için otomatik yeniden başlatma

## 🔐 Güvenlik Özellikleri

- Şifreler bcryptjs ile hashlenmiştir
- JWT tokenlar ile güvenli session yönetimi
- Environment variables ile hassas bilgilerin korunması
- SQL injection koruması (prepared statements)

## 🤝 Katkıda Bulunma

1. Bu projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

**Murselsen** - [GitHub](https://github.com/murselsen)

## 📞 İletişim

Proje ile ilgili sorularınız için issue açabilir veya e-posta gönderebilirsiniz.

## 🚧 Gelecek Özellikler

- [ ] Şifre sıfırlama işlevi
- [ ] E-posta doğrulama
- [ ] Kullanıcı profil yönetimi
- [ ] Rate limiting


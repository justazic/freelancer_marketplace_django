Freelance Marketplace (Django MVT)
Freelancerlar va mijozlar o'rtasida bog'lovchi platforma. Mijozlar loyiha joylaydi, freelancerlar taklif yuboradi va eng yaxshi taklif tanlanadi.

📋 Loyiha haqida
Bu platforma orqali:

Mijozlar: loyiha joylash, freelancer takliflarini ko'rish, freelancer tanlash va baho berish

Freelancerlar: ochiq loyihalarni ko'rish, taklif yuborish va tanlangan loyihalarni bajarish

🛠 Texnologiyalar
Python 3.10+

Django 4.2

PostgreSQL

HTML/CSS (Bootstrap 5)

Git

👥 Foydalanuvchi rollari
Client (Mijoz)
Loyiha yaratish

Takliflarni ko'rish

Freelancer tanlash

Baho berish

Freelancer
Loyihalarni ko'rish

Taklif yuborish

Bajarilayotgan loyihalar

📊 Ma'lumotlar modeli
User (Custom)
username, email, password

role (client/freelancer)

bio

created_at

Project
title, description, budget, deadline

status (open/in_progress/completed/cancelled)

client (ForeignKey)

Bid (Taklif)
project, freelancer

price, message

status (pending/accepted/rejected)

Contract
project, client, freelancer

agreed_price

status (active/finished/cancelled)

Review
contract

rating (1-5)

comment

🚀 Ishga tushirish
bash
# 1. Repositoryni clone qilish
git clone https://github.com/justazic/freelancer_marketplace_django.git
cd freelancer_marketplace_django

# 2. Virtual environment yaratish
python -m venv venv

# 3. Virtual environmentni faollashtirish
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 4. Kerakli kutubxonalarni o'rnatish
pip install -r requirements.txt

# 5. PostgreSQL da database yaratish
# PostgreSQL ga kiring:
sudo -u postgres psql
# Database yarating:
CREATE DATABASE freelance_db;
# Chiqish:
\q

# 6. Migratsiyalarni amalga oshirish
python manage.py makemigrations
python manage.py migrate

# 7. Superuser yaratish (agar kerak bo'lsa)
python manage.py createsuperuser

# 10. Serverni ishga tushirish
python manage.py runserver
Saytga o'ting: http://127.0.0.1:8000

🔐 Test foydalanuvchilar
Rol	Username	Parol
Client	client1	client123
Freelancer	freelancer1	freelancer123
📱 Asosiy sahifalar
/ - Bosh sahifa (barcha ochiq loyihalar)

/accounts/register/ - Ro'yxatdan o'tish

/accounts/login/ - Kirish

/projects/create/ - Loyiha yaratish (faqat client)

/projects/<id>/ - Loyiha detallari

/projects/<id>/bid/ - Taklif yuborish (faqat freelancer)

/dashboard/ - Shaxsiy kabinet

/contracts/ - Shartnomalar

/admin/ - Admin panel

👨‍💻 Rolga qarab imkoniyatlar
Client
Loyiha yaratish

O'z loyihalarini ko'rish

Loyihaga kelgan takliflarni ko'rish

Freelancerni tanlash

Tugagan loyihalarga baho berish

Freelancer
Barcha ochiq loyihalarni ko'rish

Loyihalarni qidirish (title bo'yicha) va filtrlash (budget bo'yicha)

Taklif yuborish

O'z takliflari va shartnomalarini ko'rish

🎯 Business logic
Taklif yuborish: Freelancer bitta loyihaga faqat bitta taklif yubora oladi

Freelancer tanlash: Client taklifni tanlaganda:

Tanlangan bid: accepted

Qolgan bidlar: rejected

Project status: in_progress

Contract yaratiladi: active

Loyiha tugatish: Client tugatganini belgilaganda:

Contract: finished

Project: completed

Review yozish imkoniyati

📁 Papkalar tuzilishi
text
freelance_marketplace/
├── manage.py
├── requirements.txt
├── .env.example
├── freelance/              # Asosiy loyiha
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── accounts/                # Foydalanuvchi moduli
│   ├── models.py
│   ├── views.py
│   └── ...
├── projects/                # Loyihalar
│   ├── models.py
│   ├── views.py
│   └── ...
├── bids/                    # Takliflar
├── contracts/               # Shartnomalar
├── reviews/                 # Baholar
├── templates/               # HTML shablonlar
│   ├── base.html
│   ├── accounts/
│   ├── projects/
│   └── ...
└── static/                  # CSS, JS fayllar


🔍 Qo'shimcha funksiyalar
Qidiruv: Loyihalarni title bo'yicha qidirish

Filter: Loyihalarni budget bo'yicha filtrlash

Pagination: Har bir sahifada 6 ta loyiha

Dashboard: Foydalanuvchi roliga qarab mos ma'lumotlar

🧪 Test qilish
Client sifatida kirish:

Username: client1

Password: client123

Yangi loyiha yaratish

Loyihaga kelgan takliflarni ko'rish

Freelancerni tanlash

Freelancer sifatida kirish:

Username: freelancer1

Password: freelancer123

Ochiq loyihalarni ko'rish

Loyihaga taklif yuborish

Tanlangan loyihani ko'rish
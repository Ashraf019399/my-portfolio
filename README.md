# 🎨 Art of Design (AOD) Inspired Graphic Design Portfolio

একটি অত্যাধুনিক, রেসপন্সিভ এবং উচ্চমানের গ্রাফিক্স ডিজাইন ও কমার্শিয়াল ফটো ম্যানিপুলেশন পোর্টফোলিও ওয়েবসাইট। এটি সম্পূর্ণভাবে **Art of Design BD** (`artofdesignbd.com`)-এর স্টাইলিশ ডার্ক থিম, ভিজ্যুয়াল লজিক, ইন্টারঅ্যাক্টিভ বিফোর-আফটার স্লাইডার এবং প্রিমিয়াম লুক মাথায় রেখে তৈরি করা হয়েছে।

---

## 🌟 প্রধান ফিচারসমূহ (Key Features)

1. **Modern Cyberpunk / Studio Dark Theme**: ডিপ স্লিম ব্ল্যাক ব্যাকগ্রাউন্ড, গ্লাস মরফিজম (`backdrop-blur`), পার্পল ও সায়ান গ্লোয়িং এফেক্ট।
2. **Interactive Before / After Manipulation Slider**: মাউস অথবা মোবাইলে আঙুল দিয়ে ডানে-বামে ড্র্যাগ করে র-ছবি ও ফাইনাল আর্টওয়ার্কের পার্থক্য দেখানোর সুবিধা।
3. **Filterable Portfolio Showcase**: ক্যাটাগরি ফিল্টার (All, Photo Manipulation, Key Visuals, Branding, Social Ads) সহ লাইটবক্স প্রিভিউ এবং Behance ডিরেক্ট লিংক।
4. **Infinite Marquee Ticker**: আপনার ব্যবহৃত টুলস (Photoshop, Illustrator, Blender 3D, Figma) এবং দক্ষতার চলমান অ্যানিমেশন ব্যানার।
5. **Specialized Services Grid**: ৬টি প্রধান সার্ভিস (Key Visuals, Manipulation, Brand Identity, Packaging, High-CTR Ads, Retouching) এর বিস্তারিত।
6. **Animated Counter Stats**: সফল প্রজেক্ট (500+), ক্লায়েন্ট স্যাটিস্ফ্যাকশন (99%), এবং অভিজ্ঞতার অ্যানিমেশন কাউন্টার।
7. **Transparent Pricing Packages**: ক্লায়েন্টদের জন্য স্পষ্ট প্যাকেজ রেট (Essential, Commercial KV, Full Branding)।
8. **Client Testimonials / Social Proof**: রিয়েলিস্টিক ক্লায়েন্ট রিভিউ কার্ড।
9. **Instant WhatsApp Integration**: যেকোনো ভিজিটর সরাসরি ১-ক্লিকে হোয়াটসঅ্যাপে আপনার সাথে কানেক্ট হতে পারবে।
10. **100% Mobile & Tablet Responsive**: যেকোনো মোবাইল, ল্যাপটপ এবং বড় স্ক্রিনে নিখুঁত ডিসপ্লে।

---

## 🚀 কীভাবে ওয়েবসাইটটি এখন রান করবেন? (How to Run Locally)

### পদ্ধতি ১: সাধারণ ডাবল ক্লিক
১. ফাইল ম্যানেজারে যান: `C:\Users\user\.gemini\antigravity\scratch\graphic-design-portfolio`
২. `index.html` ফাইলটির উপর ডাবল ক্লিক করুন। আপনার পছন্দের যেকোনো ব্রাউজারে (Chrome, Edge, Brave) সাইটটি সাথে সাথে ওপেন হয়ে যাবে!

### পদ্ধতি ২: লাইভ সার্ভার (Node.js দিয়ে)
টার্মিনালে এই কমান্ডটি চালান:
```bash
cd "C:\Users\user\.gemini\antigravity\scratch\graphic-design-portfolio"
npx serve .
```
এরপর ব্রাউজারে `http://localhost:3000` এ যান।

---

## 🛠️ নিজের তথ্য দিয়ে কাস্টমাইজ করার নিয়ম (Customization Guide)

### ১. নিজের নাম ও লোগো পরিবর্তন
`index.html` ফাইলে খুঁজুন `ASIF.GFX` এবং আপনার নিজের নাম বা ব্র্যান্ডের নাম বসিয়ে দিন।

### ২. হোয়াটসঅ্যাপ নম্বর পরিবর্তন
`index.html` এবং `script.js` ফাইলে যেখানে `8801700000000` আছে, সেখানে আপনার আসল বাংলাদেশি হোয়াটসঅ্যাপ নম্বর (যেমন: `88017XXXXXXXX` বা `88018XXXXXXXX`) দিন।

### ৩. আপনার পোর্টফোলিও ইমেজ ও বিহ্যান্স লিংক বসানো
`index.html`-এর `<div id="portfolioGrid">` অংশে:
- `<img src="...">`: আপনার ডিজাইন করা আর্টওয়ার্কের ছবি বসান (আপনি আপনার নিজস্ব ইমেজ `assets` ফোল্ডারে রেখে লিঙ্ক করতে পারেন, যেমন: `assets/my-kv-1.jpg`)।
- `data-behance="..."`: আপনার Behance প্রজেক্ট লিংক দিন।
- `data-title="..."`: প্রজেক্টের নাম পরিবর্তন করুন।

### ৪. প্রাইসিং প্যাকেজ পরিবর্তন
`#pricing` সেকশনে গিয়ে আপনি আপনার ইচ্ছা অনুযায়ী টাকার পরিমাণ (যেমন: ৳৫,০০০ বা \$50) পরিবর্তন করতে পারবেন।

---

## 🌐 ফ্রিতে ইন্টারনেটে লাইভ করার নিয়ম (Free Hosting Guide)

আপনার এই ওয়েবসাইটটি সম্পূর্ণ স্ট্যাটিক (HTML/CSS/JS), তাই আপনি আজীবনের জন্য কোনো খরচ ছাড়া এটি লাইভ রাখতে পারবেন:

### অপশন ১: Netlify Drop (সবচেয়ে সহজ - ১ মিনিট সময় লাগবে)
1. ব্রাউজারে [app.netlify.com/drop](https://app.netlify.com/drop) ওপেন করুন।
2. আপনার `graphic-design-portfolio` ফোল্ডারটি মাউস দিয়ে টেনে এনে ড্রপ করুন।
3. সাথে সাথে আপনার ওয়েবসাইটটি লাইভ হয়ে একটি ফ্রি লিংক পেয়ে যাবেন (যেমন: `yourname-portfolio.netlify.app`)।

### অপশন ২: Vercel
1. [vercel.com](https://vercel.com)-এ ফ্রি একাউন্ট খুলুন।
2. গিটহাব রিপোজিটরি অথবা ডিরেক্ট ফোল্ডার আপলোড করে এক ক্লিকে ডিপ্লয় করুন।

### অপশন ৩: GitHub Pages
1. GitHub-এ একটি নতুন রিপোজিটরি খুলুন (যেমন: `portfolio`)।
2. এই ফোল্ডারের ফাইলগুলো পুশ করুন।
3. Settings > Pages এ গিয়ে মেইন ব্রাঞ্চ সিলেক্ট করে সেভ করুন। আপনার সাইট `yourusername.github.io/portfolio` লিংকে লাইভ হয়ে যাবে।

---

## 📁 ফাইল স্ট্রাকচার (File Structure)

```
graphic-design-portfolio/
│
├── index.html        # প্রধান স্ট্রাকচার এবং সমস্ত সেকশন
├── styles.css        # গ্লাস-মরফিজম, স্লাইডার এবং কালার প্যালেট
├── script.js         # বিফোর-আফটার ড্র্যাগিং, লাইটবক্স ও ফিল্টারিং কোড
├── assets/           # আপনার নিজস্ব ছবি ও লোগো রাখার ফোল্ডার
└── README.md         # গাইড ও নির্দেশিকা
```

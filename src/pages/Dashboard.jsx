// import React, { useState, useEffect } from 'react';
// import { MessageCircle } from 'lucide-react';

// const Dashboard = () => {
//   const [motivationalText, setMotivationalText] = useState('');

//   const motivationalTexts = [
//     "Success is not final, failure is not fatal: It is the courage to continue that counts. 🚀",
//     "The only limit to our realization of tomorrow is our doubts of today. 💪",
//     "Believe you can and you're halfway there. ✨",
//     "It does not matter how slowly you go as long as you do not stop. 🏆",
//     "The future belongs to those who believe in the beauty of their dreams. 🌟"
//   ];

//   useEffect(() => {
//     const randomIndex = Math.floor(Math.random() * motivationalTexts.length);
//     setMotivationalText(motivationalTexts[randomIndex]);
//   }, []);

//   return (
//     <div className="relative md:pt-0 pt-16 flex items-center justify-center h-full">
//       <div className="text-center p-8 max-w-4xl">
//         <h1 className="text-3xl font-bold mb-4">Welcome to Durub Alriyada</h1>
//         <p className="text-xl mb-6">{motivationalText}</p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//           <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//             <h2 className="font-bold text-lg mb-2">Explore Prompts</h2>
//             <p className="text-gray-600">Browse through our collection of ready-to-use prompts for various needs.</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//             <h2 className="font-bold text-lg mb-2">GPT Assistants</h2>
//             <p className="text-gray-600">Get help from specialized AI assistants designed for specific tasks.</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//             <h2 className="font-bold text-lg mb-2">Premium Features</h2>
//             <p className="text-gray-600">Unlock additional features with our premium subscription plans.</p>
//           </div>
//         </div>
//       </div>
      
     
//     </div>
//   );
// };

// export default Dashboard;
"use client"

import { useState, useEffect } from "react"

const Dashboard = () => {
  const [motivationalText, setMotivationalText] = useState("")

  const motivationalTexts = [
    "النجاح ليس نهائيًا، والفشل ليس قاتلًا: إنها الشجاعة للاستمرار هي ما يهم. 🚀",
    "الحد الوحيد لتحقيق غدنا هو شكوكنا اليوم. 💪",
    "آمن بأنك تستطيع وستكون قد قطعت نصف الطريق. ✨",
    "لا يهم مدى بطء تقدمك طالما أنك لا تتوقف. 🏆",
    "المستقبل ينتمي لأولئك الذين يؤمنون بجمال أحلامهم. 🌟",
  ]

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalTexts.length)
    setMotivationalText(motivationalTexts[randomIndex])
  }, [])

  return (
    <div className="relative md:pt-0 pt-16 flex items-center justify-center h-full" dir="rtl">
      <div className="text-center p-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">مرحبًا بك في دروب الرياضة</h1>
        <p className="text-xl mb-6">{motivationalText}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="font-bold text-lg mb-2">استكشف الإرشادات</h2>
            <p className="text-gray-600">تصفح مجموعتنا من الإرشادات الجاهزة للاستخدام لمختلف الاحتياجات.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="font-bold text-lg mb-2">مساعدي الذكاء الاصطناعي</h2>
            <p className="text-gray-600">احصل على مساعدة من مساعدي الذكاء الاصطناعي المتخصصين المصممين لمهام محددة.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="font-bold text-lg mb-2">الميزات المميزة</h2>
            <p className="text-gray-600">افتح المزيد من الميزات الإضافية مع خطط الاشتراك المميزة.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

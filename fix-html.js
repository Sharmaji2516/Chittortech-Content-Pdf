const fs = require('fs');

let html = fs.readFileSync('brochure-template.html', 'utf8');

// 1. Fix CSS for footer and page content
html = html.replace(/.page \{[\s\S]*?box-sizing: border-box;/m, `.page {\n            width: 210mm;\n            height: 297mm;\n            background: white;\n            margin: 0 auto;\n            position: relative;\n            overflow: hidden;\n            box-sizing: border-box;\n            display: flex;\n            flex-direction: column;`);

html = html.replace(/\.footer-bar \{[\s\S]*?font-size: 12px;\n        \}/m, `.footer-bar {\n            height: 50px;\n            background: #0f172a;\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            padding: 0 40px;\n            color: #94a3b8;\n            font-size: 12px;\n            flex-shrink: 0;\n            margin-top: auto;\n            width: 100%;\n        }`);

html = html.replace(/\.page-content \{[\s\S]*?flex-direction: column;\n        \}/m, `.page-content {\n            padding: 35px 40px;\n            flex-grow: 1;\n            display: flex;\n            flex-direction: column;\n            overflow: hidden;\n        }`);

// 2. Fix the logo on white pages (Page 2, 3, 4, 5, 7, 8, 9, 10)
html = html.replace(/<img src="\.\/chittortech_logo_1775884354186\.png" alt="Logo" class="h-8 grayscale opacity-50">/g, 
  `<div class="bg-slate-900 rounded-lg p-2"><img src="./chittortech_logo_1775884354186.png" alt="Logo" class="h-6"></div>`);

// Also fix Page 2 which has a slightly different logo tag
html = html.replace(/<img src="\.\/chittortech_logo_1775884354186\.png" alt="ChittorTech Logo" class="h-12 opacity-80 grayscale">/g,
  `<div class="bg-slate-900 rounded-xl p-3"><img src="./chittortech_logo_1775884354186.png" alt="ChittorTech Logo" class="h-8"></div>`);

// 3. Fix Cover Page Logo and Add iStart Badge
html = html.replace(/<img src="\.\/chittortech_logo_1775884354186\.png" alt="ChittorTech Logo" class="h-32 mb-8 bg-white\/10 p-4 rounded-2xl backdrop-blur-sm">/,
  `<img src="./chittortech_logo_1775884354186.png" alt="ChittorTech Logo" class="h-32 mb-6">\n            <div class="mb-10 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 via-white/20 to-green-500/20 border border-white/30 backdrop-blur-md px-5 py-2 rounded-full text-white font-semibold text-sm shadow-xl">\n                <span>🚀 iStart Approved Startup (Rajasthan Government)</span>\n            </div>`);

// 4. Redesign Last Page (Page 11)
const lastPageRegex = /<!-- PAGE 11: CONTACT US \(FINAL\) -->[\s\S]*?<\/html>/;
const newLastPage = `<!-- PAGE 11: CONTACT US (FINAL) -->
    <div class="page bg-slate-900 text-white flex flex-col relative overflow-hidden">
        <!-- Modern abstract background -->
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/40 to-slate-900 z-0"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 z-0"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20 -ml-20 -mb-20 z-0"></div>
        
        <div class="relative z-10 flex flex-col justify-center items-center h-full px-12 text-center">
            
            <img src="./chittortech_logo_1775884354186.png" alt="Logo" class="h-24 mb-6 drop-shadow-2xl">
            
            <h2 class="text-6xl font-bold mb-4 tracking-tight leading-tight">
                LET'S BUILD SOMETHING <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">GREAT</span> TOGETHER.
            </h2>
            
            <p class="text-xl text-blue-200 mb-12 font-light">Your vision, our technology.</p>

            <!-- Contact Cards -->
            <div class="grid grid-cols-2 gap-6 w-full max-w-3xl mb-12">
                <div class="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition">
                    <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl mb-4 border border-blue-500/30">📍</div>
                    <h4 class="text-lg font-bold text-white mb-2">Visit Our Office</h4>
                    <p class="text-sm text-slate-300">Chittorgarh, Rajasthan – 312001</p>
                </div>
                
                <div class="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition">
                    <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-2xl mb-4 border border-green-500/30">💬</div>
                    <h4 class="text-lg font-bold text-white mb-2">Call / WhatsApp</h4>
                    <p class="text-sm text-slate-300">+91 7597451057</p>
                </div>

                <div class="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition col-span-2">
                    <div class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-2xl mb-4 border border-purple-500/30">✉️</div>
                    <h4 class="text-lg font-bold text-white mb-2">Email Us</h4>
                    <div class="flex gap-6 justify-center w-full mt-2">
                        <p class="text-sm text-slate-300"><strong class="text-white">Business:</strong> business@chittortech.online</p>
                        <p class="text-sm text-slate-300"><strong class="text-white">General:</strong> contact@chittortech.online</p>
                    </div>
                </div>
            </div>

            <div class="mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xl py-5 px-12 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.4)] cursor-pointer tracking-wide uppercase transform hover:scale-105 transition">
                GET A FREE PROJECT ESTIMATE
            </div>
            
            <div class="absolute bottom-8 font-medium text-slate-400 tracking-widest text-sm uppercase">
                AI • Web • Mobile • SaaS • Software • Digital Growth
            </div>
        </div>
    </div>

</body>
</html>`;

html = html.replace(lastPageRegex, newLastPage);

// 5. Shrink Page 3 & Page 4 pricing cards slightly more to ensure they never overlap
html = html.replace(/<div class="pricing-card flex flex-col !p-4">/g, '<div class="pricing-card flex flex-col !p-3">');
html = html.replace(/<div class="pricing-card flex flex-col pricing-card-highlight relative overflow-hidden !p-4">/g, '<div class="pricing-card flex flex-col pricing-card-highlight relative overflow-hidden !p-3">');
html = html.replace(/<div class="pricing-card flex flex-col col-span-2 !p-4">/g, '<div class="pricing-card flex flex-col col-span-2 !p-3">');
html = html.replace(/<div class="pricing-card flex flex-col col-span-2 bg-slate-900 text-white border-none relative overflow-hidden !p-4">/g, '<div class="pricing-card flex flex-col col-span-2 bg-slate-900 text-white border-none relative overflow-hidden !p-3">');
html = html.replace(/<div class="pricing-card flex flex-col pricing-card-highlight !p-4">/g, '<div class="pricing-card flex flex-col pricing-card-highlight !p-3">');

// Also adjust font sizes inside the cards to make them more compact
html = html.replace(/<h3 class="text-lg font-bold/g, '<h3 class="text-base font-bold');
html = html.replace(/<div class="text-2xl font-bold/g, '<div class="text-xl font-bold');
html = html.replace(/<div class="font-bold text-base/g, '<div class="font-bold text-sm');

fs.writeFileSync('brochure-template.html', html);
console.log('HTML fixed successfully!');

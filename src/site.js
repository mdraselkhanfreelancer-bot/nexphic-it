// Nexphic IT Institute: site settings, course data, page logic
(function () {
  'use strict';

  // Edit these settings to update the single-file website's contact details.
  const SITE = {
    logo: 'https://cdn.prod.website-files.com/6a047b7b8f6206b58cebd272/6a047bebd2e3540d406212e2_Nexphic%202-p-800.png',
    phone: '+8801845629227',
    whatsapp: 'https://wa.me/8801845629227',
    messenger: 'https://m.me/nexphicit',
    // Optional: paste your Google Apps Script Web App URL (ends with /exec) to save every admission
    // to a Google Sheet automatically. Setup steps are in the embedded file "admission-google-sheet.gs".
    admissionEndpoint: '',
    facebook: 'https://www.facebook.com/nexphicit'
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const photo = (id, width = 800) => 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&q=80&w=' + width;
  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const icon = (name, className = '') => '<svg class="icon ' + className + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  const put = (id, markup) => { document.getElementById(id).innerHTML = markup; };
  const pexels = id => 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200';
  const admissionURL = course => '#/admission?form=1' + (course ? '&course=' + encodeURIComponent(course) : '');
  const whatsappURL = text => SITE.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');

  const images = {
    editing: photo('1574717024653-61fd2cf4d44d'),
    design: photo('1626785774573-4b799315345d'),
    youtube: photo('1611162616475-46b635cb6868'),
    studio: photo('1598488035139-bdbb2231ce04'),
    graphics: photo('1561070791-2526d30994b5')
  };
  const avatars = [
    '1500648767791-00dcc994a43e', '1438761681033-6461ffad8d80',
    '1507003211169-0a1dd7228f2d', '1544005313-94ddf0286df2',
    '1506794778202-cad84cf45f1d', '1534528741775-53994a69daeb',
    '1519085360753-af0119f7cbe7', '1573496359142-b8d87734a5a2'
  ].map(id => photo(id, 180));

  // Course list: edit names, devices, classes, durations, and fees here. Every course section reads this list.
  const courses = [
    { name: 'Video Editing With Content Creation', device: 'PC', classes: 24, duration: '3 Months', fee: '3,999', off: 65, icon: 'film', summary: 'Video Editing-এর সাথে Content Planning ও Creation শিখে নিজের ও Client-এর জন্য আকর্ষণীয় কনটেন্ট তৈরি করুন।' },
    { name: 'Video Editing With Freelancing', device: 'PC', classes: 16, duration: '2 Months', fee: '999', off: 90, icon: 'scissors', summary: 'Professional Video Editing শিখে Freelancing Marketplace-এ কাজ শুরু করার পূর্ণ প্রস্তুতি নিন।' },
    { name: 'YouTube AI Automation', device: 'PC', classes: 16, duration: '2 Months', fee: '799', off: 90, icon: 'youtube', summary: 'AI Tools ব্যবহার করে YouTube Channel-এর কাজ সহজ ও Automated করার কৌশল শিখুন।' },
    { name: 'Graphic Design With Freelancing', device: 'PC', classes: 24, duration: '3 Months', fee: '3,999', off: 65, icon: 'pen', summary: 'Graphic Design-এর মৌলিক থেকে Professional কাজ, সাথে Freelancing Marketplace-এর গাইডলাইন।' },
    { name: 'Freelancing Master Course', device: 'PC', classes: 16, duration: '2 Months', fee: '1,499', off: 85, icon: 'briefcase', summary: 'Marketplace Profile, Client Communication ও কাজ পাওয়ার কৌশল নিয়ে পূর্ণাঙ্গ Freelancing প্রশিক্ষণ।' },
    { name: 'Web Development With AI', device: 'PC', classes: 16, duration: '2 Months', fee: '3,999', off: 85, icon: 'code', summary: 'AI Tools-এর সহায়তায় Website তৈরির বাস্তব ধারণা ও কাজের পদ্ধতি শিখুন।' },
    { name: 'Mobile Video Editing', device: 'Mobile', classes: 16, duration: '2 Months', fee: '699', off: 85, icon: 'smartphone', summary: 'শুধু Smartphone দিয়েই আকর্ষণীয় ও Professional মানের Video Editing শিখুন।' },
    { name: 'AI With Content Creation', device: 'Mobile', classes: 16, duration: '2 Months', fee: '999', off: 90, icon: 'spark', summary: 'Smartphone ও AI Tools ব্যবহার করে নিয়মিত আকর্ষণীয় Content তৈরি করুন।' }
  ];
  const courseImages = {
    'Video Editing With Content Creation': './assets/course-video-editing-content-creation.jpg',
    'Video Editing With Freelancing': './assets/course-video-editing-freelancing.jpg',
    'YouTube AI Automation': './assets/course-youtube-ai-automation.jpg',
    'Graphic Design With Freelancing': './assets/course-graphic-design-freelancing.jpg',
    'Freelancing Master Course': './assets/course-freelancing-master.jpg',
    'Web Development With AI': './assets/course-web-development-ai.jpg',
    'Mobile Video Editing': './assets/course-mobile-video-editing.jpg',
    'AI With Content Creation': './assets/course-ai-content-creation.jpg'
  };
  const registrationOptions = courses.map(course => course.name);
  const findCourse = name => courses.find(course => course.name === name);
  const courseFee = course => '৳' + course.fee + '/-';
  const deviceIcon = course => course.device === 'Mobile' ? 'smartphone' : 'monitor';
  const details = [
    { name: 'Video Editing With Content Creation', description: 'Video Editing-এর মৌলিক ধারণা থেকে শুরু করে Content Planning, Shooting ও Editing পর্যন্ত, নিজের ও Client-এর জন্য আকর্ষণীয় Content তৈরি করা শিখুন।', learn: ['Video Editing-এর মৌলিক ধারণা', 'Content Planning ও Script', 'Cutting, Transition ও Effects', 'Color ও Audio উন্নত করা', 'Social Media-র জন্য Content', 'Export ও Publishing'] },
    { name: 'YouTube AI Automation', description: 'AI Tools ব্যবহার করে YouTube Channel-এর Content Idea, Script, Voice ও Visual তৈরি এবং কাজের ধাপগুলো Automated করার কৌশল শিখুন।', learn: ['YouTube Channel Setup', 'AI দিয়ে Content Idea ও Script', 'AI Voice ও Visual তৈরি', 'Thumbnail ও YouTube SEO', 'Workflow Automation', 'Channel Growth-এর কৌশল'] },
    { name: 'Graphic Design With Freelancing', description: 'Design-এর মৌলিক নীতি থেকে Logo, Branding ও Social Media Design, সাথে Freelancing Marketplace-এ কাজ শুরু করার গাইডলাইন।', learn: ['Design-এর মৌলিক নীতি', 'Logo ও Brand Identity', 'Social Media Post ও Banner', 'Typography ও Color', 'Portfolio তৈরি', 'Freelancing Marketplace গাইডলাইন'] }
  ];
  const features = [
    ['monitor', 'Expert Live Class', 'Industry Expert দের সাথে Real-time Live Class, প্রতিটি ক্লাসে সরাসরি Feedback ও Q&A সেশন।'],
    ['award', 'Recognized Certificate', 'কোর্স শেষে Verified Certificate, যা Marketplace ও Local Job উভয় জায়গায় গ্রহণযোগ্য।'],
    ['briefcase', 'Job & Marketplace Support', 'Fiverr, Upwork Profile তৈরি থেকে শুরু করে Client Hunting পর্যন্ত সম্পূর্ণ Guideline।'],
    ['headphones', 'Lifetime Mentorship', 'কোর্স শেষ হলেও Support শেষ নয়। আজীবন Mentor Support ও Private Community Access।'],
    ['target', 'Real Client Project', 'শেখার সময়ই Real Project এ কাজ, Portfolio তৈরি হবে কোর্স চলাকালীনই।'],
    ['video', 'Class Recording', 'প্রতিটি Live Class এর Recording, যেকোনো সময় আবার দেখে নিতে পারবেন।']
  ];
  const homeFAQs = [
    ['কোর্স করতে কি আগে থেকে কোনো অভিজ্ঞতা লাগবে?', 'না। আমাদের প্রতিটি কোর্স একদম Zero Level থেকে শুরু হয়। PC কোর্সের জন্য একটি Computer/Laptop, Mobile কোর্সের জন্য একটি Smartphone, আর শেখার ইচ্ছা থাকলেই যথেষ্ট।'],
    ['প্রতিটি কোর্সে কতগুলো Class হয়?', 'কোর্সভেদে ১৬ থেকে ২৪টি Class হয়। যেমন Video Editing With Content Creation কোর্সে ৩ মাসে ২৪টি Class। ভর্তি নিশ্চিত হওয়ার পর Class Group-এ ক্লাসের সময়সূচি জানানো হয়।'],
    ['কোর্স শেষে কি Certificate দেওয়া হয়?', 'হ্যাঁ, Final Project জমা দেওয়ার পর Verified Digital ও Printed Certificate দেওয়া হয়।'],
    ['কীভাবে ভর্তি হবো এবং Student ID পাবো?', 'ওয়েবসাইটের Admission পেইজে ভর্তি ফর্মটি পূরণ করে জমা দিন। জমা দেওয়ার সাথে সাথেই আপনার ইউনিক Student ID ও Admission Slip তৈরি হবে, যা প্রিন্ট বা PDF হিসেবে সংরক্ষণ করতে পারবেন।'],
    ['Payment কিভাবে করতে পারি?', 'নির্ধারিত Course Fee বিকাশ, নগদ অথবা রকেটের মাধ্যমে দিতে পারবেন। পেমেন্টের আগে আমাদের Admission Team-এর কাছ থেকে সঠিক Fee ও Payment Number নিশ্চিত করুন। এরপর Student ID সহ Payment Screenshot আমাদের Page/Messenger-এ পাঠান। যাচাই শেষে আপনার Admission Confirm করা হবে।'],
    ['কোর্স শেষে ইনকামের গ্যারান্টি আছে কি?', 'আমরা Income Guarantee দিই না। Marketplace Support, Client Hunting Guideline ও Lifetime Mentorship দিয়ে আপনাকে প্রস্তুত করি। আপনার ফলাফল দক্ষতা, অনুশীলন এবং কাজের সুযোগের ওপর নির্ভর করে।']
  ];
  const courseFAQs = [
    ['কোর্সের সমস্যা হলে কীভাবে সাহায্য পাবো?', 'প্রতিটি Student এর জন্য Dedicated Mentor Support আছে। WhatsApp Group ও Live Q&A Session এ সরাসরি প্রশ্ন করতে পারবেন।'],
    ['Enrollment এর পর কী কী পাবো?', 'ভর্তি ফর্ম জমা দিলেই সাথে সাথে Student ID ও Admission Slip পাবেন। এরপর নির্ধারিত Course Fee প্রদান করে Student ID সহ Payment Screenshot আমাদের Page/Messenger-এ পাঠান। Payment যাচাই হলে Admission Confirm হবে এবং সংশ্লিষ্ট Class Group-এ যুক্ত হয়ে ক্লাসের সময়সূচি ও প্রয়োজনীয় নির্দেশনা পাবেন।'],
    ['মোবাইল দিয়ে কি কোর্স করা যাবে?', 'হ্যাঁ। Mobile Video Editing এবং AI With Content Creation কোর্স দুটি সম্পূর্ণ Smartphone দিয়েই করা যায়। বাকি ৬টি PC কোর্সের জন্য Computer বা Laptop প্রয়োজন।'],
    ['Certificate কীভাবে পাবো?', 'কোর্স শেষে Final Project জমা দিলে Verification এর মাধ্যমে Digital ও Printed Certificate পাঠানো হয়।']
  ];
  const reviews = [
    { name: 'Tanvir Hasan', role: 'Video Editor / Fiverr', image: avatars[4], quote: 'Nexphic এর Video Editing কোর্স আমার ক্যারিয়ার পুরোপুরি বদলে দিয়েছে। কোর্স শেষ হওয়ার ২ মাসের মধ্যেই Fiverr এ প্রথম $500 ইনকাম করি।' },
    { name: 'Sumaiya Akter', role: 'Graphic Designer / Upwork', image: avatars[3], quote: 'Mentor রা এত যত্ন নিয়ে শেখান যে না বুঝে থাকার উপায় নেই। Live Class আর Lifetime Support, এটাই Nexphic এর সবচেয়ে বড় শক্তি।' },
    { name: 'Rakibul Islam', role: 'YouTuber / 120K Subs', image: avatars[2], quote: 'YouTube AI Automation কোর্সটা করে নিজের Channel Monetize করেছি। এখন প্রতি মাসে AdSense থেকে নিয়মিত আয় আসছে, আলহামদুলিল্লাহ।' },
    { name: 'Mst. Nusrat Jahan', role: 'Thumbnail Designer', image: avatars[5], quote: 'আমি একজন হাউজওয়াইফ, ঘরে বসেই শিখে এখন মাসে ৩০ হাজার টাকা আয় করছি। Nexphic টিমের কাছে কৃতজ্ঞ।' }
  ];
  // Team: add a photo URL to replace an initials avatar.
  const team = [
    { name: 'Md. Samir Hossen', role: 'Managing Director', photo: 'https://scontent.fjsr11-1.fna.fbcdn.net/v/t39.30808-6/792192164_122173614572679812_7146521441304352251_n.jpg?stp=dst-jpg_tt6&cstp=mx1086x1086&ctp=s1086x1086&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGw1qum6zuG_urolXvW72YQULkBJ4blpWlQuQEnhuWladRaChi9a4A9G5u1KEf6stAQZk_ytpJ-WtG_zlF1zjXm&_nc_ohc=KzMUR-24WjUQ7kNvwHEePHD&_nc_oc=Adrd-NGaUC6To828tBCBq7HogXoiGwHHDlzmt217qX2YYj98VAkxuBR6m1czwrKeD80&_nc_zt=23&_nc_ht=scontent.fjsr11-1.fna&_nc_gid=GuVG_CttHCO80n6jfzo34w&_nc_ss=7b2a8&oh=00_AQPtAUSSq2vm5JZPRTgP3P_NGk3UC1UCsm9Ni-_eyfBmmA&oe=6ADAA44B', featured: true },
    { name: 'Muhammad Raj', role: 'HR & Accounts', photo: './assets/muhammad-raj.jpg' },
    { name: 'MD. Robiul Islam', role: 'DC', photo: 'https://cdn.prod.website-files.com/6a047b7b8f6206b58cebd272/6a99ea74cc14e4229035333b_Rob-p-500.png' },
    { name: 'MD. Shamim', role: 'CRO', photo: 'https://scontent.fjsr11-1.fna.fbcdn.net/v/t39.30808-6/839740051_122173520090805564_3117658480960593602_n.jpg?stp=dst-jpg_tt6&cstp=mx1312x1199&ctp=s1312x1199&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Yib5SMMjkKoQ7kNvwGGGDuN&_nc_oc=Adq2CQnezdHum70yNtvrQyP2y8vgKBzaqtGvIPj7qKI8kuVqLiw--TgpF54dg32iuO4&_nc_zt=23&_nc_ht=scontent.fjsr11-1.fna&_nc_gid=jhQ93YkxWVMLVxdsc_HRoA&_nc_ss=7b2a8&oh=00_AQMrDhDXXpoXKC5qPy9Nl7GorxB4NFQ6EXeKhhKdDZzu0A&oe=6ADAA27B' },
    { name: 'Miss Proma', role: 'CRO', photo: '' },
    { name: 'Miss Shiuli', role: 'CRO', photo: '' }
  ];
  const classPhotos = [
    ['Live video editing class', './assets/video-editing-class.jpg'],
    ['Learning with our mentor', './assets/instructor-guiding.jpg'],
    ['Interactive training session', './assets/training-session.jpg'],
    ['Modern Nexphic classroom', './assets/modern-classroom.jpg'],
    ['Seminar at Nexphic', './assets/workshop-seminar.jpg'],
    ['Team learning session', './assets/workshop-team.jpg'],
    ['One-on-one mentoring', './assets/mentoring-session.jpg']
  ];
  const studentWork = [
    ['YouTube Thumbnail', 'Thumbnail Design', photo('1611162617213-7d7a39e9b1d7')],
    ['Logo Design', 'Brand Identity', images.design],
    ['Video Editing', 'DaVinci Resolve', images.editing],
    ['Creative Post Design', 'Social Media', images.graphics],
    ['Premium Banner', 'Professional Banner', photo('1558655146-9f40138edfeb')],
    ['Channel Art', 'YouTube Design', images.youtube]
  ];
  const events = [
    ['Batch Completion Ceremony', './assets/workshop-seminar.jpg'],
    ['Certificate Distribution', './assets/hero-presentation.jpg'],
    ['Online Batch Launch', './assets/modern-classroom.jpg'],
    ['Workshop Day', './assets/workshop-team.jpg'],
    ['Students Meetup', './assets/training-session.jpg'],
    ['Team Moment', './assets/cro-room.jpg']
  ];
  const behindScenes = [
    ['Admission & counseling desk', './assets/cro-room-2.jpg'],
    ['Our CRO room', './assets/cro-room.jpg'],
    ['HR department', './assets/dc-room.jpg'],
    ['Inside the Nexphic classroom', './assets/video-editing-class.jpg']
  ];
  const successPhotos = [
    ['John Doe', '$1,215.58', photo('1551288049-bebda4e38f71')],
    ['Content Creator', '$3,520.10', photo('1460925895917-afdab827c52f')],
    ['Sirah Snas', '$2,150.00', avatars[2]],
    ['Sarah J.', '$1,875.00', photo('1551288049-bebda4e38f71')],
    ['Digital Marketer', '$4,310.25', photo('1460925895917-afdab827c52f')],
    ['Mike R.', '$5,005.00', photo('1498050108023-c5249f4df085')]
  ];
  // No unprovided video URL is invented. Preview buttons open details and a request link.
  const videos = [
    ['Class Preview', '3:45', photo('1492691527719-9d1e07e534b4')],
    ['Studio Tour', '2:30', photo('1478720568477-152d9b164e26')],
    ['Student Success Story', '5:12', avatars[2]],
    ['Video Editing Course Preview', '4:05', images.editing],
    ['Nexphic Institute Tour', '6:20', photo('1497366216548-37526070297c')],
    ['Free Class Preview', '1:58', photo('1505373877841-8d25f7d46678')]
  ];

  const mediaItems = [];
  function mediaButton(title, image, group, className = '', type = 'image', duration = '') {
    const id = mediaItems.push({ title, image, group, type }) - 1;
    return '<button type="button" class="photo-button ' + className + '" data-media="' + id + '" aria-label="' + escapeHTML((type === 'preview' ? 'View preview details: ' : 'View image: ') + title) + '">' +
      '<img src="' + escapeHTML(image) + '" alt="' + escapeHTML(title) + '" loading="lazy">' +
      (type === 'preview' ? '<span class="play-button" aria-hidden="true">' + icon('play') + '</span>' : '') +
      '<span class="caption">' + escapeHTML(title) + '</span>' +
      (duration ? '<span class="video-duration">' + escapeHTML(duration) + '</span>' : '') + '</button>';
  }
  function counterMarkup(iconName, value, label, sub = '') {
    const countMatch = String(value).match(/^(\d+)([+%]?)$/);
    const countAttrs = countMatch ? ' data-count="' + countMatch[1] + '" data-suffix="' + countMatch[2] + '"' : '';
    return '<div class="counter-box" role="group" aria-label="' + escapeHTML(value + ' ' + label) + '">' + icon(iconName, 'icon-lg lilac') +
      '<strong class="counter-value gradient-text" style="margin-top:10px"' + countAttrs + ' aria-hidden="true">' + escapeHTML(value) + '</strong><div class="counter-label" aria-hidden="true">' + escapeHTML(label) + '</div>' +
      (sub ? '<small style="display:block;color:var(--dim);font-size:.68rem;margin-top:4px">' + escapeHTML(sub) + '</small>' : '') + '</div>';
  }
  const checkList = list => '<ul class="check-list">' + list.map(text => '<li>' + icon('check') + '<span>' + escapeHTML(text) + '</span></li>').join('') + '</ul>';
  const chips = list => '<div class="chips">' + list.map(text => '<span class="chip">' + escapeHTML(text) + '</span>').join('') + '</div>';
  const faqMarkup = (items, openIndex = 0) => items.map((item, index) => '<details' + (index === openIndex ? ' open' : '') + '><summary class="bn">' + escapeHTML(item[0]) + '</summary><div class="answer">' + escapeHTML(item[1]) + '</div></details>').join('');

  function courseCardMarkup(course, index, catalogueCard) {
    return '<article class="panel hover-box course-card" ' + (catalogueCard ? 'data-course-category="' + course.device + '"' : 'data-home-course="' + index + '"') + '>' +
      '<div class="course-media">' + (courseImages[course.name] ? '<img src="' + courseImages[course.name] + '" width="1000" height="563" loading="lazy" alt="' + escapeHTML(course.name) + ' course banner">' : '<div class="course-icon" aria-hidden="true"><span class="glyph">' + icon(course.icon) + '</span></div>') + '<span class="device-badge">' + icon(deviceIcon(course), 'icon-sm') + course.device + ' Course</span></div>' +
      '<div class="course-body"><h3>' + escapeHTML(course.name) + '</h3><p class="bn">' + escapeHTML(course.summary) + '</p>' +
      '<div class="course-meta"><span class="chip">' + icon('book', 'icon-sm') + course.classes + ' Classes</span><span class="chip">' + icon('clock', 'icon-sm') + escapeHTML(course.duration) + '</span></div>' +
      '<div class="course-bottom"><div class="price-row"><span class="muted" style="font-size:.78rem">Course Fee<span class="off-badge">' + course.off + '% OFF</span></span><strong class="price">' + courseFee(course) + '</strong></div>' +
      (catalogueCard ? '<a class="btn full" href="' + escapeHTML(admissionURL(course.name)) + '">Enroll Now</a>' : '<a class="btn full" href="#/courses">Course Details ' + icon('arrow', 'icon-sm') + '</a>') +
      '</div></div></article>';
  }
  put('home-course-track', courses.map((course, index) => courseCardMarkup(course, index, false)).join(''));
  put('home-course-dots', courses.map((course, i) => '<button type="button" data-course-slide="' + i + '" aria-label="Show ' + escapeHTML(course.name) + '" aria-pressed="' + (i === 0) + '"></button>').join(''));
  put('home-features', features.map(feature => '<div class="panel hover-box feature-box"><span class="icon-box">' + icon(feature[0], 'icon-lg') + '</span><h3>' + escapeHTML(feature[1]) + '</h3><p>' + escapeHTML(feature[2]) + '</p></div>').join(''));
  put('earners', [
    ['Rakib Hasan', 'Video Editor', '$14,500+', 'Fiverr', '#22c55e', './assets/student-2.jpg'],
    ['Sumaiya Akter', 'Graphic Designer', '$21,000+', 'YouTube Partner', '#ef4444', './assets/student-1.jpg'],
    ['Tanvir Ahmed', 'Motion Designer', '$19,750+', 'Upwork', '#3b82f6', './assets/student-4.jpg']
  ].map(person => '<article class="panel hover-box earner" style="--accent:' + person[4] + '"><div class="browser-strip"><div class="browser-dots" aria-hidden="true"><i></i><i></i><i></i></div><div class="earnings-display"><small>TOTAL EARNINGS / ' + escapeHTML(person[3].toUpperCase()) + '</small><strong>' + escapeHTML(person[2]) + '</strong><div class="earnings-bars" aria-hidden="true">' + [35, 52, 44, 68, 60, 82, 74, 96].map((height, index) => '<i style="height:' + height + '%;' + (index > 5 ? 'background:' + person[4] : '') + '"></i>').join('') + '</div></div></div><div class="earner-profile"><img src="' + person[5] + '" width="64" height="64" loading="lazy" alt="' + escapeHTML(person[0]) + '"><strong>' + escapeHTML(person[0]) + '</strong><small>' + escapeHTML(person[1]) + '</small><p class="amount">' + escapeHTML(person[2]) + '</p><span class="chip">' + escapeHTML(person[3]) + '</span></div></article>').join(''));
  put('review-slides', reviews.map((review, i) => '<div data-review="' + i + '"' + (i ? ' hidden' : '') + '><p class="review-quote">&ldquo;' + escapeHTML(review.quote) + '&rdquo;</p><span class="stars" data-stars aria-label="5 stars"></span><img class="avatar" src="' + review.image + '" alt="' + escapeHTML(review.name) + '" loading="lazy" width="64" height="64"><strong>' + escapeHTML(review.name) + '</strong><small>' + escapeHTML(review.role) + '</small></div>').join(''));
  put('review-dots', reviews.map((review, i) => '<button type="button" data-review-slide="' + i + '" aria-label="Read review by ' + escapeHTML(review.name) + '" aria-pressed="' + (i === 0) + '"></button>').join(''));
  const initials = name => name.replace(/^(md|mr|mrs|miss)\.?\s+/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
  function teamCard(person, large) {
    const portrait = person.photo
      ? '<img src="' + escapeHTML(person.photo) + '" alt="' + escapeHTML(person.name) + '" loading="lazy">'
      : '<span class="team-initials" aria-hidden="true">' + escapeHTML(initials(person.name)) + '</span>';
    return '<article class="panel hover-box team-card' + (person.featured ? ' featured' : '') + (large ? ' large' : '') + '"><div class="team-photo">' + portrait + '</div><div class="team-info"><h3>' + escapeHTML(person.name) + '</h3><small>' + escapeHTML(person.role) + '</small></div></article>';
  }
  put('home-team-grid', team.map(person => teamCard(person, false)).join(''));
  put('about-team-grid', team.map(person => teamCard(person, false)).join(''));
  put('course-team-feature', teamCard(team.find(person => person.name === 'Muhammad Raj') || team[0], true));
  put('home-gallery-grid', classPhotos.slice(0, 6).map((item, index) => mediaButton(item[0], item[1], 'home-gallery', index === 0 || index === 5 ? 'wide' : '')).join(''));
  // One certificate image is shown on Home, About and Gallery. To use your own design,
  // replace assets/nexphic-certificate.jpg with your JPG (keep the same file name) and rebuild.
  const certificateImage = $('#certificate-image');
  const certificateFigure = certificateImage.closest('[data-certificate]');
  ['about-certificate', 'gallery-certificate'].forEach(id => {
    const copy = certificateFigure.cloneNode(true);
    $$('[id]', copy).forEach(element => element.removeAttribute('id'));
    document.getElementById(id).append(copy);
  });
  const certificateMedia = mediaItems.push({ title: 'Nexphic IT Institute Certificate of Completion', image: certificateImage.src, group: 'certificate', type: 'image', description: 'কোর্স সফলভাবে শেষ করলে প্রত্যেক শিক্ষার্থী এই Certificate পান।' }) - 1;
  $$('[data-certificate-open]').forEach(button => { button.dataset.media = String(certificateMedia); });
  put('home-faq', faqMarkup(homeFAQs));

  put('course-catalogue', courses.map((course, index) => courseCardMarkup(course, index, true)).join(''));
  $('#course-filter-result').textContent = courses.length + ' courses available';
  $$('[data-course-options]').forEach(select => select.insertAdjacentHTML('beforeend', courses.map(course => '<option>' + escapeHTML(course.name) + '</option>').join('')));
  put('footer-course-list', courses.map(course => '<li><a href="#/courses">' + escapeHTML(course.name) + '</a></li>').join(''));
  put('course-details', details.map(detail => {
    const course = findCourse(detail.name);
    const meta = [['clock', 'Duration', course.duration], ['book', 'Classes', course.classes + ' Classes'], [deviceIcon(course), 'Device', course.device], ['credit', 'Course Fee', courseFee(course)]];
    return '<section class="detail-course"><div class="container medium split"><div class="detail-visual">' + (courseImages[course.name] ? '<img class="detail-banner" src="' + courseImages[course.name] + '" width="1000" height="563" loading="lazy" alt="' + escapeHTML(course.name) + ' course banner">' : '<div class="course-icon detail-icon" role="img" aria-label="' + escapeHTML(course.name) + '"><span class="glyph">' + icon(course.icon) + '</span></div>') +
      '<div class="panel detail-meta">' + meta.map(item => '<div>' + icon(item[0]) + '<small>' + item[1] + '</small><strong>' + escapeHTML(item[2]) + '</strong></div>').join('') + '</div></div>' +
      '<div><h2 class="body-heading">' + escapeHTML(course.name) + '</h2><div style="height:3px;width:120px;background:linear-gradient(90deg,#a855f7,transparent);margin:14px 0 16px"></div>' +
      '<p class="body-copy bn">' + escapeHTML(detail.description) + '</p><h3 style="font-size:.95rem;margin:20px 0 12px">What You Will Learn</h3>' + checkList(detail.learn) +
      '<div class="actions"><div class="panel detail-price"><span class="muted" style="font-size:.72rem">Course Fee</span><div><strong class="lilac">' + courseFee(course) + '</strong><span class="off-badge">' + course.off + '% OFF</span></div><small style="color:var(--muted)">' + course.device + ' · ' + course.classes + ' Classes · ' + escapeHTML(course.duration) + '</small></div>' +
      '<a class="btn large" href="' + escapeHTML(admissionURL(course.name)) + '">Enroll Now</a></div></div></div></section>';
  }).join(''));
  put('comparison-rows', courses.map(course => '<tr><th scope="row">' + escapeHTML(course.name) + '</th><td><span class="chip">' + icon(deviceIcon(course), 'icon-sm') + course.device + '</span></td><td>' + course.classes + '</td><td>' + escapeHTML(course.duration) + '</td><td class="fee">' + courseFee(course) + '<span class="off-badge">' + course.off + '% OFF</span></td><td><a class="btn outline small" href="' + escapeHTML(admissionURL(course.name)) + '" aria-label="Enroll in ' + escapeHTML(course.name) + '">Enroll</a></td></tr>').join(''));
  const curriculum = [
    ['Introduction & Setup', 4, ['Welcome and course overview', 'Installing the editing tools', 'Workspace and project settings', 'Organizing your source files']],
    ['Cutting & Timeline Basics', 5, ['Importing your footage', 'Working with the timeline', 'Essential cuts and transitions', 'Keyboard shortcuts', 'Editing a short sequence']],
    ['Color Grading & Correction', 6, ['Understanding Color Science', 'Scopes & Color Wheels', 'Cinematic Look Development', 'Skin Tone Correction', 'Matching your shots', 'Color grading project']],
    ['Motion Graphics & Effects', 5, ['Keyframes and animation', 'Animated titles', 'Working with effects', 'Compositing basics', 'Motion graphics project']],
    ['Sound Design & Mixing', 4, ['Cleaning up dialogue', 'Music and sound effects', 'Mixing and levels', 'Final audio review']],
    ['Export, Delivery & Freelancing', 6, ['Export settings', 'File delivery', 'Building your portfolio', 'Marketplace profile setup', 'Client communication', 'Final project']]
  ];
  put('curriculum', curriculum.map((module, index) => '<details' + (index === 2 ? ' open' : '') + '><summary><span class="module-number">' + String(index + 1).padStart(2, '0') + '</span><span>Module ' + (index + 1) + ': ' + escapeHTML(module[0]) + '</span><span class="chip lesson-count" style="margin-left:auto">Lessons ' + module[1] + '</span></summary><ol class="lesson-list">' + module[2].map((lesson, i) => '<li><span>Lesson ' + (i + 1) + ': ' + escapeHTML(lesson) + '</span>' + icon('play', 'icon-sm lilac') + '</li>').join('') + '</ol></details>').join(''));
  put('instructor-counters', [['book', String(courses.length), 'Skill Courses'], ['monitor', 'PC + Mobile', 'Learning Options'], ['clock', '2–3', 'Months per Course'], ['users', String(team.length), 'Team Members']].map(item => counterMarkup(...item)).join(''));
  put('course-faq', faqMarkup(courseFAQs, 1));

  put('about-counters', counterMarkup('grad', '500+', 'Students') + counterMarkup('book', String(courses.length), 'Skill Courses', 'PC + Mobile') + counterMarkup('trend', '98%', 'Success Rate', 'Placement'));
  put('about-values', [
    ['shield', 'QUALITY', 'Quality First', 'আমরা কোয়ালিটি থেকে কখনো আপোস করি না। প্রতিটি ব্যাচে সেরাটাই ডেলিভার করি।'],
    ['bulb', 'INNOVATION', 'Always Innovating', 'নতুন AI Tools ও Industry Trend অনুযায়ী কারিকুলাম সবসময় আপডেট থাকে।'],
    ['users', 'COMMUNITY', 'Student Community', 'শিক্ষার্থীদের জন্য একটি Active Community যেখানে সবসময় সাহায্য পাবেন।'],
    ['trophy', 'RESULTS', 'Result Driven', 'শেখা শেষ নয়। ইনকাম ও ক্যারিয়ার রেজাল্টই আমাদের প্রকৃত পরিমাপ।']
  ].map(value => '<div class="panel hover-box feature-box" style="text-align:center"><span class="icon-box">' + icon(value[0], 'icon-lg') + '</span><span class="eyebrow" style="font-size:.61rem;letter-spacing:2px;margin:18px 0 5px;color:var(--dim)">' + value[1] + '</span><h3 style="margin-top:0">' + value[2] + '</h3><p>' + value[3] + '</p></div>').join(''));
  put('achievements', [['grad', '500+', 'Students Trained'], ['star', '4.9/5', 'Average Rating'], ['award', '450+', 'Certificates Issued'], ['trend', '200+', 'Freelancers Created'], ['play', String(courses.length), 'Skill Courses'], ['trophy', '98%', 'Success Rate']].map(item => counterMarkup(...item)).join(''));
  put('learning-experience', [
    ['video', 'LIVE CLASSES', 'Live Interactive Classes', 'Live Interactive classes with real-time Q&A and a hands-on learning experience.', ['Zoom Classes', 'Q&A Sessions', 'Recorded Backup']],
    ['briefcase', 'PROJECTS', 'Real World Projects', 'Real client projects দিয়ে Portfolio তৈরি করুন কোর্স চলাকালীনই।', ['Client Projects', 'Portfolio Building', 'Feedback Sessions']],
    ['headphones', 'SUPPORT', '24/7 Student Support', 'যেকোনো প্রশ্নে Community ও Mentor Support সবসময় পাশে।', ['WhatsApp Group', 'Mentor Support', 'Lifetime Access']]
  ].map(item => '<div class="panel hover-box feature-box"><span class="eyebrow" style="font-size:.62rem;color:var(--dim)">' + item[1] + '</span><span class="icon-box">' + icon(item[0], 'icon-lg') + '</span><h3>' + item[2] + '</h3><p style="margin-bottom:18px">' + escapeHTML(item[3]) + '</p>' + chips(item[4]) + '</div>').join(''));
  $('#community-ring').insertAdjacentHTML('afterbegin', avatars.map((src, index) => '<img class="orbit-avatar" src="' + src + '" style="--angle:' + (index * 45) + 'deg" loading="lazy" width="60" height="60" alt="">').join(''));

  put('class-photos', classPhotos.map((item, index) => mediaButton(item[0], item[1], 'classes', index === 6 ? 'wide' : '')).join(''));
  put('student-work', studentWork.map(work => '<article class="panel hover-box portfolio-item">' + mediaButton(work[0], work[2], 'student-work') + '<div class="portfolio-meta"><span>' + escapeHTML(work[0]) + '</span><span class="chip">' + escapeHTML(work[1]) + '</span></div></article>').join(''));
  put('events-photos', events.map((item, index) => mediaButton(item[0], item[1], 'events', index === 0 ? 'wide-banner' : 'gallery-item')).join(''));
  put('behind-scenes', behindScenes.map((item, index) => mediaButton(item[0], item[1], 'studio', index === 3 ? 'wide-banner' : 'gallery-item')).join(''));
  put('success-photos', successPhotos.map(item => '<article class="panel hover-box portfolio-item">' + mediaButton(item[0], item[2], 'success') + '<div class="portfolio-meta"><span>' + escapeHTML(item[0]) + '</span><span class="chip" style="color:#b7f3c6;border-color:#22c55e66">' + escapeHTML(item[1]) + '</span></div></article>').join(''));
  put('gallery-videos', videos.map(item => mediaButton(item[0], item[2], 'videos', 'video-item', 'preview', item[1])).join(''));

  $$('[data-hexagons]').forEach(svg => {
    for (let i = 0; i < 15; i++) {
      const x = (i % 3) * 59;
      const y = Math.floor(i / 3) * 69 + (i % 3 === 1 ? 34 : 0);
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M' + (x + 28) + ' ' + y + 'l26 15v30l-26 15-26-15V' + (y + 15) + 'Z');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '1.2');
      svg.appendChild(path);
    }
  });
  const homePoster = $('#admission-poster').cloneNode(true);
  homePoster.removeAttribute('id');
  $$('[id]', homePoster).forEach(element => element.removeAttribute('id'));
  const originalHeading = $('h1', homePoster);
  const homeHeading = document.createElement('h2');
  homeHeading.className = originalHeading.className;
  homeHeading.id = 'home-admission-heading';
  homeHeading.innerHTML = originalHeading.innerHTML;
  originalHeading.replaceWith(homeHeading);
  $('[data-home-admission]').appendChild(homePoster);
  $('#home-admission').setAttribute('aria-labelledby', homeHeading.id);

  const skills = ['Video Editing', 'Content Creation', 'YouTube AI Automation', 'Graphic Design', 'Freelancing', 'Web Development', 'Mobile Video Editing', 'AI Content Creation'];
  put('skills-marquee', [...skills, ...skills].map(skill => '<span>' + skill + icon('spark') + '</span>').join(''));
  put('hero-timeline', Array.from({ length: 34 }, (_, i) => '<span style="height:' + (20 + Math.abs(Math.sin(i * 1.3)) * 80) + '%;animation-delay:' + (i * 45) + 'ms"></span>').join(''));
  $$('[data-stars]').forEach(element => { element.innerHTML = icon('star').repeat(5); });
  $$('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
  $$('[data-phone-text]').forEach(element => { element.textContent = SITE.phone; });
  $$('[data-phone]').forEach(link => { link.href = 'tel:' + SITE.phone; });
  $$('[data-whatsapp]').forEach(link => { link.href = whatsappURL(link.dataset.message || ''); });
  $$('[data-messenger]').forEach(link => { link.href = SITE.messenger; });
  $$('[data-facebook]').forEach(link => { link.href = SITE.facebook; });

  const mobileMenu = $('#mobile-nav');
  const menuToggle = $('#menu-toggle');
  function setMenu(open) {
    mobileMenu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('use', menuToggle).setAttribute('href', open ? '#i-close' : '#i-menu');
  }
  menuToggle.addEventListener('click', () => setMenu(mobileMenu.hidden));
  document.addEventListener('click', event => {
    if (!mobileMenu.hidden && !$('#site-header').contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.hidden) { setMenu(false); menuToggle.focus(); }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
  function updateScrollControls() {
    $('#site-header').classList.toggle('scrolled', window.scrollY > 40);
    $('#back-top').hidden = window.scrollY < 600;
  }
  window.addEventListener('scroll', updateScrollControls, { passive: true });
  $('#back-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));
  $('[data-skip]').addEventListener('click', event => { event.preventDefault(); $('#main').focus(); });

  let homeCourseIndex = 0;
  const smallScreen = window.matchMedia('(max-width: 599px)');
  const tabletScreen = window.matchMedia('(max-width: 1099px)');
  function showHomeCourses() {
    const perView = smallScreen.matches ? 1 : tabletScreen.matches ? 2 : 3;
    $$('[data-home-course]').forEach((card, index) => {
      const position = (index - homeCourseIndex + courses.length) % courses.length;
      card.hidden = position >= perView;
      card.style.order = String(position);
    });
    $$('[data-course-slide]').forEach((button, index) => button.setAttribute('aria-pressed', String(index === homeCourseIndex)));
  }
  $('#courses-previous').addEventListener('click', () => { homeCourseIndex = (homeCourseIndex - 1 + courses.length) % courses.length; showHomeCourses(); });
  $('#courses-next').addEventListener('click', () => { homeCourseIndex = (homeCourseIndex + 1) % courses.length; showHomeCourses(); });
  $$('[data-course-slide]').forEach(button => button.addEventListener('click', () => { homeCourseIndex = Number(button.dataset.courseSlide); showHomeCourses(); }));
  smallScreen.addEventListener('change', showHomeCourses);
  tabletScreen.addEventListener('change', showHomeCourses);
  showHomeCourses();

  $$('[data-course-filter]').forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.courseFilter;
    let visible = 0;
    $$('[data-course-category]').forEach(card => {
      card.hidden = category !== 'All Courses' && card.dataset.courseCategory !== category;
      if (!card.hidden) visible++;
    });
    $$('[data-course-filter]').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
    const grid = $('#course-catalogue');
    grid.style.maxWidth = visible === 1 ? '420px' : '';
    grid.style.margin = visible === 1 ? '0 auto' : '';
    grid.style.gridTemplateColumns = visible === 1 ? '1fr' : '';
    $('#course-filter-result').textContent = visible + (visible === 1 ? ' course' : ' courses') + ' available';
  }));
  $$('[data-gallery-filter]').forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.galleryFilter;
    $$('[data-gallery-section]').forEach(section => { section.hidden = category !== 'All' && section.dataset.gallerySection !== category; });
    $$('[data-gallery-filter]').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
    $('#gallery-filter-result').textContent = category === 'All' ? 'Showing all gallery collections' : 'Showing ' + category;
  }));
  $$('.accordion details').forEach(detailsElement => detailsElement.addEventListener('toggle', () => {
    if (detailsElement.open) $$('details', detailsElement.parentElement).forEach(other => { if (other !== detailsElement) other.open = false; });
  }));

  let reviewIndex = 0;
  let reviewsPaused = reducedMotion.matches;
  let reviewHover = false;
  let reviewFocus = false;
  function showReview(index) {
    reviewIndex = (index + reviews.length) % reviews.length;
    $$('[data-review]').forEach((review, i) => { review.hidden = i !== reviewIndex; });
    $$('[data-review-slide]').forEach((button, i) => button.setAttribute('aria-pressed', String(i === reviewIndex)));
  }
  function updateReviewButton() {
    $('#review-pause').setAttribute('aria-label', reviewsPaused ? 'Play automatic reviews' : 'Pause automatic reviews');
    $('#review-pause').setAttribute('aria-pressed', String(reviewsPaused));
    $('use', $('#review-pause')).setAttribute('href', reviewsPaused ? '#i-play' : '#i-pause');
  }
  $$('[data-review-slide]').forEach(button => button.addEventListener('click', () => showReview(Number(button.dataset.reviewSlide))));
  $('#review-pause').addEventListener('click', () => { reviewsPaused = !reviewsPaused; updateReviewButton(); });
  $('#review-shell').addEventListener('pointerenter', () => { reviewHover = true; });
  $('#review-shell').addEventListener('pointerleave', () => { reviewHover = false; });
  $('#review-shell').addEventListener('focusin', () => { reviewFocus = true; });
  $('#review-shell').addEventListener('focusout', event => { reviewFocus = $('#review-shell').contains(event.relatedTarget); });
  window.setInterval(() => {
    if (!reviewsPaused && !reviewHover && !reviewFocus && !document.hidden && !$('#page-home').hidden && !$('#media-dialog').open) showReview(reviewIndex + 1);
  }, 5200);
  updateReviewButton();
  reducedMotion.addEventListener('change', event => { if (event.matches) { reviewsPaused = true; updateReviewButton(); } });

  function finishCount(element) {
    element.textContent = Number(element.dataset.count).toLocaleString('en-US') + (element.dataset.suffix || '');
  }
  function animateCount(element) {
    if (element.dataset.counted) return;
    element.dataset.counted = 'true';
    if (reducedMotion.matches) { finishCount(element); return; }
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / 1500, 1);
      const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      element.textContent = value.toLocaleString('en-US') + suffix;
      if (progress < 1 && !reducedMotion.matches) requestAnimationFrame(tick);
      else finishCount(element);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateCount(entry.target); counterObserver.unobserve(entry.target); }
      });
    }, { threshold: .25 });
    $$('[data-count]').forEach(element => counterObserver.observe(element));
  }

  // Native dialog provides Escape handling, a focus trap, and focus restoration.
  const dialog = $('#media-dialog');
  let currentMedia = null;
  let lastMediaTrigger = null;
  let galleryGroup = [];
  let galleryPosition = 0;
  function displayMedia(item) {
    currentMedia = item;
    $('#dialog-title').textContent = item.title;
    $('#dialog-image').src = item.image;
    $('#dialog-image').alt = item.title;
    const isPreview = item.type === 'preview';
    $('#dialog-gallery-controls').hidden = isPreview || galleryGroup.length < 2;
    $('#dialog-request').hidden = !isPreview;
    $('#dialog-description').textContent = item.description || (isPreview ? 'A playable video link has not been added for this preview. Request it directly from the Nexphic admission team.' : 'A glimpse into the Nexphic learning experience.');
    $('#dialog-request').href = whatsappURL('Hello Nexphic! Could you share the ' + item.title + ' with me?');
    $('#dialog-position').textContent = (galleryPosition + 1) + ' / ' + galleryGroup.length;
  }
  function openMedia(id, trigger) {
    const item = mediaItems[id];
    if (!item) return;
    if (typeof dialog.showModal !== 'function') {
      window.open(item.type === 'preview' ? whatsappURL('Please share the ' + item.title + ' with me.') : item.image, '_blank', 'noopener,noreferrer');
      return;
    }
    lastMediaTrigger = trigger;
    galleryGroup = mediaItems.filter(media => media.group === item.group && media.type === item.type);
    galleryPosition = galleryGroup.indexOf(item);
    displayMedia(item);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  function moveGallery(direction) {
    if (!currentMedia || currentMedia.type === 'preview' || galleryGroup.length < 2) return;
    galleryPosition = (galleryPosition + direction + galleryGroup.length) % galleryGroup.length;
    displayMedia(galleryGroup[galleryPosition]);
  }
  $$('[data-media]').forEach(button => button.addEventListener('click', () => openMedia(Number(button.dataset.media), button)));
  $('[data-dialog-close]').addEventListener('click', () => dialog.close());
  $('#gallery-previous').addEventListener('click', () => moveGallery(-1));
  $('#gallery-next').addEventListener('click', () => moveGallery(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); moveGallery(event.key === 'ArrowLeft' ? -1 : 1); }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (lastMediaTrigger && !lastMediaTrigger.closest('[hidden]')) lastMediaTrigger.focus({ preventScroll: true });
  });

  // ---------- Admission form: issues a unique Student ID and an admission slip ----------
  const admissionForm = $('#admission-form-element');
  const admissionSlip = $('#admission-slip');
  const admissionStorageKey = 'nexphic-admission';
  const idAlphabet = '23456789'; // 8 symbols without 0, O, 1 or I
  let currentAdmission = null;
  let pendingCourse = '';
  let admissionBusy = false;
  function validPhone(value) {
    const digits = value.replace(/\D/g, '');
    return /^\+?[\d\s()-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
  }
  function showError(id, message) {
    const element = document.getElementById(id);
    element.textContent = message;
    element.hidden = !message;
  }
  function randomBytes(length) {
    const bytes = new Uint8Array(length);
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(bytes);
    else for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 256);
    return bytes;
  }
  // Format NXP-26-K7Q4XM: over one billion possible IDs per year.
  function generateStudentId() {
    const code = Array.from(randomBytes(6), byte => idAlphabet[byte % 32]).join('');
    return 'NXP-' + String(new Date().getFullYear()).slice(-2) + '-' + code;
  }
  const submissionToken = () => Array.from(randomBytes(16), byte => byte.toString(16).padStart(2, '0')).join('');
  function updateCourseSummary() {
    const course = findCourse($('#admission-course').value);
    const summary = $('#admission-course-summary');
    summary.hidden = !course;
    summary.innerHTML = course ? '<span class="chip">' + icon(deviceIcon(course), 'icon-sm') + course.device + '</span><span class="chip">' + icon('book', 'icon-sm') + course.classes + ' Classes</span><span class="chip">' + icon('clock', 'icon-sm') + escapeHTML(course.duration) + '</span><span class="chip fee-chip">Course Fee ' + courseFee(course) + ' · ' + course.off + '% OFF</span>' : '';
  }
  function applyPendingCourse() {
    if (!pendingCourse) return;
    $('#admission-course').value = pendingCourse;
    updateCourseSummary();
  }
  function admissionMessage(admission) {
    return [
      'Hello Nexphic IT Institute! I have submitted the admission form on your website.',
      'Student ID: ' + admission.studentId,
      'Name: ' + admission.name,
      'Father / Guardian: ' + admission.guardian,
      'Mobile: ' + admission.phone,
      admission.whatsapp && 'WhatsApp: ' + admission.whatsapp,
      admission.email && 'Email: ' + admission.email,
      admission.dob && 'Date of Birth: ' + admission.dob,
      admission.gender && 'Gender: ' + admission.gender,
      admission.education && 'Education: ' + admission.education,
      'Address: ' + admission.address,
      'Course: ' + admission.course + ' (' + admission.device + ', ' + admission.classes + ' Classes, ' + admission.duration + ')',
      'Course Fee: ' + admission.fee,
      admission.batch && 'Preferred Batch: ' + admission.batch,
      'Payment Method: ' + admission.payment,
      admission.note && 'Note: ' + admission.note,
      'Please share the official payment number so I can complete my admission. Thank you!'
    ].filter(Boolean).join('\n');
  }
  // Saves to the optional Google Sheet endpoint. Returns 'saved', 'failed' or 'local'.
  async function saveAdmission(admission) {
    if (!SITE.admissionEndpoint) return 'local';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      // A plain-text body avoids a CORS preflight request, which Apps Script cannot answer.
      const response = await fetch(SITE.admissionEndpoint, { method: 'POST', body: JSON.stringify(admission), signal: controller.signal });
      const result = await response.json();
      if (!result || !result.ok) return 'failed';
      if (result.studentId) admission.studentId = String(result.studentId);
      return 'saved';
    } catch {
      return 'failed';
    } finally {
      clearTimeout(timer);
    }
  }
  const formatDate = iso => new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  function showSlip(admission, focus = true) {
    currentAdmission = admission;
    $('#slip-student-id').textContent = admission.studentId;
    const rows = [
      ['শিক্ষার্থীর নাম', admission.name], ['পিতা/অভিভাবক', admission.guardian],
      ['মোবাইল', admission.phone], ['WhatsApp', admission.whatsapp], ['ইমেইল', admission.email],
      ['জন্ম তারিখ', admission.dob], ['লিঙ্গ', admission.gender], ['শিক্ষাগত যোগ্যতা', admission.education],
      ['ঠিকানা', admission.address, true], ['কোর্স', admission.course, true],
      ['Device / Class / সময়', admission.device + ' · ' + admission.classes + ' Classes · ' + admission.duration],
      ['Course Fee', admission.fee], ['পছন্দের ব্যাচ', admission.batch], ['Payment মাধ্যম', admission.payment],
      ['ভর্তির তারিখ', formatDate(admission.submittedAt)], ['মন্তব্য', admission.note, true]
    ];
    const details = $('#slip-details');
    details.replaceChildren();
    // Student-entered values are written as text, never as HTML.
    rows.filter(row => row[1]).forEach(([label, value, wide]) => {
      const item = document.createElement('div');
      const term = document.createElement('dt');
      const description = document.createElement('dd');
      if (wide) item.className = 'wide';
      term.textContent = label;
      description.textContent = value;
      item.append(term, description);
      details.append(item);
    });
    const notices = {
      saved: ['ok', '✓ আপনার ভর্তি ফর্ম সফলভাবে জমা হয়েছে। Student ID সংরক্ষণ করুন এবং নিচের পরবর্তী ধাপগুলো অনুসরণ করুন।'],
      failed: ['warn', 'Student ID তৈরি হয়েছে, কিন্তু অনলাইনে ফর্ম জমা দেওয়া যায়নি। ভর্তি নিশ্চিত করতে নিচের "WhatsApp-এ পাঠান" বাটনে চাপ দিন।'],
      local: ['info', 'আপনার Student ID তৈরি হয়েছে। ভর্তি নিশ্চিত করতে নিচের "WhatsApp-এ পাঠান" বাটনে চাপ দিয়ে তথ্যটি Admission Team-কে পাঠান।']
    };
    const [tone, text] = notices[admission.sync] || notices.local;
    const sync = $('#slip-sync');
    sync.className = 'slip-sync ' + tone;
    sync.textContent = text;
    $('#slip-whatsapp').href = whatsappURL(admissionMessage(admission));
    $('#slip-copy-status').textContent = '';
    admissionForm.hidden = true;
    admissionSlip.hidden = false;
    try { sessionStorage.setItem(admissionStorageKey, JSON.stringify(admission)); } catch { /* Storage can be disabled. */ }
    if (focus) {
      $('#slip-heading').focus({ preventScroll: true });
      admissionSlip.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
    }
  }
  function setAdmissionBusy(busy) {
    admissionBusy = busy;
    const button = $('#admission-submit');
    button.disabled = busy;
    button.setAttribute('aria-busy', String(busy));
    $('#admission-submit-label').textContent = busy ? 'জমা হচ্ছে…' : 'ভর্তি ফর্ম জমা দিন';
  }
  admissionForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (admissionBusy) return;
    const data = new FormData(admissionForm);
    const value = key => String(data.get(key) || '').trim();
    const admission = {
      studentId: generateStudentId(), submissionId: submissionToken(), submittedAt: new Date().toISOString(),
      name: value('name'), guardian: value('guardian'), phone: value('phone'), whatsapp: value('whatsapp'),
      email: value('email'), dob: value('dob'), gender: value('gender'), education: value('education'),
      address: value('address'), course: value('course'), batch: value('batch'), payment: value('payment'), note: value('note')
    };
    const fail = (message, field) => {
      showError('admission-error', message);
      const element = admissionForm.elements.namedItem(field);
      if (element && element.focus) element.focus();
    };
    if (admission.name.length < 2) return fail('শিক্ষার্থীর পূর্ণ নাম লিখুন।', 'name');
    if (admission.guardian.length < 2) return fail('পিতা/অভিভাবকের নাম লিখুন।', 'guardian');
    if (!validPhone(admission.phone)) return fail('সঠিক মোবাইল নম্বর লিখুন (৭ থেকে ১৫ সংখ্যা)।', 'phone');
    if (admission.whatsapp && !validPhone(admission.whatsapp)) return fail('সঠিক WhatsApp নম্বর লিখুন অথবা ঘরটি খালি রাখুন।', 'whatsapp');
    if (admission.address.length < 4) return fail('বর্তমান ঠিকানা লিখুন।', 'address');
    const course = findCourse(admission.course);
    if (!course) return fail('একটি কোর্স নির্বাচন করুন।', 'course');
    if (!admission.payment) return fail('Payment মাধ্যম নির্বাচন করুন।', 'payment');
    if (!data.get('agree')) return fail('তথ্য সঠিক কিনা নিশ্চিত করে চেকবক্সে টিক দিন।', 'agree');
    showError('admission-error', '');
    Object.assign(admission, { device: course.device, classes: course.classes, duration: course.duration, fee: courseFee(course) + ' (' + course.off + '% OFF)' });
    setAdmissionBusy(true);
    admission.sync = await saveAdmission(admission);
    setAdmissionBusy(false);
    showSlip(admission);
  });
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
    } catch { /* Use the fallback below. */ }
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.append(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    field.remove();
    return copied;
  }
  $('#slip-copy').addEventListener('click', async () => {
    if (!currentAdmission) return;
    const copied = await copyText(currentAdmission.studentId);
    $('#slip-copy-status').textContent = copied ? 'Student ID কপি হয়েছে: ' + currentAdmission.studentId : 'কপি করা যায়নি। Student ID টি লিখে রাখুন: ' + currentAdmission.studentId;
  });
  // Printing uses a copy of the slip so only the slip appears on paper or in the PDF.
  $('#slip-print').addEventListener('click', () => {
    const copy = $('#slip-card').cloneNode(true);
    copy.removeAttribute('id');
    $$('[id]', copy).forEach(element => element.removeAttribute('id'));
    $('#print-root').replaceChildren(copy);
    document.body.classList.add('print-slip');
    window.print();
  });
  window.addEventListener('afterprint', () => {
    document.body.classList.remove('print-slip');
    $('#print-root').replaceChildren();
  });
  $('#slip-new').addEventListener('click', () => {
    admissionForm.reset();
    currentAdmission = null;
    try { sessionStorage.removeItem(admissionStorageKey); } catch { /* Storage can be disabled. */ }
    updateCourseSummary();
    applyPendingCourse();
    showError('admission-error', '');
    admissionSlip.hidden = true;
    admissionForm.hidden = false;
    $('#admission-form').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
    admissionForm.elements.namedItem('name').focus({ preventScroll: true });
  });
  $('#admission-course').addEventListener('change', updateCourseSummary);
  admissionForm.addEventListener('input', () => showError('admission-error', ''));
  // Keep a just-issued slip visible after a page refresh in the same tab.
  try {
    const saved = JSON.parse(sessionStorage.getItem(admissionStorageKey) || 'null');
    if (saved && saved.studentId && findCourse(saved.course)) showSlip(saved, false);
  } catch { /* Ignore unreadable saved data. */ }

  const counselingForm = $('#counseling-form');
  counselingForm.addEventListener('input', () => { $('#counseling-ready').hidden = true; showError('counseling-error', ''); });
  counselingForm.addEventListener('change', () => { $('#counseling-ready').hidden = true; });
  counselingForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(counselingForm);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    if (name.length < 2 || !validPhone(phone)) { showError('counseling-error', 'সঠিক নাম ও মোবাইল নম্বর দিন।'); return; }
    const message = ['Hello Nexphic! I would like to request free course counseling.', 'Name: ' + name, 'Phone: ' + phone, 'Course: ' + data.get('course'), 'Question: ' + (String(data.get('question') || '').trim() || 'Please help me choose the right course.')].join('\n');
    showError('counseling-error', '');
    $('#counseling-send').href = whatsappURL(message);
    $('#counseling-ready').hidden = false;
  });

  // Hash navigation stays inside this one file and supports browser back/forward.
  const pageNames = { home: 'Home', courses: 'Courses', about: 'About', gallery: 'Gallery', admission: 'Admission Process' };
  let activePage = 'home';
  let navigationFrame = 0;
  function route(focusHeading = false) {
    if (dialog.open) dialog.close();
    setMenu(false);
    const hash = window.location.hash.replace(/^#/, '') || '/';
    const queryIndex = hash.indexOf('?');
    const path = (queryIndex === -1 ? hash : hash.slice(0, queryIndex)).replace(/^\/+|\/+$/g, '');
    const params = new URLSearchParams(queryIndex === -1 ? '' : hash.slice(queryIndex + 1));
    const aliases = { 'All-Course': 'courses', 'home': 'home', 'contact': 'home' };
    const key = Object.prototype.hasOwnProperty.call(pageNames, path) ? path : (Object.prototype.hasOwnProperty.call(aliases, path) ? aliases[path] : 'home');
    const page = document.getElementById('page-' + key);
    const changedPage = activePage !== key;
    activePage = key;
    $$('[data-page]').forEach(element => { element.hidden = element !== page; element.classList.remove('page-enter'); });
    if (changedPage) page.classList.add('page-enter');
    document.title = pageNames[key] + ' | Nexphic IT Institute';
    $$('[data-nav]').forEach(link => {
      if (link.dataset.nav === key) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const selectedCourse = params.get('course');
    if (key === 'admission' && selectedCourse && registrationOptions.includes(selectedCourse)) {
      pendingCourse = selectedCourse;
      // Keep a just-issued slip visible; "নতুন ভর্তি ফর্ম" will use this course.
      if (admissionSlip.hidden) applyPendingCourse();
    }
    cancelAnimationFrame(navigationFrame);
    navigationFrame = requestAnimationFrame(() => {
      let target = null;
      if (key === 'admission' && params.get('form') === '1') target = $('#admission-form');
      else if (key === 'home' && (params.get('section') === 'contact' || path === 'contact')) target = $('#contact');
      else if (params.get('section')) {
        const candidate = document.getElementById(params.get('section'));
        if (candidate && page.contains(candidate)) target = candidate;
      }
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      if (focusHeading) {
        const heading = target ? $('h2,h1,h3', target) : $('h1', page);
        if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
      }
      updateScrollControls();
    });
  }
  window.addEventListener('hashchange', () => route(true));
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element) || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const link = event.target.closest('a[href^="#/"]');
    if (link && link.getAttribute('href') === window.location.hash) { event.preventDefault(); route(true); }
  });

  // Project files are kept as non-executing text; package-lock.json is embedded by the build. Restore any file here.
  $$('[data-filename]').sort((a, b) => Number(a.dataset.order || 0) - Number(b.dataset.order || 0)).forEach(source => {
    const name = source.dataset.filename;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chip';
    button.textContent = name;
    button.addEventListener('click', () => {
      const linked = source.tagName === 'LINK';
      const url = linked ? source.href : URL.createObjectURL(new Blob([source.textContent], { type: 'text/plain;charset=utf-8' }));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = name;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      if (!linked) setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    $('#project-file-links').append(button);
  });

  function prepareLogo() {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      try {
        // Remove only the original PNG's empty margins; do not redraw the brand.
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.drawImage(image, 0, 0);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let left = canvas.width, top = canvas.height, right = 0, bottom = 0;
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const p = (y * canvas.width + x) * 4;
            if (pixels[p + 3] > 32 && Math.max(pixels[p], pixels[p + 1], pixels[p + 2]) > 60) {
              left = Math.min(left, x); right = Math.max(right, x);
              top = Math.min(top, y); bottom = Math.max(bottom, y);
            }
          }
        }
        if (right <= left || bottom <= top) return;
        const cropped = document.createElement('canvas');
        cropped.width = right - left + 5;
        cropped.height = bottom - top + 5;
        const cropContext = cropped.getContext('2d');
        if (!cropContext) return;
        cropContext.drawImage(canvas, 2 - left, 2 - top);
        const dataURL = cropped.toDataURL('image/png');
        $$('[data-logo]').forEach(logo => { logo.src = dataURL; });
      } catch {
        // If a host blocks canvas access, the original image remains visible.
      }
    };
    image.src = SITE.logo;
  }
  prepareLogo();
  route();
}());
  

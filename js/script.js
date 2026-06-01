// ================================================
// KHABAYA - Saudi Travel & Tourism
// ملف JavaScript للتفاعلية
// مقرر: Web Page Development - CS-10401
// ================================================


// ================================================
// 1. قائمة الموبايل
// ================================================
function toggleMenu() {
    var navLinks = document.getElementById("navLinks");
    var menuBtn  = document.getElementById("menuBtn");

    if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuBtn.innerHTML = "&#9776;";
    } else {
        navLinks.classList.add("open");
        menuBtn.innerHTML = "&#10005;";
    }
}

// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", function (e) {
    var navbar   = document.getElementById("navbar");
    var navLinks = document.getElementById("navLinks");
    var menuBtn  = document.getElementById("menuBtn");
    if (!navbar) return;
    if (!navbar.contains(e.target) && navLinks && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        if (menuBtn) menuBtn.innerHTML = "&#9776;";
    }
});


// ================================================
// 2. تغيير شكل الـ Navbar عند التمرير
// ================================================
window.addEventListener("scroll", function () {
    var navbar = document.getElementById("navbar");
    if (!navbar) return;

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// ================================================
// 3. التحقق من نموذج الحجز (Booking Form)
//    + إظهار رسالة عند النجاح
// ================================================
function submitBookingForm(event) {
    event.preventDefault();
    var form = event.target;
    var valid = true;

    // قراءة قيم الحقول
    var name      = form.querySelector('[name="fullName"]').value.trim();
    var email     = form.querySelector('[name="email"]').value.trim();
    var phone     = form.querySelector('[name="phone"]').value.trim();
    var travelers = form.querySelector('[name="travelers"]').value.trim();
    var dest      = form.querySelector('[name="destination"]').value;
    var date      = form.querySelector('[name="travelDate"]').value;

    // مسح الأخطاء القديمة
    clearErrors();

    // التحقق من الاسم
    if (name.length < 3) {
        showError("nameError", "Name must be at least 3 characters.");
        valid = false;
    }

    // التحقق من الإيميل
    if (!email.includes("@") || !email.includes(".")) {
        showError("emailError", "Please enter a valid email address.");
        valid = false;
    }

    // التحقق من رقم الهاتف
    if (phone.length < 8) {
        showError("phoneError", "Please enter a valid phone number.");
        valid = false;
    }

    // التحقق من عدد المسافرين
    if (travelers === "" || Number(travelers) < 1) {
        showError("travelersError", "Please enter at least 1 traveler.");
        valid = false;
    }

    // التحقق من الوجهة
    if (dest === "") {
        showError("destError", "Please select a destination.");
        valid = false;
    }

    // التحقق من التاريخ
    if (date === "") {
        showError("dateError", "Please choose a travel date.");
        valid = false;
    }

    // إذا كل شيء صحيح — إظهار رسالة النجاح
    if (valid) {
        form.style.display = "none";
        var msg = document.getElementById("successMessage");
        if (msg) msg.style.display = "block";
    }
}

// دالة مساعدة: إظهار رسالة خطأ لحقل معين
function showError(elementId, message) {
    var el = document.getElementById(elementId);
    if (el) el.textContent = message;
}

// دالة مساعدة: مسح كل رسائل الخطأ
function clearErrors() {
    var errors = document.querySelectorAll(".field-error");
    errors.forEach(function (el) { el.textContent = ""; });
}


// ================================================
// 4. التحقق من نموذج التواصل (Contact Form)
// ================================================
function submitContactForm(event) {
    event.preventDefault();
    var form = event.target;
    var valid = true;

    var name  = form.querySelector('[name="fullName"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var phone = form.querySelector('[name="phone"]').value.trim();

    clearErrors();

    if (name.length < 3) {
        showError("nameError", "Name must be at least 3 characters.");
        valid = false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        showError("emailError", "Please enter a valid email address.");
        valid = false;
    }

    if (phone.length < 8) {
        showError("phoneError", "Please enter a valid phone number.");
        valid = false;
    }

    if (valid) {
        form.style.display = "none";
        var msg = document.getElementById("successMessage");
        if (msg) msg.style.display = "block";
    }
}


// ================================================
// 5. حاسبة السعر (Price Calculator)
//    تحسب السعر الإجمالي = سعر الباقة × عدد المسافرين
// ================================================

// جدول أسعار الباقات
var packagePrices = {
    "secrets":  350,
    "heritage": 550,
    "islands":  1300,
    "earth":    400,
    "mountain": 750,
    "water":    450
};

function calculatePrice() {
    var destSelect = document.getElementById("destination");
    var travelersInput = document.getElementById("travelers");

    if (!destSelect || !travelersInput) return;

    var selectedValue = destSelect.value;
    var travelers = parseInt(travelersInput.value, 10);

    // تحديث عرض السعر لكل شخص
    var pricePerPerson = packagePrices[selectedValue];
    var calcPriceEl = document.getElementById("calcPricePerPerson");
    var calcTravelersEl = document.getElementById("calcTravelers");
    var calcTotalEl = document.getElementById("calcTotal");

    if (!calcPriceEl || !calcTravelersEl || !calcTotalEl) return;

    if (pricePerPerson) {
        calcPriceEl.textContent = pricePerPerson + " SAR / person";
    } else {
        calcPriceEl.textContent = "— SAR / person";
    }

    if (!isNaN(travelers) && travelers > 0) {
        calcTravelersEl.textContent = travelers;
    } else {
        calcTravelersEl.textContent = "—";
    }

    // حساب الإجمالي
    if (pricePerPerson && !isNaN(travelers) && travelers > 0) {
        var total = pricePerPerson * travelers;
        calcTotalEl.textContent = total.toLocaleString() + " SAR";
    } else {
        calcTotalEl.textContent = "— SAR";
    }
}

// تغيير لون زر الحاسبة عند الضغط عليه
function highlightTotal() {
    calculatePrice();

    var btn = document.getElementById("calcBtn");
    if (!btn) return;

    // تغيير اللون
    btn.classList.add("highlighted");
    btn.textContent = "✓ Calculated!";

    // إعادة اللون الأصلي بعد ثانيتين
    setTimeout(function () {
        btn.classList.remove("highlighted");
        btn.textContent = "Show Total";
    }, 2000);
}


// ================================================
// 6. إظهار رسالة عند اختيار باقة (Booking Page)
// ================================================
var packageNames = {
    "secrets":  "Secrets — Heet Cave: 350 SAR per person (1 Day adventure)",
    "heritage": "Heritage — Thee Ain Village: 550 SAR per person (2 Days / 1 Night)",
    "islands":  "Islands — Farasan Islands: 1,300 SAR per person (3 Days / 2 Nights)",
    "earth":    "Earth Secrets — Al-Naslaa Rock: 400 SAR per person (1 Day)",
    "mountain": "Natural Treasures — Shada Mountain: 750 SAR per person (2 Days / 1 Night)",
    "water":    "Water Springs — Al-Hasa Oasis: 450 SAR per person (1 Day)"
};

function showSelectedPackage() {
    var destSelect = document.getElementById("destination");
    var msgDiv = document.getElementById("pkgSelectedMsg");
    if (!destSelect || !msgDiv) return;

    var val = destSelect.value;

    if (val && packageNames[val]) {
        // إظهار الرسالة مع اسم الباقة المختارة
        msgDiv.style.display = "block";
        msgDiv.textContent = "Selected: " + packageNames[val];
    } else {
        msgDiv.style.display = "none";
    }
}


// ================================================
// 7. صفحة تفاصيل الباقة — تغيير المحتوى
// ================================================
var packageDetails = {
    secrets: {
        title:       "Secrets Package",
        subtitle:    "Heet Cave, Riyadh",
        destination: "Heet Cave — Riyadh Region, Saudi Arabia",
        duration:    "1 Full Day (8 Hours)",
        price:       "350 SAR per person",
        hotel:       "No overnight stay (day trip)",
        activities:  "Cave exploration, Underground swimming, Photography, Geology tour",
        transport:   "Sustainable 4x4 Electric Fleet from central Riyadh",
        badge:       "Adventure",
        image:       "images/heet-cave.png",
        msg:         "Perfect for one-day adventurers and cave explorers!"
    },
    heritage: {
        title:       "Heritage Package",
        subtitle:    "Thee Ain Village, Al-Baha",
        destination: "Thee Ain Village — Al-Baha Region, Saudi Arabia",
        duration:    "2 Days / 1 Night",
        price:       "550 SAR per person",
        hotel:       "Eco Rural Lodge — traditional stone guesthouse",
        activities:  "Historical village tour, Photography walk, Traditional dinner, Terraced farm visit",
        transport:   "Sustainable 4x4 Electric Vehicle from Abha / Al-Baha Airport",
        badge:       "Most Popular",
        image:       "images/thee-ain.png",
        msg:         "Our most popular package — a deep dive into Saudi heritage!"
    },
    islands: {
        title:       "Islands Package",
        subtitle:    "Farasan Islands, Jizan",
        destination: "Farasan Islands — Jizan Region, Red Sea",
        duration:    "3 Days / 2 Nights",
        price:       "1,300 SAR per person",
        hotel:       "Eco Beach Resort — seaside bungalow",
        activities:  "Island boat tour, Snorkeling, Bird watching, Fishing, Cultural museum visit",
        transport:   "Domestic flight from Riyadh/Jeddah + boat transfer to island",
        badge:       "Premium",
        image:       "images/al-hasa.png",
        msg:         "The ultimate escape — sea, nature, and Saudi island life!"
    }
};

function showPackageDetails(value) {
    var pkg = packageDetails[value];
    if (!pkg) return;

    // تحديث الصورة والمحتوى
    var img = document.getElementById("pkgImage");
    if (img) img.src = pkg.image;

    setText("pkgTitle",       pkg.title);
    setText("pkgSubtitle",    pkg.subtitle);
    setText("pkgDestination", pkg.destination);
    setText("pkgDuration",    pkg.duration);
    setText("pkgPrice",       pkg.price);
    setText("pkgHotel",       pkg.hotel);
    setText("pkgActivities",  pkg.activities);
    setText("pkgTransport",   pkg.transport);
    setText("pkgBadge",       pkg.badge);

    // إظهار رسالة للباقة المختارة
    var msgDiv = document.getElementById("pkgMessage");
    if (msgDiv) {
        msgDiv.style.display = "block";
        msgDiv.textContent    = pkg.msg;
    }
}

// دالة مساعدة: تغيير نص عنصر
function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
}


// ================================================
// 8. صفحة الباقات — نتيجة الاختيار السريع
// ================================================
var quickDestInfo = {
    secrets:  { name: "Secrets — Heet Cave",           price: "350 SAR / person", duration: "1 Day",           best: "Adventurers"    },
    heritage: { name: "Heritage — Thee Ain Village",   price: "550 SAR / person", duration: "2 Days / 1 Night", best: "History Buffs"  },
    islands:  { name: "Islands — Farasan Islands",     price: "1,300 SAR / person", duration: "3 Days / 2 Nights", best: "Nature Lovers" },
    earth:    { name: "Earth Secrets — Al-Naslaa Rock", price: "400 SAR / person", duration: "1 Day",            best: "Explorers"      },
    mountain: { name: "Natural Treasures — Shada Mountain", price: "750 SAR / person", duration: "2 Days / 1 Night", best: "Hikers"    },
    water:    { name: "Water Springs — Al-Hasa Oasis", price: "450 SAR / person", duration: "1 Day",             best: "Culture Seekers"}
};

function quickDestinationSelect(value) {
    var resultDiv = document.getElementById("quickDestResult");
    if (!resultDiv) return;

    if (!value || !quickDestInfo[value]) {
        resultDiv.style.display = "none";
        return;
    }

    var info = quickDestInfo[value];
    resultDiv.style.display = "block";
    resultDiv.innerHTML =
        "<strong>" + info.name + "</strong><br>" +
        "Price: " + info.price + " &nbsp;|&nbsp; " +
        "Duration: " + info.duration + " &nbsp;|&nbsp; " +
        "Best for: " + info.best +
        "<br><br>" +
        "<a href='booking.html' style='color:#2D5A27; font-weight:600;'>Book this package &rarr;</a>";
}


// ================================================
// 9. صفحة المقارنة — تحديد الصف عند الضغط
// ================================================
function highlightRow(row) {
    // إزالة التحديد من جميع الصفوف
    var rows = document.querySelectorAll("#compTable tbody tr");
    rows.forEach(function (r) { r.classList.remove("highlighted-row"); });

    // تحديد الصف المضغوط
    row.classList.add("highlighted-row");
}


// ================================================
// 10. صفحة الغاليري — فلتر الصور + Lightbox
// ================================================
function filterGallery(category, clickedBtn) {
    // تحديث الزر النشط
    var buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(function (btn) { btn.classList.remove("active"); });
    clickedBtn.classList.add("active");

    // إخفاء/إظهار الصور حسب الفئة
    var items = document.querySelectorAll(".gallery-item");
    items.forEach(function (item) {
        if (category === "all" || item.getAttribute("data-category") === category) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });
}

function openLightbox(item) {
    var img     = item.querySelector("img");
    var caption = item.querySelector(".gallery-overlay p");

    var lightbox    = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxCap = document.getElementById("lightboxCaption");

    if (!lightbox || !img) return;

    lightboxImg.src = img.src;
    if (lightboxCap && caption) lightboxCap.textContent = caption.textContent;

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden"; // منع التمرير خلف الـ lightbox
}

function closeLightbox() {
    var lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.classList.remove("open");
    document.body.style.overflow = "";
}


// ================================================
// 11. تأثير ظهور العناصر عند التمرير (Scroll Fade-In)
// ================================================
function checkFadeIn() {
    var elements = document.querySelectorAll(".dest-card, .domain-card, .package-card, .gallery-item");
    var windowH  = window.innerHeight;

    elements.forEach(function (el) {
        var top = el.getBoundingClientRect().top;
        if (top < windowH - 60) {
            el.classList.add("fade-in", "visible");
        } else {
            el.classList.add("fade-in");
        }
    });
}

window.addEventListener("load",   checkFadeIn);
window.addEventListener("scroll", checkFadeIn);

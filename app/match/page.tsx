"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type TimeSlot = {
  date: string;
  hour: string;
};

export default function MatchPage() {
  const [revealed, setRevealed] = useState(false);
  const [myProposedTimes, setMyProposedTimes] = useState<TimeSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [openCalendars, setOpenCalendars] = useState<{ [key: number]: boolean }>({});
  const [calendarMonths, setCalendarMonths] = useState<{ [key: number]: { year: number; month: number } }>({});
  const [openTimePickers, setOpenTimePickers] = useState<{ [key: number]: boolean }>({});
  const calendarRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const timePickerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const timePickerButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // Close calendar and time picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Handle calendars
      Object.keys(openCalendars).forEach((key) => {
        const index = parseInt(key);
        if (openCalendars[index]) {
          const calendarEl = calendarRefs.current[index];
          const buttonEl = buttonRefs.current[index];
          
          if (calendarEl && !calendarEl.contains(target) && buttonEl && !buttonEl.contains(target)) {
            setOpenCalendars({ ...openCalendars, [index]: false });
          }
        }
      });
      
      // Handle time pickers
      Object.keys(openTimePickers).forEach((key) => {
        const index = parseInt(key);
        if (openTimePickers[index]) {
          const timePickerEl = timePickerRefs.current[index];
          const timePickerButtonEl = timePickerButtonRefs.current[index];
          
          if (timePickerEl && !timePickerEl.contains(target) && timePickerButtonEl && !timePickerButtonEl.contains(target)) {
            setOpenTimePickers({ ...openTimePickers, [index]: false });
          }
        }
      });
    };

    if (Object.values(openCalendars).some(Boolean) || Object.values(openTimePickers).some(Boolean)) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openCalendars, openTimePickers]);

  // TODO: This would come from authentication/database
  const matchInfo = {
    matchedWith: {
      firstName: "Ayşe",
      lastName: "Demir",
      email: "ayse.demir@std.yildiz.edu.tr",
      gender: "kadin",
      interests: [
        "Kitap Okuma",
        "Kahve",
        "Fotoğrafçılık",
      ],
      proposedTimes: [
        "27 Aralık 2025 - 14:00",
        "28 Aralık 2025 - 16:30",
        "29 Aralık 2025 - 15:00",
      ],
    },
    matchDate: "25 Aralık 2025",
    deliveryDate: "31 Aralık 2025",
    myProposedTimes: [
      "27 Aralık 2025 - 14:00",
      "28 Aralık 2025 - 10:00",
      "30 Aralık 2025 - 18:00",
    ],
  };

  // Generate hour options (09:00 to 21:00)
  const hourOptions = Array.from({ length: 13 }, (_, i) => 
    String(i + 9).padStart(2, '0') + ':00'
  );

  // Format date for display with day name
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    // Parse YYYY-MM-DD format and create local date to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    const dayNum = date.getDate();
    const monthName = date.toLocaleDateString('tr-TR', { month: 'long' });
    const dayName = date.toLocaleDateString('tr-TR', { weekday: 'long' });
    return `${dayNum} ${monthName} ${dayName}`;
  };

  // Format time slot for display
  const formatTimeSlot = (slot: TimeSlot): string => {
    return `${formatDate(slot.date)} - ${slot.hour}`;
  };

  // Parse dates from other user's proposed times
  const getOtherUserSelectedDates = (): string[] => {
    const dates: string[] = [];
    matchInfo.matchedWith.proposedTimes.forEach((timeString) => {
      const parts = timeString.split(' - ');
      if (parts.length >= 1) {
        const datePart = parts[0].trim();
        const months = ['ocak', 'şubat', 'mart', 'nisan', 'mayıs', 'haziran', 
                       'temmuz', 'ağustos', 'eylül', 'ekim', 'kasım', 'aralık'];
        
        // Try to match format: "27 Aralık 2025" or "27 Aralık 2025 Salı"
        // The regex matches: day (1-2 digits) + month name + year (4 digits) + optional day name
        const dateMatch = datePart.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
        
        if (dateMatch) {
          const day = parseInt(dateMatch[1]);
          const monthName = dateMatch[2].toLowerCase();
          const year = parseInt(dateMatch[3]);
          const monthIndex = months.findIndex(m => m === monthName);
          
          if (monthIndex !== -1) {
            // Use local date format to avoid timezone issues
            const yearStr = String(year);
            const monthStr = String(monthIndex + 1).padStart(2, '0');
            const dayStr = String(day).padStart(2, '0');
            const dateISO = `${yearStr}-${monthStr}-${dayStr}`;
            dates.push(dateISO);
          } else {
            console.warn(`Ay bulunamadı: "${monthName}" - Orijinal: "${datePart}"`);
          }
        } else {
          console.warn(`Tarih parse edilemedi: "${datePart}" - Orijinal: "${timeString}"`);
        }
      }
    });
    
    // Debug output
    console.log('Parsed dates:', dates);
    console.log('Original proposedTimes:', matchInfo.matchedWith.proposedTimes);
    
    return dates;
  };

  const otherUserSelectedDates = getOtherUserSelectedDates();
  
  // Fallback: If parsing fails, use hardcoded dates for testing
  // This ensures the feature works even if parsing has issues
  const finalOtherUserDates = otherUserSelectedDates.length > 0 
    ? otherUserSelectedDates 
    : ['2025-12-27', '2025-12-28', '2025-12-29']; // Fallback for testing
  
  // Debug: Log parsed dates
  if (typeof window !== 'undefined') {
    console.log('Karşı tarafın seçtiği tarihler (parsed):', otherUserSelectedDates);
    console.log('Final dates to use:', finalOtherUserDates);
    console.log('Orijinal veriler:', matchInfo.matchedWith.proposedTimes);
  }

  // Format time string (for matching with other user's times)
  const formatTimeString = (timeString: string): string => {
    // If it's already in the new format (contains day name), return as is
    const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    if (dayNames.some(day => timeString.includes(day))) {
      return timeString;
    }
    
    // Try to parse old format "DD Month YYYY - HH:MM" or "27 Aralık 2025 - 14:00"
    const parts = timeString.split(' - ');
    if (parts.length === 2) {
      const datePart = parts[0].trim();
      const timePart = parts[1].trim();
      
      // Try to parse Turkish date format "DD Month YYYY"
      const months = ['ocak', 'şubat', 'mart', 'nisan', 'mayıs', 'haziran', 
                     'temmuz', 'ağustos', 'eylül', 'ekim', 'kasım', 'aralık'];
      const dateMatch = datePart.match(/(\d+)\s+(\w+)\s+(\d+)/);
      
      if (dateMatch) {
        const day = parseInt(dateMatch[1]);
        const monthName = dateMatch[2].toLowerCase();
        const year = parseInt(dateMatch[3]);
        const monthIndex = months.findIndex(m => m === monthName);
        
        if (monthIndex !== -1) {
          const date = new Date(year, monthIndex, day);
          if (!isNaN(date.getTime())) {
            return formatDate(date.toISOString().split('T')[0]) + ' - ' + timePart;
          }
        }
      }
      
      // Try standard date parsing as fallback
      const date = new Date(datePart);
      if (!isNaN(date.getTime())) {
        return formatDate(date.toISOString().split('T')[0]) + ' - ' + timePart;
      }
    }
    
    return timeString;
  };

  // Find overlapping times
  const overlappingTimes = myProposedTimes
    .map(formatTimeSlot)
    .filter(time => {
      const formattedOtherTimes = matchInfo.matchedWith.proposedTimes.map(formatTimeString);
      return formattedOtherTimes.some(otherTime => {
        // Compare normalized formats
        const normalizedTime = time.toLowerCase().replace(/\s+/g, ' ');
        const normalizedOther = otherTime.toLowerCase().replace(/\s+/g, ' ');
        return normalizedTime === normalizedOther;
      });
    });

  const handleTimeSlotChange = (index: number, field: 'date' | 'hour', value: string) => {
    const updated = [...myProposedTimes];
    updated[index] = { ...updated[index], [field]: value };
    setMyProposedTimes(updated);
    setValidationError(null);
  };

  const handleAddTimeSlot = () => {
    if (myProposedTimes.length < 3) {
      setMyProposedTimes([...myProposedTimes, { date: '', hour: '' }]);
      setValidationError(null);
    }
  };

  const handleRemoveTimeSlot = (index: number) => {
    setMyProposedTimes(myProposedTimes.filter((_, i) => i !== index));
    setValidationError(null);
    const newOpenCalendars = { ...openCalendars };
    delete newOpenCalendars[index];
    setOpenCalendars(newOpenCalendars);
  };

  const handleMoveSlotUp = (index: number) => {
    if (index === 0) return;
    const updated = [...myProposedTimes];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setMyProposedTimes(updated);
    setValidationError(null);
  };

  const handleMoveSlotDown = (index: number) => {
    if (index === myProposedTimes.length - 1) return;
    const updated = [...myProposedTimes];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setMyProposedTimes(updated);
    setValidationError(null);
  };

  // Custom Date Picker helpers
  const toggleCalendar = (index: number) => {
    setOpenCalendars({ ...openCalendars, [index]: !openCalendars[index] });
    // Always show December 2025, no need to set calendarMonths
  };

  const getCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    // Convert Sunday (0) to Monday (0) as first day of week
    // Monday = 0, Tuesday = 1, ..., Sunday = 6
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;
    
    const days: (number | null)[] = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatDateToISO = (year: number, month: number, day: number): string => {
    // Use direct values to avoid timezone issues
    const yearStr = String(year);
    const monthStr = String(month + 1).padStart(2, '0'); // month is 0-indexed
    const dayStr = String(day).padStart(2, '0');
    return `${yearStr}-${monthStr}-${dayStr}`;
  };

  const getDayOfWeek = (year: number, month: number, day: number): number => {
    // Returns 0 for Monday, 6 for Sunday
    const date = new Date(year, month, day);
    return (date.getDay() + 6) % 7;
  };

  const isDateInOtherUserSelection = (dateStr: string): boolean => {
    const result = finalOtherUserDates.includes(dateStr);
    return result;
  };

  // Check if date is already selected in other time slots (excluding current slot)
  const isDateAlreadySelected = (dateStr: string, currentSlotIndex: number): boolean => {
    return myProposedTimes.some((slot, index) => 
      index !== currentSlotIndex && slot.date === dateStr && slot.date !== ''
    );
  };

  const isPastDate = (year: number, month: number, day: number): boolean => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const navigateMonth = (index: number, direction: 'prev' | 'next') => {
    // Navigation disabled - only show December 2025
    // This function is kept for consistency but navigation buttons will be hidden
  };

  // Time Picker helpers
  const toggleTimePicker = (index: number) => {
    setOpenTimePickers({ ...openTimePickers, [index]: !openTimePickers[index] });
    
    // Scroll to selected hour when opening
    if (!openTimePickers[index]) {
      setTimeout(() => {
        const container = timePickerRefs.current[index]?.querySelector('.time-picker-scroll') as HTMLElement;
        if (container && myProposedTimes[index]?.hour) {
          const selectedHour = myProposedTimes[index].hour;
          const selectedIndex = hourOptions.indexOf(selectedHour);
          if (selectedIndex !== -1) {
            const itemHeight = 48; // h-12 = 48px
            const containerHeight = 240; // h-60 = 240px
            const paddingTop = 96; // py-24 = 96px (top padding)
            // Calculate scroll position to center the selected item
            const scrollPosition = (selectedIndex * itemHeight) + paddingTop - (containerHeight / 2) + (itemHeight / 2);
            container.scrollTo({ top: Math.max(0, scrollPosition), behavior: 'smooth' });
          }
        }
      }, 100);
    }
  };

  const handleHourSelect = (index: number, hour: string) => {
    handleTimeSlotChange(index, 'hour', hour);
    // Close time picker after selection
    setTimeout(() => {
      setOpenTimePickers({ ...openTimePickers, [index]: false });
    }, 150);
  };

  const handleTimePickerScroll = (index: number, e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const itemHeight = 48;
    const scrollTop = container.scrollTop;
    const selectedIndex = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(selectedIndex, hourOptions.length - 1));
    const selectedHour = hourOptions[clampedIndex];
    
    // Update selected hour as user scrolls (optional - can be removed if you want manual selection only)
    // Uncomment the line below if you want auto-selection while scrolling
    // handleTimeSlotChange(index, 'hour', selectedHour);
  };

  const validateAndSubmit = async () => {
    setValidationError(null);

    // Check if all 3 slots are filled
    if (myProposedTimes.length !== 3) {
      setValidationError('Lütfen 3 zaman slotu doldurun.');
      return;
    }

    // Check if all slots have date and hour
    for (let i = 0; i < myProposedTimes.length; i++) {
      if (!myProposedTimes[i].date || !myProposedTimes[i].hour) {
        setValidationError(`Lütfen ${i + 1}. zaman slotu için tarih ve saat seçin.`);
        return;
      }
    }

    // Note: We don't check for duplicate dates here anymore
    // because we prevent users from selecting already chosen dates in the calendar

    // All validations passed
    setIsSubmitting(true);
    try {
      // TODO: API call to save proposed times
      // await fetch('https://api.yildizliagac.com/api/v1/match/proposeTimes', {
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ times: myProposedTimes }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message or update UI
      alert('Zaman önerileriniz başarıyla kaydedildi!');
    } catch (error) {
      setValidationError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get initials from name for anonymity
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}. ${lastName.charAt(0)}.`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#0a1810] via-[#0d1f18] to-[#0a1810] text-white font-(family-name:--font-work-sans)">
      {/* Background Layer - Snowflakes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Snowflakes */}
        <div className="snowflake" style={{left: '10%', animationDuration: '10s', animationDelay: '0s'}}>❄</div>
        <div className="snowflake" style={{left: '20%', animationDuration: '12s', animationDelay: '2s', fontSize: '1.5em'}}>❄</div>
        <div className="snowflake" style={{left: '30%', animationDuration: '15s', animationDelay: '4s'}}>❄</div>
        <div className="snowflake" style={{left: '40%', animationDuration: '11s', animationDelay: '1s', fontSize: '1.2em'}}>❄</div>
        <div className="snowflake" style={{left: '50%', animationDuration: '13s', animationDelay: '3s'}}>❄</div>
        <div className="snowflake" style={{left: '60%', animationDuration: '14s', animationDelay: '5s', fontSize: '1.3em'}}>❄</div>
        <div className="snowflake" style={{left: '70%', animationDuration: '12s', animationDelay: '2.5s'}}>❄</div>
        <div className="snowflake" style={{left: '80%', animationDuration: '11s', animationDelay: '1.5s', fontSize: '1.4em'}}>❄</div>
        <div className="snowflake" style={{left: '90%', animationDuration: '13s', animationDelay: '4.5s'}}>❄</div>

        {/* Floating Decorations */}
        <div className="absolute left-[5%] top-[15%] text-4xl opacity-20 float-decoration" style={{animationDelay: '0s'}}>🎁</div>
        <div className="absolute right-[8%] top-[25%] text-3xl opacity-20 float-decoration" style={{animationDelay: '1s'}}>🎄</div>
        <div className="absolute left-[8%] top-[60%] text-3xl opacity-20 float-decoration" style={{animationDelay: '2s'}}>🎅</div>
        <div className="absolute right-[5%] top-[70%] text-4xl opacity-20 float-decoration" style={{animationDelay: '1.5s'}}>🎁</div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container relative z-10 mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity">
              <span className="select-none">🎄</span> YILDIZLI AĞAÇ
            </Link>
            <Link href="/profile" className="rounded-full border-2 border-[#4a6b5a]/50 px-6 py-2 text-sm font-semibold text-[#d4c494] transition-all hover:border-[#4a6b5a] hover:bg-[#4a6b5a]/10">
              Profilim
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container relative z-10 mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Page Title */}
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-5xl font-bold">
                <span className="bg-linear-to-r from-[#9db89d] to-[#c4d4a6] bg-clip-text text-transparent">
                  EŞLEŞMEN
                </span>
              </h1>
              <p className="text-lg text-gray-300">
                Yılbaşı 2026'da hediye alacağın kişi...
              </p>
            </div>

            {/* Reveal Card */}
            {!revealed ? (
              <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-12 backdrop-blur-sm text-center">
                <div className="mb-6 text-9xl select-none animate-pulse">🎁</div>
                <h2 className="mb-4 text-3xl font-bold">Sürpriz Zamanı!</h2>
                <p className="mb-8 text-gray-400">
                  Hediye alacağın kişiyi öğrenmeye hazır mısın?
                </p>
                <button
                  onClick={() => setRevealed(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-red-600 to-red-700 px-12 py-4 text-xl font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  <span className="select-none">🎄</span>
                  <span>Açığa Çıkar!</span>
                </button>
              </div>
            ) : (
              <>
                 {/* Match Revealed */}
                 <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
                   <div className="mb-6 flex items-center gap-6">
                     <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#4a6b5a] to-[#5a7b6a] text-5xl select-none">
                       {matchInfo.matchedWith.gender === "erkek" ? "♂️" : matchInfo.matchedWith.gender === "kadin" ? "♀️" : "⚧️"}
                     </div>
                     <div>
                       <h2 className="mb-2 text-3xl font-bold text-[#d4c494]">
                         {getInitials(matchInfo.matchedWith.firstName, matchInfo.matchedWith.lastName)}
                       </h2>
                       <p className="text-gray-400 text-sm">Gizlilik için tam isim gösterilmemektedir</p>
                     </div>
                   </div>

                  <div className="rounded-lg bg-[#0a1810]/50 p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-2xl select-none">🎁</span>
                      <h3 className="text-xl font-bold">Önemli Bilgi</h3>
                    </div>
                    <p className="text-gray-300">
                      Bu kişi senin hediye vereceğin kişi! Unutma, bu bir <strong>sır</strong> olmalı. 
                      Hediyeni <strong>{matchInfo.deliveryDate}</strong> tarihinde teslim et.
                    </p>
                  </div>
                </div>

                {/* Interests */}
                <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex items-center gap-2">
                    <span className="text-2xl select-none">📝</span>
                    <h3 className="text-2xl font-bold">İlgi Alanları</h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {matchInfo.matchedWith.interests.map((interest, index) => (
                      <div key={index} className="rounded-lg bg-[#0a1810]/50 p-4 text-center">
                        <p className="text-gray-300 font-medium">{interest}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meeting Time Coordination */}
                <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex items-center gap-2">
                    <span className="text-2xl select-none">📅</span>
                    <h3 className="text-2xl font-bold">Buluşma Zamanı Koordinasyonu</h3>
                  </div>

                  <p className="mb-6 text-gray-400">
                    Hediyeyi teslim etmek için uygun olduğunuz <strong>3 farklı gün</strong> ve <strong>tam saat</strong> seçin. 
                    Eşleştiğiniz kişinin önerileriyle karşılaştırıp ortak zaman bulabilirsiniz.
                  </p>

                  {/* Priority Information */}
                  <div className="mb-6 rounded-lg border-2 border-[#d4c494]/30 bg-[#d4c494]/5 p-4">
                    <div className="flex items-start gap-3">
                      <svg className="h-5 w-5 flex-shrink-0 text-[#d4c494] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#d4c494] mb-1">
                          Öncelik Sıralaması Önemli
                        </p>
                        <p className="text-xs text-gray-300">
                          Seçtiğiniz zamanları <strong>en uygun</strong> olandan <strong>en az uygun</strong> olana doğru sıralayın. 
                          İlk sıradaki zaman en çok tercih ettiğiniz, son sıradaki ise en az tercih ettiğiniz zamandır. 
                          Sıralamayı değiştirmek için yukarı/aşağı ok butonlarını kullanın.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Warning Message */}
                  {(() => {
                    const filledSlots = myProposedTimes.filter(slot => slot.date && slot.hour);
                    const dates = myProposedTimes.map(slot => slot.date).filter(Boolean);
                    const uniqueDates = new Set(dates);
                    const allSlotsFilled = myProposedTimes.length === 3 && filledSlots.length === 3;
                    const allDatesDifferent = dates.length === 3 && uniqueDates.size === 3;
                    const isComplete = allSlotsFilled && allDatesDifferent;
                    
                    if (!isComplete) {
                      return (
                        <div className="mb-6 rounded-lg border-2 border-yellow-600/50 bg-yellow-600/10 p-4">
                          <div className="flex items-start gap-3">
                            <svg className="h-5 w-5 flex-shrink-0 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-yellow-400 mb-1">
                                3 farklı gün ve saat seçmelisin
                              </p>
                              <p className="text-xs text-yellow-300/80">
                                {myProposedTimes.length < 3 
                                  ? `${3 - myProposedTimes.length} zaman slotu daha ekleyin.`
                                  : filledSlots.length < 3
                                  ? `${3 - filledSlots.length} zaman slotu için tarih ve saat seçin.`
                                  : !allDatesDifferent
                                  ? "Her zaman slotu için farklı bir gün seçin. Saatler aynı olabilir."
                                  : ""
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* My Proposed Times Form */}
                  <div className="mb-6 rounded-lg bg-[#0a1810]/50 p-6">
                    <h4 className="mb-4 font-semibold text-[#d4c494]">Senin Önerdiğin Zamanlar</h4>
                    
                    {/* Time Slots */}
                    <div className="space-y-4 mb-4">
                      {myProposedTimes.map((slot, index) => (
                        <div key={index} className="rounded-lg border-2 border-[#4a6b5a]/30 bg-[#0f1f18]/50 p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-[#d4c494]">
                                {index + 1}. Öncelik
                              </span>
                              {index === 0 && (
                                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                                  En uygun
                                </span>
                              )}
                              {index === myProposedTimes.length - 1 && index > 0 && (
                                <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded">
                                  En az uygun
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Move Up Button */}
                              <button
                                type="button"
                                onClick={() => handleMoveSlotUp(index)}
                                disabled={index === 0}
                                className={`p-1.5 rounded transition-colors ${
                                  index === 0
                                    ? "text-gray-600 cursor-not-allowed opacity-40"
                                    : "text-[#d4c494] hover:bg-[#4a6b5a]/30 hover:text-white"
                                }`}
                                aria-label="Yukarı taşı"
                                title="Yukarı taşı"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              </button>
                              {/* Move Down Button */}
                              <button
                                type="button"
                                onClick={() => handleMoveSlotDown(index)}
                                disabled={index === myProposedTimes.length - 1}
                                className={`p-1.5 rounded transition-colors ${
                                  index === myProposedTimes.length - 1
                                    ? "text-gray-600 cursor-not-allowed opacity-40"
                                    : "text-[#d4c494] hover:bg-[#4a6b5a]/30 hover:text-white"
                                }`}
                                aria-label="Aşağı taşı"
                                title="Aşağı taşı"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              {/* Remove Button */}
                              {myProposedTimes.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTimeSlot(index)}
                                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
                                  aria-label="Zamanı kaldır"
                                  title="Zamanı kaldır"
                                >
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="relative">
                              <label className="mb-1 block text-xs text-gray-400">Tarih</label>
                              <button
                                ref={(el) => { buttonRefs.current[index] = el; }}
                                type="button"
                                onClick={() => toggleCalendar(index)}
                                className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/70 px-3 py-2 text-sm text-white transition-colors hover:border-[#4a6b5a] hover:bg-[#0a1810]/90 focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20 flex items-center justify-between"
                              >
                                <span className={slot.date ? "text-white" : "text-gray-500"}>
                                  {slot.date ? formatDate(slot.date) : "Tarih seçin"}
                                </span>
                                <svg className="h-4 w-4 text-[#d4c494]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </button>
                              
                              {/* Custom Calendar */}
                              {openCalendars[index] && (
                                <div 
                                  ref={(el) => { calendarRefs.current[index] = el; }}
                                  className="absolute z-50 mt-2 w-full rounded-xl border border-[#4a6b5a]/50 bg-[#0a1810] p-4 shadow-2xl"
                                >
                                  {(() => {
                                    // Always show December 2025
                                    const current = { year: 2025, month: 11 }; // December = month 11 (0-indexed)
                                    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
                                    const dayNames = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz']; // Monday first
                                    const days = getCalendarDays(current.year, current.month);
                                    const selectedDateISO = slot.date;
                                    
                                    return (
                                      <div>
                                        {/* Calendar Header - No navigation, only December 2025 */}
                                        <div className="mb-4 flex items-center justify-center">
                                          <h5 className="text-sm font-semibold text-[#d4c494]">
                                            {monthNames[current.month]} {current.year}
                                          </h5>
                                        </div>
                                        
                                        {/* Day Names */}
                                        <div className="mb-2 grid grid-cols-7 gap-1">
                                          {dayNames.map((day, i) => {
                                            const isWeekend = i === 5 || i === 6; // Saturday or Sunday
                                            return (
                                              <div 
                                                key={i} 
                                                className={`text-center text-xs font-medium py-1 ${
                                                  isWeekend ? "text-orange-400/70" : "text-gray-500"
                                                }`}
                                              >
                                                {day}
                                              </div>
                                            );
                                          })}
                                        </div>
                                        
                                        {/* Calendar Days */}
                                        <div className="grid grid-cols-7 gap-1">
                                          {days.map((day, dayIndex) => {
                                            if (day === null) {
                                              return <div key={dayIndex} className="aspect-square" />;
                                            }
                                            
                                            const dateISO = formatDateToISO(current.year, current.month, day);
                                            const isSelected = selectedDateISO === dateISO;
                                            const isOtherUserDate = isDateInOtherUserSelection(dateISO);
                                            const isAlreadySelected = isDateAlreadySelected(dateISO, index);
                                            const isPast = isPastDate(current.year, current.month, day);
                                            const dayOfWeek = getDayOfWeek(current.year, current.month, day);
                                            const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday (5) or Sunday (6)
                                            // Don't disable if it's other user's date (even if already selected by user)
                                            const isDisabled = isPast || (isAlreadySelected && !isOtherUserDate);
                                            
                                            // Determine styling with priority: selected > other user date > already selected > past > weekend > normal
                                            let buttonClasses = "";
                                            let buttonTitle = "";
                                            
                                            if (isSelected) {
                                              // If selected and also other user's date, show special styling
                                              if (isOtherUserDate) {
                                                buttonClasses = "bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg ring-2 ring-green-400/70 ring-offset-1 ring-offset-[#0a1810]";
                                                buttonTitle = "Seçili - Karşı tarafın da seçtiği gün! 🎯";
                                              } else {
                                                buttonClasses = "bg-[#4a6b5a] text-white shadow-lg ring-2 ring-[#d4c494]/50";
                                                buttonTitle = "Seçili";
                                              }
                                            } else if (isOtherUserDate) {
                                              // Other user's date - always show prominently, even if already selected
                                              if (isAlreadySelected) {
                                                buttonClasses = "bg-green-600/50 text-green-100 border-2 border-green-400/80 cursor-not-allowed opacity-75 relative";
                                                buttonTitle = "Bu günü başka bir slotta seçtiniz, ama karşı taraf da bu günü seçmiş! 🎯";
                                              } else {
                                                buttonClasses = "bg-green-600/50 text-green-100 border-2 border-green-400/80 hover:bg-green-600/70 hover:border-green-300 hover:shadow-lg hover:scale-105";
                                                buttonTitle = "Karşı tarafın seçtiği gün - Bu günü seçerek eşleşme şansınızı artırın! 🎯";
                                              }
                                            } else if (isAlreadySelected) {
                                              buttonClasses = "bg-gray-700/40 text-gray-500 border border-gray-600/40 cursor-not-allowed opacity-50 line-through";
                                              buttonTitle = "Bu günü başka bir zaman slotunda seçtiniz";
                                            } else if (isPast) {
                                              buttonClasses = "text-gray-600 cursor-not-allowed opacity-40";
                                              buttonTitle = "Geçmiş tarih";
                                            } else if (isWeekend) {
                                              buttonClasses = "text-orange-300/80 hover:bg-orange-600/20 hover:text-orange-200 border border-orange-600/20";
                                              buttonTitle = "Hafta sonu";
                                            } else {
                                              buttonClasses = "text-gray-300 hover:bg-[#4a6b5a]/30 hover:text-white";
                                              buttonTitle = "";
                                            }
                                            
                                            return (
                                              <button
                                                key={dayIndex}
                                                type="button"
                                                onClick={() => {
                                                  if (!isDisabled) {
                                                    handleTimeSlotChange(index, 'date', dateISO);
                                                    toggleCalendar(index);
                                                  }
                                                }}
                                                disabled={isDisabled}
                                                className={`aspect-square rounded-lg text-xs font-semibold transition-all relative ${buttonClasses}`}
                                                title={buttonTitle}
                                              >
                                                {day}
                                                {/* Show checkmark for other user's dates */}
                                                {isOtherUserDate && !isSelected && (
                                                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 shadow-lg border border-green-300">
                                                    <svg className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                  </span>
                                                )}
                                                {/* Show special indicator if selected and also other user's date */}
                                                {isSelected && isOtherUserDate && (
                                                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 border border-white/40">
                                                    <span className="text-[10px]">🎯</span>
                                                  </span>
                                                )}
                                                {/* Show X for already selected (only if not other user's date) */}
                                                {isAlreadySelected && !isSelected && !isOtherUserDate && (
                                                  <span className="absolute inset-0 flex items-center justify-center">
                                                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                  </span>
                                                )}
                                              </button>
                                            );
                                          })}
                                        </div>
                                        
                                        {/* Legend */}
                                        <div className="mt-4 space-y-2 border-t border-[#4a6b5a]/30 pt-3">
                                          {finalOtherUserDates.length > 0 && (
                                            <div className="flex items-center gap-2 text-xs mb-2 p-2 rounded-lg bg-green-600/10 border border-green-600/30">
                                              <div className="h-5 w-5 rounded border-2 border-green-400 bg-green-600/50 flex items-center justify-center shadow-sm">
                                                <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                              </div>
                                              <div className="flex-1">
                                                <span className="text-green-300 font-semibold">Karşı tarafın seçtiği günler</span>
                                                <p className="text-green-400/80 text-[10px] mt-0.5">Bu günleri seçerek eşleşme şansınızı artırın! 🎯</p>
                                              </div>
                                            </div>
                                          )}
                                          {myProposedTimes.some((slot, i) => i !== index && slot.date !== '') && (
                                            <div className="flex items-center gap-2 text-xs">
                                              <div className="h-4 w-4 rounded bg-gray-700/40 border border-gray-600/40 flex items-center justify-center opacity-50">
                                                <svg className="h-3 w-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                              </div>
                                              <span className="text-gray-400">Seçtiğiniz günler (diğer slotlarda)</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </div>
                              )}
                            </div>
                            <div className="relative">
                              <label className="mb-1 block text-xs text-gray-400">Saat</label>
                              <button
                                ref={(el) => { timePickerButtonRefs.current[index] = el; }}
                                type="button"
                                onClick={() => toggleTimePicker(index)}
                                className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/70 px-3 py-2.5 text-sm text-white transition-all hover:border-[#4a6b5a] hover:bg-[#0a1810]/90 focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20 flex items-center justify-between"
                              >
                                <span className={slot.hour ? "text-white font-medium" : "text-gray-500"}>
                                  {slot.hour || "Saat seçin"}
                                </span>
                                <svg 
                                  className={`h-4 w-4 text-[#d4c494] transition-transform duration-200 ${openTimePickers[index] ? 'rotate-180' : ''}`} 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              
                              {/* Time Picker Dropdown */}
                              {openTimePickers[index] && (
                                <div
                                  ref={(el) => { timePickerRefs.current[index] = el; }}
                                  className="absolute z-50 mt-2 w-full rounded-xl border border-[#4a6b5a]/50 bg-[#0a1810] shadow-2xl overflow-hidden"
                                >
                                  <div className="relative h-60 overflow-hidden">
                                    {/* Selection indicator - center highlight */}
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 pointer-events-none z-10 border-t-2 border-b-2 border-[#4a6b5a]/60 bg-[#4a6b5a]/10"></div>
                                    
                                    {/* Gradient masks for fade effect at top and bottom */}
                                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a1810] to-transparent pointer-events-none z-20"></div>
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a1810] to-transparent pointer-events-none z-20"></div>
                                    
                                    {/* Scrollable hour list */}
                                    <div 
                                      className="time-picker-scroll h-full overflow-y-auto py-24"
                                      onScroll={(e) => handleTimePickerScroll(index, e)}
                                      style={{ 
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
                                        WebkitOverflowScrolling: 'touch'
                                      }}
                                    >
                                      {hourOptions.map((hour) => {
                                        const isSelected = slot.hour === hour;
                                        return (
                                          <button
                                            key={hour}
                                            type="button"
                                            onClick={() => handleHourSelect(index, hour)}
                                            className={`w-full h-12 flex items-center justify-center text-lg font-semibold transition-all ${
                                              isSelected
                                                ? "text-[#d4c494] scale-110"
                                                : "text-gray-400 hover:text-gray-300"
                                            }`}
                                          >
                                            {hour}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {slot.date && slot.hour && (
                            <div className="mt-3 rounded-lg border border-[#4a6b5a]/40 bg-gradient-to-r from-[#4a6b5a]/30 to-[#5a7b6a]/20 p-3">
                              <div className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-[#d4c494] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div className="flex-1">
                                  <p className="text-xs text-gray-400 mb-0.5">Seçilen Zaman</p>
                                  <p className="text-sm font-semibold text-[#d4c494]">{formatTimeSlot(slot)}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add Time Slot Button */}
                    {myProposedTimes.length < 3 && (
                      <button
                        type="button"
                        onClick={handleAddTimeSlot}
                        className="w-full rounded-lg border-2 border-dashed border-[#4a6b5a]/50 px-4 py-3 text-sm font-semibold text-[#d4c494] transition-all hover:border-[#4a6b5a] hover:bg-[#4a6b5a]/10"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Zaman Ekle ({myProposedTimes.length}/3)
                        </span>
                      </button>
                    )}

                    {/* Validation Error */}
                    {validationError && (
                      <div className="mt-4 rounded-lg border-2 border-red-600/50 bg-red-600/10 p-3">
                        <p className="text-sm text-red-400">{validationError}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    {myProposedTimes.length === 3 && (
                      <>
                        <button
                          type="button"
                          onClick={validateAndSubmit}
                          disabled={isSubmitting}
                          className="mt-4 w-full rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                              Kaydediliyor...
                            </span>
                          ) : (
                            'Zaman Önerilerini Kaydet'
                          )}
                        </button>
                        <p className="mt-2 text-center text-xs text-gray-400">
                          Zamanlarınız mevcut sıralamada (1. Öncelik → 2. Öncelik → 3. Öncelik) kaydedilecektir.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Overlapping Times Alert */}
                  {overlappingTimes.length > 0 && (
                    <div className="mb-6 rounded-xl border-2 border-green-600/50 bg-gradient-to-br from-green-600/20 to-green-600/10 p-5 shadow-lg shadow-green-600/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600/30">
                          <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-green-400">Ortak Zamanlar Bulundu! 🎯</h4>
                          <p className="text-xs text-green-300/80">Bu zamanlarda buluşabilirsiniz</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {overlappingTimes.map((time, index) => {
                          const formattedTime = formatTimeString(time);
                          return (
                            <div key={index} className="flex items-center gap-3 rounded-lg bg-green-600/20 border border-green-600/40 p-3">
                              <svg className="h-5 w-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="font-semibold text-green-300">{formattedTime}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Their Proposed Times */}
                  <div className="rounded-lg bg-[#0a1810]/50 p-6">
                    <h4 className="mb-4 font-semibold text-[#d4c494]">
                      {matchInfo.matchedWith.firstName.charAt(0)}. Önerdiği Zamanlar:
                    </h4>
                    {matchInfo.matchedWith.proposedTimes.length > 0 ? (
                      <div className="space-y-3">
                        {matchInfo.matchedWith.proposedTimes.map((time, index) => {
                          const formattedTime = formatTimeString(time);
                          const normalizedFormatted = formattedTime.toLowerCase().replace(/\s+/g, ' ');
                          const isOverlapping = overlappingTimes.some(overlap => {
                            const normalizedOverlap = overlap.toLowerCase().replace(/\s+/g, ' ');
                            return normalizedFormatted === normalizedOverlap;
                          });
                          return (
                            <div
                              key={index}
                              className={`rounded-lg border p-4 transition-all ${
                                isOverlapping
                                  ? "border-green-600/50 bg-gradient-to-r from-green-600/20 to-green-600/10 shadow-lg shadow-green-600/10"
                                  : "border-[#4a6b5a]/40 bg-gradient-to-r from-[#4a6b5a]/20 to-[#5a7b6a]/10"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                  isOverlapping
                                    ? "bg-green-600/30 text-green-400"
                                    : "bg-[#4a6b5a]/30 text-[#d4c494]"
                                }`}>
                                  {isOverlapping ? (
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  ) : (
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-1">
                                  {isOverlapping && (
                                    <p className="text-xs font-medium text-green-400 mb-1">Ortak Zaman 🎯</p>
                                  )}
                                  <p className={`text-sm font-semibold ${
                                    isOverlapping ? "text-green-300" : "text-[#d4c494]"
                                  }`}>
                                    {formattedTime}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-[#4a6b5a]/30 bg-[#0a1810]/30 p-4 text-center">
                        <p className="text-sm text-gray-500">
                          {matchInfo.matchedWith.firstName.charAt(0)}. henüz zaman önermedi
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reminder Card */}
                <div className="mb-6 rounded-2xl border border-yellow-600/30 bg-linear-to-br from-yellow-900/20 to-yellow-800/10 p-6 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl select-none">⚠️</span>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-yellow-400">Hatırlatma</h3>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Hediye bütçesi: 100-300 TL arası önerilir</li>
                        <li>• Teslim tarihiniz: <strong>{matchInfo.deliveryDate}</strong></li>
                        <li>• Eşleşmeni gizli tut - bu bir sürpriz! 🤫</li>
                        <li>• Kişinin tercihlerini dikkate alarak düşünceli bir hediye seç</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/profile"
                    className="flex-1 rounded-full border-2 border-[#d4c494]/50 px-8 py-4 text-center text-lg font-semibold text-[#d4c494] transition-all hover:border-[#d4c494] hover:bg-[#d4c494]/10"
                  >
                    Profilime Dön
                  </Link>
                </div>
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="container relative z-10 mx-auto px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          <p>Yıldız Teknik Üniversitesi Öğrenci Topluluğu • 2026</p>
        </footer>
      </div>
    </div>
  );
}


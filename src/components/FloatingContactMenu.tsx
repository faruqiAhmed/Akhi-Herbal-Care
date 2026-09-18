import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OFFICIAL_DISPLAY_PHONE, OFFICIAL_WHATSAPP_PHONE } from '../data/ugcFeeds';

// WhatsApp SVG Icon matching exact official WhatsApp glyph
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg 
    viewBox="0 0 32 32" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.656.766 5.141 2.1 7.25L3 29.5l6.453-1.562C11.453 28.984 13.672 29.5 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm7.813 18.781c-.328.922-1.641 1.766-2.656 1.984-.703.141-1.625.266-4.703-1.016-3.938-1.641-6.484-5.641-6.688-5.906-.188-.266-1.609-2.141-1.609-4.078 0-1.953 1.016-2.906 1.375-3.313.359-.406.781-.516 1.047-.516.266 0 .531.016.766.031.25.016.578-.094.906.688.328.781 1.125 2.75 1.219 2.953.094.203.156.453.031.719-.125.266-.188.422-.375.641-.188.219-.406.484-.578.656-.188.188-.391.406-.172.781.219.375.984 1.625 2.109 2.625 1.453 1.297 2.672 1.703 3.063 1.891.391.188.625.156.859-.109.234-.266 1-1.172 1.266-1.578.266-.406.531-.344.906-.203.375.141 2.375 1.125 2.781 1.328.406.203.688.313.781.484.109.188.109 1.047-.219 1.969z"/>
  </svg>
);

// Rounded chat bubble SVG matching purple icon in reference screenshot
const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const FloatingContactMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cleanWhatsAppNumber = OFFICIAL_WHATSAPP_PHONE.replace('+', '');
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Akhi Herbal Care! I want to consult about hair care products and place an order.')}`;
  const callUrl = `tel:${OFFICIAL_DISPLAY_PHONE}`;

  return (
    <div 
      id="floating-contact-menu"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center select-none"
    >
      {/* Expanded Child Buttons when isOpen is TRUE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="expanded-contact-options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3.5 mb-3.5"
          >
            {/* 1. Direct Phone Call Button (Blue circular button) */}
            <motion.a
              id="floating-call-btn"
              href={callUrl}
              initial={{ scale: 0, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 15, opacity: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 420, 
                damping: 24, 
                delay: 0.05 
              }}
              whileHover={{ scale: 1.12, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.92 }}
              className="w-14 h-14 rounded-full bg-[#2575FC] hover:bg-[#1A64E0] text-white shadow-xl flex items-center justify-center relative group"
              title={`Direct Phone Call: ${OFFICIAL_DISPLAY_PHONE}`}
              aria-label={`Call ${OFFICIAL_DISPLAY_PHONE}`}
            >
              <Phone className="w-6 h-6 stroke-[2.2]" />
              
              {/* Tooltip with subtle slide-in animation */}
              <motion.span 
                initial={{ opacity: 0, x: 5 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-16 px-3 py-1 bg-gray-900/90 backdrop-blur-xs text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md"
              >
                কল করুন ({OFFICIAL_DISPLAY_PHONE})
              </motion.span>
            </motion.a>

            {/* 2. WhatsApp Button (Vibrant Green with notification badge) */}
            <motion.a
              id="floating-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 10, opacity: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 420, 
                damping: 24 
              }}
              whileHover={{ scale: 1.12, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.92 }}
              className="w-14 h-14 rounded-full bg-[#00D757] hover:bg-[#00BF4D] text-white shadow-xl flex items-center justify-center relative group"
              title="Chat with us on WhatsApp"
              aria-label="WhatsApp live chat"
            >
              <WhatsAppIcon className="w-8 h-8" />

              {/* Glowing notification badge dot */}
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#85FF9E] ring-2 ring-white">
                <span className="absolute inset-0 rounded-full bg-[#85FF9E] animate-ping opacity-75" />
              </span>

              {/* Tooltip */}
              <span className="absolute right-16 px-3 py-1 bg-gray-900/90 backdrop-blur-xs text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
                WhatsApp এ মেসেজ দিন
              </span>
            </motion.a>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button with Ambient Pulse and Spring Toggle Animation */}
      <div className="relative">
        {/* Soft Ambient Pulse Ring when button is closed to catch user attention */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.25, 1.4],
              opacity: [0.6, 0.25, 0]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute inset-0 rounded-full bg-[#A845F7] -z-10"
          />
        )}

        <motion.button
          id="floating-contact-trigger-btn"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={{
            rotate: isOpen ? 90 : 0,
            backgroundColor: isOpen ? '#FF2E44' : '#A845F7',
          }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 22
          }}
          className="w-15 h-15 rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer relative z-10"
          aria-label={isOpen ? "Close contact options" : "Open quick contact options"}
          title={isOpen ? "Close menu" : "Quick Contact & WhatsApp"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <X className="w-7 h-7 stroke-[2.8]" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center relative"
              >
                <ChatBubbleIcon className="w-7 h-7 text-white" />
                
                {/* Small light purple badge on top-right corner */}
                <motion.span 
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D8B4FE] ring-2 ring-white shadow-xs" 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

    </div>
  );
};

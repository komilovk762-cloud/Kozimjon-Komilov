import { Instagram, Send, Phone, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef } from 'react';

export default function App() {
  const [profileImage, setProfileImage] = useState<string>("input_file_0.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center space-y-10"
      >
        {/* Profile Picture with Upload */}
        <div className="flex justify-center">
          <div className="relative group cursor-pointer" onClick={triggerUpload}>
            <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-10 group-hover:opacity-40 transition duration-500" />
            <div className="relative w-52 h-52 rounded-full overflow-hidden border-[4px] border-stone-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src={profileImage} 
                alt="Kozimjon Komilov" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center flex-col gap-2 text-white">
                <Camera size={24} />
                <span className="text-[10px] uppercase font-bold tracking-widest text-center px-4">Change Portrait</span>
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>
        </div>

        {/* Name */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-100 transition-all duration-300 hover:text-white">
            Kozimjon Komilov
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-stone-700 to-transparent mx-auto" />
        </div>

        {/* Buttons - Circular & Horizontal */}
        <div className="flex flex-row justify-center items-center gap-8">
          <SocialLink 
            href="https://instagram.com/mr_komi1ov" 
            icon={<Instagram size={24} />} 
            label="Instagram" 
            bgColor="bg-white"
            textColor="text-black"
          />
          <SocialLink 
            href="https://t.me/Mr_Komi1ov" 
            icon={<Send size={24} />} 
            label="Telegram" 
            bgColor="bg-stone-800"
            textColor="text-white"
            borderColor="border-stone-700"
          />
          <SocialLink 
            href="tel:+998200050533" 
            icon={<Phone size={24} />} 
            label="Contact" 
            bgColor="bg-stone-900"
            textColor="text-stone-400"
            borderColor="border-stone-800"
          />
        </div>

        {/* Footer */}
        <footer className="pt-20">
          <p className="text-stone-700 text-[10px] uppercase tracking-[0.4em] font-light">
            Personal Portfolio • 2026
          </p>
        </footer>
      </motion.div>
    </div>
  );
}

function SocialLink({ 
  href, 
  icon, 
  label, 
  bgColor, 
  textColor, 
  borderColor = "border-transparent" 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  bgColor: string; 
  textColor: string;
  borderColor?: string;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('tel:') ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.15, y: -6 }}
      whileTap={{ scale: 0.9 }}
      className={`
        flex items-center justify-center w-16 h-16 
        rounded-full transition-all duration-300
        border shadow-lg hover:shadow-white/5
        ${bgColor} ${textColor} ${borderColor}
      `}
    >
      {icon}
    </motion.a>
  );
}


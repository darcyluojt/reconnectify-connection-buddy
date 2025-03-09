
import { User } from 'lucide-react';

interface ProfileImageProps {
  imageUrl?: string;
  name: string;
  className?: string;
}

const ProfileImage = ({ imageUrl, name, className = "w-12 h-12" }: ProfileImageProps) => {
  return (
    <div className={`${className} rounded-full overflow-hidden border-2 border-white shadow-subtle flex-shrink-0`}>
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=e8f5fe&color=3d9cf0&rounded=true';
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-ohhey-light text-ohhey-blue">
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default ProfileImage;

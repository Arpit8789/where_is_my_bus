import { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { compressImage } from '@/utils/helpers';
import toast from 'react-hot-toast';

const PhotoUpload = ({ photo, onPhotoChange }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      // Compress image
      const compressed = await compressImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onPhotoChange(reader.result);
      };
      reader.readAsDataURL(compressed);
    } catch (error) {
      toast.error('Failed to process image');
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Photo (Optional) <span className="text-gray-500">+5 bonus points</span>
      </label>

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary-500 transition-colors"
          >
            <Camera className="h-12 w-12 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Click to upload photo</span>
            <span className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;

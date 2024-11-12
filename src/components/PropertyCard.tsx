// import * as React from 'react';
// import { MapPin, Bed, Bath, Square } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import ImageCarousel from './ImageCarousel';

// interface PropertyCardProps {
//   id: string;
//   title: string;
//   location: string;
//   price: string;
//   mainImage: string;
//   images: string[];
//   beds: number | null;
//   baths: number;
//   sqft: number;
//   type: string;
//   status: 'active' | 'pending' | 'sold';
// }

// export default function PropertyCard({
//   id,
//   title,
//   location,
//   price,
//   mainImage,
//   images,
//   beds,
//   baths,
//   sqft,
//   type,
//   status
// }: PropertyCardProps) {
//   const { t } = useTranslation();
// <
//   return (
//     <Link to={`/property/${id}`}>
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
//         <div className="relative">
//           <ImageCarousel images={[mainImage, ...images]} alt={title} />
//           <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm">
//             {t(`hero.propertyType.${type.toLowerCase()}`)}
//           </div>
//           {status !== 'active' && (
//             <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm uppercase">
//               {status}
//             </div>
//           )}
//         </div>
        
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-4">
//             <h3 className="text-xl font-semibold">{title}</h3>
//             <p className="text-lg font-bold text-gray-900">{price}</p>
//           </div>
          
//           <div className="flex items-center text-gray-600 mb-4">
//             <MapPin className="h-4 w-4 mr-2" />
//             <p>{location}</p>
//           </div>
          
//           <div className="flex justify-between text-gray-600">
//             {beds !== null && (
//               <div className="flex items-center">
//                 <Bed className="h-4 w-4 mr-1" />
//                 <span>{beds} {t('property.beds')}</span>
//               </div>
//             )}
//             <div className="flex items-center">
//               <Bath className="h-4 w-4 mr-1" />
//               <span>{baths} {t('property.baths')}</span>
//             </div>
//             <div className="flex items-center">
//               <Square className="h-4 w-4 mr-1" />
//               <span>{sqft} {t('property.sqft')}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

import * as React from 'react';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageCarousel from './ImageCarousel';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // Assicurati che il percorso sia corretto

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  mainImage: string;
  images: string[];
  beds: number | null;
  baths: number;
  sqft: number;
  type: string;
  status: 'active' | 'pending' | 'sold';
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  mainImage,
  images,
  beds,
  baths,
  sqft,
  type,
  status
}: PropertyCardProps) {
  const { t } = useTranslation();
  const [dynamicTitle, setDynamicTitle] = React.useState<string | null>(title);

  React.useEffect(() => {
    const fetchTitle = async () => {
      try {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDynamicTitle(docSnap.data().title);
        } else {
          console.log("Documento non trovato!");
        }
      } catch (error) {
        console.error("Errore durante il recupero del titolo:", error);
      }
    };

    fetchTitle();
  }, [id]);

  return (
    <Link to={`/property/${id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="relative">
          <ImageCarousel images={[mainImage, ...images]} alt={dynamicTitle || title} />
          <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm">
            {t(`hero.propertyType.${type.toLowerCase()}`)}
          </div>
          {status !== 'active' && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm uppercase">
              {status}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{dynamicTitle || title}</h3>
            <p className="text-lg font-bold text-gray-900">{price}</p>
          </div>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            <p>{location}</p>
          </div>
          
          <div className="flex justify-between text-gray-600">
            {beds !== null && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{beds} {t('property.beds')}</span>
              </div>
            )}
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{baths} {t('property.baths')}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{sqft} {t('property.sqft')}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

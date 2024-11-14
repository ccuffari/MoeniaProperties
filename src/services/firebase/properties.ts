import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  type DocumentData
} from 'firebase/firestore';
import { db } from './index';
import type { Property } from '../../store/propertyStore';

const PROPERTIES_COLLECTION = 'properties';

export async function getProperties(): Promise<Property[]> {
  try {
    const propertiesRef = collection(db, PROPERTIES_COLLECTION);
    const q = query(propertiesRef, orderBy('admin.table.status', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        property: data['admin.table.property'] || '',
        status: data['admin.table.status'] || 'active',
        prize: data['admin.table.prize'] || '',
        googleMapsLink: data['admin.table.googleMapsLink'] || '',
        description: data['admin.table.description'] || '',
        size: data['admin.table.size'] || 0,
        rooms: data['admin.table.rooms'] || 0,
        floor: data['admin.table.floor'] || 0,
        contacts: data['admin.table.contacts'] || ''
      } as Property;
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const propertyRef = doc(db, PROPERTIES_COLLECTION, id);
    const propertyDoc = await getDoc(propertyRef);
    
    if (!propertyDoc.exists()) {
      return null;
    }

    return {
      id: propertyDoc.id,
      ...propertyDoc.data()
    } as Property;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
}

export async function addProperty(property: Omit<Property, 'id'>): Promise<Property> {
  try {
    const propertiesRef = collection(db, PROPERTIES_COLLECTION);
    const docRef = await addDoc(propertiesRef, {
      ...property,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      ...property
    };
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<void> {
  try {
    const propertyRef = doc(db, PROPERTIES_COLLECTION, id);
    await updateDoc(propertyRef, {
      ...property,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
}

export async function deleteProperty(id: string): Promise<void> {
  try {
    const propertyRef = doc(db, PROPERTIES_COLLECTION, id);
    await deleteDoc(propertyRef);
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
}

export async function getFilteredProperties(filters: {
  searchTerm?: string;
  status?: string;
  prizeRange?: string;
  location?: string;
}): Promise<Property[]> {
  try {
    let q = query(collection(db, PROPERTIES_COLLECTION));

    if (filters.status) {
      q = query(q, where('admin.table.status', '==', filters.status));
    }

    if (filters.location) {
      q = query(q, where('admin.table.googleMapsLink', '==', filters.location));
    }

    const snapshot = await getDocs(q);
    let properties = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));

    // Filtraggio lato client per searchTerm e prizeRange
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      properties = properties.filter(property =>
        property.property.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.prizeRange) {
      const [min, max] = filters.prizeRange.split('-').map(Number);
      properties = properties.filter(property => {
        const prize = parseInt(property.prize.replace(/[^0-9]/g, ''));
        return prize >= min && (!max || prize <= max);
      });
    }

    return properties;
  } catch (error) {
    console.error('Error fetching filtered properties:', error);
    throw error;
  }
}

// Inizializzazione dati di esempio se necessario
export async function initializeSampleProperties(sampleProperties: Property[]): Promise<void> {
  try {
    const snapshot = await getDocs(collection(db, PROPERTIES_COLLECTION));
    if (snapshot.empty) {
      const batch = db.batch();
      
      sampleProperties.forEach(property => {
        const docRef = doc(collection(db, PROPERTIES_COLLECTION));
        batch.set(docRef, {
          ...property,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      });

      await batch.commit();
      console.log('Sample properties initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing sample properties:', error);
    throw error;
  }
}

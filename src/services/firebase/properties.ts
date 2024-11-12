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
    const q = query(propertiesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));
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
  propertyType?: string;
  priceRange?: string;
  location?: string;
  status?: string;
}): Promise<Property[]> {
  try {
    let q = query(collection(db, PROPERTIES_COLLECTION));

    if (filters.propertyType) {
      q = query(q, where('type', '==', filters.propertyType));
    }

    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }

    if (filters.location) {
      q = query(q, where('location', '==', filters.location));
    }

    const snapshot = await getDocs(q);
    let properties = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));

    // Client-side filtering for search term and price range
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      properties = properties.filter(property =>
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      properties = properties.filter(property => {
        const price = parseInt(property.price.replace(/[^0-9]/g, ''));
        return price >= min && (!max || price <= max);
      });
    }

    return properties;
  } catch (error) {
    console.error('Error fetching filtered properties:', error);
    throw error;
  }
}

// Initialize sample data if needed
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
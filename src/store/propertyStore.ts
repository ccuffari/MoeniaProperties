import { create } from 'zustand';
import * as propertyService from '../services/firebase/properties';

export interface Property {
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
  description: string;
  status: 'active' | 'pending' | 'sold';
  features?: string[];
  yearBuilt?: number;
  parking?: number;
}

interface PropertyState {
  properties: Property[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  propertyType: string;
  priceRange: string;
  location: string;
  setSearchTerm: (term: string) => void;
  setPropertyType: (type: string) => void;
  setPriceRange: (range: string) => void;
  setLocation: (location: string) => void;
  fetchProperties: () => Promise<void>;
  addProperty: (property: Omit<Property, 'id'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  filteredProperties: () => Property[];
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  loading: false,
  error: null,
  searchTerm: '',
  propertyType: '',
  priceRange: '',
  location: '',
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  setPropertyType: (type) => set({ propertyType: type }),
  setPriceRange: (range) => set({ priceRange: range }),
  setLocation: (location) => set({ location: location }),
  
  fetchProperties: async () => {
    set({ loading: true, error: null });
    try {
      const properties = await propertyService.getProperties();
      set({ properties, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addProperty: async (property) => {
    set({ loading: true, error: null });
    try {
      const newProperty = await propertyService.addProperty(property);
      set(state => ({
        properties: [...state.properties, newProperty],
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  updateProperty: async (id, property) => {
    set({ loading: true, error: null });
    try {
      await propertyService.updateProperty(id, property);
      set(state => ({
        properties: state.properties.map(p => 
          p.id === id ? { ...p, ...property } : p
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  deleteProperty: async (id) => {
    set({ loading: true, error: null });
    try {
      await propertyService.deleteProperty(id);
      set(state => ({
        properties: state.properties.filter(p => p.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  filteredProperties: () => {
    const state = get();
    return state.properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                          property.location.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                          property.description.toLowerCase().includes(state.searchTerm.toLowerCase());
      const matchesType = !state.propertyType || property.type === state.propertyType;
      const matchesLocation = !state.location || property.location.toLowerCase().includes(state.location.toLowerCase());
      
      let matchesPrice = true;
      if (state.priceRange) {
        const price = parseInt(property.price.replace(/[^0-9]/g, ''));
        switch (state.priceRange) {
          case '0-1000000':
            matchesPrice = price <= 1000000;
            break;
          case '1000000-5000000':
            matchesPrice = price > 1000000 && price <= 5000000;
            break;
          case '5000000+':
            matchesPrice = price > 5000000;
            break;
        }
      }
      
      return matchesSearch && matchesType && matchesLocation && matchesPrice;
    });
  }
}));
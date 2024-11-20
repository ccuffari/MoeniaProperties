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
  setLocation: (location) => set({ location }),

  fetchProperties: async (filters = {}) => {
    set({ loading: true, error: null });

    try {
      // Ottieni i filtri dal chiamante o usa i valori dello stato
      const { searchTerm, propertyType, priceRange, location } = {
        searchTerm: get().searchTerm,
        propertyType: get().propertyType,
        priceRange: get().priceRange,
        location: get().location,
        ...filters,
      };

      // Chiamata al servizio (modifica `getProperties` per supportare i filtri se possibile)
      const allProperties = await propertyService.getProperties();
      
      // Filtraggio locale se necessario
      const filteredProperties = allProperties.filter((property) => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              property.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = !propertyType || property.type === propertyType;
        const matchesLocation = !location || property.location.toLowerCase().includes(location.toLowerCase());

        let matchesPrice = true;
        if (priceRange) {
          const price = parseInt(property.price.replace(/[^0-9]/g, ''), 10);
          switch (priceRange) {
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

      set({ properties: filteredProperties, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addProperty: async (property) => {
    set({ loading: true, error: null });
    try {
      const newProperty = await propertyService.addProperty(property);
      set((state) => ({
        properties: [...state.properties, newProperty],
        loading: false,
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
      set((state) => ({
        properties: state.properties.map((p) =>
          p.id === id ? { ...p, ...property } : p
        ),
        loading: false,
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
      set((state) => ({
        properties: state.properties.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  filteredProperties: () => {
    // Mantieni questa funzione per eventuali filtraggi locali
    const state = get();
    return state.properties.filter((property) => {
      const matchesSearch = property.title
        .toLowerCase()
        .includes(state.searchTerm.toLowerCase());
      const matchesType = !state.propertyType || property.type === state.propertyType;
      const matchesLocation = !state.location || property.location.toLowerCase().includes(state.location.toLowerCase());
      let matchesPrice = true;

      if (state.priceRange) {
        const price = parseInt(property.price.replace(/[^0-9]/g, ''), 10);
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
  },
}));

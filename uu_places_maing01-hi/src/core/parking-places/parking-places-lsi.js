const Lsi = {
  type: { en: "Type" },
  number: { en: "Number" },
  underground: { en: "Underground" },
  surface: { en: "Surface" },
  update: { en: "Update" },
  createParkingPlace: { en: "Create Parking Place" },
  parkingPlaceUpdate: { en: "Parking Place Update" },
  successMessage: (prop) => {
    return { en: `Parking Place successfully ${prop}` };
  },
};

export default Lsi;

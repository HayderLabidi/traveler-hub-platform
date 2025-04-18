module.exports = {
  admin: {
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: "Admin123!",
    role: "admin"
  },
  drivers: [
    {
      firstName: "Alex",
      lastName: "Thompson",
      email: "alex@example.com",
      password: "Driver123!",
      role: "driver",
      profilePhoto: "https://randomuser.me/api/portraits/men/45.jpg",
      driverInfo: {
        driverLicense: "DL123456",
        vehicleInfo: {
          model: "Tesla Model 3",
          year: "2022",
          licensePlate: "TESLA01"
        },
        isAvailable: true,
        currentLocation: {
          coordinates: [-73.935242, 40.730610] // New York coordinates
        }
      }
    },
    {
      firstName: "Maria",
      lastName: "Garcia",
      email: "maria@example.com",
      password: "Driver123!",
      role: "driver",
      profilePhoto: "https://randomuser.me/api/portraits/women/68.jpg",
      driverInfo: {
        driverLicense: "DL789012",
        vehicleInfo: {
          model: "Toyota Camry",
          year: "2021",
          licensePlate: "TOY789"
        },
        isAvailable: true,
        currentLocation: {
          coordinates: [-118.243683, 34.052235] // Los Angeles coordinates
        }
      }
    },
    {
      firstName: "David",
      lastName: "Chen",
      email: "david@example.com",
      password: "Driver123!",
      role: "driver",
      profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
      driverInfo: {
        driverLicense: "DL345678",
        vehicleInfo: {
          model: "Honda Civic",
          year: "2023",
          licensePlate: "HON345"
        },
        isAvailable: true,
        currentLocation: {
          coordinates: [-122.419416, 37.774929] // San Francisco coordinates
        }
      }
    }
  ],
  passengers: [
    {
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      password: "Pass123!",
      role: "passenger",
      profilePhoto: "https://randomuser.me/api/portraits/men/22.jpg",
      passengerInfo: {
        savedLocations: [
          {
            name: "Home",
            coordinates: {
              coordinates: [-74.006, 40.7128]
            }
          },
          {
            name: "Work",
            coordinates: {
              coordinates: [-73.9857, 40.7484]
            }
          }
        ]
      }
    },
    {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@example.com",
      password: "Pass123!",
      role: "passenger",
      profilePhoto: "https://randomuser.me/api/portraits/women/22.jpg",
      passengerInfo: {
        savedLocations: [
          {
            name: "Home",
            coordinates: {
              coordinates: [-118.2437, 34.0522]
            }
          }
        ]
      }
    }
  ]
};
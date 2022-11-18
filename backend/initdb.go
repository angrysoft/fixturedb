package main

import (
	"angrysoft.ovh/database"
)

func main() {
	db.SetupDatabase()
	InitData()
}

func InitData() {
	db.DBConn.Create(&db.Manufacture{
		Name: "Martin",
	})
	db.DBConn.Create(&db.Manufacture{
		Name: "Robe",
	})
	db.DBConn.Create(&db.FixtureType{
		Name: "Light",
	})
	db.DBConn.Create(&db.FixtureType{
		Name: "LedScreen",
	})

	db.DBConn.Create(&db.PowerPlug{
		Type: "Schuko (230V)",
	})

	db.DBConn.Create(&db.PowerPlug{
		Type: "C13",
	})

	db.DBConn.Create(&db.PowerPlug{
		Type: "PowerCon",
	})

	db.DBConn.Create(&db.PowerPlug{
		Type: "PowerCon TRUE1",
	})

	db.DBConn.Create(&db.Connector{
		Name: "DMX 3Pin",
	})

	db.DBConn.Create(&db.Connector{
		Name: "DMX 5Pin",
	})

	db.DBConn.Create(&db.Connector{
		Name: "RJ45IN",
	})

	db.DBConn.Create(&db.Connector{
		Name: "RJ45OUT",
	})

	var martin db.Manufacture
	db.DBConn.Model(&db.Manufacture{}).Where("name = ?", "Martin").Take(&martin)
	var light db.FixtureType
	db.DBConn.Model(&db.FixtureType{}).Where("name = ?", "Light").Take(&light)

	var powercon db.PowerPlug
	db.DBConn.Model(&db.PowerPlug{}).Where("type = ?", "PowerCon").Take(&powercon)

	var truecon db.PowerPlug
	db.DBConn.Model(&db.PowerPlug{}).Where("type = ?", "PowerCon TRUE1").Take(&truecon)

	var dmx3pin db.Connector
	db.DBConn.Model(&db.Connector{}).Where("name = ?", "DMX 3Pin").Take(&dmx3pin)

	var dmx5pin db.Connector
	db.DBConn.Model(&db.Connector{}).Where("name = ?", "DMX 5Pin").Take(&dmx5pin)

	var rj45in db.Connector
	db.DBConn.Model(&db.Connector{}).Where("name = ?", "RJ45IN").Take(&rj45in)

	var rj45out db.Connector
	db.DBConn.Model(&db.Connector{}).Where("name = ?", "RJ45OUT").Take(&rj45out)

	aura := db.FixtureTypeLight{
		Name:         "Mac Aura",
		Manufacture:  martin,
		FixtureType:  light,
		Weight:       6.0,
		Power:        230,
		PowerPassage: true,
		PowerPlug: powercon,
	}

	db.DBConn.Omit("db.Connector").Create(&aura)
	db.DBConn.Model(&aura).Association("db.Connector").Append([]db.Connector{
		dmx5pin,
	})

	db.DBConn.Create(&db.FixtureTypeLight{
		Name:        "Quantum Wash",
		Manufacture: martin,
		FixtureType: light,
		Weight:      21.0,
		Power:       1050,
		PowerPlug: powercon,
	})
	var robe db.Manufacture
	
	db.DBConn.Model(&db.Manufacture{}).Where("name = ?", "Robe").Take(&robe)

	pointe := db.FixtureTypeLight{
		Name:        "Pointe",
		Manufacture: robe,
		FixtureType: light,
		Weight:      15,
		Power:       470,
		PowerPlug: powercon,
		Connector: []db.Connector{
			dmx3pin,
			dmx5pin,
			rj45in,
		},
	}

	db.DBConn.Create(&pointe)
	db.DBConn.Save(&pointe)


	esprint := db.FixtureTypeLight{
		Name:        "Esprite",
		Manufacture: robe,
		FixtureType: light,
		Weight:      28.2,
		Power:       950,
		PowerPlug: truecon,
		Connector: []db.Connector{
			dmx3pin,
			dmx5pin,
			rj45in,
			rj45out,
		},
	}

	db.DBConn.Create(&esprint)
	db.DBConn.Save(&esprint)

}

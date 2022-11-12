package db

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var (
	DBConn *gorm.DB
)

type FixtureModel struct {
	gorm.Model
	Name          string `json:"name"`
	ManufactureID uint
	Manufacture   Manufacture `json:"manufacture"`
	FixtureTypeID uint
	FixtureType   FixtureType `json:"type"`
	Weight        float32     `json:"weight"`
	Power         uint        `json:"power"`
	PowerPassage  bool        `json:powerPassage; gorm: "default:false"`
	Connector    []Connector  `gorm:"many2many:fixture_model_connector;"`
	PowerPlugID uint
	PowerPlug PowerPlug
}

type FixtureType struct {
	gorm.Model
	Name string `json:"name"`
}

type Connector struct {
	gorm.Model
	Name string `json:"name"`
}

type PowerPlug struct {
	gorm.Model
	Type string `json:"type"`
}

type Manufacture struct {
	gorm.Model
	Name string `json:"name"`
}

func Search(queryText string) ([]FixtureModel, error) {
	var fixture []FixtureModel
	err := DBConn.Model(&FixtureModel{}).Preload("FixtureType").Preload("Manufacture").Preload("Connector").Preload("PowerPlug").Where("name LIKE ?", fmt.Sprintf("%%%s%%", queryText)).Order("name").Find(&fixture).Error
	return fixture, err
}

func GetManufactures() ([]Manufacture, error) {
	var results []Manufacture
	err := DBConn.Model(&Manufacture{}).Find(&results).Error
	return results, err
}

func GetFixtureTypes() ([]FixtureType, error) {
	var results []FixtureType
	err := DBConn.Model(&FixtureType{}).Find(&results).Error
	return results, err
}

func SetupDatabase() {
	var err error
	DBConn, err = gorm.Open(sqlite.Open("fixture.db"))
	if err != nil {
		panic("Failed to connect database")
	}
	fmt.Println("db connected")
	err = DBConn.AutoMigrate(
		&FixtureType{},
		&Manufacture{},
		&FixtureModel{},
		&PowerPlug{},
		&Connector{},
	)

}

func InitData() {
	DBConn.Create(&Manufacture{
		Name: "Martin",
	})
	DBConn.Create(&Manufacture{
		Name: "Robe",
	})
	DBConn.Create(&FixtureType{
		Name: "Light",
	})
	DBConn.Create(&FixtureType{
		Name: "LedScreen",
	})

	DBConn.Create(&PowerPlug{
		Type: "Schuko (230V)",
	})

	DBConn.Create(&PowerPlug{
		Type: "C13",
	})

	DBConn.Create(&PowerPlug{
		Type: "PowerCon",
	})

	DBConn.Create(&PowerPlug{
		Type: "PowerCon TRUE1",
	})

	DBConn.Create(&Connector{
		Name: "DMX 3Pin",
	})

	DBConn.Create(&Connector{
		Name: "DMX 5Pin",
	})

	DBConn.Create(&Connector{
		Name: "RJ45",
	})

	var martin Manufacture
	DBConn.Model(&Manufacture{}).Where("name = ?", "Martin").Take(&martin)
	var light FixtureType
	DBConn.Model(&FixtureType{}).Where("name = ?", "Light").Take(&light)

	var powercon PowerPlug
	DBConn.Model(&PowerPlug{}).Where("type = ?", "PowerCon").Take(&powercon)

	var truecon PowerPlug
	DBConn.Model(&PowerPlug{}).Where("type = ?", "PowerCon TRUE1").Take(&truecon)


	DBConn.Create(&FixtureModel{
		Name:         "Mac Aura",
		Manufacture:  martin,
		FixtureType:  light,
		Weight:       6.0,
		Power:        230,
		PowerPassage: true,
		PowerPlug: powercon,
		Connector: ,
	})

	DBConn.Create(&FixtureModel{
		Name:        "Quantum Wash",
		Manufacture: martin,
		FixtureType: light,
		Weight:      21.0,
		Power:       1050,
		PowerPlug: powercon,
	})

	var robe Manufacture
	DBConn.Model(&Manufacture{}).Where("name = ?", "Robe").Take(&robe)

	DBConn.Create(&FixtureModel{
		Name:        "Pointe",
		Manufacture: robe,
		FixtureType: light,
		Weight:      15,
		Power:       470,
		PowerPlug: powercon,
	})

	DBConn.Create(&FixtureModel{
		Name:        "Esprite",
		Manufacture: robe,
		FixtureType: light,
		Weight:      28.2,
		Power:       950,
		PowerPlug: truecon,
	})

}

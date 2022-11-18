package db

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var (
	DBConn *gorm.DB
)

type FixtureTypeLight struct {
	ID			  uint	`gorm:"primaryKey"`
	Name          string `gorm:"unique" json:"name"`
	ManufactureID uint
	Manufacture   Manufacture `json:"manufacture"`
	FixtureTypeID uint
	FixtureType   FixtureType `json:"type"`
	Weight        float32     `json:"weight"`
	Power         uint        `json:"power"`
	PowerPassage  bool        `gorm:"default:false" json:"powerPassage"`
	Connector     []Connector `gorm:"many2many:fixture_model_connector;" json:"connector"`
	PowerPlugID   uint
	PowerPlug     PowerPlug   `json:"powerPlug"`
}

type FixtureTypeLed struct {
	FixtureTypeLight FixtureTypeLight `gorm:"embedded"`
	Width uint
	Height uint
}

type FixtureType struct {
	ID	 uint	`gorm:"primaryKey"`
	Name string `json:"name"`
}

type Connector struct {
	ID	 uint	`gorm:"primaryKey"`
	Name string `gorm:"unique" json:"name"`
}

type PowerPlug struct {
	ID	 uint	`gorm:"primaryKey"`
	Type string `gorm:"unique" json:"type"`
}

type Manufacture struct {
	ID	 uint	`gorm:"primaryKey"`
	Name string `gorm:"unique" json:"name"`
}

func Search(queryText string) ([]FixtureTypeLight, error) {
	var results[string]FixtureTypeLight{}
	err := DBConn.Model(&FixtureTypeLight{}).Preload("FixtureType").Preload("Manufacture").Preload("Connector").Preload("PowerPlug").Where("name LIKE ?", fmt.Sprintf("%%%s%%", queryText)).Order("name").Find(&fixtureLight).Error
	return fixtureLight, err
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
	err = DBConn.AutoMigrate(
		&FixtureType{},
		&Manufacture{},
		&PowerPlug{},
		&Connector{},
		&FixtureTypeLight{},
		&FixtureTypeLed{},
	)
	if err != nil {
		panic("Db migration failed")
	}
}
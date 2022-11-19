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
	ID            uint   `gorm:"primaryKey"`
	Name          string `gorm:"unique" json:"name"`
	ManufactureID uint
	Manufacture   Manufacture `json:"manufacture"`
	FixtureType   string      `json:"type" gorm:"default:light"`
	Weight        float32     `json:"weight"`
	Power         uint        `json:"power"`
	PowerPassage  bool        `gorm:"default:false" json:"powerPassage"`
	Connector     []Connector `gorm:"many2many:fixture_light_connector;" json:"connector"`
	PowerPlugID   uint
	PowerPlug     PowerPlug `json:"powerPlug"`
}

type FixtureTypeLed struct {
	ID            uint   `gorm:"primaryKey"`
	Name          string `gorm:"unique" json:"name"`
	ManufactureID uint
	Manufacture   Manufacture `json:"manufacture"`
	FixtureType   string      `json:"type" gorm:"default:led"`
	Weight        float32     `json:"weight"`
	Power         uint        `json:"power"`
	PowerPassage  bool        `gorm:"default:true" json:"powerPassage"`
	Connector     []Connector `gorm:"many2many:fixture_led_connector;" json:"connector"`
	PowerPlugID   uint
	PowerPlug     PowerPlug `json:"powerPlug"`
	Width         float32   `json:"width"`
	Height        float32   `json:"height"`
	Thickness     float32   `json:"thickness"`
	ResolutionH   uint      `json:"resolutionH"`
	ResolutionV   uint      `json:"resolutionV"`
	Pixel         float32   `json:"pixel"`
	Outdoor       bool      `json:"outdoor"`
}

type Connector struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"unique" json:"name"`
}

type PowerPlug struct {
	ID   uint   `gorm:"primaryKey"`
	Type string `gorm:"unique" json:"type"`
}

type Manufacture struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"unique" json:"name"`
}

type Result struct {
	Light  []FixtureTypeLight `json:"light"`
	Led    []FixtureTypeLed   `json:"led"`
	Errors []error            `json:"errors"`
}

func Search(queryText string) Result {
	var light []FixtureTypeLight
	var led []FixtureTypeLed
	var errors []error
	var err error
	light, err = searchLight(queryText)
	if err != nil {
		errors = append(errors, err)
	}

	led, err = searchLed(queryText)
	if err != nil {
		errors = append(errors, err)
	}

	return Result{
		Light:  light,
		Led:    led,
		Errors: errors,
	}
}

func searchLight(queryText string) ([]FixtureTypeLight, error) {
	var lightByName []FixtureTypeLight
	err := DBConn.Model(&FixtureTypeLight{}).Preload("Manufacture").Preload("Connector").Preload("PowerPlug").Where("name LIKE ?", fmt.Sprintf("%%%s%%", queryText)).Or("manufacture_id IN ?", searchManufacture(queryText)).Order("name").Find(&lightByName).Error
	return lightByName, err
}

func searchLed(queryText string) ([]FixtureTypeLed, error) {
	var led []FixtureTypeLed
	err := DBConn.Model(&FixtureTypeLed{}).Preload("Manufacture").Preload("Connector").Preload("PowerPlug").Where("name LIKE ?", fmt.Sprintf("%%%s%%", queryText)).Or("manufacture_id IN ?", searchManufacture(queryText)).Order("name").Find(&led).Error
	return led, err
}

func searchManufacture(queryText string) ([]uint) {
	var manufactureID []uint
	DBConn.Model(&Manufacture{}).Select("ID").Where("name LIKE ?", fmt.Sprintf("%%%s%%", queryText)).Find(&manufactureID)
	return manufactureID
}

func GetManufactures() ([]Manufacture, error) {
	var results []Manufacture
	err := DBConn.Model(&Manufacture{}).Find(&results).Error
	return results, err
}

func SetupDatabase() {
	var err error
	DBConn, err = gorm.Open(sqlite.Open("fixture.db"))
	if err != nil {
		panic("Failed to connect database")
	}
	err = DBConn.AutoMigrate(
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

package db

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var (
	DBConn *gorm.DB
)

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
	err := DBConn.Model(&FixtureTypeLight{}).Preload("Manufacture").Preload("Connector").Preload("PowerPlug").Preload("DmxModes").Where("name LIKE ?", fmt.Sprintf("%%%s%%", queryText)).Or("manufacture_id IN ?", searchManufacture(queryText)).Order("name").Find(&lightByName).Error
	fmt.Println(lightByName)
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
		&DmxModes{},
		&FixtureTypeLight{},
		&FixtureTypeLed{},
	)
	if err != nil {
		panic("Db migration failed")
	}
}

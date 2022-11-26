package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	// "reflect"
	"strings"

	db "angrysoft.ovh/database"
	"gorm.io/gorm/clause"
)

func main() {
	db.SetupDatabase()
	for _, fileName := range os.Args[1:] {
		if strings.HasSuffix(fileName, ".json") {
			importFromFile(fileName)
		}
	}
	test()
}

func importFromFile(fileName string) {
	jsonFile, err := os.Open(fileName)
	if err != nil {
		log.Fatal(err)
	}
	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)
	var result map[string]any
	json.Unmarshal(byteValue, &result)
	switch result["type"] {
	case "light":
		importLight(result)
	case "led":
		fmt.Println("Led import")
	}
}

func importLight(data map[string]any) {

	fixture := db.FixtureTypeLight{}
	fixture.Name = fmt.Sprint(data["name"])
	fixture.Weight = float32(data["weight"].(float64))
	fixture.Power = uint(data["power"].(float64))
	fixture.PowerPassage = data["powerPassage"].(bool)

	db.DBConn.Omit(clause.Associations).Create(&fixture)

	addAssociationsOne("Manufacture", &fixture, data["manufacture"])
	addAssociationsOne("PowerPlug", &fixture, data["powerPlug"])
	addAssociationsMany("Connector", &fixture, data["connector"])
	addAssociationsMany("DmxModes", &fixture, data["dmxModes"])
	db.DBConn.Save(&fixture)
}

func addAssociationsMany(modelName string, fixture any, data any) {
	for _, v := range data.([]any) {
		addAssociationsOne(modelName, fixture, v)
		// fmt.Println("many", v)
		// db.DBConn.Save(fixture)

	}

}

func addAssociationsOne(modelName string, fixture any, data any) {
	var tmpModel any
	var newModel any

	switch modelName {
	case "Manufacture":
		tmpModel = &db.Manufacture{
			Name: fmt.Sprint(data),
		}
		newModel = new(db.Manufacture)
	case "PowerPlug":
		tmpModel = &db.PowerPlug{
			Name: fmt.Sprint(data),
		}
		newModel = new(db.PowerPlug)
	case "Connector":
		tmpModel = &db.Connector{
			Name: fmt.Sprint(data),
		}
		newModel = new(db.Connector)
	case "DmxModes":
		newModel = new(db.DmxModes)
		m := data.(map[string]any)
		tmpModel = &db.DmxModes{
			Name:     fmt.Sprint(m["name"]),
			Channels: uint(m["channels"].(float64)),
		}

	}

	db.DBConn.Where(tmpModel).FirstOrInit(newModel)
	db.DBConn.Model(fixture).Association(modelName).Append(newModel)
}

func test() {
	var lightByName []db.FixtureTypeLight
	err := db.DBConn.Model(db.FixtureTypeLight{}).Preload("Manufacture").Preload("Connector").Preload("PowerPlug").Preload("DmxModes").Find(&lightByName).Error
	for _, m := range lightByName {
		fmt.Println(m)
	}
	fmt.Println("Errors", err)
}

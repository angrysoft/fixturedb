package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	// "reflect"
	"strings"

	db "angrysoft.ovh/database"
	"gorm.io/gorm/clause"
)

func main() {
	db.SetupDatabase()
	if len(os.Args) < 2 {
		fmt.Println("Add path do directory with import files")
		os.Exit(1)
	}
	if fileInfo, err := os.Stat(os.Args[1]); !os.IsNotExist(err) {
		if fileInfo.IsDir() {
			loadFromDir(fileInfo.Name())
		}
	} else {
		importFromFile(os.Args[1])
	}
	test()
}

func loadFromDir(dirName string) {
	err := filepath.Walk(dirName, func(path string, info os.FileInfo, err error) error {
        if err != nil {
            fmt.Println(err)
            return err
        }
		if !info.IsDir() {
			importFromFile(path)
		}
        return nil
    })

    if err != nil {
        fmt.Println(err)
		os.Exit(1)
    }
}

func importFromFile(fileName string) {
	if !strings.HasSuffix(fileName, ".json") {
		fmt.Println("File don't have .json suffix skipping... ", fileName)
		return
	}
	fmt.Printf("Loading %s file\n", fileName)
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
		importLed(result)
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

func importLed(data map[string]any) {
	fixture := db.FixtureTypeLed{}
	fixture.Name = fmt.Sprint(data["name"])
	fixture.Weight = float32(data["weight"].(float64))
	fixture.Power = uint(data["power"].(float64))
	fixture.PowerPassage = data["powerPassage"].(bool)
	fixture.Width = uint(data["width"].(float64))
	fixture.Height = uint(data["height"].(float64))
	fixture.Thickness = uint(data["thickness"].(float64))
	fixture.ResolutionH = uint(data["resolutionH"].(float64))
	fixture.ResolutionV = uint(data["resolutionV"].(float64))
	fixture.Pixel = float32(data["pixel"].(float64))
	
	db.DBConn.Omit(clause.Associations).Create(&fixture)
	addAssociationsOne("Manufacture", &fixture, data["manufacture"])
	addAssociationsOne("PowerPlug", &fixture, data["powerPlug"])
	addAssociationsMany("Connector", &fixture, data["connector"])
	db.DBConn.Save(&fixture)
}

func addAssociationsMany(modelName string, fixture any, data any) {
	for _, v := range data.([]any) {
		addAssociationsOne(modelName, fixture, v)
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

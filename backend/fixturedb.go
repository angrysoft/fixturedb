package main

import (
	"angrysoft.ovh/database"
	"angrysoft.ovh/entrypoint"
)

func main() {
	db.SetupDatabase()
	db.InitData()
	entrypoint.SetupEndpoints()
}

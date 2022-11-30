package entrypoint

import (
	"angrysoft.ovh/database"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

func SetupEndpoints() {
	app := fiber.New()
	api := app.Group("/api")
	v1 := api.Group("/v1")

	app.Static("/", "../frontend/build")

	v1.Get("/search/:query", func(c *fiber.Ctx) error {
		result:= db.Search(c.Params("query"))
		return c.JSON(result)
	})

	v1.Get("/manufacture", func(c *fiber.Ctx) error {
		result, err := db.GetManufactures()
		if err != nil {
			return c.JSON(fiber.Map{
				"error": err,
			})
		}
		return c.JSON(result)
	})

	fmt.Println("Running server")
	app.Listen(":5000")
}

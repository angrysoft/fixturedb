module angrysoft.ovh/fixturedb

go 1.19

replace angrysoft.ovh/entrypoint => ./entrypoint
replace angrysoft.ovh/database => ./database

require (
	angrysoft.ovh/database v0.0.0-00010101000000-000000000000
	angrysoft.ovh/entrypoint v0.0.0-00010101000000-000000000000
)

require (
	github.com/andybalholm/brotli v1.0.4 // indirect
	github.com/gofiber/fiber/v2 v2.39.0 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	github.com/klauspost/compress v1.15.0 // indirect
	github.com/mattn/go-colorable v0.1.13 // indirect
	github.com/mattn/go-isatty v0.0.16 // indirect
	github.com/mattn/go-runewidth v0.0.14 // indirect
	github.com/mattn/go-sqlite3 v1.14.15 // indirect
	github.com/rivo/uniseg v0.2.0 // indirect
	github.com/valyala/bytebufferpool v1.0.0 // indirect
	github.com/valyala/fasthttp v1.40.0 // indirect
	github.com/valyala/tcplisten v1.0.0 // indirect
	golang.org/x/sys v0.0.0-20220811171246-fbc7d0a398ab // indirect
	gorm.io/driver/sqlite v1.4.3 // indirect
	gorm.io/gorm v1.24.1 // indirect
)

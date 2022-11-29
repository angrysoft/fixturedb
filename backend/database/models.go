package db

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
	DmxModes      []DmxModes  `gorm:"many2many:fixture_dmx_modes" json:"modes"`
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
	Width         uint      `json:"width"`
	Height        uint      `json:"height"`
	Thickness     uint      `json:"thickness"`
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
	Name string `gorm:"unique" json:"type"`
}

type Manufacture struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"unique" json:"name"`
}

type DmxModes struct {
	ID       uint   `gorm:"primaryKey"`
	Name     string `gorm:"unique" json:"mode"`
	Channels uint   `json:"channels"`
}

type Result struct {
	Light  []FixtureTypeLight `json:"light"`
	Led    []FixtureTypeLed   `json:"led"`
	Errors []error            `json:"errors"`
}

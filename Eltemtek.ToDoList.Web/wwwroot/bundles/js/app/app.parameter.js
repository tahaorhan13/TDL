app.parameter = {};
app.parameter.unitType = {
	ActiveCurrentPrimary: { title: "Ii", unit: "kA" },
	ActiveCurrentSecondary: { title: "Ij", unit: "kA" },
	Control: { title: "Ctrl", unit: "" },
	Frequency: { title: "f", unit: "Hz" },
	I: { title: "I", unit: "kA" },
	Loading: { title: "Loading", unit: "%" },
	Loss: { title: "Loss", unit: "kW" },
	OutofService: { title: "OfS", unit: "" },
	P: { title: "P", unit: "MW" },
	PPTransferred: { title: "Pi", unit: "MW" },
	PReactiveTransferred: { title: "Qi", unit: "MVAr" },
	PrimaryP: { title: "Pi", unit: "MW" },
	PrimaryQ: { title: "Qi", unit: "MVAr" },
	Q: { title: "Q", unit: "MVAr" },
	SecondaryP: { title: "Pj", unit: "MW" },
	SecondaryQ: { title: "Qj", unit: "MVAr" },
	SPTransferred: { title: "Pj", unit: "MW" },
	SReactiveTransferred: { title: "Qj", unit: "MVAr" },
	TapPosition: { title: "Tap", unit: "" },
	TapPositionControl: { title: "TPC", unit: "" },
	V: { title: "U", unit: "kV" },
	VoltageAngle: { title: "phiu", unit: "deg" },
	VoltageDrop: { title: "du", unit: "%" }
};
app.parameter.Position = {
	Values: {
		Top: 0,
		Bottom: 1,
		Left: 2,
		Right: 3
	},
	DefaultValue: 0
};
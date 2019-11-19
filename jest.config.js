module.exports = {
	"testEnvironment": "jest-environment-jsdom-thirteen",
	"moduleFileExtensions": ["js", "json", "vue", "svg"],
	"transform": {
		"^.+\\.js$": "babel-jest",
		"^.+\\.vue$": "vue-jest"
	},
	"testPathIgnorePatterns":[
	],
	"transformIgnorePatterns": [
		"node_modules/(?!quill|parchment)",
	],
	"moduleNameMapper": {
		"^@/(.*)$": "<rootDir>/src/$1",
		"\\.(svg|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.js",
		"\\.(css|less|scss)$": "<rootDir>/src/__mocks__/styleMock.js"
	}
}

package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/shravanasati/emozi/emojipasta"
)

func jsonify(data any) []byte {
	converted, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}
	return converted
}

type GenerateRequestOptions struct {
	EmojiDensity uint `json:"emojiDensity"`
}

type GenerateRequest struct {
	Text    string                 `json:"text"`
	Options GenerateRequestOptions `json:"options"`
}

func main() {
	pastaBuilder := emojipasta.NewBuilder().WithDefaultMappings()

	http.HandleFunc("POST /api/generate", func(w http.ResponseWriter, r *http.Request) {
		var apiRequest GenerateRequest
		content, err := io.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write(jsonify(map[string]string{"error": "cant read request body"}))
			return
		}
		err = json.Unmarshal(content, &apiRequest)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write(jsonify(map[string]string{"error": "json entity doesn't match, visit docs"}))
			return
		}

		copypasta := apiRequest.Text
		options := apiRequest.Options
		if options.EmojiDensity == 0 {
			w.WriteHeader(http.StatusOK)
			w.Write(jsonify(map[string]string{
				"emojipasta": apiRequest.Text,
			}))
			return
		}

		pastaMaker, err := pastaBuilder.WithMaxEmojisPerBlock(min(5, int(options.EmojiDensity))).Build()
		if err != nil {
			panic(err)
		}

		dish := pastaMaker.GenerateEmojiPasta(copypasta)
		w.WriteHeader(http.StatusOK)
		w.Write(jsonify(map[string]string{
			"emojipasta": dish,
		}))
	})

	fs := http.FileServer(http.Dir("./dist"))
	http.Handle("/", fs)
	log.Println("Listening on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

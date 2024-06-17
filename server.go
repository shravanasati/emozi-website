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

func main() {
	pastaBuilder := emojipasta.NewBuilder().WithDefaultMappings().WithMaxEmojisPerBlock(2)
	pastaMaker, err := pastaBuilder.Build()
	if err != nil {
		panic(err)
	}

	http.HandleFunc("POST /api/generate", func(w http.ResponseWriter, r *http.Request) {
		var data map[string]string
		content, err := io.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write(jsonify(map[string]string{"error": "cant read request body"}))
			return
		}
		err = json.Unmarshal(content, &data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write(jsonify(map[string]string{"error": "expected json content"}))
			return
		}

		copypasta, ok := data["text"]
		if !ok {
			w.WriteHeader(http.StatusBadRequest)
			w.Write(jsonify(map[string]string{"error": "text field not found"}))
			return
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
	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
